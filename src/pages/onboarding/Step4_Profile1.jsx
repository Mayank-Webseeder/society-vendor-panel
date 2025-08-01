import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, InputAdornment, IconButton, Fade, Grow, FormControl, Select, MenuItem } from '@mui/material';
import { Paperclip, User, Building, Briefcase, Shield, CheckCircle, IndianRupee, UserCheck } from 'lucide-react';
import { MdOutlinePayment } from "react-icons/md";
import { BiReceipt } from "react-icons/bi";
import { useOnBoarding } from './OnboardingContext';


const Step4_Profile1 = () => {

  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();

  // Initialize state from context
  const [yourName, setYourName] = useState(onboardingData.name || '');
  const [id, setId] = useState(onboardingData.id || '');
  const [fixedIdSuffix, setFixedIdSuffix] = useState(''); // Store the six-digit number separately
  const [gender, setGender] = useState(onboardingData.gender || '');
  const [businessName, setBusinessName] = useState(onboardingData.businessName || '');
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState(onboardingData.preferredPaymentMethod || '');
  const [lastPayments, setLastPayments] = useState(onboardingData.lastPayments || '');
  const [yourExperience, setYourExperience] = useState(onboardingData.workExperience || '');
  const [idProof, setIdProof] = useState(onboardingData.idProof || ''); // Holds the file name
  const [idProofFile, setIdProofFile] = useState(null); // Holds the actual file object

  const [focusedField, setFocusedField] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    setShowContent(true);
  }, []);

  // Sync local state to context on change
  useEffect(() => {
    updateOnboardingData({
      name: yourName,
      initials: getInitials(yourName),
      gender,
      businessName,
      workExperience: yourExperience,
      idProof,
      idProofFile,
      preferredPaymentMethod,
      lastPayments,
    });
  }, [yourName, gender, businessName, yourExperience, idProof, idProofFile, preferredPaymentMethod, lastPayments, updateOnboardingData]);


  // Helper to get initials from name
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0][0]?.toUpperCase() || '';
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };


  useEffect(() => {    // Generate ID
    // Generate six digits only once when the user enters the first character
    if (fixedIdSuffix === '' && yourName.trim().length > 0) {
      const randomNumbers = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit number
      setFixedIdSuffix(randomNumbers.toString()); // Store the six digits separately
    }

    // Update the name part dynamically based on user input
    if (yourName.trim().length > 0) {
      const firstName = yourName.split(' ')[0].slice(0, 6); // Extract first name (max 6 characters)
      const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1); // Capitalize the first character
      const updatedId = `#${capitalizedFirstName}${fixedIdSuffix}`; // Combine name part with constant six digits
      setId(updatedId);
      updateOnboardingData({ name: yourName, id: updatedId }); // Update context with name and ID
    }

    // Reset ID and suffix if the name field is emptied
    if (yourName.trim().length === 0) {
      setId(''); // Clear the ID
      setFixedIdSuffix(''); // Clear the six-digit suffix
      updateOnboardingData({ name: '', id: '' }); // Update context with empty name and ID
    }
  }, [yourName, fixedIdSuffix, updateOnboardingData]);


  const handleContinue = () => {
    if (!yourName.trim() || !gender.trim() || !businessName.trim() || !yourExperience.trim() || !idProofFile) {
      setError('Please complete all required fields to continue.');
      return;
    }
    setError('');
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/auth/onboarding/profile-2');
    }, 800);
  };

  const handlePaperclipClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear previous file selection
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdProof(file.name); // Store file name for display
      setIdProofFile(file); // Store file object
    } else {
      setIdProof('');
      setIdProofFile(null);
    }
  };

  const isFieldComplete = (value) => {
    return value && (typeof value === 'string' ? value.trim().length > 0 : true);
  };


  // getFieldIcon to include icons
  const getFieldIcon = (fieldName) => {
    switch (fieldName) {
      case 'name': return <User size={20} />;
      case 'gender': return <User size={20} />;
      case 'business': return <Building size={20} />;
      case 'experience': return <Briefcase size={20} />;
      case 'id': return <Shield size={20} />;
      case 'paymentMethod': return <MdOutlinePayment size={20} />;
      case 'lastPayments': return <BiReceipt size={20} />
      default: return null;
    }
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
          boxShadow: 'none',
          overflowX: 'hidden',
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
                  Complete Your Profile
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
                  Tell us about yourself to personalize your experience
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
                    <UserCheck size={30} color="white" />
                  </Box>
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
                    width: '100%',
                  }}
                >
                  {/* Row 1: Name & Gender */}
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
                        {getFieldIcon('name')}
                        Your Name
                        {isFieldComplete(yourName) && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter your full name"
                        value={yourName}
                        onChange={(e) => setYourName(e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: focusedField === 'name' ? '#f0f9ff' : '#ffffff',
                            transition: 'all 0.3s ease',
                            '& fieldset': {
                              borderColor: focusedField === 'name' ? '#56A9D9' : '#e2e8f0',
                              borderWidth: focusedField === 'name' ? '2px' : '1px',
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
                            color: '#1a1a1a',
                            fontSize: '1rem',
                            py: '14px',
                            px: '16px',
                            fontWeight: 500,
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: '#94a3b8',
                            opacity: 1,
                          },
                        }}
                      />
                    </Box>
                  </Grow>
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
                        {getFieldIcon('gender')}
                        Gender
                        {isFieldComplete(gender) && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {['Male', 'Female', 'Prefer not to say'].map((option) => (
                          <Button
                            key={option}
                            variant={gender === option ? 'contained' : 'outlined'}
                            onClick={() => setGender(option)}
                            sx={{
                              // flex: 1,
                              py: '8px',
                              px:'20px',
                              borderRadius: '12px',
                              textTransform: 'none',
                              fontWeight: 500,
                              fontSize: '0.9rem',
                              background: gender === option
                                ? 'linear-gradient(135deg, #56A9D9 0%, #4A9FD1 100%)'
                                : 'transparent',
                              color: gender === option ? 'white' : '#56A9D9',
                              borderColor: '#56A9D9',
                              '&:hover': {
                                backgroundColor: gender === option
                                  ? 'linear-gradient(135deg, #4A9FD1 0%, #3B82E6 100%)' // Slightly darker gradient for hover
                                  : '#f0f9ff',
                                borderColor: '#56A9D9',
                              },
                            }}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </Box>
                  </Grow>


                  {/* Row 2: Business Name & Work Experience */}
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
                        {getFieldIcon('business')}
                        Business Name
                        {isFieldComplete(businessName) && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter your business name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        onFocus={() => setFocusedField('business')}
                        onBlur={() => setFocusedField('')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: focusedField === 'business' ? '#f0f9ff' : '#ffffff',
                            transition: 'all 0.3s ease',
                            '& fieldset': {
                              borderColor: focusedField === 'business' ? '#56A9D9' : '#e2e8f0',
                              borderWidth: focusedField === 'business' ? '2px' : '1px',
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
                            color: '#1a1a1a',
                            fontSize: '1rem',
                            py: '14px',
                            px: '16px',
                            fontWeight: 500,
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: '#94a3b8',
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
                          gap: 1,
                        }}
                      >
                        {getFieldIcon('experience')}
                        Your Experience
                        {isFieldComplete(yourExperience) && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
                      <FormControl fullWidth variant="outlined" required>
                        <Select
                          value={yourExperience}
                          onChange={(e) => setYourExperience(e.target.value)}
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
                            borderRadius: '12px',
                            bgcolor: '#ffffff',
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                            '& .MuiSelect-select': {
                              color: '#94A3B8',
                              fontSize: '0.95rem',
                              py: '14px',
                              px: '16px',
                              fontWeight: 500,
                            },
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Experience
                          </MenuItem>
                          <MenuItem value="Less than 1 year">Less than 1 year</MenuItem>
                          <MenuItem value="1-3 years">1-3 years</MenuItem>
                          <MenuItem value="3-5 years">3-5 years</MenuItem>
                          <MenuItem value="More than 5 years">More than 5 years</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grow>


                  {/* Row 3: Upload ID & Empty */}
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
                        {getFieldIcon('id')}
                        Upload ID Proof
                        {idProofFile && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Aadhaar Card, PAN Card, Driving License, Voter ID"
                        value={idProofFile ? idProofFile.name : ''}
                        onClick={handlePaperclipClick}
                        onFocus={() => setFocusedField('id')}
                        onBlur={() => setFocusedField('')}
                        inputProps={{ readOnly: true, style: { cursor: 'pointer' } }}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handlePaperclipClick}
                                edge="end"
                                sx={{
                                  backgroundColor: '#f1f5f9',
                                  borderRadius: '8px',
                                  '&:hover': {
                                    backgroundColor: '#e2e8f0',
                                  },
                                }}
                              >
                                <Paperclip
                                  size={20}
                                  style={{
                                    color: '#56A9D9',
                                    cursor: 'pointer',
                                    transform: 'rotate(-45deg)'
                                  }}
                                />
                              </IconButton>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                              />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: focusedField === 'id' ? '#f0f9ff' : '#ffffff',
                            transition: 'all 0.3s ease',
                            '& fieldset': {
                              borderColor: focusedField === 'id' ? '#56A9D9' : '#e2e8f0',
                              borderWidth: focusedField === 'id' ? '2px' : '1px',
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
                            color: '#1a1a1a',
                            fontSize: '1rem',
                            py: '14px',
                            px: '16px',
                            cursor: 'pointer',
                            fontWeight: 500,
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: '#94a3b8',
                            opacity: 1,
                          },
                        }}
                      />
                      {idProofFile && (
                        <Fade in={true} timeout={500}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#10B981',
                              mt: 1,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              fontWeight: 500,
                            }}
                          >
                            <CheckCircle size={16} />
                            File uploaded successfully: {idProofFile.name}
                          </Typography>
                        </Fade>
                      )}
                    </Box>
                  </Grow>
                  <Box></Box>


                  {/* Row 4: Preferred Payment Method & Last Payments */}
                  <Grow in={true} timeout={1200}>
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
                        {getFieldIcon('paymentMethod')}
                        Preferred Payment Method
                        {isFieldComplete(preferredPaymentMethod) && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
                      <FormControl fullWidth variant="outlined" required>
                        <Select
                          value={preferredPaymentMethod}
                          onChange={(e) => setPreferredPaymentMethod(e.target.value)}
                          onFocus={() => setFocusedField('paymentMethod')}
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
                            borderRadius: '12px',
                            backgroundColor: focusedField === 'paymentMethod' ? '#f0f9ff' : '#ffffff',
                            transition: 'all 0.3s ease',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: focusedField === 'paymentMethod' ? '#56A9D9' : '#e2e8f0',
                              borderWidth: focusedField === 'paymentMethod' ? '2px' : '1px',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#56A9D9',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#56A9D9',
                              borderWidth: '2px',
                            },
                            '& .MuiSelect-select': {
                              color: preferredPaymentMethod === '' ? '#94A3B8' : '#1a1a1a',
                              fontSize: '1rem',
                              py: '14px',
                              px: '16px',
                              fontWeight: 500,
                            },
                          }}
                        >
                          <MenuItem value="" disabled sx={{ color: '#94A3B8' }}>
                            Select Payment Method
                          </MenuItem>
                          <MenuItem value="Cash">Cash</MenuItem>
                          <MenuItem value="Credit Card">Credit Card</MenuItem>
                          <MenuItem value="Debit Card">Debit Card</MenuItem>
                          <MenuItem value="UPI">UPI</MenuItem>
                          <MenuItem value="Net Banking">Net Banking</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grow>
                  <Grow in={true} timeout={1300}>
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
                        {getFieldIcon('lastPayments')}
                        Last Payments
                        {isFieldComplete(lastPayments) && (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        )}
                      </Typography>
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter last payment amount"
                        value={lastPayments}
                        onChange={(e) => setLastPayments(e.target.value)}
                        onFocus={() => setFocusedField('lastPayments')}
                        onBlur={() => setFocusedField('')}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Typography sx={{ color: '#56A9D9', fontWeight: 600 }}>₹</Typography>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: focusedField === 'lastPayments' ? '#f0f9ff' : '#ffffff',
                            transition: 'all 0.3s ease',
                            '& fieldset': {
                              borderColor: focusedField === 'lastPayments' ? '#56A9D9' : '#e2e8f0',
                              borderWidth: focusedField === 'lastPayments' ? '2px' : '1px',
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
                            color: '#1a1a1a',
                            fontSize: '1rem',
                            py: '14px',
                            px: '16px',
                            fontWeight: 500,
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: '#94a3b8',
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
                        Profile saved! Redirecting...
                      </Typography>
                    </Box>
                  </Fade>
                )}

                {/* Continue Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
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
              </Box>
            </div>
          </Fade>
        </Box>
      </Paper>
    </div>
  );
};

export default Step4_Profile1;