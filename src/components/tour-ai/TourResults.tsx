// components/tour-ai/TourResults.tsx
import { useState, useEffect } from 'react';
import { 
    Sparkles, 
    MapPin, 
    Star, 
    Clock, 
    Users, 
    Navigation, 
    Globe, 
    Bookmark, 
    Route,
    Calendar,
    Heart,
    Share2,
    ChevronDown,
    ChevronUp,
    Bot,
    Eye,
    Camera,
    MessageSquare,
    Download,
    CheckCircle,
    Info,
    DollarSign,
    Zap,
    UserCheck,
    Loader2
  } from 'lucide-react';
  import { TourGuides } from './TourGuides';
  import { tourGuidesService } from '../../utils/api/services/tour-guides.service';
  
  interface GeneratedTour {
    title: string;
    subtitle: string;
    description: string;
    destination: string;
    duration: string;
    groupSize: string;
    difficulty: string;
    rating: number;
    reviews: number;
    totalBookings: string;
    pricing: {
      solo: number;
      couple: number;
      group: number;
      family: number;
    };
    languages: string[];
    highlights: string[];
    itinerary: Array<{
      time: string;
      location: string;
      duration: string;
      description: string;
      activity: string;
      tips: string[];
      photoSpots: string[];
      localInsight: string;
    }>;
    inclusions?: string[];
  }
  
  interface TourResultsProps {
    generatedTour: GeneratedTour;
    showFeatures: boolean;
    setShowFeatures: (show: boolean) => void;
    isRealData?: boolean;
    showGuides?: boolean;
    setShowGuides?: (show: boolean) => void;
    guidesData?: any;
  }
  
  export const TourResults = ({ 
    generatedTour, 
    showFeatures, 
    setShowFeatures,
    isRealData = false,
    showGuides = false,
    setShowGuides,
    guidesData 
  }: TourResultsProps) => {
    // Local state for showing guides if no prop is passed
    const [localShowGuides, setLocalShowGuides] = useState(false);
    const [fetchedGuidesData, setFetchedGuidesData] = useState<any>(null);
    const [loadingGuides, setLoadingGuides] = useState(false);
    const [guidesError, setGuidesError] = useState<string | null>(null);
    
    // Use prop state if available, otherwise use local state
    const isShowingGuides = setShowGuides ? showGuides : localShowGuides;
    const toggleGuides = setShowGuides ? setShowGuides : setLocalShowGuides;

    // Parse tour data for API request
    const parseTourData = () => {
      const durationHours = parseInt(generatedTour.duration.split(' ')[0]) || 4;
      const groupSizeNum = parseInt(generatedTour.groupSize.split('-')[0]) || 2;
      
      // Extract interests from highlights or use default
      const interests = generatedTour.highlights?.slice(0, 3).map(h => 
        h.toLowerCase().replace(/[^a-z\s]/g, '').trim()
      ) || ['culture', 'history'];
      
      return {
        destination: generatedTour.destination,
        duration: durationHours,
        group_size: groupSizeNum,
        specialties: interests
      };
    };

    // Fetch guides from API
    const fetchGuides = async () => {
      if (loadingGuides || fetchedGuidesData) return; // Prevent duplicate calls
      
      setLoadingGuides(true);
      setGuidesError(null);
      
      try {
        console.log('🔍 Fetching guides for tour:', generatedTour.destination);
        
        const tourData = parseTourData();
        
        // Try to find existing guides first
        const recommendations = await tourGuidesService.findGuidesForTour(
          tourData.destination,
          tourData.duration,
          tourData.group_size,
          tourData.specialties
        );

        if (recommendations && recommendations.length > 0) {
          // Transform recommendations to match expected format
          const guidesResponse = {
            message: `Found ${recommendations.length} guides for ${tourData.destination}`,
            destination: tourData.destination,
            specialties: tourData.specialties,
            guides_found: recommendations.length,
            guides_saved: recommendations.length,
            guides: recommendations.map((rec: GuideRecommendation) => ({
              ...rec.guide,
              match_score: rec.match_score,
              reasons: rec.reasons
            }))
          };
          
          setFetchedGuidesData(guidesResponse);
          console.log('✅ Successfully fetched guides:', guidesResponse);
        } else {
          // If no existing guides, try to research new ones
          console.log('🔬 No existing guides found, researching new ones...');
          
          const researchResponse = await tourGuidesService.researchGuides(
            tourData.destination,
            tourData.specialties
          );
          
          setFetchedGuidesData(researchResponse);
          console.log('✅ Successfully researched guides:', researchResponse);
        }
        
      } catch (error) {
        console.error('❌ Error fetching guides:', error);
        setGuidesError('Failed to load tour guides. Using sample data.');
        
        // Fallback to sample data on error
        setFetchedGuidesData(sampleGuidesData);
      } finally {
        setLoadingGuides(false);
      }
    };

    // Effect to fetch guides when component shows guides
    useEffect(() => {
      if (isShowingGuides && !guidesData && !fetchedGuidesData) {
        fetchGuides();
      }
    }, [isShowingGuides]);

    // Handle guide button click
    const handleGuideToggle = () => {
      const newState = !isShowingGuides;
      toggleGuides(newState);
      
      // Fetch guides when showing for the first time
      if (newState && !guidesData && !fetchedGuidesData) {
        fetchGuides();
      }
    };

    // Determine which guides data to use
    const getGuidesDataToShow = () => {
      if (guidesData) return guidesData; // Use prop data if provided
      if (fetchedGuidesData) return fetchedGuidesData; // Use fetched data
      return sampleGuidesData; // Fallback to sample data
    };
    return (
      <div className="space-y-6">
        {/* Real Data Badge */}
        {isRealData && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Live AI Generated Content</span>
            </div>
          </div>
        )}
  
        {/* Tour Header Card - Larger */}
        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-400/40 hover:bg-gradient-to-br hover:from-blue-600/15 hover:to-purple-600/15 transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="text-blue-400 w-5 h-5" />
                <span className="text-blue-400 font-medium">{generatedTour.destination}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-300 transition-colors duration-300">{generatedTour.title}</h3>
              <p className="text-base text-slate-300 mb-4">{generatedTour.subtitle}</p>
              <p className="text-slate-400 leading-relaxed">{generatedTour.description}</p>
            </div>
            
            <div className="flex lg:flex-col gap-4 lg:gap-3 lg:text-right">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-current w-5 h-5" />
                <span className="text-white font-bold text-lg">{generatedTour.rating}</span>
                <span className="text-slate-400">({generatedTour.reviews})</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">${generatedTour.pricing.couple}</div>
            </div>
          </div>
        </div>
  
        {/* Stats Grid - Larger */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-700/50 hover:border-blue-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
            <Clock className="text-blue-400 mx-auto mb-2 w-6 h-6 hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-semibold">{generatedTour.duration}</div>
            <div className="text-sm text-slate-400">Duration</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-700/50 hover:border-green-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
            <Users className="text-green-400 mx-auto mb-2 w-6 h-6 hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-semibold">{generatedTour.groupSize}</div>
            <div className="text-sm text-slate-400">Group</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-700/50 hover:border-purple-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
            <Navigation className="text-purple-400 mx-auto mb-2 w-6 h-6 hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-semibold">{generatedTour.difficulty}</div>
            <div className="text-sm text-slate-400">Level</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-700/50 hover:border-orange-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
            <Globe className="text-orange-400 mx-auto mb-2 w-6 h-6 hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-semibold">{generatedTour.languages.length}</div>
            <div className="text-sm text-slate-400">Languages</div>
          </div>
        </div>
  
        {/* Tour Highlights - Larger */}
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-6 hover:border-emerald-400/30 hover:bg-slate-800/60 transition-all duration-300">
          <h4 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
            <CheckCircle className="text-emerald-400 w-6 h-6" />
            What's Included
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {generatedTour.highlights.slice(0, 6).map((highlight: string, index: number) => (
              <div key={index} className="flex items-center text-slate-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 flex-shrink-0"></div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Streamlined Itinerary - Larger */}
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-6 hover:border-blue-400/30 hover:bg-slate-800/60 transition-all duration-300">
          <h4 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
            <Route className="text-blue-400 w-6 h-6" />
            Your Itinerary
          </h4>
          <div className="space-y-5">
            {generatedTour.itinerary.slice(0, 4).map((stop: any, index: number) => (
              <div key={index} className="bg-slate-700/40 rounded-lg p-5 border border-slate-600/30 hover:border-blue-400/50 hover:bg-slate-700/60 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <h5 className="text-white font-semibold text-lg">{stop.location}</h5>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {stop.time}
                          </span>
                          <span>•</span>
                          <span>{stop.duration}</span>
                        </div>
                      </div>
                      <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                        {stop.activity}
                      </div>
                    </div>
                    
                    <p className="text-slate-300 mb-4 leading-relaxed">{stop.description}</p>
  
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h6 className="text-emerald-300 font-medium mb-2 flex items-center gap-1">
                          <Info className="w-4 h-4" />
                          Tips
                        </h6>
                        <div className="text-slate-400 space-y-1">
                          {stop.tips.slice(0, 2).map((tip: string, tipIndex: number) => (
                            <div key={tipIndex}>• {tip}</div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h6 className="text-yellow-300 font-medium mb-2 flex items-center gap-1">
                          <Camera className="w-4 h-4" />
                          Photo Spots
                        </h6>
                        <div className="text-slate-400 space-y-1">
                          {stop.photoSpots.slice(0, 2).map((spot: string, spotIndex: number) => (
                            <div key={spotIndex}>• {spot}</div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h6 className="text-blue-300 font-medium mb-2 flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          Local Insight
                        </h6>
                        <p className="text-slate-400">{stop.localInsight}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {generatedTour.itinerary.length > 4 && (
              <div className="text-center">
                <button className="text-blue-400 hover:text-blue-300 font-medium">
                  View {generatedTour.itinerary.length - 4} more stops →
                </button>
              </div>
            )}
          </div>
        </div>
  
        {/* Pricing - Larger */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/60 rounded-lg border border-slate-700/50 p-5 text-center hover:border-blue-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
            <div className="text-xl font-bold text-blue-400">${generatedTour.pricing.solo}</div>
            <div className="text-sm text-slate-400">Solo</div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-5 text-center relative hover:border-blue-400/60 hover:bg-blue-500/20 transition-all duration-300 cursor-pointer">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded">
                POPULAR
              </span>
            </div>
            <div className="text-xl font-bold text-blue-400">${generatedTour.pricing.couple}</div>
            <div className="text-sm text-slate-400">Couple</div>
          </div>
          
          <div className="bg-slate-800/60 rounded-lg border border-slate-700/50 p-5 text-center hover:border-emerald-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
            <div className="text-xl font-bold text-emerald-400">${generatedTour.pricing.group}</div>
            <div className="text-sm text-slate-400">Group</div>
          </div>
          
          <div className="bg-slate-800/60 rounded-lg border border-slate-700/50 p-5 text-center hover:border-orange-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
            <div className="text-xl font-bold text-orange-400">${generatedTour.pricing.family}</div>
            <div className="text-sm text-slate-400">Family</div>
          </div>
        </div>
  
        {/* Professional CTA - Larger */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-7 text-center hover:border-blue-400/40 hover:from-blue-600/15 hover:to-purple-600/15 transition-all duration-300">
          <h3 className="text-2xl font-bold text-white mb-3">Experience This AI-Generated Tour</h3>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            Powered by advanced AI and real-time data for the perfect travel experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Book Now
            </button>
            <button className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-500/10 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Save
            </button>
            <button className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-500/10 flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Share
            </button>
            <button 
              onClick={handleGuideToggle}
              disabled={loadingGuides}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingGuides ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Finding Guides...
                </>
              ) : (
                <>
                  <UserCheck className="w-5 h-5" />
                  {isShowingGuides ? 'Hide Guides' : 'View Guides'}
                </>
              )}
            </button>
          </div>
          
          <button 
            onClick={() => setShowFeatures(!showFeatures)}
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center gap-2 mx-auto transition-colors duration-300"
          >
            {showFeatures ? (
              <>
                Hide API Details
                <ChevronUp className="w-5 h-5" />
              </>
            ) : (
              <>
                View API Integration
                <ChevronDown className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
  
        {/* Simplified Integration Section */}
        {showFeatures && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-2">AI Tour API Integration</h3>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Integrate our AI tour generation into your platform with our developer-friendly API.
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5 text-center hover:border-blue-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">REST API</h4>
                <p className="text-slate-400 text-sm mb-3">
                  Simple RESTful endpoints for tour generation with real-time responses.
                </p>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• JSON responses</li>
                  <li>• Real-time generation</li>
                  <li>• 99.9% uptime</li>
                </ul>
              </div>
  
              <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5 text-center hover:border-emerald-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Global Coverage</h4>
                <p className="text-slate-400 text-sm mb-3">
                  Generate tours for 500+ destinations worldwide with local insights.
                </p>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• 500+ destinations</li>
                  <li>• 25+ languages</li>
                  <li>• Cultural adaptation</li>
                </ul>
              </div>
  
              <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5 text-center hover:border-purple-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">White Label</h4>
                <p className="text-slate-400 text-sm mb-3">
                  Complete customization with your branding and domain integration.
                </p>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Custom branding</li>
                  <li>• Domain setup</li>
                  <li>• Full source code</li>
                </ul>
              </div>
            </div>
  
            <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5 text-center hover:border-blue-400/30 hover:bg-slate-800/60 transition-all duration-300">
              <h4 className="text-lg font-bold text-white mb-2">Ready to Integrate?</h4>
              <p className="text-slate-300 mb-4 text-sm">
                Start generating unlimited AI tours for your travel platform today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-sm">
                  Get API Access - $147/month
                </button>
                <button className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tour Guides Section */}
        {isShowingGuides && (
          <div className="mt-8">
            {/* Loading State */}
            {loadingGuides && (
              <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                  <h3 className="text-xl font-bold text-white">Finding Perfect Tour Guides</h3>
                </div>
                <p className="text-slate-300 mb-4">
                  Searching for verified local experts in {generatedTour.destination}...
                </p>
                <div className="flex justify-center">
                  <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {guidesError && !loadingGuides && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Info className="w-5 h-5 text-amber-400" />
                  <h4 className="text-amber-400 font-semibold">Notice</h4>
                </div>
                <p className="text-amber-200 text-sm">{guidesError}</p>
              </div>
            )}

            {/* Guides Component */}
            {!loadingGuides && (
              <TourGuides 
                guidesData={getGuidesDataToShow()}
                showFeatures={false}
                setShowFeatures={() => {}}
                isRealData={!!guidesData || !!fetchedGuidesData}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  // Sample guides data for demo purposes
  const sampleGuidesData = {
    message: "Sample tour guides for demonstration",
    destination: "Paris",
    specialties: ["culture", "food", "history"],
    guides_found: 2,
    guides_saved: 2,
    guides: [
      {
        id: "sample-1",
        name: "Marie Dubois",
        email: "marie@parisguides.com",
        phone: "+33 1 23 45 67 89",
        bio: "Passionate Paris guide with 8 years of experience leading cultural and culinary tours. Fluent in multiple languages and specializing in hidden gems and local insights.",
        location: "Paris",
        languages: ["English", "French", "Spanish"],
        specialties: ["culture", "food", "history"],
        experience_years: 8,
        rating: "4.8",
        review_count: 127,
        price_range: {
          half_day: 180,
          full_day: 320,
          currency: "USD"
        },
        verified: true,
        max_group_size: 12,
        provides_transportation: false,
        is_available: true,
        experience_level: "Advanced",
        created_at: "2025-07-13T22:46:10.793Z",
        updated_at: "2025-07-13T22:46:10.793Z"
      },
      {
        id: "sample-2",
        name: "Jean-Luc Bernard",
        email: "jeanluc@parisadventures.com",
        phone: "+33 6 78 90 12 34",
        bio: "Expert Paris guide specializing in historical tours and architectural heritage. 12 years of experience with groups of all sizes.",
        location: "Paris",
        languages: ["French", "English", "Italian"],
        specialties: ["food", "history"],
        experience_years: 12,
        rating: "4.9",
        review_count: 89,
        price_range: {
          half_day: 200,
          full_day: 380,
          currency: "USD"
        },
        verified: true,
        max_group_size: 12,
        provides_transportation: false,
        is_available: true,
        experience_level: "Expert",
        created_at: "2025-07-13T22:46:10.833Z",
        updated_at: "2025-07-13T22:46:10.833Z"
      }
    ]
  };