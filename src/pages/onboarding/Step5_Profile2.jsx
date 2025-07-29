import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, Select, MenuItem, FormControl, Fade, Grow } from '@mui/material';
import logoWhite from '../../assets/logoWhite.png';
import indianStates from '../../static/dummyData_IndianStates';
import { useOnBoarding } from './OnboardingContext';

const Step5_Profile2 = () => {
  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();

  // Initialize state from context
  const [buildingFlatShopNo, setBuildingFlatShopNo] = useState(onboardingData.building || '');
  const [localityTown, setLocalityTown] = useState(onboardingData.locality || '');
  const [landmark, setLandmark] = useState(onboardingData.landmark || '');
  const [state, setState] = useState(onboardingData.state || '');
  const [city, setCity] = useState(onboardingData.city || '');
  const [pincode, setPincode] = useState(onboardingData.pincode || '');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync local state to context on change
  useEffect(() => {
    updateOnboardingData({
      building: buildingFlatShopNo,
      locality: localityTown,
      landmark,
      state,
      city,
      pincode,
    });
  }, [buildingFlatShopNo, localityTown, landmark, state, city, pincode, updateOnboardingData]);

  const handleContinue = () => {
    if (
      !buildingFlatShopNo.trim() ||
      !localityTown.trim() ||
      !landmark.trim() ||
      !state ||
      !city.trim() ||
      pincode.length !== 6
    ) {
      setError('All fields are required and pincode must be 6 digits.');
      return;
    }
    setError('');
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/auth/onboarding/location');
    }, 500);
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
        elevation={24}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
          overflow: 'auto',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >

        {/* Debugging Purposes */}
        <pre className='pt-56'>{JSON.stringify(onboardingData, null, 2)}</pre>
        
        <div
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            padding: '1rem 5rem',
            position: 'relative',
            width: '100%',
            margin: '0 auto',
            height: '100%',
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #56A9D9 0%, #4A9FD1 100%)',
              borderRadius: '50%',
              opacity: 0.1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '3rem',
              left: '1rem',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #56A9D9 0%, #4A9FD1 100%)',
              borderRadius: '50%',
              opacity: 0.08,
            }}
          />

          <div className="flex flex-col relative z-10">
            <Fade in={true} timeout={800}>
              <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '0.5rem' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  Let's Complete your profile
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    fontWeight: 400,
                  }}
                >
                  Tell us where you are located to personalize your experience
                </Typography>
              </div>
            </Fade>

            {/* Grid for Address Fields */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                columnGap: '3rem',
                rowGap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <Grow in={true} timeout={600}>
                <Box>
                  <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    Building/Flat/Shop No.
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    placeholder='Enter Building/Flat/Shop No.'
                    value={buildingFlatShopNo}
                    onChange={(e) => setBuildingFlatShopNo(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        bgcolor: '#ffffff',
                        '& fieldset': { borderColor: '#e0e0e0' },
                      },
                      '& .MuiInputBase-input': {
                        color: '#424242',
                        fontSize: '0.95rem',
                        py: '14px',
                        px: '16px',
                        fontWeight: 500,
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#94a3b8',
                        opacity: 1,
                      },
                    }}
                  />
                </Box>
              </Grow>
              <Grow in={true} timeout={700}>
                <Box>
                  <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    Locality/Town
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    placeholder='Enter Locality/Town'
                    value={localityTown}
                    onChange={(e) => setLocalityTown(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        bgcolor: '#ffffff',
                        '& fieldset': { borderColor: '#e0e0e0' },
                      },
                      '& .MuiInputBase-input': {
                        color: '#424242',
                        fontSize: '0.95rem',
                        py: '14px',
                        px: '16px',
                        fontWeight: 500,
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#94a3b8',
                        opacity: 1,
                      },
                    }}
                  />
                </Box>
              </Grow>
              <Grow in={true} timeout={800}>
                <Box>
                  <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    Landmark
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    placeholder='Enter a Landmark'
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        bgcolor: '#ffffff',
                        '& fieldset': { borderColor: '#e0e0e0' },
                      },
                      '& .MuiInputBase-input': {
                        color: '#424242',
                        fontSize: '0.95rem',
                        py: '14px',
                        px: '16px',
                        fontWeight: 500,
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#94a3b8',
                        opacity: 1,
                      },
                    }}
                  />
                </Box>
              </Grow>
              <Grow in={true} timeout={900}>
                <Box>
                  <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    State
                  </Typography>
                  <FormControl fullWidth variant="outlined" required>
                    <Select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 250,
                          },
                        },
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left',
                        },
                      }}
                      sx={{
                        borderRadius: '12px',
                        bgcolor: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                        '& .MuiSelect-select': {
                          color: '#94A3B8',
                          fontSize: '0.95rem',
                          py: '14px',
                          px: '16px',
                          fontWeight: 500,
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select State
                      </MenuItem>
                      {indianStates.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grow>
              <Grow in={true} timeout={1000}>
                <Box>
                  <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    City
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    placeholder='Enter City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        bgcolor: '#ffffff',
                        '& fieldset': { borderColor: '#e0e0e0' },
                      },
                      '& .MuiInputBase-input': {
                        color: '#424242',
                        fontSize: '0.95rem',
                        py: '14px',
                        px: '16px',
                        fontWeight: 500,
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#94a3b8',
                        opacity: 1,
                      },
                    }}
                  />
                </Box>
              </Grow>
              <Grow in={true} timeout={1100}>
                <Box>
                  <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    Pincode
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    placeholder='Enter Pincode'
                    value={pincode}
                    onChange={(e) => {
                      // Only allow numbers and max 6 digits
                      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                      setPincode(val);
                    }}
                    inputProps={{
                      maxLength: 6,
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        bgcolor: '#ffffff',
                        '& fieldset': { borderColor: '#e0e0e0' },
                      },
                      '& .MuiInputBase-input': {
                        color: '#424242',
                        fontSize: '0.95rem',
                        py: '14px',
                        px: '16px',
                        fontWeight: 500,
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#94a3b8',
                        opacity: 1,
                      },
                    }}
                  />
                </Box>
              </Grow>
            </Box>

            {/* Error Message */}
            {error && (
              <Fade in={true} timeout={500}>
                <Typography variant="body2" sx={{ color: 'red', mb: 2, fontWeight: 500, textAlign: 'center' }}>
                  {error}
                </Typography>
              </Fade>
            )}

            {/* Success Message */}
            {showSuccess && (
              <Fade in={true} timeout={500}>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    textAlign: 'center',
                    color: '#10B981',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  Address saved! Redirecting...
                </Typography>
              </Fade>
            )}

            {/* Continue Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Button
                variant="contained"
                onClick={handleContinue}
                sx={{
                  my: 3,
                  py: '14px',
                  px: '14px',
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  width: 160,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #4A9FD1 0%, #3B82E6 100%)',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3B82E6 0%, #2563EB 100%)',
                    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)',
                  },
                }}
              >
                Continue
              </Button>
            </Box>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Step5_Profile2;