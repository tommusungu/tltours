// components/tour-ai/TourForm.tsx
import { Route, Wand2 } from 'lucide-react';

interface FormData {
  destination: string;
  duration: number;
  interests: string[];
  budget: number;
  groupSize: number;
  travelStyle: string;
}

interface TourFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  isGenerating: boolean;
  handleSubmit: () => void;
  clearForm: () => void;
  showResults: boolean;
  currentStep: number;
  destinations: string[];
  travelStyles: string[];
  interests: string[];
  toggleInterest: (interest: string) => void;
}

export const TourForm = ({ 
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
  toggleInterest 
}: TourFormProps) => {
  const getButtonContent = () => {
    if (isGenerating) {
      return (
        <>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
          <span>AI Creating Tour...</span>
        </>
      );
    }

    return (
      <>
        <Wand2 size={20} />
        <span>Generate AI Tour</span>
      </>
    );
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-8">
      <h2 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
        <Route className="text-purple-400" size={20} />
        Design Your Perfect Tour
      </h2>
      
      {/* Reset Button */}
      {(showResults || currentStep > 0) && (
        <div className="mb-6 text-center">
          <button 
            onClick={clearForm}
            className="text-gray-400 hover:text-white text-sm underline transition-colors duration-300"
          >
            Start New Tour
          </button>
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <label className="block text-white font-medium mb-2 text-sm">Destination</label>
          <select 
            value={formData.destination}
            onChange={(e) => setFormData({...formData, destination: e.target.value})}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none text-sm"
            required
            disabled={isGenerating}
          >
            <option value="">Choose your destination</option>
            {destinations.map(dest => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2 text-sm">Duration</label>
            <select 
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none text-sm"
              disabled={isGenerating}
            >
              <option value={2}>2 hours</option>
              <option value={4}>4 hours</option>
              <option value={6}>6 hours</option>
              <option value={8}>Full day</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-sm">Group Size</label>
            <select 
              value={formData.groupSize}
              onChange={(e) => setFormData({...formData, groupSize: parseInt(e.target.value)})}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none text-sm"
              disabled={isGenerating}
            >
              <option value={1}>Solo traveler</option>
              <option value={2}>Couple</option>
              <option value={5}>Small group (3-6)</option>
              <option value={10}>Large group (7+)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2 text-sm">Travel Style</label>
          <select 
            value={formData.travelStyle}
            onChange={(e) => setFormData({...formData, travelStyle: e.target.value})}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none text-sm"
            required
            disabled={isGenerating}
          >
            <option value="">Select your style</option>
            {travelStyles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-3 text-sm">Interests & Activities</label>
          <div className="grid grid-cols-2 gap-2">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                disabled={isGenerating}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  formData.interests.includes(interest)
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2 text-sm">Budget per Person (€)</label>
          <input
            type="range"
            min="30"
            max="250"
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
            disabled={isGenerating}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>€30</span>
            <span className="text-white font-medium">€{formData.budget}</span>
            <span>€250</span>
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={isGenerating || !formData.destination || formData.interests.length === 0 || !formData.travelStyle}
          className="w-full bg-white text-black hover:bg-gray-100 disabled:bg-gray-600 disabled:text-gray-400 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
        >
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
};