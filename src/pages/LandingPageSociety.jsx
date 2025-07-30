import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, Grid, Card, CardContent, Fade, Grow } from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  // PeopleRounded as PeopleRoundedIcon,
  // Community as CommunityIcon,
  Security as SecurityIcon,
  Handshake as HandshakeIcon,
  Event as EventIcon,
  Discount as DiscountIcon,
  Support as SupportIcon,
  Badge as BadgeIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Groups as GroupsIcon
} from '@mui/icons-material';

const LandingPageSociety = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const benefits = [
    {
      icon: <EventIcon sx={{ fontSize: 40, color: '#3B82F6' }} />,
      title: 'Community Events & Workshops',
      description: 'Access exclusive community events and skill-building workshops',
    },
    // {
    //   icon: <HandshakeIcon sx={{ fontSize: 40, color: '#10B981' }} />,
    //   title: 'Local Leader Networking',
    //   description: 'Connect and network with influential local community leaders',
    // },
    {
      icon: <DiscountIcon sx={{ fontSize: 40, color: '#F59E0B' }} />,
      title: 'Exclusive Discounts',
      description: 'Get special discounts on services and products from verified vendors',
    },
    {
      icon: <BadgeIcon sx={{ fontSize: 40, color: '#8B5CF6' }} />,
      title: 'Verified Trusted Services',
      description: 'Access only verified and trusted vendors for all your service needs',
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40, color: '#EF4444' }} />,
      title: 'Streamlined Communication',
      description: 'Easy and direct communication channels with service vendors',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#06B6D4' }} />,
      title: 'Emergency Support',
      description: 'Quick access to emergency services and round-the-clock support',
    },
    {
      icon: <BadgeIcon sx={{ fontSize: 40, color: '#84CC16' }} />,
      title: 'Enhanced Security',
      description: 'Verified vendor badges ensure enhanced security and trust',
    },
    // {
    //   icon: <SettingsIcon sx={{ fontSize: 40, color: '#F97316' }} />,
    //   title: 'Customizable Packages',
    //   description: 'Tailored service packages designed specifically for societies',
    // },
    {
      icon: <NotificationsIcon sx={{ fontSize: 40, color: '#EC4899' }} />,
      title: 'Local Updates',
      description: 'Stay informed with regular updates on local events and initiatives',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: '#6366F1' }} />,
      title: 'Connected Community',
      description: 'Build stronger bonds and create a more connected neighborhood',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 30%, #1e1b4b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Professional grid pattern overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      {/* Subtle geometric accent */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
          transform: 'skewX(-15deg)',
          transformOrigin: 'top',
        }}
      />

      {/* Professional corner accents */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(50%, 50%)',
        }}
      />

        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 3,
                px: 2,
              }}
            >
              {/* VELRA branding */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: '700',
                  background: 'linear-gradient(90deg, #ffffff, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontFamily: 'Roboto, sans-serif',
                  letterSpacing: '0.1em',
                  textAlign: 'center',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    height: '2px',
                    background: 'linear-gradient(90deg, #60a5fa, #ffffff)',
                    borderRadius: '1px',
                  },
                }}
              >
                VELRA
              </Typography>

              {/* Login / SignUp buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/auth')}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderColor: 'rgba(255,255,255,0.5)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 20px rgba(59,130,246,0.2)',
                    },
                  }}
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate('/auth', { state: { isLogin: false } })}
                  sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(59,130,246,0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 25px rgba(59,130,246,0.4)',
                    },
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
          </Container>
        </motion.div>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: '700',
                  color: 'white',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                Effortless Services for a Better Living
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontWeight: '400',
                }}
              >
                Discover a wide range of trusted services tailored to meet your society's unique needs, ensuring convenience and quality for every member.
              </Typography>
            </Box>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
          >
            <Grid container justifyContent='space-between' spacing={7}>
              {benefits.map((benefit, index) => (
                <Grid item minWidth={485} xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={itemVariants} className='flex justify-center items-center'>
                    <Card
                      sx={{
                        height: '100%',
                        width: '100%',
                        width: 500,
                        minHeight: 255,
                        background: 'linear-gradient(145deg, rgba(245,245,245,1) 0%, rgba(230,230,230,1) 100%)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(148,163,184,0.1)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        boxShadow: '0 4px 25px rgba(15,23,42,0.08), 0 0 0 1px rgba(255,255,255,0.05)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover': {
                          transform: 'translateY(-6px)',
                          boxShadow: '0 20px 60px rgba(15,23,42,0.15), 0 0 0 1px rgba(59,130,246,0.1)',
                          background: 'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 100%)',
                          borderColor: 'rgba(59,130,246,0.15)',
                          '&::before': {
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative' }}>
                        <Box 
                          sx={{ 
                            mb: 3,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                            margin: '0 auto 24px auto',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          }}
                        >
                          {benefit.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: '700',
                            color: '#0f172a',
                            mb: 2,
                            fontSize: '1.25rem',
                            lineHeight: 1.3,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {benefit.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#64748b',
                            lineHeight: 1.7,
                            fontSize: '0.95rem',
                            fontWeight: '400',
                          }}
                        >
                          {benefit.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* Footer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                py: 4,
                px: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate('/vendor-landing')}
                sx={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(59,130,246,0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 25px rgba(59,130,246,0.4)',
                  },
                }}
              >
                Explore Vendor Solutions <span className='ml-2 pb-0.5'>→</span>
              </Button>
            </Box>
          </Container>
        </motion.div>

        <style>
          {`
            /* Removed all childish animations - clean and professional */
          `}
        </style>
    </Box>
  );
};

export default LandingPageSociety;