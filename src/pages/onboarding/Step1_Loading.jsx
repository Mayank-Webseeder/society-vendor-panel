import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, Users, Briefcase } from 'lucide-react';
import loadingPage from '../../assets/loadingPage.png';
import loadingPageTop from '../../assets/loadingPageTop.png';
import loadingPageBottom from '../../assets/loadingPageBottom.png';

const Step1_Loading = () => {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [dotCount, setDotCount] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    "Initializing your workspace...",
    "Setting up your profile...",
    "Preparing onboarding process...",
    "Almost ready..."
  ];

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Loading progress and steps
  useEffect(() => {
    if (showSpinner) {
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 40);

      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= loadingSteps.length - 1) {
            clearInterval(stepInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 500);

      const timeout = setTimeout(() => {
        navigate('/auth/onboarding/what-you-offer', { replace: true });
        // navigate('/auth/onboarding/what-you-offer');
      }, 2000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
        clearTimeout(timeout);
      };
    }
  }, [showSpinner, navigate]);

  return (
    <div className='relative h-screen w-screen flex items-center justify-center overflow-hidden'>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Main content */}
      <div className='relative z-10 flex flex-col justify-center items-center max-w-2xl mx-auto px-6 pt-2'>
        {/* Hero illustration with enhanced styling */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <img 
              src={loadingPage} 
              alt="loadingPage" 
              className="w-full h-80 max-w-md mx-auto transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Enhanced title section */}
        <div className='flex flex-col justify-center items-center mb-2 text-center'>
          <div className="flex items-center mb-4">
            <Sparkles className="text-blue-500 mr-2 animate-pulse" size={24} />
            <h1 className='font-bold text-4xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2'>
              Let's Get You Set Up
              <span className="inline-block w-8">
                <span className="inline-block animate-dots text-blue-500">
                  {'.'.repeat(dotCount)}
                </span>
              </span>
            </h1>
            <Sparkles className="text-blue-500 ml-2 animate-pulse" size={24} />
          </div>
          
          <p className='font-medium text-xl text-gray-600 mb-4'>
            Build Your Business Presence
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/20">
              <Users className="text-blue-500 mr-2" size={18} />
              <span className="text-sm font-medium text-gray-700">Connect with clients</span>
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/20">
              <Briefcase className="text-blue-500 mr-2" size={18} />
              <span className="text-sm font-medium text-gray-700">Showcase your work</span>
            </div>
          </div>
        </div>

        {/* Fixed height container for button/loading state */}
        <div className="flex flex-col items-center justify-center" style={{ minHeight: '180px' }}>
          {!showSpinner ? (
            <button
              type="button"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm cursor-pointer"
              onClick={() => setShowSpinner(true)}
            >
              <span className="relative z-10 flex items-center">
                Create Your Profile
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              {/* Enhanced loading spinner */}
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin animate-reverse"></div>
              </div>
              
              {/* Progress bar */}
              <div className="w-80 bg-gray-200 rounded-full h-2 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300 shadow-lg"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              
              {/* Loading text */}
              <div className="text-center">
                <p className="text-lg font-medium text-gray-700 mb-1">
                  {loadingSteps[currentStep]}
                </p>
                <p className="text-sm text-gray-500">
                  {loadingProgress}% Complete
                </p>
              </div>
              
              {/* Loading steps indicator */}
              <div className="flex space-x-2">
                {loadingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Background decorative elements */}
      <img
        src={loadingPageTop}
        className='pointer-events-none absolute -top-14 left-0 w-full h-auto opacity-80'
        alt="Top-Loading"
      />
      <img
        src={loadingPageBottom}
        className='pointer-events-none absolute -bottom-10 left-0 w-full h-auto opacity-80'
        alt="Bottom-Loading"
      />

      {/* Enhanced styles */}
      <style>{`
        .animate-dots {
          font-weight: bold;
          letter-spacing: 2px;
          transition: all 0.3s;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
        
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }
        
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        .shadow-blue-500\\/25 {
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Step1_Loading;