import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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

  // Custom dot animation variants for AuthPage loading (up-down pulsating)
  const dotVariants = {
    start: { y: "0px" },
    end: { y: "-15px" },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  };

  const formPanelVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const imagePanelVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } },
  };

  return (
  <div className="min-h-screen overflow-y-hidden flex flex-col md:flex-row font-inter overflow-hidden relative">
      {/* Background layers: animated gradient, soft color blobs, vignette */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ x: 0 }}
        // animate={useReducedMotion() ? undefined : { x: [0, 30, -30, 0] }}
        // transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        // style={{
        //   background: 'linear-gradient(135deg, #020617 0%, #1e40af 30%, #1d4ed8 100%)',
        //   filter: 'saturate(1.05) contrast(1.02)'
        // }}
        style={{
          background: '#ffffff'
        }}
      />

      {/* Soft neutral blob (top-left) - removed for clean white background */}
      {/* <motion.div
        className="absolute -left-20 -top-20 w-80 h-80 rounded-full z-0 pointer-events-none"
        initial={{ x: 0, y: 0, opacity: 0.6 }}
        animate={useReducedMotion() ? undefined : { x: [0, 12, -8, 0], y: [0, -8, 6, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(148,163,184,0.15), transparent 40%)',
          filter: 'blur(48px)'
        }}
      /> */}

      {/* Soft neutral blob (bottom-right) - removed for clean white background */}
      {/* <motion.div
        className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full z-0 pointer-events-none"
        initial={{ x: 0, y: 0, opacity: 0.5 }}
        animate={useReducedMotion() ? undefined : { x: [0, -10, 14, 0], y: [0, 8, -6, 0] }}
        transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 70% 70%, rgba(100,116,139,0.12), transparent 45%)',
          filter: 'blur(56px)'
        }}
      /> */}

      {/* Ambient halo behind form column - removed for clean white background */}
      {/* <div
        className="absolute left-[-10%] md:left-[-6%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(241,245,249,0.25), rgba(226,232,240,0.18) 32%, transparent 90%)',
          filter: 'blur(64px)'
        }}
      /> */}

      {/* Subtle vignette to ground the layout - removed for clean white background */}
      {/* <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.15) 100%)'
        }}
      /> */}
      {/* Left: Image Section with Looping Animation */}
      <motion.div
        className="relative hidden md:flex md:w-3/5 min-h-screen bg-cover bg-center overflow-hidden"
        variants={imagePanelVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Image Container */}
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              animate={{
                opacity: index === currentImageIndex ? 1 : 0,
                scale: index === currentImageIndex ? 1 : 1.05,
              }}
              transition={{
                opacity: { duration: 0.8, ease: "easeInOut" },
                scale: { duration: 1.2, ease: "easeInOut" }
              }}
            />
          ))}
        </div>

        {/* Dark overlay with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/80 via-[#0b1120]/40 to-transparent"></div>

        {/* Enhanced Tagline */}
        <motion.div
          className='absolute inset-0 flex flex-col items-center justify-center z-20 p-8'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-center space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight drop-shadow-2xl">
                You bring the
              </span>
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent leading-tight drop-shadow-2xl ml-2">
                expertise
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight drop-shadow-2xl">
                We bring the
              </span>
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent leading-tight drop-shadow-2xl ml-2">
                exposure
              </span>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.5, ease: "backOut" }}
            className="mt-6 flex items-center space-x-4"
          >
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-6 z-20 flex space-x-2">
          {images.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
              animate={{
                scale: index === currentImageIndex ? 1.2 : 1,
                opacity: index === currentImageIndex ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Right: Form Section */}
      <motion.div
        className="relative flex flex-col justify-center items-center p-6 md:px-12
                   md:w-2/5 min-h-screen z-10"
        variants={formPanelVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Professional grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Subtle geometric accent */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full z-0"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
            transform: 'skewX(15deg)',
            transformOrigin: 'top'
          }}
        ></div>

        {/* Professional corner accents */}
        <div
          className="absolute top-0 right-0 w-48 h-48 z-0"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(50%, -50%)'
          }}
        ></div>

        <div
          className="absolute bottom-0 left-0 w-72 h-72 z-0"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(-50%, 50%)'
          }}
        ></div>

        {/* Logo & Title */}
        <div className='flex flex-col items-center mb-10 sm:mb-12 text-center z-10'>
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
          {
            !loading &&
              <motion.p
                className="text-base text-center text-slate-600 mt-2"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{fontFamily:"Roboto"}}
              >
                Your gateway to professional opportunities.
              </motion.p>
          }
        </div>

        {/* Segmented toggle: improved colors and background */}
        <div className="z-10 mb-4">
          <div className="mx-auto w-full max-w-md px-4">
            <div className="inline-flex items-center border-solid border border-slate-300 rounded-full bg-slate-100/60 backdrop-blur-sm p-2 shadow-[inset_0_1px_0_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.05)]">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-24 px-5 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer ${isLogin ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-none text-white shadow-md' : 'text-slate-600 hover:text-slate-800 bg-white/80 border-solid border border-slate-300'}`}
                aria-pressed={isLogin}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`ml-4 w-24 px-5 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer ${!isLogin ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-none text-white shadow-md' : 'text-slate-600 hover:text-slate-800 bg-slate-100/80 border-solid border border-slate-300'}`}
                aria-pressed={!isLogin}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Login / SignUp Forms */}
        <div className="w-full max-w-md px-4 z-10">
          <div className="rounded-2xl bg-white/95 backdrop-blur-sm border-solid border border-slate-300 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                className="flex flex-col items-center justify-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Custom Dot Loading Animation */}
                <div className="flex space-x-2 mb-3">
                  <motion.span
                    className="block w-4 h-4 bg-blue-300 rounded-full shadow-md drop-shadow-sm"
                    variants={dotVariants}
                    initial="start"
                    animate="end"
                    transition={dotTransition}
                  />
                  <motion.span
                    className="block w-4 h-4 bg-blue-300 rounded-full shadow-md drop-shadow-sm"
                    variants={dotVariants}
                    initial="start"
                    animate="end"
                    transition={{ ...dotTransition, delay: 0.15 }}
                  />
                  <motion.span
                    className="block w-4 h-4 bg-blue-300 rounded-full shadow-md drop-shadow-sm"
                    variants={dotVariants}
                    initial="start"
                    animate="end"
                    transition={{ ...dotTransition, delay: 0.3 }}
                  />
                </div>
                <p className="text-xl text-slate-600 font-semibold mt-4">
                  {isLogin ? 'Logging you in...' : 'Creating your account...'}
                </p>
              </motion.div>
            ) : isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Login onSwitch={() => setIsLogin(false)} onLogin={handleLogin} />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <SignUp onSwitch={() => setIsLogin(true)} />
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default AuthPage;