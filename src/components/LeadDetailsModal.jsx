import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { CalendarDaysIcon, ClockIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'; // Importing necessary icons
import { BsExclamationCircle } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import QuotationFormModal from './QuotationFormModal';


const LeadDetailsModal = ({ open, onClose, lead }) => {

  const [proceed, setProceed] = useState(false);
  const [showQuotation, setShowQuotation] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [canCancel, setCanCancel] = useState(false);


  // Lock scroll on #main-content when modal is open
  useEffect(() => {
    const content = document.getElementById('main-content');
    if (!content) return; // Ensure element exists before trying to modify style
    if (open) {
      content.style.overflow = 'hidden';
    } else {
      content.style.overflow = '';
    }
    // Cleanup on unmount or when modal closes
    return () => {
      content.style.overflow = '';
    };
  }, [open]);


  //Close modal on pressing ESC
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
        if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);


  // Reset proceed when modal closes
  useEffect(() => {
    if (!open) setProceed(false);
  }, [open]);


  if (!open || !lead) return null;


  // Fallback helper
  const safe = (val) => (val !== undefined && val !== null && val !== '' ? val : 'N/A');


  // Handler for "Apply"
  const handleApplyClick = () => setProceed(true);

  // Handler for "Fill Quotation and Apply"
  const handleFillQuotation = () => setShowQuotation(true);

  // Handler for "Submit and Apply" in Quotation modal
  const handleSubmitQuotation = () => {
    setShowQuotation(false);
    setHasApplied(true);
    setProceed(false);
  };

  // Handler for "Withdraw Application" or "Cancel Job"
  const handleWithdraw = () => setShowWithdrawConfirm(true);

  // Handler for confirmation dialog "Yes"
  const handleWithdrawConfirmYes = () => {
    if (!canCancel) {
      setCanCancel(true);
      setHasApplied(false);
      setShowWithdrawConfirm(false);
      setProceed(false);
    } else {
      setShowWithdrawConfirm(false);
      setCanCancel(false);
      setProceed(false);
      setHasApplied(false);
      onClose();
    }
  };

  // Handler for confirmation dialog "No"
  const handleWithdrawConfirmNo = () => setShowWithdrawConfirm(false);




    // --- Quotation Modal ---
    if (showQuotation) {
        return (
            <QuotationFormModal
                open={showQuotation}
                onClose={() => setShowQuotation(false)}
                onSubmit={() => {
                    setShowQuotation(false);
                    setHasApplied(true);
                    setProceed(false);
                }}
            />
        );
    }


    // --- Original Modal ---
    return (
    <Box
        sx={{
            position: 'fixed',
            zIndex: 50,
            top: '4rem', // below navbar
            left: '14rem', // sidebar width
            width: 'calc(100vw - 14rem)', // only the content area
            height: 'calc(100vh - 4rem)',
            display: 'flex', // flex
            alignItems: 'center', // items-center
            justifyContent: 'center', // justify-center
        }}
    >

        {/* Overlay */}
        <Box
            sx={{
                position: 'absolute', // absolute
                inset: 0, // inset-0
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // bg-black bg-opacity-30
                zIndex: 0, // z-0
            }}
            //onClick={onClose} // Allow clicking overlay to close modal
        />

        {/* Close icon */}
        <Box
            sx={{
                position: 'absolute',
                top: '1rem', // 4rem (modal top) minus 32px (button size + margin)
                right: '22rem', // 1rem (modal right padding) + 16px (margin)
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
                '&:hover' : {backgroundColor: '#60A5FA'},
            }}
            onClick={onClose}
        >
            <IoClose size={25} color="#fff" />
        </Box>

        {/* Modal content */}
        <Box
            sx={{
                position: 'relative',
                backgroundColor: 'white', // bg-white
                borderRadius: '8px', // rounded-lg
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', // shadow-xl (adjusted for better visual)
                paddingX: { xs: '20px', md: '24px' }, // p-6 md:p-8
                paddingY: { xs: '16px', md: '20px' }, // p-6 md:p-8
                zIndex: 10, // z-10
                width: '100%', // w-full
                maxWidth: '32rem', // max-w-lg (Tailwind's max-w-lg is 32rem or 512px)
                overflowY: 'auto', // overflow-y-auto
                maxHeight: '90vh', // max-h-[90vh]
            }}
        >

            {/* Job Details Header */}
            <Typography
                variant="h5"
                sx={{
                    marginLeft: '-8px',
                    marginBottom: '20px', // mb-4 (original sx value)
                    fontWeight: '500', // font-bold
                    color: '#1a202c', // text-gray-900
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
                    marginBottom: '12px', // mb-4
                    color: '#6B7280', // text-gray-600
                    fontSize: '14px', // original sx value
                }}
            >
                Posted On: <span className="font-normal px-1 text-[17px] text-gray-400">{safe(lead.postedOn)}</span>
            </Typography>

            {/* Date and Time */}
            <Box
                sx={{
                    display: 'flex', // flex
                    alignItems: 'center', // items-center
                    gap: '44px', // gap-11
                    marginBottom: '30px', // mb-6
                    color: '#2d3748', // text-gray-700
                }}
            >
                <Box
                    sx={{
                        display: 'flex', // flex
                        alignItems: 'center', // items-center
                    }}
                >
                    <CalendarDaysIcon
                        style={{
                            height: '20px', // h-5
                            width: '20px', // w-5
                            marginRight: '8px', // mr-2
                            color: '#718096', // text-gray-500
                        }}
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '16px',
                            fontWeight: 500, // font-medium
                        }}
                    >
                        {safe(lead.date)}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex', // flex
                        alignItems: 'center', // items-center
                    }}
                >
                    <ClockIcon
                        style={{
                            height: '20px', // h-5
                            width: '20px', // w-5
                            marginRight: '8px', // mr-2
                            color: '#718096', // text-gray-500
                        }}
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '16px',
                            fontWeight: 500, // font-medium
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
                    color: '#1a202c', // text-gray-900
                }}
            >
                {safe(lead.name)}
            </Typography>

            {/* Address */}
            <Typography
                variant="body2"
                sx={{
                    marginBottom: '24px', // mb-6
                    color: '#6B7280',
                    lineHeight: '1.625', // leading-relaxed
                }}
            >
                {safe(lead.address)}
            </Typography>

            {/* Job Details (Service Type) Section */}
            <Typography
                variant="h5"
                sx={{
                    fontSize: '23px',
                    marginTop: '40px',
                    marginBottom: '10px', // mb-4
                    fontWeight: '500', // font-bold
                    color: '#1a202c', // text-gray-900
                }}
            >
                Job Details
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    marginBottom: '4px', // mb-2
                    color: '#2d3748', // text-gray-700
                    fontWeight: 500,
                    fontSize: '16px'
                }}
            >
                Service Type
            </Typography>
            <Box
                sx={{
                    display: 'flex', // flex
                    alignItems: 'center', // items-center
                    marginBottom: '24px', // mb-6
                    color: '#2d3748', // text-gray-700
                }}
            >
                <WrenchScrewdriverIcon
                    style={{
                        height: '20px', // h-5
                        width: '20px', // w-5
                        marginRight: '8px', // mr-2
                        color: '#6B7280', // text-gray-500
                    }}
                />
                <Typography
                    variant="body1"
                    sx={{
                        color: '#6B7280', // text-gray-700
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
                    marginBottom: '4px', // mb-4
                    color: '#2d3748', // text-gray-700
                    fontWeight: 500,
                    fontSize: '16px'
                }}
            >
                Issue Description
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    marginBottom: '32px', // mb-8
                    color: '#6B7280',
                    lineHeight: '1.625', // leading-relaxed
                    fontSize: '14px'
                }}
            >
                {safe(lead.issueDescription)}
            </Typography>

            {/* Apply/Withdraw/Cancel button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {
                    hasApplied ? (
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ width: '45%' }}
                            onClick={handleWithdraw}
                            >
                            Withdraw Application
                            </Button>
                        ) : canCancel ? (
                            <Button
                            variant="contained"
                            color="error"
                            sx={{ width: '45%' }}
                            onClick={handleWithdraw}
                            >
                            Cancel Job
                            </Button>
                        ) : proceed ? (
                            <Button
                            variant="contained"
                            onClick={handleFillQuotation}
                            sx={{ minWidth: '30%' }}
                            >
                            Fill Quotation and Apply
                            </Button>
                            ) : (
                            <Button
                            className='bg-blue-400'
                            variant="contained"
                            onClick={handleApplyClick}
                            sx={{ width: '30%' }}
                            >
                            Apply
                            </Button>
                        )}
            </Box>


            {/* Confirmation Dialog */}
        {showWithdrawConfirm && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                padding: '32px 24px',
                minWidth: '320px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                {
                    canCancel
                    ? 'Are you sure you want to cancel this job?'
                    : 'Are you sure you want to Cancel this job ?'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button
                    variant="contained"
                    color="error"
                    onClick={handleWithdrawConfirmYes}
                    >
                    Yes
                    </Button>
                    <Button
                    variant="outlined"
                    onClick={handleWithdrawConfirmNo}
                    >
                    No
                    </Button>
                </Box>
            </Box>
          </Box>
        )}


            {/* 'Quotation Needed' reminder */}
            {
                proceed  &&
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px'}}>
                        <BsExclamationCircle color='#9CA3AF' size={16} className='rounded-full'/>
                        <Typography sx={{color:'#9CA3AF', fontStyle: 'italic', fontSize: '13px'}}>
                            Quotation needed.
                        </Typography>
                    </Box>
            }
        </Box>
    </Box>
);
};


export default LeadDetailsModal;