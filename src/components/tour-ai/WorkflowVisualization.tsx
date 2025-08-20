// components/tour-ai/WorkflowVisualization.tsx
import { Bot, CheckCircle, LucideIcon } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
  status: string;
}

interface WorkflowVisualizationProps {
  steps: Step[];
  getStepStatus: (stepId: number) => string;
  currentStep: number;
}

export const WorkflowVisualization = ({ steps, getStepStatus, currentStep }: WorkflowVisualizationProps) => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-8">
      <h2 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
        <Bot className="text-purple-400" size={20} />
        AI Tour Generation Process
      </h2>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const status = getStepStatus(step.id);
          
          return (
            <div key={step.id} className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
              status === 'completed' ? 'bg-green-600/20 border-green-500/30' :
              status === 'active' ? 'bg-purple-600/20 border-purple-500/30' :
              'bg-slate-700/30 border-slate-600/30'
            }`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                status === 'completed' ? 'bg-green-600' :
                status === 'active' ? 'bg-purple-600' :
                'bg-slate-600'
              }`}>
                {status === 'completed' ? (
                  <CheckCircle size={20} className="text-white" />
                ) : status === 'active' ? (
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                  </div>
                ) : (
                  <IconComponent size={20} className="text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-medium text-sm ${
                  status === 'completed' ? 'text-green-400' :
                  status === 'active' ? 'text-purple-400' :
                  'text-gray-400'
                }`}>
                  {step.title}
                </h3>
                {status === 'active' && (
                  <p className="text-sm text-gray-400 mt-1">
                    {step.id === 0 && 'Analyzing destination data, weather, and local events...'}
                    {step.id === 1 && 'Optimizing routes with real-time traffic and walking distances...'}
                    {step.id === 2 && 'Generating personalized descriptions and cultural context...'}
                    {step.id === 3 && 'Creating visual guides and photo recommendations...'}
                    {step.id === 4 && 'Adding local insider tips and hidden gems...'}
                    {step.id === 5 && 'Finalizing tour package with booking options...'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};