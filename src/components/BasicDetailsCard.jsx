import { useState } from 'react';
import { Paper, Avatar, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import { Edit as EditIcon } from 'lucide-react';
import { useUser } from '../UserContext';



const BasicDetailsCard = ({ initials = 'VS' }) => {

  const { user, setUser } = useUser();

  //Temporary state for editing
  const [tempDetails, setTempDetails] = useState({
    name: user.name || '',
    contact: user.phone || '',
    dateOfBirth: user.dateOfBirth || '',
    gender: user.gender || 'M',
  });

  // Handlers for each field
  const handleChange = (field) => (e) => {
    setTempDetails({ ...tempDetails, [field]: e.target.value });
  };

  // Contact: only numbers, +, -
  const handleContactChange = (e) => {
    const value = e.target.value.replace(/[^0-9+\-]/g, '');
    setTempDetails({ ...tempDetails, contact: value });
  };

  // DOB: only numbers & -
  const handleDateOfBirthChange = (e) => {
    const value = e.target.value.replace(/[^0-9\-]/g, '');
    setTempDetails({ ...tempDetails, dateOfBirth: value });
  };

  // Gender
  const handleGenderChange = (e) => {
    setTempDetails({ ...tempDetails, gender: e.target.value })
  };


  // Save changes to context on Edit
  const handleEdit = () => {
    setUser({ ...user, ...tempDetails });
    console.log(tempDetails);
  };





  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: '12px',
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #e0e0e0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bluish block at the top */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 140,
          bgcolor: '#779FB8',
          borderTopLeftRadius: 'xl',
          borderTopRightRadius: 'xl',
          zIndex: 0,
        }}
      />

      {/* Avatar Section */}
      <Box sx={{ position: 'relative', mt: '70px', mb: 1, zIndex: 1 }}>
        <Avatar
          sx={{
            width: 140,
            height: 140,
            bgcolor: '#397497',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            border: '3px solid white',
          }}
        >
          {initials}
        </Avatar>
      </Box>

      {/* Edit Profile Link */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1,
          color: '#1976D2',
          fontSize: '0.875rem',
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <EditIcon size={14} style={{ marginRight: '4px' }} />
        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>Edit</Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {user.id}
      </Typography>

      {/* Details Section */}
      <Box sx={{ width: '100%', px: 3, '& > div': { mb: 2 } }}>
        {/* Name */}
        <Typography variant="subtitle1" sx={{ fontWeight: '500', color: 'rgb(28,27,31,0.69)' }}>
          Name
        </Typography>
        <TextField
          label=""
          variant="outlined"
          placeholder='Rahul Sharma'
          fullWidth
          value={tempDetails.name}
          onChange={handleChange('name')}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              // White background
              '& fieldset': { borderColor: '#e0e0e0' },
            },
            '& .MuiInputBase-input': {
              color: '#424242',
              fontSize: '0.875rem',
              py: '10px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.875rem',
              color: '#757575',
            },
          }}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: '500', color: 'rgb(28,27,31,0.69)' }}>
          Contact
        </Typography>
        <TextField
          label=""
          placeholder='+91 999 999 9999'
          variant="outlined"
          fullWidth
          value={tempDetails.contact}
          onChange={handleContactChange}    // Validation
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              bgcolor: '#fff', // White background
              '& fieldset': { borderColor: '#e0e0e0' },
            },
            '& .MuiInputBase-input': {
              color: '#424242',
              fontSize: '0.875rem',
              py: '10px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.875rem',
              color: '#757575',
            },
          }}
        />

        {/* Date of Birth */}
        <Typography variant="subtitle1" sx={{ fontWeight: '500', color: 'rgb(28,27,31,0.69)' }}>
          Date of Birth
        </Typography>
        <TextField
          label=""
          placeholder='19-05-1999'
          variant="outlined"
          fullWidth
          value={tempDetails.dateOfBirth}
          onChange={handleDateOfBirthChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              bgcolor: '#fff', // White background
              '& fieldset': { borderColor: '#e0e0e0' },
            },
            '& .MuiInputBase-input': {
              color: '#424242',
              fontSize: '0.875rem',
              py: '10px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.875rem',
              color: '#757575',
            },
          }}
        />


        {/* Gender */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: '500', color: 'rgb(28,27,31,0.69)' }}>
            Gender
          </Typography>
          <RadioGroup row value={tempDetails.gender} onChange={handleGenderChange}>
            <FormControlLabel
              value="M"
              control={<Radio sx={{ color: '#1976D2', '&.Mui-checked': { color: '#1976D2' } }} />}
              label={<Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#424242' }}>M</Typography>}
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
            />
            <FormControlLabel
              value="F"
              control={<Radio sx={{ color: '#1976D2', '&.Mui-checked': { color: '#1976D2' } }} />}
              label={<Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#424242' }}>F</Typography>}
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
            />
            <FormControlLabel
              value="Other"
              control={<Radio sx={{ color: '#1976D2', '&.Mui-checked': { color: '#1976D2' } }} />}
              label={<Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#424242' }}>Other</Typography>}
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
            />
          </RadioGroup>
        </Box>
      </Box>

      {/* Edit Button */}
      <Button
        variant="outlined"
        onClick={handleEdit}
        sx={{
          mt: 3,
          mb: 3,
          py: '5px',
          px: '40px',
          fontWeight: 'semibold',
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: '#1565C0',
            color: 'white'
          },
          alignSelf: 'center',
        }}
      >
        Edit
      </Button>
    </Paper>
  );
};


export default BasicDetailsCard;