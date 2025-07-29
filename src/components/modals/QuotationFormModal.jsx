import { useState } from 'react';
import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import { IoClose } from "react-icons/io5";
import { applyToJob } from '../../services/api/jobs';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles


const QuotationFormModal = ({ open, onClose, onSubmit, jobId }) => {

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const hours = Array.from({ length: 24 }, (_, i) => i); // 0 to 23 hours
  const minutes = Array.from({ length: 60 }, (_, i) => i); // 0 to 59 minutes


  const handleApply = async () => {
    setLoading(true);
    setError('');

    try {
      // Call the applyToJob API
      await applyToJob(jobId, message);
      console.log('✅ Successfully applied to the job');

      // Show success toast
      toast.success('Application submitted successfully!');

      // Trigger the onSubmit callback (if provided)
      if (onSubmit) onSubmit();

      // Close the modal
      onClose();
    } catch (err) {
      console.error('❌ Failed to apply to the job:', err);
      setError('Failed to apply. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 30,
        top: 0,
        bottom: 0,
        left: { xs: '0rem', sm: '4rem', md: '5rem' },
        right: 0,
        width: '100%',
        height: '100%',
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
        // onClick={onClose}
      />

      {/* Quotation Form */}
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          border: '1px solid #6B7280',
          borderRadius: '8px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          paddingX: { xs: '20px', md: '24px' },
          paddingY: { xs: '16px', md: '20px' },
          zIndex: 10,
          width: '100%',
          maxWidth: '30rem',
          overflowY: 'auto',
          maxHeight: '90vh',
          overflow: 'visible'
        }}
      >

        {/* Close icon */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -40,
            zIndex: 20,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            backgroundColor: 'rgba(51, 109, 142, 0.5)',
            '&:hover' : {
              backgroundColor: '#60A5FA'
            },
          }}
          onClick={onClose}
        >
          <IoClose size={25} color="#fff" />
        </Box>

        <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
          Submit Your Quotation
        </Typography>

        {/* All content except title is wrapped in this Box */}
        <Box sx={{ px: 1.5 }}>
          {/* What would you charge for this job? */}
          <Typography variant="body1" sx={{ mb: 1, color: 'rgba(0, 0, 0, 0.69)', fontSize: '16px', fontWeight: '500', letterSpacing: '0.03em' }}>
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
          <Typography variant="body1" sx={{ mb: 2, color: 'rgba(0, 0, 0, 0.69)', fontSize: '16px', fontWeight: '500', letterSpacing: '0.03em' }}>
            How much time do you think this job will take?
          </Typography>
          <Box sx={{ display: 'flex', gap: '10px', mb: 2, alignItems: 'center' }}>
            <TextField
              select
              label="hr"
              defaultValue=""
              InputLabelProps={{ shrink: true }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      maxHeight: 200, // limit dropdown height
                    },
                  },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null // for MUI v4, not needed in v5
                }
              }}
              sx={{
                width: 70,
                boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
                borderRadius: '6px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E8E8E8',
                  },
                },
                '& .MuiSelect-select': { paddingTop: '6px', paddingBottom: '6px' },
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
              InputLabelProps={{ shrink: true }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      maxHeight: 200, // limit dropdown height
                    },
                  },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null // for MUI v4, not needed in v5
                }
              }}
              sx={{
                width: 70,
                boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
                borderRadius: '6px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E8E8E8',
                  },
                  '& input': {
                    paddingTop: '6px',
                    paddingBottom: '6px',
                  },
                },
                '& .MuiSelect-select': { paddingTop: '6px', paddingBottom: '6px' },
              }}
            >
              {minutes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Typography variant="body1" sx={{ mb: 1, color: 'rgba(0, 0, 0, 0.69)', fontSize: '16px', fontWeight: '500', letterSpacing: '0.03em' }}>
            Any additional details you'd like to share?
          </Typography>
          <TextField
            label=""
            fullWidth
            multiline
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <Button
              variant="contained"
              onClick={handleApply}
              disabled={loading}
              sx={{
                width: '50%',
                backgroundColor: '#56A9D9', // Set the default background color
                '&:hover': {
                  backgroundColor: 'primary.dark', // Set the background color on hover
                },
                color: 'white',
                fontWeight: 600,
                padding: 1,
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                textTransform: 'none',
                fontSize: '1.125rem',
              }}
            >
              {loading ? 'Submitting...' : 'Submit and Apply'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuotationFormModal;