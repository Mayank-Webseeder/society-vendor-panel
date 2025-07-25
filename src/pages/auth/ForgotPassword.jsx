import { useState, useRef, useEffect } from 'react';
import groupMenBlueUniforms from '../../assets/groupMenBlueUniforms.png';
import { motion } from 'framer-motion';

const RESEND_TIME = 59; // seconds

const ForgotPassword = () => {
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
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isTiming]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowResend(true);
    setTimer(RESEND_TIME);
    setIsTiming(true);
    // API call here
    console.log("Password reset link requested for:", email);
  };

  const formatTimer = (t) => `0:${t.toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen overflow-y-hidden bg-gray-200 flex flex-col md:flex-row font-inter overflow-hidden">
      {/* Left: Form Section */}
      <motion.div
        className="relative flex flex-col justify-center items-center p-6 md:px-12
                   bg-white/60 backdrop-blur-xl flex-1 md:w-1/2 min-h-screen z-10
                   shadow-xl rounded-lg md:rounded-none"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* VELRA Heading */}
        <div className='flex flex-col items-center mb-14 px-4 text-center z-10'>
          <motion.h1
            className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-r from-blue-800 to-purple-800 text-transparent bg-clip-text leading-none tracking-tight drop-shadow-sm"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ fontFamily: "Loto" }}
          >
            VELRA
          </motion.h1>
          <motion.p
            className="text-lg pl-2 text-center text-black/60 mt-2 max-w-xs"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ fontFamily: "Loto" }}
          >
            Your gateway to professional opportunities.
          </motion.p>
        </div>

        {/* Form */}
        <form className="w-full max-w-md px-4" onSubmit={handleFormSubmit}>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="your.email@example.com"
              className="w-full px-4 py-2.5 border-solid border border-gray-300 rounded-lg placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         text-gray-800 transition-all duration-200 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isTiming}
            />
          </motion.div>

          <motion.p
            className="text-left font-medium text-base text-[#4487AE] mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Enter your registered email address. We'll send you a link to reset your password.
          </motion.p>

          {showResend && (
            <motion.div
              className="flex items-center justify-between mt-16 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span className="text-base font-medium text-gray-500">
                Didn't receive the email? Click Resend.
              </span>
              <span className="text-sm text-gray-700 font-semibold min-w-[40px] text-right">
                {isTiming ? formatTimer(timer) : '0:00'}
              </span>
            </motion.div>
          )}

          <motion.button
            type="submit"
            className={`w-full text-lg border-none font-bold py-2 rounded-lg shadow-lg transition-colors
              ${(isTiming || email.trim() === '') ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'}
            `}
            disabled={isTiming || email.trim() === ''}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {showResend && !isTiming ? 'Resend Link' : 'Send Link'}
          </motion.button>
        </form>
      </motion.div>

      {/* Right: Image Section */}
      <motion.div
        className="relative hidden md:flex flex-1 md:w-1/2 h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${groupMenBlueUniforms})` }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
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