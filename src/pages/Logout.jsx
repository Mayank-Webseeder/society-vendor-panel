import { useState } from 'react';
import { Box, Typography, Button, Modal, CircularProgress, Fade, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LogOut, CheckCircle2, ArrowLeft } from 'lucide-react';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleYes = () => {
    setLoading(true);
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        logout();
        //localStorage.clear();    // if you want to clear everything
        navigate('/auth', { replace: true });    //use navigate for SPA redirect
      }, 1500);
    }, 1500);
  };

  const handleNo = () => {
    navigate('/', { replace: true });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: { xs: '3rem', sm: '4rem', md: '5rem' },
        width: { xs: 'calc(100vw - 3rem)', sm: 'calc(100vw - 4rem)', md: 'calc(100vw - 5rem)' },
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
        background: 'linear-gradient(135deg, rgba(86, 169, 217, 0.1) 0%, rgba(25, 118, 210, 0.2) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <Fade in timeout={500}>
        <Box
          sx={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            p: 5,
            minWidth: 420,
            maxWidth: 480,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #56A9D9 0%, #1976D2 100%)',
            }
          }}
        >
          {loading && !showSuccess ? (
            <Slide direction="up" in timeout={300}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Box sx={{ position: 'relative' }}>
                  <CircularProgress 
                    sx={{ 
                      color: '#56A9D9',
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      }
                    }} 
                    size={64} 
                    thickness={3}
                  />
                  <LogOut 
                    size={24} 
                    style={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)',
                      color: '#56A9D9'
                    }} 
                  />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    textAlign: 'center', 
                    fontWeight: 500,
                    color: '#1976D2',
                    fontSize: '1.1rem'
                  }}
                >
                  Signing you out...
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textAlign: 'center', 
                    color: '#666',
                    fontSize: '0.9rem'
                  }}
                >
                  Please wait while we securely log you out
                </Typography>
              </Box>
            </Slide>
          ) : showSuccess ? (
            <Slide direction="up" in timeout={300}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Box 
                  sx={{ 
                    width: 64, 
                    height: 64, 
                    borderRadius: '50%', 
                    backgroundColor: '#4CAF50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse 1.5s infinite'
                  }}
                >
                  <CheckCircle2 size={32} color="white" />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    textAlign: 'center', 
                    fontWeight: 500,
                    color: '#4CAF50',
                    fontSize: '1.1rem'
                  }}
                >
                  Successfully logged out!
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textAlign: 'center', 
                    color: '#666',
                    fontSize: '0.9rem'
                  }}
                >
                  Redirecting you to login page...
                </Typography>
              </Box>
            </Slide>
          ) : (
            <Slide direction="up" in timeout={300}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Box 
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      borderRadius: '50%', 
                      backgroundColor: 'rgba(86, 169, 217, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(86, 169, 217, 0.2)'
                    }}
                  >
                    <LogOut size={28} color="#56A9D9" />
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      textAlign: 'center', 
                      fontWeight: 600,
                      color: '#1A1A1A',
                      fontSize: '1.4rem'
                    }}
                  >
                    Confirm Logout
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      textAlign: 'center', 
                      color: '#666',
                      fontSize: '1rem',
                      lineHeight: 1.5,
                      maxWidth: '320px'
                    }}
                  >
                    Are you sure you want to sign out? You'll need to enter your credentials again to access your account.
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, width: '100%', mt: 1 }}>
                  <Button 
                    variant="contained"
                    onClick={handleYes}
                    sx={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #56A9D9 0%, #1976D2 100%)',
                      color: 'white',
                      fontWeight: 600,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: '0 8px 16px rgba(86, 169, 217, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
                        boxShadow: '0 12px 24px rgba(86, 169, 217, 0.4)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Yes, Sign Out
                  </Button>
                  <Button 
                    variant="outlined"
                    onClick={handleNo}
                    startIcon={<ArrowLeft size={18} />}
                    sx={{
                      flex: 1,
                      borderColor: 'rgba(86, 169, 217, 0.3)',
                      color: '#56A9D9',
                      fontWeight: 600,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      borderWidth: '2px',
                      '&:hover': {
                        borderColor: '#56A9D9',
                        backgroundColor: 'rgba(86, 169, 217, 0.05)',
                        borderWidth: '2px',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Slide>
          )}
        </Box>
      </Fade>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </Box>
  );
};

export default Logout;