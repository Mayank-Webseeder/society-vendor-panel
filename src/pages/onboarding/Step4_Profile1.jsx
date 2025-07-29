import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, InputAdornment, IconButton, Fade, Grow, FormControl, Select, MenuItem } from '@mui/material';
import { Paperclip, User, Building, Briefcase, Shield, CheckCircle, IndianRupee } from 'lucide-react';
import { MdOutlinePayment } from "react-icons/md";
import { BiReceipt } from "react-icons/bi";
import logoWhite from '../../assets/logoWhite.png';
import { useOnBoarding } from './OnboardingContext';


const Step4_Profile1 = () => {

  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();

  // Initialize state from context
  const [yourName, setYourName] = useState(onboardingData.name || '');
  const [id, setId] = useState(onboardingData.id || '');
  const [fixedIdSuffix, setFixedIdSuffix] = useState(''); // Store the six-digit number separately
  const [isIdFinalized, setIsIdFinalized] = useState(false); // Track if ID is finalized
  const [gender, setGender] = useState(onboardingData.gender || '');
  const [businessName, setBusinessName] = useState(onboardingData.businessName || '');
  const [payscale, setPayscale] = useState(onboardingData.payscale || '');
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState(onboardingData.preferredPaymentMethod || '');
  const [lastPayments, setLastPayments] = useState(onboardingData.lastPayments || '');
  const [yourExperience, setYourExperience] = useState(onboardingData.workExperience || '');
  const [idProof, setIdProof] = useState(onboardingData.idProof || ''); // Holds the file name
  const [idProofFile, setIdProofFile] = useState(null); // Holds the actual file object

  const [focusedField, setFocusedField] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const fileInputRef = useRef();

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
      payscale,
      preferredPaymentMethod,
      lastPayments,
    });
  }, [yourName, gender, businessName, yourExperience, idProof, idProofFile, payscale, preferredPaymentMethod, lastPayments, updateOnboardingData]);

  // Helper to get initials from name
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0][0]?.toUpperCase() || '';
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };


  // Function to generate ID based on name
  const generateId = (name) => {
    if (!name.trim()) return '';
    const firstName = name.split(' ')[0].slice(0, 6); // Extract first name (max 6 characters)
    const randomNumbers = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit number
    return `#${firstName}${randomNumbers}`;
  };

  useEffect(() => {
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
    if (!yourName.trim() || !gender.trim() || !businessName.trim() || !payscale.trim() || !yourExperience.trim() || !idProofFile) {
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
      case 'payscale': return <IndianRupee size={18} />;
      case 'experience': return <Briefcase size={20} />;
      case 'id': return <Shield size={20} />;
      case 'paymentMethod': return <MdOutlinePayment size={20} />;
      case 'lastPayments': return <BiReceipt size={20} />
      default: return null;
    }
  };


  return (
    <div style={{ position: 'relative', width: '80%', height: '82%' }}>
      {/* Velra logo */}
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
        elevation={24}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
          overflow: 'auto',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >

        {/* Debugging Purposes */}
        <pre className='pt-56'>{JSON.stringify(onboardingData, null, 2)}</pre>

        {/* Form Content - Full Width Centered */}
        <div
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            padding: '1rem 5rem',
            position: 'relative',
            width: '100%',
            // maxWidth: '1000px',
            margin: '0 auto',
            height: '100%'
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #56A9D9 0%, #4A9FD1 100%)',
              borderRadius: '50%',
              opacity: 0.1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '3rem',
              left: '1rem',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #56A9D9 0%, #4A9FD1 100%)',
              borderRadius: '50%',
              opacity: 0.08,
            }}
          />

          <div className="flex flex-col relative z-10">
            {/* Heading */}
            <Fade in={true} timeout={800}>
              <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '0.5rem' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  Let's Complete Your Profile
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: { xs: '0.8rem', sm:'0.9rem', md: '1rem' },
                    fontWeight: 400,
                  }}
                >
                  Tell us about yourself to personalize your experience
                </Typography>
              </div>
            </Fade>

            {/* Grid Layout for Form Fields */}
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs:'1fr', md: '1fr 1fr'}, 
                columnGap: '3rem', 
                rowGap: '1.9rem', 
                marginBottom: '2rem' 
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


              {/* Row 3: Upload ID & Payscale */}
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
                    {getFieldIcon('payscale')}
                    Payscale
                    {isFieldComplete(payscale) && (
                      <CheckCircle size={16} style={{ color: '#10B981' }} />
                    )}
                  </Typography>
                  <FormControl fullWidth variant="outlined" required>
                    <Select
                      value={payscale}
                      onChange={(e) => setPayscale(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Typography sx={{ color: '#56A9D9', fontWeight: 600 }}>₹</Typography>
                        </InputAdornment>
                      }
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
                          color: payscale === '' ? '#94A3B8' : '#424242', // Placeholder color when no value is selected
                          fontSize: '0.95rem',
                          py: '14px',
                          px: '16px',
                          fontWeight: 500,
                        },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: '#94A3B8' }}>
                        Select Payscale
                      </MenuItem>
                      <MenuItem value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</MenuItem>
                      <MenuItem value="₹10,000 - ₹15,000">₹10,000 - ₹15,000</MenuItem>
                      <MenuItem value="₹15,000 - ₹20,000">₹15,000 - ₹20,000</MenuItem>
                      <MenuItem value="₹20,000 - ₹25,000">₹20,000 - ₹25,000</MenuItem>
                      <MenuItem value="₹25,000+">₹25,000+</MenuItem>
                      {/* <MenuItem value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</MenuItem>
                      <MenuItem value="₹20,000 - ₹30,000">₹20,000 - ₹30,000</MenuItem>
                      <MenuItem value="₹30,000 - ₹40,000">₹30,000 - ₹40,000</MenuItem>
                      <MenuItem value="₹40,000 - ₹50,000">₹40,000 - ₹50,000</MenuItem>
                      <MenuItem value="₹50,000+">₹50,000+</MenuItem> */}
                    </Select>
                  </FormControl>
                </Box>
              </Grow>


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
                          color: preferredPaymentMethod === '' ? '#94A3B8' : '#424242', // Placeholder color when no value is selected
                          fontSize: '0.95rem',
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


            {/* Error Message */}
            {error && (
              <Fade in={true} timeout={500}>
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ mt: 2, textAlign: 'center', fontWeight: 500, fontSize: '0.9rem' }}
                >
                  {error}
                </Typography>
              </Fade>
            )}

            {/* Success Message */}
            {showSuccess && (
              <Fade in={true} timeout={500}>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    textAlign: 'center',
                    color: '#10B981',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <CheckCircle size={18} />
                  Profile saved! Redirecting...
                </Typography>
              </Fade>
            )}


            {/* Continue Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Button
                variant="contained"
                onClick={handleContinue}
                sx={{
                  my: 3,
                  py: '14px',
                  px: '14px',
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  width: 160, 
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #4A9FD1 0%, #3B82E6 100%)',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3B82E6 0%, #2563EB 100%)',
                    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)',
                  },
                }}
              >
                Continue
              </Button>
            </Box>
            
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Step4_Profile1;