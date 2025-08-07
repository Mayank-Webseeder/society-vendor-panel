import { Box, Typography, Button } from '@mui/material';
import { IoClose, IoLockClosed } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const AccessLockedModal_WorkDetails = ({ open, onClose , heading, subheading }) => {
  
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 50,
        top: 0,
        bottom: 0,
        left: 0,
        // left: { xs: '0rem', sm: '4rem', md: '5rem' },
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
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 0,
          borderRadius: '16px',
        }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          paddingX: { xs: '24px', md: '28px' },
          paddingY: { xs: '20px', md: '24px' },
          zIndex: 10,
          width: '100%',
          maxWidth: '28rem',
          overflowY: 'auto',
          maxHeight: '90vh',
          // overflow:'visible'
        }}
      >
        {/* Lock Icon and Title */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            gap: 1.5,
          }}
        >
          <IoLockClosed size={28} color="#f59e0b" />
          <Typography
            variant="h4"
            sx={{
              fontWeight: '700',
              color: '#111827',
              fontSize: '1.75rem',
            }}
          >
            {heading}
          </Typography>
        </Box>

        {/* Modal Body */}
        <Typography
          variant="body1"
          sx={{
            marginBottom: '28px',
            color: '#4b5563',
            lineHeight: '1.6',
            fontSize: '16px',
            textAlign: 'center',
            fontWeight: '500',
          }}
        >
          {subheading}
        </Typography>

        {/* What you'll get section */}
        <Box sx={{ marginBottom: '32px' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: '700',
              color: '#111827',
              marginBottom: '16px',
              fontSize: '18px',
            }}
          >
            What you'll get
          </Typography>
          <Box sx={{ paddingLeft: '8px' }}>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                marginBottom: '8px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                '&:before': {
                  content: '"•"',
                  color: '#f59e0b',
                  marginRight: '8px',
                  lineHeight: '1.5',
                },
              }}
            >
              Access to all premium sections
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                marginBottom: '8px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                '&:before': {
                  content: '"•"',
                  color: '#f59e0b',
                  marginRight: '8px',
                  lineHeight: '1.5',
                },
              }}
            >
              Access verified society job requests
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                '&:before': {
                  content: '"•"',
                  color: '#f59e0b',
                  marginRight: '8px',
                  lineHeight: '1.5',
                },
              }}
            >
              Priority visibility in nearby societies
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            variant="outlined"
            sx={{ 
              flex: 1,
              color: '#6b7280',
              borderRadius: '10px',
              borderColor: '#d1d5db',
              '&:hover': {
                borderColor: '#9ca3af',
                backgroundColor: '#f9fafb',
              },
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ 
              flex: 1,
              borderRadius: '10px',
              backgroundColor: '#3b82f6',
              '&:hover': {
                backgroundColor: '#2563eb',
              },
            }}
            onClick={() => navigate('/payment')}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AccessLockedModal_WorkDetails;