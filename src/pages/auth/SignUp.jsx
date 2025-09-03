import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sendOtpEmailVerification } from '../../services/api/auth';
import { Eye, EyeOff } from 'lucide-react';


const SignUp = ({ onSwitch }) => {

  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSignup = async(e) => {
    e.preventDefault();

    // Basic validation
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');
    console.log("Entered email: ", email)

    try {
      // Call the sendOtpEmailVerification API (API 6)
      // const result = await sendOtpEmailVerification(email.trim());
      
      // console.log('✅ OTP sent successfully:', result);
      
      // Show success message
      alert('OTP sent successfully! Please check your email for verification.');
      
      // Navigate to email validation page
      navigate('/auth/validate-email', {
        state: { fullName, email, password },    // Pass data here
      });
      
    } catch (error) {
      console.error('❌ Failed to send OTP:', error);
      setError(error.message || 'Failed to send OTP. Please try again.');

    } finally {
      setLoading(false);
    }
  };


  // Custom dot animation variants for SignUp loading
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

  if (loading) {
    return (
      <motion.div
        key="loading-signup"
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
        <p className="text-xl text-blue-300 font-semibold mt-4">Creating your account...</p>
      </motion.div>
    );
  }

  const inputVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.form
      onSubmit={handleSignup}
      className="space-y-6"
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-semibold text-white text-center mb-6"
        style={{ fontFamily:"Parisienne" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Join Today!
      </motion.h2>

      {/* Error Message */}
      {error && (
        <motion.div 
          className="bg-red-50 border-solid border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      <motion.div variants={inputVariants}>
        <label htmlFor="fullname" className="block text-white text-sm font-medium mb-2">Full Name</label>
        <input
          type="text"
          id="fullname"
          placeholder="John Doe"
          className="w-full px-4 py-2.5 border-solid border border-white/20 rounded-lg placeholder-white/70
                     focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent
                     text-white/90 bg-white/10 backdrop-blur-md transition-all duration-200 text-base shadow-inner"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </motion.div>

      <motion.div variants={inputVariants}>
        <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="your.email@example.com"
          className="w-full px-4 py-2.5 border-solid border border-white/20 rounded-lg placeholder-white/70
                     focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent
                     text-white/90 bg-white/10 backdrop-blur-md transition-all duration-200 text-base shadow-inner"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </motion.div>

      <motion.div variants={inputVariants}>
        <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 pr-12 border-solid border border-white/20 rounded-lg placeholder-white/70
                       focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent
                       text-white/90 bg-white/10 backdrop-blur-md transition-all duration-200 text-base shadow-inner"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 border-none flex items-center bg-transparent text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </motion.div>

      <motion.div className="flex items-center text-sm" variants={inputVariants}>
        <input
          type="checkbox"
          id="remember"
          className="form-checkbox h-4 w-4 text-blue-400 rounded-md border-gray-300 focus:ring-blue-400 cursor-pointer"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="remember" className="ml-2 text-white/80 cursor-pointer">
          Remember Me
        </label>
      </motion.div>

      <motion.button
        type="submit"
        className="w-full border-none text-lg text-white font-bold py-3 rounded-lg shadow-lg cursor-pointer
                   transition-all duration-300 transform hover:scale-[1.02] active:scale-98 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-0"
        style={{
          background: 'linear-gradient(135deg, #38bdf8 0%, #3b82f6 50%, #1d4ed8 100%)',
          boxShadow: '0 6px 18px rgba(56,189,248,0.35)'
        }}
        whileHover={{ 
          y: -2,
          boxShadow: '0 6px 25px rgba(56,189,248,0.4)'
        }}
        whileTap={{ scale: 0.98 }}
        variants={inputVariants}
      >
        Sign Up
      </motion.button>

      <motion.p className="text-center text-white/80 text-sm mt-4" variants={inputVariants}>
        Already have an account?{' '}
  <motion.button
          type="button"
          className="text-blue-300 text-base bg-transparent pl-1 border-none hover:text-blue-100 font-medium cursor-pointer transition-colors duration-200"
          onClick={onSwitch}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Log In
        </motion.button>
      </motion.p>
    </motion.form>
  );
};

export default SignUp;