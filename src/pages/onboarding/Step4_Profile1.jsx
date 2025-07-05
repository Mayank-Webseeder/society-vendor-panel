import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box } from '@mui/material';
import { Paperclip } from 'lucide-react';
import onboardingImage from '../../assets/onboardingImage.png';
import { useOnBoarding } from './OnboardingContext';


const Step4_Profile1 = () => {

  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();

  // Initialize state from context
  const [yourName, setYourName] = useState(onboardingData.name || '');
  const [businessName, setBusinessName] = useState(onboardingData.businessName || '');
  const [yourExperience, setYourExperience] = useState(onboardingData.experience || '');
  const [idProof, setIdProof] = useState(onboardingData.idProof || '');

  // Sync local state to context on change
  useEffect(() => {
    updateOnboardingData({
      name: yourName,
      businessName,
      experience: yourExperience,
      idProof,
    });
  }, [yourName, businessName, yourExperience, idProof, updateOnboardingData]);

  const handleContinue = () => {
    // Data is already synced to context
    navigate('/auth/onboarding/profile-2');
  };




  return (
    <Paper
      elevation={7}
      sx={{
        width: '80%',
        height: '82%',
        display: 'flex',
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
      }}
    >

      {/* Debugging Purposes */}
      <pre>{JSON.stringify(onboardingData, null, 2)}</pre>

      {/* Left Half: Form Content */}
      <div className='flex-1 flex flex-col p-8 sm:p-12 justify-between bg-white'>
        <div className="flex flex-col">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#212121',
              mb: { xs: 4, sm: 6 },
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
            }}
          >
            Let's Complete your profile
          </Typography>

          {/* Your Name */}
          <Box sx={{ mb: { xs: 3, sm: 4 }, maxWidth: '450px' }}>
            <Typography variant="body1" sx={{ color: '#212121', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              Your Name
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#ffffff',
                  '& fieldset': { borderColor: '#e0e0e0' },
                },
                '& .MuiInputBase-input': {
                  color: '#424242',
                  fontSize: '0.875rem',
                  py: '10px',
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.875rem',
                  color: '#757575',
                },
              }}
            />
          </Box>

          {/* Business Name */}
          <Box sx={{ mb: { xs: 3, sm: 4 }, maxWidth: '450px' }}>
            <Typography variant="body1" sx={{ color: '#212121', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              Business Name
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#ffffff',
                  '& fieldset': { borderColor: '#e0e0e0' },
                },
                '& .MuiInputBase-input': {
                  color: '#424242',
                  fontSize: '0.875rem',
                  py: '10px',
                },
              }}
            />
          </Box>

          {/* Your Experience */}
          <Box sx={{ mb: { xs: 3, sm: 4 }, maxWidth: '450px' }}>
            <Typography variant="body1" sx={{ color: '#212121', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              Your Experience
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={yourExperience}
              onChange={(e) => setYourExperience(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#ffffff',
                  '& fieldset': { borderColor: '#e0e0e0' },
                },
                '& .MuiInputBase-input': {
                  color: '#424242',
                  fontSize: '0.875rem',
                  py: '10px',
                },
              }}
            />
          </Box>

          {/* Upload ID Proof */}
          <Box sx={{ mb: { xs: 6, sm: 8 }, maxWidth: '450px' }}>
            <Typography variant="body1" sx={{ color: '#212121', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              Upload ID Proof
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Aadhaar Card, PAN Card, Driving License, Voter ID"
              value={idProof}
              onChange={(e) => setIdProof(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Paperclip size={20} style={{ color: '#757575', cursor: 'pointer', transform: 'rotate(90deg)' }} />
                ),
                sx: {
                  '& .MuiInputBase-input::placeholder': {
                    textAlign: 'start',
                    opacity: 1,
                    color: '#A1A0A0',
                  },
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#ffffff',
                  '& fieldset': { borderColor: '#e0e0e0' },
                },
                '& .MuiInputBase-input': {
                  color: '#424242',
                  fontSize: '0.875rem',
                  py: '10px',
                },
              }}
            />
          </Box>
        </div>

        {/* Continue Button */}
        <Button
          variant="outlined"
          onClick={handleContinue}
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
            width: '150px',
            alignSelf: 'center',
          }}
        >
          Continue
        </Button>
      </div>

      {/* Right Half: Image (Static) */}
      <div className='flex-1 flex items-center justify-center'>
        <img
          src={onboardingImage}
          alt="Illustration"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </Paper>
  );
};


export default Step4_Profile1;