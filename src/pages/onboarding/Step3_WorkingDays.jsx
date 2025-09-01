import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Box, Fade, Zoom } from '@mui/material';
import { CheckCircle, EventAvailable } from '@mui/icons-material';
import onboardingImage from '../../assets/onboardingImage.png';
import { useOnBoarding } from './OnboardingContext';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


const Step3_WorkingDays = () => {

  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();

  const [selectedDays, setSelectedDays] = useState(onboardingData.workingDays || []);
  const [error, setError] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  useEffect(() => {
    const orderedDays = daysOfWeek.filter(day => selectedDays.includes(day));
    updateOnboardingData({
      workingDays: orderedDays,
    });
  }, [selectedDays, updateOnboardingData]);

  const handleDayToggle = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleContinue = () => {
    if (selectedDays.length === 0) {
      setError('Please select at least one working day.');
      return;
    }

    setError('');
    navigate('/auth/onboarding/profile-1');
  };



  return (
    <div style={{ position: 'relative', width: '80%', height: '80%' }}>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '620px',
          display: 'flex',
          borderRadius: '16px',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          border: 'none',
          boxShadow: 'none',
          // Hide scrollbar for webkit browsers (Chrome, Safari, Edge)
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          // Hide scrollbar for Firefox
          scrollbarWidth: 'none',
          // Alternative for older browsers
          msOverflowStyle: 'none',
          '@media (max-width:1150px)': {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          },
        }}
      >

        {/* Debugging Purposes */}
        {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        {/* Left Half: Redesigned Content with Pure White Background */}
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            position: 'relative',
            minWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 3, sm: 4 },
            height: '100%',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            '@media (max-width:1200px)': {
              width: '100%',
              alignItems: 'center',
              flex: 'unset',
              minWidth: 0,
            },
            '@media (min-width:1201px)': {
              alignItems: 'center',
              justifyContent: 'center',
              width: '60%',
            },
          }}
        >
          {/* Subtle background patterns */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(86, 169, 217, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(86, 169, 217, 0.03) 0%, transparent 50%)
              `,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Decorative corner accents */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(86, 169, 217, 0.08) 0%, transparent 70%)',
              transform: 'translate(50%, -50%)',
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(86, 169, 217, 0.06) 0%, transparent 70%)',
              transform: 'translate(-50%, 50%)',
              zIndex: 0,
            }}
          />

          <Fade in={showContent} timeout={1000}>
            <div
              style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative', 
                minWidth: 0,
                width: '100%',
                zIndex: 1,
                textAlign: 'center',
                minHeight: '100%',
              }}
              className='w-full h-full rounded-xl flex flex-col'
            >
              {/* Top Section - Hero */}
              <Box sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
                {/* Main Title */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #56A9D9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
                    fontFamily: 'Roboto, sans-serif',
                    letterSpacing: '0.02em',
                    textAlign: 'center',
                    mb: 1.5,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '50%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #56A9D9, #1e3a8a)',
                      borderRadius: '1px',
                    },
                  }}
                >
                  Choose Your Days
                </Typography>

                {/* Subtitle */}
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(30, 58, 138, 0.7)',
                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                    fontWeight: '400',
                    textAlign: 'center',
                    mb: 2,
                    fontFamily: 'Roboto, sans-serif',
                  }}
                >
                  Select the days you're available to work
                </Typography>

                {/* Decorative Icon */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 24px rgba(86, 169, 217, 0.3)',
                      animation: 'float 3s ease-in-out infinite',
                      '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-8px)' },
                      },
                    }}
                  >
                    <EventAvailable sx={{ fontSize: 30, color: 'white' }} />
                  </Box>
                </Box>
              </Box>

              {/* Middle Section - Form Content */}
              <div className="flex flex-col w-full items-center flex-1">

                {/* Working Days Selection - Compact Design */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(auto-fit, minmax(70px, 1fr))',
                      sm: 'repeat(5, 1fr)',
                    },
                    gap: { xs: 1.5, sm: 2 },
                    mb: { xs: 4, sm: 5 },
                    maxWidth: '500px',
                    width: '100%',
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
                          px: { xs: 1.5, sm: 2.5 },
                          py: { xs: 1.2, sm: 1.5 },
                          borderRadius: '12px',
                          fontSize: { xs: '0.85rem', sm: '0.95rem' },
                          fontWeight: '600',
                          textTransform: 'none',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: 'translateY(0)',
                          color: selectedDays.includes(day) ? 'white' : '#56A9D9',
                          background: selectedDays.includes(day) 
                            ? 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)' 
                            : 'linear-gradient(135deg, rgba(86, 169, 217, 0.08) 0%, rgba(66, 165, 245, 0.05) 100%)',
                          border: selectedDays.includes(day) 
                            ? '2px solid transparent' 
                            : '2px solid rgba(86, 169, 217, 0.2)',
                          boxShadow: selectedDays.includes(day) 
                            ? '0 6px 20px rgba(86, 169, 217, 0.3)' 
                            : '0 2px 8px rgba(86, 169, 217, 0.1)',
                          '&:hover': {
                            transform: 'translateY(-2px) scale(1.03)',
                            boxShadow: selectedDays.includes(day) 
                              ? '0 8px 25px rgba(86, 169, 217, 0.4)' 
                              : '0 4px 16px rgba(86, 169, 217, 0.2)',
                            background: selectedDays.includes(day) 
                              ? 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)' 
                              : 'linear-gradient(135deg, rgba(86, 169, 217, 0.15) 0%, rgba(66, 165, 245, 0.1) 100%)',
                          },
                          '&:active': {
                            transform: 'translateY(-1px) scale(1.01)',
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
                              fontSize: '0.9rem', 
                              mr: 0.4,
                              animation: 'checkPulse 2s ease-in-out infinite',
                              '@keyframes checkPulse': {
                                '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
                                '50%': { opacity: 1, transform: 'scale(1.1)' },
                              },
                            }} 
                          />
                        )}
                        {day}
                      </Button>
                    </Zoom>
                  ))}
                </Box>

                {/* Enhanced Error Message */}
                {error && (
                  <Fade in={!!error}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        background: 'rgba(244, 67, 54, 0.08)',
                        border: '1px solid rgba(244, 67, 54, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                        maxWidth: '350px',
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 4,
                          height: 35,
                          borderRadius: '2px',
                          background: 'linear-gradient(135deg, #f44336 0%, #ff5252 100%)',
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#d32f2f', 
                          fontWeight: '500',
                          fontSize: '0.9rem',
                        }}
                      >
                        {error}
                      </Typography>
                    </Box>
                  </Fade>
                )}
              </div>

              {/* Bottom Section - Continue Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={handleContinue}
                  sx={{
                    py: 2,
                    px: 5,
                    background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    borderRadius: '12px',
                    boxShadow: '0 6px 20px rgba(86, 169, 217, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'none',
                    minWidth: '180px',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)',
                      boxShadow: '0 8px 28px rgba(86, 169, 217, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateY(-1px)',
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

        {/* Right Half: Pure White Image Section */}
        <Box
          sx={{
            width: '40%',
            flex:1,
            display: { xs: 'none', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: '#ffffff',
            '@media (max-width:1150px)': {
              display: 'none',
            },
          }}
        >
          <Fade in={showContent} timeout={1200}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <img
                src={onboardingImage}
                alt="Professional Service Illustration"
                style={{
                  maxWidth: '85%',
                  height: 'auto',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02) translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1) translateY(0px)';
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