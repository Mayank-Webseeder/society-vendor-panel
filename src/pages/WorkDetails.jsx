import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, IconButton } from '@mui/material';
import { Search, X } from 'lucide-react';
import Autocomplete from '@mui/material/Autocomplete';
import { motion, AnimatePresence } from 'framer-motion';
import dummyOffers from '../static/dummyData_ServicesOffered'
import { useUser } from '../UserContext';
// import LockIcon from '@mui/icons-material/Lock';
import AccessLockedModal_WorkDetails from '../components/modals/AccessLockedModal_WorkDetails';
import { addServiceToSubscription } from '../services/api/auth';


const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};



const WorkDetails = () => {

  const { user } = useUser();
  const subscriptionActive = user.subscription_active;

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(!subscriptionActive); // Open modal if no subscription

  const [selectedServices, setSelectedServices] = useState([]);

  const [selectedDays, setSelectedDays] = useState([...daysOfWeek]); // All selected by default
  const [showAllServices, setShowAllServices] = useState(false); // mobile expand toggle
  const isMobile = useMediaQuery('(max-width:600px)');

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

  const handleModalClose = () => {
    navigate('/my-profile');
  };

  const handleAddService = async (newService) => {
    try {
      const response = await addServiceToSubscription(newService);
      console.log('Service added successfully:', response);
      // Optionally, update the UI or state based on the response
    } catch (error) {
      console.error('Error adding service:', error);
      // Handle error (e.g., show a notification to the user)
    }
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
          gap: { xs: 1.25, sm: 2 },
          pb: { xs: 0.75, sm: 1 },
          mb: { xs: 2, sm: 3 }
        }}
      >
        <Typography variant="h2" sx={{ fontSize: { xs: '1.55rem', sm: '2rem' }, fontWeight: 'semibold', color: '#4A5568', lineHeight: { xs: 1.25, sm: 1.3 } }}>
          Work Details
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            color: '#718096',
            maxWidth: { xs: '95%', sm: '100%' }
          }}
        >
          You can update your offered services here.
        </Typography>

        {/* Yellow Lock Icon */}
        {/* { !subscriptionActive  &&  <LockIcon sx={{ fontSize: 24, color: '#F59E0B' }} /> } */}
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
            <Box sx={{ 
              p: { xs: 0.5, sm: 1 }, 
              display: 'flex', 
              maxWidth: { xs: '100%', sm: '80%' }, 
              flexDirection: 'column', 
              gap: { xs: 3, sm: 7 }, 
              flex: 1, 
              overflow: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' }
            }}>
              
              {/* Services Offered */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pb: 0.5,
                    transition: 'width 0.2s ease, height 0.2s ease'
                  }}>
                    <Search size={20} color="#2563EB" style={{ display: 'block' }} />
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 500, 
                      color: 'rgba(0,0,0,0.7)',
                      fontSize: { xs: '0.95rem', sm: '1.125rem' },
                      ml: 0.5
                    }}
                  >
                    Services Offered
                  </Typography>
                </Box>
                
                {/* Display current services */}
                {user?.whatYouOffer && user.whatYouOffer.length > 0 && (
                  <Box sx={{ 
                    mb: { xs: 2.25, sm: 3 }, 
                    p: { xs: 2, sm: 3 }, 
                    background: 'linear-gradient(135deg, #F8FAFC 0%, #EDF2F7 100%)', 
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
                    },
                    // subtle tighter spacing on mobile
                    '@media (max-width:600px)': {
                      borderRadius: '10px'
                    }
                  }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#475569',
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        lineHeight: 1.55,
                        pl: 1,
                        mb: { xs: 1.25, sm: 2 }
                      }}
                    >
                      <Typography component="span" sx={{ 
                        fontWeight: 700, 
                        color: '#1e293b',
                        fontSize: { xs: '0.8rem', sm: '0.95rem' }
                      }}>
                        🔧 Currently offered services include:
                      </Typography>
                    </Typography>
                    
                    {/* Services Grid */}
                    {(() => {
                      const total = user.whatYouOffer.length;
                      const limit = 6; // show first 6 on mobile before expand
                      const truncated = isMobile && !showAllServices && total > limit;
                      const list = truncated ? user.whatYouOffer.slice(0, limit) : user.whatYouOffer;
                      return (
                    <Box 
                      sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }, 
                        gap: { xs: 1, sm: 1.5 },
                        pl: 1,
                        transition: 'max-height 0.3s ease',
                        position: 'relative'
                      }}
                    >
                      {list.map((service, index) => (
                        <Box
                          key={index}
                          sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            padding: { xs: '6px 10px', sm: '8px 12px' },
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
                              fontSize: { xs: '0.65rem', sm: '0.8rem' },
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
                      );
                    })()}
                    {/* Gradient fade when truncated */}
                    {isMobile && !showAllServices && user.whatYouOffer.length > 6 && (
                      <Box sx={{
                        position: 'absolute',
                        bottom: 48,
                        left: 0,
                        right: 0,
                        height: 50,
                        background: 'linear-gradient(to top, rgba(248,250,252,1) 10%, rgba(248,250,252,0))',
                        pointerEvents: 'none'
                      }} />
                    )}
                    {isMobile && user.whatYouOffer.length > 6 && (
                      <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'center' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setShowAllServices(s => !s)}
                          sx={{
                            textTransform: 'none',
                            fontSize: '0.65rem',
                            py: 0.5,
                            px: 1.5,
                            borderRadius: '20px',
                            borderColor: '#2563EB',
                            color: '#2563EB',
                            '&:hover': { borderColor: '#1D4ED8', backgroundColor: '#EFF6FF' }
                          }}
                        >
                          {showAllServices ? 'Show Less' : `Show All (${user.whatYouOffer.length})`}
                        </Button>
                      </Box>
                    )}
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
                          fontSize: { xs: '0.8rem', sm: '0.875rem' },
                          py: { xs: '8px', sm: '12px' },
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
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, sm: 1.5 } }}>
                  {selectedServices.map(service => (
                    <Box
                      key={service.value}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#EFF6FF',
                        borderRadius: '8px',
                        px: { xs: 1.25, sm: 2 },
                        py: { xs: 0.75, sm: 1 },
                        fontSize: { xs: '0.7rem', sm: '0.875rem' },
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
                          ml: 0.75, 
                          p: { xs: 0.25, sm: 0.5 }, 
                          color: '#1D4ED8',
                          '&:hover': { backgroundColor: '#DBEAFE' }
                        }}
                      >
                        <X size={14} style={{ transform: 'translateY(-1px)' }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>


        {/* Add Service button */}
        <Box sx={{ 
          mt: 2, 
          width: '100%', 
          display: 'flex', 
          justifyContent: { xs: 'center', sm: 'flex-end' },
          position: { xs: 'sticky', sm: 'static' },
          bottom: { xs: 0, sm: 'auto' },
          left: 0,
          right: 0,
          background: { xs: 'linear-gradient(to top, rgba(255,255,255,0.96) 60%, rgba(255,255,255,0.8) 100%)', sm: 'transparent' },
          pb: { xs: 1, sm: 0 },
          pt: { xs: 0.5, sm: 0 }
        }}>
          <Button
            variant="contained"
            onClick={() => handleAddService('Painter')} // Example service
            sx={{
              backgroundColor: '#3B82F6',
              color: 'white',
              fontWeight: 600,
              borderRadius: '10px',
              width: { xs: '92%', sm: 'auto' },
              py: { xs: '10px', sm: '8px' },
              px: { xs: '20px', sm: '24px' },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              textTransform: 'none',
              boxShadow: { xs: '0 4px 10px rgba(59,130,246,0.25)', sm: 'none' },
              '&:hover': {
                backgroundColor: '#2563EB',
              },
            }}
          >
            Add Service
          </Button>
        </Box>
    </Box>
  );
};

export default WorkDetails;