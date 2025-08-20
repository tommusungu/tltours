import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Globe, 
  Bot,
  Navigation,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  CheckCircle,
  Route,
  AlertCircle,
  Palette,
  Heart,
  Wallet,
  ChevronDown,
  Check,
  X,
  Zap,
  Camera,
  Utensils,
  Building,
  TreePine,
  ShoppingBag,
  Music,
  Brush,
  Monitor,
  Users as UsersIcon,
  Home,
  Mountain,
  Landmark
} from 'lucide-react';
import TourResults from './TourResults';
import TourSuccessHeader from './TourSuccessHeader';
import WorkflowVisualizationComponent from './WorkflowVisualizationComponent';
import { useTourGeneration } from '@/utils/api/hooks/useTours';
import { tourGenerationService } from '@/utils/api/services/tour-generation.service';

const TourCreator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    duration: 4,
    interests: [],
    budget: 100,
    groupSize: 2,
    travelStyle: ''
  });

  const { generateSampleTour, loading: isGenerating, error, lastGeneratedTour, clearError } = useTourGeneration();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {
          font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji';
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

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
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .interest-button {
          position: relative;
          overflow: hidden;
        }

        .interest-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .interest-button:hover::before {
          left: 100%;
        }

        .interest-button-selected::before {
          display: none;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .shimmer-effect {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  const steps = [
    { id: 0, title: 'Destination Analysis', icon: MapPin, description: 'Analyzing destination data...' },
    { id: 1, title: 'AI Route Planning', icon: Navigation, description: 'Optimizing routes...' },
    { id: 2, title: 'Content Generation', icon: MessageSquare, description: 'Generating descriptions...' },
    { id: 3, title: 'Experience Curation', icon: ImageIcon, description: 'Curating activities...' },
    { id: 4, title: 'Local Insights', icon: Globe, description: 'Adding local tips...' },
    { id: 5, title: 'Tour Package Ready', icon: Sparkles, description: 'Finalizing tour...' }
  ];

  const interests = [
    { name: 'culture', icon: Landmark, gradient: 'from-purple-500 to-pink-500' },
    { name: 'history', icon: Building, gradient: 'from-amber-500 to-orange-500' },
    { name: 'food', icon: Utensils, gradient: 'from-red-500 to-pink-500' },
    { name: 'art', icon: Brush, gradient: 'from-indigo-500 to-purple-500' },
    { name: 'architecture', icon: Building, gradient: 'from-gray-600 to-gray-800' },
    { name: 'technology', icon: Monitor, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'nature', icon: TreePine, gradient: 'from-green-500 to-emerald-500' },
    { name: 'shopping', icon: ShoppingBag, gradient: 'from-pink-500 to-rose-500' },
    { name: 'nightlife', icon: Music, gradient: 'from-violet-500 to-purple-600' },
    { name: 'museums', icon: Building, gradient: 'from-teal-500 to-cyan-500' },
    { name: 'photography', icon: Camera, gradient: 'from-orange-500 to-red-500' },
    { name: 'local life', icon: Home, gradient: 'from-emerald-500 to-teal-500' }
  ];

  const destinations = [
    'Paris', 'Rome', 'Barcelona', 'Amsterdam', 'Prague', 'Vienna', 
    'London', 'Berlin', 'Tokyo', 'Florence', 'Madrid', 'Budapest'
  ];

  const travelStyles = [
    'Cultural', 'Adventure', 'Luxury', 'Budget', 'Family', 'Romantic', 'Business', 'Solo'
  ];

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

  const handleSubmit = async () => {
    clearError();
    
    const validationErrors = tourGenerationService.validateTourData(formData);
    if (validationErrors.length > 0) {
      console.error('Validation errors:', validationErrors);
      return;
    }

    setCurrentStep(0);
    setShowResults(false);
    
    const progressInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 5) return prev + 1;
        return prev;
      });
    }, 2000);

    try {
      const tour = await generateSampleTour(formData);
      
      if (tour) {
        clearInterval(progressInterval);
        setCurrentStep(6);
        setShowResults(true);
        console.log('✅ Tour generated successfully:', tour);
      }
    } catch (err) {
      clearInterval(progressInterval);
      setCurrentStep(0);
      console.error('❌ Tour generation failed:', err);
    }
  };

  const clearForm = () => {
    setFormData({
      destination: '',
      duration: 4,
      interests: [],
      budget: 100,
      groupSize: 2,
      travelStyle: ''
    });
    setCurrentStep(0);
    setShowResults(false);
    clearError();
  };

  const isFormValid = () => {
    return formData.destination && 
           formData.interests.length > 0 && 
           formData.travelStyle;
  };

  const getBudgetLabel = (budget: number) => {
    if (budget <= 100) return 'Budget';
    if (budget <= 300) return 'Standard';
    if (budget <= 600) return 'Premium';
    return 'Luxury';
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white pt-8 pb-16 font-sans antialiased">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Compact Workflow Visualization - Top */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow p-4 mb-6">
          {/* Compact Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">
              AI Generation Process
            </h2>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isGenerating ? 'bg-purple-500 animate-pulse' : 
                currentStep >= steps.length - 1 ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <span className="text-xs font-semibold text-gray-600">
                {isGenerating ? 'Processing...' : 
                 currentStep >= steps.length - 1 ? 'Complete' : 'Ready'}
              </span>
            </div>
          </div>
          
          <div className="relative">
            {/* Ultra Compact Steps */}
            <div className="flex justify-between items-center relative z-10 px-2">
              {steps.map((step) => {
                const IconComponent = step.icon as any;
                const status = getStepStatus(step.id);
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    {/* Mini Step Circle with Beautiful Effects */}
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 transform ${
                      status === 'completed' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/40 scale-110' :
                      status === 'active' 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/40 animate-pulse scale-110' :
                        'bg-gradient-to-r from-gray-300 to-gray-400'
                    }`}>
                      {status === 'completed' ? (
                        <CheckCircle size={12} className="text-white drop-shadow-sm" />
                      ) : status === 'active' ? (
                        <div className="flex space-x-0.5">
                          <div className="w-0.5 h-0.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-0.5 h-0.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-0.5 h-0.5 bg-white rounded-full animate-bounce"></div>
                        </div>
                      ) : (
                        <IconComponent size={10} className="text-white drop-shadow-sm" />
                      )}
                    </div>
                    
                    {/* Minimalist Step Label - Only show for active/completed */}
                    {(status === 'active' || status === 'completed') && (
                      <div className="mt-1 text-center">
                        <div className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-all duration-300 ${
                          status === 'completed' 
                            ? 'bg-green-100 text-green-700 shadow-sm' :
                            'bg-purple-100 text-purple-700 shadow-sm animate-pulse'
                        }`}>
                          {step.title.split(' ')[0]}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ultra Compact Progress Footer */}
          <div className="mt-3 flex items-center justify-between">
            {/* Single Clean Progress Bar */}
            <div className="flex-1 mr-3">
              <div className="w-full bg-gray-200/50 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    isGenerating 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                      : currentStep >= steps.length - 1
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-gradient-to-r from-blue-400 to-purple-400'
                  }`}
                  style={{ width: `${Math.min(100, (currentStep / (steps.length - 1)) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            {/* Clean Status */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`font-bold ${
                isGenerating ? 'text-purple-600' : 
                currentStep >= steps.length - 1 ? 'text-green-600' : 'text-gray-500'
              }`}>
                {Math.min(100, Math.round((currentStep / (steps.length - 1)) * 100))}%
              </span>
              
              {isGenerating && (
                <div className="w-3 h-3 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
              )}
            </div>
          </div>
        </div>

        {/* Compact Form - Bottom */}
        <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow p-6">

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="text-red-600" size={12} />
                </div>
                <div>
                  <h3 className="text-red-800 font-semibold text-sm tracking-tight">Generation Failed</h3>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {(showResults || currentStep > 0) && (
            <div className="mb-4 text-right">
              <button 
                onClick={clearForm}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 border backdrop-blur-sm bg-gray-500/10 border-gray-400/30 hover:bg-gray-500/20 hover:border-gray-500/50 text-gray-700 hover:text-gray-800 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-gray-500/20 hover:scale-[1.02]"
              >
                <X size={16} />
                Start New Tour
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-3">
              <label className="flex items-center gap-3 text-gray-900 font-semibold text-base mb-3 tracking-tight">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                  <MapPin size={16} className="text-white" />
                </div>
                <span>Where to?</span>
                <div className="h-px bg-gradient-to-r from-purple-200 to-transparent flex-1 ml-2"></div>
              </label>
              <div className="relative group">
                <select 
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 rounded-2xl px-4 py-4 text-gray-900 font-medium transition-all duration-300 appearance-none focus:ring-4 focus:ring-purple-500/10 shadow-sm hover:shadow-md"
                  required
                  disabled={isGenerating}
                >
                  <option value="">Choose your destination</option>
                  {destinations.map(dest => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-transform group-hover:scale-110">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 text-gray-900 font-semibold text-base mb-3 tracking-tight">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                  <Clock size={16} className="text-white" />
                </div>
                Duration
              </label>
              <div className="relative group">
                <select 
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-2xl px-4 py-4 text-gray-900 font-medium transition-all duration-300 appearance-none focus:ring-4 focus:ring-blue-500/10 shadow-sm hover:shadow-md"
                  disabled={isGenerating}
                >
                  <option value={2}>2 hours</option>
                  <option value={4}>4 hours</option>
                  <option value={6}>6 hours</option>
                  <option value={8}>8 hours</option>
                  <option value={10}>10 hours</option>
                  <option value={12}>12+ hours</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-transform group-hover:scale-110">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 text-gray-900 font-semibold text-base mb-3 tracking-tight">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                  <Users size={16} className="text-white" />
                </div>
                Group Size
              </label>
              <div className="relative group">
                <select 
                  value={formData.groupSize}
                  onChange={(e) => setFormData({...formData, groupSize: parseInt(e.target.value)})}
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-green-300 focus:border-green-500 rounded-2xl px-4 py-4 text-gray-900 font-medium transition-all duration-300 appearance-none focus:ring-4 focus:ring-green-500/10 shadow-sm hover:shadow-md"
                  disabled={isGenerating}
                >
                  <option value={1}>Solo</option>
                  <option value={2}>Couple</option>
                  <option value={4}>Small (3-4)</option>
                  <option value={6}>Medium (5-6)</option>
                  <option value={10}>Large (7-10)</option>
                  <option value={15}>Extra large (11+)</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-transform group-hover:scale-110">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 text-gray-900 font-semibold text-base mb-3 tracking-tight">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-md">
                  <Palette size={16} className="text-white" />
                </div>
                Travel Style
              </label>
              <div className="relative group">
                <select 
                  value={formData.travelStyle}
                  onChange={(e) => setFormData({...formData, travelStyle: e.target.value})}
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-pink-300 focus:border-pink-500 rounded-2xl px-4 py-4 text-gray-900 font-medium transition-all duration-300 appearance-none focus:ring-4 focus:ring-pink-500/10 shadow-sm hover:shadow-md"
                  required
                  disabled={isGenerating}
                >
                  <option value="">Select style</option>
                  {travelStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-transform group-hover:scale-110">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-3 text-gray-900 font-semibold text-base mb-4 tracking-tight">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                <Heart size={16} className="text-white" />
              </div>
              <span>What interests you?</span>
              <div className="h-px bg-gradient-to-r from-pink-200 to-transparent flex-1 ml-2"></div>
              <span className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold border border-purple-200 shadow-sm">
                {formData.interests.length} selected
              </span>
            </label>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {interests.map((interest) => {
                const IconComponent = interest.icon;
                const isSelected = formData.interests.includes(interest.name);
                
                // Get the color values for each gradient
                const getGradientColor = (gradient) => {
                  if (gradient.includes('purple')) return '147, 51, 234';
                  if (gradient.includes('amber')) return '245, 158, 11';
                  if (gradient.includes('red')) return '239, 68, 68';
                  if (gradient.includes('indigo')) return '99, 102, 241';
                  if (gradient.includes('gray')) return '75, 85, 99';
                  if (gradient.includes('blue')) return '59, 130, 246';
                  if (gradient.includes('green')) return '34, 197, 94';
                  if (gradient.includes('pink')) return '236, 72, 153';
                  if (gradient.includes('violet')) return '139, 92, 246';
                  if (gradient.includes('teal')) return '20, 184, 166';
                  if (gradient.includes('orange')) return '249, 115, 22';
                  if (gradient.includes('emerald')) return '16, 185, 129';
                  return '34, 197, 94';
                };
                
                const gradientColor = getGradientColor(interest.gradient);
                
                return (
                  <button
                    key={interest.name}
                    onClick={() => toggleInterest(interest.name)}
                    disabled={isGenerating}
                    className={`
                      interest-button group relative p-3 rounded-xl font-medium transition-all duration-300 transform border
                      ${isSelected 
                        ? `text-gray-800 border-2 scale-105 interest-button-selected shadow-lg ring-2 ring-offset-1` 
                        : `text-gray-700 border-gray-200 hover:scale-105`
                      }
                      ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                    style={{
                      backgroundColor: `rgba(${gradientColor}, 0.08)`,
                      borderColor: isSelected 
                        ? `rgba(${gradientColor}, 0.6)`
                        : undefined,
                      ringColor: isSelected 
                        ? `rgba(${gradientColor}, 0.3)`
                        : undefined
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected && !isGenerating) {
                        e.currentTarget.style.borderColor = `rgba(${gradientColor}, 0.3)`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected && !isGenerating) {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                      }
                    }}
                  >
                    <div className="flex flex-col items-center space-y-1.5">
                      <div className={`
                        p-1.5 rounded-lg transition-all duration-300
                        ${isSelected 
                          ? `bg-gradient-to-br ${interest.gradient} shadow-md` 
                          : `bg-gradient-to-br ${interest.gradient} group-hover:scale-110`
                        }
                      `}>
                        <IconComponent 
                          size={16} 
                          className="text-white" 
                        />
                      </div>
                      
                      <span className="text-xs font-medium capitalize tracking-tight leading-tight">
                        {interest.name}
                      </span>
                      
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                             style={{ backgroundColor: `rgba(${gradientColor}, 1)` }}>
                          <Check size={10} className="text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {formData.interests.length === 0 && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-amber-700 text-sm flex items-center gap-2 font-medium">
                  <AlertCircle size={16} />
                  Select at least one interest to continue
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="flex items-center justify-between text-gray-900 font-semibold text-sm mb-3 tracking-tight">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Wallet size={12} className="text-white" />
                  </div>
                  Budget per Person
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">€{formData.budget}</div>
                  <div className="text-xs text-gray-500 font-medium">{getBudgetLabel(formData.budget)}</div>
                </div>
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="30"
                  max="1000"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                  disabled={isGenerating}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${((formData.budget - 30) / 970) * 100}%, #e5e7eb ${((formData.budget - 30) / 970) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>€30</span>
                  <span>€1000+</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button 
                onClick={handleSubmit}
                disabled={isGenerating || !isFormValid()}
                className={`px-8 py-3 rounded-xl font-medium text-sm transition-all duration-300 border backdrop-blur-sm ${
                  isFormValid() && !isGenerating
                    ? 'bg-blue-500/10 border-blue-300/30 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-700 hover:text-blue-800 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02]'
                    : 'bg-gray-100/30 border-gray-300/30 text-gray-400 cursor-not-allowed backdrop-blur-none'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Generate AI Tour</span>
                    </>
                  )}
                </div>
              </button>

              {!isFormValid() && (
                <p className="text-gray-500 text-xs text-center mt-3">
                  Complete required fields to continue
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {showResults && lastGeneratedTour && (
          <div className="mt-12 animate-fadeInUp">
            <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-3xl border-2 border-blue-100/50 shadow-2xl shadow-blue-500/10 p-8 backdrop-blur-sm">
              
              {/* Header Section */}
              <TourSuccessHeader />

              {/* Tour Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/30 hover:border-blue-300/50 hover:bg-white/80 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-600 font-medium text-sm">Destination</span>
                  </div>
                  <div className="text-gray-900 font-bold text-lg">{lastGeneratedTour.destination}</div>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-orange-200/30 hover:border-orange-300/50 hover:bg-white/80 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-600 font-medium text-sm">Duration</span>
                  </div>
                  <div className="text-gray-900 font-bold text-lg">{lastGeneratedTour.duration}</div>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-yellow-200/30 hover:border-yellow-300/50 hover:bg-white/80 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-600 font-medium text-sm">Rating</span>
                  </div>
                  <div className="text-gray-900 font-bold text-lg">{lastGeneratedTour.rating}/5</div>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-purple-200/30 hover:border-purple-300/50 hover:bg-white/80 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-600 font-medium text-sm">Group Size</span>
                  </div>
                  <div className="text-gray-900 font-bold text-lg">{lastGeneratedTour.groupSize}</div>
                </div>
              </div>

              {/* Tour Details */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/30 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">{lastGeneratedTour.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm font-medium">{lastGeneratedTour.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lastGeneratedTour.highlights.slice(0, 4).map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 text-gray-700 p-3 bg-green-50/50 rounded-xl border border-green-200/30">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                      <span className="text-sm font-semibold leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
                
                {lastGeneratedTour.highlights.length > 4 && (
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100/60 rounded-xl border border-gray-200/40 text-gray-600 text-sm font-medium">
                      <Sparkles size={14} />
                      +{lastGeneratedTour.highlights.length - 4} more highlights included
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {}}
                  className="px-6 py-3 bg-green-500/15 border border-green-400/40 hover:bg-green-500/25 hover:border-green-500/60 text-green-700 hover:text-green-800 rounded-xl transition-all duration-300 hover:scale-[1.02] font-semibold backdrop-blur-sm shadow-lg shadow-green-500/15 hover:shadow-xl hover:shadow-green-500/25"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base">📅</span>
                    <span>Book Now</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setShowFeatures(!showFeatures)}
                  className="px-6 py-3 bg-blue-500/15 border border-blue-400/40 hover:bg-blue-500/25 hover:border-blue-500/60 text-blue-700 hover:text-blue-800 rounded-xl transition-all duration-300 hover:scale-[1.02] font-semibold backdrop-blur-sm shadow-lg shadow-blue-500/15 hover:shadow-xl hover:shadow-blue-500/25"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base">{showFeatures ? '📄' : '👁️'}</span>
                    <span>{showFeatures ? 'Hide Details' : 'View Tour'}</span>
                  </div>
                </button>
                
                <button
                  onClick={clearForm}
                  className="px-6 py-3 bg-purple-500/15 border border-purple-400/40 hover:bg-purple-500/25 hover:border-purple-500/60 text-purple-700 hover:text-purple-800 rounded-xl transition-all duration-300 hover:scale-[1.02] font-semibold backdrop-blur-sm shadow-lg shadow-purple-500/15 hover:shadow-xl hover:shadow-purple-500/25"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles size={16} />
                    <span>Generate New Tour</span>
                  </div>
                </button>
              </div>
            </div>

            {showFeatures && (
              <TourResults 
                generatedTour={lastGeneratedTour}
                showFeatures={showFeatures}
                setShowFeatures={setShowFeatures}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourCreator;