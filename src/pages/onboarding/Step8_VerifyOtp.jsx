import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, CircularProgress } from '@mui/material';
import verifyNumber from '../../assets/verifyNumber.png';
import logoWhite from '../../assets/logoWhite.png';
import { useAuth } from '../../AuthContext';
import { useOnBoarding } from './OnboardingContext';
import { useUser } from '../../UserContext';


const RESEND_TIME = 30;    // seconds


const Step8_VerifyOtp = () => {

  const { login } = useAuth();    // The login function to set the local storage
  const { setUser } = useUser();    // get setUser

  const { onboardingData } = useOnBoarding();    // Get onboarding data

  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(RESEND_TIME);
  const [isTiming, setIsTiming] = useState(true);
  const [verifying, setVerifying] = useState(false); // <-- NEW
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
    // Implement actual resend OTP logic here
    console.log("Resending OTP...");
  };

  const formatTimer = (t) => `0:${t.toString().padStart(2, '0')}`;

  const handleContinue = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      login();    // set auth state & local storage

      /***** Save onboarding data to localStorage for global use *****/
      localStorage.setItem('velra_user', JSON.stringify(onboardingData));
      setUser(onboardingData);    //<-- Update context immediately

      navigate('/dashboard');
    }, 2200); // 2.2 seconds for a smooth effect
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
        elevation={7}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >

        {/* Debugging Purposes */}
        {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        {/* Left Half: Form Content */}
        <div className='flex-1 flex flex-col p-8 sm:p-12 justify-center items-center bg-white'>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#212121',
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
              textAlign: 'center',
            }}
          >
            Verify Your Number
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#616161',
              mb: { xs: 4, sm: 6 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            We've sent a 4-digit code to +91 XXXXX 12345.<br />Please enter it below to verify your number.
          </Typography>

          {/* OTP Input Fields */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 1, sm: 2 },
              mb: { xs: 4, sm: 6 },
              maxWidth: '300px',
              width: '100%',
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
                  width: { xs: '45px', sm: '50px' },
                  height: { xs: '45px', sm: '50px' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    bgcolor: '#ffffff',
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&.Mui-focused fieldset': { borderColor: '#56A9D9' },
                  },
                  '& .MuiInputBase-input': {
                    textAlign: 'center',
                    color: '#212121',
                    fontSize: { xs: '1.2rem', sm: '1.5rem' },
                    py: 1,
                  },
                }}
              />
            ))}
          </Box>

          {/* Resend Timer */}
          <Box sx={{ mb: { xs: 6, sm: 8 }, textAlign: 'center' }}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(0,0,0,0.59)',
                mb: 1,
                fontWeight: 'bold',
              }}
            >
              Resend in
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: '400',
                color: 'rgba(0,0,0,0.59)',
                fontSize: '0.875rem',
              }}
            >
              {formatTimer(timer)}
            </Typography>
            {!isTiming && (
              <Button
                variant="text"
                onClick={handleResendCode}
                sx={{
                  mt: 1,
                  color: '#56A9D9',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                Resend Code
              </Button>
            )}
          </Box>

          {/* Continue button or animation */}
          {verifying ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <CircularProgress size={32} sx={{ color: '#56A9D9', mb: 1 }} />
              <Typography variant="body2" sx={{ color: '#56A9D9', fontWeight: 500 }}>
                Verifying...
              </Typography>
            </Box>
          ) : (
            <Button
              variant="outlined"
              onClick={handleContinue}
              disabled={otp.some((digit) => digit === '')}
              sx={{
                py: '10px',
                bgcolor: otp.some((digit) => digit === '') ? '#f5f5f5' : 'white',
                color: otp.some((digit) => digit === '') ? '#bdbdbd' : '#56A9D9',
                borderColor: '#56A9D9',
                fontWeight: 'bold',
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: '#E0F2FF',
                  borderColor: '#56A9D9',
                  color: '#56A9D9',
                },
                width: '150px',
                alignSelf: 'center',
                opacity: otp.some((digit) => digit === '') ? 0.7 : 1,
                pointerEvents: otp.some((digit) => digit === '') ? 'none' : 'auto',
              }}
            >
              Continue
            </Button>
          )}
        </div>



        {/* Right Half: Image (Static) */}
        <div className='flex-1 hidden md:flex flex-col items-center justify-center'>
          <img
            src={verifyNumber}
            alt="Verify-Number-Illustration"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </Paper>
    </div>
  );
};


export default Step8_VerifyOtp;