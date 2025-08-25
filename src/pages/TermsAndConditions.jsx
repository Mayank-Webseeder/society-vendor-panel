import { useNavigate } from 'react-router-dom';
import { Typography, Box, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { ChevronLeft } from 'lucide-react';
import termsData from '../static/dummyData_TermsConditions';
import { useUser } from '../UserContext';
import { motion, AnimatePresence } from 'framer-motion';


const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};


const TermsAndConditions = () => {

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setUser({ ...user, agreedTermsAndConditions: event.target.checked });
    setTimeout(() => navigate('/my-profile/account-support'), 1000);
  };



  return (
    <AnimatePresence mode="wait">
      <Box className='p-3 sm:p-8 w-full h-full'>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', pt:{ xs: 1, sm: 0 }, mb: { xs: 3, sm: 4 } }}>
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
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#334155', letterSpacing: 0.2, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            Terms & Conditions
          </Typography>
        </Box>

        {/* Animated Content */}
        <motion.div
          key="terms-content"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Box sx={{ mx: { xs: 1, sm: 4 }, px: { xs: 1, sm: 0 } }}>
            <Typography variant="subtitle2" sx={{ 
              color: '#64748B',
              mb: { xs: 1, sm: 2 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}>
              Last Updated: 14-06-2025
            </Typography>

            <Typography variant="body1" sx={{ 
              mb: { xs: 1.5, sm: 2 }, 
              color: '#334155',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}>
              By using this app, you agree to the following:
            </Typography>

            {/* Terms List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.25, sm: 1.75 }, px: 1 }}>
              <AnimatePresence>
                {termsData.map((term) => (
                  <motion.div
                    key={term.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{
                      border: '1px solid rgba(148,163,184,0.35)',
                      borderStyle: 'solid',
                      borderRadius: '12px',
                      bgcolor: 'rgba(255,255,255,0.65)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 10px 30px rgba(2, 8, 23, 0.06)',
                      p: { xs: 1.25, sm: 1.75 }
                    }}>
                      <Typography variant='subtitle2' sx={{ 
                        fontWeight: 600, 
                        mb: 0.75, 
                        color: '#334155',
                        fontSize: { xs: '0.8rem', sm: '0.95rem' }
                      }}>
                        {term.id}. {term.heading}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        lineHeight: 1.7, 
                        color:'#475569',
                        fontSize: { xs: '0.85rem', sm: '0.9rem' }
                      }}>
                        {term.content}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>

            <Typography variant="body2" sx={{ 
              color: '#64748B',
              mt: { xs: 2, sm: 4 }, 
              mb: 4,
              fontSize: { xs: '0.8rem', sm: '0.9rem' }
            }}>
              For support, visit the Help & Support section.
            </Typography>

            {/* Checkbox Agreement */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.agreedTermsAndConditions}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: '#2563EB',
                    '&.Mui-checked': {
                      color: '#2563EB',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ 
                  color: '#334155',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                }}>
                  By continuing, you agree to our Terms & Conditions.
                </Typography>
              }
              sx={{ mt: { xs: 2, sm: 3 }, alignSelf: 'flex-start' }}
            />
          </Box>
        </motion.div>
      </Box>
    </AnimatePresence>
  );
};

export default TermsAndConditions;