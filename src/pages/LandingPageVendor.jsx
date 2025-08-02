import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Badge as BadgeIcon,
  Groups as GroupsIcon,
  Star as StarIcon,
  Support as SupportIcon,
  Analytics as AnalyticsIcon,
  MonetizationOn as MonetizationOnIcon,
  // Business as BusinessIcon
} from '@mui/icons-material';


const LandingPageVendor = () => {

  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const benefits = [
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: '#3B82F6' }} />,
      title: 'Access to Large Customer Base',
      description: 'Connect with thousands of residents across multiple societies and communities',
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 40, color: '#F59E0B' }} />,
      title: 'Priority Visibility',
      description: 'Get priority visibility in nearby societies and stand out from competitors',
    },
    {
      icon: <BadgeIcon sx={{ fontSize: 40, color: '#8B5CF6' }} />,
      title: 'Verified Vendor Badge',
      description: 'Build trust with customers through our verified vendor badge system',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#10B981' }} />,
      title: 'Direct Leads from Communities',
      description: 'Receive high-quality leads directly from residential communities',
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: '#EF4444' }} />,
      title: 'Premium Features Access',
      description: 'Unlock all premium features to maximize your business potential',
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40, color: '#06B6D4' }} />,
      title: 'Dedicated Support Team',
      description: 'Get assistance from our dedicated vendor support team whenever needed',
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: '#84CC16' }} />,
      title: 'Business Analytics & Insights',
      description: 'Access detailed insights and analytics to grow your business strategically',
    },
    {
      icon: <MonetizationOnIcon sx={{ fontSize: 40, color: '#EC4899' }} />,
      title: 'Fixed Yearly Subscription',
      description: 'One transparent yearly subscription plan covering all your business requirements',
    },
    // {
    //   icon: <BusinessIcon sx={{ fontSize: 40, color: '#6366F1' }} />,
    //   title: 'Brand Visibility Enhancement',
    //   description: 'Increase your brand visibility and reach across target demographics',
    // },
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
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
          transform: 'skewX(15deg)',
          transformOrigin: 'top',
        }}
      />
      {/* Professional corner accents */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(50%, -50%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(-50%, 50%)',
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
              py: { xs: 2, md: 3 },
              px: { xs: 0.5, md: 2 },
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
                fontSize: { xs: '1.5rem', md: '3rem' },
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
                  px: { xs: 2, md: 3 },
                  py: { xs: 0.5, md: 1 },
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
                  px: { xs: 2, md: 3 },
                  py: { xs: 0.5, md: 1 },
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
                {window.innerWidth < 600 ? 'SignUp' : 'Get Started'}
              </Button>
            </Box>
          </Box>
        </Container>
      </motion.div>

      {/* Main Content */}
      <Container sx={{ flex: 1, py: 4 }}>
        {/* Heading & Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 3, sm: 6 }, px: { xs: 1, sm: 2 } }}>
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                fontWeight: '700',
                color: 'white',
                mb: { xs: 1.5, sm: 3 },
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem', xl: '3.5rem' },
                lineHeight: { xs: 1.3, md: 1.2 },
                letterSpacing: '-0.02em',
                maxWidth: { xs: '350px', sm: '600px', md: '800px', xl: '1000px' }
              }}
            >
              Grow Your Business with VELRA
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: { xs: '280px', sm: '400px', md: '600px', xl: '700px' },
                mx: 'auto',
                lineHeight: { xs: 1.5, md: 1.6 },
                fontSize: { xs: '0.85rem', sm: '1rem', md: '1.2rem', xl: '1.3rem' },
                fontWeight: '400',
              }}
            >
              {window.innerWidth < 600
                ? 'Partner with us to reach a wider audience and enhance your brand visibility.'
                : 'Partner with us to reach a wider audience, increase your sales, and enhance your brand visibility across residential communities.'}
            </Typography>
          </Box>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
        >
          <Grid container justifyContent={{ xs: 'center', xl: 'space-around' }} rowSpacing={{ xs: 2, xl: 5 }} columnSpacing={{ xs: 2, xl: 7 }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={6} sm={6} md={4} xl={4} key={index}>
                <motion.div variants={itemVariants} className='flex justify-center items-center'>
                  <Card
                    sx={{
                      height: { xs: 145, sm: '100%' },
                      width: { xs: '100%', sm: 'auto' },
                      minWidth: { xs: 180, sm: 300, md: 500, xl: 500 },
                      maxWidth: { xs: 180, sm: 500, xl: 500 },
                      minHeight: { xs: 140, sm: 180, md: 255, xl: 255 },
                      background: 'linear-gradient(145deg, rgba(245,245,245,1) 0%, rgba(230,230,230,1) 100%)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: { xs: '10px', sm: '12px', md: '16px' },
                      border: '1px solid rgba(148,163,184,0.1)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      boxShadow: '0 4px 25px rgba(15,23,42,0.08), 0 0 0 1px rgba(255,255,255,0.05)',
                      position: 'relative',
                      overflow: 'hidden',
                      p: { xs: 1, sm: 2, xl: 0 },
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
                    <CardContent sx={{ p: { xs: 1, sm: 4, xl: 4 }, textAlign: 'center', position: 'relative' }}>
                      <Box 
                        sx={{ 
                          mb: 3,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: { xs: '60px', sm: '80px'},
                          height: { xs: '60px', sm: '80px'},
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
                          fontSize: { xs: '0.85rem', sm: '1rem', md: '1.25rem', xl: '1.25rem' },
                          lineHeight: 1.3,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      {window.innerWidth >= 600 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#64748b',
                            lineHeight: { xs: 1.4, xl: 1.7 },
                            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.95rem', xl: '0.95rem' },
                            fontWeight: '400',
                          }}
                        >
                          {benefit.description}
                        </Typography>
                      )}
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
              justifyContent: 'space-between',
              py: { xs: 2, sm: 4 },
              px: { xs: 0.5, sm: 4 },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate('/society-landing')}
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                px: { xs: 2, md: 4 },
                py: { xs: 1, md: 1.5 },
                textAlign: 'center',
                borderRadius: '8px',
                fontSize: { xs: '0.9rem', md: '1rem' },
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
              <span className='mr-2 pb-0.5'>←</span>{window.innerWidth < 600 ? 'GO BACK' : 'Explore Society Services'}
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate('/auth', { state: { isLogin: false } })}
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                px: { xs: 2, md: 4 },
                py: { xs: 1, md: 1.5 },
                borderRadius: '8px',
                fontSize: { xs: '0.9rem', md: '1rem' },
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
              {window.innerWidth < 600 ? 'BEGIN JOURNEY' : 'START YOUR JOURNEY'} <span className='ml-2 pb-0.5'>→</span>
            </Button>
          </Box>
        </Container>
      </motion.div>
    </Box>
  );
};

export default LandingPageVendor;