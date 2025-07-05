import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box } from '@mui/material';
import verifyNumber from '../../assets/verifyNumber.png';


const RESEND_TIME = 30; // seconds



const Step7_VerifyNumber = () => {

  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '']); // State for 4 OTP digits
  const [timer, setTimer] = useState(RESEND_TIME);
  const [isTiming, setIsTiming] = useState(true); // Start timer automatically
  const timerRef = useRef(null);
  const inputRefs = useRef([]); // Refs for OTP input fields


  // Effect for the resend timer
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
    const value = element.value.replace(/[^0-9]/g, ''); // Only allow digits
    if (value.length === 0) {
      setOtp([...otp.map((d, idx) => (idx === index ? '' : d))]);
      return;
    }
    // Only take the first digit if user pastes or types more than one
    setOtp(prev => prev.map((d, idx) => (idx === index ? value[0] : d)));
    // Focus next input if available
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current is empty
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





  return (
    <Paper
      elevation={7}
      sx={{
        width: '80%',
        height: '80%',
        display: 'flex',
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif', // Ensure Inter font is used
      }}
    >

      

      {/* Left Half: Form Content */}
      <div className='flex-1 flex flex-col p-8 sm:p-12 justify-center items-center bg-white'>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#212121',
            mb: { xs: 2, sm: 3 }, // Adjusted margin bottom
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
            mb: { xs: 4, sm: 6 }, // Adjusted margin bottom
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
            gap: { xs: 1, sm: 2 }, // Responsive gap between boxes
            mb: { xs: 4, sm: 6 }, // Margin bottom for OTP inputs
            maxWidth: '300px', // Constrain width of OTP inputs
            width: '100%',
            justifyContent: 'center', // Center the OTP boxes
          }}
        >
          {otp.map((data, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              // maxLength="1" // Ensures only one character can be entered
              value={data}
              onChange={(e) => handleOtpChange(e.target, index)}
              onFocus={(e) => e.target.select()} // Select all text on focus
              onKeyDown={(e) => handleKeyDown(e, index)}
              variant="outlined"
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' }
              }}
              sx={{
                width: { xs: '45px', sm: '50px' }, // Responsive width for each box
                height: { xs: '45px', sm: '50px' }, // Responsive height (same as width for square)
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#ffffff',
                  '& fieldset': { borderColor: '#e0e0e0' },
                  '&.Mui-focused fieldset': { borderColor: '#56A9D9' }, // Focus border color
                },
                '& .MuiInputBase-input': {
                  textAlign: 'center',
                  color: '#212121',
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  p: 0, // Remove default padding to make it a perfect square visually
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
              color: 'rgba(0,0,0,0.59)', // Changed color to text-black/[0.59]
              mb: 1,
              fontWeight: 'bold', // Changed font weight to bold
            }}
          >
            Resend in
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: '400', // Changed font weight to 400
              color: 'rgba(0,0,0,0.59)', // Changed color to text-black/[0.59]
              fontSize: '0.875rem', // Changed size to sm (0.875rem)
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


        {/* Continue button */}
        <Button
          variant="outlined"
          onClick={() => navigate('/dashboard')}
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
       
      </div>



      {/* Right Half: Image (Static) */}
            <div className='flex-1 flex flex-col items-center justify-center'>
              <img
                src={verifyNumber}
                alt="Verify-Number-Illustration"
                className="max-w-full h-auto object-contain"
              />
            </div>
    </Paper>
  );
};


export default Step7_VerifyNumber;