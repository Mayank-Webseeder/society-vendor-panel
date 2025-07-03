import React from 'react';
import { Paper, Avatar, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import { Edit as EditIcon } from 'lucide-react'; // Using Lucide icon for edit


const BasicDetailsCard = () => {

  // Dummy data for the profile details
  const profileData = {
    initials: 'RS',
    id: '#Rah889772',
    name: 'Rahul Sharma',
    contact: '+91 999 999 9999',
    dateOfBirth: '19-05-1999',
    gender: 'M', // Default selected gender
  };

  // State for gender selection (if it were interactive)
  const [gender, setGender] = React.useState(profileData.gender);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };




  return (
    // Outermost wrapper using MUI Paper for elevation and styling
    <Paper
      elevation={3} // Adjust elevation as needed
      sx={{
        borderRadius: 'xl', // Rounded corners
        p: 0, // Changed to 0 padding here, individual sections will have padding
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #e0e0e0', // Subtle border
        position: 'relative', // Needed for absolute positioning of the blue block
        overflow: 'hidden', // Ensures rounded corners clip the blue block
      }}
    >
      {/* Bluish block at the top */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '96px', // Height of the bluish block
          bgcolor: '#779FB8', // A bluish color, adjust as needed
          borderTopLeftRadius: 'xl', // Match Paper's border radius
          borderTopRightRadius: 'xl', // Match Paper's border radius
          zIndex: 0, // Ensure it's behind the avatar and content
        }}
      />

      {/* Avatar Section - positioned to overlap the bluish block */}
      <Box sx={{ position: 'relative', mt: '48px', mb: 2, zIndex: 1 }}> {/* mt to push it down and overlap */}
        <Avatar
          sx={{
            width: 96,
            height: 96,
            bgcolor: '#397497',
            color: 'white',
            fontSize: '2rem', // Reduced font size here
            fontWeight: 'bold',
            border: '3px solid white', // Added white border here
          }}
        >
          {profileData.initials}
        </Avatar>
        {/* Removed the Button containing the EditIcon from here */}
      </Box>

      {/* New: Edit Profile Link */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1, // Margin bottom to separate from ID
          color: '#1976D2', // Blue color for the link
          fontSize: '0.875rem', // text-sm
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline', // Underline on hover
          },
        }}
      >
        <EditIcon size={14} style={{ marginRight: '4px' }} /> {/* Smaller icon */}
        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>Edit</Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {profileData.id}
      </Typography>

      {/* Details Section - now has its own padding */}
      <Box sx={{ width: '100%', px: 3, '& > div': { mb: 2 } }}> {/* Added horizontal padding here */}
        {/* Name */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={profileData.name}
          InputProps={{ readOnly: true }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              bgcolor: '#f5f5f5',
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

        {/* Contact */}
        <TextField
          label="Contact"
          variant="outlined"
          fullWidth
          value={profileData.contact}
          InputProps={{ readOnly: true }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              bgcolor: '#f5f5f5',
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
        <TextField
          label="Date of Birth"
          variant="outlined"
          fullWidth
          value={profileData.dateOfBirth}
          InputProps={{ readOnly: true }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              bgcolor: '#f5f5f5',
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
          <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 'medium', color: '#757575', mb: 1 }}>
            Gender
          </Typography>
          <RadioGroup row value={gender} onChange={handleGenderChange}>
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
        sx={{
          mt: 3,
          mb: 3, // Added bottom margin to match image spacing
          py: '5px',
          px: '40px',
          fontWeight: 'semibold',
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: '#1565C0',
            color: 'white'
          },
          //width: '120px', // Set a fixed width for the button (adjust as needed)
          alignSelf: 'center', // Center the button within the flex container
        }}
      >
        Edit
      </Button>
    </Paper>
  );
};


export default BasicDetailsCard;