const { createFilePath } = require('gatsby-source-filesystem')
const path = require(`path`)
const R = require('ramda')
const getCategoryPath = require('./src/utils/get-category-path')
const fs = require('fs')

const POSTS_PER_PAGE = 8
const CATEGORIES_POSTS_PER_PAGE = 10

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

    if (!node.frontmatter.popularity) {
      node.frontmatter.popularity = 0
    } else {
      node.frontmatter.popularity = parseInt(node.frontmatter.popularity)
    }

    const firstCategoryTopLevel = R.pathOr(null, ['frontmatter', 'category_top_level', 0], node)
    if (firstCategoryTopLevel) {
      node.frontmatter.first_category_top_level = firstCategoryTopLevel
    }

    const firstCategorySecondLevel = R.pathOr(null, ['frontmatter', 'category_second_level', 0], node)
    if (firstCategorySecondLevel) {
      node.frontmatter.first_category_second_level = firstCategorySecondLevel
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
      allBlogPosts: allMarkdownRemark(
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
              title
              category_top_level
              thumbnail {
                publicURL
              }
              slug
            }
          }
        }
      }

      allAuthors: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/^.*/content/authors/.*.md$/"}}
      ) {
        totalCount
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              name
            }
          }
        }
      }

      postsByCategoryTopLevel: allMarkdownRemark {
        group(field: {frontmatter: {first_category_top_level: SELECT}}) {
          fieldValue
          totalCount
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }

      postsByCategorySecondLevel: allMarkdownRemark {
        group(field: {frontmatter: {category_second_level: SELECT}}) {
          fieldValue
          totalCount
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `)

  if (errors) {
    console.log(`Gatsby-node threw: ${errors}`)
  }

  const posts = data.allBlogPosts.edges
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

  data.postsByCategoryTopLevel.group.forEach(group => {
    const numPages = Math.ceil(group.edges.length / CATEGORIES_POSTS_PER_PAGE)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i <= 0
          ? getCategoryPath(group.fieldValue)
          : `${getCategoryPath(group.fieldValue)}page/${i + 1}`,
        component: path.resolve('./src/templates/category-top.js'),
        context: {
          categoryTopLevel: group.fieldValue,
          numPages,
          limit: CATEGORIES_POSTS_PER_PAGE,
          skip: i * CATEGORIES_POSTS_PER_PAGE,
          currentPage: i + 1
        },
      })
    })
  })

  data.postsByCategorySecondLevel.group.forEach(group => {
    const numPages = Math.ceil(group.edges.length / CATEGORIES_POSTS_PER_PAGE)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i <= 0
          ? getCategoryPath(group.fieldValue)
          : `${getCategoryPath(group.fieldValue)}page/${i + 1}`,
        component: path.resolve('./src/templates/category-second.js'),
        context: {
          categorySecondLevel: group.fieldValue,
          numPages,
          limit: CATEGORIES_POSTS_PER_PAGE,
          skip: i * CATEGORIES_POSTS_PER_PAGE,
          currentPage: i + 1
        },
      })
    })
  })

  const authors = data.allAuthors.edges
  authors.forEach(author => {
    createPage({
      path: author.node.fields.slug,
      component: path.resolve('./src/templates/author.js'),
      context: {
        slug: author.node.fields.slug,
        authorName: author.node.frontmatter.name
      }
    })
  })

  createPage({
    path: '/authors/',
    component: path.resolve('./src/templates/authors.js')
  })

  const blogPostsForAadsMainPage = JSON.parse(
    JSON.stringify(R.take(9, data.allBlogPosts.edges))
  ).map(function (post) {
    if (post.node.frontmatter.thumbnail) {
      post.node.frontmatter.thumbnail =
        post.node.frontmatter.thumbnail.publicURL
    }
    if (post.node.fields.slug) {
      post.node.frontmatter.slug = '/blog/' + post.node.frontmatter.slug + '/'
      post.node.fields.slug = post.node.frontmatter.slug
    }
    post.node.html = ''
    return post
  })
  fs.writeFile(
    path.resolve('./public/main_page_blogposts_preview.json'),
    JSON.stringify(blogPostsForAadsMainPage),
    function (err) {
      console.log(err)
    }
  )

  const blogPosts2 = JSON.parse(
    JSON.stringify(data.allBlogPosts.edges)
  ).map(function (post) {
    if (post.node.frontmatter.thumbnail) {
      post.node.frontmatter.thumbnail = post.node.frontmatter.thumbnail.publicURL
    }

    if (post.node.fields.slug) {
      post.node.frontmatter.slug = '/blog/' + post.node.frontmatter.slug + '/'
      post.node.fields.slug = post.node.frontmatter.slug
    }
    post.node.html = ''
    return post
  })

  const specificBlogPostsUrls = [
    '/blog/a-closer-look-at-a-ads-customer-support/',
    '/blog/pros-and-cons-of-remote-work-finding-the-right-balance/',
    '/blog/how-to-get-a-job-in-cryptocurrency/'
  ]

  const specificBlogPosts = blogPosts2.filter(function (post) {
    return specificBlogPostsUrls.includes(post.node.frontmatter.slug)
  })

  const specificBlogPostsProcessed = R.compose(
    R.take(9),
    R.uniqWith(R.equals),
    R.take(12),
    R.concat(specificBlogPosts)
  )(blogPosts2);

  fs.writeFile(
    path.resolve('./public/extra_blogposts_preview.json'),
    JSON.stringify(specificBlogPostsProcessed),
    function (err) {
      console.log(err)
    }
  )
}
