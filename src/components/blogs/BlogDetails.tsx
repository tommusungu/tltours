import React from 'react'
import './blog.css'
const BlogDetails = ({blogDetails}) => {
  return (
    <div className="blog-details" dangerouslySetInnerHTML={{ __html: blogDetails }} />
  )
}

export default BlogDetails