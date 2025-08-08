import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, CircularProgress, Fade, Slide } from '@mui/material';
import { CheckCircle, Timer, Refresh } from '@mui/icons-material';
import { FaPhone } from "react-icons/fa6";
import verifyNumber from '../../assets/verifyNumber.png';
import { useAuth } from '../../AuthContext';
import { useOnBoarding } from './OnboardingContext';
import { useUser } from '../../UserContext';
import { createProfile } from '../../services/api/auth';


const RESEND_TIME = 59;
const TEST_OTP = import.meta.env.VITE_TEST_OTP;


const Step8_VerifyOtp = () => {

  const { login } = useAuth();
  const { setUser } = useUser();
  const { onboardingData, updateOnboardingData } = useOnBoarding();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(RESEND_TIME);
  const [isTiming, setIsTiming] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const timerRef = useRef(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isTiming && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(timerRef.current);
      setIsTiming(false);
    }
    return () => clearInterval(timerRef.current);
  }, [isTiming, timer]);

  const handleOtpChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (value.length === 0) {
      setOtp([...otp.map((d, idx) => (idx === index ? '' : d))]);
      return;
    }
    setOtp(prev => prev.map((d, idx) => (idx === index ? value[0] : d)));
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendCode = () => {
    setTimer(RESEND_TIME);
    setIsTiming(true);
    setError('');
    console.log("Resending OTP...");
  };

  const formatTimer = (t) => `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, '0')}`;

  
  const handleContinue = async () => {
    const enteredOtp = otp.join('');

    // Check if the entered OTP matches the test OTP
    if (enteredOtp === TEST_OTP) {
      console.log('✅ Test OTP entered. Logging in as test user.');

      // Set testMode to true in onboardingData and store it in localStorage
      const testUser = { ...onboardingData, testMode: true };
      localStorage.setItem('velra_user', JSON.stringify(testUser));

      // Update the user context immediately
      setUser(testUser);

      // Log in the user and redirect to the dashboard
      login();
      navigate('/dashboard');
      return;
    }

    // If not the test OTP, proceed with API call
    setError('');
    setVerifying(true);

    // Prepare form data for API call
    const formData = new FormData();
    formData.append('name', onboardingData.name);
    formData.append('businessName', onboardingData.businessName);
    formData.append('address', onboardingData.address);
    formData.append('services', JSON.stringify(onboardingData.whatYouOffer)); // Convert array to JSON string
    formData.append('workingDays', JSON.stringify(onboardingData.workingDays)); // Convert array to JSON string
    formData.append('workingHours', onboardingData.workingHours);
    formData.append('payScale', onboardingData.payscale);
    formData.append('location', onboardingData.locationCoordinates);
    formData.append('paymentMethods', onboardingData.preferredPaymentMethod);
    formData.append('lastPayments', onboardingData.lastPayments);
    formData.append('experience', onboardingData.workExperience);
    formData.append('phone', onboardingData.phone);
    if (onboardingData.idProofFile) {
      formData.append('idProof', onboardingData.idProofFile); // Attach file
    }

    try {
      // Make API 5 call to createProfile
      const response = await createProfile(formData);

      // If successful, update local storage and context
      localStorage.setItem('velra_user', JSON.stringify(onboardingData));
      setUser(onboardingData);
      setSuccess(true);

      setTimeout(() => {
        setVerifying(false);
        login(); // Log in the user
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setError('Failed to create profile. Please try again.');
      console.error('Error creating profile:', error);
      setVerifying(false);
    }
  };


  return (
    <div style={{ position: 'relative', width: '80%', height: '80%' }}>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          borderRadius: '16px',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          border: 'none',
          boxShadow: 'none',
          // Hide scrollbar for webkit browsers (Chrome, Safari, Edge)
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          // Hide scrollbar for Firefox
          scrollbarWidth: 'none',
          // Alternative for older browsers
          msOverflowStyle: 'none',
          '@media (max-width:1150px)': {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          },
        }}
      >
        {/* Debugging Purposes */}
        {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        {/* Left Half: Form Content */}
        <Box
          sx={{
            // border: '2px solid red',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            position: 'relative',
            minWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 3, sm: 4 },
            height: '100%',
            backgroundColor: '#ffffff',
            '@media (max-width:1200px)': {
              width: '100%',
              alignItems: 'center',
              flex: 'unset',
              minWidth: 0,
            },
            '@media (min-width:1201px)': {
              alignItems: 'center',
              justifyContent: 'center',
              width: '60%',
            },
          }}
        >
          {/* Subtle background patterns */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(86, 169, 217, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(86, 169, 217, 0.03) 0%, transparent 50%)
              `,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          {/* Decorative corner accents */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(86, 169, 217, 0.08) 0%, transparent 70%)',
              transform: 'translate(50%, -50%)',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(86, 169, 217, 0.06) 0%, transparent 70%)',
              transform: 'translate(-50%, 50%)',
              zIndex: 0,
            }}
          />

          <Fade in timeout={1000}>
            <div
              style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative', 
                minWidth: 0,
                width: '100%',
                zIndex: 1,
                textAlign: 'center',
                minHeight: '100%',
              }}
              className='w-full h-full rounded-xl flex flex-col'
            >
              {/* Top Section - Hero */}
              <Box sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
                {/* Main Title */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #56A9D9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
                    fontFamily: 'Roboto, sans-serif',
                    letterSpacing: '0.02em',
                    textAlign: 'center',
                    mb: 1.5,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '50%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #56A9D9, #1e3a8a)',
                      borderRadius: '1px',
                    },
                  }}
                >
                  Verify OTP
                </Typography>

                {/* Subtitle */}
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(30, 58, 138, 0.7)',
                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                    fontWeight: '400',
                    textAlign: 'center',
                    mb: 2,
                    fontFamily: 'Roboto, sans-serif',
                  }}
                >
                  We've sent a secure 4-digit code to{' '}
                  <Box component="span" sx={{ fontWeight: 600, color: 'rgba(30, 58, 138, 0.9)' }}>
                    +91 XXXXX 12345
                  </Box>
                </Typography>

                {/* Decorative Icon */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 24px rgba(86, 169, 217, 0.3)',
                      animation: 'float 3s ease-in-out infinite',
                      '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-8px)' },
                      },
                    }}
                  >
                    <FaPhone size={30} color="white" />
                  </Box>
                </Box>
              </Box>

              {/* Middle Section - Form Content */}
              <div className="flex flex-col w-full items-center max-w-lg flex-1">
                {/* OTP Input Fields */}
                <Slide in direction="up" timeout={600}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: { xs: 1.5, sm: 2 },
                      mb: 4,
                      justifyContent: 'center',
                    }}
                  >
                    {otp.map((data, index) => (
                      <TextField
                        key={index}
                        inputRef={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]"
                        value={data}
                        onChange={(e) => handleOtpChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        variant="outlined"
                        inputProps={{
                          maxLength: 1,
                          style: { textAlign: 'center' }
                        }}
                        sx={{
                          width: { xs: '55px', sm: '64px' },
                          height: { xs: '55px', sm: '64px' },
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid transparent',
                            backgroundClip: 'padding-box',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '& fieldset': { 
                              border: '2px solid #e2e8f0',
                              borderRadius: '16px',
                            },
                            '&:hover fieldset': { 
                              borderColor: '#56A9D9',
                              boxShadow: '0 4px 12px rgba(86, 169, 217, 0.15)',
                            },
                            '&.Mui-focused fieldset': { 
                              borderColor: '#56A9D9',
                              boxShadow: '0 8px 25px rgba(86, 169, 217, 0.25)',
                            },
                            '&.Mui-focused': {
                              transform: 'translateY(-2px)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            textAlign: 'center',
                            color: '#1e293b',
                            fontSize: { xs: '1.4rem', sm: '1.6rem' },
                            fontWeight: 600,
                            py: 0,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Slide>

                {/* Timer Section */}
                <Fade in timeout={1000}>
                  <Box sx={{ mb: 4, textAlign: 'center' }}>
                    {/* Resend Timer */}
                    {isTiming ? (
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 3,
                          py: 1.5,
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                          border: '1px solid #e2e8f0',
                          mb: 2,
                        }}
                      >
                        <Timer sx={{ 
                          color: '#64748b', 
                          fontSize: 20 
                        }} />
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#64748b',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                          }}
                        >
                          Resend in {formatTimer(timer)}
                        </Typography>
                      </Box>
                    ) : (
                      // Resend Button
                      <Button
                        variant="text"
                        onClick={handleResendCode}
                        startIcon={<Refresh />}
                        sx={{
                          color: '#56A9D9',
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          px: 2,
                          py: 1,
                          borderRadius: '10px',
                          background: 'rgba(86, 169, 217, 0.1)',
                          '&:hover': {
                            background: 'rgba(86, 169, 217, 0.2)',
                            transform: 'translateY(-1px)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Resend Code
                      </Button>
                    )}
                  </Box>
                </Fade>

                {/* Error Message */}
                {error && (
                  <Fade in>
                    <Box
                      sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                        border: '1px solid #fecaca',
                        textAlign: 'center',
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: '#dc2626', 
                          fontWeight: 500,
                          fontSize: '0.9rem',
                        }}
                      >
                        {error}
                      </Typography>
                    </Box>
                  </Fade>
                )}
              </div>

              {/* Bottom Section - Continue Button */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mt: 4 }}>
                <Fade in timeout={1200}>
                  <Box sx={{ textAlign: 'center' }}>
                    {verifying ? (
                      <Box sx={{ py: 3 }}>
                        {success ? (
                          <Fade in>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <CheckCircle sx={{ color: '#10b981', fontSize: 48, mb: 2 }} />
                              <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 600 }}>
                                Verified Successfully!
                              </Typography>
                            </Box>
                          </Fade>
                        ) : (
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CircularProgress 
                              size={40} 
                              sx={{ 
                                color: '#56A9D9', 
                                mb: 2,
                                '& .MuiCircularProgress-circle': {
                                  strokeLinecap: 'round',
                                },
                              }} 
                            />
                            <Typography variant="body1" sx={{ color: '#56A9D9', fontWeight: 600 }}>
                              Verifying your code...
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleContinue}
                        disabled={otp.some((digit) => digit === '')}
                        sx={{
                          py: 2,
                          px: 5,
                          background: otp.some((digit) => digit === '') 
                            ? 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                            : 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                          color: otp.some((digit) => digit === '') ? '#9ca3af' : 'white',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          borderRadius: '12px',
                          boxShadow: otp.some((digit) => digit === '') 
                            ? 'none'
                            : '0 6px 20px rgba(86, 169, 217, 0.3)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          textTransform: 'none',
                          minWidth: '200px',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            background: otp.some((digit) => digit === '') 
                              ? 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                              : 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)',
                            boxShadow: otp.some((digit) => digit === '') 
                              ? 'none'
                              : '0 8px 28px rgba(86, 169, 217, 0.4)',
                            transform: otp.some((digit) => digit === '') ? 'none' : 'translateY(-2px)',
                          },
                          '&:active': {
                            transform: otp.some((digit) => digit === '') ? 'none' : 'translateY(-1px)',
                          },
                          '&:disabled': {
                            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                            color: '#9ca3af',
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            transition: 'left 0.5s',
                          },
                          '&:hover::before': {
                            left: otp.some((digit) => digit === '') ? '-100%' : '100%',
                          },
                        }}
                      >
                        Continue
                      </Button>
                    )}
                  </Box>
                </Fade>
              </Box>
            </div>
          </Fade>
        </Box>


        {/* Right Half: Pure White Image Section */}
        <Box
          sx={{
            width: '40%',
            flex: 1,
            display: { xs: 'none', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: '#ffffff',
            '@media (max-width:1150px)': {
              display: 'none',
            },
          }}
        >
          <Fade in timeout={1200}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <img
                src={verifyNumber}
                alt="Verify OTP Illustration"
                style={{
                  maxWidth: '85%',
                  height: 'auto',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02) translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1) translateY(0px)';
                }}
              />
            </Box>
          </Fade>
        </Box>
      </Paper>
    </div>
  );
};


export default Step8_VerifyOtp;