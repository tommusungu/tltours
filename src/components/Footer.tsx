import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                TL Travel Tours
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Your trusted partner for unforgettable travel experiences around the world.
            </p>
           <div className="flex space-x-4">
      <div className="w-8 h-8 bg-slate-100 text-slate-700 hover:text-slate-100 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
        <Facebook size={14} />
      </div>
      <div className="w-8 h-8 bg-slate-100 text-slate-700 hover:text-slate-100 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
        <Twitter size={14} />
      </div>
      <div className="w-8 h-8 bg-slate-100 text-slate-700 hover:text-slate-100 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors cursor-pointer">
        <Instagram size={14} />
      </div>
    </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-400"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/tours" 
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link 
                  to="/tours/france" 
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Visit France
                </Link>
              </li>
              <li>
                <Link 
                  to="/tours/ghana" 
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Visit Ghana
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              Support
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-purple-400"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/faq" 
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              Get in Touch
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-green-400"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="text-xs">@</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-white">tltraveltours@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="text-xs">📞</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <p className="text-white">+33753164595</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2025 TL Travel Tours. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>Made with ❤️ for travelers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};