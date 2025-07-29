import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Snackbar, Alert, Box, Container, Fade, CircularProgress } from '@mui/material';
import { FaMapMarkedAlt } from "react-icons/fa";
import { useOnBoarding } from './OnboardingContext';
import logoWhite from '../../assets/logoWhite.png';


const Step6_Location = () => {

  const { updateOnboardingData, onboardingData } = useOnBoarding();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [locationStatus, setLocationStatus] = useState('initial'); // 'initial', 'fetching', 'success', 'error'
  const [locationData, setLocationData] = useState(null);

  // Function to get address from coordinates using reverse geocoding
  const getAddressFromCoords = async (lat, lng) => {
    // Primary: Try OpenCage first (more accurate)
    const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;
    if (OPENCAGE_API_KEY) {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}&language=en&pretty=1`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          return {
            city: result.components.city || result.components.town || result.components.village || 'Unknown City',
            state: result.components.state || result.components.state_code || 'Unknown State',
            country: result.components.country || 'Unknown Country',
            postcode: result.components.postcode || '',
            formatted: result.formatted || `${lat}, ${lng}`
          };
        }
      } catch (error) {
        console.error('OpenCage geocoding failed:', error);
      }
    }

    // Fallback to Nominatim if OpenCage fails or no API key
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'Velra-App/1.0' // Required for Nominatim
          }
        }
      );
      const data = await response.json();
      
      if (data && data.address) {
        const addr = data.address;
        return {
          city: addr.city || addr.town || addr.village || addr.municipality || 'Unknown City',
          state: addr.state || addr.region || 'Unknown State',
          country: addr.country || 'Unknown Country',
          postcode: addr.postcode || '',
          formatted: data.display_name || `${lat}, ${lng}`
        };
      }
    } catch (error) {
      console.error('Nominatim geocoding failed:', error);
    }
    
    // Final fallback - return coordinates
    return {
      city: 'Location Found',
      state: '',
      country: '',
      postcode: '',
      formatted: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
    };
  };

  const handleAllowLocationAccess = () => {
    if (navigator.geolocation) {
      setLocationStatus('fetching');
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          const addressInfo = await getAddressFromCoords(
            position.coords.latitude, 
            position.coords.longitude
          );
          
          const locationInfo = {
            coordinates: coords,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: addressInfo
          };
          
          setLocationData(locationInfo);
          updateOnboardingData({ locationCoordinates: coords, locationDetails: locationInfo });
          setLocationStatus('success');
        },
        (error) => {
          updateOnboardingData({ locationCoordinates: 'Location not available' });
          setSnackbar({ open: true, message: 'Failed to fetch location.', severity: 'error' });
          setLocationStatus('error');
          // Still allow continuation after error
          setTimeout(() => setLocationStatus('initial'), 3000);
        }
      );
    } else {
      updateOnboardingData({ locationCoordinates: 'Geolocation not supported' });
      setSnackbar({ open: true, message: 'Geolocation not supported by your browser.', severity: 'warning' });
      setLocationStatus('error');
      setTimeout(() => setLocationStatus('initial'), 3000);
    }
  };

  const handleSkipForNow = () => {
    updateOnboardingData({ locationCoordinates: 'Skipped by user' });
    navigate('/auth/onboarding/verify-number');
  };

  const handleContinue = () => {
    navigate('/auth/onboarding/verify-number', { replace: true });
  };

  const handleGetLocationAgain = () => {
    setLocationStatus('initial');
    setLocationData(null);
  };

  // Initial location request screen
  const renderInitialScreen = () => (
    <Container
      maxWidth="md"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 3, sm: 4, md: 6 },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          zIndex: 2,
        }}
      >
        {/* Location Icon */}
        <Box
          sx={{
            p: 1,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // border: '3px solid red',
            margin: '0 auto',
            mb: 3,
            boxShadow: '0 8px 32px rgba(86, 169, 217, 0.3)',
          }}
        >
          <FaMapMarkedAlt size={52} color='white' />
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' },
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          Help Us Find Your Location
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#64748b',
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.125rem' },
            lineHeight: 1.6,
            maxWidth: '400px',
            margin: '0 auto',
            marginBottom: 4,
          }}
        >
          We'll use your location to provide personalized services and better recommendations tailored to your area.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 4 }}>
          <Button
            variant="contained"
            onClick={handleAllowLocationAccess}
            disabled={locationStatus === 'fetching'}
            sx={{
              py: 1.8,
              px: 4,
              background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              borderRadius: '12px',
              textTransform: 'none',
              boxShadow: '0 8px 32px rgba(86, 169, 217, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(86, 169, 217, 0.5)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
              '&:disabled': {
                opacity: 0.7,
                transform: 'none',
              },
            }}
          >
            {locationStatus === 'fetching' ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                Fetching Location...
              </Box>
            ) : (
              'Allow Location Access'
            )}
          </Button>

          <Button
            variant="text"
            onClick={handleSkipForNow}
            disabled={locationStatus === 'fetching'}
            sx={{
              py: 1.5,
              px: 3,
              color: '#64748b',
              fontWeight: 500,
              fontSize: '0.95rem',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(100, 116, 139, 0.05)',
                color: '#475569',
              },
              '&:disabled': {
                opacity: 0.5,
              },
            }}
          >
            Skip for now
          </Button>
        </Box>
      </Box>

      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(86, 169, 217, 0.1) 0%, rgba(66, 165, 245, 0.05) 100%)',
          filter: 'blur(40px)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(66, 165, 245, 0.08) 0%, rgba(86, 169, 217, 0.03) 100%)',
          filter: 'blur(50px)',
          zIndex: 1,
        }}
      />
    </Container>
  );

  // Success screen after location is fetched
  const renderSuccessScreen = () => (
    <Fade in={locationStatus === 'success'} timeout={800}>
      <Container
        maxWidth="md"
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 3, sm: 4, md: 6 },
          position: 'relative',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '600px',
            width: '100%',
            zIndex: 2,
          }}
        >
          {/* Success Message */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            We found you...
          </Typography>

          {/* Location Pin Icon */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Box
              sx={{
                p: 2,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 40px rgba(86, 169, 217, 0.4)',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 53%, 80%, 100%': {
                    transform: 'translate3d(0,0,0)',
                  },
                  '40%, 43%': {
                    transform: 'translate3d(0, -8px, 0)',
                  },
                  '70%': {
                    transform: 'translate3d(0, -4px, 0)',
                  },
                  '90%': {
                    transform: 'translate3d(0, -2px, 0)',
                  },
                },
              }}
            >
              <Box
                component="svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </Box>
            </Box>
          </Box>

          {/* Location Details */}
          {locationData && (
            <Box
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: 'rgba(86, 169, 217, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(86, 169, 217, 0.1)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: '#1e293b',
                  mb: 1,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                }}
              >
                {locationData.address.formatted}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  fontSize: '0.95rem',
                  fontFamily: 'monospace',
                }}
              >
                ({locationData.latitude.toFixed(5)}, {locationData.longitude.toFixed(5)})
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px', margin: '0 auto' }}>
            <Button
              variant="contained"
              onClick={handleContinue}
              sx={{
                py: 2,
                px: 4,
                background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                borderRadius: '12px',
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(86, 169, 217, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(86, 169, 217, 0.5)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
            >
              Continue
            </Button>

            <Button
              variant="text"
              onClick={handleGetLocationAgain}
              sx={{
                py: 1.5,
                px: 3,
                color: '#56A9D9',
                fontWeight: 500,
                fontSize: '0.95rem',
                textTransform: 'none',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(86, 169, 217, 0.05)',
                  color: '#42A5F5',
                },
              }}
            >
              Get Location Again
            </Button>
          </Box>
        </Box>

        {/* Enhanced Background Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            right: '5%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(86, 169, 217, 0.15) 0%, rgba(66, 165, 245, 0.08) 100%)',
            filter: 'blur(60px)',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(66, 165, 245, 0.12) 0%, rgba(86, 169, 217, 0.06) 100%)',
            filter: 'blur(80px)',
            zIndex: 1,
          }}
        />
      </Container>
    </Fade>
  );

  
  return (
    <div style={{ position: 'relative', width: '80%', height: '82%' }}>
      {/* Velra logo */}
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
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        }}
      >
        {/* Debugging Purposes */}
        {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        {/* Conditional Rendering based on location status */}
        {locationStatus === 'success' ? renderSuccessScreen() : renderInitialScreen()}

        {/* Snackbar Alert */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{
              width: '100%',
              borderRadius: '12px',
              '& .MuiAlert-icon': {
                alignItems: 'center',
              },
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
};

export default Step6_Location;