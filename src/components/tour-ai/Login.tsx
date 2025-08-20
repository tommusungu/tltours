'use client';

import { useState } from 'react';
import { Compass, Mail, Lock, Eye, EyeOff, AlertCircle, LogIn, User, ArrowRight, Shield, MapPin, Globe, Users, Star, Navigation } from 'lucide-react';
import { login, validateForm, handleAuthError } from '@/utils/tour-auth';

const Login = ({ onSuccess, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateLoginForm = () => {
    const newErrors = {};

    const usernameError = validateForm.username(formData.username);
    if (usernameError) newErrors.username = usernameError;

    const passwordError = validateForm.password(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateLoginForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const data = await login(formData.username, formData.password);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: handleAuthError(error) });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field] || errors.general) {
      setErrors({});
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const isEmail = formData.username.includes('@');

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Welcome Back Message */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                  <Compass className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold text-white">
                  Tour<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Creator AI</span>
                </h1>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-3 leading-tight">
                Welcome Back to Your Travel Dashboard
              </h2>
              
              <p className="text-base text-gray-400 mb-6 leading-relaxed">
                Continue crafting amazing tours and discovering new destinations. Your AI tour creator is ready to help you 
                plan incredible journeys the moment you sign in.
              </p>
            </div>

            {/* Recent Activity Preview */}
            <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Navigation className="text-green-400" size={18} />
                Your Travel Dashboard Awaits
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Tours Created</span>
                  <span className="text-white font-medium">8 this month</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Destinations Explored</span>
                  <span className="text-white font-medium">42 places</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Happy Travelers</span>
                  <span className="text-green-400 font-medium">+127 this week</span>
                </div>
              </div>
            </div>

            {/* Success Stories */}
            <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl p-5 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="text-yellow-400 fill-current" size={14} />
                  ))}
                </div>
                <span className="text-purple-300 font-semibold text-sm">Travel Story</span>
              </div>
              <blockquote className="text-gray-400 text-sm mb-3">
                "TourCreator AI helped me plan the perfect honeymoon in Bali. Every detail was perfect and we discovered amazing hidden spots!"
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  E
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Emma Thompson</p>
                  <p className="text-gray-400 text-xs">Travel Photographer & Blogger</p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <MapPin className="text-purple-400" size={20} />
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm">Smart Itineraries</h3>
                <p className="text-gray-400 text-xs">AI-powered tour planning in minutes</p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Globe className="text-blue-400" size={20} />
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm">Local Insights</h3>
                <p className="text-gray-400 text-xs">Discover hidden gems and local secrets</p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="text-green-400" size={20} />
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm">Travel Safe</h3>
                <p className="text-gray-400 text-xs">Real-time safety and travel alerts</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="relative h-full">
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-2xl h-full flex flex-col justify-between">
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Welcome Back Explorer</h3>
                  <p className="text-gray-400 text-sm">Access your tour creation dashboard</p>
                </div>

                {/* General Error */}
                {errors.general && (
                  <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-3 flex items-center gap-2 mb-4">
                    <AlertCircle className="text-red-400" size={16} />
                    <span className="text-red-400 text-sm">{errors.general}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Username/Email */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Username or Email</label>
                    <div className="relative">
                      {isEmail ? (
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      ) : (
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      )}
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your username or email"
                        className={`w-full bg-slate-700/50 border-2 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                          errors.username ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-400 focus:bg-slate-700'
                        }`}
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.username}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-white font-medium text-sm">Password</label>
                      <button 
                        onClick={() => {/* Add forgot password logic */}}
                        className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your password"
                        className={`w-full bg-slate-700/50 border-2 rounded-xl pl-11 pr-11 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                          errors.password ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-400 focus:bg-slate-700'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                      Keep me signed in for 30 days
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <LogIn size={18} />
                        Start Exploring
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom section with social auth and switch to sign up */}
              <div className="space-y-3 mt-4">
                {/* Divider with "or" */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-slate-800/80 text-gray-400">or</span>
                  </div>
                </div>

                {/* Social Auth Buttons */}
                <div className="space-y-2.5">
                  <button className="w-full flex items-center justify-center gap-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-white py-2.5 rounded-xl transition-all duration-300 font-medium text-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>

                  <button className="w-full flex items-center justify-center gap-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-white py-2.5 rounded-xl transition-all duration-300 font-medium text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Continue with Facebook
                  </button>

                  <button className="w-full flex items-center justify-center gap-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-white py-2.5 rounded-xl transition-all duration-300 font-medium text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                    Continue with Pinterest
                  </button>
                </div>

                {/* Switch to Sign Up */}
                <div className="text-center pt-3 border-t border-slate-700">
                  <p className="text-gray-400 text-sm">
                    New to TourCreator AI?{' '}
                    <button
                      onClick={onSwitchToSignUp}
                      className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                    >
                      Start your adventure
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
                <Shield className="text-green-400" size={14} />
                <span>Secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;