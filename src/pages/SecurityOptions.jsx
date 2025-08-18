import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Box, Typography } from '@mui/material';

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const SecurityOptions = () => {
  // State for Security Options
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Handlers for Security Options
  const handleClearPasswords = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleChangePassword = () => {
    console.log('Change Password clicked:', {
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    handleClearPasswords();
  };

  return (
    <Box className='p-5 sm:p-8 w-full h-full'>
      {/* Header for Security Options */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        pb: 1
      }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.55rem', sm: '2rem' }, fontWeight: 'semibold', color: '#4A5568', lineHeight: { xs: 1.25, sm: 1.3 } }}>
          Security Options
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          color: '#718096',
          maxWidth: { xs: '95%', sm: '100%' },
          mb: 4
        }}
      >
        Manage your account's security settings.
      </Typography>

      <AnimatePresence mode="wait">
        <motion.div
          key="security-options-content"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full"
        >
          <Box sx={{ bgcolor: 'white', borderRadius: '0.5rem', px: 0.5 }}>
            <Box sx={{ mb: 2, pb: 1, maxWidth: '100%', borderBottom: '1px solid #E0E0E0' }}>
              <Typography variant="body1" sx={{ fontSize: '1.20rem', fontWeight: 'semibold', color: '#64748B' }}>
                Change Password
              </Typography>
            </Box>

            <div className="flex flex-col gap-3 mt-4 w-full sm:max-w-[60%]">
              {/* Current Password */}
              <div className="flex flex-col mb-2">
                <label className="text-sm font-medium text-gray-500 mb-1">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full p-2 border-solid border border-gray-300 bg-gray-100 text-gray-800 text-sm rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* New Password */}
              <div className="flex flex-col mb-2">
                <label className="text-sm font-medium text-gray-500 mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full p-2 border-solid border border-gray-300 bg-gray-100 text-gray-800 text-sm rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Confirm New Password */}
              <div className="flex flex-col mb-2">
                <label className="text-sm font-medium text-gray-500 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={e => setConfirmNewPassword(e.target.value)}
                  className="w-full p-2 border-solid border border-gray-300 bg-gray-100 text-gray-800 text-sm rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', maxWidth: { sm: '60%' }, mt: 5, gap: { xs: 1.5, sm: 3 } }}>
              <Button
                variant="outlined"
                onClick={handleClearPasswords}
                sx={{
                  py: { xs: '6px', sm: '8px' },
                  px: { xs: '16px', sm: '24px' },
                  bgcolor: 'white',
                  color: '#616161',
                  borderColor: '#D1D5DB',
                  fontWeight: 'semibold',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  '&:hover': {
                    bgcolor: '#F3F4F6',
                    borderColor: '#9CA3AF',
                  },
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                onClick={handleChangePassword}
                sx={{
                  py: { xs: '6px', sm: '8px' },
                  px: { xs: '16px', sm: '24px' },
                  bgcolor: '#3B82F6',
                  color: 'white',
                  fontWeight: 'semibold',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  '&:hover': {
                    bgcolor: '#2563EB',
                  },
                }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default SecurityOptions;