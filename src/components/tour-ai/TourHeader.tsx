// components/tour-ai/TourHeader.tsx
import { TrendingUp, Bot, Clock } from 'lucide-react';

export const TourHeader = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="text-4xl animate-compass cursor-pointer">🗺️</div>
        <h1 className="text-2xl font-bold text-white relative">
          <span className="inline-block animate-fadeInUp">AI</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 inline-block animate-fadeInUp [animation-delay:0.2s] hover:scale-105 transition-transform duration-300 ml-2">Tour Creator</span>
        </h1>
      </div>
      <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fadeInUp [animation-delay:0.4s]">
        Watch our advanced AI analyze destinations, optimize routes, and create personalized tours with local insights - all generated in real-time.
      </p>
      
      {/* Live Stats */}
      <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm animate-fadeInUp [animation-delay:0.6s]">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-green-400" size={16} />
          <span className="text-gray-300">3.4K+ Tours Generated</span>
        </div>
        <div className="flex items-center gap-2">
          <Bot className="text-purple-400" size={16} />
          <span className="text-gray-300">GPT-4 + Local Data</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="text-blue-400" size={16} />
          <span className="text-gray-300">45-second Creation</span>
        </div>
      </div>
    </div>
  );
};