import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { loginVendor, checkSubscriptionStatus, getVendorDashboard } from '../../services/api/auth';
import { useUser } from '../../UserContext';
import defaultUser from '../../DefaultUser';


const TEST_EMAIL = import.meta.env.VITE_TEST_EMAIL;
const TEST_PASSWORD = import.meta.env.VITE_TEST_PASSWORD;


const Login = ({ onSwitch, onLogin }) => {

  const navigate = useNavigate();
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); 


  const handleLogin = async(e) => {
    e.preventDefault();

    // Check for test credentials
    if (email === TEST_EMAIL && password === TEST_PASSWORD) {
      console.log('✅ Logged in with test credentials');
      // Set testMode to true in defaultUser and store it in localStorage
      const testUser = { ...defaultUser, testMode: true };
      localStorage.setItem('velra_user', JSON.stringify(testUser));
      // Update the user context immediately
      setUser(testUser);
      // Store a mock token for test login
      localStorage.setItem('authToken', 'TEST_AUTH_TOKEN');

      if (onLogin) onLogin();
      navigate('/dashboard');
      return;
    }


    // Normal API call for login
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setError('');

    try {
      // Call the loginVendor API (API 2)
      const result = await loginVendor(email.trim(), password.trim());
      console.log('✅ Login successful:', result);
      // Store the authToken in localStorage
      localStorage.setItem('authToken', result.authToken);


      // Fetch subscription status after login
      try {
        const res = await checkSubscriptionStatus();
        localStorage.setItem('velra_subscription_active', res.active ? 'true' : 'false');
        localStorage.setItem('velra_subscription_validTill', res.validTill || '');
        localStorage.setItem('velra_subscription_referenceId', res.referenceId || '');
      } catch (err) {
        localStorage.setItem('velra_subscription_active', 'false');
        localStorage.setItem('velra_subscription_validTill', '');
        localStorage.setItem('velra_subscription_referenceId', '');
      }


      // Fetch dashboard details after login
      try {
        const dashboard = await getVendorDashboard();
        // Update user context and localStorage with dashboard user info
        if (dashboard.user) {
          setUser(dashboard.user); // This will merge with DefaultUser via safeSetUser
        }
        localStorage.setItem('velra_dashboard', JSON.stringify(dashboard));
      } catch (err) {
        localStorage.removeItem('velra_dashboard');
      }


      // Trigger the onLogin callback
      if (onLogin) onLogin();

      // Navigate to the dashboard or home page
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ Login failed:', error);
      setError(error.message || 'Login failed. Please try again.');
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
        className="text-3xl font-normal text-white text-center mb-8"
        style={{ fontFamily:"Loto" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Welcome Back!
      </motion.h2>

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

      <motion.div variants={inputVariants}>
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
        />
      </motion.div>

      <motion.div variants={inputVariants}>
        <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="w-full px-4 py-2.5 border-solid border border-gray-300 rounded-lg placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                     text-gray-800 bg-white/90 backdrop-blur transition-all duration-200 text-base"
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
            className="form-checkbox h-4 w-4 text-blue-400 rounded-md border-gray-300 focus:ring-blue-400 cursor-pointer"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember" className="ml-2 text-white/80 cursor-pointer">
            Remember Me
          </label>
        </div>
        <motion.button
          type="button"
          className="text-blue-300 hover:text-blue-100 border-none bg-transparent font-medium cursor-pointer transition-colors duration-200"
          onClick={() => navigate('/auth/forgot-password')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Forgot Password?
        </motion.button>
      </motion.div>

      <motion.button
        type="submit"
        className="w-full border-none text-lg text-white font-bold py-3 rounded-lg shadow-lg cursor-pointer
                   transition-all duration-300 transform hover:scale-[1.02] active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          boxShadow: '0 4px 15px rgba(59,130,246,0.3)'
        }}
        whileHover={{ 
          y: -2,
          boxShadow: '0 6px 25px rgba(59,130,246,0.4)'
        }}
        whileTap={{ scale: 0.98 }}
        variants={inputVariants}
      >
        Log In
      </motion.button>

      <motion.button
        type="button"
        className="w-full border-2 border-solid text-lg font-semibold py-3 rounded-lg
                   transition-all duration-300 transform hover:scale-[1.02] active:scale-98 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        style={{
          borderColor: 'rgba(255,255,255,0.3)',
          color: 'white',
          backgroundColor: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}
        onClick={onSwitch}
        whileHover={{ 
          y: -2,
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderColor: 'rgba(255,255,255,0.5)',
          boxShadow: '0 4px 20px rgba(59,130,246,0.2)'
        }}
        whileTap={{ scale: 0.98 }}
        variants={inputVariants}
      >
        Create New Account
      </motion.button>
    </motion.form>
  );
};


export default Login;