import { Box, Typography } from '@mui/material';
import { CalendarDaysIcon, ClockIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
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
        zIndex: 30,
        top: 0,
        left: { xs: 0, sm: '4rem', md: '5rem' },
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
          px: { xs: '18px', sm: '26px', md: '32px' },
          py: { xs: '18px', sm: '28px', md: '32px' },
          zIndex: 10,
          width: { xs: '90%', sm: '100%' },
          mx: 'auto',
          maxWidth: '600px',
          maxHeight: { xs: '83vh', sm: '95vh' },
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { width: 0 },
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
                lineHeight: 1.25
              }}
            >
              Job Completed
            </Typography>
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
              }}
            >
              <RiCheckDoubleFill size={14} />
              Completed
            </Box>
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


        {/* Feedback and Rating */}
        {(lead.rating !== undefined && lead.rating !== null && !isNaN(Number(lead.rating))) || 
         (typeof lead.feedback === 'string' && lead.feedback.trim() !== '') ? (
          <Box sx={{ marginBottom: '24px' }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '15px', sm: '16px' },
                fontWeight: '600',
                color: '#111827',
              }}
            >
              Customer Feedback
            </Typography>
            
            <Box
              sx={{
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                padding: '7px',
              }}
            >
              {/* Rating */}
              {lead.rating !== undefined && lead.rating !== null && !isNaN(Number(lead.rating)) && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: lead.feedback ? '8px' : '0' }}>
                  <IoIosStar color='#FED700' size={20} style={{ marginRight: 8 }} />
                  <Typography 
                    sx={{ 
                      fontWeight: '600', 
                      fontSize: '16px', 
                      color: '#111827',
                      marginRight: '4px'
                    }}
                  >
                    {Number(lead.rating)}
                  </Typography>
                  <Typography sx={{ color: '#6b7280', fontSize: { xs: '13px', sm: '14px' } }}>
                    /5.0
                  </Typography>
                </Box>
              )}
              
              {/* Feedback */}
              {typeof lead.feedback === 'string' && lead.feedback.trim() !== '' && (
                <Typography
                  sx={{
                    color: '#6b7280',
                    fontSize: { xs: '13px', sm: '14px' },
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                  }}
                >
                  "{lead.feedback}"
                </Typography>
              )}
            </Box>
          </Box>
        ) : null}

        {/* Date and Time */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            marginBottom: '24px',
            '& > div': { flex: 1, minWidth: 0 }
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

        {/* Completion Date and Time */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            marginBottom: '24px',
            '& > div': { flex: 1, minWidth: 0 }
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#ecfdf5',
              borderRadius: '8px',
              padding: { xs: '10px', sm: '12px' },
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #d1fae5',
            }}
          >
            <TbCalendarCheck
              style={{
                height: '20px',
                width: '20px',
                color: '#059669',
              }}
            />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '11px', sm: '12px' },
                  color: '#065f46',
                  fontWeight: '500',
                }}
              >
                Completed Date
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '13px', sm: '14px' },
                  fontWeight: '600',
                  color: '#111827',
                }}
              >
                {safe(lead.completeDate)}
              </Typography>
            </Box>
          </Box>
          
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#ecfdf5',
              borderRadius: '8px',
              padding: { xs: '10px', sm: '12px' },
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #d1fae5',
            }}
          >
            <ClockIcon
              style={{
                height: '20px',
                width: '20px',
                color: '#059669',
              }}
            />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '11px', sm: '12px' },
                  color: '#065f46',
                  fontWeight: '500',
                }}
              >
                Completed Time
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '13px', sm: '14px' },
                  fontWeight: '600',
                  color: '#111827',
                }}
              >
                {safe(lead.completeTime)}
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
              lineHeight: 1.3
            }}
          >
            {safe(lead.name)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#6b7280',
              lineHeight: 1.45,
              fontSize: { xs: '13px', sm: '14px' },
            }}
          >
            {safe(lead.address)}
          </Typography>
        </Box>

        {/* Service Details */}
        <Box>
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
                lineHeight: 1.5,
                fontSize: { xs: '13px', sm: '14px' },
              }}
            >
              {safe(lead.issueDescription)}
            </Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default CompletedModal;