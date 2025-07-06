import { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { IoIosStar } from "react-icons/io";
import { CalendarDaysIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { FiClock } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import NewLeadModal from './modals/NewLeadModal';
import CompletedModal from './modals/CompletedModal';
import OngoingModal from './modals/OngoingModal';
import QuotationFormModal from './modals/QuotationFormModal';
import WithdrawApplicationModal from './modals/WithdrawApplicationModal';
import CancelJobModal from './modals/CancelJobModal';



const LeadCard = ({ lead }) => {

  const [open, setOpen] = useState(false);
  const [showQuotation, setShowQuotation] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);


  let modal = null;
  if (lead.status === "New") {
    if (showQuotation) {
      modal = (
        <QuotationFormModal
          open={showQuotation}
          onClose={() => setShowQuotation(false)}
          onSubmit={() => {
            setShowQuotation(false);
            setOpen(false);
          }}
        />
      );
    } else {
      modal = (
        <NewLeadModal
          open={open}
          onClose={() => setOpen(false)}
          lead={lead}
          onFillQuotation={() => setShowQuotation(true)} // <-- pass this prop
        />
      );
    }
  }
   else if (lead.status === "Applied") {
    if (lead.pendingStatus === "Approval Pending") {
      modal = (
        <WithdrawApplicationModal
          open={open}
          onClose={handleClose}
          lead={lead}
          onConfirm={() => {
            // handle withdraw logic here if needed
            handleClose();
          }}
        />
      );
    } else if (lead.pendingStatus === "Approved") {
      modal = (
        <CancelJobModal
          open={open}
          onClose={handleClose}
          lead={lead}
          onConfirm={() => {
            // handle cancel logic here if needed
            handleClose();
          }}
        />
      );
    }
  } else if (lead.status === "Completed") {
    modal = (
      <CompletedModal
        open={open}
        onClose={handleClose}
        lead={lead}
      />
    );
  } else if (lead.status === "Ongoing") {
    modal = (
      <OngoingModal
        open={open}
        onClose={handleClose}
        lead={lead}
      />
    );
  }



  return (
    <>
      <Paper
        elevation={3}
        className="mb-3 pb-4 px-4 pt-1 rounded-lg border border-solid border-[#C5C5C5]"
      >
        <Box className="flex justify-between items-center mb-2">

          {/* Left side: Lead Name and Work */}
          <Box className="flex flex-col justify-center h-full">
            <Typography
              variant="subtitle1"
              className="font-medium"
              sx={{
                color: 'rgba(0, 0, 0, 0.79)',
                mt: lead.status === 'Ongoing' || lead.status === "Completed" ? 1 : 0,
                fontWeight: '700',
                fontSize: '17px',
                marginBottom: '5px',
                lineHeight: 1.2,
              }}
            >
              {lead.name}
            </Typography>
            <Box className="flex items-center text-gray-600 text-sm mt-1">
              <WrenchScrewdriverIcon className="h-4 w-4 mr-1 text-gray-500" />
              <Typography variant="body2" sx={{ fontWeight: '500' }}>
                {lead.work}
              </Typography>
            </Box>

            {/* Show rating for Completed, dueTime for Ongoing */}
            {lead.status === "Completed" && lead.rating && (
              <Box className="flex items-center mt-1">
                <Typography
                  variant="body2"
                  sx={{ fontWeight: '600', color: '#FFA726', fontSize: '15px', mr: 0.5 }}
                >
                  {lead.rating}
                </Typography>
                <IoIosStar size={18} color="#FFA726" />
              </Box>
            )}
            {lead.status === "Ongoing" && lead.dueTime && (
              <Box className="flex items-center mt-2">
                <FiClock className="mr-1" color="rgba(0,0,0,0.59)" size={16} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: '500', color: 'rgba(0,0,0,0.59)', fontSize: '14px' }}
                >
                  {lead.dueTime}
                </Typography>
              </Box>
            )}
          </Box>
          
          <Box className="flex flex-col items-end">
            <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mt-1 mb-2">
              {lead.status === "Applied" && lead.pendingStatus ? (
                <span className={`flex items-center justify-center gap-2 ${lead.pendingStatus == "Approved"?  "text-[#34A853]" : "text-[#4487AE]"} font-bold`}>
                  <span className={`${lead.pendingStatus == 'Approved'?  'flex items-center justify-center' : 'hidden'}`}><FaCheck /></span> {lead.pendingStatus}
                </span>
              ) : 
                (
                  <span className="text-sm text-[#4487AE] font-bold">
                  {lead.status}
                </span>
                )
              }
            </span>
            
            <Box className="flex items-center text-gray-600 text-sm">
              {lead.status === "Completed" ? (
                <Typography variant="body2" sx={{ fontWeight: '400', color: '#34A853' }}>
                  Completed: <span className='font-medium text-black/[0.59]'>{lead.completeDate}</span>
                </Typography>
              ) : (
                <>
                  <CalendarDaysIcon className="h-4 w-4 mr-1 text-gray-500" />
                  <Typography variant="body2" sx={{ fontWeight: '500' }}>
                    {lead.date}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>


        <Box className="flex justify-center" sx={{ marginTop: '30px' }}>
          <Button
            variant="contained"
            className="w-[75%] bg-[#E3F2F9] hover:bg-blue-100 text-blue-500 font-bold rounded-md shadow-none normal-case mt-3 flex-shrink-0"
            sx={{ backgroundColor: "rgba(86, 169, 217, 0.17)", color: "#4487AE", fontSize: "18px", fontWeight: '900', textTransform: 'none', paddingY: '2px' }}
            onClick={handleOpen}
          >
            View Details
          </Button>
        </Box>
      </Paper>



      {modal}
    
    </>
  );
};

export default LeadCard;