import React from 'react';
import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/outline'; // Changed from IoClose

const QuotationFormModal = ({ open, onClose, onSubmit }) => {

  if (!open) return null;

  const hours = Array.from({ length: 24 }, (_, i) => i); // 0 to 23 hours
  const minutes = Array.from({ length: 60 }, (_, i) => i); // 0 to 59 minutes

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 50,
        top: '4rem',
        left: '14rem',
        width: 'calc(100vw - 14rem)',
        height: 'calc(100vh - 4rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 0,
        }}
        onClick={onClose} // Allow clicking overlay to close modal
      />

      {/* Close Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 120,
          right: 355,
          zIndex: 2,
          backgroundColor: 'rgba(51, 109, 142, 0.5)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          '&:hover': { backgroundColor: '#60A5FA' },
        }}
        onClick={onClose}
      >
        {/* Replaced IoClose with XMarkIcon from Heroicons */}
        <XMarkIcon style={{ height: '25px', width: '25px', color: '#fff' }} />
      </Box>

      {/* Quotation Form */}
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          paddingX: { xs: '20px', md: '24px' },
          paddingY: { xs: '16px', md: '20px' },
          zIndex: 10,
          width: '100%',
          maxWidth: '30rem',
          overflowY: 'auto',
          maxHeight: '90vh',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Submit Your Quotation
        </Typography>

        {/* What would you charge for this job? */}
        <Typography variant="body1" sx={{ mb: 1, color: '#4a5568', fontSize: '16px', fontWeight: '500', letterSpacing: '0.03em' }}>
            What would you charge for this job?
        </Typography>
        <TextField
            fullWidth
            sx={{
                mb: 3,
                boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
                borderRadius: '6px',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#E8E8E8',
                    },
                    '& input': {
                        paddingTop: '8px',
                        paddingBottom: '8px',
                    },
                },
            }}
            InputProps={{
                startAdornment: (
                    <Typography sx={{ mr: 1, color: 'text.secondary' }}>₹</Typography>
                ),
            }}
        />

        {/* How much time do you think this job will take? */}
        <Typography variant="body1" sx={{ mb: 1, color: '#4a5568', fontSize: '16px', fontWeight: '500', letterSpacing: '0.03em' }}>
          How much time do you think this job will take?
        </Typography>
        <Box sx={{ display: 'flex', gap: '16px', mb: 3, justifyContent: 'start' }}>
          <TextField
            select
            label="hr"
            defaultValue=""
            sx={{ 
                width:90,
                boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
                borderRadius: '6px',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#E8E8E8',
                    },
                },
            }}
          >
            {hours.map((option) => (
              <MenuItem key={option} value={option}>
            {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="min"
            defaultValue=""
            sx={{
                width: 90,
                boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
                borderRadius: '6px',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#E8E8E8',
                    },
                    '& input': {
                        paddingTop: '8px',
                        paddingBottom: '8px',
                    },
                },
            }}
          >
            {minutes.map((option) => (
              <MenuItem key={option} value={option}>
            {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Any additional details you'd like to share? */}
        <Typography variant="body1" sx={{ mb: 1, color: '#4a5568', fontSize: '16px', fontWeight: '500', letterSpacing: '0.03em' }}>
          Any additional details you'd like to share?
        </Typography>
        <TextField
          label=""
          fullWidth
          multiline
          rows={5} // Adjusted rows to match the image
          sx={{ 
            mb: 4,
            boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
                borderRadius: '6px',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#E8E8E8',
                    },
                    '& input': {
                        paddingTop: '8px',
                        paddingBottom: '8px',
                    },
                },
          }}
        />

        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            width: '100%',
            backgroundColor: '#2563eb', // bg-blue-600
            '&:hover': {
              backgroundColor: '#1d4ed8', // hover:bg-blue-700
            },
            color: 'white',
            fontWeight: 600,
            paddingY: '12px',
            borderRadius: '6px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            textTransform: 'none',
            fontSize: '1.125rem',
          }}
        >
          Submit and Apply
        </Button>
      </Box>
    </Box>
  );
};

export default QuotationFormModal;