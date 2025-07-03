import { useState } from "react";
import { Paper, Switch } from '@mui/material';


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
                    borderRadius: 'xl',
                    boxShadow: 3,
                    width: '100%',
                    mb: 3
                }}
            >
                <span className="text-gray-800 font-medium text-lg">Notification</span>
                <div className="flex items-center">
                    <span className={`text-sm font-medium mr-2 ${notificationsEnabled ? 'text-blue-600' : 'text-gray-500'}`}>
                        {notificationsEnabled ? 'ON' : 'OFF'}
                    </span>
        
                    <Switch
                        checked={notificationsEnabled}
                        onChange={handleNotificationChange}
                        color="primary"
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#1773EA', // Blue color for ON state
                                '&:hover': {
                                    backgroundColor: 'rgba(23, 115, 234, 0.08)',
                                },
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#1773EA', // Blue track for ON state
                            },
                            '& .MuiSwitch-track': {
                                backgroundColor: '#C5C5C5', // Gray track for OFF state
                            },
                        }}
                    />
                </div>
            </Paper>
  )
}


export default NotificationCard;