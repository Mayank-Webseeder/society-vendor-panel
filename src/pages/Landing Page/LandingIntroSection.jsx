import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { Star as StarIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import { EmojiEvents as MedalIcon } from '@mui/icons-material';


const LandingIntroSection = () => {

  const navigate = useNavigate();

  // Stats data - customize these for VELRA
  const stats = [
    {
      icon: <StarIcon sx={{ fontSize: 24, color: '#f59e0b' }} />,
      rating: '4.8',
      reviews: '2,500+ Reviews',
      label: 'Trusted Platform',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 24, color: '#10b981' }} />,
      rating: '',
      reviews: '10,000+ Users',
      label: 'Growing Community',
    },
    {
      icon: <MedalIcon sx={{ fontSize: 24, color: '#3b82f6' }} />, // Changed icon to medal
      rating: '',
      reviews: 'Award-Winning',
      label: 'Community Platform',
    },
  ];


  return (
    <Box
      sx={{
        // minHeight: '90vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 20%, #cbd5e1 100%)',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 4, md: 6 },
        pb: { xs: 6, md: 8 },
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            {/* Stats Bar */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 4, md: 8 },
                mb: { xs: 4, md: 6 },
                flexWrap: 'wrap',
              }}
            >
              {stats.map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: { xs: 2, md: 3 },
                    py: 1,
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {stat.icon}
                  {stat.rating && (
                    <span style={{ color: '#f59e0b', marginRight: '4px' }}>
                      {stat.rating}
                    </span>
                  )}
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: '600',
                        color: '#1e293b',
                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                        lineHeight: 1.2,
                      }}
                    >
                      
                      {stat.reviews}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#64748b',
                        fontSize: { xs: '0.7rem', md: '0.75rem' },
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Main Heading */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: '800',
                color: '#1e293b',
                mb: { xs: 3, md: 4 },
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                lineHeight: { xs: 1.1, md: 1.05 },
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              #1 Rated Community
              <br />
              Services Platform
            </Typography>

            {/* Subheading */}
            <Typography
              variant="h5"
              sx={{
                color: '#64748b',
                maxWidth: '700px',
                mx: 'auto',
                mb: { xs: 4, md: 6 },
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: '400',
              }}
            >
              One Easy-to-Use Platform for Everything Community Services
            </Typography>

            {/* Service Categories Grid */}
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              justifyContent="center"
              sx={{ mb: { xs: 4, md: 6 } }}
            >
              {[
                { title: 'Home Services', icon: '🏠' },
                { title: 'Maintenance & Repair', icon: '🔧' },
                { title: 'Security & Safety', icon: '🛡️' },
                { title: 'Vendor Management', icon: '📋' },
                { title: 'Pricing Drops', icon: '💰' },
                { title: 'Emergency Support', icon: '🚨' },
              ].map((service, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <Box
                      sx={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '15px',
                        p: { xs: 2, md: 3 },
                        textAlign: 'center',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(226, 232, 240, 0.5)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        height: { xs: '120px', md: '140px' },
                        width: { xs: '150px', md: '170px'},
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                          background: 'rgba(255, 255, 255, 0.95)',
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '1.5rem', md: '2rem' },
                          mb: 1,
                        }}
                      >
                        {service.icon}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: '600',
                          color: '#3b82f6',
                          fontSize: { xs: '0.8rem', md: '0.9rem' },
                          lineHeight: 1.3,
                          textAlign: 'center',
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/auth')}
                sx={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: 'white',
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  borderRadius: '30px',
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  fontWeight: '600',
                  textTransform: 'none',
                  boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(249, 115, 22, 0.4)',
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {/* Stats Box - Similar to the reference */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '20px',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '700',
                  color: '#1e293b',
                  mb: 1,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                }}
              >
                Community Manager Dashboard
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  mb: 3,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }}
              >
                Service Provider - Residential Services Overview
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                      borderRadius: '12px',
                      p: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: '#3b82f6', fontWeight: '500', mb: 0.5 }}
                    >
                      Active Services
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: '#1e40af', fontWeight: '700' }}
                    >
                      2,450
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                      borderRadius: '12px',
                      p: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: '#16a34a', fontWeight: '500', mb: 0.5 }}
                    >
                      Satisfied Users
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: '#15803d', fontWeight: '700' }}
                    >
                      98.5%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                      borderRadius: '12px',
                      p: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: '#d97706', fontWeight: '500', mb: 0.5 }}
                    >
                      Response Time
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: '#b45309', fontWeight: '700' }}
                    >
                      &lt;2hrs
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div> */}
      </Container>
    </Box>
  );
};

export default LandingIntroSection;