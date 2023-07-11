const resolve = require('path').resolve
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg', '.png'],
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    if (_.startsWith(node.frontmatter.thumbnail, 'blog/assets/')) {
      node.frontmatter.thumbnail = node.frontmatter.thumbnail.replace(
        'blog/assets/',
        '../../static/assets/'
      )
    }

    if (_.startsWith(node.frontmatter.thumbnail, '/blog/assets/')) {
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

// We only need the full post data for the blog post page. For the blog post card we only need a subset of the data
const toBlogPostCardProps = ({
  html,
  tableOfContents,
  date,
  excerpt,
  author,
  related_posts,
  category,
  tags,
  popularity,
  ...blogPostCardProps
}) => blogPostCardProps

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data, errors } = await graphql(`
    {
      allBlogPosts: allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*.md$/" } }
      ) {
        totalCount
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              author
              category
              category_top_level
              category_second_level
              date(formatString: "DD MMMM YYYY")
              popularity
              tags
              reading_time
              thumbnail {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    quality: 100
                    layout: FULL_WIDTH
                    transformOptions: { cropFocus: CENTER }
                  )
                }
              }
              meta_title
              meta_description
              title
              slug
              json_ld
            }
            html
            tableOfContents
          }
        }
      }

      allAuthors: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/^.*/content/authors/.*.md$/" } }
      ) {
        totalCount
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              name
              thumbnail {
                childImageSharp {
                  gatsbyImageData(
                    blurredOptions: { width: 100 }
                    placeholder: BLURRED
                    quality: 100
                    transformOptions: { cropFocus: CENTER }
                    height: 266
                    width: 266
                  )
                }
              }
              position
              description
              json_ld
            }
            html
          }
        }
      }

      allBlogCategoriesTopLevelYaml {
        edges {
          node {
            title
            h1
            html_title
            breadcrumb
            meta_description
            order
          }
        }
      }

      allBlogCategoriesSecondLevelYaml {
        edges {
          node {
            title
            h1
            html_title
            breadcrumb
            meta_description
            order
            parent_category
          }
        }
      }
    }
  `)

  if (errors) console.log(`Gatsby-node threw: ${errors}`)

  // Grab raw fetch results and flatten their key value pairs
  const rawPosts = data.allBlogPosts.edges.map(({ node }) => node)
  const posts = rawPosts.map(({ fields, frontmatter, ...rest }) => {
    return {
      ...fields,
      ...frontmatter,
      ...rest,
    }
  })
  const rawAuthors = data.allAuthors.edges.map(({ node }) => node)
  const authors = rawAuthors.map(({ fields, frontmatter, ...rest }) => {
    return {
      ...fields,
      ...frontmatter,
      ...rest,
    }
  })

  // Blog Post Pages
  posts.forEach((post) => {
    createPage({
      path: post.slug,
      component: resolve(`${__dirname}/src/templates/BlogPostTemplate.tsx`),
      context: {
        post: post,
        author: authors.find((author) => author.name === post.author),
        slug: post.slug,
        html: post.html,
        table_of_contents: post.tableOfContents,
        related_posts: posts
          .filter(
            ({ category_top_level }) =>
              category_top_level[0] === post.category_top_level[0]
          )
          .map((relatedPost, index) => index < 7 && relatedPost)
          .filter(Boolean)
          .map(toBlogPostCardProps), // Grab only 7 related posts
      },
    })
  })

  // Search pages
  createPage({
    path: '/search/',
    component: resolve(`${__dirname}/src/templates/SearchTemplate.tsx`),
    context: {
      posts: posts.map(toBlogPostCardProps),
    },
  })

  // Individual author pages
  const authorBlogPostCount = posts.reduce((acc, post) => {
    if (acc[post.author]) {
      acc[post.author] += 1
    } else {
      acc[post.author] = 1
    }
    return acc
  }, {})

  authors.forEach((author) => {
    createPage({
      path: author.slug,
      component: resolve(`${__dirname}/src/templates/AuthorTemplate.tsx`),
      context: {
        name: author.name,
        thumbnail: author.thumbnail,
        position: author.position,
        description: author.description,
        // education: author.education,
        html: author.html,
        json_ld: author.json_ld,
        postCount: authorBlogPostCount[author.name],
        posts: posts
          .filter(({ author: postAuthor }) => postAuthor === author.name)
          .map(toBlogPostCardProps),
      },
    })
  })

  // Shouldnt be here, but due to how md files are structured, we need to create a page for all authors as a template
  // All authors page (pass each author's article count)
  createPage({
    path: '/authors',
    component: resolve(`${__dirname}/src/templates/AuthorsPage.tsx`),
    context: {
      authors: authors.map((author) => ({
        ...author,
        postCount: authorBlogPostCount[author.name],
      })),
    },
  })

  // Category pages
  const categories = data.allBlogCategoriesTopLevelYaml.edges.map(
    ({ node }) => ({
      title: node.title,
      meta_description: node.meta_description,
      ...node,
    })
  )
  const subcategories = data.allBlogCategoriesSecondLevelYaml.edges
  const subcategoriesWithPosts = subcategories
    .filter(({ node }) => {
      const subcategoryPosts = posts.filter(
        ({ category_second_level }) =>
          category_second_level && category_second_level.includes(node.title)
      )
      return subcategoryPosts.length > 0
    })
    .map(({ node }) => {
      const subcategoryPosts = posts.filter(
        ({ category_second_level }) =>
          category_second_level && category_second_level.includes(node.title)
      )
      return {
        subcategoryName: node.title,
        posts: subcategoryPosts.map(toBlogPostCardProps),
        ...node,
      }
    })

  // Create Category Pages with their unique urls and subcategory posts
  const categoryPages = []
  categories.forEach((category) => {
    const allPostsForOneCategory = posts.filter(
      ({ category_top_level }) => category_top_level[0] === category.title
    )
    const allAsSubcategory = {
      subcategoryName: 'All',
      posts: allPostsForOneCategory,
    }
    const subcats = [allAsSubcategory, ...subcategoriesWithPosts]

    subcats.forEach((subcat) => {
      if (subcat.subcategoryName === 'All') {
        categoryPages.push({
          path: `/categories/${category.title}/`,
          posts: subcat.posts,
          categoryObj: category,
          category: category.title,
        })
      } else if (category.title === 'Guides') {
        categoryPages.push({
          path: `/categories/${subcat.subcategoryName}/`,
          posts: subcat.posts,
          category: category.title,
          categoryObj: subcat,
        })
      }
    })
  })

  const subcategoryNames = subcategoriesWithPosts.map(
    ({ subcategoryName }) => subcategoryName
  )
  subcategoryNames.unshift('All')

  categoryPages.forEach((page) =>
    createPage({
      path: page.path
        .toLowerCase()
        .replace('news & trends', 'news-trends')
        .replace(' ', '-'),
      component: resolve(`${__dirname}/src/templates/CategoryTemplate.tsx`),
      context: {
        category: page.category,
        subcategories: subcategoryNames,
        meta_description: page.meta_description,
        categoryObj: page.categoryObj,
        posts: page.posts.map(toBlogPostCardProps),
      },
    })
  )

  const blogPostsForAadsMainPage = JSON.parse(
    JSON.stringify(_.take(data.allBlogPosts.edges, 9))
  ).map(function (post) {
    if (post.node.frontmatter.thumbnail) {
      post.node.frontmatter.thumbnail =
        post.node.frontmatter.thumbnail.childImageSharp.gatsbyImageData.images.fallback.src
    }
    if (post.node.fields.slug) {
      post.node.frontmatter.slug = '/blog/' + post.node.frontmatter.slug + '/'
      post.node.fields.slug = post.node.frontmatter.slug
    }
    return post
  })
  fs.writeFile(
    path.resolve('./public/main_page_blogposts_preview.json'),
    JSON.stringify(blogPostsForAadsMainPage),
    function (err) {
      console.log(err)
    }
  )
}
