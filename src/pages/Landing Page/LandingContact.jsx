import { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, MenuItem, FormControlLabel, Checkbox, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';


const LandingContact = () => {
    
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
        py: { xs: 6, md: 10 },
        backgroundColor: 'white',
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
            {/* Left Side - Contact Information */}
            <Grid item xs={12} md={5}>
              <Box sx={{ pr: { md: 4 } }}>
                {/* Get in Touch Title */}
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: '700',
                    color: '#1e293b',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                >
                  Get in Touch
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    color: '#64748b',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.6,
                    mb: 5,
                  }}
                >
                  Have questions or need assistance? Reach out to us, and our friendly team will be happy to help.
                </Typography>

                {/* Our Address */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon 
                      sx={{ 
                        color: '#3b82f6', 
                        fontSize: '1.5rem',
                        mr: 2 
                      }} 
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: '600',
                        color: '#1e293b',
                        fontSize: '1.2rem',
                      }}
                    >
                      Our Address
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#64748b',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      ml: 5,
                    }}
                  >
                    Office No 34, Maple High Street, Narmadapuram Rd, in front of Aashima Mall, Danish Nagar, Bagmugaliya, Bhopal, Madhya Pradesh 462042
                  </Typography>
                </Box>

                {/* Opening Hours */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTimeIcon 
                      sx={{ 
                        color: '#3b82f6', 
                        fontSize: '1.5rem',
                        mr: 2 
                      }} 
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: '600',
                        color: '#1e293b',
                        fontSize: '1.2rem',
                      }}
                    >
                      Opening Hours
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#64748b',
                        fontSize: '1rem',
                        lineHeight: 1.5,
                        mb: 0.5,
                      }}
                    >
                      Mon-Sat: 10AM - 6PM
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#64748b',
                        fontSize: '1rem',
                        lineHeight: 1.5,
                      }}
                    >
                      Sunday: Closed
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right Side - Contact Form */}
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    p: { xs: 4, md: 6 },
                    border: '1px solid #e2e8f0',
                  }}
                >
                  {/* Form Title */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: '700',
                      color: '#1e293b',
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                      lineHeight: 1.2,
                      mb: 1,
                    }}
                  >
                    Send us a message!
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: '#64748b',
                      fontSize: '1rem',
                      mb: 4,
                    }}
                  >
                    We usually respond within 24 hours.
                  </Typography>

                  {/* Contact Form */}
                  <Box component="form" onSubmit={handleSubmit}>
                    {/* First Name and Last Name */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleInputChange('firstName')}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'white',
                              borderRadius: '8px',
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
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={handleInputChange('lastName')}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'white',
                              borderRadius: '8px',
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
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: '8px',
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
                      }}
                    />

                    {/* Phone Number */}
                    <Grid container spacing={0} sx={{ mb: 3 }}>
                      <Grid item xs={3} sm={2}>
                        <TextField
                          fullWidth
                          value="+91"
                          disabled
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: '#f1f5f9',
                              borderRadius: '8px 0 0 8px',
                              '& fieldset': {
                                borderColor: '#e2e8f0',
                                borderRight: 'none',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={9} sm={10}>
                        <TextField
                          fullWidth
                          placeholder="Phone number"
                          value={formData.phoneNumber}
                          onChange={handleInputChange('phoneNumber')}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'white',
                              borderRadius: '0 8px 8px 0',
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
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* Service Selection */}
                    <TextField
                      fullWidth
                      select
                      placeholder="Select Service"
                      value={formData.service}
                      onChange={handleInputChange('service')}
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: '8px',
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
                      }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (!selected) {
                            return <span style={{ color: '#9ca3af' }}>Select Service</span>;
                          }
                          return selected;
                        },
                      }}
                    >
                      {serviceOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* Message */}
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: '8px',
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
                      }}
                    />

                    {/* Terms Checkbox */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.agreeToTerms}
                          onChange={handleCheckboxChange}
                          sx={{
                            color: '#64748b',
                            '&.Mui-checked': {
                              color: '#3b82f6',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                          By contacting us, you agree to our{' '}
                          <Typography 
                            component="span" 
                            sx={{ 
                              color: '#3b82f6',
                              textDecoration: 'underline',
                              cursor: 'pointer',
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
                            }}
                          >
                            Privacy Policy
                          </Typography>
                          .
                        </Typography>
                      }
                      sx={{ mb: 4, alignItems: 'flex-start' }}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      endIcon={<SendIcon />}
                      sx={{
                        backgroundColor: '#6b7280',
                        color: 'white',
                        py: 2,
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        textTransform: 'none',
                        boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#4b5563',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 20px rgba(107, 114, 128, 0.4)',
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
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingContact;
