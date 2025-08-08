import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, IconButton } from '@mui/material';
import { Search, X } from 'lucide-react';
import Autocomplete from '@mui/material/Autocomplete';
import { motion, AnimatePresence } from 'framer-motion';
import dummyOffers from '../static/dummyData_ServicesOffered'
import { useUser } from '../UserContext';
import LockIcon from '@mui/icons-material/Lock';
import AccessLockedModal_WorkDetails from '../components/modals/AccessLockedModal_WorkDetails';


const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};



const WorkDetails = () => {

  const { user } = useUser();
  const subscriptionActive = user.velra_subscription_active;

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(!subscriptionActive); // Open modal if no subscription

  const [selectedServices, setSelectedServices] = useState([]);

  const [selectedDays, setSelectedDays] = useState([...daysOfWeek]); // All selected by default

  const handleServiceRemove = (serviceToRemove) => {
    setSelectedServices(selectedServices.filter(service => service.value !== serviceToRemove.value));
  };

  const handleDayToggle = (day) => {
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleEdit = () => {
    const formData = {
      services: selectedServices.map(s => s.value),
      workingDays: selectedDays,
    };
    console.log('Collected Work Details:', formData);
  };

  // Redirect to dashboard when modal closes
  const handleModalClose = () => {
    navigate('/my-profile');
  };


  return (
    <Box className='relative p-5 sm:p-8 w-full h-full'>
      {/* Access Locked Modal */}
      <AccessLockedModal_WorkDetails
        open={isModalOpen}
        onClose={handleModalClose}
        heading="Access Restricted"
        subheading="Subscribe to update your availability and unlock premium features."
      />


      {/* Heading */}
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          borderBottom: '1px solid #E0E0E0',
          gap: 2,
          pb: 2,
          mb: 5
        }}
      >
        <Typography variant="h2" sx={{ fontSize: '2rem', fontWeight: 'semibold', color: '#4A5568' }}>
          Work Details
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.875rem',
            color: '#718096',
          }}
        >
          You can update your offered services & working days here.
        </Typography>

        {/* Yellow Lock Icon */}
        {/* {
          !subscriptionActive  &&  <LockIcon sx={{ fontSize: 24, color: '#F59E0B' }} />
        } */}
      </Box >

        {/* Animated Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key="work-details-content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <Box sx={{ p: { xs: 0.5, sm: 1 }, display: 'flex', maxWidth: { xs: '100%', sm: '80%' }, flexDirection: 'column', gap: { xs: 4, sm: 7 }, flex: 1, overflow: 'auto' }}>
              
              {/* Services Offered */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pb:0.5
                  }}>
                    <Search size={20} color="#2563EB" />
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 500, 
                      color: 'rgba(0,0,0,0.7)',
                      fontSize: '1.125rem'
                    }}
                  >
                    Services Offered
                  </Typography>
                </Box>
                
                {/* Display current services */}
                {user?.whatYouOffer && user.whatYouOffer.length > 0 && (
                  <Box sx={{ 
                    mb: 3, 
                    p: 3, 
                    backgroundColor: 'linear-gradient(135deg, #F8FAFC 0%, #EDF2F7 100%)', 
                    borderRadius: '12px', 
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '4px',
                      height: '100%',
                      backgroundColor: '#2563EB',
                      borderRadius: '0 4px 4px 0'
                    }
                  }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#475569',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        pl: 1,
                        mb: 2
                      }}
                    >
                      <Typography component="span" sx={{ 
                        fontWeight: 700, 
                        color: '#1e293b',
                        fontSize: '0.95rem'
                      }}>
                        🔧 Currently offered services include:
                      </Typography>
                    </Typography>
                    
                    {/* Services Grid */}
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(3, 1fr)', 
                      gap: 1.5,
                      pl: 1,
                      '@media (max-width: 600px)': {
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 1
                      }
                    }}>
                      {user.whatYouOffer.map((service, index) => (
                        <Box
                          key={index}
                          sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                              borderColor: '#2563EB'
                            }
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#374151',
                              fontSize: '0.8rem',
                              fontWeight: 500,
                              textAlign: 'center',
                              lineHeight: 1.3
                            }}
                          >
                            {service}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
                
                <Autocomplete
                  multiple
                  options={dummyOffers}
                  getOptionLabel={(option) => option.label}
                  value={selectedServices}
                  onChange={(event, newValue) => setSelectedServices(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={
                        selectedServices.length === 0
                          ? "Search and select services..."
                          : `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`
                      }
                      variant="outlined"
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          backgroundColor: '#F9FAFB',
                          '& fieldset': { 
                            borderColor: '#D1D5DB',
                            borderWidth: '1px'
                          },
                          '&:hover fieldset': { borderColor: '#9CA3AF' },
                          '&.Mui-focused fieldset': { 
                            borderColor: '#2563EB',
                            borderWidth: '2px'
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: '#374151',
                          fontSize: '0.875rem',
                          py: '12px',
                        },
                      }}
                    />
                  )}
                  sx={{
                    '& .MuiAutocomplete-paper': {
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    }
                  }}
                />
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {selectedServices.map(service => (
                    <Box
                      key={service.value}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#EFF6FF',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        fontSize: '0.875rem',
                        color: '#1D4ED8',
                        fontWeight: 500,
                        border: '1px solid #DBEAFE',
                      }}
                    >
                      {service.label}
                      <IconButton
                        size="small"
                        onClick={() => handleServiceRemove(service)}
                        sx={{ 
                          ml: 1, 
                          p: 0.5, 
                          color: '#1D4ED8',
                          '&:hover': { backgroundColor: '#DBEAFE' }
                        }}
                      >
                        <X size={14} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>





              {/* Working Days */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Typography sx={{ color: '#D97706', fontWeight: 600 }}>📅</Typography>
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 500, 
                      color: 'rgba(0,0,0,0.7)',
                      fontSize: '1.125rem'
                    }}
                  >
                    Working Days
                  </Typography>
                </Box>
                
                {/* Display current working days */}
                {user?.workingDays && user.workingDays.length > 0 && (
                  <Box sx={{ 
                    mb: 3, 
                    p: 3, 
                    backgroundColor: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)', 
                    borderRadius: '12px', 
                    border: '1px solid #F3E8AA',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '4px',
                      height: '100%',
                      backgroundColor: '#D97706',
                      borderRadius: '0 4px 4px 0'
                    }
                  }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#92400e',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        pl: 1
                      }}
                    >
                      <Typography component="span" sx={{ 
                        fontWeight: 700, 
                        color: '#78350f',
                        fontSize: '0.95rem'
                      }}>
                        📅 Current working days are:
                      </Typography>
                      <br />
                      <Typography component="span" sx={{ 
                        color: '#a16207', 
                        fontStyle: 'italic',
                        mt: 0.5,
                        display: 'inline-block'
                      }}>
                        {user.workingDays.join(' • ')}
                      </Typography>
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {daysOfWeek.map(day => (
                    <Button
                      key={day}
                      variant={selectedDays.includes(day) ? 'contained' : 'outlined'}
                      onClick={() => handleDayToggle(day)}
                      sx={{
                        minWidth: { xs: '55px', sm: '70px' },
                        height: { xs: '38px', sm: '48px' },
                        borderRadius: '12px',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 600,
                        textTransform: 'none',
                        backgroundColor: selectedDays.includes(day) ? 'transparent' : '#2563EB',
                        color: selectedDays.includes(day) ? '#6B7280' : 'white',
                        borderColor: selectedDays.includes(day) ? '#D1D5DB' : '#2563EB',
                        '&:hover': {
                          backgroundColor: selectedDays.includes(day) ? '#F3F4F6' : '#1D4ED8',
                          borderColor: selectedDays.includes(day) ? '#9CA3AF' : '#1D4ED8',
                        },
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Save button */}
            <Box sx={{ 
              mt: 2,
              width: '95%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              <Button
                variant="contained"
                onClick={handleEdit}
                sx={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '8px',
                  py: { xs: '6px', sm: '8px' },
                  px: { xs: '16px', sm: '24px' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#2563EB',
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </motion.div>
        </AnimatePresence>
    </Box>
  );
};

export default WorkDetails;