import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, IconButton } from '@mui/material';
import { Search, X, Wrench } from 'lucide-react';
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
    <Box className='relative w-full h-full px-4 sm:px-8 pt-4 sm:pt-6 pb-12'>
      {/* Access Locked Modal */}
      <AccessLockedModal_WorkDetails
        open={isModalOpen}
        onClose={handleModalClose}
        heading="Access Restricted"
        subheading="Subscribe to update your availability and unlock premium features."
      />
      {/* Heading */}
      <div className="flex flex-col gap-1 mb-8">
        <h2 style={{ fontFamily: 'Manrope' }} className="text-2xl sm:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">Work Details</h2>
        <p style={{ fontFamily: 'Lato' }} className="text-xs sm:text-sm text-slate-500">Manage & refine the services you provide</p>
      </div>

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
            <Box className="flex flex-col gap-10 max-w-5xl pr-1">
              {/* Services Offered Card */}
              <div className="relative bg-white/75 backdrop-blur-lg rounded-2xl border border-slate-200 px-5 sm:px-8 pt-6 pb-8 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="absolute -top-14 -right-10 w-64 h-64 bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
                <div className="absolute top-0 left-0 h-1.5 w-40 bg-gradient-to-r from-blue-600 via-indigo-500 to-transparent rounded-br-full" />
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-inner ring-1 ring-white/30">
                    <Wrench size={22} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-800">Services Offered</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Overview of services currently on your profile</p>
                  </div>
                </div>
                {user?.whatYouOffer && user.whatYouOffer.length > 0 ? (
                  <div className="relative mb-12">
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2"><span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500" /> Active Services ({user.whatYouOffer.length})</p>
                    {(() => {
                      const total = user.whatYouOffer.length;
                      const limit = 6;
                      const truncated = isMobile && !showAllServices && total > limit;
                      const list = truncated ? user.whatYouOffer.slice(0, limit) : user.whatYouOffer;
                      return (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3" aria-label="Active services list" role="list">
                            {list.map((service, i) => (
                              <div
                                key={i}
                                role="listitem"
                                className="group relative px-3 py-2 rounded-xl border-solid border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden"
                              >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-indigo-50/80 via-blue-50/60 to-sky-50/70" />
                                <div className="relative flex flex-col items-center justify-center gap-1">
                                  <span className="text-[0.55rem] sm:text-[0.6rem] font-semibold tracking-wider text-indigo-500/80 group-hover:text-indigo-600 uppercase">{String(i+1).padStart(2,'0')}</span>
                                  <span className="text-[0.65rem] sm:text-[0.7rem] font-medium text-slate-600 group-hover:text-slate-800 text-center leading-tight line-clamp-2">{service}</span>
                                  <span className="absolute -bottom-1px left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-indigo-400/40 via-blue-400/30 to-indigo-400/40 opacity-0 group-hover:opacity-100 transition" />
                                </div>
                                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 opacity-70 group-hover:opacity-100 shadow" />
                                <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-indigo-300/60 transition" />
                              </div>
                            ))}
                          </div>
                          {truncated && (
                            <div className="pointer-events-none absolute bottom-16 left-0 right-0 h-20 bg-gradient-to-t from-white/90 to-transparent" />
                          )}
                          {isMobile && user.whatYouOffer.length > 6 && (
                            <div className="mt-4 flex justify-center">
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => setShowAllServices(s => !s)}
                                sx={{
                                  textTransform: 'none',
                                  fontSize: '0.65rem',
                                  py: 0.6,
                                  px: 1.7,
                                  borderRadius: '20px',
                                  borderColor: '#2563EB',
                                  color: '#2563EB',
                                  background: 'rgba(255,255,255,0.6)',
                                  backdropFilter: 'blur(6px)',
                                  '&:hover': { borderColor: '#1D4ED8', backgroundColor: '#EFF6FF' }
                                }}
                              >
                                {showAllServices ? 'Show Less' : `Show All (${user.whatYouOffer.length})`}
                              </Button>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="mb-12 -mt-2 text-xs text-slate-500 italic">You haven't added any services yet.</div>
                )}
                {/* Selection Input */}
                <div className="relative z-10">
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
                            ? 'Search and select services to add...'
                            : `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`
                        }
                        variant="outlined"
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '14px',
                            backgroundColor: 'rgba(248,250,252,0.9)',
                            backdropFilter: 'blur(4px)',
                            '& fieldset': {
                              borderColor: '#CBD5E1',
                              borderWidth: '1px'
                            },
                            '&:hover fieldset': { borderColor: '#94A3B8' },
                            '&.Mui-focused fieldset': {
                              borderColor: '#2563EB',
                              borderWidth: '2px'
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: '#1E293B',
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            py: { xs: '9px', sm: '13px' },
                          },
                        }}
                      />
                    )}
                    sx={{
                      '& .MuiAutocomplete-paper': {
                        borderRadius: '14px',
                        boxShadow: '0 12px 28px -8px rgba(0,0,0,0.18),0 4px 10px rgba(0,0,0,0.08)'
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map(service => (
                      <div
                        key={service.value}
                        className="group relative flex items-center bg-gradient-to-tr from-blue-600 to-indigo-600 text-white/90 px-3 py-1.5 rounded-full text-[0.65rem] sm:text-xs font-medium tracking-wide shadow hover:shadow-md transition"
                      >
                        {service.label}
                        <IconButton
                          size="small"
                          onClick={() => handleServiceRemove(service)}
                          sx={{
                            ml: 0.5,
                            p: 0.3,
                            color: 'white',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' }
                          }}
                        >
                          <X size={14} style={{ transform: 'translateY(-1px)' }} />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Box>
          </motion.div>
        </AnimatePresence>


        {/* Add Service button */}
        <Box sx={{
          mt: 4,
          width: '100%',
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'flex-end' },
          position: { xs: 'sticky', sm: 'static' },
          bottom: { xs: 10, sm: 'auto' },
          left: 0,
          right: 0,
          pb: { xs: 0.5, sm: 0 }
        }}>
          <Button
            variant="contained"
            onClick={() => handleAddService('Painter')}
            sx={{
              background: 'linear-gradient(90deg,#4F46E5,#2563EB)',
              color: 'white',
              fontWeight: 600,
              borderRadius: '28px',
              width: { xs: '88%', sm: 'auto' },
              py: { xs: '11px', sm: '10px' },
              px: { xs: '26px', sm: '30px' },
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
              textTransform: 'none',
              letterSpacing: 0.4,
              boxShadow: '0 6px 20px -4px rgba(79,70,229,0.45)',
              '&:hover': { filter: 'brightness(1.07)', boxShadow: '0 10px 30px -6px rgba(79,70,229,0.55)' }
            }}
          >
            Add Service
          </Button>
        </Box>
    </Box>
  );
};

export default WorkDetails;