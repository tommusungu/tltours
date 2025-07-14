// import PageMeta from "../components/PageMeta";
import { useState } from 'react';
import PageMeta from './PageMeta';
import { Navbar } from '../Navbar';
import BlogDetails from './BlogDetails';

const Blog = ({ selectedEvent }) => {
  const [isLoading, setIsLoading] = useState(false); // Set default to false since we're not using useEffect

  const blogImage = selectedEvent.image && selectedEvent.image.length > 0 ? selectedEvent.image[0].downloadURL : null;

  return (
    <div>
      <PageMeta
        title={selectedEvent.title}
        description={selectedEvent.description}
      />
      <div className="relative">
        {isLoading ? (
          <div>
            {/* Loading spinner or placeholder can be added here */}
          </div>
        ) : (
          <div className="relative">
            <Navbar />
           
          
          </div>
        )}
      </div>
      <div className="w-full flex justify-center items-center bg-gray-50">
        <div className="container blog-details pt-24 px-3 sm:px-12 md:px-12 lg:px-16">
          <div className="mb-2">
          <h1>{selectedEvent.title}</h1>
            <div className="flex py-3 items-center text-gray-600 text-base outline-none leading-7 gap-2">
                  {/* <p><strong>By</strong> {selectedEvent.author}</p> */}
                  <p className='w-[2px] h-6 bg-primary-orange'/>
                  <p> {selectedEvent.publishedDate}</p>
                </div>
            <p>{selectedEvent.description}</p>
          {blogImage && (

<div className="mt-3">
  <img
    src={blogImage}
    alt={selectedEvent.title}
    className="w-full h-auto rounded-xl object-cover"
  />
  
</div>
)}
           
          </div>
          <BlogDetails blogDetails={selectedEvent.details} />
          
        </div>
      </div>
     
    </div>
  );
}

export default Blog;
