import { Box, Typography, Paper, Button } from '@mui/material';
// import { CalendarDaysIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import LeadCard from './LeadCard';
import dummyData from '../static/dummyData_Leads';


function App() {

  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/new-leads');
  };


return (
    <div className="w-full h-full">
        <Paper elevation={3} className="rounded-lg shadow-lg p-4 bg-white border border-solid border-[#C5C5C5] w-full h-full flex flex-col">
            {/* Header Section */}
            <Box className="flex justify-between items-center mb-4 flex-shrink-0">
                <Typography variant="h6" className="text-gray-800 font-semibold text-lg" sx={{fontWeight: '700'}}>
                    New Leads ({dummyData.length})
                </Typography>
                <Button
                    variant="text"
                    className="text-blue-600 hover:underline normal-case text-sm"
                    onClick={handleViewAllClick}
                >
                    View All
                </Button>
            </Box>

            {/* Scrollable Content Area */}
            <Box className="overflow-y-auto pr-2 pb-4" sx={{ maxHeight: '350px' }}>
            {
                dummyData.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                ))
            }
            </Box>
        </Paper>
    </div>
);
}

export default App;