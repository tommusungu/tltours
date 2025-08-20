import React from 'react';
import { 
  Bot,
  CheckCircle
} from 'lucide-react';

const WorkflowVisualizationComponent = ({ steps, getStepStatus, currentStep, isGenerating }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3 justify-center">
        <Bot className="text-purple-500" size={22} />
        AI Tour Generation Process
      </h2>
      
      <div className="relative">
        {/* Horizontal Connection Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200"></div>
        
        {/* Steps Container - Horizontal Layout */}
        <div className="flex justify-between items-start relative z-10">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const status = getStepStatus(step.id);
            
            return (
              <div key={step.id} className="flex flex-col items-center max-w-[140px]">
                {/* Step Circle */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-3 relative z-20 transition-all duration-300 ${
                  status === 'completed' ? 'bg-green-600 shadow-lg shadow-green-600/25' :
                  status === 'active' ? 'bg-purple-600 shadow-lg shadow-purple-600/25 animate-pulse' :
                  'bg-gray-400'
                }`}>
                  {status === 'completed' ? (
                    <CheckCircle size={18} className="text-white" />
                  ) : status === 'active' ? (
                    <div className="flex space-x-0.5">
                      <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                    </div>
                  ) : (
                    <IconComponent size={18} className="text-white" />
                  )}
                </div>
                
                {/* Step Content */}
                <div className="text-center">
                  <h3 className={`font-medium text-sm mb-1 transition-colors duration-300 ${
                    status === 'completed' ? 'text-green-600' :
                    status === 'active' ? 'text-purple-600' :
                    'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {/* Step Number */}
                  <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                    status === 'completed' ? 'bg-green-100 text-green-700' :
                    status === 'active' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    Step {index + 1}
                  </div>
                  
                  {/* Active Step Description */}
                  {status === 'active' && (
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStep / (steps.length - 1)) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              isGenerating ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-green-500'
            }`}
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Status Message */}
      {isGenerating && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <p className="text-blue-800 font-medium text-sm">AI is working on your personalized tour...</p>
          </div>
        </div>
      )}
    </div>
  );
};
