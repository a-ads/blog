const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const CONFIG = require('./src/config.js');
const fs = require('fs');

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false,
    })
  }
};

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'blog'});
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};

exports.createPages= ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allBlogPosts: allMarkdownRemark(
          sort: {fields: [frontmatter___date], order: DESC},
          filter: {fileAbsolutePath: {regex: "/^\/.*\/(blog)\/.*\.md$/"}}
        ) {
          totalCount
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title,
                thumbnail,
                category,
                date(formatString: "DD MMMM YYYY"),
                tags
              }
              excerpt
            }
          }
        },
        mainJumbotron: miscYaml(id: {regex: "/^.*\/misc\/main_jumbotron\.yml.*$/"}) {
          path
        }
      }
    `)
    .then(result => {
      const blogPosts = result.data.allBlogPosts.edges;
      const postCount = result.data.allBlogPosts.totalCount;
      /*Index page*/
      const blogPostPreviewsPerPage =  CONFIG.blogPreviewDesktop.previewsPerPage;
      _.chunk(blogPosts, blogPostPreviewsPerPage).forEach((blogPostsChunk, pageIndex) => {
        let slug = `/page-${pageIndex + 1}`;
        if (pageIndex === 0) {
          createPage({
            path: '/',
            component: path.resolve('./src/templates/index.js'),
            layout: path.resolve('./src/layouts/index.js'),
            context: {
              blogPostsChunk,
              pageIndex: pageIndex,
              postCount: postCount
            }
          });
        }
        createPage({
          path: slug,
          component: path.resolve('./src/templates/index.js'),
          layout: path.resolve('./src/layouts/index.js'),
          context: {
            blogPostsChunk,
            pageIndex: pageIndex,
            postCount: postCount
          }
        });
      });

      /*Blog post pages*/
      _.each(blogPosts, (blogPost, index) => {
        const previousBlogPost = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;
        const nextBlogPost = index === 0 ? null : blogPosts[index - 1].node;
        //console.log(blogPosts);

        function getRelatedPosts(blogPosts) {
          return blogPosts.filter(function (el, i) {
            if (i !== index && el.node.frontmatter.category === blogPost.node.frontmatter.category) {
              return true;
            }
          });
        }

        createPage({
          path: blogPost.node.fields.slug,
          component: path.resolve('./src/templates/blog-post.js'),
          context: {
            slug: blogPost.node.fields.slug,
            previous: previousBlogPost,
            next: nextBlogPost,
            relatedPosts: getRelatedPosts(blogPosts)
          },
        });
      });

      /*Tag pages*/
      let tags = [];
      _.each(blogPosts, edge => {
        if (_.get(edge, "node.frontmatter.tags")) {
          tags = tags.concat(edge.node.frontmatter.tags);
        }
      });
      tags = _.uniq(tags)
      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag)}/`,
          component: path.resolve('./src/templates/tag-page.js'),
          context: {
            tag,
          },
        });
      });

      /*Category pages*/
      let categories = [];
      _.each(blogPosts, edge => {
        if (_.get(edge, "node.frontmatter.category")) {
          categories = categories.concat(edge.node.frontmatter.category);
        }
      });
      categories = _.uniq(categories)
      categories.forEach(category => {
        createPage({
          path: `/categories/${_.kebabCase(category)}/`,
          component: path.resolve('./src/templates/category-page.js'),
          context: {
            category,
          },
        });
      });

      const blogPostsForAadsMainPage = JSON.parse(JSON.stringify(_.take(blogPosts, 9))).map(function (post) {
        if (post.node.frontmatter.thumbnail) {
          post.node.frontmatter.thumbnail = '/blog' + post.node.frontmatter.thumbnail;
        }
        if (post.node.fields.slug) {
          post.node.fields.slug = '/blog' + post.node.fields.slug;
        }
        return post;
      });
      fs.writeFile(path.resolve('./public/main_page_blogposts_preview.json'), JSON.stringify(blogPostsForAadsMainPage), function(err) {
        console.log(err);
      });

      resolve();
    })
    .catch(error => {
      reject(error);
    });
  });
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
