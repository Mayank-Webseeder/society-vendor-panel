import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Immediately set loading to prevent re-animations
    setError('');

    try {
      // Check for test credentials
      if (contactNumber === TEST_CONTACT && password === TEST_PASSWORD) {
        console.log('✅ Logged in with test credentials');
        const testUser = { ...defaultUser, testMode: true, subscription_active: true };
        localStorage.setItem('mysocietyneeds_user', JSON.stringify(testUser));
        setUser(testUser);
        localStorage.setItem('authToken', 'TEST_AUTH_TOKEN');

        if (onLogin) onLogin();

        // Use replace instead of navigate to prevent back navigation
        navigate('/dashboard', { replace: true });
        return;
      }

      // Basic validation
      if (!contactNumber.trim() || !password.trim()) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      const result = await loginVendor(contactNumber.trim(), password.trim());
      console.log('✅ Login successful:', result);
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
        if (dashboard.user) {
          setUser(dashboard.user);
        }
        localStorage.setItem('user_dashboard', JSON.stringify(dashboard));
      } catch (err) {
        localStorage.removeItem('user_dashboard');
      }

      if (onLogin) onLogin();

      // Use replace instead of navigate to prevent back navigation
      navigate('/dashboard', { replace: true });

    } catch (error) {
      console.error('❌ Login failed:', error);
      setError(error.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  // Loading state with immediate visual feedback
  if (loading) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex space-x-2 mb-3">
          <motion.span
            className="block w-4 h-4 bg-blue-500 rounded-full"
            animate={{ y: [-15, 0, -15] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
          />
          <motion.span
            className="block w-4 h-4 bg-blue-500 rounded-full"
            animate={{ y: [-15, 0, -15] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.15 }}
          />
          <motion.span
            className="block w-4 h-4 bg-blue-500 rounded-full"
            animate={{ y: [-15, 0, -15] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.3 }}
          />
        </div>
        <p className="text-xl text-slate-600 font-semibold mt-4">Logging you in...</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <h2
        className="text-2xl sm:text-2xl font-semibold text-slate-800 text-center mb-6"
        style={{ fontFamily: "Lato" }}
      >
        Welcome Back!
      </h2>

      {/* Error Message */}
      {error && (
        <motion.div
          className="bg-red-50 border-solid border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}

      {/* Contact Number - Fixed Height Container */}
      <div style={{ minHeight: '88px' }}>
        <label htmlFor="contactNumber" className="block text-slate-700 text-sm font-medium mb-2">
          Contact Number
        </label>
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
          disabled={loading}
        />
      </div>

      {/* Password - Fixed Height Container */}
      <div style={{ minHeight: '88px' }}>
        <label htmlFor="password" className="block text-slate-700 text-sm font-medium mb-2">
          Password
        </label>
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
          disabled={loading}
        />
      </div>

      {/* Forgot Password - Fixed Height Container */}
      <div className="flex justify-start items-center text-sm" style={{ minHeight: '24px' }}>
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 border-none bg-transparent font-medium cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => navigate('/auth/forgot-password')}
          disabled={loading}
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Button - Fixed Height */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full border-none text-lg font-bold py-3 rounded-lg shadow-lg cursor-pointer
                   transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400
                   ${loading
            ? 'bg-slate-400 cursor-not-allowed text-slate-200'
            : 'text-white hover:opacity-90'}`}
        style={{
          background: loading
            ? '#94a3b8'
            : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
          boxShadow: loading ? 'none' : '0 4px 12px rgba(59,130,246,0.2)',
          minHeight: '48px'
        }}
      >
        {loading ? 'Logging In...' : 'Log In'}
      </button>

      {/* Switch to Sign Up - Fixed Height */}
      <p className="text-center text-slate-700 text-sm font-medium mt-4" style={{ minHeight: '24px' }}>
        Don't have an account?{' '}
        <button
          type="button"
          className="text-blue-600 text-base bg-transparent pl-1 border-none hover:text-blue-800 font-medium cursor-pointer transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSwitch}
          disabled={loading}
        >
          Sign Up
        </button>
      </p>
    </form>
  );
};

export default Login;
