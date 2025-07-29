import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Box, TextField, MenuItem, Select, Fade, Zoom } from '@mui/material';
import { Schedule, AccessTime, CheckCircle, EventAvailable } from '@mui/icons-material';
import onboardingImage from '../../assets/onboardingImage.png';
import logoWhite from '../../assets/logoWhite.png';
import { useOnBoarding } from './OnboardingContext';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Step3_WorkingDays = () => {
  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();

  const [selectedDays, setSelectedDays] = useState(onboardingData.workingDays || []);
  const [startTime, setStartTime] = useState(onboardingData.workingHours?.[0]?.split(' ')[0] || '');
  const [startPeriod, setStartPeriod] = useState(onboardingData.workingHours?.[0]?.split(' ')[1] || 'AM');
  const [endTime, setEndTime] = useState(onboardingData.workingHours?.[1]?.split(' ')[0] || '');
  const [endPeriod, setEndPeriod] = useState(onboardingData.workingHours?.[1]?.split(' ')[1] || 'PM');
  const [error, setError] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleTimeChange = (value, setter) => {
    if (!/^\d{0,2}(:\d{0,2})?$/.test(value)) return;
    if (value.startsWith(':')) return;

    if (value.includes(':')) {
      const [hour, min] = value.split(':');
      if (min && (isNaN(min) || Number(min) >= 60)) return;
    }

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

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hour, min] = timeStr.split(':');
    if (min === undefined) {
      return `${String(Number(hour))}:00`;
    }
    const paddedMin = min.length === 1 ? `0${min}` : min;
    return `${String(Number(hour))}:${paddedMin}`;
  };

  useEffect(() => {
    const orderedDays = daysOfWeek.filter(day => selectedDays.includes(day));
    updateOnboardingData({
      workingDays: orderedDays,
      workingHours:
        startTime && endTime ?
        `${formatTime(startTime)} ${startPeriod} - ${formatTime(endTime)} ${endPeriod}`  
        : '',
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
      {/* Enhanced Logo */}
      <Fade in={showContent} timeout={800}>
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
          <img 
            src={logoWhite} 
            alt="velra-logo" 
            style={{ 
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              transition: 'transform 0.3s ease',
            }}
          />
          <h3 
            className="font-semibold text-5xl text-white"
            style={{ 
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            VELRA
          </h3>
        </div>
      </Fade>

      <Paper
        elevation={8}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          borderRadius: '16px',
          overflowY: 'auto',
          // background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
          backgroundColor: 'white',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
          '@media (max-width:1150px)': {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          },
        }}
      >

        {/* Debugging Purposes */}
        {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        {/* Left Half: Enhanced Form Content */}
        <Box
          sx={{
            // flex: 1,
            // border:'2px solid green',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            minWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 3 },
            borderRadius: '16px',
            height: '100%',
            // mb: 7,
            '@media (max-width:1200px)': {
              width: '100%',
              alignItems: 'center',
              flex: 'unset',
              minWidth: 0,
            },
            '@media (min-width:1201px)': {
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '60%',
            },
            }}
          >
            <Fade in={showContent} timeout={1000}>
            <div
              style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              position: 'relative', 
              minWidth: 0,
              width: '100%',
              // border: '2px solid blue'
              }}
              className='w-full h-full rounded-xl px-4 sm:px-8 sm:py-4 flex flex-col justify-between'
            >
              <div className="flex flex-col w-full">
              {/* Enhanced Section Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, minWidth: 0, width: '100%' }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                      color: 'white',
                      boxShadow: '0 3px 8px rgba(86, 169, 217, 0.3)',
                    }}
                  >
                    <EventAvailable fontSize="small" />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      // border: '2px solid black',
                      fontWeight: '700',
                      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontSize: { xs: '1.05rem', sm: '1.4rem', md: '1.6rem' }, // reduce on xs
                      letterSpacing: '-0.3px',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      lineHeight: 1.2,
                      maxWidth: '100%',
                    }}
                  >
                    Select Your Working Days
                  </Typography>
                </Box>

                {/* Enhanced Working Days Buttons */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(auto-fit, minmax(70px, 1fr))',
                      sm: 'repeat(5, 1fr)',
                    },
                    gap: { xs: 1, sm: 1.5 },
                    mb: { xs: 4, sm: 8 },
                    maxWidth: '500px',
                  }}
                >
                  {daysOfWeek.map((day, index) => (
                    <Zoom 
                      key={day} 
                      in={showContent} 
                      timeout={600 + index * 100}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleDayToggle(day)}
                        sx={{
                          minWidth: 'auto',
                          px: { xs: 1.5, sm: 2 },
                          py: { xs: 1, sm: 1.2 },
                          borderRadius: '10px',
                          fontSize: { xs: '0.85rem', sm: '0.95rem' },
                          fontWeight: '600',
                          textTransform: 'none',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: 'translateY(0)',
                          color: selectedDays.includes(day) ? 'white' : '#4487AE',
                          background: selectedDays.includes(day) 
                            ? 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)' 
                            : 'linear-gradient(135deg, rgba(86, 169, 217, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)',
                          border: selectedDays.includes(day) 
                            ? '2px solid transparent' 
                            : '2px solid rgba(86, 169, 217, 0.2)',
                          boxShadow: selectedDays.includes(day) 
                            ? '0 4px 12px rgba(86, 169, 217, 0.4)' 
                            : '0 2px 6px rgba(86, 169, 217, 0.1)',
                          '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: selectedDays.includes(day) 
                              ? '0 6px 16px rgba(86, 169, 217, 0.5)' 
                              : '0 4px 12px rgba(86, 169, 217, 0.2)',
                            background: selectedDays.includes(day) 
                              ? 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)' 
                              : 'linear-gradient(135deg, rgba(86, 169, 217, 0.2) 0%, rgba(66, 165, 245, 0.2) 100%)',
                          },
                          '&:active': {
                            transform: 'translateY(0)',
                          },
                          ...(selectedDays.includes(day) && {
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                              pointerEvents: 'none',
                            },
                          }),
                        }}
                      >
                        {selectedDays.includes(day) && (
                          <CheckCircle 
                            sx={{ 
                              fontSize: '0.8rem', 
                              mr: 0.3,
                              animation: 'pulse 1s ease-in-out',
                              '@keyframes pulse': {
                                '0%': { opacity: 0.6 },
                                '50%': { opacity: 1 },
                                '100%': { opacity: 0.6 },
                              },
                            }} 
                          />
                        )}
                        {day}
                      </Button>
                    </Zoom>
                  ))}
                </Box>

                {/* Enhanced Working Hours Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)',
                      color: 'white',
                      boxShadow: '0 3px 8px rgba(255, 107, 107, 0.3)',
                    }}
                  >
                    <AccessTime fontSize="small" />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: '700',
                      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontSize: { xs: '1.4rem', sm: '1.6rem' },
                      letterSpacing: '-0.3px',
                    }}
                  >
                    Select Your Working Hours
                  </Typography>
                </Box>

                {/* Enhanced Time Input Containers */}
                <Box sx={{ mb: 3, maxWidth: '500px', display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, gap: {xs: 0, sm: 6} }}>
                  {/* Opening Hours */}
                  <Box 
                    sx={{ 
                      mb: 2.5, 
                      p: 2,
                      minWidth: 230,
                      height: '100%',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(86, 169, 217, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)',
                      border: '1px solid rgba(86, 169, 217, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(86, 169, 217, 0.1)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: '#56A9D9', 
                        mb: 1.5, 
                        fontWeight: '600',
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                        }}
                      />
                      Opening Hours
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <TextField
                        variant="outlined"
                        placeholder="hh:mm"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        inputProps={{ inputMode: 'text', pattern: '[0-9:]*', maxLength: 5 }}
                        sx={{
                          width: 100,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
                            transition: 'all 0.3s ease',
                            '& fieldset': { 
                              borderColor: '#e0e0e0',
                              borderWidth: '1.5px',
                            },
                            '&:hover fieldset': { 
                              borderColor: '#56A9D9',
                            },
                            '&.Mui-focused fieldset': { 
                              borderColor: '#42A5F5',
                              boxShadow: '0 0 0 2px rgba(66, 165, 245, 0.1)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: '#2c3e50',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            py: '10px',
                            textAlign: 'center',
                          },
                        }}
                      />
                      <Select
                        value={startPeriod}
                        onChange={(e) => setStartPeriod(e.target.value)}
                        sx={{
                          height: 40,
                          minWidth: 70,
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          color: '#2c3e50',
                          '& .MuiSelect-select': { 
                            padding: '10px 12px',
                            display: 'flex',
                            alignItems: 'center',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(86, 169, 217, 0.2)',
                            borderWidth: '1.5px',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#56A9D9',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#42A5F5',
                          },
                        }}
                      >
                        <MenuItem value="AM">AM</MenuItem>
                        <MenuItem value="PM">PM</MenuItem>
                      </Select>
                    </Box>
                  </Box>

                  {/* Closing Hours */}
                  <Box 
                    sx={{ 
                      mb: 2.5, 
                      p: 2,
                      height: '100%',
                      minWidth: 230,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(255, 82, 82, 0.05) 100%)',
                      border: '1px solid rgba(255, 107, 107, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(255, 107, 107, 0.1)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: '#FF6B6B', 
                        mb: 1.5, 
                        fontWeight: '600',
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)',
                        }}
                      />
                      Closing Hours
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <TextField
                        variant="outlined"
                        placeholder="hh:mm"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        inputProps={{ inputMode: 'text', pattern: '[0-9:]*', maxLength: 5 }}
                        sx={{
                          width: 100,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
                            transition: 'all 0.3s ease',
                            '& fieldset': { 
                              borderColor: '#e0e0e0',
                              borderWidth: '1.5px',
                            },
                            '&:hover fieldset': { 
                              borderColor: '#FF6B6B',
                            },
                            '&.Mui-focused fieldset': { 
                              borderColor: '#FF5252',
                              boxShadow: '0 0 0 2px rgba(255, 82, 82, 0.1)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: '#2c3e50',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            py: '10px',
                            textAlign: 'center',
                          },
                        }}
                      />
                      <Select
                        value={endPeriod}
                        onChange={(e) => setEndPeriod(e.target.value)}
                        sx={{
                          height: 40,
                          minWidth: 70,
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          color: '#2c3e50',
                          '& .MuiSelect-select': { 
                            padding: '10px 12px',
                            display: 'flex',
                            alignItems: 'center',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 107, 107, 0.2)',
                            borderWidth: '1.5px',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#FF6B6B',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#FF5252',
                          },
                        }}
                      >
                        <MenuItem value="AM">AM</MenuItem>
                        <MenuItem value="PM">PM</MenuItem>
                      </Select>
                    </Box>
                  </Box>
                </Box>

                {/* Enhanced Error Message */}
                {error && (
                  <Fade in={!!error}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(255, 82, 82, 0.1) 100%)',
                        border: '1px solid rgba(244, 67, 54, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        width: '90%'
                      }}
                    >
                      <Box
                        sx={{
                          width: 4,
                          height: 40,
                          borderRadius: '2px',
                          background: 'linear-gradient(135deg, #f44336 0%, #ff5252 100%)',
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#d32f2f', 
                          fontWeight: '500',
                          fontSize: '0.95rem',
                        }}
                      >
                        {error}
                      </Typography>
                    </Box>
                  </Fade>
                )}
              </div>

              {/* Enhanced Continue Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={handleContinue}
                  sx={{
                    py: 2,
                    px: 4,
                    background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    borderRadius: '12px',
                    boxShadow: '0 8px 25px rgba(86, 169, 217, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'none',
                    minWidth: '180px',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)',
                      boxShadow: '0 12px 35px rgba(86, 169, 217, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%',
                    },
                  }}
                >
                  Continue
                </Button>
              </Box>
            </div>
          </Fade>
        </Box>

        {/* Enhanced Right Half: Image */}
        <Box
          sx={{
            // border:'2px solid red',
            // flex: 1,
            width: '40%',
            borderRadius: '16px',
            display: { xs: 'none', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '@media (max-width:1150px)': {
              display: 'none',
            },
          }}
        >
          <Fade in={showContent} timeout={1200}>
            <Box
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  right: '10%',
                  bottom: '10%',
                  // background: 'linear-gradient(135deg, rgba(86, 169, 217, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)',
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  filter: 'blur(20px)',
                  zIndex: 0,
                },
              }}
            >
              <img
                src={onboardingImage}
                alt="Illustration"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  position: 'relative',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  // filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              />
            </Box>
          </Fade>
        </Box>
      </Paper>
    </div>
  );
};

export default Step3_WorkingDays;