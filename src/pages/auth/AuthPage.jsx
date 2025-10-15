import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import groupMenBlueUniforms from '../../assets/groupMenBlueUniforms.png';
import authPageImg2 from '../../assets/authPageImg2.jpg';
import authPageImg3 from '../../assets/authPageImg3.jpg';
import Login from './Login';
import SignUp from './SignUp';
import { useAuth } from '../../AuthContext';

const AuthPage = () => {
  const location = useLocation();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of images for the looping animation
  const images = [
    groupMenBlueUniforms,
    authPageImg2,
    authPageImg3
  ];

  // Auto-cycle through images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login();
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen overflow-y-hidden flex flex-col md:flex-row font-inter overflow-hidden relative bg-white">
      {/* Left: Image Section with Carousel */}
      <div className="relative hidden md:flex md:w-3/5 min-h-screen bg-cover bg-center overflow-hidden">
        {/* Animated Image Container */}
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-800"
              style={{
                backgroundImage: `url(${image})`,
                opacity: index === currentImageIndex ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/80 via-[#0b1120]/40 to-transparent"></div>

        {/* Tagline */}
        <div className='absolute inset-0 flex flex-col items-center justify-center z-20 p-8'>
          <div className="text-center space-y-2">
            <div className="relative">
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight drop-shadow-2xl">
                You bring the
              </span>
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent leading-tight drop-shadow-2xl ml-2">
                expertise
              </span>
            </div>

            <div className="relative">
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight drop-shadow-2xl">
                We bring the
              </span>
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent leading-tight drop-shadow-2xl ml-2">
                exposure
              </span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-6 z-20 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Right: Form Section - FIXED LAYOUT */}
      <div className="relative flex flex-col md:w-2/5 h-screen overflow-y-auto z-10 p-6 md:px-12">

        {/* Fixed Header Section */}
        <div className="flex-shrink-0 pb-8">
          {/* Logo & Title */}
          <div className='flex flex-col items-center mb-8 text-center'>
            <Typography
              variant="h2"
              className="text-blue-500"
              sx={{
                display: "inline",
                fontWeight: "700",
                color: "#2c4999",
                fontSize: { xs: "2.25rem", sm: "3rem", md: "3.25rem", lg: "3.5rem" },
                fontFamily: "Roboto, sans-serif",
                letterSpacing: { xs: "0.01em", sm: "0.02em" },
                textAlign: "center",
                textShadow: {
                  xs: "0 1px 2px rgba(0,0,0,0.2)",
                  sm: "0 2px 4px rgba(0, 0, 0, 0.3)",
                },
                position: "relative",
                mb: { xs: 0.5, sm: 1 },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-6px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: '60%',
                  height: "3px",
                  background: "linear-gradient(90deg, #7eade6, #2c4999)",
                  borderRadius: "1px",
                },
              }}
            >
              My Society Needs
            </Typography>
            {!loading && (
              <p
                className="text-base text-center text-slate-600 mt-3"
                style={{ fontFamily: "Roboto" }}
              >
                Your gateway to professional opportunities.
              </p>
            )}
          </div>

          {/* Fixed Toggle Section */}
          <div className="flex justify-center">
            <div className="inline-flex items-center border-solid border border-slate-300 rounded-full bg-slate-100/60 backdrop-blur-sm p-2 shadow-sm">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-24 px-5 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none cursor-pointer ${isLogin
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-none text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-800 bg-white/80 border-solid border border-slate-300'
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`ml-4 w-24 px-5 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none cursor-pointer ${!isLogin
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-none text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-800 bg-slate-100/80 border-solid border border-slate-300'
                  }`}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Form Container - Takes remaining space */}
        <div className="flex-1 flex items-start justify-center">
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-white/95 overflow-hidden backdrop-blur-sm border-solid border border-slate-300 shadow-lg p-6 transition-all duration-300 ease-in-out">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="flex space-x-2 mb-3">
                    <span className="block w-4 h-4 bg-blue-500 rounded-full animate-pulse"></span>
                    <span className="block w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                    <span className="block w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                  <p className="text-xl text-slate-600 font-semibold mt-4">
                    {isLogin ? 'Logging you in...' : 'Creating your account...'}
                  </p>
                </div>
              ) : isLogin ? (
                <div key="login">
                  <Login onSwitch={() => setIsLogin(false)} onLogin={handleLogin} />
                </div>
              ) : (
                <div key="signup">
                  <SignUp onSwitch={() => setIsLogin(true)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
