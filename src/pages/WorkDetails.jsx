import { useState } from 'react';
import { Paper, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import { ChevronLeft, Search, X } from 'lucide-react'; // Using Lucide icons
import Autocomplete from '@mui/material/Autocomplete';



const availableServices = [
  { label: 'Water Tank Cleaning', id: 1 },
  { label: 'Garden Maintenance', id: 2 },
  { label: 'Pest Control', id: 3 },
  { label: 'Plumbing Services', id: 4 },
  { label: 'Electrical Repairs', id: 5 },
  { label: 'AC Servicing', id: 6 },
  { label: 'House Painting', id: 7 },
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];




const WorkDetails = () => {
  const [selectedServices, setSelectedServices] = useState([
    availableServices[0], // Water Tank Cleaning
    availableServices[1], // Garden Maintenance
  ]);
  const [workExperience, setWorkExperience] = useState('4 years & 3 months');
  const [workingHours, setWorkingHours] = useState('8:00AM - 5:00PM');
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']); // All selected by default

  const handleServiceAdd = (event, newValue) => {
    if (newValue && !selectedServices.some(service => service.id === newValue.id)) {
      setSelectedServices([...selectedServices, newValue]);
    }
  };

  const handleServiceRemove = (serviceToRemove) => {
    setSelectedServices(selectedServices.filter(service => service.id !== serviceToRemove.id));
  };

  const handleDayToggle = (day) => {
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
        : [...prevSelectedDays, day]
    );
  };



  
  return (
    <Paper
      elevation={3}
      className='flex pl-6 gap-10 w-full'
      sx={{
        backgroundColor: "white",
        boxShadow: 3,
        border: '1px solid #E0E0E0',
        borderRadius: '12px',
        width: '100%', // Ensures responsiveness
        maxWidth: { xs: '100%', sm: '500px', md: '600px' }, // Example max-width for larger screens
        p: { xs: 2, sm: 3 }, // Responsive padding
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 3 }, // Responsive gap
        //mx: 'auto', // Center the card
        ml: 4,
        mb: 5
      }}
    >

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
        <IconButton sx={{ mr: 1, p: 0 }}>
          <ChevronLeft size={20} color="#424242" />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 'semibold', color: '#424242' }}>
          Work Details
        </Typography>
      </Box>

      {/* Services Offered */}
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#424242', mb: 1 }}>
          Services Offered
        </Typography>
        <Autocomplete
          options={availableServices.filter(service => !selectedServices.some(s => s.id === service.id))}
          getOptionLabel={(option) => option.label}
          onChange={handleServiceAdd}
          value={null} // Ensures the input field clears after selection
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Services"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <Search size={20} style={{ color: '#757575', marginRight: '8px' }} />
                ),
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
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.875rem',
                  color: '#757575',
                },
              }}
            />
          )}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {selectedServices.map(service => (
            <Box
              key={service.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#E3F2FD', // Light blue background for tags
                borderRadius: '4px',
                px: 1.5,
                py: 0.5,
                fontSize: '0.875rem',
                color: '#1976D2', // Blue text for tags
                fontWeight: 'medium',
              }}
            >
              {service.label}
              <IconButton
                size="small"
                onClick={() => handleServiceRemove(service)}
                sx={{ ml: 0.5, p: 0, color: '#1976D2' }}
              >
                <X size={14} />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Work Experience */}
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#424242', mb: 1 }}>
          Work Experience
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={workExperience}
          onChange={(e) => setWorkExperience(e.target.value)}
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
            },
          }}
        />
      </Box>

      {/* Working Hours */}
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#424242', mb: 1 }}>
          Working Hours
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
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
            },
          }}
        />
      </Box>

      {/* Working Days */}
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#424242', mb: 1 }}>
          Working Hours
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {daysOfWeek.map(day => (
            <Button
              key={day}
              variant={selectedDays.includes(day) ? 'contained' : 'outlined'}
              onClick={() => handleDayToggle(day)}
              sx={{
                minWidth: 'auto', // Allow buttons to shrink
                px: { xs: 1.5, sm: 2 }, // Responsive horizontal padding
                py: { xs: 0.5, sm: 1 }, // Responsive vertical padding
                borderRadius: '4px',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Responsive font size
                fontWeight: 'medium',
                textTransform: 'none', // Prevent uppercase
                borderColor: '#1976D2', // Blue border for outlined
                color: selectedDays.includes(day) ? 'white' : '#1976D2', // Blue text for outlined
                bgcolor: selectedDays.includes(day) ? '#1976D2' : 'transparent', // Blue background for contained
                '&:hover': {
                  bgcolor: selectedDays.includes(day) ? '#1565C0' : '#E3F2FD', // Darker blue or light blue on hover
                  borderColor: '#1565C0',
                },
              }}
            >
              {day}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Edit Button */}
      <Button
        variant="contained"
        sx={{
          mt: { xs: 2, sm: 3 }, // Responsive margin top
          py: '10px',
          bgcolor: '#1976D2',
          color: 'white',
          fontWeight: 'semibold',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: '#1565C0',
          },
          width: '120px', // Fixed width for the button
          alignSelf: 'center', // Center the button
        }}
      >
        Edit
      </Button>

    </Paper>
  );
};


export default WorkDetails;