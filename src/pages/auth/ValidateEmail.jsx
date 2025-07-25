import { useState } from 'react';
import { motion } from 'framer-motion';
import groupMenBlueUniforms from '../../assets/groupMenBlueUniforms.png';

const ValidateEmail = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleValidate = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call the actual validate email API (to be implemented)
      console.log('Validating OTP:', otp);
      alert('Email validated successfully!');
    } catch (error) {
      console.error('❌ Validation failed:', error);
      setError(error.message || 'Validation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen overflow-y-hidden bg-gray-200 flex flex-col md:flex-row font-inter overflow-hidden">
      {/* Left: Form Section */}
      <motion.div
        className="relative flex flex-col justify-center items-center p-6 md:px-12
                   bg-white/60 backdrop-blur-xl flex-1 md:w-1/2 min-h-screen z-10
                   shadow-xl rounded-lg md:rounded-none"
        variants={formPanelVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Optional: Subtle background pattern */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E0E0E0' fill-opacity='0.5' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zm-.173 0L0 5.827V6h1V.827L.173 0zM5.827 0L6 .173V1H.173L0 .827V0h5.827z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '6px 6px'
          }}
        ></div>

        {/* VELRA logo & Title */}
        <div className='flex flex-col items-center mb-14 px-4 text-center z-10'>
          <motion.h1
            className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-r from-blue-800 to-purple-800 text-transparent bg-clip-text leading-none tracking-tight drop-shadow-sm"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{fontFamily:"Loto"}}
          >
            VELRA
          </motion.h1>
          {
            !loading &&
              <motion.p
                className="text-lg pl-2 text-center text-black/60 mt-2 max-w-xs"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{fontFamily:"Loto"}}
              >
                Validate your email to proceed.
              </motion.p>
          }
        </div>

        {/* OTP Validation Form */}
        <div className="w-full max-w-md px-4 z-10">
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
                  className="block w-4 h-4 bg-blue-500 rounded-full shadow-md drop-shadow-sm"
                  variants={dotVariants}
                  initial="start"
                  animate="end"
                  transition={dotTransition}
                />
                <motion.span
                  className="block w-4 h-4 bg-blue-500 rounded-full shadow-md drop-shadow-sm"
                  variants={dotVariants}
                  initial="start"
                  animate="end"
                  transition={{ ...dotTransition, delay: 0.15 }}
                />
                <motion.span
                  className="block w-4 h-4 bg-blue-500 rounded-full shadow-md drop-shadow-sm"
                  variants={dotVariants}
                  initial="start"
                  animate="end"
                  transition={{ ...dotTransition, delay: 0.3 }}
                />
              </div>
              <p className="text-xl text-blue-600 font-semibold mt-4">Validating OTP...</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleValidate}
              className="space-y-6"
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
              {/* Error Message */}
              {error && (
                <motion.div 
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <motion.div>
                <label htmlFor="otp" className="block text-gray-700 text-sm font-medium mb-2">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  placeholder="123456"
                  className="w-full px-4 py-2.5 border-solid border border-gray-300 rounded-lg placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             text-gray-800 transition-all duration-200 text-base"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </motion.div>

              {/* Message Below Input */}
              <motion.p
                className="text-sm text-gray-600 pb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                We have sent a One-Time Password(OTP) to your entered email. Please verify the otp to continue.
              </motion.p>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 border-none text-lg text-white font-bold py-2 rounded-lg shadow-lg hover:bg-blue-700 cursor-pointer
                           transition-all duration-300 transform hover:scale-[1.01] active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Validate OTP
              </motion.button>
            </motion.form>
          )}
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

export default ValidateEmail;