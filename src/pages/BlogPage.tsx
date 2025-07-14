// BlogPage.tsx
import Blog from '@/components/blogs/Blog';
import { Footer } from '@/components/Footer';
import Database from '@/hooks/Database';
import React from 'react';
import { useParams } from 'react-router-dom';

// Function to slugify a title (same as in BlogList)
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove non-alphanumeric characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
};

const BlogPage = () => {
  const { id } = useParams(); // Get the slugified title from the URL
  const { blogs } = Database();

  // Find the selected blog post based on the slugified title
  const selectedEvent = blogs.find(event => slugify(event.title) === id);

  return (
    <div>
      {selectedEvent ? (
        <div>
          <Blog selectedEvent={selectedEvent}  />
          <Footer/>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center w-full h-[100vh] bg-slate-100">
            <div className="custom-loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
