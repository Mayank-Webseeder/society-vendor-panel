import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, InputAdornment, Alert, Fade } from '@mui/material';
import { FaPhone } from "react-icons/fa6";
import verifyNumber from '../../assets/verifyNumber.png';
import { useOnBoarding } from './OnboardingContext';


const Step7_VerifyNumber = () => {
  
  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();
  const [phoneNumber, setPhoneNumber] = useState(onboardingData.phone || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handlePhoneChange = (e) => {
    // Allow only numbers and max 10 digits
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhoneNumber(val);
    if (error) setError('');
  };

  const handleVerifyNumber = async () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateOnboardingData({ phone: phoneNumber });
      setIsLoading(false);
      navigate('/auth/onboarding/verify-otp');
    }, 1500);
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

          <Fade in={showContent} timeout={1000}>
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
                  Verify Your Number
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
                  Enter your mobile number to receive a verification code
                </Typography>

                {/* Phone Icon */}
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
                {/* Main Content */}
                <Box
                  sx={{
                    // border:'2px solid green',
                    width: '100%',
                    maxWidth: '420px',
                    textAlign: 'center',
                    zIndex: 2,
                  }}
                >
                  {/* Phone Number Input */}
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your mobile number"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      type="tel"
                      inputProps={{
                        maxLength: 10,
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                pr: 1.5,
                                mr: 1,
                                borderRight: '1px solid #e2e8f0',
                              }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  fontSize: '1.25rem',
                                  pb: 0.5,
                                }}
                              >
                                🇮🇳
                              </Box>
                              <Typography
                                variant="body1"
                                sx={{
                                  color: '#475569',
                                  fontWeight: 500,
                                  fontSize: '0.95rem',
                                }}
                              >
                                +91
                              </Typography>
                            </Box>
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: '12px',
                          backgroundColor: '#ffffff',
                          transition: 'all 0.2s ease',
                          '& fieldset': {
                            borderColor: '#e2e8f0',
                            borderWidth: '1px',
                          },
                          '&:hover fieldset': {
                            borderColor: '#56A9D9',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#56A9D9',
                            borderWidth: '2px',
                            boxShadow: '0 0 0 3px rgba(86, 169, 217, 0.1)',
                          },
                          '& .MuiInputBase-input': {
                            color: '#1e293b',
                            fontSize: '1rem',
                            fontWeight: 500,
                            py: 1.75,
                            pl: 0,
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: '#94a3b8',
                            opacity: 1,
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Error Message */}
                  {error && (
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 3,
                        borderRadius: '12px',
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        '& .MuiAlert-message': {
                          color: '#dc2626',
                          fontWeight: 500,
                        },
                      }}
                    >
                      {error}
                    </Alert>
                  )}
                </Box>
              </div>

              {/* Bottom Section - Continue Button */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={handleVerifyNumber}
                    disabled={isLoading || phoneNumber.length !== 10}
                    sx={{
                      py: 2,
                      px: 5,
                      background: (phoneNumber.length === 10 && !isLoading)
                        ? 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)' 
                        : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                      color: (phoneNumber.length === 10 && !isLoading) ? 'white' : '#9ca3af',
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      borderRadius: '12px',
                      boxShadow: (phoneNumber.length === 10 && !isLoading) ? '0 6px 20px rgba(86, 169, 217, 0.3)' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      textTransform: 'none',
                      minWidth: '220px',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        background: (phoneNumber.length === 10 && !isLoading)
                          ? 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)' 
                          : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                        boxShadow: (phoneNumber.length === 10 && !isLoading) ? '0 8px 28px rgba(86, 169, 217, 0.4)' : 'none',
                        transform: (phoneNumber.length === 10 && !isLoading) ? 'translateY(-2px)' : 'none',
                      },
                      '&:active': {
                        transform: (phoneNumber.length === 10 && !isLoading) ? 'translateY(-1px)' : 'none',
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
                        left: (phoneNumber.length === 10 && !isLoading) ? '100%' : '-100%',
                      },
                    }}
                  >
                    {
                      isLoading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              border: '2px solid currentColor',
                              borderTop: '2px solid transparent',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite',
                              '@keyframes spin': {
                                '0%': { transform: 'rotate(0deg)' },
                                '100%': { transform: 'rotate(360deg)' },
                              },
                            }}
                          />
                            Verifying...
                          </Box>
                        ) : (
                            'Send Verification Code'
                        )
                    }
                  </Button>
                </Box>
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
          <Fade in={showContent} timeout={1200}>
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
                alt="Verify Number Illustration"
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

export default Step7_VerifyNumber;