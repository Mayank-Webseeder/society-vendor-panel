import { useState, useRef, useEffect } from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import groupMenBlueUniforms from '../../assets/groupMenBlueUniforms.png';
import { sendOtp } from '../../services/api/auth';


const RESEND_TIME = 59;    // seconds


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIME);
  const [isTiming, setIsTiming] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    if (isTiming) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTiming(false);
            setShowResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isTiming]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call API 3 to send OTP
      await sendOtp(email);
      console.log("OTP sent successfully to:", email);
      
      // Show resend option and start timer
      setShowResend(true);
      setIsTiming(true);
      setTimer(RESEND_TIME);

      // Redirect to VerifyOtpForgotPassword page with email as state
      navigate('/auth/forgot-password/verify-otp', { state: { email } });
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };


  const formatTimer = (t) => `0:${t.toString().padStart(2, '0')}`;

  const formPanelVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const imagePanelVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } },
  };

  return (
    <div className="min-h-screen overflow-y-hidden flex flex-col md:flex-row font-inter overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 30%, #1e1b4b 100%)'
         }}>
      {/* Left: Form Section */}
      <motion.div
        className="relative flex flex-col justify-center items-center p-6 md:px-12
                   flex-1 md:w-1/2 min-h-screen z-10"
        variants={formPanelVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 30%, #1e1b4b 100%)'
        }}
      >
        {/* Professional grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-50"
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

        {/* VELRA logo & Title */}
        <div className='flex flex-col items-center mb-14 px-4 text-center z-10'>
          <Typography
            variant="h1"
            sx={{
              fontWeight: '700',
              background: 'linear-gradient(90deg, #ffffff, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '3.5rem', md: '6rem' },
              fontFamily: 'Roboto, sans-serif',
              letterSpacing: '0.1em',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              mb: 2,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '2px',
                background: 'linear-gradient(90deg, #60a5fa, #ffffff)',
                borderRadius: '1px',
              },
            }}
          >
            VELRA
          </Typography>
          <motion.p
            className="text-base text-center text-white/60 mt-2"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{fontFamily:"Roboto"}}
          >
            Your gateway to professional opportunities.
          </motion.p>
        </div>

        {/* Form */}
        <div className="w-full max-w-md px-4 z-10">
          <motion.h2
            className="text-2xl font-normal text-white/80 text-left mb-8"
            style={{ fontFamily:"Loto" }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Reset Password
          </motion.h2>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="your.email@example.com"
                className="w-full px-4 py-2.5 border-solid border border-gray-300 rounded-lg placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                           text-gray-800 bg-white/90 backdrop-blur transition-all duration-200 text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isTiming}
              />
            </motion.div>

            <motion.p
              className="text-left font-medium text-sm text-white/80 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Enter your registered email address. We'll send you a One-Time Password (OTP) to reset your password.
            </motion.p>

            {showResend && (
              <motion.div
                className="flex items-center justify-between mt-12 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <span className="text-sm font-medium text-white/70">
                  Didn't receive the email? Click Resend.
                </span>
                <span className="text-sm text-white font-semibold min-w-[40px] text-right">
                  {isTiming ? formatTimer(timer) : '0:00'}
                </span>
              </motion.div>
            )}

            <motion.button
              type="submit"
              className={`w-full border-none py-3 px-6 rounded-lg font-semibold transition-all duration-200 text-base
                         ${(isTiming || email.trim() === '') 
                           ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                           : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer'}
                         shadow-md`}
              disabled={isTiming || email.trim() === ''}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {showResend && !isTiming ? 'Resend Link' : 'Send OTP'}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Right: Image Section */}
      <motion.div
        className="relative hidden md:flex flex-1 md:w-1/2 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${groupMenBlueUniforms})` }}
        variants={imagePanelVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Dark overlay with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent"></div>

        {/* Tagline */}
        <motion.div
          className='absolute inset-0 flex items-center justify-center z-20 p-8'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
        >
          <p className="font-semibold text-5xl text-white text-center leading-tight drop-shadow-lg">
            You bring the expertise.<br /> Velra brings the exposure.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;