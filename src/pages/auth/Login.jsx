import { useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ onSwitch, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "demo@velra.com" && password === "velra123") {
      if (onLogin) onLogin();
    } else {
      alert("Invalid email or password. Please try 'demo@velra.com' and 'velra123'.");
    }
  };

  const inputVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.form
      onSubmit={handleLogin}
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
        Welcome Back!
      </motion.h2>

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

      <motion.div className="flex justify-between items-center text-sm" variants={inputVariants}>
        <div className="flex items-center">
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
        </div>
        <motion.button
          type="button"
          className="text-blue-600 hover:text-blue-800 border-none bg-gray-100 font-medium cursor-pointer transition-colors duration-200"
          onClick={() => alert('Forgot Password functionality not implemented yet.')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Forgot Password?
        </motion.button>
      </motion.div>

      <motion.button
        type="submit"
        className="w-full border-none bg-blue-600 text-lg text-white font-bold py-2 rounded-lg shadow-lg hover:bg-blue-700 cursor-pointer
                   transition-all duration-300 transform hover:scale-[1.01] active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        variants={inputVariants}
      >
        Log In
      </motion.button>

      <motion.button
        type="button"
        className="w-full border-solid border-2 border-blue-600 text-lg text-blue-600 font-semibold py-2 rounded-lg bg-white
                   hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.01] active:scale-98 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={onSwitch}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        variants={inputVariants}
      >
        Create New Account
      </motion.button>
    </motion.form>
  );
};

export default Login;