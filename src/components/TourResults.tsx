import React from 'react';
import { 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Globe, 
  Navigation,
  CheckCircle,
  Calendar,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  Route,
  Sparkles
} from 'lucide-react';

const TourResults = ({ generatedTour, showFeatures, setShowFeatures }) => {
  return (
    <div className="mt-8 space-y-8 text-gray-900 font-sans tracking-tight leading-snug">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100/50 shadow-xl shadow-purple-500/10">
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-lg animate-pulse"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-4 py-2 shadow-lg">
              <MapPin className="text-blue-600 w-4 h-4" />
              <span className="text-blue-700 font-semibold text-sm">{generatedTour.destination}</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100/80 backdrop-blur-sm border border-yellow-200/50 rounded-full px-3 py-2 shadow-lg">
              <Star className="text-yellow-500 w-4 h-4 fill-current" />
              <span className="text-yellow-700 font-semibold text-sm">{generatedTour.rating}/5</span>
            </div>
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3 leading-tight">
            {generatedTour.title}
          </h3>
          
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-medium max-w-3xl">
            {generatedTour.description}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: 'Duration', value: `${generatedTour.duration}` },
          { icon: Users, label: 'Group Size', value: `${generatedTour.groupSize}` },
          { icon: Navigation, label: 'Difficulty', value: 'Easy' },
          { icon: Globe, label: 'Languages', value: '3' },
        ].map(({ icon: Icon, label, value }, idx) => (
          <div key={idx} className={`group bg-gradient-to-br from-white to-${label === 'Languages' ? 'emerald' : label === 'Difficulty' ? 'purple' : label === 'Group Size' ? 'orange' : 'blue'}-50/30 rounded-2xl p-6 text-center border hover:shadow-xl transition-all duration-500 cursor-pointer`}>
            <div className={`w-12 h-12 bg-gradient-to-r from-${label === 'Languages' ? 'emerald' : label === 'Difficulty' ? 'purple' : label === 'Group Size' ? 'orange' : 'blue'}-500 to-${label === 'Languages' ? 'emerald' : label === 'Difficulty' ? 'purple' : label === 'Group Size' ? 'orange' : 'blue'}-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <Icon className="text-white w-6 h-6" />
            </div>
            <div className="text-gray-900 font-bold text-lg mb-1">{value}</div>
            <div className="text-sm text-gray-600 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50/50 to-emerald-50/30 rounded-3xl p-8 border border-green-100/50 shadow-xl shadow-green-500/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-2xl"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Experience Highlights</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedTour.highlights.slice(0, 6).map((highlight, index) => (
              <div key={index} className="group flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border hover:shadow-lg transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                  <CheckCircle className="text-white w-4 h-4" />
                </div>
                <span className="text-gray-800 font-semibold text-sm leading-relaxed">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 rounded-3xl p-8 text-center border border-purple-100/50 shadow-xl shadow-purple-500/10">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-3">
            Ready for Your Adventure?
          </h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-base leading-relaxed font-medium">
            This AI-curated experience combines the best of your destination with personalized touches just for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button aria-label="Book experience" className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3">
              <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Book This Experience
            </button>
            <button aria-label="Save experience" className="group px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 hover:border-purple-300/70 text-purple-700 hover:text-purple-800 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3">
              <Heart className="w-5 h-5 group-hover:scale-110 group-hover:text-red-500 transition-all duration-300" />
              Save for Later
            </button>
            <button aria-label="Share tour" className="group px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-blue-200/50 hover:border-blue-300/70 text-blue-700 hover:text-blue-800 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3">
              <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Share Tour
            </button>
          </div>

          <button 
            onClick={() => setShowFeatures(!showFeatures)}
            className="group text-purple-700 hover:text-purple-800 font-semibold flex items-center justify-center gap-2 mx-auto transition-all duration-300 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-purple-200/50 hover:border-purple-300/70 hover:shadow-lg"
          >
            {showFeatures ? (
              <>
                Hide Detailed View
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
              </>
            ) : (
              <>
                Show Detailed View
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourResults;