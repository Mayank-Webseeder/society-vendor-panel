import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CalendarDaysIcon, ClockIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { IoClose } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import ConfirmationDialog from './ConfirmationDialog';


const CURRENT_YEAR = 25;


const CancelJobModal = ({ open, onClose, lead, onCancel }) => {

  const [showConfirm, setShowConfirm] = useState(false);

  if (!open || !lead) return null;

  const safe = (val) => (val !== undefined && val !== null && val !== '' ? val : 'N/A');




  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 30,
        top: 0,
        left: { xs: '0rem', sm: '4rem' },
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
          borderRadius: { xs: '14px', sm: '16px' },
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          paddingX: { xs: '18px', sm: '24px', md: '32px' },
          paddingY: { xs: '18px', sm: '24px', md: '32px' },
          zIndex: 10,
          width: { xs: '90%', sm: '100%' },
          mx: 'auto',
          maxWidth: '500px',
          maxHeight: { xs: '83vh', sm: '95vh' },
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { width: 0 },
          scrollBehavior: 'smooth'
        }}
      >
        {/* Close icon */}
        <Box
          sx={{
            position: 'absolute',
            top: 7,
            right: 7,
            zIndex: 20,
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: '#f3f4f6',
            transition: 'all 0.2s ease',
            '&:hover': { 
              backgroundColor: '#e5e7eb',
              transform: 'scale(1.05)',
            },
          }}
          onClick={onClose}
        >
          <IoClose size={18} color="#6b7280" />
        </Box>

        {/* Header */}
        <Box sx={{ marginBottom: '24px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: '600',
                color: '#111827',
                fontSize: { xs: '20px', sm: '22px', md: '24px' },
              }}
            >
              Cancel Job
            </Typography>
            {/* <Box
              sx={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white',
                fontWeight: '600',
                fontSize: '13px',
                padding: '8px 16px',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <MdCancel size={14} />
              Cancel
            </Box> */}
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: '#6b7280',
              fontSize: { xs: '12px', sm: '13px', md: '14px' },
              marginTop: '4px',
            }}
          >
            Posted on {safe(lead.postedOn)}
          </Typography>
        </Box>

        {/* Date and Time */}
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              padding: { xs: '10px', sm: '12px' },
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CalendarDaysIcon
              style={{
                height: '20px',
                width: '20px',
                color: '#6b7280',
              }}
            />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '11px', sm: '12px' },
                  color: '#6b7280',
                  fontWeight: '500',
                }}
              >
                Job Date
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '13px', sm: '14px' },
                  fontWeight: '600',
                  color: '#111827',
                }}
              >
                {safe(lead.date)}, {CURRENT_YEAR}
              </Typography>
            </Box>
          </Box>
          
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              padding: { xs: '10px', sm: '12px' },
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <ClockIcon
              style={{
                height: '20px',
                width: '20px',
                color: '#6b7280',
              }}
            />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '11px', sm: '12px' },
                  color: '#6b7280',
                  fontWeight: '500',
                }}
              >
                Job Time
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '13px', sm: '14px' },
                  fontWeight: '600',
                  color: '#111827',
                }}
              >
                {safe(lead.time)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Location */}
        <Box sx={{ marginBottom: '24px' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              fontSize: { xs: '16px', sm: '18px' },
              color: '#111827',
              marginBottom: '4px',
            }}
          >
            {safe(lead.name)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#6b7280',
              lineHeight: '1.5',
              fontSize: { xs: '13px', sm: '14px' },
            }}
          >
            {safe(lead.address)}
          </Typography>
        </Box>

        {/* Service Details */}
        <Box sx={{ marginBottom: '32px' }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '15px', sm: '16px' },
              fontWeight: '600',
              color: '#111827',
              marginBottom: '16px',
            }}
          >
            Service Details
          </Typography>
          
          <Box
            sx={{
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              padding: '8px',
              marginBottom: '16px',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                marginBottom: '8px',
                color: '#6b7280',
                fontWeight: '500',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Service Type
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <WrenchScrewdriverIcon
                style={{
                  height: '18px',
                  width: '18px',
                  color: '#6b7280',
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: '#111827',
                  fontSize: { xs: '13px', sm: '14px' },
                  fontWeight: '500',
                }}
              >
                {safe(lead.work)}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              padding: '8px',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                marginBottom: '8px',
                color: '#6b7280',
                fontWeight: '500',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Issue Description
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#111827',
                lineHeight: '1.5',
                fontSize: { xs: '13px', sm: '14px' },
              }}
            >
              {safe(lead.issueDescription)}
            </Typography>
          </Box>
        </Box>

        {/* Cancel Job Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: '24px',
            position: { xs: 'sticky', sm: 'static' },
            bottom: { xs: 0, sm: 'auto' },
            left: 0,
            right: 0,
            background: { xs: 'linear-gradient(to top, rgba(255,255,255,0.95) 60%, rgba(255,255,255,0.7) 100%)', sm: 'transparent' },
            pb: { xs: 1, sm: 0 },
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: '100%',
              maxWidth: '320px',
              padding: { xs: '11px 20px', sm: '12px 24px' },
              fontSize: { xs: '15px', sm: '16px' },
              fontWeight: '600',
              borderRadius: '12px',
              textTransform: 'none',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                boxShadow: '0 12px 25px rgba(220, 38, 38, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0px)'
              },
            }}
            onClick={() => setShowConfirm(true)}
          >
            <MdCancel size={20} style={{ marginRight: '8px' }} />
            Cancel Job
          </Button>
        </Box>
      </Box>



      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          onCancel  &&  onCancel();
          onClose  &&  onClose();    //For closing both the modals
        }}
        title="Cancel Job"
        message="Are you sure you want to Cancel this job?"
      />
    </Box>
  );
};


export default CancelJobModal;