import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CalendarDaysIcon, ClockIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { IoClose } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import ConfirmationDialog from './ConfirmationDialog';


const CURRENT_YEAR = 25;


const WithdrawApplicationModal = ({ open, onClose, lead, onWithdraw }) => {

  const [showConfirm, setShowConfirm] = useState(false);

  if (!open || !lead) return null;

  const safe = (val) => (val !== undefined && val !== null && val !== '' ? val : 'N/A');




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
          paddingX: { xs: '24px', md: '32px' },
          paddingY: { xs: '24px', md: '32px' },
          zIndex: 10,
          width: '100%',
          maxWidth: '500px',
          maxHeight: '95vh',
          overflowY: 'auto',
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
                fontSize: '24px',
              }}
            >
              Withdraw Application
            </Typography>
            {/* <Box
              sx={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                color: 'white',
                fontWeight: '600',
                fontSize: '13px',
                padding: '8px 16px',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <MdOutlineCancel size={14} />
              Withdraw
            </Box> */}
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: '#6b7280',
              fontSize: '14px',
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
              padding: '12px',
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
                  fontSize: '12px',
                  color: '#6b7280',
                  fontWeight: '500',
                }}
              >
                Job Date
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '14px',
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
              padding: '12px',
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
                  fontSize: '12px',
                  color: '#6b7280',
                  fontWeight: '500',
                }}
              >
                Job Time
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '14px',
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
              fontSize: '18px',
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
              fontSize: '14px',
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
              fontSize: '16px',
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
                  fontSize: '14px',
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
                fontSize: '14px',
              }}
            >
              {safe(lead.issueDescription)}
            </Typography>
          </Box>
        </Box>

        {/* Withdraw Application Button */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            width: '100%',
            marginTop: '24px',
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: '100%',
              maxWidth: '300px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '12px',
              textTransform: 'none',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              boxShadow: '0 8px 20px rgba(249, 115, 22, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                boxShadow: '0 12px 25px rgba(234, 88, 12, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0px)',
              },
            }}
            onClick={() => setShowConfirm(true)}
          >
            <MdOutlineCancel size={20} style={{ marginRight: '8px' }} />
            Withdraw Application
          </Button>
        </Box>
      </Box>



      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          onWithdraw  &&  onWithdraw();
          onClose  &&  onClose();    //For closing both the modals
        }}
        title="Withdraw Application"
        message="Are you sure you want to Withdraw this application?"
      />
    </Box>
  );
};


export default WithdrawApplicationModal;