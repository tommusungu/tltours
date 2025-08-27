import React from 'react';
import './blog.css';

const BlogDetails = ({ blogDetails }) => {
  return (
    <div 
      className="modern-blog-details prose prose-lg max-w-none" 
      dangerouslySetInnerHTML={{ __html: blogDetails }} 
    />
  );
};

export default BlogDetails;