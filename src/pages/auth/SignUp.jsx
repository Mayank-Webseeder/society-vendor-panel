import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sendOtpContactVerification, validateContactNumber, signupVendor } from '../../services/api/auth';
import { Eye, EyeOff, Phone, X, CheckCircle } from 'lucide-react';

const SignUp = ({ onSwitch }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Phone verification states
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [phoneVerified, setPhoneVerified] = useState(false);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handlePhoneVerification = async () => {
    // Basic phone validation
    if (!contactNumber.trim()) {
      setError('Please enter your phone number first');
      return;
    }

    if (contactNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log("📱 Sending OTP to contact number: ", contactNumber.trim());
      const result = await sendOtpContactVerification(contactNumber.trim());
      console.log('✅ OTP sent successfully:', result);

      setShowPhoneVerification(true);
      setResendCooldown(60);
    } catch (error) {
      console.error('❌ Failed to send OTP:', error);
      setError(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpValidation = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setOtpError('Please enter the OTP');
      return;
    }

    if (otp.length !== 4) {
      setOtpError('OTP must be 4 digits');
      return;
    }

    setOtpLoading(true);
    setOtpError('');

    try {
      console.log('🔍 Validating OTP with data:', {
        contactNumber: contactNumber.trim(),
        otp: otp.trim()
      });

      const result = await validateContactNumber(contactNumber.trim(), otp.trim());
      console.log('✅ Phone verification successful:', result);

      setPhoneVerified(true);
      setShowPhoneVerification(false);
      setOtp('');

      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
      successMsg.textContent = 'Phone number verified successfully!';
      document.body.appendChild(successMsg);
      setTimeout(() => {
        if (document.body.contains(successMsg)) {
          document.body.removeChild(successMsg);
        }
      }, 3000);

    } catch (error) {
      console.error('❌ OTP validation failed:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setOtpError(error.response?.data?.message || error.message || 'Invalid OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setResendLoading(true);
    setOtpError('');

    try {
      console.log("🔄 Resending OTP to:", contactNumber.trim());
      await sendOtpContactVerification(contactNumber.trim());
      setResendCooldown(60);

      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
      successMsg.textContent = 'New OTP sent to your phone!';
      document.body.appendChild(successMsg);
      setTimeout(() => {
        if (document.body.contains(successMsg)) {
          document.body.removeChild(successMsg);
        }
      }, 3000);
    } catch (error) {
      console.error('❌ Failed to resend OTP:', error);
      setOtpError('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleFinalSignup = async (e) => {
    e.preventDefault();

    // Ensure phone is verified
    if (!phoneVerified) {
      setError('Please verify your phone number first');
      return;
    }

    // Basic validation
    if (!fullName.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('🚀 Creating vendor account with data:', {
        name: fullName.trim(),
        contactNumber: contactNumber.trim(),
        // Don't log password for security
      });

      const signupResult = await signupVendor(fullName.trim(), contactNumber.trim(), password);
      console.log('✅ Signup successful:', signupResult);

      // Auth token should already be stored by the API function
      // Navigate to dashboard
      navigate('/auth/onboarding');

    } catch (error) {
      console.error('❌ Signup failed:', error);
      console.error('Signup error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError(error.response?.data?.message || error.message || 'Signup failed. Please try again.');
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="flex space-x-2 mb-3">
          <motion.span
            className="block w-4 h-4 bg-blue-500 rounded-full"
            variants={dotVariants}
            initial="start"
            animate="end"
            transition={dotTransition}
          />
          <motion.span
            className="block w-4 h-4 bg-blue-500 rounded-full"
            variants={dotVariants}
            initial="start"
            animate="end"
            transition={{ ...dotTransition, delay: 0.15 }}
          />
          <motion.span
            className="block w-4 h-4 bg-blue-500 rounded-full"
            variants={dotVariants}
            initial="start"
            animate="end"
            transition={{ ...dotTransition, delay: 0.3 }}
          />
        </div>
        <p className="text-xl text-slate-600 font-semibold mt-4">Processing...</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleFinalSignup} className="space-y-6">
        <h2
          className="text-2xl sm:text-2xl font-semibold text-slate-800 text-center mb-6"
          style={{ fontFamily: "Lato" }}
        >
          Join Today!
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-solid border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div style={{ minHeight: '88px' }}>
          <label htmlFor="fullname" className="block text-slate-700 text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            placeholder="John Doe"
            className="w-full px-4 py-2.5 border-solid border border-slate-600/50 rounded-lg placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                       text-slate-900 bg-slate-100/90 backdrop-blur-sm transition-all duration-200 text-base shadow-inner"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Contact Number with Verification */}
        <div style={{ minHeight: '88px' }}>
          <label htmlFor="contactNumber" className="block text-slate-700 text-sm font-medium mb-2">
            Contact Number
          </label>
          <div className="flex gap-2">
            <input
              type="tel"
              id="contactNumber"
              placeholder="+91 98765 43210"
              className={`flex-1 px-4 py-2.5 border-solid border rounded-lg placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                         text-slate-900 bg-slate-100/90 backdrop-blur-sm transition-all duration-200 text-base shadow-inner
                         ${phoneVerified ? 'border-green-500 bg-green-50' : 'border-slate-600/50'}`}
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value);
                if (phoneVerified) setPhoneVerified(false); // Reset verification if number changes
              }}
              required
              disabled={phoneVerified}
            />
            <button
              type="button"
              onClick={handlePhoneVerification}
              disabled={phoneVerified}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 border-none cursor-pointer
                         ${phoneVerified
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              {phoneVerified ? <CheckCircle size={20} /> : <Phone size={20} />}
            </button>
          </div>
          {phoneVerified && (
            <p className="text-green-600 text-sm mt-1 font-medium">✓ Phone number verified</p>
          )}
        </div>

        {/* Password */}
        <div style={{ minHeight: '88px' }}>
          <label htmlFor="password" className="block text-slate-700 text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 pr-12 border-solid border border-slate-600/50 rounded-lg placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                         text-slate-900 bg-slate-100/90 backdrop-blur-sm transition-all duration-200 text-base shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 border-none flex items-center bg-transparent text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!phoneVerified}
          className={`w-full border-none text-lg font-bold py-3 rounded-lg shadow-lg cursor-pointer
                     transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400
                     ${phoneVerified
              ? 'text-white hover:opacity-90'
              : 'text-slate-400 bg-slate-300 cursor-not-allowed'}`}
          style={{
            background: phoneVerified
              ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)'
              : '#e2e8f0',
            boxShadow: phoneVerified ? '0 4px 12px rgba(59,130,246,0.2)' : 'none',
            minHeight: '48px'
          }}
        >
          {phoneVerified ? 'Create Account' : 'Verify Phone Number First'}
        </button>

        {/* Switch to Login */}
        <p className="text-center text-slate-700 text-sm font-medium mt-4" style={{ minHeight: '24px' }}>
          Already have an account?{' '}
          <button
            type="button"
            className="text-blue-600 text-base bg-transparent pl-1 border-none hover:text-blue-800 font-medium cursor-pointer transition-colors duration-300"
            onClick={onSwitch}
          >
            Log In
          </button>
        </p>
      </form>

      {/* Phone Verification Modal */}
      <AnimatePresence>
        {showPhoneVerification && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowPhoneVerification(false);
                  setOtp('');
                  setOtpError('');
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Verify Phone Number</h3>
                <p className="text-slate-600 text-sm">
                  We've sent a 4-digit OTP to <br />
                  <span className="font-medium">{contactNumber}</span>
                </p>
              </div>

              {otpLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="flex space-x-2 mb-3">
                    <motion.span
                      className="block w-3 h-3 bg-blue-400 rounded-full"
                      variants={dotVariants}
                      initial="start"
                      animate="end"
                      transition={dotTransition}
                    />
                    <motion.span
                      className="block w-3 h-3 bg-blue-400 rounded-full"
                      variants={dotVariants}
                      initial="start"
                      animate="end"
                      transition={{ ...dotTransition, delay: 0.15 }}
                    />
                    <motion.span
                      className="block w-3 h-3 bg-blue-400 rounded-full"
                      variants={dotVariants}
                      initial="start"
                      animate="end"
                      transition={{ ...dotTransition, delay: 0.3 }}
                    />
                  </div>
                  <p className="text-blue-600 font-medium">Verifying OTP...</p>
                </div>
              ) : (
                <form onSubmit={handleOtpValidation} className="space-y-4">
                  {/* Error Message */}
                  {otpError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {otpError}
                    </div>
                  )}

                  {/* OTP Input */}
                  <div>
                    <label htmlFor="otp" className="block text-slate-700 text-sm font-medium mb-2">
                      Enter 4-digit OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      placeholder="1234"
                      maxLength="6"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg text-center text-lg tracking-widest
                                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      required
                      autoFocus
                    />
                  </div>

                  {/* Verify Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700
                               transition-colors duration-200 border-none cursor-pointer"
                  >
                    Verify OTP
                  </button>

                  {/* Resend OTP */}
                  <div className="text-center">
                    {resendCooldown > 0 ? (
                      <p className="text-slate-500 text-sm">
                        Resend OTP in {resendCooldown}s
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={resendLoading}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium bg-transparent border-none cursor-pointer"
                      >
                        {resendLoading ? 'Sending...' : 'Resend OTP'}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SignUp;
