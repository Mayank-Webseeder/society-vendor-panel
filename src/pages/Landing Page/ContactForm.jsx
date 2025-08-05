import { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    service: '',
    message: '',
    agreeToTerms: false,
  });

  const serviceOptions = [
    'Society Management',
    'Vendor Services',
    'Maintenance Solutions',
    'Security Services',
    'Housekeeping Services',
    'General Inquiry',
  ];

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      agreeToTerms: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        p: { xs: 2, sm: 2.5, md: 3 },
        border: '1px solid #e2e8f0',
        mx: { xs: 1, md: 0 },
      }}
    >
      {/* Form Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: '600',
          color: '#1e293b',
          fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.6rem' },
          lineHeight: 1.2,
          mb: 0.5,
        }}
      >
        Send us a message!
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: '#64748b',
          fontSize: { xs: '0.75rem', md: '0.8rem' },
          mb: { xs: 3, md: 4 },
        }}
      >
        We usually respond within 24 hours.
      </Typography>

      {/* Contact Form */}
      <Box component="form" onSubmit={handleSubmit}>
        {/* First Name and Last Name */}
        <Grid container spacing={{ xs: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, md: 2 } }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  '& fieldset': {
                    borderColor: '#e2e8f0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
                '& .MuiInputBase-input': {
                  py: { xs: 1.2, md: 1.5 },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  '& fieldset': {
                    borderColor: '#e2e8f0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
                '& .MuiInputBase-input': {
                  py: { xs: 1.2, md: 1.5 },
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Email */}
        <TextField
          fullWidth
          placeholder="Your email"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          size="small"
          sx={{
            mb: { xs: 1.5, md: 2 },
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              borderRadius: '6px',
              fontSize: { xs: '0.9rem', md: '1rem' },
              '& fieldset': {
                borderColor: '#e2e8f0',
              },
              '&:hover fieldset': {
                borderColor: '#3b82f6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              },
            },
            '& .MuiInputBase-input': {
              py: { xs: 1.2, md: 1.5 },
            },
          }}
        />

        {/* Phone Number */}
        <TextField
            fullWidth
            placeholder="Phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange('phoneNumber')}
            size="small"
            InputProps={{
                startAdornment: (
                    <Typography sx={{ color: '#64748b', mr: 1, fontWeight: 500, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                        +91
                    </Typography>
                ),
            }}
            sx={{
                mb: { xs: 1.5, md: 2 },
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    '& fieldset': {
                        borderColor: '#e2e8f0',
                    },
                    '&:hover fieldset': {
                        borderColor: '#3b82f6',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                    },
                },
                '& .MuiInputBase-input': {
                  py: { xs: 1.2, md: 1.5 },
                },
            }}
        />

        {/* Service Type */}
        <TextField
          fullWidth
          select
          placeholder="Select Service"
          value={formData.service}
          onChange={handleInputChange('service')}
          size="small"
          sx={{
            mb: { xs: 1.5, md: 2 },
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              borderRadius: '6px',
              fontSize: { xs: '0.9rem', md: '1rem' },
              '& fieldset': {
                borderColor: '#e2e8f0',
              },
              '&:hover fieldset': {
                borderColor: '#3b82f6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              },
            },
            '& .MuiInputBase-input': {
              py: { xs: 1.2, md: 1.5 },
            },
          }}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              if (!selected) {
                return <span style={{ color: '#9ca3af', fontSize: window.innerWidth < 600 ? '0.9rem' : '1rem' }}>Select Service</span>;
              }
              return selected;
            },
          }}
        >
          {serviceOptions.map((option) => (
            <MenuItem key={option} value={option} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Message */}
        <TextField
          fullWidth
          multiline
          rows={{ xs: 3, md: 3 }}
          placeholder="Your Message"
          value={formData.message}
          onChange={handleInputChange('message')}
          size="small"
          sx={{
            mb: { xs: 1.5, md: 2 },
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              borderRadius: '6px',
              fontSize: { xs: '0.9rem', md: '1rem' },
              '& fieldset': {
                borderColor: '#e2e8f0',
              },
              '&:hover fieldset': {
                borderColor: '#3b82f6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              },
            },
            '& .MuiInputBase-input': {
              py: { xs: 1, md: 1.2 },
            },
          }}
        />

        {/* Terms Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
              size="small"
              sx={{
                color: '#64748b',
                p: { xs: 0.5, md: 1 },
                '&.Mui-checked': {
                  color: '#3b82f6',
                },
              }}
            />
          }
          label={
            <Typography variant="body2" sx={{ color: '#64748b', fontSize: { xs: '0.75rem', md: '0.8rem' }, lineHeight: 1.4 }}>
              By contacting us, you agree to our{' '}
              <Typography 
                component="span" 
                sx={{ 
                  color: '#3b82f6',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: { xs: '0.75rem', md: '0.8rem' },
                }}
              >
                Terms of service
              </Typography>{' '}
              and{' '}
              <Typography 
                component="span" 
                sx={{ 
                  color: '#3b82f6',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: { xs: '0.75rem', md: '0.8rem' },
                }}
              >
                Privacy Policy
              </Typography>
              .
            </Typography>
          }
          sx={{ mb: { xs: 1.5, md: 2 }, alignItems: 'flex-start' }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          endIcon={<SendIcon fontSize="small" />}
          sx={{
            backgroundColor: '#6b7280',
            color: 'white',
            py: { xs: 1.2, md: 1.5 },
            borderRadius: '6px',
            fontSize: { xs: '0.9rem', md: '1rem' },
            fontWeight: '600',
            textTransform: 'none',
            boxShadow: '0 2px 8px rgba(107, 114, 128, 0.3)',
            transition: 'all 0.3s ease',
            minHeight: { xs: '44px', md: '48px' },
            '&:hover': {
              backgroundColor: '#4b5563',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(107, 114, 128, 0.4)',
            },
            '&:disabled': {
              backgroundColor: '#d1d5db',
              color: '#9ca3af',
            },
          }}
          disabled={!formData.agreeToTerms}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
