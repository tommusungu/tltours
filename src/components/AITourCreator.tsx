import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Wand2, 
  Globe, 
  Play, 
  CheckCircle,
  TrendingUp,
  Bot,
  Navigation,
  Camera,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Eye,
  Share2,
  Route,
  Image as ImageIcon,
  MessageSquare,
  Bookmark,
  Download,
  Heart,
  AlertCircle
} from 'lucide-react';
import { TourHeader } from './tour-ai/TourHeader';
import { TourForm } from './tour-ai/TourForm';
import { WorkflowVisualization } from './tour-ai/WorkflowVisualization';
import { TourResults } from './tour-ai/TourResults';

// Import real API utilities - simplified version
import { 
  useTourGeneration, 
  CreateTourRequest, 
  TourResponse
} from '../utils/api/hooks/useTours';

export default function AITourCreator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    duration: 4,
    interests: [] as string[],
    budget: 100,
    groupSize: 5,
    travelStyle: ''
  });

  // Use real API hooks instead of simulation
  const { 
    generateSampleTour, 
    loading: isGenerating, 
    error: tourError,
    lastGeneratedTour,
    clearError 
  } = useTourGeneration();

  // Add custom CSS animations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes compass {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(10deg);
          }
          50% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(8deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-compass {
          animation: compass 3s ease-in-out infinite;
          transform-origin: center;
        }
        
        .animate-compass:hover {
          animation: compass 0.8s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  // Simulate progress steps during real API call
  useEffect(() => {
    if (isGenerating) {
      setCurrentStep(0);
      setShowResults(false);
      
      // Show realistic progress while real API is working
      const progressInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < 5) return prev + 1;
          return prev;
        });
      }, 3000);

      return () => clearInterval(progressInterval);
    }
  }, [isGenerating]);

  // Handle successful tour generation
  useEffect(() => {
    if (lastGeneratedTour && !isGenerating) {
      setCurrentStep(6); // Mark as completed
      setShowResults(true);
      console.log('✅ Real tour generated:', lastGeneratedTour.title);
    }
  }, [lastGeneratedTour, isGenerating]);

  const steps = [
    { id: 0, title: 'Destination Analysis', icon: MapPin, status: 'pending' },
    { id: 1, title: 'AI Route Planning', icon: Navigation, status: 'pending' },
    { id: 2, title: 'Content Generation', icon: MessageSquare, status: 'pending' },
    { id: 3, title: 'Visual Creation', icon: ImageIcon, status: 'pending' },
    { id: 4, title: 'Local Insights', icon: Globe, status: 'pending' },
    { id: 5, title: 'Tour Package Ready', icon: Sparkles, status: 'pending' }
  ];

  // Use hardcoded data for now since the constants aren't exported yet
  const interests = [
    'History', 'Art & Museums', 'Food & Wine', 'Architecture', 'Shopping', 'Nature', 
    'Photography', 'Local Culture', 'Nightlife', 'Adventure', 'Family Fun', 'Romance'
  ];

  // Hardcoded destinations (you can move these to config later)
  const destinations = [
    'Paris, France', 
    'Rome, Italy', 
    'Barcelona, Spain', 
    'Amsterdam, Netherlands', 
    'Prague, Czech Republic', 
    'Vienna, Austria',
    'London, United Kingdom',
    'Berlin, Germany',
    'Tokyo, Japan',
    'Florence, Italy'
  ];

  const travelStyles = [
    'Cultural',
    'Adventure', 
    'Luxury',
    'Budget',
    'Family',
    'Romantic',
    'Business',
    'Solo'
  ];

  // Real API call instead of simulation
  const handleSubmit = async () => {
    if (formData.destination && formData.interests.length > 0 && formData.travelStyle) {
      console.log('🎯 Generating real AI tour with data:', formData);
      
      // Clear any previous errors
      clearError();
      
      // Convert form data to API format
      const tourRequest: CreateTourRequest = {
        destination: formData.destination.split(',')[0].trim(), // Remove country part
        duration: formData.duration,
        interests: formData.interests.map(i => i.toLowerCase().replace('&', 'and').replace(' ', '_')),
        travelStyle: formData.travelStyle,
        budget: formData.budget,
        groupSize: formData.groupSize
      };

      console.log('📡 Sending request to backend:', tourRequest);

      // Call real API
      const tour = await generateSampleTour(tourRequest);
      
      if (tour) {
        console.log('✅ Real AI tour generated successfully:', tour.title);
      }
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep && isGenerating) return 'active';
    return 'pending';
  };

  const clearForm = () => {
    setFormData({
      destination: '',
      duration: 4,
      interests: [],
      budget: 100,
      groupSize: 5,
      travelStyle: ''
    });
    setCurrentStep(0);
    setShowResults(false);
    clearError();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      
      {/* Header Component */}
      <TourHeader />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* API Connection Status */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-600 hover:border-green-400/50 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">
              Connected to AI Backend • Real OpenAI Integration
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Tour Form Component */}
          <TourForm 
            formData={formData}
            setFormData={setFormData}
            isGenerating={isGenerating}
            handleSubmit={handleSubmit}
            clearForm={clearForm}
            showResults={showResults}
            currentStep={currentStep}
            destinations={destinations}
            travelStyles={travelStyles}
            interests={interests}
            toggleInterest={toggleInterest}
          />

          {/* AI Workflow Visualization Component */}
          <WorkflowVisualization 
            steps={steps}
            getStepStatus={getStepStatus}
            currentStep={currentStep}
          />
        </div>

        {/* Error Display */}
        {tourError && (
          <div className="mt-8 animate-fadeInUp">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 hover:border-red-400/40 hover:bg-red-500/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-semibold text-red-400">Generation Failed</h3>
              </div>
              <p className="text-red-300 mb-4">{tourError}</p>
              <button
                onClick={clearError}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Real API Results Section */}
        {showResults && lastGeneratedTour && (
          <div className="mt-16 animate-fadeInUp">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 hover:border-white/30 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2 hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                    🎉 Your AI Tour is Ready!
                  </h2>
                  <div className="flex items-center gap-4 text-slate-300">
                    <span className="hover:text-blue-300 transition-colors duration-300 cursor-pointer">✨ Powered by Real AI</span>
                    <span>•</span>
                    <span className="hover:text-purple-300 transition-colors duration-300 cursor-pointer">🤖 Generated with OpenAI GPT-4</span>
                    <span>•</span>
                    <span className="text-green-400 hover:text-green-300 transition-colors duration-300 cursor-pointer">✅ Live Backend</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFeatures(!showFeatures)}
                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    {showFeatures ? 'Hide Details' : 'Show Features'}
                  </button>
                  <button
                    onClick={clearForm}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Generate New Tour
                  </button>
                </div>
              </div>

              {/* Real Tour Data Display */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-blue-400/50 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-blue-400 hover:scale-110 transition-transform duration-300" />
                    <span className="text-slate-300 text-sm">Destination</span>
                  </div>
                  <div className="text-white font-semibold">{lastGeneratedTour.destination}</div>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-green-400/50 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-green-400 hover:scale-110 transition-transform duration-300" />
                    <span className="text-slate-300 text-sm">Duration</span>
                  </div>
                  <div className="text-white font-semibold">{lastGeneratedTour.duration}</div>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-yellow-400/50 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 hover:scale-110 transition-transform duration-300" />
                    <span className="text-slate-300 text-sm">Rating</span>
                  </div>
                  <div className="text-white font-semibold">{lastGeneratedTour.rating}/5</div>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-purple-400/50 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-purple-400 hover:scale-110 transition-transform duration-300" />
                    <span className="text-slate-300 text-sm">Group Size</span>
                  </div>
                  <div className="text-white font-semibold">{lastGeneratedTour.groupSize}</div>
                </div>
              </div>

              {/* Pass real tour data to results component */}
              <TourResults 
                generatedTour={lastGeneratedTour}
                showFeatures={showFeatures}
                setShowFeatures={setShowFeatures}
              />

              {/* API Debug Info (removable in production) */}
              <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-green-400/30 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-green-400 hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-slate-300">API Response Details</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Tour ID:</span>
                    <div className="text-slate-300 font-mono">{lastGeneratedTour.id}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Status:</span>
                    <div className="text-green-400">{lastGeneratedTour.status}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Generated:</span>
                    <div className="text-slate-300">{new Date(lastGeneratedTour.createdAt).toLocaleTimeString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Itinerary Steps:</span>
                    <div className="text-slate-300">{lastGeneratedTour.itinerary?.length || 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}