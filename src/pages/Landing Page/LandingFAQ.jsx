import { useState } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dummyFAQs from '../../static/dummyData_LandingFAQs';


const LandingFAQ = () => {
    
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        py: { xs: 6, md: 10 },
        backgroundColor: '#f8fafc',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
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
                color: '#3b82f6',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Frequently Asked Questions
            </Typography>
          </Box>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
            {dummyFAQs.map((faq, index) => (
              <motion.div key={faq.id} variants={itemVariants}>
                <Accordion
                  expanded={expanded === `panel${faq.id}`}
                  onChange={handleChange(`panel${faq.id}`)}
                  sx={{
                    mb: 2,
                    borderRadius: '8px !important',
                    border: '1px solid #e2e8f0',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                    '&:before': {
                      display: 'none',
                    },
                    '&.Mui-expanded': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                      borderColor: '#3b82f6',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon 
                        sx={{ 
                          color: '#3b82f6',
                          fontSize: '1.5rem',
                          transition: 'transform 0.3s ease',
                        }} 
                      />
                    }
                    sx={{
                      py: 2,
                      px: 3,
                      minHeight: '64px',
                      '&.Mui-expanded': {
                        minHeight: '64px',
                      },
                      '& .MuiAccordionSummary-content': {
                        margin: '12px 0',
                        '&.Mui-expanded': {
                          margin: '12px 0',
                        },
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: '600',
                        color: '#3b82f6',
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        lineHeight: 1.4,
                        pr: 2,
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      px: 3,
                      pb: 3,
                      pt: 0,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#64748b',
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        lineHeight: 1.6,
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingFAQ;
