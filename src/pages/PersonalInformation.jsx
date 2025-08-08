import { useState, useEffect } from 'react';
import { viewVendorProfile } from '../services/api/auth';
import Skeleton from '@mui/material/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit as EditIcon } from 'lucide-react';
import { FormControl, Select, MenuItem, Button, Box, Typography } from '@mui/material';
import IOSSwitch from '../components/IOSSwitch';
import indianStates from '../static/dummyData_IndianStates';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useUser } from '../UserContext';



const PersonalInformation = () => {


  const {user, setUser} = useUser();    // get context data
  const subscriptionActive = user.velra_subscription_active;

  const [tempUser, setTempUser] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch profile data on mount
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    viewVendorProfile()
      .then((profile) => {
        if (mounted && profile) {
          setUser(profile); // merge with defaultUser via safeSetUser
          setTempUser({ ...profile });
        }
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [setUser]);

  // Handlers for My Profile fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prevTempUser) => ({
      ...prevTempUser,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setTempUser((prevTempUser) => ({
      ...prevTempUser,
      dateOfBirth: value, // Value from input type="date" is already YYYY-MM-DD
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser({ ...tempUser });
      console.log('Profile Saved:', tempUser);
    } else {
      // Enter edit mode
      setTempUser({ ...user }); // Reset tempUser to current user data
    }
    setIsEditing(!isEditing);
  };

  // Framer Motion variants for content sections
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };


  // Helper function to render individual form fields for My Profile
  const renderField = (label, name, value, type = 'text', isTextArea = false) => {
    
    // Special handling for gender field
    if (name === 'gender') {
    return (
      <div className="flex flex-col mb-4">
      <label className="text-xs font-medium text-gray-500 uppercase mb-1">{label}</label>
      {isEditing ? (
        <FormControl
        fullWidth
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
          borderRadius: '6px',
          backgroundColor: '#F3F4F6',
          '& fieldset': {
            borderColor: '#767676',
            borderWidth: '1px',
          },
          '&:hover fieldset': {
            borderColor: '#767676',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#3B82F6',
            borderWidth: '2px',
          },
          },
          '& .MuiSelect-select': {
          padding: '7px 12px',
          color: '#4A5568',
          },
          '& .MuiSvgIcon-root': {
          color: '#4A5568',
          },
        }}
        >
        <Select
          name={name}
          value={tempUser[name]}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
        </Select>
        </FormControl>
      ) : (
        <p className="text-gray-800 border-solid border border-gray-200 text-sm py-2 px-2 bg-gray-100 rounded-md pointer-events-none">{value}</p>
      )}
      </div>
    );
    }


    // Special handling for state field
    if (name === 'state') {
        return (
          <div className="flex flex-col mb-4">
            <label className="text-xs font-medium text-gray-500 uppercase mb-1">{label}</label>
            {isEditing ? (
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': { // input root styles
                    borderRadius: '6px', // rounded corners
                    backgroundColor: '#F3F4F6', // input background color
                    '& fieldset': { // input border
                      borderColor: '#767676', // default border color
                      borderWidth: '1px', // default border width
                    },
                    '&:hover fieldset': { // border on hover
                      borderColor: '#767676',
                    },
                    '&.Mui-focused fieldset': { // border on focus
                      borderColor: '#3B82F6',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiSelect-select': { // select text styles
                    padding: '7px 12px', // select padding
                    color: '#4A5568', // select text color
                  },
                  '& .MuiSvgIcon-root': { // dropdown arrow color
                    color: '#4A5568',
                  },
                }}
              >
                <Select
                  name={name}
                  value={tempUser[name] || ''}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Select State' }}
                  MenuProps={{
                    PaperProps: { sx: { maxHeight: 250 } },
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                    transformOrigin: { vertical: 'top', horizontal: 'left' },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select State
                  </MenuItem>
                  {indianStates.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              ) : (
                    <p className="text-gray-800 border-solid border border-gray-200 text-sm py-2 px-2 bg-gray-100 rounded-md pointer-events-none">
                      {indianStates.find((s) => s.value === value)?.label || value}
                    </p>
                  )}
          </div>
        );
    }


    // Special handling for Date of Birth field - reverted to native input type="date"
    if (name === 'dateOfBirth') {
      // Helper to format ISO date to "DD MMMM, YYYY" for display
      const formatDateForDisplay = (isoDateString) => {
        if (!isoDateString) return 'N/A';
        try {
          const [year, month, day] = isoDateString.split('-');
          const date = new Date(year, month - 1, day); // Month is 0-indexed
          return date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
        } catch (error) {
          console.error("Error formatting date:", error);
          return isoDateString; // Fallback to original string if formatting fails
        }
      };



      return (
        <div className="flex flex-col mb-4">
          <label className="text-xs font-medium text-gray-500 uppercase mb-1">{label}</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {isEditing ? (
              <DatePicker
                value={tempUser[name] ? new Date(tempUser[name]) : null}
                onChange={(date) => {
                  setTempUser((prev) => ({
                    ...prev,
                    dateOfBirth: date ? date.toISOString().slice(0, 10) : '',
                  }));
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        backgroundColor: '#F3F4F6',
                        '& fieldset': {
                          borderColor: '#767676',
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: '#767676',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3B82F6',
                          borderWidth: '2px',
                        },
                      },
                    },
                  },
                }}
                format="yyyy-MM-dd"
                disableFuture
                // openTo="year"
                // views={['year', 'month', 'day']}
              />
            ) : (
              <p className="text-gray-800 border-solid border border-gray-200 text-sm py-2 px-2 bg-gray-100 rounded-md pointer-events-none">
                {formatDateForDisplay(value)}
              </p>
            )}
          </LocalizationProvider>
        </div>
      );
    }

    // Existing rendering for other fields (default text input or textarea)
    return (
      <div className="flex flex-col mb-4">
        <label className="text-xs font-medium text-gray-500 uppercase mb-1">{label}</label>
        {isTextArea ? (
          <textarea
            name={name}
            value={isEditing ? tempUser[name] : user[name]}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full p-2 border-solid border bg-gray-100 text-gray-800 text-sm rounded-md resize-none
              ${isEditing ? 'focus:outline-none focus:border-blue-500' : 'border-gray-200 pointer-events-none'}
            `}
            rows="2"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={isEditing ? tempUser[name] : user[name]}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full p-2 border-solid border bg-gray-100 text-gray-800 text-sm rounded-md
              ${isEditing ? 'focus:outline-none focus:border-blue-500' : 'border-gray-200 pointer-events-none'}
            `}
          />
        )}
      </div>
    );
  };


  if (loading) {
    // Skeleton UI for loading state
    return (
      <div className='p-5 sm:p-8 w-full h-full relative'>
        <Skeleton variant="text" width={220} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 3, borderRadius: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={220} sx={{ mb: 3, borderRadius: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={180} sx={{ borderRadius: 2 }} />
      </div>
    );
  }

  return (
    <div className='p-5 sm:p-8 w-full h-full relative'>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: { xs: 'flex-start', sm: 'space-between' },
        alignItems: 'center',
        borderBottom: '1px solid #E0E0E0',
        pb: 2,
        mb: 2
      }}>
        <Typography variant="h2" sx={{ fontSize: '2rem', fontWeight: 'semibold', color: '#4A5568' }}>
          Profile Information
        </Typography>
        {/* Desktop Edit Button */}
        <Button
          onClick={handleEditToggle}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            px: 2,
            py: 1,
            width: 92,
            bgcolor: '#3B82F6',
            color: 'white',
            borderRadius: '0.375rem',
            '&:hover': {
              bgcolor: '#2563EB',
            },
            transition: 'background-color 0.15s ease-in-out',
            textTransform: 'none',
            fontSize: '0.875rem',
          }}
        >
          {!isEditing  &&  <EditIcon size={14} style={{ marginRight: '0.25rem' }} />}
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </Box>

      {/* Mobile Edit Button - Fixed at bottom-right */}
      <Button
        onClick={handleEditToggle}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'fixed',
          bottom: 80, // Above mobile navigation
          right: 20,
          zIndex: 40,
          alignItems: 'center',
          px: 3,
          py: 1.5,
          minWidth: 100,
          bgcolor: '#3B82F6',
          color: 'white',
          borderRadius: '25px',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
          '&:hover': {
            bgcolor: '#2563EB',
            boxShadow: '0 6px 16px rgba(59, 130, 246, 0.5)',
          },
          transition: 'all 0.2s ease-in-out',
          textTransform: 'none',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
      >
        {!isEditing  &&  <EditIcon size={16} style={{ marginRight: '0.5rem' }} />}
        {isEditing ? 'Save' : 'Edit'}
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Company Info */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={isEditing? 'edit-mode-company' : 'view-mode-company'}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box sx={{
              bgcolor: 'white',
              // border: '2px solid red',
              borderRadius: '0.5rem',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              // boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              p: 2,
              // mb: 4
            }}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
                  <Box sx={{
                    width: 16 * 6,
                    height: 16 * 6,
                    bgcolor: '#FFEDD5',
                    // border: '2px solid black',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#EA580C',
                    fontWeight: 'bold',
                    fontSize: '2.5rem',
                    mr: 3
                  }}>
                    {user.initials}
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="p" sx={{ fontSize: '1.8rem', fontWeight: 'semibold', color: '#4A5568' }}>
                      {tempUser.name}
                    </Typography>
                    <Typography variant="p" sx={{ fontSize: '1rem', color: '#718096' }}>
                      {tempUser.jobTitle}
                    </Typography>
                  </Box>
                </Box>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Notification toggle */}
        <Box 
          sx={{ 
            display: { xs: 'none', sm: 'flex' }, 
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            // border: '2px solid green',
            // width: 'fit-content',
            height: 'fit-content',
            mt: 2,
            // mb: 3,
            // pr: 1, 
            gap: 1 
          }}
        >
          <Typography
            sx={{
              fontSize: '1.2rem',
              color: subscriptionActive ? '#4A5568' : '#A0AEC0', // Faded color when disabled
              fontWeight: 500,
              mr: 1,
            }}
          >
            Notifications
          </Typography>
          <IOSSwitch
            checked={user.notificationsEnabled  &&  subscriptionActive}
            onChange={() => setUser({ ...user, notificationsEnabled: !user.notificationsEnabled })}
            inputProps={{ 'aria-label': 'Enable notifications', disabled: !subscriptionActive }}
            sx={{
              pointerEvents: subscriptionActive ? 'auto' : 'none',
              cursor: subscriptionActive ? 'pointer' : 'default',
              '& .MuiSwitch-thumb': {
                cursor: subscriptionActive ? 'pointer' : 'default',
              },
              '& .MuiSwitch-track': {
                cursor: subscriptionActive ? 'pointer' : 'default',
              },
            }}
          />
        </Box>
      </Box>
      

      {/* Personal Details Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isEditing ? "edit-mode" : "view-mode"}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-lg px-1 sm:px-6 mb-8"
        >
          <h3 className="text-xl font-normal text-gray-800 mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {renderField('Full Name', 'name', tempUser.name)}
            {renderField('Email address', 'email', tempUser.email, 'email')}
            {renderField('Phone', 'phone', tempUser.phone, 'tel')}
            {renderField('Gender', 'gender', tempUser.gender)}
            {renderField('Work Experience', 'workExperience', tempUser.workExperience, 'text')}
            {renderField('Date of Birth', 'dateOfBirth', tempUser.dateOfBirth, 'date')}
            {renderField('Bio', 'bio', tempUser.bio, 'text', true)}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Address Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isEditing ? "edit-mode-address" : "view-mode-address"}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-lg px-1 sm:px-6 border border-gray-200"
        >
          <h3 className="text-xl font-normal text-gray-800 mb-4">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {renderField('Flat/Building', 'building', tempUser.building)}
            {renderField('Locality', 'locality', tempUser.locality)}
            {renderField('Landmark', 'landmark', tempUser.landmark)}
            {renderField('City', 'city', tempUser.city)}
            {renderField('State', 'state', tempUser.state)}
            {renderField('Country', 'country', tempUser.country)}
            {renderField('Pincode', 'pincode', tempUser.pincode)}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PersonalInformation;