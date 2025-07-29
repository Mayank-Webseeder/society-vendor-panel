import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, CircularProgress, Fade, Slide } from '@mui/material';
import { CheckCircle, Phone, Timer, Refresh } from '@mui/icons-material';
import verifyNumber from '../../assets/verifyNumber.png';
import logoWhite from '../../assets/logoWhite.png';
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
      // Make API call to createProfile
      const response = await createProfile(formData);

      // If successful, update local storage and context
      localStorage.setItem('velra_user', JSON.stringify(onboardingData));
      setUser(onboardingData);
      setSuccess(true);

      setTimeout(() => {
        setVerifying(false);
        login(); // Log in the user
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setError('Failed to create profile. Please try again.');
      console.error('Error creating profile:', error);
      setVerifying(false);
    }
  };


  return (
    <div style={{ position: 'relative', width: '80%', height: '80%' }}>
      <div
        style={{
          position: 'absolute',
          top: '-4rem',
          left: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
          overflow: 'visible'
        }}
      >
        <img src={logoWhite} alt="velra-logo" />
        <h3 className="font-semibold text-5xl text-white">VELRA</h3>
      </div>

      <Paper
        elevation={24}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          borderRadius: '24px',
          overflow: 'auto',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >

        {/* Debugging Purposes */}
        {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        {/* Left Half: Enhanced Form Content */}
        <div className='flex-1 flex flex-col p-8 sm:p-12 justify-center items-center relative'>
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // background: `
              //   radial-gradient(circle at 20% 80%, rgba(86, 169, 217, 0.03) 0%, transparent 50%),
              //   radial-gradient(circle at 80% 20%, rgba(86, 169, 217, 0.03) 0%, transparent 50%),
              //   radial-gradient(circle at 40% 40%, rgba(86, 169, 217, 0.02) 0%, transparent 50%)
              // `,
              backgroundColor: 'white',
              zIndex: 0,
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '400px' }}>
            {/* Header with Icon */}
            <Fade in timeout={800}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    mx: 'auto',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #56A9D9 0%, #4A90E2 100%)',
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px rgba(86, 169, 217, 0.3)',
                    // transform: 'rotate(-3deg)',
                  }}
                >
                  <Phone sx={{ color: 'white', fontSize: 36 }} />
                </Box>
                
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                    fontSize: { xs: '1.8rem', sm: '2.2rem' },
                    letterSpacing: '-0.025em',
                  }}
                >
                  Verify Your Number
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#64748b',
                    fontSize: { xs: '0.95rem', sm: '1.05rem' },
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: '320px',
                    mx: 'auto',
                  }}
                >
                  We've sent a secure 4-digit code to{' '}
                  <Box component="span" sx={{ fontWeight: 600, color: '#334155' }}>
                    +91 XXXXX 12345
                  </Box>
                </Typography>
              </Box>
            </Fade>

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

            {/* Continue Button or Verification Animation */}
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
                      px: 6,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '16px',
                      textTransform: 'none',
                      background: otp.some((digit) => digit === '') 
                        ? 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'
                        : 'linear-gradient(135deg, #56A9D9 0%, #4A90E2 100%)',
                      color: otp.some((digit) => digit === '') ? '#94a3b8' : 'white',
                      boxShadow: otp.some((digit) => digit === '') 
                        ? 'none'
                        : '0 8px 32px rgba(86, 169, 217, 0.4)',
                      border: 'none',
                      minWidth: '200px',
                      '&:hover': {
                        background: otp.some((digit) => digit === '') 
                          ? 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'
                          : 'linear-gradient(135deg, #4A90E2 0%, #3b82f6 100%)',
                        transform: otp.some((digit) => digit === '') ? 'none' : 'translateY(-2px)',
                        boxShadow: otp.some((digit) => digit === '') 
                          ? 'none'
                          : '0 12px 40px rgba(86, 169, 217, 0.5)',
                      },
                      '&:disabled': {
                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                        color: '#94a3b8',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Continue
                  </Button>
                )}
              </Box>
            </Fade>
          </div>
        </div>

        {/* Right Half: Enhanced Image Section */}
        <div className='flex-1 hidden md:flex flex-col items-center justify-center relative overflow-hidden'>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // background: `
              //   linear-gradient(135deg, rgba(86, 169, 217, 0.1) 0%, rgba(74, 144, 226, 0.05) 100%),
              //   radial-gradient(circle at 70% 30%, rgba(86, 169, 217, 0.1) 0%, transparent 70%)
              // `,
              backgroundColor: 'white',
              zIndex: 0,
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
            <img
              src={verifyNumber}
              alt="Verify-Number-Illustration"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
                // filter: 'drop-shadow(0 20px 40px rgba(86, 169, 217, 0.2))',
                transform: 'scale(1.05)',
              }}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};


export default Step8_VerifyOtp;