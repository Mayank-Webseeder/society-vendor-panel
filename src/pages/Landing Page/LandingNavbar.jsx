import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

const LandingNavbar = () => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setShowNavbar(true); // Scrolling up
      } else {
        setShowNavbar(false); // Scrolling down
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Services', path: '/services' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(25px)',
        boxShadow: showNavbar 
          ? '0 4px 30px rgba(0, 0, 0, 0.1)' 
          : '0 1px 20px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
        transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
        },
      }}
    >
      <Container maxWidth="xl" className='flex justify-center items-center'>
        <Toolbar
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: { xs: 1, md: 1.5 },
            px: { xs: 0.5, md: 0 },
          }}
        >
          {/* Enhanced Logo */}
          <Typography
            variant="h5"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: '800',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 60%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.3rem', md: '2.1rem' },
              fontFamily: 'Roboto, sans-serif',
              letterSpacing: '0.02em',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: { xs: '-2px', md: '-3px' },
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: { xs: '2px', md: '3px' },
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                borderRadius: '2px',
                opacity: 0.8,
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
              },
            }}
          >
            VELRA
          </Typography>


          {/* Enhanced Navigation Items - Hidden on mobile */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              background: 'rgba(248, 250, 252, 0.8)',
              borderRadius: '20px',
              p: 0.5,
              ml: { xs: 0, xl: 16 },
              border: '1px solid rgba(226, 232, 240, 0.6)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  color: '#64748b',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  px: 2.5,
                  py: 1,
                  borderRadius: '15px',
                  textTransform: 'none',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    color: '#3b82f6',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0%',
                    height: '2px',
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    borderRadius: '1px',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::before': {
                    width: '80%',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>


          {/* Enhanced Login Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 1, md: 1.5 },
              alignItems: 'center',
            }}
          >
            {/* Society login */}
            <Button
              variant="outlined"
              onClick={() => navigate('/society-login')}
              sx={{
                borderColor: '#f97316',
                color: '#f97316',
                px: { xs: 1, md: 3 },
                py: { xs: 0.8, md: 1.2 },
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: { xs: '0.75rem', md: '0.9rem' },
                textTransform: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid #f97316',
                minWidth: { xs: 'auto', md: 'auto' },
                '&:hover': {
                  backgroundColor: '#f97316',
                  color: 'white',
                  borderColor: '#f97316',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.6s ease',
                },
                '&:hover::before': {
                  left: '100%',
                },
              }}
            >
              {/* Shorter text on mobile */}
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'inline' } }}>
                Society Login
              </Box>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'none' } }}>
                Society
              </Box>
            </Button>

            {/* Vendor login */}
            <Button
              variant="outlined"
              onClick={() => navigate('/vendor-login')}
              sx={{
                borderColor: '#3b82f6',
                color: '#3b82f6',
                px: { xs: 1, md: 3 },
                py: { xs: 0.8, md: 1.2 },
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: { xs: '0.75rem', md: '0.9rem' },
                textTransform: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid #3b82f6',
                minWidth: { xs: 'auto', md: 'auto' },
                '&:hover': {
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderColor: '#3b82f6',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.6s ease',
                },
                '&:hover::before': {
                  left: '100%',
                },
              }}
            >
              {/* Shorter text on mobile */}
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'inline' } }}>
                Vendor Login
              </Box>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'none' } }}>
                Vendor
              </Box>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LandingNavbar;
