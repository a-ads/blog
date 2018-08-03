import React from 'react'

import Jumbotron from '../components/jumbotron'
import Card from '../components/card'
import AadsServices from '../components/aads-services'
import Pagination from '../components/pagination'
import Subscribe from '../components/subscribe'

export const query = graphql`
  query IndexPageQuery {
    blogPosts: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
      filter: {fileAbsolutePath: {regex: "/\\/(blog)\\//"}}
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            thumbnail
            category
          }
          fields {
            slug
          }
          excerpt
        }
      }
    } 
  }
`

export default class extends React.Component {
  render() {
    return (
      <div>
        {this.createJumbotron()}
        {this.createBlogPostCards()}
        {this.createBlogPostCardsMobile()}
        <div className='l-container'>
          <Subscribe mobile />
        </div>
        <AadsServices />
      </div>
    )
  }

  createJumbotron() {
    const jumbotronPost = this.getJumbotronPost()
    if (jumbotronPost)
      return <Jumbotron 
        title={jumbotronPost.node.frontmatter.title}
        category={jumbotronPost.node.frontmatter.category}
        link={jumbotronPost.node.fields.slug}
        thumbnail={jumbotronPost.node.frontmatter.thumbnail}
        description={jumbotronPost.node.excerpt}
      />
  }

  getJumbotronPost() {
    const mainJumbotronSlug = this.props.pathContext.mainJumbotronSlug
    const blogPosts = this.props.data.blogPosts
    return blogPosts.edges[blogPosts.edges.findIndex(post => (
      post.node.fields.slug === mainJumbotronSlug
    ))]
  }

  createBlogPostCards() {
    const blogPostCards = this.getBlogPostCards()
    return (
      <div className='l-card-group l-card-group--desktop'>
        <div className='l-card-group__card-container l-container'>
          {blogPostCards}
        </div>
        <div className='l-card-group__pagination-container l-container'>
          {/* <Pagination /> */}
        </div>
      </div>
    )
  }

  createBlogPostCardsMobile() {
    const blogPostCardsMobile = []
    const blogPostCardsData = [{}, {}, {}, {}, {}, {}]
    blogPostCardsData.forEach(() => {
      blogPostCardsMobile.push(<Card />)
    })

    return (
      <div className='l-card-group l-card-group--mobile'>
        <div className='l-card-group__card-container l-container'>
          {blogPostCardsMobile}
        </div>
        <div className='l-card-group__pagination-container l-container'>
          <div className='c-load-more-btn'>Load more</div>
        </div>
      </div>
    )
  }

  getBlogPostCards() {
    const blogPosts = this.props.data.blogPosts
    return blogPosts.edges.map(post => (
      <Card 
        link={post.node.fields.slug}
        thumbnail={post.node.frontmatter.thumbnail}
        title={post.node.frontmatter.title}
        category={post.node.frontmatter.category}
      />
    ))
  }  
}
