import { useState } from "react";
import { Paper, Switch, Typography, Box } from '@mui/material'; // Added Box and Typography for better structure

const NotificationCard = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleNotificationChange = (event) => {
    setNotificationsEnabled(event.target.checked);
  };

  return (
    <Paper
      elevation={3}
      className="rounded-xl p-6 flex items-center justify-between"
      sx={{
        backgroundColor: "white",
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        boxShadow: 3,
        width: '100%',
        mb: 3,
        fontFamily: 'Inter, sans-serif', // Ensure Inter font is used
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#424242' }}>
        Notification
      </Typography>

      <Box className="flex items-center">
        {/* The ON/OFF text is now part of the Switch itself */}
        <Switch
          checked={notificationsEnabled}
          onChange={handleNotificationChange}
          // Removed color="primary" as we're custom styling
          sx={{
            width: 60, // Further reduced overall width of the switch
            height: 30, // Further reduced overall height of the switch
            padding: 0,
            '& .MuiSwitch-switchBase': {
              padding: 0,
              margin: '3px', // Adjusted margin to position the thumb
              transitionDuration: '300ms',
              '&.Mui-checked': {
                transform: 'translateX(30px)', // Adjusted transform for new width (60 - 24 - 2*3)
                color: '#fff', // Thumb color when checked (white)
                '& + .MuiSwitch-track': {
                  backgroundColor: '#56A9D9', // Track color when checked (blue)
                  opacity: 1,
                  border: 0,
                },
                '& .MuiSwitch-thumb': {
                  backgroundColor: '#56A9D9', // Thumb background color when checked
                },
                '& .MuiSwitch-thumb::before': {
                  content: '"ON"',
                  color: 'white',
                  fontSize: '0.7rem', // Adjusted font size
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                },
              },
            },
            '& .MuiSwitch-thumb': {
              boxSizing: 'border-box',
              width: 24, // Further reduced thumb width
              height: 24, // Further reduced thumb height (for perfect square thumb)
              borderRadius: '12px', // Half of height for pill shape
              backgroundColor: '#fff', // Thumb background color when unchecked
              boxShadow: '0px 2px 4px rgba(0,0,0,0.2)', // Add shadow to thumb
              '&::before': {
                content: '"OFF"',
                color: '#4487AE', // Text color for OFF when switch is unchecked
                fontSize: '0.7rem', // Adjusted font size
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              },
            },
            '& .MuiSwitch-track': {
              borderRadius: '15px', // Half of height for pill shape (height/2)
              backgroundColor: '#E0E0E0', // Track color when unchecked (light gray)
              opacity: 1,
              transition: 'background-color 300ms',
            },
          }}
        />
      </Box>
    </Paper>
  );
};


export default NotificationCard;