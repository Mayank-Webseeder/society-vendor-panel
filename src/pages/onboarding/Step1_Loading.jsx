import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Briefcase, Sparkles, Star, Zap } from 'lucide-react';
import faviconFinal from '/faviconFinal.png';

const Step1_Loading = () => {

  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [dotCount, setDotCount] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const features = [
    {
      icon: Users,
      title: "Professional Network",
      description: "Connect with verified clients and expand your professional network across residential communities in your region.",
      gradient: "from-blue-500 to-indigo-600",
      hoverShadow: "group-hover:shadow-blue-500/25",
      bgGradient: "from-blue-50/50",
      delay: '0.6s'
    },
    {
      icon: Briefcase,
      title: "Service Excellence",
      description: "Showcase your expertise with comprehensive portfolios, client testimonials, and outstanding feedbacks.",
      gradient: "from-indigo-500 to-indigo-600",
      hoverShadow: "group-hover:shadow-indigo-500/25",
      bgGradient: "from-indigo-50/50",
      delay: '0.8s'
    },
    {
      icon: CheckCircle2,
      title: "Business Growth",
      description: "Advanced analytics, automated client matching, and insights to accelerate your business development.",
      gradient: "from-cyan-500 to-cyan-600",
      hoverShadow: "group-hover:shadow-cyan-500/25",
      bgGradient: "from-cyan-50/50",
      delay: '1s'
    }
  ];

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
        navigate('/auth/onboarding/steps/what-you-offer', { replace: true });
      }, 3000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
        clearTimeout(timeout);
      };
    }
  }, [showSpinner, navigate]);



  return (
    <div className='relative z-20 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 min-h-screen w-full flex items-center justify-center overflow-hidden'>
      {/* Branding - Top Left */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex items-center gap-2 sm:gap-3 select-none">
        <img src={faviconFinal} alt="logo" className="w-8 h-8 sm:w-12 sm:h-12 drop-shadow" />
        <div className="hidden lg:flex text-lg xl:text-xl font-extrabold tracking-wide">
          <span className="bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">My Society Needs</span>
        </div>
      </div>

      {/* Main Content - relies on OnboardingLayout background */}
      <div className='relative z-10 flex flex-col items-center justify-center max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-7 lg:pt-12 pb-4 sm:pb-8 text-center'>

        {/* Title Section */}
        <div className='mt-4 sm:mt-8 mb-8 sm:mb-12 relative'>
          {/* Decorative elements */}
          <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border border-blue-200 rounded-full opacity-30 animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 border border-cyan-200 rounded-lg opacity-25 rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl text-slate-800 mb-3 sm:mb-4 tracking-wide animate-fade-in-up'>
            <span className='hidden sm:inline'>Welcome to{' '}</span>
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
              My Society Needs
            </span>
          </h1>

          <p className='text-base sm:text-md md:text-xl lg:text-2xl text-slate-600 font-light mb-6 sm:mb-8 max-w-3xl leading-relaxed animate-fade-in-up px-2 sm:px-0' style={{ animationDelay: '0.2s' }}>
            One - Stop Solution for All Your{' '}<br className='block sm:hidden'/>
            <span className="text-blue-600 font-medium relative">
              Societal & Business Needs
              <Sparkles className="inline w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 text-yellow-500 animate-pulse" />
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-slate-600 mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="group flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 border-solid border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:animate-bounce"></div>
              <span className="text-xs sm:text-sm font-medium">Trusted by 1,000+ Professionals</span>
            </div>
            <div className="group flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 border-solid border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse group-hover:animate-bounce"></div>
              <span className="text-xs sm:text-sm font-medium">100+ Partner Societies</span>
            </div>
            <div className="group flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 border-solid border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse group-hover:animate-bounce"></div>
              <span className="text-xs sm:text-sm font-medium">Enterprise Grade Security</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-14 sm:w-full max-w-6xl">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group w-[80%] sm:w-auto h-44 sm:h-auto bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border-solid border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-2 animate-fade-in-up relative overflow-hidden" 
                style={{ animationDelay: feature.delay }}
              >
                {/* Card background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg ${feature.hoverShadow}`}>
                    <IconComponent className="text-white" size={20} />
                  </div>
                  <h3 className="text-slate-800 font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '1.2s', minHeight: '200px' }}>
          {/* Onboarding button */}
          {!showSpinner ? (
            <div className="text-center relative">              
              <div className="relative group">
                {/* Subtle professional glow effect - reduced on mobile */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-indigo-600/20 rounded-xl blur-2xl sm:blur-lg opacity-0 group-hover:opacity-60 sm:group-hover:opacity-100 transition-all duration-300 scale-100 sm:scale-105 group-hover:scale-105 sm:group-hover:scale-110"></div>

                <button
                  type="button"
                  className="relative inline-flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border-solid border border-white/10 backdrop-blur-sm hover:border-white/20"
                  onClick={() => setShowSpinner(true)}
                >
                  <span className="flex items-center">
                    <Zap className="mr-2 group-hover:animate-pulse" size={18} />
                    <span className="hidden sm:inline">Begin Onboarding Process</span>
                    <span className="sm:hidden">Start Now</span>
                    <ArrowRight className="ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                  </span>
                </button>
              </div>

              <p className="text-slate-500 text-sm sm:text-base mt-4 sm:mt-6 max-w-md leading-relaxed animate-fade-in" style={{ animationDelay: '1.4s' }}>
                Complete your comprehensive profile to start connecting with clients in your service area.
              </p>

              {/* Enhanced Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8 mb-4 text-slate-500 text-xs sm:text-sm animate-fade-in" style={{ animationDelay: '1.6s' }}>
                <div className="group flex items-center gap-1 bg-white/60 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 border border-slate-200 hover:border-green-300 transition-all duration-300 hover:shadow-md">
                  <CheckCircle2 size={12} className="text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">No setup fees</span>
                </div>
                <div className="group flex items-center gap-1 bg-white/60 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                  <CheckCircle2 size={12} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Pay & Connect</span>
                </div>
                <div className="group flex items-center gap-1 bg-white/60 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 border border-slate-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md">
                  <CheckCircle2 size={12} className="text-purple-500 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Cancel anytime</span>
                </div>
              </div>
            </div>
          ) : (
            // Loading Animation
            <div className="flex flex-col items-center space-y-2 sm:space-y-3">
              {/* Simple loading spinner */}
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>

              {/* Simple progress bar */}
              <div className="w-full max-w-xs sm:max-w-sm md:w-96 bg-slate-200 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-gradient-to-r from-blue-400 to-cyan-400 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                >
                </div>
              </div>

              {/* Loading content */}
              <div className="text-center space-y-1 sm:space-y-2">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800">
                  {loadingSteps[currentStep]}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base">
                  {loadingProgress}% Complete
                </p>
              </div>

              {/* Simple progress indicators */}
              <div className="flex space-x-1.5 sm:space-x-2">
                {loadingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                      index <= currentStep
                        ? 'bg-blue-500'
                        : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Custom CSS animations
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes gradient-x {
    0%, 100% {
      background-size: 200% 200%;
      background-position: left center;
    }
    50% {
      background-size: 200% 200%;
      background-position: right center;
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }

  .animate-gradient-x {
    animation: gradient-x 3s ease infinite;
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Step1_Loading;