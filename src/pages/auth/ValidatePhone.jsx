import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateContactNumber, signupVendor, sendOtpContactVerification } from '../../services/api/auth';
import { ArrowLeft, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';

const ValidatePhone = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { fullName, email, contactNumber, password } = location.state || {};

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Redirect if no data
  useEffect(() => {
    if (!fullName || !email || !contactNumber || !password) {
      navigate('/auth');
    }
  }, [fullName, email, contactNumber, password, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleValidate = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Validate Contact Number with OTP
      console.log('Validating contact number OTP:', otp);
      const contactValidationResult = await validateContactNumber(contactNumber, otp);
      console.log('✅ Contact number validated successfully:', contactValidationResult);

      // Step 2: Create account (now using the validated contact number)
      const signupResult = await signupVendor(fullName, contactNumber, password);
      console.log('✅ Signup successful:', signupResult);

      // Store auth token and user data
      if (signupResult.authToken) {
        localStorage.setItem('authToken', signupResult.authToken);
      }

      // Success - redirect to dashboard or onboarding
      navigate('/dashboard');

    } catch (error) {
      console.error('❌ Validation or Signup failed:', error);
      setError(error.message || 'Validation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setResendLoading(true);
    setError('');

    try {
      await sendOtpContactVerification(contactNumber);
      setResendCooldown(60);
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
      successMsg.textContent = 'OTP sent to your phone!';
      document.body.appendChild(successMsg);
      setTimeout(() => document.body.removeChild(successMsg), 3000);
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
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
    <div className="min-h-screen overflow-y-hidden flex flex-col md:flex-row font-inter overflow-hidden relative">
      {/* Background layers: white background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ x: 0 }}
        style={{
          background: '#ffffff'
        }}
      />

      {/* Left: Image Section with Looping Animation */}
      <motion.div
        className="relative hidden md:flex md:w-3/5 min-h-screen bg-cover bg-center overflow-hidden"
        variants={imagePanelVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Image Container */}
        {/* <div className="absolute inset-0">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              animate={{
                opacity: index === currentImageIndex ? 1 : 0,
                scale: index === currentImageIndex ? 1 : 1.05,
              }}
              transition={{
                opacity: { duration: 0.8, ease: "easeInOut" },
                scale: { duration: 1.2, ease: "easeInOut" }
              }}
            />
          ))}
        </div> */}

        {/* Dark overlay with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/80 via-[#0b1120]/40 to-transparent"></div>

        {/* Enhanced Tagline */}
        <motion.div
          className='absolute inset-0 flex flex-col items-center justify-center z-20 p-8'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-center space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight drop-shadow-2xl">
                You bring the
              </span>
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent leading-tight drop-shadow-2xl ml-2">
                expertise
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight drop-shadow-2xl">
                We bring the
              </span>
              <span className="font-bold text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent leading-tight drop-shadow-2xl ml-2">
                exposure
              </span>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.5, ease: "backOut" }}
            className="mt-6 flex items-center space-x-4"
          >
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* Image Indicators */}
        {/* <div className="absolute bottom-6 left-6 z-20 flex space-x-2">
          {images.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              animate={{
                scale: index === currentImageIndex ? 1.2 : 1,
                opacity: index === currentImageIndex ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div> */}
      </motion.div>

      {/* Right: Form Section */}
      <motion.div
        className="relative flex flex-col justify-center items-center gap-24 p-6 md:px-12
                   flex-1 md:w-2/5 min-h-screen z-10"
        variants={formPanelVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Professional grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Subtle geometric accent */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full z-0"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
            transform: 'skewX(15deg)',
            transformOrigin: 'top'
          }}
        ></div>

        {/* Professional corner accents */}
        <div
          className="absolute top-0 right-0 w-48 h-48 z-0"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(50%, -50%)'
          }}
        ></div>

        <div
          className="absolute bottom-0 left-0 w-72 h-72 z-0"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(-50%, 50%)'
          }}
        ></div>

        {/* Logo & Title */}
        <div className='flex flex-col items-center text-center z-10'>
          <Typography
            variant="h2"
            className="text-blue-500"
            sx={{
              display: "inline",
              fontWeight: "700",
              color: "#2c4999",
              fontSize: { xs: "2.25rem", sm: "3rem", md: "3.25rem", lg: "3.5rem" },
              fontFamily: "Roboto, sans-serif",
              letterSpacing: { xs: "0.01em", sm: "0.02em" },
              textAlign: "center",
              textShadow: {
                xs: "0 1px 2px rgba(0,0,0,0.2)",
                sm: "0 2px 4px rgba(0, 0, 0, 0.3)",
              },
              position: "relative",
              mb: { xs: 0.5, sm: 1 },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-6px",
                left: "50%",
                transform: "translateX(-50%)",
                width: '60%',
                height: "3px",
                background: "linear-gradient(90deg, #7eade6, #2c4999)",
                borderRadius: "1px",
              },
            }}
          >
            My Society Needs
          </Typography>
          {
            !loading &&
            <motion.p
              className="text-base text-center text-slate-600 mt-2"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ fontFamily: "Roboto" }}
            >
              Your gateway to professional opportunities.
            </motion.p>
          }
        </div>

        {/* OTP Validation Form */}
        <div className="w-full max-w-md px-4 z-10">
          <div className="rounded-2xl bg-white/95 backdrop-blur-sm border-solid border border-slate-300 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] p-5 sm:p-6">
            {loading ? (
              <motion.div
                key="loading"
                className="flex flex-col items-center justify-center py-12"
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
                <p className="text-lg text-blue-300 font-semibold mt-2">Validating OTP...</p>
              </motion.div>
            ) : (
              <>
                <motion.h2
                  className="text-xl sm:text-2xl font-semibold text-slate-800 text-center mb-6"
                  style={{ fontFamily: "Lato" }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  Validate Email
                </motion.h2>

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

                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <label htmlFor="otp" className="block text-slate-700 text-sm font-medium mb-2">Enter OTP</label>
                    <input
                      type="text"
                      id="otp"
                      placeholder="123456"
                      className="w-full px-4 py-2.5 border-solid border border-slate-600/50 rounded-lg placeholder-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                                 text-slate-900 bg-slate-100/90 backdrop-blur-sm transition-all duration-200 text-base shadow-inner"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </motion.div>

                  {/* Message Below Input */}
                  <motion.p
                    className="text-sm text-slate-600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    A One-Time Password (OTP) has been sent to your entered email address. Please verify the OTP and continue with the registration process.
                  </motion.p>

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
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    Validate OTP
                  </motion.button>
                </motion.form>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ValidatePhone;