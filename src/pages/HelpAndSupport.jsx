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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pt:{ xs: 1, sm: 0 }, mb: { xs: 3, sm: 4 } }}>
        <IconButton
          onClick={() => navigate('/my-profile/account-support')}
          sx={{
            mr: 1,
            p: 0,
            color: '#334155',
            transition: 'color .2s ease',
            '&:hover': { color: '#1D4ED8', backgroundColor: 'transparent' }
          }}
        >
            <ChevronLeft size={25} strokeWidth={3} />
            </IconButton>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  lineHeight: 1.2,
                  color: '#334155',
                  // background: 'linear-gradient(90deg, #0f172a, #334155) ',
                  // WebkitBackgroundClip: 'text',
                  // WebkitTextFillColor: 'transparent',
                  // backgroundClip: 'text'
                }}
              >
                Help & Support
              </Typography>
              {/* <Box sx={{ mt: 0.6, height: 3, width: 28, borderRadius: '999px', background: 'linear-gradient(90deg, rgba(59,130,246,0.8), rgba(99,102,241,0.65), rgba(59,130,246,0))' }} /> */}
            </Box>
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
              <Typography variant="h6" sx={{ 
                fontSize: { xs: '1.05rem', sm: '1.25rem' }, 
                fontWeight: 600, 
                color: 'rgba(15,23,42,0.60)', 
                mb: 2.2,
                letterSpacing: '.2px'
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
                      position: 'relative',
                      background: 'linear-gradient(140deg,rgba(255,255,255,0.85),rgba(255,255,255,0.70))',
                      borderRadius: '14px',
                      border: '1px solid rgba(148,163,184,0.30)',
                      boxShadow: '0 4px 10px -3px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      p: { xs: 1.25, sm: 2.4 },
                      transition: 'box-shadow .35s, transform .35s',
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: '0 8px 20px -8px rgba(0,0,0,0.22), 0 4px 10px rgba(0,0,0,0.10)',
                        transform: 'translateY(-2px)'
                      }
                    }}>
                      {/* Left accent bar */}
                      <Box sx={{ position: 'absolute', inset: '0 0 0 0', pointerEvents: 'none' }}>
                        <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(180deg,rgba(99,102,241,0.5),rgba(59,130,246,0.45))' }} />
                        <Box sx={{ position: 'absolute', left: 28, right: 0, top: 0, height: 56, background: 'linear-gradient(90deg,rgba(255,255,255,0.35),rgba(255,255,255,0))', opacity: .45, mixBlendMode: 'overlay' }} />
                      </Box>
                      <Typography variant="h6" sx={{ 
                        fontSize: { xs: '.95rem', sm: '1.05rem' }, 
                        fontWeight: 600, 
                        color: '#0f172a', 
                        mb: .75,
                        letterSpacing: '.2px'
                      }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(15,23,42,0.65)', 
                        fontSize: { xs: '.80rem', sm: '.875rem' },
                        lineHeight: 1.6
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
                <Typography variant="h6" sx={{ 
                  fontSize: { xs: '1rem', sm: '1.2rem' }, 
                  fontWeight: 600, 
                  color: 'rgba(15,23,42,0.70)', 
                  mb: { xs: 2, sm: 3 },
                  letterSpacing: '.2px' 
                }}>
                  What's the issue you're facing?
                </Typography>
                <Box sx={{
                  bgcolor: 'rgba(255,255,255,0.85)',
                  borderRadius: '14px',
                  border: '1px solid rgba(148,163,184,0.35)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)'
                }}>
                  <textarea
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="Describe your issue here..."
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      borderRadius: '14px',
                      height: '220px',
                      padding: '14px 16px',
                      border: '0',
                      resize: 'none',
                      outline: 'none',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      color: '#0f172a'
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
          padding: '12px 28px',
          borderRadius: '12px',
                    border: 'none',
                    fontWeight: 600,
                    color: 'white',
                    fontSize: '14px',
          backgroundColor: !issueDescription.trim() || isSubmitting ? '#9CA3AF' : '#3B82F6',
                    cursor: !issueDescription.trim() || isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: !issueDescription.trim() || isSubmitting ? 'none' : '0 8px 18px -10px rgba(37,99,235,0.7)'
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
                      color: '#2563EB',
                      textDecoration: 'none',
                      px: 1,
                      py: .25,
                      borderRadius: '8px',
                      background: 'linear-gradient(90deg,rgba(37,99,235,0.08),rgba(37,99,235,0.04))',
                      transition: 'color .25s ease, background .25s ease',
                      '&:hover': { color: '#1D4ED8', background: 'linear-gradient(90deg,rgba(37,99,235,0.12),rgba(37,99,235,0.06))' }
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
                      color: '#2563EB',
                      textDecoration: 'none',
                      px: 1,
                      py: .25,
                      borderRadius: '8px',
                      background: 'linear-gradient(90deg,rgba(37,99,235,0.08),rgba(37,99,235,0.04))',
                      transition: 'color .25s ease, background .25s ease',
                      '&:hover': { color: '#1D4ED8', background: 'linear-gradient(90deg,rgba(37,99,235,0.12),rgba(37,99,235,0.06))' }
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