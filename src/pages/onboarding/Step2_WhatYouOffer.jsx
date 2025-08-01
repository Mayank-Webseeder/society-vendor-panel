import { useState, useRef, useEffect } from 'react';
import { Paper, Typography, Checkbox, FormControlLabel, Button, Box, Fade, Zoom } from '@mui/material';
import { Search, ChevronDown, X, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import onboardingImage from '../../assets/onboardingImage.png';
import dummyOffers from '../../static/dummyData_ServicesOffered';
import { useOnBoarding } from './OnboardingContext';



const Step2_WhatYouOffer = () => {

  const { onboardingData, updateOnboardingData } = useOnBoarding();
  const navigate = useNavigate();

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState(onboardingData.whatYouOffer || []);
  const [showContent, setShowContent] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setShowContent(true);
  }, []);

  
  // Sync context when selectedServices changes
  useEffect(() => {
    if (
      Array.isArray(onboardingData.whatYouOffer) &&
      Array.isArray(selectedServices) &&
      onboardingData.whatYouOffer.length === selectedServices.length &&
      onboardingData.whatYouOffer.every((v, i) => v === selectedServices[i])
    ) {
      return;
    }
    updateOnboardingData({ whatYouOffer: selectedServices });
  }, [selectedServices, onboardingData.whatYouOffer, updateOnboardingData]);


  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAgreedCheckboxChange = (event) => {
    setAgreedToTerms(event.target.checked);
    updateOnboardingData({ 
      ...onboardingData, 
      agreedTermsAndConditions: event.target.checked, 
      agreedPrivacyPolicy: event.target.checked 
    });
  };

  const handleServiceToggle = (serviceValue) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceValue)
        ? prevSelected.filter((val) => val !== serviceValue)
        : [...prevSelected, serviceValue]
    );
  };

  const handleRemoveTag = (serviceValue) => {
    setSelectedServices((prevSelected) =>
      prevSelected.filter((val) => val !== serviceValue)
    );
  };

  const handleContinue = () => {
    navigate('/auth/onboarding/working-days', { replace: true });
  };



  return (
    <div style={{ position: 'relative', width: '80%', height: '80%' }}>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          height: '100%',
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

        {/* Left Half: Redesigned Form Content */}
        <Box
          sx={{
            // border: '2px solid red',
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
                  Tell Us What You Offer
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
                  We'll help connect you with the right societies
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
                    <Briefcase size={30} color="white" />
                  </Box>
                </Box>
              </Box>

              {/* Middle Section - Form Content */}
              <div className="flex flex-col w-full items-center max-w-lg flex-1">

                {/* Multi-Select Input - Enhanced */}
                <div className="relative w-full mb-6" ref={dropdownRef}>
                  <Zoom in={showContent} timeout={800}>
                    <div
                      className="w-full bg-white rounded-xl py-4 pl-14 pr-4 text-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-300 transition-all duration-300 backdrop-blur-sm"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <Search size={20} className="absolute left-4 text-blue-400 pointer-events-none" />
                      <span className="ml-8 text-gray-700 text-base font-medium">
                        {selectedServices.length > 0
                          ? `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`
                          : 'Select services you offer...'
                        }
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-blue-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      />
                    </div>
                  </Zoom>

                  {isDropdownOpen && (
                    <Fade in={isDropdownOpen} timeout={300}>
                      <div
                        className="absolute top-full left-0 w-full bg-white border-2 border-blue-200 rounded-xl shadow-2xl mt-2 py-2 z-10 backdrop-blur-sm"
                        style={{ 
                          maxHeight: '280px', 
                          overflowY: 'auto',
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                          backdropFilter: 'blur(10px)',
                          // Hide scrollbar for webkit browsers
                          WebkitScrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                          scrollbarWidth: 'none',
                        }}
                      >
                        {dummyOffers.map((offer, index) => (
                          <Zoom in={isDropdownOpen} timeout={300 + index * 50} key={offer.value}>
                            <div
                              className="flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all duration-200 rounded-lg mx-2"
                              onClick={() => handleServiceToggle(offer.value)}
                            >
                              <Checkbox
                                checked={selectedServices.includes(offer.value)}
                                onChange={() => handleServiceToggle(offer.value)}
                                sx={{
                                  color: '#56A9D9',
                                  '&.Mui-checked': {
                                    color: '#42A5F5',
                                  },
                                  '&:hover': {
                                    backgroundColor: 'rgba(86, 169, 217, 0.1)',
                                  },
                                }}
                              />
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  color: '#374151', 
                                  ml: 1.5,
                                  fontSize: '0.95rem',
                                  fontWeight: 500,
                                }}
                              >
                                {offer.label}
                              </Typography>
                            </div>
                          </Zoom>
                        ))}
                      </div>
                    </Fade>
                  )}
                </div>

                {/* Selected Services Tags - Enhanced */}
                {selectedServices.length > 0 && (
                  <Fade in={selectedServices.length > 0} timeout={500}>
                    <div className="flex flex-wrap gap-x-3 gap-y-3 w-full">
                      {selectedServices.map((serviceValue, index) => {
                        const service = dummyOffers.find(o => o.value === serviceValue);
                        return service ? (
                          <Zoom in timeout={400 + index * 100} key={service.value}>
                            <div className="relative flex items-center rounded-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 border border-blue-300 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                              <span>{service.label}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(service.value)}
                                className="ml-2 w-5 h-5 flex justify-center items-center border-none rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-150 focus:outline-none"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          </Zoom>
                        ) : null;
                      })}
                    </div>
                  </Fade>
                )}
              </div>

              {/* Bottom Section - Button and Terms */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mt: 4 }}>
                {/* Continue Button - Always visible */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={handleContinue}
                    disabled={selectedServices.length === 0 || !agreedToTerms}
                    sx={{
                      py: 2,
                      px: 5,
                      background: (selectedServices.length === 0 || !agreedToTerms)
                        ? 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' 
                        : 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                      color: (selectedServices.length === 0 || !agreedToTerms) ? '#9ca3af' : 'white',
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      borderRadius: '12px',
                      boxShadow: (selectedServices.length === 0 || !agreedToTerms) ? 'none' : '0 6px 20px rgba(86, 169, 217, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      textTransform: 'none',
                      minWidth: '180px',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        background: (selectedServices.length === 0 || !agreedToTerms)
                          ? 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' 
                          : 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)',
                        boxShadow: (selectedServices.length === 0 || !agreedToTerms) ? 'none' : '0 8px 28px rgba(86, 169, 217, 0.4)',
                        transform: (selectedServices.length === 0 || !agreedToTerms) ? 'none' : 'translateY(-2px)',
                      },
                      '&:active': {
                        transform: (selectedServices.length === 0 || !agreedToTerms) ? 'none' : 'translateY(-1px)',
                      },
                      '&:disabled': {
                        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                        color: '#9ca3af',
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
                        left: (selectedServices.length > 0 && agreedToTerms) ? '100%' : '-100%',
                      },
                    }}
                  >
                    Continue
                  </Button>
                </Box>

                {/* Terms & Conditions Checkbox - At Bottom */}
                <Fade in={showContent} timeout={1200}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreedToTerms}
                        onChange={handleAgreedCheckboxChange}
                        sx={{
                          color: '#56A9D9',
                          '&.Mui-checked': {
                            color: '#42A5F5',
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(86, 169, 217, 0.1)',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(30, 58, 138, 0.7)',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          fontWeight: 500,
                        }}
                      >
                        By continuing, you agree to our{' '}
                        <span style={{ color: '#56A9D9', cursor: 'pointer', fontWeight: 600 }}>Terms & Conditions</span>
                        {' '}and{' '}
                        <span style={{ color: '#56A9D9', cursor: 'pointer', fontWeight: 600 }}>Privacy Policy</span>.
                      </Typography>
                    }
                    sx={{ alignSelf: 'flex-start' }}
                  />
                </Fade>
              </Box>
            </div>
          </Fade>
        </Box>

        {/* Right Half: Pure White Image Section */}
        <Box
          sx={{
            width: '40%',
            flex: 1,
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

export default Step2_WhatYouOffer;