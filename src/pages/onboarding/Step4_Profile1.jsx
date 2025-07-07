import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, InputAdornment, IconButton } from '@mui/material';
import { Paperclip } from 'lucide-react';
import onboardingImage from '../../assets/onboardingImage.png';
import logoWhite from '../../assets/logoWhite.png';
import { useOnBoarding } from './OnboardingContext';



const Step4_Profile1 = () => {

  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();

  // Initialize state from context
  const [yourName, setYourName] = useState(onboardingData.name || '');
  const [businessName, setBusinessName] = useState(onboardingData.businessName || '');
  const [yourExperience, setYourExperience] = useState(onboardingData.workExperience || '');
  const [idProof, setIdProof] = useState(onboardingData.idProof || '');
  const [idProofFile, setIdProofFile] = useState(null);

  const [error, setError] = useState('');
  const fileInputRef = useRef();

  // Sync local state to context on change
  useEffect(() => {
    updateOnboardingData({
      name: yourName,
      initials: getInitials(yourName),
      businessName,
      workExperience: yourExperience,
      idProof,
      idProofFile,
    });
  }, [yourName, businessName, yourExperience, idProof, idProofFile, updateOnboardingData]);


  // Helper to get initials from name
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0][0]?.toUpperCase() || '';
    }
    // More than one word: take first letter of first and last word
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Helper to generate user id
  const generateUserId = (name) => {
    if (!name) return '';
    const firstPart = name.trim().split(/\s+/)[0].toLowerCase();
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 random digits
    return `#${firstPart}${randomDigits}`;
  };


  const handleContinue = () => {
    if (!yourName.trim() || !businessName.trim() || !yourExperience.trim() || !idProofFile) {
      setError('All fields are required.');
      return;
    }
    setError('');
    navigate('/auth/onboarding/profile-2');
  };

  const handlePaperclipClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset so same file can be selected again
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdProof(file.name);    // (optional) just for display
      setIdProofFile(file);     // <-- this is the actual File object
    }
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
          borderRadius: '12px',
          flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens
          overflow: 'auto'
        }}
      >

        {/* Debugging Purposes */}
        {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        {/* Left Half: Form Content */}
        <div
          className="flex-1 flex flex-col p-8 sm:p-12 bg-white"
          style={{ minHeight: 0, height: '100%' }}
        >
          <div className="flex flex-col flex-1">
            <Typography
              variant="h4"
              sx={{
                mt: -3,
                fontWeight: 'bold',
                color: '#212121',
                mb: { xs: 4, sm: 5 },
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
              }}
            >
              Let's Complete your profile
            </Typography>

            {/* Your Name */}
            <Box sx={{ mb: { xs: 2.5, sm: 3 }, maxWidth: '450px' }}>
              <Typography variant="body1" sx={{ color: 'rgb(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Your Name
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                required
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
            <Box sx={{ mb: { xs: 2.5, sm: 3 }, maxWidth: '450px' }}>
              <Typography variant="body1" sx={{ color: 'rgb(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Business Name
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
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
            <Box sx={{ mb: { xs: 2.5, sm: 3 }, maxWidth: '450px' }}>
              <Typography variant="body1" sx={{ color: 'rgb(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Your Experience
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={yourExperience}
                onChange={(e) => setYourExperience(e.target.value)}
                required
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
            <Box sx={{ mb: { xs: 6, sm: 5 }, maxWidth: '450px' }}>
              <Typography variant="body1" sx={{ color: 'rgb(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Upload ID Proof
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Aadhaar Card, PAN Card, Driving License, Voter ID"
                value={idProofFile ? idProofFile.name : ''}
                onClick={handlePaperclipClick}
                inputProps={{ readOnly: true, style: { cursor: 'pointer' } }}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePaperclipClick} edge="end">
                        <Paperclip size={20} style={{ color: '#757575', cursor: 'pointer', transform: 'rotate(-45deg)' }} />
                      </IconButton>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                    </InputAdornment>
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
                    cursor: 'pointer'
                  },
                }}
              />
              {idProofFile && (
                <Typography variant="caption" sx={{ color: '#1976D2', mt: 1, display: 'block' }}>
                  Selected file: {idProofFile.name}
                </Typography>
              )}
            </Box>
            {error && (
              <Typography variant="body2" sx={{ color: 'red', mb: 2, fontWeight: 500 }}>
                {error}
              </Typography>
            )}
          </div>

          {/* Continue Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }} className="hidden md:flex">
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
                mb: 2,
              }}
            >
              Continue
            </Button>
          </div>
        </div>



        {/* Right Half: Image (Static) */}
        <div className="flex-1 lg:flex flex-col items-center hidden justify-center relative">
          <img
            src={onboardingImage}
            alt="Illustration"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </Paper>
    </div>
  );
};

export default Step4_Profile1;