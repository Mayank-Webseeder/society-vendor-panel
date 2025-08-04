import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

const LandingNavbar = () => {
  const navigate = useNavigate();

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
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 1px 20px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
      }}
    >
      <Container maxWidth="xl" className='flex justify-center items-center'>
        <Toolbar
          sx={{
            // border: '2px solid green',
            width: { xs: '100%', sm: '90%' },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: { xs: 1, md: 1.5 },
            px: { xs: 1, md: 0 },
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: '700',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontFamily: 'Roboto, sans-serif',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-2px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                height: '2px',
                background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                borderRadius: '1px',
                opacity: 0.7,
              },
            }}
          >
            VELRA
          </Typography>

          {/* Navigation Items - Hidden on mobile */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  color: '#64748b',
                  fontWeight: '500',
                  fontSize: '0.95rem',
                  px: 2,
                  py: 1,
                  borderRadius: '8px',
                  textTransform: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Login Button */}
          <Button
            variant="contained"
            onClick={() => navigate('/auth')}
            sx={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: 'white',
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.2 },
              borderRadius: '25px',
              fontWeight: '600',
              fontSize: { xs: '0.9rem', md: '1rem' },
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px rgba(249, 115, 22, 0.4)',
              },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LandingNavbar;
