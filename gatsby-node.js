const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const CONFIG = require('./src/config.js');
const fs = require('fs');
const imageSize = require('image-size');

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false,
    })
  }
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'blog'});
    createNodeField({
      node,
      name: 'slug',
      value: slug, 
    });

    var thumbnailObject = {};
    if (node.frontmatter.thumbnail) {
      try {
        const splittedThubmnail = node.frontmatter.thumbnail.split('/');
        const thumbnailPath = './static/assets/' + splittedThubmnail[splittedThubmnail.length - 1];
        const thubmnailDimensions = imageSize(thumbnailPath);

        thumbnailObject = {
          src: node.frontmatter.thumbnail,
          width: thubmnailDimensions.width,
          height: thubmnailDimensions.height
        };
      } catch(err) {
        console.error(err);
      }
    }
    createNodeField({
      node,
      name: 'thumbnailObject',
      value: thumbnailObject
    })
  }
};

exports.createPages= ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allBlogPosts: allMarkdownRemark(
          sort: {fields: [frontmatter___date], order: DESC},
          filter: {fileAbsolutePath: {regex: "/^.*\/content\/blog\/.*\.md$/"}}
        ) {
          totalCount
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                author
                big_picture
                category
                category_top_level
                category_second_level
                date(formatString: "DD MMMM YYYY")
                popularity
                tags
                thumbnail
                title
              }
              excerpt
              internal {
                content
              }
            }
          }
        }

        mainJumbotron: miscYaml(id: {regex: "/^.*\/misc\/main_jumbotron\.yml.*$/"}) {
          path
        }

        allAuthors: allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "/^.*\/content\/authors\/.*\.md$/"}}
        ) {
          totalCount
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                name,
                image,
                position,
                description,
                twitter_link,
                facebook_link,
                bitcointalk_link
              }
            }
          }
        }
        
        allBlogCategoriesTopLevelYaml {
          nodes {
            id
            title
          }
        }

        allBlogCategoriesSecondLevelYaml {
          nodes {
            id
            parent_category
            title
          }
        }
      }
    `)
    .then(result => {
      const blogPosts = result.data.allBlogPosts.edges;
      const postCount = result.data.allBlogPosts.totalCount;
      const authors = result.data.allAuthors.edges;
      const postsByPopularity = _.take(_.sortBy(blogPosts, post => post.node.frontmatter.popularity), 9);

      /*Index page*/
      createPage({
        path: '/',
        component: path.resolve('./src/templates/index.js'),
        layout: path.resolve('./src/layouts/index.js'),
        context: {
          blogPostsChunk: blogPosts,
          pageIndex: 0,
          postCount: postCount,
          postsByPopularity: postsByPopularity
        }
      });

      /*Blog post pages*/
      _.each(blogPosts, (blogPost, index) => {
        const previousBlogPost = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;
        const nextBlogPost = index === 0 ? null : blogPosts[index - 1].node;

        let author = {
          node: {
            frontmatter: {},
            fields: {}
          }
        }

        if (blogPost.node.frontmatter.author) {
          const foundedAuthor = _.find(authors, a => a.node.frontmatter.name === blogPost.node.frontmatter.author)
          if (foundedAuthor) {
            author = foundedAuthor
          }
        }

        function getRelatedPosts(blogPosts) {
          return blogPosts.filter(function (el, i) {
            if (i !== index && el.node.frontmatter.category === blogPost.node.frontmatter.category) {
              return true;
            }
          }).slice(0, 6);
        }

        createPage({
          path: blogPost.node.fields.slug,
          component: path.resolve('./src/templates/blog-post.js'),
          context: {
            slug: blogPost.node.fields.slug,
            previous: previousBlogPost,
            next: nextBlogPost,
            relatedPosts: getRelatedPosts(blogPosts),
            author: author
          },
        });
      });

      result.data.allBlogCategoriesTopLevelYaml.nodes.forEach(category => {
        const categoriesSecondLevel = _.filter(result.data.allBlogCategoriesSecondLevelYaml.nodes, node => {
          return node.parent_category === category.title
        }) || []

        createPage({
          path: `/categories/${_.kebabCase(category.title)}/`,
          component: path.resolve('./src/templates/category-top-level-page.js'),
          context: {
            category: [category.title],
            categoriesSecondLevel
          },
        });

        categoriesSecondLevel.forEach(categorySecond => {
          createPage({
            path: `/categories/${_.kebabCase(categorySecond.title)}/`,
            component: path.resolve('./src/templates/category-second-level-page.js'),
            context: {
              category: [category.title],
              categorySecond: [categorySecond.title],
              categoriesSecondLevel,
              activeSecondCategory: categorySecond
            },
          });
        })
      });

      /*Search file*/
      const searchFile = JSON.parse(JSON.stringify(blogPosts)).map(function (post) {
        if (post.node.fields.slug) {
          post.node.fields.slug = post.node.fields.slug;
        }
        return {
          title: post.node.frontmatter.title,
          slug: post.node.fields.slug,
          tags: post.node.frontmatter.tags,
          thumbnail: post.node.frontmatter.thumbnail,
          fullExcerpt:
            post.node.internal.content
            .replace(/\r?\n|\r/g, ' ') //remove ""\n\r" from text
            .replace(/\s\s+/g, ' ') //remove double spaces
        };
      });
      fs.writeFile(path.resolve('./public/search.json'), JSON.stringify(searchFile), function(err) {
        console.log(err);
      });

      /*Authors page*/
      createPage({
        path: `/authors`,
        component: path.resolve('./src/templates/authors.js'),
        context: {
          authors: _.map(authors, author => {
            const authorArticles = _.filter(blogPosts, post => post.node.frontmatter.author === author.node.frontmatter.name);
            author.articlesCount = authorArticles.length;
            return author;
          })
        }
      });

      /*Author pages*/
      _.each(authors, (author, index) => {
        const authorArticles = _.filter(blogPosts, post => post.node.frontmatter.author === author.node.frontmatter.name);
        author.articlesCount = authorArticles.length;

        createPage({
          path: author.node.fields.slug,
          component: path.resolve('./src/templates/author.js'),
          context: {
            author: author,
            slug: author.node.fields.slug,
            posts: authorArticles
          }
        });
      });

      const blogPostsForAadsMainPage = JSON.parse(JSON.stringify(_.take(blogPosts, 9))).map(function (post) {
        if (post.node.frontmatter.thumbnail) {
          post.node.frontmatter.thumbnail = post.node.frontmatter.thumbnail;
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
