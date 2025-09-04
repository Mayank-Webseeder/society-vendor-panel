import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Briefcase } from 'lucide-react';

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
      }, 3000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
        clearTimeout(timeout);
      };
    }
  }, [showSpinner, navigate]);



  return (
    <div className='relative z-20 min-h-screen w-full flex items-center justify-center overflow-hidden'>
      {/* Main Content - relies on OnboardingLayout background */}
      <div className='relative z-10 flex flex-col items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 pt-7 sm:pt-12 sm:pb-2 text-center'>

        {/* Title Section */}
        <div className='mt-8 mb-12'>
          <h1 className='font-bold text-4xl md:text-6xl text-white mb-4 tracking-wide'>
            <span className='hidden sm:inline'>Welcome to{' '}</span>
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              My Society Needs
            </span>
          </h1>

          <p className='text-md sm:text-xl md:text-2xl text-white/70 font-light mb-8 max-w-3xl leading-relaxed'>
            One - Stop Solution for All Your{' '}<br className='block sm:hidden'/>
            <span className="text-blue-300/80 font-medium">Societal & Business Needs</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-white/70 mb-6">
            <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border-solid border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium">Trusted by 1,000+ Professionals</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border-solid border border-white/20">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium">100+ Partner Societies</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border-solid border border-white/20">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium">Enterprise Grade Security</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-14 w-full max-w-6xl">
          <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border-solid border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Users className="text-white" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-3">Professional Network</h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">Connect with verified clients and expand your professional network across residential communities in your region.</p>
            {/* <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
              <span>Learn more</span>
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div> */}
          </div>

          <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border-solid border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="text-white" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-3">Service Excellence</h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">Showcase your expertise with comprehensive portfolios, client testimonials, and outstanding feedbacks.</p>
            {/* <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium">
              <span>Learn more</span>
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div> */}
          </div>

          <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border-solid border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="text-white" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-3">Business Growth</h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">Advanced analytics, automated client matching, and insights to accelerate your business development.</p>
            {/* <div className="mt-4 flex items-center text-cyan-600 text-sm font-medium">
              <span>Learn more</span>
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div> */}
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center" style={{ minHeight: '200px' }}>
          {/* Onboarding button */}
          {!showSpinner ? (
            <div className="text-center">
              <div className="relative group">
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 scale-110"></div>

                <button
                  type="button"
                  className="relative inline-flex items-center justify-center px-8 sm:px-12 md:px-16 py-4 sm:py-5 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border-solid border-2 border-blue-500/20 backdrop-blur-sm"
                  onClick={() => setShowSpinner(true)}
                >
                  <span className="flex items-center">
                    Begin Onboarding Process
                    <ArrowRight className="ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </button>
              </div>

              <p className="text-white/40 text-sm sm:text-base mt-4 sm:mt-6 max-w-md leading-relaxed">
                Complete your comprehensive profile to start connecting with clients in your service area.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 mb-4 text-white/50 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-green-400" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-green-400" />
                  <span>Pay & Connect</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-green-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          ) : (
            // Loading bar
            <div className="flex flex-col items-center space-y-6 sm:space-y-8">
              {/* Enhanced loading spinner */}
              {/* <div className="relative">
                <div className="w-20 h-20 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin opacity-60" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
                <div className="absolute inset-2 w-16 h-16 border-2 border-transparent border-t-indigo-300 rounded-full animate-spin opacity-40" style={{ animationDuration: '3s' }}></div>
              </div> */}

              {/* Enhanced progress bar */}
              <div className="w-full max-w-sm sm:w-96 bg-white/20 rounded-full h-3 shadow-inner backdrop-blur-sm border-solid border border-white/10">
                <div
                  className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 h-3 rounded-full transition-all duration-500 shadow-lg relative overflow-hidden"
                  style={{ width: `${loadingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>

              {/* Enhanced loading content */}
              <div className="text-center space-y-2 sm:space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {loadingSteps[currentStep]}
                </h3>
                <p className="text-white/80 text-base sm:text-lg font-medium">
                  {loadingProgress}% Complete
                </p>
                <p className="text-white/60 text-sm sm:text-base max-w-md leading-relaxed">
                  Setting up your professional workspace and preparing premium onboarding resources
                </p>
              </div>

              {/* Enhanced progress indicators */}
              <div className="flex space-x-3 sm:space-x-4">
                {loadingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index <= currentStep
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg scale-110'
                        : 'bg-white/30'
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

export default Step1_Loading;