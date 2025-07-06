import { Box, Typography, Button } from '@mui/material';
import { CalendarDaysIcon, ClockIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { IoClose } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";

const CURRENT_YEAR = 25;

const JobDetailsModal = ({
  open,
  onClose,
  lead,
  canCancel,
  proceed,
  onApplyClick,
  onFillQuotation,
  onWithdraw,
  hideApply,
  isApplied
}) => {

  if (!open || !lead) return null;

  const safe = (val) => (val !== undefined && val !== null && val !== '' ? val : 'N/A');

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
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 0,
        }}
      />
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
          maxWidth: '32rem',
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
            '&:hover': { backgroundColor: '#60A5FA' },
          }}
          onClick={onClose}
        >
          <IoClose size={25} color="#fff" />
        </Box>

        {/* Job Details Header */}
        <Typography
          variant="h5"
          sx={{
            marginLeft: '-8px',
            marginBottom: '20px',
            fontWeight: '500',
            color: '#1a202c',
          }}
        >
          Job Details
        </Typography>

        {/* Posted On */}
        <Typography
          variant="body2"
          className='text-gray-500'
          sx={{
            paddingLeft: '4px',
            marginBottom: '12px',
            color: '#6B7280',
            fontSize: '14px',
          }}
        >
          Posted On: <span className="font-normal px-1 text-[17px] text-gray-400">{safe(lead.postedOn)}</span>
        </Typography>

        {/* Date and Time */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '44px',
            marginBottom: '30px',
            color: '#2d3748',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarDaysIcon
              style={{
                height: '20px',
                width: '20px',
                marginRight: '8px',
                color: '#718096',
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'rgba(0, 0, 0, 0.69)'
              }}
            >
              {safe(lead.date)}, {CURRENT_YEAR}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ClockIcon
              style={{
                height: '20px',
                width: '20px',
                marginRight: '8px',
                color: '#718096',
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'rgba(0, 0, 0, 0.69)'
              }}
            >
              {safe(lead.time)}
            </Typography>
          </Box>
        </Box>

        {/* Society Name */}
        <Typography
          variant="h6"
          sx={{
            marginTop: '-10px',
            marginBottom: '4px',
            fontWeight: 'semibold',
            fontSize: '16px',
            color: '#1a202c',
          }}
        >
          {safe(lead.name)}
        </Typography>

        {/* Address */}
        <Typography
          variant="body2"
          sx={{
            marginBottom: '24px',
            color: '#6B7280',
            lineHeight: '1.625',
            letterSpacing: '0.018rem'
          }}
        >
          {safe(lead.address)}
        </Typography>

        {/* Job Details (Service Type) Section */}
        <Typography
          variant="h5"
          sx={{
            fontSize: '22px',
            marginTop: '40px',
            marginBottom: '10px',
            fontWeight: '500',
            color: '#1a202c',
          }}
        >
          Service Details
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: '4px',
            color: '#2d3748',
            fontWeight: 500,
            fontSize: '16px'
          }}
        >
          Service Type
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            color: '#2d3748',
          }}
        >
          <WrenchScrewdriverIcon
            style={{
              height: '20px',
              width: '20px',
              marginRight: '8px',
              color: '#6B7280',
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: '#6B7280',
              fontSize: '14px'
            }}
          >
            {safe(lead.work)}
          </Typography>
        </Box>

        {/* Issue Description Section */}
        <Typography
          variant="body1"
          sx={{
            marginBottom: '4px',
            color: '#2d3748',
            fontWeight: 500,
            fontSize: '16px'
          }}
        >
          Issue Description
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: '32px',
            color: '#6B7280',
            lineHeight: '1.625',
            fontSize: '14px',
            letterSpacing: '0.018rem'
          }}
        >
          {safe(lead.issueDescription)}
        </Typography>

        {/* Action Button */}
        {!hideApply && (
  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    {isApplied ? (
      <Button
        variant="contained"
        color="error"
        sx={{ width: '45%' }}
        onClick={onWithdraw}
      >
        Withdraw Application
      </Button>
    ) : lead.status === "New" ? (
      proceed ? (
        <Button
          variant="contained"
          onClick={onFillQuotation}
          sx={{
            minWidth: '30%',
            backgroundColor: '#56A9D9',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          Fill Quotation and Apply
        </Button>
      ) : (
        <Button
          className='bg-blue-400'
          variant="contained"
          onClick={onApplyClick}
          sx={{
            width: '30%',
            backgroundColor: '#56A9D9',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          Apply
        </Button>
      )
    ) : null}
  </Box>
)}

        {/* Quotation Needed Reminder */}
        {proceed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
            <BsExclamationCircle color='#9CA3AF' size={16} className='rounded-full' />
            <Typography sx={{ color: '#9CA3AF', fontStyle: 'italic', fontSize: '13px' }}>
              Quotation needed.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default JobDetailsModal;