import React from 'react'
import Card from '../components/card'

export default (props) => {
  const { blogPosts } = props.pathContext
  return  blogPosts.map(post => (
    <Card 
      title={post.node.frontmatter.title}
      category={post.node.frontmatter.category}
      thumbnail={post.node.frontmatter.thumbnail}
      link={post.node.fields.slug}
    />
  ))
}
