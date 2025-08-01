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
    <div 
      className='relative z-10 min-h-screen w-screen flex items-center justify-center overflow-auto'
      style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 30%, #1e1b4b 100%)' }}
    >
      {/* Velra Branding */}
      <div className="absolute top-5 left-[2.5%] z-10">
        <h1
          style={{
            fontWeight: '700',
            background: 'linear-gradient(90deg, #ffffff, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.2rem',
            fontFamily: 'Roboto, sans-serif',
            letterSpacing: '0.1em',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            margin: 0,
          }}
        >
          VELRA
          <div
            style={{
              content: '""',
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '2px',
              background: 'linear-gradient(90deg, #60a5fa, #ffffff)',
              borderRadius: '1px',
            }}
          />
        </h1>
      </div>


      {/* Enhanced Background Pattern - Matching Landing Page */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }}
        />

        {/* Geometric accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
            transform: 'skewX(-15deg)',
            transformOrigin: 'top',
          }}
        />

        {/* Corner accents */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Additional floating elements */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '10%',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />
      </div>


      {/* Main Content */}
      <div className='relative z-10 flex flex-col items-center justify-center max-w-6xl mx-auto px-8 py-4 text-center'>
        
        {/* Title Section */}
        <div className='mb-16 mt-48'>
          <h1 className='font-bold text-4xl md:text-6xl text-white mb-6 tracking-wide'>
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Velra Services
            </span>
          </h1>
          
          <p className='text-xl md:text-2xl text-white/70 font-light mb-8 max-w-3xl leading-relaxed'>
            One - Stop Solution for All Your{' '}
            <span className="text-blue-300/80 font-medium">Societal & Business Needs</span>
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/70 mb-8">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Trusted by 1,000+ Professionals</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">100+ Partner Societies</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Enterprise Grade Security</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-6xl">
          <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-gray-800 font-bold text-xl mb-3">Professional Network</h3>
            <p className="text-gray-600 text-base leading-relaxed">Connect with verified clients and expand your professional network across residential communities in your region.</p>
            {/* <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
              <span>Learn more</span>
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div> */}
          </div>
          
          <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="text-white" size={32} />
            </div>
            <h3 className="text-gray-800 font-bold text-xl mb-3">Service Excellence</h3>
            <p className="text-gray-600 text-base leading-relaxed">Showcase your expertise with comprehensive portfolios, client testimonials, and outstanding feedbacks.</p>
            {/* <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium">
              <span>Learn more</span>
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div> */}
          </div>
          
          <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="text-white" size={32} />
            </div>
            <h3 className="text-gray-800 font-bold text-xl mb-3">Business Growth</h3>
            <p className="text-gray-600 text-base leading-relaxed">Advanced analytics, automated client matching, and insights to accelerate your business development.</p>
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
                  className="relative inline-flex items-center justify-center px-16 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-blue-500/20 backdrop-blur-sm"
                  onClick={() => setShowSpinner(true)}
                >
                  <span className="flex items-center">
                    Begin Onboarding Process
                    <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" size={24} />
                  </span>
                </button>
              </div>
              
              <p className="text-white/40 text-base mt-6 max-w-md leading-relaxed">
                Complete your comprehensive profile to start connecting with clients in your service area.
              </p>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-4 mt-8 mb-4 text-white/50 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <span>Pay & Connect</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          ) : (
            // Loading bar
            <div className="flex flex-col items-center space-y-8">
              {/* Enhanced loading spinner */}
              {/* <div className="relative">
                <div className="w-20 h-20 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin opacity-60" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
                <div className="absolute inset-2 w-16 h-16 border-2 border-transparent border-t-indigo-300 rounded-full animate-spin opacity-40" style={{ animationDuration: '3s' }}></div>
              </div> */}
              
              {/* Enhanced progress bar */}
              <div className="w-96 bg-white/20 rounded-full h-3 shadow-inner backdrop-blur-sm border border-white/10">
                <div 
                  className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 h-3 rounded-full transition-all duration-500 shadow-lg relative overflow-hidden"
                  style={{ width: `${loadingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
              
              {/* Enhanced loading content */}
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-bold text-white">
                  {loadingSteps[currentStep]}
                </h3>
                <p className="text-white/80 text-lg font-medium">
                  {loadingProgress}% Complete
                </p>
                <p className="text-white/60 text-base max-w-md leading-relaxed">
                  Setting up your professional workspace and preparing premium onboarding resources
                </p>
              </div>
              
              {/* Enhanced progress indicators */}
              <div className="flex space-x-4">
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


      {/* Enhanced Styles */}
      <style>
        {`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px); 
            }
            50% { 
              transform: translateY(-20px); 
            }
          }
          
          .bg-clip-text {
            -webkit-background-clip: text;
            background-clip: text;
          }
          
          .backdrop-blur-sm {
            backdrop-filter: blur(8px);
          }
          
          .shadow-blue-500\\/25 {
            box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
          }
          
          .group:hover .group-hover\\:translate-x-1 {
            transform: translateX(0.25rem);
          }
          
          .group:hover .group-hover\\:scale-110 {
            transform: scale(1.1);
          }
        `}
      </style>
    </div>
  );
};

export default Step1_Loading;