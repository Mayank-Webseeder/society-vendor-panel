import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Snackbar, Alert, Box, Container, Fade, CircularProgress, Zoom } from '@mui/material';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';
import { FaMapMarkedAlt } from "react-icons/fa";
import { useOnBoarding } from './OnboardingContext';


const Step6_Location = () => {

  const { updateOnboardingData, onboardingData } = useOnBoarding();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [locationStatus, setLocationStatus] = useState('initial'); // 'initial', 'fetching', 'success', 'error'
  const [locationData, setLocationData] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);


  // Function to get address from coordinates using OpenCage & Nominatim(fallback)
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

  return (
    <div 
      className="relative h-screen w-screen flex flex-col justify-center items-center"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 30%, #1e1b4b 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Professional grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Subtle geometric accent */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
          transform: 'skewX(15deg)',
          transformOrigin: 'top',
        }}
      />

      {/* Main Content Container */}
      <div style={{ position: 'relative', width: '80%', height: '80%' }}>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            borderRadius: '20px',
            overflow: 'auto',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            boxShadow: 'none',
            overflowX: 'hidden',
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
          {/* Global CSS for hiding scrollbars */}
          <style>
            {`
              ::-webkit-scrollbar {
                display: 'none';
              }
              
              * {
                -ms-overflow-style: 'none';
                scrollbar-width: 'none';
              }
            `}
          </style>

          {/* Main Content Container */}
          <Box
            sx={{
              // border: '2px solid green',
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              position: 'relative',
              minWidth: 0,
              justifyContent: 'space-between',
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
                justifyContent: 'space-between',
                width: '100%',
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
                  // height: '100%',
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
                    Location Access
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
                    We need your location to show nearby service opportunities
                  </Typography>

                  {/* Decorative Icon */}
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
                      <FaMapMarkedAlt size={30} color="white" />
                    </Box>
                  </Box>
                </Box>

                {/* Middle Section - Location Content */}
                <div className="flex flex-col w-full items-center flex-1 max-w-5xl">
                  <Box
                    sx={{
                      // border:'2px solid red',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      maxWidth: 500,
                      mb: 4,
                    }}
                  >
                    {locationStatus === 'initial' && (
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: '#2d3748',
                            mb: 2,
                          }}
                        >
                          Enable Location Services
                        </Typography>
                        
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#718096',
                            mb: 4,
                            lineHeight: 1.6,
                          }}
                        >
                          Allow location access to find service opportunities near you and provide accurate service delivery.
                        </Typography>
                        
                        <Button
                          onClick={handleAllowLocationAccess}
                          variant="contained"
                          size="large"
                          fullWidth
                          disabled={locationStatus === 'fetching'}
                          sx={{
                            py: 1.5,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                              transform: 'translateY(-2px)',
                            },
                            '&:disabled': {
                              opacity: 0.7,
                              transform: 'none',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {locationStatus === 'fetching' ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CircularProgress size={20} color="inherit" />
                              Fetching Location...
                            </Box>
                          ) : (
                            <>
                              <Navigation size={20} style={{ marginRight: 8 }} />
                              Allow Location Access
                            </>
                          )}
                        </Button>

                        <Button
                          variant="text"
                          onClick={handleSkipForNow}
                          disabled={locationStatus === 'fetching'}
                          sx={{
                            mt: 2,
                            py: 1,
                            px: 3,
                            color: '#718096',
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            textTransform: 'none',
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: 'rgba(113, 128, 150, 0.05)',
                              color: '#2d3748',
                            },
                            '&:disabled': {
                              opacity: 0.5,
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Skip for now
                        </Button>
                      </Box>
                    )}

                    {locationStatus === 'fetching' && (
                      <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress
                          size={60}
                          sx={{
                            color: '#667eea',
                            mb: 3,
                          }}
                        />
                        
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: '#2d3748',
                            mb: 2,
                          }}
                        >
                          Getting Your Location
                        </Typography>
                        
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#718096',
                            lineHeight: 1.6,
                          }}
                        >
                          Please wait while we fetch your current location...
                        </Typography>
                      </Box>
                    )}

                    {locationStatus === 'success' && locationData && (
                      <Box sx={{ textAlign: 'center' }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                            mb: 3,
                          }}
                        >
                          <CheckCircle size={28} color="white" />
                        </Box>
                        
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: '#2d3748',
                            mb: 2,
                          }}
                        >
                          Location Found!
                        </Typography>
                        
                        <Paper
                          sx={{
                            p: 3,
                            mb: 3,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: '#2d3748',
                              fontWeight: 500,
                              mb: 1,
                            }}
                          >
                            📍 {locationData.address?.formatted || 'Location detected'}
                          </Typography>
                          
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#718096',
                            }}
                          >
                            Lat: {locationData.latitude?.toFixed(6)}, Lng: {locationData.longitude?.toFixed(6)}
                          </Typography>
                        </Paper>

                        <Button
                          variant="contained"
                          onClick={handleContinue}
                          sx={{
                            py: 1.5,
                            px: 4,
                            mr: 1,
                            // mb: 2,
                            background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            borderRadius: '12px',
                            boxShadow: '0 6px 20px rgba(86, 169, 217, 0.3)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            textTransform: 'none',
                            minWidth: '180px',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)',
                              boxShadow: '0 8px 28px rgba(86, 169, 217, 0.4)',
                              transform: 'translateY(-2px)',
                            },
                            '&:active': {
                              transform: 'translateY(-1px)',
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
                              left: '100%',
                            },
                          }}
                        >
                          Continue
                        </Button>

                        <Button
                          variant="text"
                          onClick={handleGetLocationAgain}
                          sx={{
                            py: 1,
                            px: 3,
                            color: '#667eea',
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            textTransform: 'none',
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: 'rgba(102, 126, 234, 0.05)',
                              color: '#5a6fd8',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Get Location Again
                        </Button>
                      </Box>
                    )}

                    {locationStatus === 'error' && (
                      <Box sx={{ textAlign: 'center' }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
                            mb: 3,
                          }}
                        >
                          <MapPin size={28} color="white" />
                        </Box>
                        
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: '#2d3748',
                            mb: 2,
                          }}
                        >
                          Location Access Denied
                        </Typography>
                        
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#718096',
                            mb: 4,
                            lineHeight: 1.6,
                          }}
                        >
                          Location access is required to find nearby service opportunities. Please enable location services and try again.
                        </Typography>
                        
                        <Button
                          onClick={handleAllowLocationAccess}
                          variant="contained"
                          size="large"
                          fullWidth
                          sx={{
                            py: 1.5,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <Navigation size={20} style={{ marginRight: 8 }} />
                          Try Again
                        </Button>

                        <Button
                          variant="text"
                          onClick={handleSkipForNow}
                          sx={{
                            mt: 2,
                            py: 1,
                            px: 3,
                            color: '#718096',
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            textTransform: 'none',
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: 'rgba(113, 128, 150, 0.05)',
                              color: '#2d3748',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Skip for now
                        </Button>
                      </Box>
                    )}
                  </Box>
                </div>
              </div>
            </Fade>
          </Box>
        </Paper>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            borderRadius: 2,
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Step6_Location;