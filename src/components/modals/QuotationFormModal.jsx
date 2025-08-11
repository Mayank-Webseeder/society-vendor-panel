import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { applyToJobWithQuotation } from '../../services/api/jobs';


const QuotationFormModal = ({ open, onClose, onSubmit, jobId }) => {

  const [message, setMessage] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;


  const handleApply = async () => {
    setLoading(true);
    setError('');

    try {
      // Prepare the quotationDetails object as required by API 10(A)
      const quotationDetails = {
        message,
        quotedPrice,
        estimatedTime: {
          hours,
          minutes,
        },
        additionalNotes,
      };

      // Make the api call
      const response = await applyToJobWithQuotation(jobId, quotationDetails);
      console.log(response);

      toast.success('Application submitted successfully!');

      if (onSubmit) onSubmit();
      onClose();
    } catch (err) {
      console.error('❌ Failed to apply to the job:', err);
      toast.error('Failed to apply!')
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
        left: { xs: '0rem', sm: '4rem', md: '5rem' },
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          padding: '32px',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '95vh',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#e5e7eb',
              transform: 'scale(1.1)',
            },
          }}
          onClick={onClose}
        >
          <IoClose size={18} color="#6b7280" />
        </Box>

        {/* Header */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: '#111827',
            fontSize: '24px',
            marginBottom: '16px',
          }}
        >
          Submit Your Quotation
        </Typography>

        {/* Form Fields */}
        <Box sx={{ marginBottom: '24px' }}>
          {/* Message Field */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: '8px',
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Write a message
          </Typography>
          <TextField
            fullWidth
            placeholder="Write a message to the society."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              marginBottom: '16px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: '#9ca3af',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                },
              },
            }}
          />

          {/* Price Quote */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: '8px',
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            What would you charge for this job?
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your quotation"
            value={quotedPrice}
            onChange={(e) => setQuotedPrice(e.target.value)}
            InputProps={{
              startAdornment: (
                <Typography sx={{ marginRight: '8px', color: '#6b7280' }}>₹</Typography>
              ),
            }}
            sx={{
              marginBottom: '16px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: '#9ca3af',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                },
              },
            }} />

          {/* Time Estimation */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: '14px',
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            How much time do you think this job will take?
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
            <TextField
              select
              label="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              InputLabelProps={{ shrink: true }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: { maxHeight: 200 },
                  },
                },
              }}
              sx={{
                width: '100px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
              }}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              InputLabelProps={{ shrink: true }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: { maxHeight: 200 },
                  },
                },
              }}
              sx={{
                width: '100px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
              }}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Additional Details */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: '8px',
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Any additional details you'd like to share?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter additional details"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: '#9ca3af',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                },
              },
            }}
          />
        </Box>

        {/* Error Message */}
        {error && (
          <Typography
            variant="body2"
            sx={{ color: 'red', marginBottom: '16px' }}
          >
            {error}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          onClick={handleApply}
          disabled={loading}
          sx={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '8px',
            backgroundColor: '#3b82f6',
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
            '&:hover': {
              backgroundColor: '#2563eb',
              boxShadow: '0 6px 16px rgba(59, 130, 246, 0.3)',
            },
          }}
        >
          {loading ? 'Submitting...' : 'Submit and Apply'}
        </Button>
      </Box>
    </Box>
  );
};

export default QuotationFormModal;