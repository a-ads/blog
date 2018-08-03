const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const config = require('./src/config.js');
const fs = require('fs');

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
                category
              }
            }
          }
        },
        mainJumbotron: miscYaml(id: {regex: "/^.*\/misc\/main_jumbotron\.yml.*$/"}) {
          path
        }
      }
    `)
    .then(result => {
      /*Index page*/
      const mainJumbotronSlug = result.data.mainJumbotron.path;
      createPage({
        path: '/',
        component: path.resolve('./src/templates/index.js'),
        context: {
          mainJumbotronSlug
        }
      });

      /*Blog posts pages*/
      const blogPosts = result.data.allBlogPosts.edges;
      _.each(blogPosts, (blogPost, index) => {
        const previousBlogPost = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;
        const nextBlogPost = index === 0 ? null : blogPosts[index - 1].node;
        createPage({
          path: blogPost.node.fields.slug,
          component: path.resolve('./src/templates/blog-post.js'),
          context: {
            slug: blogPost.node.fields.slug,
            previous: previousBlogPost,
            next: nextBlogPost,
          }
        })
      });

      const blogPostsPreviewsPerPage =  config.blogPagination.postsPreviewsPerPage;
      const blogPostsCount = result.data.allBlogPosts.totalCount;
      const dir = `./public/${config.blogPagination.paginationFilesDir}`;
      if (blogPostsCount > blogPostsPreviewsPerPage) {
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        _.chunk(blogPosts, blogPostsPreviewsPerPage).forEach((blogPostsChunk, pageIndex) => {
          const jsonFileContent = JSON.stringify(blogPostsChunk)
          fs.writeFile(path.resolve(`${dir}/${config.blogPagination.paginationFilesPrefix}${pageIndex}.json`), jsonFileContent, err => {
            if (err) throw err;
            console.log('saved')
          })
        });
      }

      resolve();
    })
    .catch(error => {
      reject(error);
    });
  });
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
