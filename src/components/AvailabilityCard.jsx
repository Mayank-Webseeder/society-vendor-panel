import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline'; // Using Heroicons for icons

function AvailabilityCard() {
  const workDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const workingHours = '8AM-5PM';

  const handleEditClick = () => {
    console.log("Edit button clicked for Available card");
    // Add logic for editing availability here
  };

  return (
    // Ensure this outermost div takes full width and height of its parent
    <div className="font-inter w-full h-full">
      {/* Paper component now takes full height and acts as a flex column container */}
      <Paper elevation={3} className="rounded-lg shadow-lg px-3 pt-1 bg-white w-full h-full flex flex-col">
        {/* Header Section - flex-shrink-0 prevents it from shrinking */}
        <Box className="flex justify-between items-center mb-4 flex-shrink-0">
          {/* Removed negative margin-top */}
          <Typography variant="h6" className="text-gray-800 font-semibold text-lg">
            Available
          </Typography>
          <Button
            variant="text"
            className="text-blue-600 hover:underline normal-case text-sm"
            onClick={handleEditClick}
          >
            Edit &gt;
          </Button>
        </Box>

        {/* Content Wrapper - flex-grow to take available vertical space, overflow-y-auto for scrolling */}
        <Box className="flex-grow overflow-y-auto pr-2">
          {/* Work Days Section - Removed negative margin-top and margin-left */}
          <Box className="mb-4">
            <Box className="flex items-center text-gray-600 text-sm mb-2">
              <CalendarDaysIcon className="h-4 w-4 mr-2 text-gray-500" />
              <Typography variant="body2" className="font-medium text-gray-700">
                Your Work Days
              </Typography>
            </Box>
            <Box className="flex gap-2 overflow-x-auto pb-1">
              {workDays.map((day) => (
                <span
                  key={day}
                  className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm flex-shrink-0"
                >
                  {day}
                </span>
              ))}
            </Box>
          </Box>

          {/* Working Hours Section */}
          <Box>
            <Box className="flex items-center text-gray-600 text-sm mb-3">
              <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
              <Typography variant="body2" className="font-medium text-gray-700">
                Working Hours
              </Typography>
            </Box>
            <span className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm">
              {workingHours}
            </span>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}

export default AvailabilityCard;
