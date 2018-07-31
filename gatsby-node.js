const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');

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

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          sort: {fields: [frontmatter___date], order: DESC},
          filter: {fileAbsolutePath: {regex: "/^\/.*\/(blog)\/.*\.md$/"}}
        ) {
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
        miscYaml(id: {regex: "/^.*\/misc\/main_jumbotron\.yml.*$/"}) {
          path
        }
      }
    `)
    .then(result => {
      const posts = result.data.allMarkdownRemark.edges;
      _.each(posts, (post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
          path: post.node.fields.slug,
          component: path.resolve('./src/templates/blog-post.js'),
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          }
        })
      });

      const mainJumbotronSlug = result.data.miscYaml.path;
      createPage({
        path: '/',
        component: path.resolve('./src/templates/index.js'),
        context: {
          mainJumbotronSlug: mainJumbotronSlug
        }
      });

      resolve();
    })
    .catch(error => {
      reject(error);
    });
  });
};
