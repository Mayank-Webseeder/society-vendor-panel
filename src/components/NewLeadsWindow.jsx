import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import LeadCard from './LeadCard';
import dummyData from '../static/dummyData_Leads';



function NewLeadsWindow() {

  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/new-leads');
  };

  // Filter only "New" leads
  const newLeads = dummyData.filter(lead => lead.status === "New");


  return (
    <div className="w-full h-full">
      <Paper elevation={3} sx={{ borderRadius: '0.5rem' }} className="rounded-lg shadow-lg p-4 bg-white border border-solid border-[#C5C5C5] w-full h-full flex flex-col">
        {/* Header Section */}
        <Box className="flex justify-between items-center mb-4 flex-shrink-0">
          <Typography variant="h6" className="text-gray-800 font-semibold text-lg" sx={{ fontWeight: '700' }}>
            New Leads ({newLeads.length})
          </Typography>
          <Button
            variant="text"
            sx={{color: '#4487AE'}}
            className="hover:underline normal-case text-sm"
            onClick={handleViewAllClick}
          >
            <span className='underline'>View All</span>
          </Button>
        </Box>



        {/* Scrollable Content Area */}
        <Box className="overflow-y-auto pr-2 pb-4" sx={{ maxHeight: '350px' }}>
          {
            newLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))
          }
        </Box>
      </Paper>
    </div>
  );
}


export default NewLeadsWindow;