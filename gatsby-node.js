const { createFilePath } = require('gatsby-source-filesystem')
const path = require(`path`)
const R = require('ramda')

const toKebabCase = require('./src/utils/to-kebab-case')

const POSTS_PER_PAGE = 8

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {    
    if (R.startsWith('blog/assets/', node.frontmatter.thumbnail)) {
      node.frontmatter.thumbnail = node.frontmatter.thumbnail.replace(
        'blog/assets/',
        '../../static/assets/'
      )
    }

    if (R.startsWith('/blog/assets/', node.frontmatter.thumbnail)) {
      node.frontmatter.thumbnail = node.frontmatter.thumbnail.replace(
        '/blog/assets/',
        '../../static/assets/'
      )
    }

    const slug = createFilePath({ node, getNode, basePath: 'blog' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/$/)) {
    page.matchPath = '/*'
    createPage(page)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data, errors } = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*.md$/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              author
              category_top_level
            }
          }
        }
      }
    }
  `)

  if (errors) {
    console.log(`Gatsby-node threw: ${errors}`)
  }

  const posts = data.allMarkdownRemark.edges
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}/`,
      component: path.resolve('./src/templates/index.js'),
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  posts.forEach((post) => {
    createPage({
      path: post.node.fields.slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: post.node.fields.slug,
        authorName: post.node.frontmatter.author
      },
    })
  })

  const topLevelCategories = R.pipe(
    R.reduce((acc, item) => {
      acc.push(item.node.frontmatter.category_top_level[0])      
      return acc
    }, []),
    R.uniq
  )(posts)

  topLevelCategories.forEach(category => {
    createPage({
      path: `/${toKebabCase(category)}/`,
      component: path.resolve('./src/templates/categories.js'),
      context: {
        categoryTopLevel: category
      },
    })
  })
}
