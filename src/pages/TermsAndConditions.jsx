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
        {/* Header (NOT animated) */}
        <Box sx={{ display: 'flex', alignItems: 'center', pt:{ xs: 1, sm: 0 }, mb: { xs: 3, sm: 4 } }}>
          <IconButton onClick={() => navigate('/my-profile/account-support')} sx={{ mr: 1, p: 0 }}>
            <ChevronLeft size={25} strokeWidth={3} color="rgb(0,0,0,0.65)" />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgb(0,0,0,0.65)', fontSize: { xs: '1.25rem', sm: '1.45rem' } }}>
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
            <Typography variant="subtitle2" color="text.secondary" sx={{ 
              mb: { xs: 1, sm: 2 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}>
              Last Updated: 14-06-2025
            </Typography>

            <Typography variant="body1" sx={{ 
              mb: { xs: 1, sm: 2 }, 
              color: 'rgb(0,0,0,0.65)',
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}>
              By using this app, you agree to the following:
            </Typography>

            {/* Terms List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2.5 }, px: 1 }}>
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
                    <Box>
                      <Typography variant='button' sx={{ 
                        fontWeight: 'bold', 
                        mb: 0.5, 
                        color: 'rgb(0,0,0,0.55)',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}>
                        {term.id}. {term.heading}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        pl: { xs: 1, sm: 2 }, 
                        lineHeight: 1.6, 
                        pr: { xs: 1, sm: 3 }, 
                        color:'rgb(0,0,0,0.59)',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}>
                        {term.content}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ 
              mt: { xs: 2, sm: 4 }, 
              mb: 4,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
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
                    color: '#4487AE',
                    '&.Mui-checked': {
                      color: '#4487AE',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ 
                  color: '#4487AE',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
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