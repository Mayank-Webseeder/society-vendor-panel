import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Box, TextField } from '@mui/material';
import onboardingImage from '../../assets/onboardingImage.png';
import { useOnBoarding } from './OnboardingContext';


const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];



const Step3_WorkingDays = () => {

  const navigate = useNavigate();

  const { onboardingData, updateOnboardingData } = useOnBoarding();

  const [selectedDays, setSelectedDays] = useState(onboardingData.workingDays || []);
  const [startTime, setStartTime] = useState(onboardingData.wokingHours?.[0] || '');
  const [endTime, setEndTime] = useState(onboardingData.wokingHours?.[1] || '');


  useEffect(() => {
    updateOnboardingData({
      workingDays: selectedDays,
      wokingHours: [startTime, endTime],
    });
  }, [selectedDays, startTime, endTime, updateOnboardingData]);


  const handleDayToggle = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleContinue = () => {
    navigate('/auth/onboarding/profile-1')
  };



  
  return (
    <Paper
      elevation={7}
      sx={{
        width: '80%',
        height: '80%',
        display: 'flex',
        borderRadius: '12px',
        overflow: 'hidden',
        //fontFamily: 'Inter, sans-serif', // Ensure Inter font is used
      }}
    >

      {/* Debugging Purposes */}
      <pre>{JSON.stringify(onboardingData, null, 2)}</pre>


      {/* Left Half: Form Content */}
      <div 
        style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} 
        className='w-full h-full rounded-xl px-8 sm:px-12 sm:py-8 flex flex-col justify-between bg-white'>
          <div className="flex flex-col">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: 'rgba(0,0,0,0.79)', // Changed color to text-black/[0.79]
                mb: { xs: 2.5, sm: 2.5 }, // Margin bottom
                fontSize: { xs: '1.75rem', sm: '2.25rem' }, // Responsive font size
              }}
            >
              Select Your Working Days
            </Typography>

            {/* Working Days Buttons */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(auto-fit, minmax(80px, 1fr))', // Responsive columns
                  sm: 'repeat(4, 1fr)', // 4 columns on small screens and up
                },
                gap: { xs: 1, sm: 2 }, // Responsive gap
                mb: { xs: 6, sm: 8 }, // Margin bottom
                maxWidth: '450px', // Constrain width as per image
              }}
            >
              {daysOfWeek.map((day) => (
                <Button
                  key={day}
                  // Variant is now always 'contained' visually, but we use state for selection
                  // The background and text color will change based on selection
                  variant="contained" // Use contained to control background color directly
                  onClick={() => handleDayToggle(day)}
                  sx={{
                    minWidth: 'auto',
                    px: { xs: 1, sm: 2 },
                    py: { xs: 0.5, sm: 0.8 }, // Decreased y-padding here
                    borderRadius: '8px',
                    fontSize: { xs: '0.9rem', sm: '1rem' }, // Increased font size here
                    fontWeight: 'bold', // Changed font weight to bold
                    textTransform: 'none',
                    // No border
                    color: '#4487AE', // Text color for all weekdays
                    bgcolor: 'rgba(86, 169, 217, 0.17)', // Background color for all weekdays
                    '&:hover': {
                      bgcolor: 'rgba(86, 169, 217, 0.25)', // Slightly darker on hover
                    },
                    // Style for selected state
                    ...(selectedDays.includes(day) && {
                      bgcolor: '#56A9D9', // Solid blue for selected
                      color: 'white', // White text for selected
                      '&:hover': {
                        bgcolor: '#42A5F5', // Darker blue on hover for selected
                      },
                    }),
                  }}
                >
                  {day}
                </Button>
              ))}
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: 'rgba(0,0,0,0.79)', // Changed color to text-black/[0.79]
                mb: { xs: 2.5, sm: 2.5 }, // Margin bottom
                fontSize: { xs: '1.75rem', sm: '2.25rem' }, // Responsive font size
              }}
            >
              Select Your Working Hours
            </Typography>

            {/* Opening Hours */}
            <Box sx={{ mb: { xs: 3, sm: 4 }, maxWidth: '450px' }}>
              <Typography variant="body1" sx={{ color: '#56A9D9', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Opening Hours
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Select Start Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                InputProps={{
                  sx: {
                    '& .MuiInputBase-input::placeholder': {
                      textAlign: 'center', // Align placeholder to center
                      opacity: 1, // Ensure placeholder is not faded by default
                      color: '#A1A0A0', // Set placeholder color to #A1A0A0
                    },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    bgcolor: '#ffffff',
                    '& fieldset': { borderColor: '#e0e0e0' },
                  },
                  '& .MuiInputBase-input': {
                    color: '#424242',
                    fontSize: '0.875rem',
                    py: '10px',
                    textAlign: 'center', // Ensure input text is also aligned to center
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '0.875rem',
                    color: '#757575',
                  },
                }}
              />
            </Box>

            {/* Closing Hours */}
            <Box sx={{ mb: { xs: 6, sm: 8 }, maxWidth: '450px' }}>
              <Typography variant="body1" sx={{ color: '#56A9D9', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Closing Hours
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Select End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                InputProps={{
                  sx: {
                    '& .MuiInputBase-input::placeholder': {
                      textAlign: 'center', // Align placeholder to center
                      opacity: 1, // Ensure placeholder is not faded by default
                      color: '#A1A0A0', // Set placeholder color to #A1A0A0
                    },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    bgcolor: '#ffffff',
                    '& fieldset': { borderColor: '#e0e0e0' },
                  },
                  '& .MuiInputBase-input': {
                    color: '#424242',
                    fontSize: '0.875rem',
                    py: '10px',
                    textAlign: 'center', // Ensure input text is also aligned to center
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '0.875rem',
                    color: '#757575',
                  },
                }}
              />
            </Box>
          </div>

          {/* Continue Button */}
          <Button
            variant="outlined" // Changed to outlined to easily control border and background
            onClick={handleContinue}
            sx={{
              py: '10px',
              bgcolor: 'white', // Background color white
              color: '#56A9D9', // Text color #56A9D9
              borderColor: '#56A9D9', // Border color #56A9D9
              fontWeight: 'bold',
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: '#E0F2FF', // Light blue on hover
                borderColor: '#56A9D9', // Keep border color on hover
              },
              width: '150px', // Fixed width for the button
              alignSelf: 'center', // Center the button
            }}
          >
            Continue
          </Button>
      </div>
    

      {/* Right Half: Image */}
      <div className='flex-1 flex items-center justify-center'> {/* Placeholder for the image background */}
        <img
          src={onboardingImage}
          alt="Illustration"
          className="max-w-full h-auto object-contain"
        />
      </div>
      
    </Paper>
  );
};


export default Step3_WorkingDays;