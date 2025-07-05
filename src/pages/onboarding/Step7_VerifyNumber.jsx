import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box } from '@mui/material';
import verifyNumber from '../../assets/verifyNumber.png';
import { useOnBoarding } from './OnboardingContext';



const Step7_VerifyNumber = () => {

  const navigate = useNavigate();

  const { onboardingData, updateOnboardingData } = useOnBoarding();
  const [phoneNumber, setPhoneNumber] = useState(onboardingData.phone || '');

  const handleVerifyNumber = () => {
    updateOnboardingData({ phone: phoneNumber });
    navigate('/auth/onboarding/verify-otp');
  };

  return (
    <Paper
      elevation={7}
      sx={{
        width: '80%',
        height: '80%',
        display: 'flex',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >

      {/* Debugging Purposes */}
      <pre>{JSON.stringify(onboardingData, null, 2)}</pre>

      {/* Left Half: Form Content */}
      <div className='flex-1 flex flex-col p-8 sm:p-12 justify-center items-center bg-white'>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#212121',
            mb: { xs: 4, sm: 6 },
            fontSize: { xs: '1.75rem', sm: '2.25rem' },
            textAlign: 'center',
          }}
        >
          Verify Your Number
        </Typography>

        {/* Phone Number Input - Combined */}
        <Box sx={{ mb: { xs: 6, sm: 8 }, width: '100%', maxWidth: '450px' }}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter your number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="tel"
            InputProps={{
              startAdornment: (
                <Typography
                  variant="body1"
                  sx={{
                    color: '#424242',
                    mr: 1,
                    fontWeight: 'medium',
                    pr: 1.5,
                    borderRight: '1px solid #A1A0A0',
                  }}
                >
                  +91
                </Typography>
              ),
              sx: {
                borderRadius: '8px',
                bgcolor: '#ffffff',
                '& fieldset': { borderColor: '#e0e0e0' },
                '& .MuiInputBase-input': {
                  color: '#424242',
                  fontSize: '0.875rem',
                  py: '10px',
                },
                '& .MuiInputBase-input::placeholder': {
                  textAlign: 'start',
                  opacity: 1,
                  color: '#A1A0A0',
                },
              },
            }}
            sx={{}}
          />
        </Box>

        {/* Verify Number Button */}
        <Button
          variant="outlined"
          onClick={handleVerifyNumber}
          sx={{
            py: '10px',
            bgcolor: 'white',
            color: '#56A9D9',
            borderColor: '#56A9D9',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            '&:hover': {
              bgcolor: '#E0F2FF',
              borderColor: '#56A9D9',
            },
            width: '180px',
          }}
        >
          Verify Number
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