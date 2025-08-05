import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Star as StarIcon, 
  TrendingUp as TrendingUpIcon,
  EmojiEvents as MedalIcon,
  HomeWork as HomeIcon,
  Build as MaintenanceIcon,
  Security as SecurityIcon,
  Assignment as VendorIcon,
  TrendingDown as PricingIcon,
  Emergency as EmergencyIcon
} from '@mui/icons-material';


const LandingIntroSection = () => {

  const navigate = useNavigate();

  // Stats data - customize these for VELRA
  const stats = [
    {
      icon: <StarIcon sx={{ fontSize: 20, color: '#f59e0b' }} />,
      rating: '4.8',
      reviews: '2,500+ Reviews',
      label: 'Trusted Platform',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 20, color: '#10b981' }} />,
      rating: '',
      reviews: '10,000+ Users',
      label: 'Growing Community',
    },
    {
      icon: <MedalIcon sx={{ fontSize: 20, color: '#3b82f6' }} />, // Changed icon to medal
      rating: '',
      reviews: 'Award-Winning',
      label: 'Community Platform',
    },
  ];


  return (
    <Box
      sx={{
        minHeight: '70vh',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #e2e8f0 70%, #cbd5e1 100%)',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 2, md: 5 },
        pb: { xs: 5, md: 7 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Enhanced Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 60% 20%, rgba(249, 115, 22, 0.04) 0%, transparent 30%),
            linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)
          `,
        }}
      />
      
      {/* Floating Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05))',
          opacity: 0.6,
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.05))',
          opacity: 0.6,
          animation: 'float 8s ease-in-out infinite reverse',
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
            {/* Enhanced Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: { xs: 1.5, md: 4 },
                  mb: { xs: 3, md: 6 },
                  flexWrap: 'wrap',
                }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: { xs: 2, md: 3 },
                        py: { xs: 1, md: 1.5 },
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '25px',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(226, 232, 240, 0.6)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                        },
                      }}
                    >
                      {stat.icon}
                      {stat.rating && (
                        <Typography
                          sx={{ 
                            ml: -0.5,
                            color: '#f59e0b', 
                            fontWeight: '700',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                          }}
                        >
                          {stat.rating}
                        </Typography>
                      )}
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: '700',
                            color: '#1e293b',
                            fontSize: { xs: '0.75rem', md: '0.85rem' },
                            lineHeight: 1.2,
                          }}
                        >
                          {stat.reviews}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#64748b',
                            fontSize: { xs: '0.65rem', md: '0.7rem' },
                            fontWeight: '500',
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>


            {/* Enhanced Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: '900',
                  color: '#1e293b',
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '2.2rem', sm: '3rem', md: '3.8rem', lg: '4.2rem' },
                  lineHeight: { xs: 1.1, md: 1.05 },
                  letterSpacing: '-0.03em',
                  background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                }}
              >
                #1 Rated Community
                <br />
                <Box component="span" sx={{ 
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Services Platform
                </Box>
              </Typography>
            </motion.div>


            {/* Enhanced Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#64748b',
                  maxWidth: '700px',
                  mx: 'auto',
                  mb: { xs: 3, md: 7 },
                  lineHeight: 1.6,
                  fontSize: { xs: '0.8rem', md: '1.1rem' },
                  fontWeight: '400',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                One Easy-to-Use Platform for{' '}
                <Box component="span" sx={{ 
                  color: '#3b82f6', 
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Everything Community Services
                </Box>
              </Typography>
            </motion.div>


            {/* Enhanced Service Categories Grid */}
            <Grid
              container
              spacing={{ xs: 1.5, md: 2 }}
              justifyContent="center"
              sx={{ mb: { xs: 5, md: 7 } }}
            >
              {[
                { title: 'Home Services', icon: <HomeIcon sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, color: '#3b82f6' }} />, color: '#3b82f6' },
                { title: 'Maintenance & Repair', icon: <MaintenanceIcon sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, color: '#10b981' }} />, color: '#10b981' },
                { title: 'Security & Safety', icon: <SecurityIcon sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, color: '#f59e0b' }} />, color: '#f59e0b' },
                { title: 'Vendor Management', icon: <VendorIcon sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, color: '#8b5cf6' }} />, color: '#8b5cf6' },
                { title: 'Pricing Drops', icon: <PricingIcon sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, color: '#ef4444' }} />, color: '#ef4444' },
                { title: 'Emergency Support', icon: <EmergencyIcon sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, color: '#f97316' }} />, color: '#f97316' },
              ].map((service, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Box
                      sx={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '16px',
                        p: { xs: 1.5, md: 2.5 },
                        textAlign: 'center',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(226, 232, 240, 0.6)',
                        transition: 'all 0.4s ease',
                        cursor: 'pointer',
                        height: { xs: '100px', md: '120px' },
                        width: { xs: '120px', md: '140px'},
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                          background: 'rgba(255, 255, 255, 0.98)',
                          '&::before': {
                            opacity: 1,
                          }
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: `linear-gradient(135deg, ${service.color}, ${service.color}99)`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        }
                      }}
                    >
                      <Box sx={{ mb: 1 }}>
                        {service.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: '700',
                          color: service.color,
                          fontSize: { xs: '0.75rem', md: '0.85rem' },
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


            {/* Enhanced CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/auth')}
                sx={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 60%, #dc2626 100%)',
                  color: 'white',
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  borderRadius: '30px',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: '700',
                  textTransform: 'none',
                  boxShadow: '0 10px 30px rgba(249, 115, 22, 0.4)',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 60%, #b91c1c 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 45px rgba(249, 115, 22, 0.5)',
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
                Get Started Now
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingIntroSection;