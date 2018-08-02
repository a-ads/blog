const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const config = require('./src/config.js');

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

exports.createLayouts = (({ boundActionCreators }) => {
  console.log('check')
  boundActionCreators.createLayout({
    component: path.resolve('./src/layouts/empty.js'),
    id: 'check'
  })
})

exports.createPages = ({ graphql, boundActionCreators }) => {
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
      /*Pages for blog posts pagination*/
      const blogPostsPreviewsPerPage =  config.blogPostsPagination.postsPreviewsPerPage;
      const blogPostsCount = result.data.allBlogPosts.totalCount;
      if (blogPostsCount > blogPostsPreviewsPerPage) {
        _.chunk(blogPosts, blogPostsPreviewsPerPage).forEach((blogPostsChunk, pageIndex) => {
          createPage({
            path: `/blog-posts-previews/${pageIndex}`,
            component: path.resolve('./src/templates/blog-posts-preview-group.js'),
            context: {
              blogPosts: blogPostsChunk
            },
            layout: 'check'
          });
        });
      }

      resolve();
    })
    .catch(error => {
      reject(error);
    });
  });
};

// exports.onCreatePage = ({ page, boundActionCreators }) => {
//   const { createPage } = boundActionCreators;

//   console.log(page)

//   return new Promise((resolve, reject) => {
//     if (page.path.match(/^\/blog-posts-previews/)) {
//       console.log('check');
//       // It's assumed that `landingPage.js` exists in the `/layouts/` directory
//       page.layout = "landingPage";

//       // Update the page.
//       createPage(page);
//     }

//     resolve();
//   });
// };
