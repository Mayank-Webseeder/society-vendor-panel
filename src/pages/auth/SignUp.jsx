import { useState } from 'react';
import { motion } from 'framer-motion';

const SignUp = ({ onSwitch }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Account created! Redirecting to onboarding...');
      setLoading(false);
      onSwitch();
    }, 2000);
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
        <p className="text-xl text-blue-600 font-semibold mt-4">Creating your account...</p>
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
        className="text-3xl font-normal text-black/70 text-center mb-8"
        style={{fontFamily:"Loto"}}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Join Velra Today!
      </motion.h2>

      <motion.div variants={inputVariants}>
        <label htmlFor="fullname" className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
        <input
          type="text"
          id="fullname"
          placeholder="John Doe"
          className="w-full px-4 py-2.5 border-solid border border-gray-300 rounded-lg placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     text-gray-800 transition-all duration-200 text-base"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </motion.div>

      <motion.div variants={inputVariants}>
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
        />
      </motion.div>

      <motion.div variants={inputVariants}>
        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="w-full px-4 py-2.5 border-solid border border-gray-300 rounded-lg placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     text-gray-800 transition-all duration-200 text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </motion.div>

      <motion.div className="flex items-center text-sm" variants={inputVariants}>
        <input
          type="checkbox"
          id="remember"
          className="form-checkbox h-4 w-4 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="remember" className="ml-2 text-gray-600 cursor-pointer">
          Remember Me
        </label>
      </motion.div>

      <motion.button
        type="submit"
        className="w-full bg-blue-600 border-none text-lg text-white font-bold py-2 rounded-lg shadow-lg hover:bg-blue-700 cursor-pointer
                   transition-all duration-300 transform hover:scale-[1.01] active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        variants={inputVariants}
      >
        Sign Up
      </motion.button>

      <motion.p className="text-center text-gray-600 text-sm mt-4" variants={inputVariants}>
        Already have an account?{' '}
        <motion.button
          type="button"
          className="text-blue-600 text-base bg-transparent pl-1 border-none hover:text-blue-800 font-medium cursor-pointer transition-colors duration-200"
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