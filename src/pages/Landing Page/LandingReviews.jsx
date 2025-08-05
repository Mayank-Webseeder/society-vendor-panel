import { Box, Container, Typography, Avatar, Button, Chip, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Star as StarIcon,
  FormatQuote as QuoteIcon,
  Verified as VerifiedIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import dummyReviews from '../../static/dummyData_Reviews';


const LandingReviews = () => {
    
  // Show only first 6 reviews for mobile, 8 for desktop
  const displayReviews = window.innerWidth < 768 
    ? dummyReviews.slice(0, 6) 
    : dummyReviews.slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };


  const ReviewCard = ({ review, index }) => {
    // Truncate review based on screen size - shorter for mobile
    const isMobile = window.innerWidth < 768;
    const maxLength = isMobile ? 100 : 150;
    const truncatedReview = review.review.length > maxLength 
      ? review.review.substring(0, maxLength) + "..."
      : review.review;

    return (
      <motion.div variants={itemVariants}>
        <Paper
          elevation={0}
          sx={{
            mb: { xs: 1.5, md: 2 },
            p: { xs: 2, md: 3 },
            borderRadius: { xs: '12px', md: '16px' },
            border: '1px solid #e2e8f0',
            backgroundColor: 'white',
            position: 'relative',
            overflow: 'hidden',
            height: { xs: '220px', sm: '260px', md: '290px' },
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: { xs: 'translateY(-4px)', md: 'translateY(-8px)' },
              boxShadow: { 
                xs: '0 15px 35px -8px rgba(0, 0, 0, 0.12)',
                md: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' 
              },
              borderColor: '#3b82f6',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: { xs: '3px', md: '4px' },
              background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
            }
          }}
        >
          {/* Quote Icon */}
          <Box sx={{ 
            position: 'absolute', 
            top: { xs: 12, md: 16 }, 
            right: { xs: 12, md: 16 },
            opacity: 0.1,
            transform: 'rotate(180deg)'
          }}>
            <QuoteIcon sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, color: '#3b82f6' }} />
          </Box>

          {/* Rating Stars */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1.5, md: 2 }, gap: 0.5 }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i} 
                sx={{ 
                  fontSize: { xs: '0.9rem', md: '1rem' }, 
                  color: '#fbbf24',
                  filter: 'drop-shadow(0 1px 2px rgba(251, 191, 36, 0.3))'
                }} 
              />
            ))}
            <Typography variant="caption" sx={{ ml: 1, color: '#64748b', fontWeight: '500', fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
              5.0
            </Typography>
          </Box>

          {/* Review Text */}
          <Box sx={{ flex: 1, mb: { xs: 1, md: 3 } }}>
            <Typography
              variant="body2"
              sx={{
                color: '#475569',
                fontSize: { xs: '0.75rem', md: '0.95rem' },
                lineHeight: 1.6,
                fontStyle: 'italic',
                fontWeight: '400',
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitLineClamp: { xs: 3, md: 4 },
                WebkitBoxOrient: 'vertical',
              }}
            >
              "{truncatedReview}"
            </Typography>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%)',
              mb: { xs: 1, md: 2.5 },
            }}
          />

          {/* User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2 } }}>
            <Avatar
              sx={{
                width: { xs: 36, md: 44 },
                height: { xs: 36, md: 44 },
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                color: 'white',
                fontWeight: '600',
                fontSize: { xs: '0.9rem', md: '1rem' },
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
            >
              {review.avatar}
            </Avatar>
            
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: '600',
                    color: '#0f172a',
                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                    lineHeight: 1.2,
                  }}
                >
                  {review.name}
                </Typography>
                <VerifiedIcon sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#3b82f6' }} />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748b',
                  fontSize: { xs: '0.7rem', md: '0.8rem' },
                  lineHeight: 1.3,
                  display: 'block',
                }}
              >
                {review.position}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#94a3b8',
                  fontSize: { xs: '0.65rem', md: '0.75rem' },
                  fontWeight: '500',
                }}
              >
                {review.company}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    );
  };



  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden',
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
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        }}
      />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 3 } }}>
        {/* Enhanced Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 7 } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Chip
                icon={<TrendingUpIcon />}
                label="Customer Reviews"
                sx={{
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  fontWeight: '600',
                  fontSize: { xs: '0.7rem', md: '0.75rem' },
                  mb: { xs: 2, md: 3 },
                  px: { xs: 1.2, md: 1.5 },
                  py: 0.3,
                  '& .MuiChip-icon': {
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    color: '#1e40af'
                  }
                }}
              />
            </motion.div>
            
            <Typography
              variant="h2"
              sx={{
                fontWeight: '800',
                color: '#0f172a',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                lineHeight: 1.1,
                mx: 'auto',
                mb: { xs: 1.5, md: 2 },
                background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                px: { xs: 1, md: 0 },
              }}
            >
              What Our Clients Say
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                maxWidth: { xs: '320px', md: '500px' },
                mx: 'auto',
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                lineHeight: 1.6,
                fontWeight: '400',
                mb: { xs: 2.5, md: 3 },
                px: { xs: 1, md: 0 },
              }}
            >
              Discover why thousands of societies and vendors trust our platform for their daily operations
            </Typography>

            {/* Stats */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: { xs: 2.5, md: 4 }, 
              flexWrap: 'wrap',
              mb: 2
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: '700', color: '#3b82f6', mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                    4.9
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                    Average Rating
                  </Typography>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: '700', color: '#10b981', mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                    2,000+
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                    Happy Customers
                  </Typography>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: '700', color: '#f59e0b', mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                    99%
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                    Satisfaction Rate
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </motion.div>


        {/* Enhanced Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: { xs: 2, md: 3 },
              maxWidth: '1300px',
              mx: 'auto'
            }}
          >
            {displayReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </Box>
        </motion.div>


        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              mt: { xs: 6, md: 8 },
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                color: 'white',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: '12px',
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: '600',
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 35px rgba(59, 130, 246, 0.5)',
                },
              }}
            >
              Get a Demo
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#3b82f6',
                color: '#3b82f6',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: '12px',
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: '600',
                textTransform: 'none',
                borderWidth: '2px',
                backgroundColor: 'white',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: '#1e40af',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                  color: 'white',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)',
                  borderWidth: '2px',
                },
              }}
            >
              Start Your Trial
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingReviews;
