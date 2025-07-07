import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Snackbar, Alert } from '@mui/material';
import { useOnBoarding } from './OnboardingContext';
import logoWhite from '../../assets/logoWhite.png';
import findLocation from '../../assets/findLocation.png';



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
          overflow: 'hidden',
        }}
      >

        {/* Debugging Purposes */}
        {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        {/* Page-Content */}
        <div className='w-full h-full rounded-xl p-8 sm:p-12 flex flex-col items-center justify-center bg-white'>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: 'rgba(0,0,0,0.69)',
              mb: { xs: 4, sm: 6 },
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
              textAlign: 'center',
            }}
          >
            Help Us Find Your Location
          </Typography>

          <Button
            variant="contained"
            onClick={handleAllowLocationAccess}
            sx={{
              py: '12px',
              px: '30px',
              bgcolor: '#56A9D9',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: '#42A5F5',
              },
              mb: { xs: 6, sm: 8 },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              textTransform: 'none',
            }}
          >
            Allow Location Access
          </Button>

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
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>

          {/* Image */}
          <div className='flex-1 flex items-center justify-center'>
            <img
              src={findLocation}
              alt="Illustration"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};


export default Step6_Location;