import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import groupMenBlueUniforms from '../../assets/groupMenBlueUniforms.png';
import { validateEmail } from '../../services/api/auth'; // API 4


const VerifyOtpForgotPassword = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // Extract email from state
  const { email } = location.state || {};

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleValidateOtp = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call API 4 to validate OTP
      await validateEmail(email, otp);
      console.log('✅ OTP validated successfully');

      // Redirect to reset password page
      navigate('/auth/forgot-password/reset-password', { state: { email, otp } });
    } catch (error) {
      console.error('❌ OTP validation failed:', error);
      setError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col md:flex-row font-inter">
      {/* Left: Form Section */}
      <motion.div
        className="relative flex flex-col justify-center items-center p-6 md:px-12 bg-white/60 backdrop-blur-xl flex-1 md:w-1/2 min-h-screen z-10 shadow-xl rounded-lg md:rounded-none"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center mb-14 px-4 text-center z-10">
            <motion.h1
                className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-r from-blue-800 to-purple-800 text-transparent bg-clip-text leading-none tracking-tight drop-shadow-sm"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ fontFamily: "Loto" }} // Ensure the same font styling
            >
                VELRA
            </motion.h1>
            <motion.p
                className="text-lg pl-2 text-center text-black/60 mt-2 max-w-xs"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{ fontFamily: "Loto" }} // Ensure the same font styling
            >
                Verify the OTP sent to your email.
            </motion.p>
        </div>

        <form className="w-full max-w-md px-4" onSubmit={handleValidateOtp}>
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
              className="w-full px-4 py-2.5 border-solid border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 transition-all duration-200 text-base"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <p className="text-sm text-gray-500 mt-2 mb-4">
                Please enter the 6-digit OTP sent to your registered email address. The OTP is valid for 10 minutes.
            </p>
          </motion.div>
          

          <motion.button
            type="submit"
            className="w-full bg-blue-600 border-none text-lg text-white font-bold py-2 rounded-lg shadow-lg hover:bg-blue-700 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Validating...' : 'Validate OTP'}
          </motion.button>
        </form>
      </motion.div>

      {/* Right: Image Section */}
      <motion.div
        className="relative hidden md:flex flex-1 md:w-1/2 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${groupMenBlueUniforms})` }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent"></div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 p-8"
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

export default VerifyOtpForgotPassword;