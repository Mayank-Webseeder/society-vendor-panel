import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Snackbar, Alert, Box, Container } from '@mui/material';
import { useOnBoarding } from './OnboardingContext';
import logoWhite from '../../assets/logoWhite.png';
// import findLocation from '../../assets/findLocation.png';

const Step6_Location = () => {
  const { updateOnboardingData, onboardingData } = useOnBoarding();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleAllowLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          updateOnboardingData({ currentLocation: coords });
          setSnackbar({ open: true, message: 'Location fetched successfully!', severity: 'success' });
          setTimeout(() => navigate('/auth/onboarding/verify-number', { replace: true }), 1000);
        },
        (error) => {
          updateOnboardingData({ currentLocation: 'Location not available' });
          setSnackbar({ open: true, message: 'Failed to fetch location.', severity: 'error' });
          setTimeout(() => navigate('/auth/onboarding/verify-number', { replace: true }), 1200);
        }
      );
    } else {
      updateOnboardingData({ currentLocation: 'Geolocation not supported' });
      setSnackbar({ open: true, message: 'Geolocation not supported by your browser.', severity: 'warning' });
      setTimeout(() => navigate('/auth/onboarding/verify-number', { replace: true }), 3000);
    }
  };

  const handleSkipForNow = () => {
    updateOnboardingData({ currentLocation: 'Skipped by user' });
    // navigate('/auth/onboarding/verify-number', { replace: true });
    navigate('/auth/onboarding/verify-number');
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
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        }}
      >

        {/* Debugging Purposes */}
        <pre>{JSON.stringify(onboardingData, null, 2)}</pre>

        {/* Page-Content */}
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
          {/* Main Content Container */}
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
                margin: '0 auto',
                mb: 3,
                boxShadow: '0 8px 32px rgba(86, 169, 217, 0.3)',
              }}
            >
              <Box
                component="svg"
                width="40"
                height="40"
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

            {/* Main Heading */}
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

            {/* Subtitle */}
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

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 4 }}>
              <Button
                variant="contained"
                onClick={handleAllowLocationAccess}
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
                }}
              >
                Allow Location Access
              </Button>

              <Button
                variant="text"
                onClick={handleSkipForNow}
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
                }}
              >
                Skip for now
              </Button>
            </Box>

            {/* Security Note */}
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
                <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
                <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#56A9D9',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                Your location data is secure and encrypted
              </Typography>
            </Box> */}
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

        {/* Snackbar Alert */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={1200}
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