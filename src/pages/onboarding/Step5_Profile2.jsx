import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, Select, MenuItem, FormControl, Fade, Grow, Zoom } from '@mui/material';
import { MapPin, Building, Landmark, CheckCircle } from 'lucide-react';
import indianStates from '../../static/dummyData_IndianStates';
import { useOnBoarding } from './OnboardingContext';
import faviconFinal from '/faviconFinal.png';


const Step5_Profile2 = () => {

  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();

  // Initialize state from context
  const [buildingFlatShopNo, setBuildingFlatShopNo] = useState(onboardingData.building || '');
  const [localityTown, setLocalityTown] = useState(onboardingData.locality || '');
  const [landmark, setLandmark] = useState(onboardingData.landmark || '');
  const [state, setState] = useState(onboardingData.state || '');
  const [city, setCity] = useState(onboardingData.city || '');
  const [pincode, setPincode] = useState(onboardingData.pincode || '');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  useEffect(() => {
    setShowContent(true);
  }, []);

  // Sync local state to context on change
  useEffect(() => {
    updateOnboardingData({
      building: buildingFlatShopNo,
      locality: localityTown,
      landmark,
      state,
      city,
      pincode,
    });
  }, [buildingFlatShopNo, localityTown, landmark, state, city, pincode, updateOnboardingData]);

  const handleContinue = () => {
    if (
      !buildingFlatShopNo.trim() ||
      !localityTown.trim() ||
      !landmark.trim() ||
      !state ||
      !city.trim() ||
      pincode.length !== 6
    ) {
      setError('All fields are required and pincode must be 6 digits.');
      return;
    }
    setError('');
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/auth/onboarding/location');
    }, 800);
  };

  const isFieldComplete = (value) => {
    return value && (typeof value === 'string' ? value.trim().length > 0 : true);
  };

  // getFieldIcon to include icons
  const getFieldIcon = (fieldName) => {
    switch (fieldName) {
      case 'building': return <Building size={20} />;
      case 'locality': return <MapPin size={20} />;
      case 'landmark': return <Landmark size={20} />;
      case 'state': return <MapPin size={20} />;
      case 'city': return <MapPin size={20} />;
      case 'pincode': return <MapPin size={20} />;
      default: return null;
    }
  };


  return (
    <div
      style={{
        position: 'relative',
        width: window.innerWidth < 640 ? '100%' : '80%',
        height: window.innerWidth < 640 ? '100%' : '80%',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          height: '100%',
          maxHeight: { sm: '620px' },
          display: 'flex',
          position: 'relative',
          borderRadius: '16px',
          border: 'none',
          overflowY: 'auto',
          overflowX: 'hidden',
          background: {
            xs: 'linear-gradient(135deg, #071032 0%, #0b1536 30%, #0b1022 100%)',
            sm: '#ffffff',
          },
          backgroundBlendMode: { xs: 'normal', sm: 'normal' },
          boxShadow: 'none',
          // Subtle overlay patterns matching mobile onboarding
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: {
              xs: `
                radial-gradient(circle at 30% 30%, rgba(59,130,246,0.08), transparent 40%),
                radial-gradient(circle at 70% 70%, rgba(139,92,246,0.06), transparent 45%)
              `,
              sm: 'none',
            },
            backgroundSize: { xs: '400px 400px, 300px 300px', sm: 'auto' },
            opacity: { xs: 0.7, sm: 0 },
            pointerEvents: 'none',
            zIndex: 1,
          },
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
        <img
          src={faviconFinal}
          className="flex sm:hidden absolute top-1.5 left-2 z-10 w-12 h-12"
          alt="logo"
        />

        {/* Debugging Purposes */}
        {/* <pre className='pt-56'>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        {/* Main Content Container */}
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            position: 'relative',
            minWidth: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 3, sm: 4 },
            minHeight: '100%',
            backgroundColor: { xs: 'transparent', sm: '#ffffff' },
            overflow: 'visible',
            flexWrap: 'wrap',
            zIndex: 2,
            '@media (max-width:639px)': {
              width: '100%',
              minHeight: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
              px: 4,
              py: 4,
              flex: 'unset',
              // Mobile white card container with subtle shadow
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '8%',
                left: '5%',
                right: '5%',
                bottom: '8%',
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.95) 0%, 
                    rgba(248, 250, 252, 0.98) 50%,
                    rgba(255, 255, 255, 0.95) 100%
                  )
                `,
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: `
                  0 20px 60px rgba(0, 0, 0, 0.4),
                  0 8px 24px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 1),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                zIndex: -1,
              },
            },
            '@media (max-width:1200px)': {
              width: '100%',
              alignItems: 'center',
              flex: 'unset',
              minWidth: 0,
            },
            '@media (min-width:1201px)': {
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
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
              display: typeof window !== 'undefined' && window.innerWidth < 640 ? 'none' : 'block',
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
              display: typeof window !== 'undefined' && window.innerWidth < 640 ? 'none' : 'block',
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
              display: typeof window !== 'undefined' && window.innerWidth < 640 ? 'none' : 'block',
            }}
          />

          <Fade in={showContent} timeout={1000}>
            <div
              style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: typeof window !== 'undefined' && window.innerWidth < 640 ? 'flex-start' : 'space-between',
                alignItems: 'center',
                position: 'relative', 
                minWidth: 0,
                width: '100%',
                zIndex: 1,
                textAlign: 'center',
                minHeight: typeof window !== 'undefined' && window.innerWidth < 640 ? 'auto' : '100%',
                maxHeight: typeof window !== 'undefined' && window.innerWidth < 640 ? 'calc(80vh - 80px)' : '100%',
                gap: typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 0,
                overflowY: typeof window !== 'undefined' && window.innerWidth < 640 ? 'auto' : 'visible',
                paddingRight: typeof window !== 'undefined' && window.innerWidth < 640 ? '8px' : '0',
              }}
              className='w-full h-full rounded-xl flex flex-col'
            >
              {/* Top Section - Hero */}
              <Box sx={{ mb: { xs: 3, sm: 2 }, position: 'relative', zIndex: 1, width: '100%' }}>
                {/* Mobile: Enhanced Corporate Header (match Step4 style) */}
                <Box
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                    textAlign: 'center',
                    mb: 4,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '4px',
                      background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.8) 100%)',
                      borderRadius: '2px',
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: '800',
                      background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.98) 0%, rgba(37, 99, 235, 0.95) 50%, rgba(29, 78, 216, 0.92) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: '2.2rem',
                      fontFamily: '"Inter", "Roboto", sans-serif',
                      letterSpacing: '-0.01em',
                      mb: 2,
                      textShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80px',
                        height: '3px',
                        background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 1) 50%, rgba(29, 78, 216, 0.8) 100%)',
                        borderRadius: '2px',
                      },
                    }}
                  >
                    Address Details
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(30, 58, 138, 1)',
                      fontSize: '1.05rem',
                      fontWeight: '500',
                      mb: 3,
                      px: 2,
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      lineHeight: 1.5,
                      fontFamily: '"Inter", "Roboto", sans-serif',
                      maxWidth: '280px',
                      mx: 'auto',
                      position: 'relative',
                    }}
                  >
                    Tell us where you're located to serve you better
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.9) 50%, rgba(29, 78, 216, 0.95) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(59, 130, 246, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 12px 40px rgba(59, 130, 246, 0.4), 0 4px 16px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                        animation: 'pulse 2s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 12px 40px rgba(59, 130, 246, 0.4)' },
                          '50%': { transform: 'scale(1.05)', boxShadow: '0 16px 56px rgba(59, 130, 246, 0.5)' },
                        },
                      }}
                    >
                      <MapPin size={30} color="white" />
                    </Box>
                  </Box>
                </Box>

                {/* Desktop: Original Hero Design (unchanged) */}
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
                        width: '20%',
                        height: '3px',
                        background: 'linear-gradient(90deg, #56A9D9, #1e3a8a)',
                        borderRadius: '1px',
                      },
                    }}
                  >
                    Your Address Details
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(30, 58, 138, 0.7)',
                      fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: '400',
                      textAlign: 'center',
                      mb: 3,
                      fontFamily: 'Roboto, sans-serif',
                    }}
                  >
                    Tell us where you're located to serve you better
                  </Typography>

                  {/* Decorative Icon */}
                  {/* <Box
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
                      <MapPin size={30} color="white" />
                    </Box>
                  </Box> */}
                </Box>
              </Box>

              {/* Middle Section - Form Content */}
              <div className="flex flex-col w-full items-center flex-1 max-w-5xl">

                {/* Grid Layout for Form Fields */}
        <Box 
                  sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs:'1fr', md: '1fr 1fr'}, 
                    columnGap: '5rem', 
                    rowGap: '1.9rem', 
                    marginBottom: '2rem',
          width: { xs: '90%', sm: '100%' },
                  }}
                >
                  {/* Row 1: Building/Flat  &  Landmark */}
                  <Grow in={true} timeout={600}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(0, 0, 0, 0.8)',
                          mb: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        {getFieldIcon('building')}
                        Building/Flat/Shop No.
                        {isFieldComplete(buildingFlatShopNo) && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
          <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter Building/Flat/Shop No."
                        value={buildingFlatShopNo}
                        onChange={(e) => setBuildingFlatShopNo(e.target.value)}
                        onFocus={() => setFocusedField('building')}
                        onBlur={() => setFocusedField('')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
            borderRadius: { xs: '16px', sm: '12px' },
            backgroundColor: focusedField === 'building' ? '#f0f9ff' : '#ffffff',
                            transition: 'all 0.3s ease',
            boxShadow: { xs: '0 2px 10px rgba(2,12,33,0.06)', sm: 'none' },
                            '& fieldset': {
                              borderColor: focusedField === 'building' ? '#56A9D9' : '#e2e8f0',
                              borderWidth: focusedField === 'building' ? '2px' : '1px',
                            },
                            '&:hover fieldset': {
                              borderColor: '#56A9D9',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#56A9D9',
                              borderWidth: '2px',
                            },
                          },
                          '& .MuiInputBase-input': {
            color: '#0f172a',
            fontSize: { xs: '16px', sm: '1rem' },
            py: { xs: '14px', sm: '14px' },
            px: { xs: '16px', sm: '16px' },
                            fontWeight: 500,
                          },
                          '& .MuiInputBase-input::placeholder': {
            color: { xs: '#64748b', sm: '#94a3b8' },
                            opacity: 1,
                          },
                        }}
                      />
                    </Box>
                  </Grow>
                  <Grow in={true} timeout={800}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(0, 0, 0, 0.8)',
                          mb: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        {getFieldIcon('landmark')}
                        Landmark
                        {isFieldComplete(landmark) && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
          <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter a Landmark"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        onFocus={() => setFocusedField('landmark')}
                        onBlur={() => setFocusedField('')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
            borderRadius: { xs: '16px', sm: '12px' },
            backgroundColor: focusedField === 'landmark' ? '#f0f9ff' : '#ffffff',
                            transition: 'all 0.3s ease',
            boxShadow: { xs: '0 2px 10px rgba(2,12,33,0.06)', sm: 'none' },
                            '& fieldset': {
                              borderColor: focusedField === 'landmark' ? '#56A9D9' : '#e2e8f0',
                              borderWidth: focusedField === 'landmark' ? '2px' : '1px',
                            },
                            '&:hover fieldset': {
                              borderColor: '#56A9D9',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#56A9D9',
                              borderWidth: '2px',
                            },
                          },
                          '& .MuiInputBase-input': {
            color: '#0f172a',
            fontSize: { xs: '16px', sm: '1rem' },
            py: { xs: '14px', sm: '14px' },
            px: { xs: '16px', sm: '16px' },
                            fontWeight: 500,
                          },
                          '& .MuiInputBase-input::placeholder': {
            color: { xs: '#64748b', sm: '#94a3b8' },
                            opacity: 1,
                          },
                        }}
                      />
                    </Box>
                  </Grow>
                  

                  {/* Row 2: Locality/Town  &  City */}
                  <Grow in={true} timeout={700}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(0, 0, 0, 0.8)',
                          mb: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        {getFieldIcon('locality')}
                        Locality/Town
                        {isFieldComplete(localityTown) && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
          <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter Locality/Town"
                        value={localityTown}
                        onChange={(e) => setLocalityTown(e.target.value)}
                        onFocus={() => setFocusedField('locality')}
                        onBlur={() => setFocusedField('')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
            borderRadius: { xs: '16px', sm: '12px' },
            backgroundColor: focusedField === 'locality' ? '#f0f9ff' : '#ffffff',
                            transition: 'all 0.3s ease',
            boxShadow: { xs: '0 2px 10px rgba(2,12,33,0.06)', sm: 'none' },
                            '& fieldset': {
                              borderColor: focusedField === 'locality' ? '#56A9D9' : '#e2e8f0',
                              borderWidth: focusedField === 'locality' ? '2px' : '1px',
                            },
                            '&:hover fieldset': {
                              borderColor: '#56A9D9',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#56A9D9',
                              borderWidth: '2px',
                            },
                          },
                          '& .MuiInputBase-input': {
            color: '#0f172a',
            fontSize: { xs: '16px', sm: '1rem' },
            py: { xs: '14px', sm: '14px' },
            px: { xs: '16px', sm: '16px' },
                            fontWeight: 500,
                          },
                          '& .MuiInputBase-input::placeholder': {
            color: { xs: '#64748b', sm: '#94a3b8' },
                            opacity: 1,
                          },
                        }}
                      />
                    </Box>
                  </Grow>
                  <Grow in={true} timeout={1000}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(0, 0, 0, 0.8)',
                          mb: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        {getFieldIcon('city')}
                        City
                        {isFieldComplete(city) && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
          <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onFocus={() => setFocusedField('city')}
                        onBlur={() => setFocusedField('')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
            borderRadius: { xs: '16px', sm: '12px' },
            backgroundColor: focusedField === 'city' ? '#f0f9ff' : '#ffffff',
                            transition: 'all 0.3s ease',
            boxShadow: { xs: '0 2px 10px rgba(2,12,33,0.06)', sm: 'none' },
                            '& fieldset': {
                              borderColor: focusedField === 'city' ? '#56A9D9' : '#e2e8f0',
                              borderWidth: focusedField === 'city' ? '2px' : '1px',
                            },
                            '&:hover fieldset': {
                              borderColor: '#56A9D9',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#56A9D9',
                              borderWidth: '2px',
                            },
                          },
                          '& .MuiInputBase-input': {
            color: '#0f172a',
            fontSize: { xs: '16px', sm: '1rem' },
            py: { xs: '14px', sm: '14px' },
            px: { xs: '16px', sm: '16px' },
                            fontWeight: 500,
                          },
                          '& .MuiInputBase-input::placeholder': {
            color: { xs: '#64748b', sm: '#94a3b8' },
                            opacity: 1,
                          },
                        }}
                      />
                    </Box>
                  </Grow>


                  {/* Row 3: State  &  Pincode */}
                  <Grow in={true} timeout={900}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(0, 0, 0, 0.8)',
                          mb: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        {getFieldIcon('state')}
                        State
                        {isFieldComplete(state) && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
                      <FormControl fullWidth variant="outlined" required>
                        <Select
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          onFocus={() => setFocusedField('state')}
                          onBlur={() => setFocusedField('')}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                maxHeight: 250,
                              },
                            },
                            anchorOrigin: {
                              vertical: 'bottom',
                              horizontal: 'left',
                            },
                            transformOrigin: {
                              vertical: 'top',
                              horizontal: 'left',
                            },
                          }}
                          sx={{
                            borderRadius: { xs: '16px', sm: '12px' },
                            backgroundColor: focusedField === 'state' ? '#f0f9ff' : '#ffffff',
                            transition: 'all 0.3s ease',
                            boxShadow: { xs: '0 2px 10px rgba(2,12,33,0.06)', sm: 'none' },
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: focusedField === 'state' ? '#56A9D9' : '#e2e8f0',
                              borderWidth: focusedField === 'state' ? '2px' : '1px',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#56A9D9',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#56A9D9',
                              borderWidth: '2px',
                            },
                            '& .MuiSelect-select': {
                              color: state === '' ? '#64748b' : '#0f172a',
                              fontSize: { xs: '16px', sm: '1rem' },
                              py: { xs: '14px', sm: '14px' },
                              px: { xs: '16px', sm: '16px' },
                              fontWeight: 500,
                            },
                          }}
                        >
                          <MenuItem value="" disabled sx={{ color: '#94A3B8' }}>
                            Select State
                          </MenuItem>
                          {indianStates.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grow>
                  <Grow in={true} timeout={1100}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(0, 0, 0, 0.8)',
                          mb: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        {getFieldIcon('pincode')}
                        Pincode
                        {pincode.length === 6 && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
          <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter Pincode"
                        value={pincode}
                        onChange={(e) => {
                          // Only allow numbers and max 6 digits
                          const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                          setPincode(val);
                        }}
                        onFocus={() => setFocusedField('pincode')}
                        onBlur={() => setFocusedField('')}
                        inputProps={{
                          maxLength: 6,
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                        }}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
            borderRadius: { xs: '16px', sm: '12px' },
            backgroundColor: focusedField === 'pincode' ? '#f0f9ff' : '#ffffff',
                            transition: 'all 0.3s ease',
            boxShadow: { xs: '0 2px 10px rgba(2,12,33,0.06)', sm: 'none' },
                            '& fieldset': {
                              borderColor: focusedField === 'pincode' ? '#56A9D9' : '#e2e8f0',
                              borderWidth: focusedField === 'pincode' ? '2px' : '1px',
                            },
                            '&:hover fieldset': {
                              borderColor: '#56A9D9',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#56A9D9',
                              borderWidth: '2px',
                            },
                          },
                          '& .MuiInputBase-input': {
            color: '#0f172a',
            fontSize: { xs: '16px', sm: '1rem' },
            py: { xs: '14px', sm: '14px' },
            px: { xs: '16px', sm: '16px' },
                            fontWeight: 500,
                          },
                          '& .MuiInputBase-input::placeholder': {
            color: { xs: '#64748b', sm: '#94a3b8' },
                            opacity: 1,
                          },
                        }}
                      />
                    </Box>
                  </Grow>
                </Box>
              </div>

              {/* Bottom Section - Error, Success and Continue Button */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mt: 4 }}>
                {/* Error Message */}
                {error && (
                  <Fade in={!!error} timeout={500}>
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
                        maxWidth: '400px',
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

                {/* Success Message */}
                {showSuccess && (
                  <Fade in={showSuccess} timeout={500}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        background: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                        maxWidth: '400px',
                      }}
                    >
                      <CheckCircle size={20} style={{ color: '#10B981' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#10B981', 
                          fontWeight: '500',
                          fontSize: '0.9rem',
                        }}
                      >
                        Address saved! Redirecting...
                      </Typography>
                    </Box>
                  </Fade>
                )}

                {/* Continue Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, sm: 5 }, px: { xs: 2, sm: 0 }, width: '100%' }}>
                  <Button
                    variant="contained"
                    onClick={handleContinue}
                    sx={{
                      py: 2,
                      px: 5,
                      background: 'linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: "1.1rem",
                      borderRadius: "12px",
                      boxShadow: '0 6px 20px rgba(86, 169, 217, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      textTransform: 'none',
                      minWidth: '180px',
                      position: 'relative',
                      overflow: 'hidden',
                      border: { xs: '1px solid rgba(59,130,246,0.4)', sm: 'none' },
                      '&:hover': {
                        background: 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)',
                        boxShadow: { xs: '0 12px 36px rgba(86, 169, 217, 0.45)', sm: '0 8px 28px rgba(86, 169, 217, 0.4)' },
                        transform: { xs: 'none', sm: 'translateY(-2px)' },
                      },
                      '&:active': {
                        transform: { xs: 'none', sm: 'translateY(-1px)' },
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
              </Box>
            </div>
          </Fade>
        </Box>
      </Paper>
    </div>
  )
}

export default Step5_Profile2;