import { useNavigate } from 'react-router-dom';
import { Typography, Box, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { ChevronLeft } from 'lucide-react';
import policyData from '../static/dummyData_PrivacyPolicy';
import { useUser } from '../UserContext';
import { motion, AnimatePresence } from 'framer-motion';

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const PrivacyPolicy = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setUser({ ...user, agreedPrivacyPolicy: event.target.checked });
    setTimeout(() => navigate('/my-profile/account-support'), 1000);
  };

  return (
    <AnimatePresence mode="wait">
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: '1rem',
          width: '100%',
          height: '100%',
          p: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 },
          mb: 1
        }}
      >
        {/* Header (NOT animated) */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
          <IconButton onClick={() => navigate('/my-profile/account-support')} sx={{ mr: 2, p: 0 }}>
            <ChevronLeft size={32} strokeWidth={3} color="rgba(0,0,0,0.65)" />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.65)' }}>
            Privacy Policy
          </Typography>
        </Box>

        {/* Animated Content */}
        <motion.div
          key="privacy-policy-content"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Box sx={{ pl: { xs: 2, sm: 4 }, pr: { xs: 0, sm: 0 }, pt: { xs: 0, sm: 0 }, pb: { xs: 0, sm: 0 } }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: { xs: 1, sm: 2 } }}>
              Last Updated: 14-06-2025
            </Typography>

            <Typography variant="body1" sx={{ mb: { xs: 1, sm: 2 }, color: 'rgb(0,0,0,0.65)' }}>
              We respect your privacy. By using this app, you agree to how we collect and use your information.
            </Typography>

            {/* Policy Sections */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2.5 } }}>
              <AnimatePresence>
                {policyData.map((section) => (
                  <motion.div
                    key={section.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box>
                      <Typography variant="button" sx={{ fontWeight: 'bold', mb: 0.5, color: 'rgb(0,0,0,0.55)' }}>
                        {section.id}. {section.heading}
                      </Typography>
                      {section.type === 'list' && (
                        <Box component="ul" sx={{ pl: 4, mt: 0, mb: 0 }}>
                          {section.items.map((item, index) => (
                            <Typography component="li" key={index} variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 0.5, pr: 4, color: 'rgb(0,0,0,0.55)' }}>
                              {item}
                            </Typography>
                          ))}
                        </Box>
                      )}
                      {section.type === 'text' && (
                        <>
                          <Typography variant="body2" color="text.secondary" sx={{ pl: 2, lineHeight: 1.6 }}>
                            {section.content}
                          </Typography>
                          {section.subItems && (
                            <Box component="ul" sx={{ pl: 4, mt: 0, mb: 0 }}>
                              {section.subItems.map((item, index) => (
                                <Typography component="li" key={index} variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 0.5 }}>
                                  {item}
                                </Typography>
                              ))}
                            </Box>
                          )}
                        </>
                      )}
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>

            {/* Checkbox Agreement */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.agreedPrivacyPolicy}
                  onChange={handleCheckboxChange}
                  sx={{
                    mt: 4,
                    color: '#4487AE',
                    '&.Mui-checked': {
                      color: '#4487AE',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: '#4487AE', mt: 4 }}>
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

export default PrivacyPolicy;