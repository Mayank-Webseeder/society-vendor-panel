import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import dummyReviews from '../../static/dummyData_Reviews';


const LandingReviews = () => {
    
  // Show only first 8 reviews for clean layout
  const displayReviews = dummyReviews.slice(0, 8);

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
    // Truncate review if it's too long (limit to ~150 characters)
    const truncatedReview = review.review.length > 150 
      ? review.review.substring(0, 150) + "..."
      : review.review;

    return (
      <motion.div variants={itemVariants}>
        <Card
          sx={{
            mb: 2,
            pt: { xs: 2, md: 2.5 },
            px: { xs: 2, md: 2.5 },
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            height: { xs: '250px', md: '300px' }, // Fixed height
            width: '100%', // Fixed width
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Avatar at Top */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                }}
              >
                {review.avatar}
              </Avatar>
            </Box>

            {/* Quote - Fixed height container */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#475569',
                  fontSize: { xs: '0.8rem', md: '0.85rem' },
                  lineHeight: 1.4,
                  fontStyle: 'italic',
                  textAlign: 'center',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  height: 80,
                  WebkitLineClamp: 4, // Limit to 4 lines
                  WebkitBoxOrient: 'vertical',
                }}
              >
                "{truncatedReview}"
              </Typography>
            </Box>

            {/* Horizontal Line */}
            <Box
              sx={{
                width: '100%',
                height: '1px',
                backgroundColor: '#e2e8f0',
                mb: 2,
              }}
            />

            {/* Name and Designation - Fixed at bottom */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '600',
                  color: '#3b82f6',
                  fontSize: { xs: '0.9rem', md: '0.95rem' },
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                {review.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#94a3b8',
                  fontSize: { xs: '0.75rem', md: '0.8rem' },
                  lineHeight: 1.3,
                }}
              >
                {review.position}, {review.company}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    );
  };




  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: '#f8fafc',
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: '700',
                color: '#1e293b',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              What Our Clients Say
            </Typography>
          </Box>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-7xl mx-auto">
            {displayReviews.map((review, index) => (
              <div key={review.id}>
                <ReviewCard review={review} index={index} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
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
                backgroundColor: '#1e40af',
                color: 'white',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: '8px',
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: '600',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#1e3a8a',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(30, 64, 175, 0.4)',
                },
              }}
            >
              Get a Demo
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#1e40af',
                color: '#1e40af',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: '8px',
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: '600',
                textTransform: 'none',
                borderWidth: '2px',
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#1e3a8a',
                  backgroundColor: '#1e3a8a',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(30, 64, 175, 0.3)',
                  borderWidth: '2px',
                },
              }}
            >
              Start Free Trial
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingReviews;
