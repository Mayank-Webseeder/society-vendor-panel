import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { loginVendor, checkSubscriptionStatus, getVendorDashboard } from '../../services/api/auth';
import { useUser } from '../../UserContext';
import defaultUser from '../../DefaultUser';

const TEST_CONTACT = import.meta.env.VITE_TEST_CONTACT;
const TEST_PASSWORD = import.meta.env.VITE_TEST_PASSWORD;

const Login = ({ onSwitch, onLogin }) => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check for test credentials
    if (contactNumber === TEST_CONTACT && password === TEST_PASSWORD) {
      console.log('✅ Logged in with test credentials');
      // Set testMode to true in defaultUser and store it in localStorage
      const testUser = { ...defaultUser, testMode: true, subscription_active: true };
      localStorage.setItem('mysocietyneeds_user', JSON.stringify(testUser));
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
    if (!contactNumber.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setError('');

    try {
      // Call the loginVendor API (API 2)
      const result = await loginVendor(contactNumber.trim(), password.trim());
      console.log('✅ Login successful:', result);
      // Store the authToken in localStorage
      localStorage.setItem('authToken', result.authToken);

      // Fetch subscription status after login
      try {
        const res = await checkSubscriptionStatus();
        localStorage.setItem('subscription_active', res.active ? 'true' : 'false');
        localStorage.setItem('subscription_validTill', res.validTill || '');
        localStorage.setItem('subscription_referenceId', res.referenceId || '');
      } catch (err) {
        localStorage.setItem('subscription_active', 'false');
        localStorage.setItem('subscription_validTill', '');
        localStorage.setItem('subscription_referenceId', '');
      }

      // Fetch dashboard details after login
      try {
        const dashboard = await getVendorDashboard();
        // Update user context and localStorage with dashboard user info
        if (dashboard.user) {
          setUser(dashboard.user); // This will merge with DefaultUser via safeSetUser
        }
        localStorage.setItem('user_dashboard', JSON.stringify(dashboard));
      } catch (err) {
        localStorage.removeItem('user_dashboard');
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
        className="text-2xl sm:text-2xl font-semibold text-slate-800 text-center mb-6"
        style={{ fontFamily: "Lato" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Welcome Back!
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
        <label htmlFor="contactNumber" className="block text-slate-700 text-sm font-medium mb-2">Contact Number</label>
        <input
          type="tel"
          id="contactNumber"
          placeholder="+91 98765 43210"
          className="w-full px-4 py-2.5 border-solid border border-slate-600/50 rounded-lg placeholder-slate-400
           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
           text-slate-900 bg-slate-100/90 backdrop-blur-sm transition-all duration-200 text-base shadow-inner"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
      </motion.div>

      <motion.div variants={inputVariants}>
        <label htmlFor="password" className="block text-slate-700 text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="w-full px-4 py-2.5 border-solid border border-slate-600/50 rounded-lg placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                     text-slate-900 bg-slate-100/90 backdrop-blur-sm transition-all duration-200 text-base shadow-inner"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </motion.div>

      <motion.div className="flex justify-start items-center text-sm" variants={inputVariants}>
        <motion.button
          type="button"
          className="text-blue-600 hover:text-blue-800 border-none bg-transparent font-medium cursor-pointer transition-colors duration-200"
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
       transition-all duration-300 transform hover:scale-[1.02] active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-0"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
          boxShadow: '0 4px 12px rgba(59,130,246,0.2)'
        }}
        whileHover={{
          y: -2,
          boxShadow: '0 4px 16px rgba(59,130,246,0.25)',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
          transition: {
            type: "tween",
            duration: 0.15,
          }
        }}
        whileTap={{ scale: 0.98 }}
        variants={inputVariants}
      >
        Log In
      </motion.button>

      <motion.p className="text-center text-slate-700 text-sm font-medium mt-4" variants={inputVariants}>
        Don't have an account?{' '}
        <motion.button
          type="button"
          className="text-blue-600 text-base bg-transparent pl-1 border-none hover:text-blue-800 font-medium cursor-pointer transition-colors duration-300"
          onClick={onSwitch}
          whileHover={{
            scale: 1.05,
            color: '#1d4ed8'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>
      </motion.p>
    </motion.form>
  );
};

export default Login;
