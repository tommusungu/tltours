import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Database from '@/hooks/Database';

// Function to slugify a title
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove non-alphanumeric characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
};

const BlogList = () => {
  const { blogs, loading, error } = Database();
  console.log(blogs)

  if (loading) {
    return <div className='w-full h-fit bg-gray-100'></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container p-3 sm:px-8 w-full">
      <div className="flex justify-center flex-col items-center w-full">
        <div className="w-full grid sm:grid-cols-3 gap-4">
          {blogs.map((product) => (
            <Link
              key={product.id}
              to={`/blogs/${slugify(product.title)}`} // Use the slugified title
            >
              <div data-aos="fade-in" className="relative mt-2">
                <img 
                  src={product.image[0]?.downloadURL} 
                  className="h-[40vh] sm:h-[40vh] w-full object-cover rounded-md" 
                  alt={product.title}
                />
                <div className="flex flex-col gap-2 p-2 transition-all">
                  <h1 className="text-start text-xl sm:text-2xl font-semibold text-gray-800">{product.title}</h1>
                  <div className="flex items-center text-gray-600 text-base outline-none leading-7 gap-2">
                    <p className='w-[2px] h-6 bg-primary-orange'/>
                    <p>{product.publishedDate}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
