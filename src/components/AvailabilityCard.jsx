import { Box, Typography, Paper, Button } from '@mui/material';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useUser } from '../UserContext'; // <-- Import your global context


function AvailabilityCard() {

  const { user } = useUser(); // <-- Get user data from context

  // Fallbacks in case user data is not yet loaded
  const workDays = user?.workingDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const workingHours = user?.workingHours || '8AM - 5PM';

  const handleEditClick = () => {
    console.log("Edit button clicked for Availability card");
    // Add logic for editing availability here
  };



  return (
    <div className="font-inter w-full h-full">
      <Paper elevation={3} sx={{borderRadius: '0.5rem'}} className="rounded-lg shadow-lg px-3 pt-1 bg-white border border-solid border-[#C5C5C5] w-full h-full flex flex-col mb-7">
        <Box className="flex justify-between items-center mb-4 flex-shrink-0">
          <Typography variant="h6" sx={{fontWeight: '600'}} className="text-gray-800 font-semibold text-lg">
            Available
          </Typography>
          <Button
            variant="text"
            sx={{color: '#4487AE'}}
            className="text-[#4487AE] hover:underline normal-case text-sm"
            onClick={handleEditClick}
          >
            <span className='pr-1 underline'>Edit</span> &gt;
          </Button>
        </Box>

        <Box className="flex-grow overflow-y-auto pr-2">
          {/* Work Days Section */}
          <Box className="mb-4">
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}} className="flex items-center text-gray-600 text-sm mb-2">
              <CalendarDaysIcon className="h-5 w-5 mr-2 text-[#56A9D9]" />
              <Typography variant="body2" sx={{fontSize: '16px', fontWeight: '600'}} className="font-medium text-black/[0.69]">
                Your Work Days
              </Typography>
            </Box>
            <Box className="flex gap-2 overflow-x-auto pb-1">
              {workDays.map((day) => (
                <span
                  key={day}
                  className="bg-[#56A9D9] text-white text-base font-medium px-4 py-1 rounded-md shadow-sm flex-shrink-0"
                >
                  {day}
                </span>
              ))}
            </Box>
          </Box>

          {/* Working Hours Section */}
          <Box>
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}} className="flex items-center text-gray-600 text-sm mb-3">
              <ClockIcon className="h-5 w-5 mr-2 text-[#56A9D9]" />
              <Typography variant="body2" sx={{fontSize: '16px', fontWeight: '600'}} className="font-medium text-black/[0.69]">
                Working Hours
              </Typography>
            </Box>
            <span className="bg-[#56A9D9] text-white text-base font-medium px-4 py-1 rounded-md shadow-sm">
              {workingHours}
            </span>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}


export default AvailabilityCard;