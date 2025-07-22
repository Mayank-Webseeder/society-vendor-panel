import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, IconButton } from '@mui/material';


const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};


const HelpAndSupport = () => {

  const navigate = useNavigate();

  const [issueDescription, setIssueDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!issueDescription.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your issue has been submitted successfully!');
      setIssueDescription('');
    }, 1500);
  };

  const services = [
    {
      title: 'Technical Support',
      description: 'Get help with technical issues and troubleshooting'
    },
    {
      title: 'Account Management',
      description: 'Assistance with account settings and profile management'
    },
    {
      title: 'Billing & Payments',
      description: 'Help with billing inquiries and payment issues'
    },
    {
      title: 'General Inquiries',
      description: 'Any other questions or concerns you may have'
    }
  ];

  return (
    <Box className='p-3 sm:p-8 w-full h-full'>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', pt:{ xs: 1, sm: 0 }, mb: { xs: 3, sm: 4 } }}>
        <IconButton onClick={() => navigate('/my-profile/account-support')} sx={{ mr: 1, p: 0 }}>
            <ChevronLeft size={25} strokeWidth={3} color="rgba(0,0,0,0.65)" />
        </IconButton>
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold', 
          color: 'rgba(0,0,0,0.65)',
          fontSize: { xs: '1.25rem', sm: '1.45rem' }
        }}>
            Help & Support
        </Typography>
      </Box>

      <AnimatePresence mode='wait'>
        <motion.div
          key='help-support-content'
          variants={contentVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          {/* Main Content */}
          <Box sx={{ mx: { xs: 2, sm: 3 } }}>
            {/* Services Offered Section */}
            <Box sx={{ mb: { xs: 6, sm: 8 } }}>
              <Typography variant="h4" sx={{ 
                fontSize: { xs: '1.125rem', sm: '1.35rem' }, 
                fontWeight: 'medium', 
                color: '#6B7280', 
                mb: 2 
              }}>
                Services Offered
              </Typography>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 3, sm: 4 }
              }}>
                {services.map((service, index) => (
                  <motion.div 
                    key={index}
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                  >
                    <Box sx={{
                      background: 'linear-gradient(to right, #f1f5f9, #e2e8f0)',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      p: { xs: 1, sm: 3 },
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }
                    }}>
                      <Typography variant="h6" sx={{ 
                        fontSize: { xs: '0.875rem', sm: '1.125rem' }, 
                        fontWeight: 'semibold', 
                        color: '#6B7280', 
                        mb: 1 
                      }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: '#6B7280', 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' } 
                      }}>
                        {service.description}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* Issue Description Section */}
            <motion.div
              variants={contentVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <Box sx={{ mb: { xs: 4, sm: 6 } }}>
                <Typography variant="h5" sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem' }, 
                  fontWeight: 'semibold', 
                  color: '#6B7280', 
                  mb: { xs: 2, sm: 3 } 
                }}>
                  What's the issue you're facing?
                </Typography>
                <Box sx={{
                  bgcolor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <textarea
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="Describe your issue here..."
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      height: '240px',
                      padding: '16px',
                      border: '0',
                      resize: 'none',
                      outline: 'none',
                      fontFamily: 'inherit',
                      fontSize: '14px'
                    }}
                    rows={12}
                  />
                </Box>
              </Box>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={contentVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mb: { xs: 6, sm: 8 } 
              }}>
                <button
                  onClick={handleSubmit}
                  disabled={!issueDescription.trim() || isSubmitting}
                  style={{
                    padding: '12px 32px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 600,
                    color: 'white',
                    fontSize: '14px',
                    backgroundColor: !issueDescription.trim() || isSubmitting ? '#9CA3AF' : '#3B82F6',
                    cursor: !issueDescription.trim() || isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!(!issueDescription.trim() || isSubmitting)) {
                      e.target.style.backgroundColor = '#2563EB';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!(!issueDescription.trim() || isSubmitting)) {
                      e.target.style.backgroundColor = '#3B82F6';
                    }
                  }}
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SAVE'}
                </button>
              </Box>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 4, md: 8 }
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#6B7280', mb: 0.5 }}>
                    <Phone size={16} style={{ marginRight: '6px' }} />
                    <Typography variant="body1" sx={{ 
                      fontWeight: 'medium', 
                      fontSize: { xs: '0.75rem', sm: '1rem' } 
                    }}>
                      Call us
                    </Typography>
                  </Box>
                  <Typography
                    component="a"
                    href="tel:+919999999999"
                    sx={{
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      color: '#3B82F6',
                      textDecoration: 'none',
                      '&:hover': { color: '#2563EB' },
                      transition: 'color 0.3s ease'
                    }}
                  >
                    +91 999 999 9999
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#6B7280', mb: 0.5 }}>
                    <Mail size={16} style={{ marginRight: '6px' }} />
                    <Typography variant="body1" sx={{ 
                      fontWeight: 'medium', 
                      fontSize: { xs: '0.75rem', sm: '1rem' } 
                    }}>
                      Email
                    </Typography>
                  </Box>
                  <Typography
                    component="a"
                    href="mailto:abc99@gmail.com"
                    sx={{
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      color: '#3B82F6',
                      textDecoration: 'none',
                      '&:hover': { color: '#2563EB' },
                      transition: 'color 0.3s ease'
                    }}
                  >
                    abc99@gmail.com
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default HelpAndSupport;