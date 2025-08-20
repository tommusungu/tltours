import React from 'react';
import { 
  Sparkles,
  Bot,
  CheckCircle
} from 'lucide-react';

const TourSuccessHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-2 tracking-tight leading-tight">
            Your AI Tour is Ready!
          </h2>
          <p className="text-gray-600 font-medium text-sm">
            Personalized itinerary crafted just for you
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-purple-100/60 rounded-lg border border-purple-200/40 backdrop-blur-sm">
            <Sparkles size={14} className="text-purple-600" />
            <span className="font-medium text-xs text-purple-700">AI Generated</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-100/60 rounded-lg border border-blue-200/40 backdrop-blur-sm">
            <Bot size={14} className="text-blue-600" />
            <span className="font-medium text-xs text-blue-700">Personalized</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-100/60 rounded-lg border border-green-200/40 backdrop-blur-sm">
            <CheckCircle size={14} className="text-green-600" />
            <span className="font-medium text-xs text-green-700">Ready to Book</span>
          </div>
        </div>
      </div>
      
      {/* Mobile badges */}
      <div className="flex md:hidden items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 bg-purple-100/60 rounded-lg border border-purple-200/40 backdrop-blur-sm">
          <Sparkles size={14} className="text-purple-600" />
          <span className="font-medium text-xs text-purple-700">AI Generated</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-100/60 rounded-lg border border-blue-200/40 backdrop-blur-sm">
          <Bot size={14} className="text-blue-600" />
          <span className="font-medium text-xs text-blue-700">Personalized</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-green-100/60 rounded-lg border border-green-200/40 backdrop-blur-sm">
          <CheckCircle size={14} className="text-green-600" />
          <span className="font-medium text-xs text-green-700">Ready to Book</span>
        </div>
      </div>
    </div>
  );
};

export default TourSuccessHeader;