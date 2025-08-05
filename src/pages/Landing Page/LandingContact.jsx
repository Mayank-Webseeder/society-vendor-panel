import { Box, Typography, Container, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { ContactMail as ContactMailIcon } from '@mui/icons-material';
import ContactInformation from './ContactInformation';
import ContactForm from './ContactForm';


const LandingContact = () => {

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 0 },
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
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
          backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Chip
                icon={<ContactMailIcon />}
                label="Get In Touch"
                sx={{
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  fontWeight: '600',
                  fontSize: { xs: '0.7rem', md: '0.75rem' },
                  mb: { xs: 2, md: 3 },
                  px: { xs: 1, md: 1.5 },
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
                fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                lineHeight: { xs: 1.2, md: 1.1 },
                mx: 'auto',
                mb: { xs: 1.5, md: 2 },
                background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Contact Us
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                maxWidth: { xs: '90%', md: '500px' },
                mx: 'auto',
                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.1rem' },
                lineHeight: { xs: 1.5, md: 1.6 },
                fontWeight: '400',
                px: { xs: 1, md: 0 }
              }}
            >
              Ready to transform your society management? Let's discuss how our platform can help you
            </Typography>
          </Box>
        </motion.div>


        {/* Content Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 3, md: 6 },
              maxWidth: '1200px',
              mx: 'auto',
            }}
          >
            {/* Left Side - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <ContactInformation />
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <ContactForm />
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingContact;
