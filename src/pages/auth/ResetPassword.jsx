import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import groupMenBlueUniforms from '../../assets/groupMenBlueUniforms.png';
import { motion } from 'framer-motion';

const passwordRequirements = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]{8,}$/;

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password
    if (!passwordRequirements.test(password)) {
      setError(
        'Password must be at least 8 characters, include one uppercase letter, one number, and one special character (@, #, $).'
      );
      return;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    // Handle password reset logic here
    console.log('Password reset successful');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen overflow-y-hidden bg-gray-200 flex flex-col md:flex-row font-inter overflow-hidden">
      {/* Left: Form Section */}
      <motion.div
        className="relative flex flex-col justify-center items-center p-6 md:px-12
                   bg-white/60 backdrop-blur-xl flex-1 md:w-1/2 min-h-screen z-10
                   shadow-xl rounded-lg md:rounded-none"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* VELRA Heading */}
        <div className="flex flex-col items-center mb-14 px-4 text-center z-10">
          <motion.h1
            className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-r from-blue-800 to-purple-800 text-transparent bg-clip-text leading-none tracking-tight drop-shadow-sm"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ fontFamily: 'Loto' }}
          >
            VELRA
          </motion.h1>
          <motion.p
            className="text-lg pl-2 text-center text-black/60 mt-2 max-w-xs"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ fontFamily: 'Loto' }}
          >
            Your gateway to professional opportunities.
          </motion.p>
        </div>

        {/* Form */}
        <form className="w-full max-w-md px-4" onSubmit={handleSubmit}>
          {/* New Password Field */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Create New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2.5 border-solid border border-gray-300 rounded-lg placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         text-gray-800 transition-all duration-200 text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter new password"
              className="w-full px-4 py-2.5 border-solid border border-gray-300 rounded-lg placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         text-gray-800 transition-all duration-200 text-base"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.p
              className="text-left font-medium text-sm text-red-500 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}

          {/* Info Text */}
          <motion.p
            className="text-left font-medium text-sm text-[#4487AE] mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Your new password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character (e.g., @, #, $).
          </motion.p>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full border-none bg-blue-600 text-lg text-white font-bold py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Reset Password
          </motion.button>
        </form>
      </motion.div>

      {/* Right: Image Section */}
      <motion.div
        className="relative hidden md:flex flex-1 md:w-1/2 h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${groupMenBlueUniforms})` }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      >
        {/* Dark overlay with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent"></div>

        {/* Tagline */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
        >
          <p className="font-semibold text-5xl text-white text-center leading-tight drop-shadow-lg">
            You bring the expertise.<br /> Velra brings the exposure.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;