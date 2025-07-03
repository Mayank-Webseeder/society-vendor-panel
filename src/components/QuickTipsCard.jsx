import React from 'react';
import quickTipsIcon from '../assets/quickTipsIcon.png';
import { Box, Typography, Paper } from '@mui/material';


function QuickTipsCard() {
  const tips = [
    "Responding faster increases your chance by 42%.",
    "Highest earning vendors do 4 jobs/day.",
    "Clients give 5 star to polite and clean vendors.",
  ];

  return (
    // Removed flex items-center justify-center p-4 to allow it to fit parent div
    // Added w-full h-full to make it occupy the full size of its parent
    <div className="font-inter w-full h-full">
      {/* Removed max-w-md to allow it to take full width of parent
          Added w-full h-full to make it occupy the full size of its parent */}
      <Paper elevation={3} className="rounded-lg shadow-lg p-4 bg-white w-full h-full">
        {/* Header Section */}
        <Box className="flex items-center mb-4 flex-shrink-0"> {/* flex-shrink-0 to prevent shrinking */}
          <img src={quickTipsIcon} className='h-6 w-6 mr-2' />
          <Typography variant="h6" className="text-gray-800 font-semibold text-lg">
            Quick Tips to Boost Your Work
          </Typography>
        </Box>

        {/* Tips List - Added flex-grow to allow the list to take available vertical space */}
        <ul className="list-none p-0 m-0 flex-grow overflow-y-auto pr-2"> {/* Added overflow-y-auto and pr-2 for scroll if content overflows */}
          {tips.map((tip, index) => (
            <li key={index} className="mb-2 flex items-start">
              <span className="text-gray-700 mr-2">•</span> {/* Custom bullet point */}
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {tip}
              </Typography>
            </li>
          ))}
        </ul>
      </Paper>
    </div>
  );
}

export default QuickTipsCard;
