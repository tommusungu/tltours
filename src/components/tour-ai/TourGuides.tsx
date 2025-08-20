// components/tour-ai/TourGuides.tsx
import { 
    User, 
    MapPin, 
    Star, 
    Clock, 
    Users, 
    Globe, 
    Phone,
    Mail,
    CheckCircle,
    Award,
    DollarSign,
    MessageSquare,
    Languages,
    Heart,
    Share2,
    Calendar,
    Car,
    Shield,
    Zap,
    ChevronDown,
    ChevronUp,
    Bot
  } from 'lucide-react';
  
  interface Guide {
    id: string;
    name: string;
    email: string;
    phone: string;
    bio: string;
    location: string;
    languages: string[];
    specialties: string[];
    experience_years: number;
    rating: string;
    review_count: number;
    price_range: {
      half_day: number;
      full_day: number;
      currency: string;
    };
    verified: boolean;
    max_group_size: number;
    provides_transportation: boolean;
    is_available: boolean;
    experience_level: string;
    created_at: string;
    updated_at: string;
  }
  
  interface TourGuidesData {
    message: string;
    destination: string;
    specialties: string[];
    guides_found: number;
    guides_saved: number;
    guides: Guide[];
  }
  
  interface TourGuidesProps {
    guidesData: TourGuidesData;
    showFeatures: boolean;
    setShowFeatures: (show: boolean) => void;
    isRealData?: boolean;
  }
  
  export const TourGuides = ({ 
    guidesData, 
    showFeatures, 
    setShowFeatures,
    isRealData = false 
  }: TourGuidesProps) => {
    
    const getExperienceBadgeColor = (level: string) => {
      switch (level.toLowerCase()) {
        case 'expert': return 'from-purple-500 to-pink-500';
        case 'advanced': return 'from-blue-500 to-purple-500';
        case 'intermediate': return 'from-green-500 to-blue-500';
        default: return 'from-gray-500 to-slate-500';
      }
    };
  
    const getSpecialtyColor = (specialty: string, index: number) => {
      const colors = [
        'bg-blue-500/20 text-blue-300',
        'bg-emerald-500/20 text-emerald-300',
        'bg-purple-500/20 text-purple-300',
        'bg-orange-500/20 text-orange-300',
        'bg-pink-500/20 text-pink-300'
      ];
      return colors[index % colors.length];
    };
  
    return (
      <div className="space-y-6">
        {/* Real Data Badge */}
        {isRealData && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Live AI Generated Guide Matches</span>
            </div>
          </div>
        )}
  
        {/* Header Stats */}
        <div className="bg-gradient-to-br from-emerald-600/10 to-blue-600/10 border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-400/40 hover:bg-gradient-to-br hover:from-emerald-600/15 hover:to-blue-600/15 transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="text-emerald-400 w-5 h-5" />
                <span className="text-emerald-400 font-medium">{guidesData.destination}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 hover:text-emerald-300 transition-colors duration-300">
                Expert Local Tour Guides
              </h3>
              <p className="text-lg text-slate-300 mb-4">
                {guidesData.guides_found} verified guides specializing in {guidesData.specialties.join(', ')}
              </p>
              <p className="text-slate-400 leading-relaxed">
                Hand-picked professional guides with years of experience and local expertise
              </p>
            </div>
            
            <div className="flex lg:flex-col gap-4 lg:gap-3 lg:text-right">
              <div className="flex items-center gap-2">
                <Users className="text-emerald-400 w-5 h-5" />
                <span className="text-white font-bold text-lg">{guidesData.guides_found}</span>
                <span className="text-slate-400">Available</span>
              </div>
              <div className="text-2xl font-bold text-emerald-400">
                ${Math.min(...guidesData.guides.map(g => g.price_range.half_day))}+
              </div>
            </div>
          </div>
        </div>
  
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-700/50 hover:border-emerald-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
            <Award className="text-emerald-400 mx-auto mb-2 w-6 h-6 hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-semibold">
              {Math.round(guidesData.guides.reduce((acc, g) => acc + g.experience_years, 0) / guidesData.guides.length)}y
            </div>
            <div className="text-sm text-slate-400">Avg Experience</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-700/50 hover:border-blue-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
            <Languages className="text-blue-400 mx-auto mb-2 w-6 h-6 hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-semibold">
              {[...new Set(guidesData.guides.flatMap(g => g.languages))].length}
            </div>
            <div className="text-sm text-slate-400">Languages</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-700/50 hover:border-purple-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
            <Shield className="text-purple-400 mx-auto mb-2 w-6 h-6 hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-semibold">
              {guidesData.guides.filter(g => g.verified).length}/{guidesData.guides.length}
            </div>
            <div className="text-sm text-slate-400">Verified</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-700/50 hover:border-orange-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
            <Users className="text-orange-400 mx-auto mb-2 w-6 h-6 hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-semibold">
              {Math.max(...guidesData.guides.map(g => g.max_group_size))}
            </div>
            <div className="text-sm text-slate-400">Max Group</div>
          </div>
        </div>
  
        {/* Guide Cards */}
        <div className="space-y-6">
          {guidesData.guides.map((guide: Guide, index: number) => (
            <div key={guide.id} className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-6 hover:border-emerald-400/30 hover:bg-slate-800/60 transition-all duration-300">
              
              {/* Guide Header */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white hover:text-emerald-300 transition-colors duration-300 cursor-pointer">
                          {guide.name}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {guide.experience_years} years experience
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Up to {guide.max_group_size} people
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getExperienceBadgeColor(guide.experience_level)} text-white`}>
                        {guide.experience_level}
                      </div>
                      {guide.verified && (
                        <div className="flex items-center gap-1 text-emerald-400 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-4 leading-relaxed">{guide.bio}</p>
                  
                  {/* Guide Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h6 className="text-blue-300 font-medium mb-2 flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        Languages
                      </h6>
                      <div className="flex flex-wrap gap-1">
                        {guide.languages.map((lang: string, langIndex: number) => (
                          <span key={langIndex} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="text-purple-300 font-medium mb-2 flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Specialties
                      </h6>
                      <div className="flex flex-wrap gap-1">
                        {guide.specialties.map((specialty: string, specIndex: number) => (
                          <span key={specIndex} className={`px-2 py-1 rounded text-xs ${getSpecialtyColor(specialty, specIndex)}`}>
                            {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="text-emerald-300 font-medium mb-2 flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        Contact
                      </h6>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{guide.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <Phone className="w-3 h-3" />
                          <span>{guide.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pricing and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-700/50">
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-400">
                      ${guide.price_range.half_day}
                    </div>
                    <div className="text-xs text-slate-400">Half Day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">
                      ${guide.price_range.full_day}
                    </div>
                    <div className="text-xs text-slate-400">Full Day</div>
                  </div>
                  {guide.provides_transportation && (
                    <div className="flex items-center gap-1 text-purple-400 text-sm">
                      <Car className="w-4 h-4" />
                      <span>Transport</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm hover:scale-105">
                    <Calendar className="w-4 h-4" />
                    Book Guide
                  </button>
                  <button className="border border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-emerald-500/10 text-sm">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="border border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-emerald-500/10 text-sm">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Professional CTA */}
        <div className="bg-gradient-to-r from-emerald-600/10 to-blue-600/10 border border-emerald-500/20 rounded-xl p-7 text-center hover:border-emerald-400/40 hover:from-emerald-600/15 hover:to-blue-600/15 transition-all duration-300">
          <h3 className="text-2xl font-bold text-white mb-3">Find Your Perfect Tour Guide</h3>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            Connect with verified local experts who know every hidden gem and story.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
            <button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Browse All Guides
            </button>
            <button className="border border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-emerald-500/10 flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Custom Request
            </button>
            <button className="border border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-emerald-500/10 flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
          
          <button 
            onClick={() => setShowFeatures(!showFeatures)}
            className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center justify-center gap-2 mx-auto transition-colors duration-300"
          >
            {showFeatures ? (
              <>
                Hide Guide API Details
                <ChevronUp className="w-5 h-5" />
              </>
            ) : (
              <>
                View Guide API Integration
                <ChevronDown className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
  
        {/* API Integration Section */}
        {showFeatures && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-2">Guide Matching API Integration</h3>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Integrate our AI-powered guide matching system into your platform.
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5 text-center hover:border-emerald-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Smart Matching</h4>
                <p className="text-slate-400 text-sm mb-3">
                  AI-powered guide matching based on specialties, languages, and availability.
                </p>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Real-time availability</li>
                  <li>• Specialty matching</li>
                  <li>• Language preferences</li>
                </ul>
              </div>
  
              <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5 text-center hover:border-blue-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Verified Guides</h4>
                <p className="text-slate-400 text-sm mb-3">
                  Access to pre-screened and verified professional tour guides.
                </p>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Background checks</li>
                  <li>• License verification</li>
                  <li>• Experience validation</li>
                </ul>
              </div>
  
              <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5 text-center hover:border-purple-400/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Booking System</h4>
                <p className="text-slate-400 text-sm mb-3">
                  Complete booking and payment integration with calendar sync.
                </p>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Calendar integration</li>
                  <li>• Payment processing</li>
                  <li>• Booking management</li>
                </ul>
              </div>
            </div>
  
            <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5 text-center hover:border-emerald-400/30 hover:bg-slate-800/60 transition-all duration-300">
              <h4 className="text-lg font-bold text-white mb-2">Ready to Connect Travelers with Guides?</h4>
              <p className="text-slate-300 mb-4 text-sm">
                Start matching travelers with perfect local guides for your platform today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-sm">
                  Get Guide API Access - $197/month
                </button>
                <button className="border border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };