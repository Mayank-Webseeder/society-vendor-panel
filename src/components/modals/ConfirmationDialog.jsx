import { Box, Typography, Button } from '@mui/material';
import { IoWarning, IoCheckmark, IoClose } from "react-icons/io5";


const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => {

  if (!open) return null;



  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 40,
        top: 0,
        left: { xs: '0rem', sm: '4rem', md: '5rem' },
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: { xs: '14px', sm: '16px' },
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          padding: { xs: '20px', sm: '28px', md: '32px' },
          zIndex: 10,
          width: { xs: '90%', sm: '100%' },
          maxWidth: '400px',
          margin: { xs: '10px', sm: '16px' },
          textAlign: 'center',
          maxHeight: { xs: '85vh', sm: 'none' },
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { width: 0 },
        }}
      >
        {/* Warning Icon */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: { xs: '16px', sm: '20px' },
          }}
        >
          <Box
            sx={{
              width: { xs: '56px', sm: '64px' },
              height: { xs: '56px', sm: '64px' },
              borderRadius: '50%',
              backgroundColor: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #fbbf24',
            }}
          >
            <IoWarning size={28} color="#f59e0b" />
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            marginBottom: '12px',
            fontWeight: '600',
            color: '#111827',
            fontSize: { xs: '18px', sm: '19px', md: '20px' },
          }}
        >
          {title}
        </Typography>

        {/* Message */}
        <Typography
          variant="body1"
          sx={{
            marginBottom: { xs: '24px', sm: '28px', md: '32px' },
            color: '#6b7280',
            fontSize: { xs: '14px', sm: '15px', md: '16px' },
            lineHeight: '1.5',
          }}
        >
          {message}
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            variant="contained"
            sx={{
              flex: 1,
              maxWidth: { xs: '100%', sm: '140px' },
              padding: { xs: '11px 20px', sm: '12px 24px' },
              fontSize: { xs: '13px', sm: '14px' },
              fontWeight: '600',
              borderRadius: '10px',
              textTransform: 'none',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              boxShadow: '0 6px 16px rgba(239, 68, 68, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                boxShadow: '0 8px 20px rgba(220, 38, 38, 0.4)',
                transform: 'translateY(-1px)',
              },
              '&:active': {
                transform: 'translateY(0px)',
              },
            }}
            onClick={onConfirm}
          >
            <IoCheckmark size={16} style={{ marginRight: '6px' }} />
            Yes
          </Button>
          
          <Button
            variant="outlined"
            sx={{
              flex: 1,
              maxWidth: { xs: '100%', sm: '140px' },
              padding: { xs: '11px 20px', sm: '12px 24px' },
              fontSize: { xs: '13px', sm: '14px' },
              fontWeight: '600',
              borderRadius: '10px',
              textTransform: 'none',
              color: '#6b7280',
              borderColor: '#d1d5db',
              backgroundColor: 'white',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#f9fafb',
                borderColor: '#9ca3af',
                color: '#374151',
                transform: 'translateY(-1px)',
              },
              '&:active': {
                transform: 'translateY(0px)',
              },
            }}
            onClick={onClose}
          >
            <IoClose size={16} style={{ marginRight: '6px' }} />
            No
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmationDialog;