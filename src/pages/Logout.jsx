import { useState } from 'react';
import { Box, Typography, Button, Modal, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Logout = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleYes = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = '/auth'; // Forces a full reload and clears history
    }, 2000);
  };

  const handleNo = () => {
    navigate('/', { replace: true }); // Redirect to home/dashboard, not back
  };

  return (
    <Modal open={true} onClose={handleNo}>
      <Box
        sx={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            minWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {loading ? (
            <>
              <CircularProgress sx={{ color: '#56A9D9', mb: 2 }} size={48} thickness={4} />
              <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 600, color: '#56A9D9' }}>
                Logging you out...
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
                Are you sure you want to log out?
              </Typography>
              <Box sx={{ display: 'flex', gap: 5 }}>
                <Button variant="contained" sx={{ bgcolor: '#56A9D9', '&:hover': { bgcolor: '#1976D2' } }} onClick={handleYes}>
                  Yes
                </Button>
                <Button variant="outlined" onClick={handleNo}>
                  No
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default Logout;