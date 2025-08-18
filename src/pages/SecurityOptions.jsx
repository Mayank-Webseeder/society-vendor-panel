import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Box, Typography } from '@mui/material';
import { Shield, Lock } from 'lucide-react';

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
    <div className='relative w-full h-full px-4 sm:px-8 pt-4 sm:pt-6 pb-10'>
      {/* Heading */}
      <div className="flex items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex flex-col gap-1">
          <h2 style={{ fontFamily: 'Manrope' }} className="text-2xl sm:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">Security Options</h2>
          <p style={{ fontFamily: 'Lato' }} className="text-xs sm:text-sm text-slate-500">Manage your account security settings</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="security-options-content"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative bg-white/75 backdrop-blur-lg rounded-2xl border border-slate-200 px-4 sm:px-8 pt-6 pb-8 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06)] overflow-hidden max-w-3xl"
        >
          <div className="absolute -top-12 -right-10 w-64 h-64 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute top-0 left-0 h-1 w-40 bg-gradient-to-r from-indigo-500 via-blue-500 to-transparent rounded-br-full" />

          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 p-3.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-inner ring-1 ring-white/30">
              <Lock size={22} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-800">Change Password</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Use a strong password with a mix of letters, numbers & symbols.</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-10 gap-y-4 w-full">
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase mb-1">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="w-full max-w-[500px] p-2.5 border-solid border border-slate-200 bg-gray-50/80 focus:bg-white text-slate-800 text-sm rounded-lg focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full max-w-[500px] p-2.5 border-solid border border-slate-200 bg-gray-50/80 focus:bg-white text-slate-800 text-sm rounded-lg focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
                className="w-full max-w-[500px] p-2.5 border-solid border border-slate-200 bg-gray-50/80 focus:bg-white text-slate-800 text-sm rounded-lg focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-8 text-[11px] sm:text-xs text-slate-500/80">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500" /> At least 8 characters
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" /> Mix upper & lower case
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500" /> Include a number or symbol
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-10">
            <Button
              variant="outlined"
              onClick={handleClearPasswords}
              sx={{
                px: 3.5,
                py: 1.1,
                bgcolor: 'rgba(255,255,255,0.85)',
                color: '#475569',
                borderColor: 'rgba(148,163,184,0.5)',
                fontWeight: 600,
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: '0.78rem',
                letterSpacing: 0.3,
                backdropFilter: 'blur(8px)',
                '&:hover': {
                  bgcolor: 'rgba(241,245,249,0.9)',
                  borderColor: 'rgba(100,116,139,0.6)'
                }
              }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              onClick={handleChangePassword}
              sx={{
                px: 3.8,
                py: 1.15,
                background: 'linear-gradient(90deg,#4F46E5,#2563EB)',
                color: 'white',
                fontWeight: 600,
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: '0.78rem',
                letterSpacing: 0.3,
                boxShadow: '0 6px 18px -6px rgba(59,130,246,0.5),0 2px 6px rgba(0,0,0,0.08)',
                '&:hover': { filter: 'brightness(1.07)', boxShadow: '0 10px 24px -6px rgba(59,130,246,0.55),0 3px 8px rgba(0,0,0,0.10)' }
              }}
            >
              Change Password
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SecurityOptions;