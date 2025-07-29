import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, Container, InputAdornment, Alert } from '@mui/material';
import verifyNumber from '../../assets/verifyNumber.png';
import logoWhite from '../../assets/logoWhite.png';
import { useOnBoarding } from './OnboardingContext';
import { createProfile } from '../../services/api/auth';


const Step7_VerifyNumber = () => {
  
  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();
  const [phoneNumber, setPhoneNumber] = useState(onboardingData.phone || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    <div style={{ position: 'relative', width: '80%', height: '82%' }}>
      {/* Velra logo absolutely positioned relative to this wrapper */}
      <div
        style={{
          position: 'absolute',
          top: '-4rem',
          left: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <img src={logoWhite} alt="velra-logo" />
        <h3 className="font-semibold text-5xl text-white">VELRA</h3>
      </div>

      <Paper
        elevation={7}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          borderRadius: '20px',
          overflow: 'auto',
          background: 'white',
        }}
      >

        {/* Debugging Purposes */}
        <pre>{JSON.stringify(onboardingData, null, 2)}</pre>

        {/* Left Half: Form Content */}
        <Container
          maxWidth="sm"
          sx={{
            // border: '2px solid red',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: { xs: 3, sm: 4, md: 6 },
            position: 'relative',
          }}
        >
          {/* Main Content */}
          <Box
            sx={{
              // border:'2px solid green',
              mt: 4,
              width: '100%',
              maxWidth: '420px',
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            {/* Phone Icon */}
            <Box
              sx={{
                // border: '2px solid red',
                p: 1.5,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                mb: 3,
                boxShadow: '0 8px 32px rgba(86, 169, 217, 0.3)',
              }}
            >
              <Box
                component="svg"
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </Box>
            </Box>

            {/* Heading */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.25rem' },
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              Verify Your Number
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                mb: 4,
                fontSize: { xs: '0.95rem', sm: '1rem' },
                lineHeight: 1.6,
              }}
            >
              Enter your mobile number to receive a verification code
            </Typography>

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
                            // border: '1px solid green',
                            // lineHeight: 1,
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

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 5 }}>
              <Button
                variant="contained"
                onClick={handleVerifyNumber}
                disabled={isLoading || phoneNumber.length !== 10}
                sx={{
                  py: 1.75,
                  px: 4,
                  background: phoneNumber.length === 10 
                    ? 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)'
                    : '#e2e8f0',
                  color: phoneNumber.length === 10 ? 'white' : '#94a3b8',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: '12px',
                  textTransform: 'none',
                  boxShadow: phoneNumber.length === 10 
                    ? '0 8px 32px rgba(86, 169, 217, 0.4)' 
                    : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: phoneNumber.length === 10 
                      ? 'linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)'
                      : '#e2e8f0',
                    transform: phoneNumber.length === 10 ? 'translateY(-2px)' : 'none',
                    boxShadow: phoneNumber.length === 10 
                      ? '0 12px 40px rgba(86, 169, 217, 0.5)' 
                      : 'none',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  '&.Mui-disabled': {
                    background: '#e2e8f0',
                    color: '#94a3b8',
                  },
                }}
              >
                {isLoading ? (
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
                )}
              </Button>

              {/* Privacy Note */}
              {/* <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  p: 2,
                  backgroundColor: 'rgba(86, 169, 217, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(86, 169, 217, 0.1)',
                  mt: 2,
                }}
              >
                <Box
                  component="svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#56A9D9"
                  strokeWidth="2"
                >
                  <path d="M9 12l2 2 4-4" />
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#56A9D9',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  We'll send you a 6-digit verification code
                </Typography>
              </Box> */}
            </Box>
          </Box>

          {/* Background Decorative Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '15%',
              left: '10%',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(86, 169, 217, 0.1) 0%, rgba(66, 165, 245, 0.05) 100%)',
              filter: 'blur(30px)',
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              right: '15%',
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(66, 165, 245, 0.08) 0%, rgba(86, 169, 217, 0.03) 100%)',
              filter: 'blur(40px)',
              zIndex: 1,
            }}
          />
        </Container>

        {/* Right Half: Image */}
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            background: 'white',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              maxWidth: '100%',
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& img': {
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
                // filter: 'drop-shadow(0 20px 40px rgba(86, 169, 217, 0.15))',
              },
            }}
          >
            <img
              src={verifyNumber}
              alt="Verify-Number-Illustration"
            />
          </Box>
          
          {/* Decorative gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(86, 169, 217, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              zIndex: 1,
            }}
          />
        </Box>
      </Paper>
    </div>
  );
};

export default Step7_VerifyNumber;