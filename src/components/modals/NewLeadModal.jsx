import { Box, Typography, Button } from '@mui/material';
import { CalendarDaysIcon, ClockIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { IoClose } from "react-icons/io5";
// import { BsExclamationCircle } from "react-icons/bs";
import { useEffect } from 'react';
import { useUser } from '../../UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CURRENT_YEAR = 25;


const NewLeadModal = ({
  open,
  onClose,
  lead,
  proceed,
  onApplyClick,
  onFillQuotation,
}) => {

  if (!open || !lead) return null;

  const { user } = useUser();
  const safe = (val) => (val !== undefined && val !== null && val !== '' ? val : 'N/A');


  const handleShowInterest = () => {
    // Mark the vendor as interested
    lead.interested = true;

    // Set proceed to true to start from 'Fill Quotation and Apply'
    onApplyClick();

    // Prepare the vendor object using user-context
    const vendorDetails = {
      name: user.name,
      email: user.email,
      contact: user.phone,
    };

    // Show success toast
    toast.success("Marked as Interested!");

    console.log("Vendor Details:", vendorDetails);
  };

  useEffect(() => {
    if (lead?.interested) {
      onApplyClick();
    }
  }, [lead]);

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
              Job Details
            </Typography>
            {lead.interested && (
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '13px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                    },
                    '50%': {
                      boxShadow: '0 6px 20px rgba(16, 185, 129, 0.5)',
                    },
                    '100%': {
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
                  }}
                />
                Interested
              </Box>
            )}
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
                Date
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
                Time
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

        {/* Action Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {proceed ? (
            <Button
              variant="contained"
              onClick={onFillQuotation}
              sx={{
                width: '100%',
                padding: '12px 24px',
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
              Fill Quotation and Apply
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                handleShowInterest();
                onApplyClick();
              }}
              sx={{
                width: '100%',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '8px',
                backgroundColor: '#10b981',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                '&:hover': { 
                  backgroundColor: '#059669',
                  boxShadow: '0 6px 16px rgba(16, 185, 129, 0.3)',
                },
              }}
            >
              Show Interest
            </Button>
          )}
        </Box>

        {/* Quotation Needed Reminder */}
        {proceed && (
          <Typography 
            sx={{ 
              color: '#9ca3af', 
              fontSize: '13px',
              fontStyle: 'italic',
              marginTop: '12px',
              // opacity: 0.8,
            }}
          >
            * Quotation needed to proceed
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default NewLeadModal;