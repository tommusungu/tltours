import { useState } from 'react';
import { motion } from 'framer-motion';
import PageMeta from './PageMeta';
import { Navbar } from '../Navbar';
import BlogDetails from './BlogDetails';
import { Calendar, Clock, Tag, Share2, ArrowLeft, Heart, Bookmark } from 'lucide-react';

const Blog = ({ selectedEvent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const blogImage = selectedEvent.image && selectedEvent.image.length > 0 ? selectedEvent.image[0].downloadURL : null;

  const handleBack = () => {
    window.history.back();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedEvent.title,
          text: selectedEvent.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    }
  };

  // Extract tags from the tags string
  const tags = selectedEvent.tags ? selectedEvent.tags.split(',').map(tag => tag.trim()) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageMeta
        title={selectedEvent.title}
        description={selectedEvent.description}
      />

      <div className="relative">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <Navbar />
            
            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative pt-24 pb-8 bg-primary text-white overflow-hidden"
            >
              {/* Decorative background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
              </div>

              <div className="container mx-auto px-4 sm:px-8 lg:px-24 relative z-10">
                {/* Back button */}
                <motion.button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 mb-6"
                  whileHover={{ x: -2 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Blog
                </motion.button>

                <div className="max-w-4xl">
                  {/* Category badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-400/20">
                      <Tag className="w-4 h-4" />
                      {selectedEvent.category}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
                  >
                    {selectedEvent.title}
                  </motion.h1>

                  {/* Meta information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center gap-6 text-slate-300 mb-6"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span>{selectedEvent.publishedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-400" />
                      <span>5 min read</span>
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-slate-300 leading-relaxed max-w-3xl"
                  >
                    {selectedEvent.description}
                  </motion.p>

                  {/* Action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4 mt-8"
                  >
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                        isLiked 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{isLiked ? 'Liked' : 'Like'}</span>
                    </button>
                    
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                        isBookmarked 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                      <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Main Content */}
            <section className="py-12 bg-gradient-to-br from-slate-50 to-white">
              <div className="container mx-auto px-4 sm:px-8 lg:px-24">
                <div className="max-w-4xl mx-auto">
                  {/* Featured Image */}
                  {blogImage && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="mb-12 relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                        <img
                          src={blogImage}
                          alt={selectedEvent.title}
                          className="w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tags */}
                  {tags.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="mb-8"
                    >
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Blog Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100"
                  >
                    <BlogDetails blogDetails={selectedEvent.details} />
                  </motion.div>

                  {/* Bottom Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Enjoyed this article?</h3>
                        <p className="text-gray-600">Share it with your friends and family!</p>
                      </div>
                      <button
                        onClick={handleShare}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                      >
                        <Share2 className="w-5 h-5" />
                        Share Article
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;