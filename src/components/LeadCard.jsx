import { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { CalendarDaysIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import LeadDetailsModal from './LeadDetailsModal';


const LeadCard = ({ lead }) => {

  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);



  return (
    <>
      <Paper
        elevation={3}
        className="mb-3 pb-4 px-4 pt-1 rounded-lg border border-solid border-[#C5C5C5]"
      >
        <Box className="flex justify-between items-center mb-2" sx={{border: ''}}>
          {/* Left side: Lead Name and Work */}
          <Box className="flex flex-col">
            <Typography variant="subtitle1" className="font-medium text-gray-600" sx={{ fontWeight: '800', letterSpacing: '0.025rem', fontSize: '17px', marginBottom: '5px' }}>
              {lead.name}
            </Typography>
            <Box className="flex items-center text-gray-600 text-sm mt-1">
              <WrenchScrewdriverIcon className="h-4 w-4 mr-1 text-gray-500" />
              <Typography variant="body2" sx={{ fontWeight: '500' }}>
                {lead.work}
              </Typography>
            </Box>
          </Box>

          {/* Right side: Status and Date */}
          <Box className="flex flex-col items-end">
            <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mt-1 mb-2">
              {lead.status}
            </span>
            <Box className="flex items-center text-gray-600 text-sm">
              <CalendarDaysIcon className="h-4 w-4 mr-1 text-gray-500" />
              <Typography variant="body2">
                {lead.date}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="flex justify-center" sx={{ marginTop: '30px' }}>
          <Button
            variant="contained"
            className="w-[75%] bg-[#E3F2F9] hover:bg-blue-100 text-blue-500 font-semibold rounded-md shadow-none normal-case mt-3 flex-shrink-0"
            sx={{ backgroundColor: "#BFDBFE", color: "#4487AE", fontSize: "18px", fontWeight: '800', textTransform: 'none', paddingY: '2px' }}
            onClick={handleOpen}
          >
            View Details
          </Button>
        </Box>
      </Paper>

      <LeadDetailsModal open={open} onClose={handleClose} lead={lead} />
    </>
  );
};

export default LeadCard;