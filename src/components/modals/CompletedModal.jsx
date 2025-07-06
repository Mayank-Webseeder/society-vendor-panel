import { Box, Typography } from '@mui/material';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { IoClose } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { TbCalendarCheck } from "react-icons/tb";
import { RiCheckDoubleFill } from "react-icons/ri";


const CURRENT_YEAR = 25;


const CompletedModal = ({ open, onClose, lead }) => {

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


        {/* Feedback and Rating, if present */}
        <Box sx={{ mb: 0, mt: 4 }}>
          <Typography
            variant='h6'
            sx={{
              marginTop: '-10px',
              marginBottom: '1px',
              fontWeight: 'bold',
              fontSize: '17px',
              color: '#1a202c',
            }}
          >
            Feedback for you
          </Typography>

          {/* Show rating if present and valid */}
          {lead.rating !== undefined && lead.rating !== null && !isNaN(Number(lead.rating)) && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <IoIosStar color='#FED700' size={20} style={{ marginRight: 7 }} />
              <Typography component="span" sx={{ fontWeight: 800, fontSize: 17, paddingTop: 0.5 }}>
                {Number(lead.rating)}
              </Typography>
              <span className='pt-1 text-[#D9D9D9]'>/5.0</span>
            </Box>
          )}

          {/* Show feedback if present and non-empty */}
          {typeof lead.feedback === 'string' && lead.feedback.trim() !== '' && (
            <Typography
            variant='body2'
            className='text-gray-600'
              sx={{
                marginBottom: '12px',
                color: '#4B5563',
                lineHeight: '1.625',
                fontStyle: 'italic',
                letterSpacing: '0.018rem'
              }}
            >
              {lead.feedback}
            </Typography>
          )}
        </Box>


        <hr color='#D1D5DB'/>


        {/* Posted On */}
        <Typography
          variant="body2"
          className='text-gray-300'
          sx={{
            paddingLeft: '4px',
            marginTop: '12px',
            marginBottom: '12px',
            color: '#6B7280',
            fontSize: '15px',
          }}
        >
          Posted On: <span className="font-normal px-1 text-[17px] text-[#2E6074]/[0.69]">{safe(lead.postedOn)}</span>
        </Typography>


        {/* Date and Time */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 3
          }}
        >
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1 }}>
            <TbCalendarCheck color='rgba(28,27,31,0.69)' />
            <Typography variant="subtitle2" color='rgba(28,27,31,0.69)'>
              Job Date and Time: <span className="font-normal px-1 text-[16px] text-[#2E6074]/[0.69]">{safe(lead.postedOn)} <span>|</span> {safe(lead.date)}</span>
            </Typography>
          </Box>
          
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <RiCheckDoubleFill color='rgba(28,27,31,0.69)' />
            <Typography variant="subtitle2" color='rgba(28,27,31,0.69)'>
              Completed at: <span className="font-normal px-1 text-[16px] text-[#2E6074]/[0.69]">{safe(lead.completeDate)} <span>|</span> {safe(lead.completeTime)}</span>
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
            marginTop: '30px',
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
            marginBottom: '15px',
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
            marginBottom: '16px',
            color: '#6B7280',
            lineHeight: '1.625',
            fontSize: '14px',
            letterSpacing: '0.018rem'
          }}
        >
          {safe(lead.issueDescription)}
        </Typography>

      </Box>
    </Box>
  );
};

export default CompletedModal;