import React, { useState } from 'react';
import { 
  Route,
  AlertCircle,
  Wand2,
  MapPin,
  Clock,
  Users,
  Palette,
  Heart,
  Wallet,
  ChevronDown,
  Sparkles,
  X,
  Plus
} from 'lucide-react';

const TourFormComponent = ({ 
  formData, 
  setFormData, 
  isGenerating, 
  handleSubmit, 
  clearForm, 
  showResults, 
  currentStep,
  destinations,
  travelStyles,
  interests,
  toggleInterest,
  error
}) => {
  const [focusedField, setFocusedField] = useState(null);

  const getButtonContent = () => {
    if (isGenerating) {
      return (
        <>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
          <span>AI Creating Your Journey...</span>
        </>
      );
    }

    return (
      <>
        <Sparkles size={20} />
        <span>Generate AI Tour</span>
      </>
    );
  };

  const isFormValid = () => {
    return formData.destination && 
           formData.interests.length > 0 && 
           formData.travelStyle;
  };

  const getDurationLabel = (duration) => {
    const labels = {
      2: "Quick Tour",
      4: "Half Day", 
      6: "Extended",
      8: "Full Day",
      10: "Deep Dive",
      12: "Epic Journey"
    };
    return labels[duration] || `${duration} hours`;
  };

  const getGroupSizeLabel = (size) => {
    const labels = {
      1: "Solo Explorer",
      2: "Couple's Escape", 
      4: "Small Squad",
      6: "Group Adventure",
      10: "Big Crew",
      15: "Large Party"
    };
    return labels[size] || `${size} people`;
  };

  return (
    <div className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 rounded-2xl border border-gray-200/60 shadow-xl backdrop-blur-sm p-8 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-indigo-600/5 animate-pulse"></div>
      
      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Route className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Design Your Perfect Tour</h2>
              <p className="text-sm text-gray-600">AI-powered personalized experiences</p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">
              {Object.values(formData).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length}/6 complete
            </div>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${(Object.values(formData).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5"></div>
            <div className="relative flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h3 className="text-red-800 font-semibold">Generation Failed</h3>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Reset Button */}
        {(showResults || currentStep > 0) && (
          <div className="mb-8 text-center">
            <button 
              onClick={clearForm}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              <X size={16} />
              Start New Tour
            </button>
          </div>
        )}
        
        <div className="space-y-8">
          {/* Destination Field */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
              <MapPin size={16} className="text-purple-500" />
              Where would you like to explore?
            </label>
            <div className="relative">
              <select 
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                onFocus={() => setFocusedField('destination')}
                onBlur={() => setFocusedField(null)}
                className={`w-full bg-white/80 backdrop-blur-sm border-2 rounded-xl px-4 py-4 text-gray-900 text-base font-medium transition-all duration-300 appearance-none cursor-pointer ${
                  focusedField === 'destination' 
                    ? 'border-purple-400 shadow-lg shadow-purple-500/20 bg-white' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${formData.destination ? 'bg-gradient-to-r from-purple-50 to-blue-50' : ''}`}
                required
                disabled={isGenerating}
              >
                <option value="">Choose your destination</option>
                {destinations.map(dest => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Duration & Group Size Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                <Clock size={16} className="text-blue-500" />
                Duration
              </label>
              <div className="relative">
                <select 
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  onFocus={() => setFocusedField('duration')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-white/80 backdrop-blur-sm border-2 rounded-xl px-4 py-4 text-gray-900 text-base font-medium transition-all duration-300 appearance-none cursor-pointer ${
                    focusedField === 'duration' 
                      ? 'border-blue-400 shadow-lg shadow-blue-500/20 bg-white' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  disabled={isGenerating}
                >
                  <option value={2}>2 hours - Quick Tour</option>
                  <option value={4}>4 hours - Half Day</option>
                  <option value={6}>6 hours - Extended</option>
                  <option value={8}>8 hours - Full Day</option>
                  <option value={10}>10 hours - Deep Dive</option>
                  <option value={12}>12 hours - Epic Journey</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                <Users size={16} className="text-green-500" />
                Group Size
              </label>
              <div className="relative">
                <select 
                  value={formData.groupSize}
                  onChange={(e) => setFormData({...formData, groupSize: parseInt(e.target.value)})}
                  onFocus={() => setFocusedField('groupSize')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-white/80 backdrop-blur-sm border-2 rounded-xl px-4 py-4 text-gray-900 text-base font-medium transition-all duration-300 appearance-none cursor-pointer ${
                    focusedField === 'groupSize' 
                      ? 'border-green-400 shadow-lg shadow-green-500/20 bg-white' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  disabled={isGenerating}
                >
                  <option value={1}>Solo Explorer</option>
                  <option value={2}>Couple's Escape</option>
                  <option value={4}>Small Squad (3-4)</option>
                  <option value={6}>Group Adventure (5-6)</option>
                  <option value={10}>Big Crew (7-10)</option>
                  <option value={15}>Large Party (11+)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Travel Style */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
              <Palette size={16} className="text-pink-500" />
              What's your travel style?
            </label>
            <div className="relative">
              <select 
                value={formData.travelStyle}
                onChange={(e) => setFormData({...formData, travelStyle: e.target.value})}
                onFocus={() => setFocusedField('travelStyle')}
                onBlur={() => setFocusedField(null)}
                className={`w-full bg-white/80 backdrop-blur-sm border-2 rounded-xl px-4 py-4 text-gray-900 text-base font-medium transition-all duration-300 appearance-none cursor-pointer ${
                  focusedField === 'travelStyle' 
                    ? 'border-pink-400 shadow-lg shadow-pink-500/20 bg-white' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${formData.travelStyle ? 'bg-gradient-to-r from-pink-50 to-purple-50' : ''}`}
                required
                disabled={isGenerating}
              >
                <option value="">Select your style</option>
                {travelStyles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Interests & Activities */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
              <Heart size={16} className="text-red-500" />
              What interests you? 
              <span className="text-gray-500 font-normal text-xs bg-gray-100 px-2 py-1 rounded-full">
                {formData.interests.length} selected
              </span>
            </label>
            
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  disabled={isGenerating}
                  className={`relative px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 border-2 ${
                    formData.interests.includes(interest)
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg shadow-purple-500/30'
                      : 'bg-white/80 text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-white'
                  } ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className="relative z-10">{interest}</span>
                  {formData.interests.includes(interest) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl"></div>
                  )}
                </button>
              ))}
            </div>
            
            {formData.interests.length === 0 && (
              <div className="flex items-center gap-2 text-amber-600 text-sm bg-amber-50 p-3 rounded-lg border border-amber-200">
                <AlertCircle size={16} />
                <span>Please select at least one interest to continue</span>
              </div>
            )}
          </div>

          {/* Budget Slider */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
              <Wallet size={16} className="text-emerald-500" />
              Budget per Person
            </label>
            
            <div className="bg-white/60 rounded-xl p-6 border border-gray-200">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-gray-900">€{formData.budget}</span>
                  <span className="text-sm text-gray-500">
                    {formData.budget < 100 ? 'Budget' : formData.budget < 200 ? 'Standard' : formData.budget < 300 ? 'Premium' : 'Luxury'}
                  </span>
                </div>
                
                <input
                  type="range"
                  min="30"
                  max="500"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                  disabled={isGenerating}
                  className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${((formData.budget - 30) / (500 - 30)) * 100}%, #e5e7eb ${((formData.budget - 30) / (500 - 30)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>€30</span>
                  <span>€150</span>
                  <span>€300</span>
                  <span>€500+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button 
            onClick={handleSubmit}
            disabled={isGenerating || !isFormValid()}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-500 transform ${
              isFormValid() && !isGenerating
                ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              {getButtonContent()}
            </div>
          </button>

          {/* Form Validation Message */}
          {!isFormValid() && !isGenerating && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-gray-500 text-sm bg-gray-50 px-4 py-2 rounded-lg">
                <AlertCircle size={16} />
                <span>Complete all required fields to generate your tour</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #3b82f6);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
          border: 2px solid white;
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #3b82f6);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default TourFormComponent;