const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const CONFIG = require('./src/config.js');
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
                category,
                date(formatString: "DD MMMM YYYY")
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

      /*Blog post pages*/
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
      
      createBlogPreviewDesktopParts();
      function createBlogPreviewDesktopParts() {
        const blogPostPreviewsPerPage =  CONFIG.blogPreviewDesktop.previewsPerPage;
        const blogPostCount = result.data.allBlogPosts.totalCount;
        const dir = `./public/${CONFIG.blogPreviewDesktop.previewFilesDir}`;
        if (blogPostCount > blogPostPreviewsPerPage) {
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }
          _.chunk(blogPosts, blogPostPreviewsPerPage).forEach((blogPostsChunk, pageIndex) => {
            const jsonFileContent = JSON.stringify(blogPostsChunk)
            fs.writeFile(
              path.resolve(`${dir}/${CONFIG.blogPreviewDesktop.previewFilesPrefix}${pageIndex}.json`),
              jsonFileContent, err => {
                if (err) throw err;
                console.log('saved')
              }
            )
          });
        }
      }

      createBlogPreviewMobileParts();
      function createBlogPreviewMobileParts() {
        const blogPostPreviewsPerPage =  CONFIG.blogPreviewMobile.previewsPerPage;
        const blogPostCount = result.data.allBlogPosts.totalCount;
        const dir = `./public/${CONFIG.blogPreviewMobile.previewFilesDir}`;
        if (blogPostCount > blogPostPreviewsPerPage) {
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }
          _.chunk(blogPosts, blogPostPreviewsPerPage).forEach((blogPostsChunk, pageIndex) => {
            const jsonFileContent = JSON.stringify(blogPostsChunk)
            fs.writeFile(
              path.resolve(`${dir}/${CONFIG.blogPreviewMobile.previewFilesPrefix}${pageIndex}.json`),
              jsonFileContent, err => {
                if (err) throw err;
                console.log('saved')
              }
            )
          });
        }
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
