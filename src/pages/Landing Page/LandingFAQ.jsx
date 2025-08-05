import { useState } from 'react';
import { Box, Container, Typography, Collapse, IconButton, Chip, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import dummyFAQs from '../../static/dummyData_LandingFAQs';


const LandingFAQ = () => {
    
  const [expandedId, setExpandedId] = useState(null);

  const handleToggleExpand = (id) => {
    setExpandedId(prevId => (prevId === id ? null : id));
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

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
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
                icon={<HelpIcon />}
                label="Frequently Asked Questions"
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
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.5rem', lg: '3rem' },
                lineHeight: { xs: 1.2, md: 1.1 },
                mx: 'auto',
                mb: { xs: 1.5, md: 2 },
                background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Got Questions?
              <br />
              We've Got Answers
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
              Find answers to common questions about our society and vendor management platform
            </Typography>
          </Box>
        </motion.div>


        {/* Enhanced FAQ List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ maxWidth: { xs: '100%', md: '1000px' }, mx: 'auto' }}>
            <AnimatePresence>
              {dummyFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      mb: { xs: 1.5, md: 2 },
                      borderRadius: { xs: '8px', md: '12px' },
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: expandedId === faq.id ? '#3b82f6' : '#e2e8f0',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: '#3b82f6',
                        transform: { xs: 'none', md: 'translateY(-1px)' },
                        boxShadow: { xs: 'none', md: '0 8px 20px rgba(59, 130, 246, 0.12)' },
                      },
                    }}
                  >
                    <Box
                      onClick={() => handleToggleExpand(faq.id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        py: { xs: 1.5, md: 2.5 },
                        px: { xs: 2, md: 3 },
                        backgroundColor: expandedId === faq.id ? '#f8fafc' : 'white',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        minHeight: { xs: '60px', md: 'auto' },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 }, flex: 1 }}>
                        <Box
                          sx={{
                            p: { xs: 0.5, md: 0.75 },
                            borderRadius: { xs: '6px', md: '8px' },
                            backgroundColor: expandedId === faq.id ? '#3b82f6' : '#dbeafe',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: { xs: 24, md: 30 },
                            height: { xs: 24, md: 30 },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <CheckCircleIcon 
                            sx={{ 
                              fontSize: { xs: '0.875rem', md: '1rem' }, 
                              color: expandedId === faq.id ? 'white' : '#3b82f6'
                            }} 
                          />
                        </Box>
                        
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            // border: '2px solid red',
                            fontWeight: '700', 
                            color: expandedId === faq.id ? '#3b82f6' : '#0f172a',
                            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                            lineHeight: { xs: 1.3, md: 1.4 },
                            transition: 'color 0.3s ease',
                            pr: { xs: 1, md: 0 },
                          }}
                        >
                          {faq.question}
                        </Typography>
                      </Box>
                      
                      <motion.div
                        animate={{ 
                          rotate: expandedId === faq.id ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box
                          sx={{
                            p: { xs: 0.5, md: 0.75 },
                            borderRadius: { xs: '4px', md: '6px' },
                            backgroundColor: expandedId === faq.id ? '#3b82f6' : '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: { xs: 28, md: 32 },
                            height: { xs: 28, md: 32 },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <ExpandMoreIcon 
                            sx={{ 
                              fontSize: { xs: '1.1rem', md: '1.25rem' }, 
                              color: expandedId === faq.id ? 'white' : '#64748b'
                            }} 
                          />
                        </Box>
                      </motion.div>
                    </Box>
                    
                    <Collapse in={expandedId === faq.id} timeout={400}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: expandedId === faq.id ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: expandedId === faq.id ? 0.2 : 0 }}
                      >
                        <Box 
                          sx={{ 
                            px: { xs: 2, md: 3 },
                            pb: { xs: 2, md: 3 },
                            pt: { xs: 0.5, md: 0.75 },
                            backgroundColor: '#f8fafc',
                            borderTop: '1px solid #e2e8f0',
                          }}
                        >
                          <Box sx={{ ml: { xs: 3, md: 4 } }}>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                color: '#475569',
                                fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.95rem' },
                                lineHeight: { xs: 1.5, md: 1.6 },
                                fontWeight: '400',
                              }}
                            >
                              {faq.answer}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    </Collapse>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingFAQ;
