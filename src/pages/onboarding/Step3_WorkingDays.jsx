import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Box, TextField, MenuItem, Select } from '@mui/material';
import onboardingImage from '../../assets/onboardingImage.png';
import logoWhite from '../../assets/logoWhite.png';
import { useOnBoarding } from './OnboardingContext';


const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


const Step3_WorkingDays = () => {

  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();

  const [selectedDays, setSelectedDays] = useState(onboardingData.workingDays || []);
  const [startTime, setStartTime] = useState(onboardingData.wokingHours?.[0]?.split(' ')[0] || '');
  const [startPeriod, setStartPeriod] = useState(onboardingData.wokingHours?.[0]?.split(' ')[1] || 'AM');
  const [endTime, setEndTime] = useState(onboardingData.wokingHours?.[1]?.split(' ')[0] || '');
  const [endPeriod, setEndPeriod] = useState(onboardingData.wokingHours?.[1]?.split(' ')[1] || 'PM');
  const [error, setError] = useState('');


  const handleTimeChange = (value, setter) => {
    // Only allow digits and at most one colon, and colon not as first character
    if (!/^\d{0,2}(:\d{0,2})?$/.test(value)) return;

    // Prevent colon as the first character
    if (value.startsWith(':')) return;

    // If there's a colon, validate minutes part
    if (value.includes(':')) {
      const [hour, min] = value.split(':');
      // Only allow if minutes is less than 60
      if (min && (isNaN(min) || Number(min) >= 60)) return;
    }

    // Only allow hour between 0 and 12
    const [hour] = value.split(':');
    if (hour && (isNaN(hour) || Number(hour) < 0 || Number(hour) > 12)) return;

    setter(value);
  };


  const handleStartTimeChange = (e) => {
    handleTimeChange(e.target.value, setStartTime);
  };

  const handleEndTimeChange = (e) => {
    handleTimeChange(e.target.value, setEndTime);
  };

  // Helper to format time: pad minutes to two digits if only one digit, and add :00 if only hour is present
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hour, min] = timeStr.split(':');
    if (min === undefined) {
      // Only hour entered, add :00
      return `${String(Number(hour))}:00`;
    }
    const paddedMin = min.length === 1 ? `0${min}` : min;
    return `${String(Number(hour))}:${paddedMin}`;
  };


  useEffect(() => {
    // Always store workingDays in the correct order
    const orderedDays = daysOfWeek.filter(day => selectedDays.includes(day));

    updateOnboardingData({
      workingDays: orderedDays,
      wokingHours: [
        startTime ? `${formatTime(startTime)} ${startPeriod}` : '',
        endTime ? `${formatTime(endTime)} ${endPeriod}` : '',
      ],
    });
  }, [selectedDays, startTime, startPeriod, endTime, endPeriod, updateOnboardingData]);


  const handleDayToggle = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };


  const timeToMinutes = (time, period) => {
    if (!time) return 0;
    let [hour, min] = time.split(':');
    hour = Number(hour);
    min = Number(min) || 0;
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    return hour * 60 + min;
  };


  const handleContinue = () => {
    if (selectedDays.length === 0) {
      setError('Please select at least one working day.');
      return;
    }
    if (!startTime || !endTime) {
      setError('Please enter both opening and closing hours.');
      return;
    }
    const [startHour] = startTime.split(':');
    const [endHour] = endTime.split(':');
    if (
      isNaN(startHour) ||
      isNaN(endHour) ||
      Number(startHour) < 0 ||
      Number(startHour) > 12 ||
      Number(endHour) < 0 ||
      Number(endHour) > 12
    ) {
      setError('Hours must be between 0 and 12.');
      return;
    }

    // --- Start time must not be after end time ---
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    const startMins = timeToMinutes(formattedStartTime, startPeriod);
    const endMins = timeToMinutes(formattedEndTime, endPeriod);
    if (startMins >= endMins) {
      setError('Opening time must be before closing time.');
      return;
    }

    setError('');
    navigate('/auth/onboarding/profile-1');
  };




  
  return (
    <div style={{ position: 'relative', width: '80%', height: '82%' }}>
      {/* Velra logo absolutely positioned relative to this wrapper */}
      <div
        style={{
          position: 'absolute',
          top: '-4rem',
          left: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <img src={logoWhite} alt="velra-logo" />
        <h3 className="font-semibold text-5xl text-white">VELRA</h3>
      </div>

      <Paper
        elevation={7}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          borderRadius: '12px',
          overflowY: 'auto',
          // Responsive: center content when image is hidden
          '@media (max-width:1150px)': {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column', // stack children vertically
          },
        }}
      >

        {/* Debugging Purposes */}
        {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        {/* Left Half: Form Content */}
        <Box
          sx={{
            //border: '2px solid green',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            minWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'white',
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 3 },
            borderRadius: '12px',
            height: '100%',
            '@media (max-width:1150px)': {
              width: '100%',
              flex: 'unset', // remove flex:1 so it doesn't reserve space for the image
              minWidth: 0,
            },
            '@media (min-width:1151px)': {
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            },
          }}
        >
          <div
            style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', minWidth: 0 }}
            className='w-full h-full rounded-xl px-8 sm:px-16 sm:py-8 flex flex-col justify-between bg-white'
          >
            <div className="flex flex-col">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: 'rgba(0,0,0,0.79)',
                  mb: { xs: 2.5, sm: 4 },
                  fontSize: { xs: '1.75rem', sm: '2.0rem' },
                }}
              >
                Select Your Working Days
              </Typography>

              {/* Working Days Buttons */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(auto-fit, minmax(80px, 1fr))',
                    sm: 'repeat(4, 1fr)',
                  },
                  gap: { xs: 1, sm: 2 },
                  mb: { xs: 6, sm: 8 },
                  maxWidth: '450px',
                }}
              >
                {daysOfWeek.map((day) => (
                  <Button
                    key={day}
                    variant="contained"
                    onClick={() => handleDayToggle(day)}
                    sx={{
                      minWidth: 'auto',
                      px: { xs: 1, sm: 2 },
                      py: { xs: 0.3, sm: 0.3 },
                      borderRadius: '8px',
                      fontSize: { xs: '0.9rem', sm: '1.1rem' },
                      fontWeight: 'bold',
                      textTransform: 'none',
                      color: '#4487AE',
                      bgcolor: 'rgba(86, 169, 217, 0.17)',
                      '&:hover': {
                        bgcolor: 'rgba(86, 169, 217, 0.25)',
                      },
                      ...(selectedDays.includes(day) && {
                        bgcolor: '#56A9D9',
                        color: 'white',
                        '&:hover': {
                          bgcolor: '#42A5F5',
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
                  color: 'rgba(0,0,0,0.79)',
                  mb: { xs: 2.5, sm: 4 },
                  fontSize: { xs: '1.75rem', sm: '2.0rem' },
                }}
              >
                Select Your Working Hours
              </Typography>

              {/* Opening Hours */}
              <Box sx={{ mb: { xs: 3, sm: 4 }, maxWidth: '450px', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1" sx={{ color: '#56A9D9', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' }, minWidth: 110 }}>
                  Opening Hours
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="hh:mm"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  inputProps={{ inputMode: 'text', pattern: '[0-9:]*', maxLength: 5 }}
                  sx={{
                    width: 110,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      bgcolor: '#ffffff',
                      '& fieldset': { borderColor: '#e0e0e0' },
                    },
                    '& .MuiInputBase-input': {
                      color: '#424242',
                      fontSize: '0.875rem',
                      py: '10px',
                      textAlign: 'center',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '0.875rem',
                      color: '#757575',
                    },
                  }}
                />
                <Select
                  value={startPeriod}
                  onChange={(e) => setStartPeriod(e.target.value)}
                  sx={{
                    height: 40,
                    minWidth: 70,
                    ml: 1,
                    bgcolor: '#f5f5f5',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    color: '#1976D2',
                    '& .MuiSelect-select': { padding: '8px 16px' },
                  }}
                >
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </Select>
              </Box>

              {/* Closing Hours */}
              <Box sx={{ mb: { xs: 6, sm: 8 }, maxWidth: '450px', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1" sx={{ color: '#56A9D9', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' }, minWidth: 110 }}>
                  Closing Hours
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="hh:mm"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  inputProps={{ inputMode: 'text', pattern: '[0-9:]*', maxLength: 5 }}
                  sx={{
                    width: 110,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      bgcolor: '#ffffff',
                      '& fieldset': { borderColor: '#e0e0e0' },
                    },
                    '& .MuiInputBase-input': {
                      color: '#424242',
                      fontSize: '0.875rem',
                      py: '10px',
                      textAlign: 'center',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '0.875rem',
                      color: '#757575',
                    },
                  }}
                />
                <Select
                  value={endPeriod}
                  onChange={(e) => setEndPeriod(e.target.value)}
                  sx={{
                    height: 40,
                    minWidth: 70,
                    ml: 1,
                    bgcolor: '#f5f5f5',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    color: '#1976D2',
                    '& .MuiSelect-select': { padding: '8px 16px' },
                  }}
                >
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </Select>
              </Box>

              {/* Error Message */}
              {error && (
                <Typography variant="body2" sx={{ color: 'red', mb: 2, fontWeight: 500 }}>
                  {error}
                </Typography>
              )}
            </div>

            {/* Continue Button */}
            <Button
              variant="outlined"
              onClick={handleContinue}
              sx={{
                py: '10px',
                bgcolor: 'white',
                color: '#56A9D9',
                borderColor: '#56A9D9',
                fontWeight: 'bold',
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: '#E0F2FF',
                  borderColor: '#56A9D9',
                },
                width: '150px',
                alignSelf: 'center',
                mt: 2,
              }}
            >
              Continue
            </Button>
          </div>
        </Box>

        {/* Right Half: Image */}
        <Box
    sx={{
      flex: 1,
      display: { xs: 'none', lg: 'flex' }, // hide on small screens, show on large
      alignItems: 'center',
      justifyContent: 'center',
      '@media (max-width:1150px)': {
        display: 'none',
      },
    }}
  >
    <img
      src={onboardingImage}
      alt="Illustration"
      className="max-w-full h-auto object-contain"
    />
  </Box>
      </Paper>
    </div>
  );
};

export default Step3_WorkingDays;