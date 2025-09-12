import { useState, useEffect } from 'react';
import { /* viewVendorProfile, */ updateVendorProfile } from '../services/api/auth';
import Skeleton from '@mui/material/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit as EditIcon } from 'lucide-react';
import { FormControl, Select, MenuItem, Button, ListItemText, Checkbox } from '@mui/material';
import IOSSwitch from '../components/IOSSwitch';
import indianStates from '../static/dummyData_IndianStates';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useUser } from '../UserContext';


const PersonalInformation = () => {

  const {user, setUser} = useUser();    // get context data
  const subscriptionActive = user.subscription_active;

  const [tempUser, setTempUser] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  
  // Use UserContext only (API disabled for now)
  useEffect(() => {
    setTempUser({ ...user });
    setLoading(false);
  }, [user]);


  // Handlers for My Profile fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prevTempUser) => ({
      ...prevTempUser,
      [name]: value,
    }));
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        // Save changes
        const formData = new FormData();
        Object.keys(tempUser).forEach((key) => {
          formData.append(key, tempUser[key]);
        });

        await updateVendorProfile(formData);
        setUser({ ...tempUser });
        console.log('Profile Saved:', tempUser);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
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
                  value={tempUser[name] || user[name] || ''}
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

    // Special handling for working days field
    if (name === 'workingDays') {
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
                value={tempUser[name] || user[name] || []}
                onChange={(e) =>
                  setTempUser((prevTempUser) => ({
                    ...prevTempUser,
                    [name]: e.target.value,
                  }))
                }
                multiple
                displayEmpty
                renderValue={(selected) =>
                  selected.length === 0 ? 'Select Working Days' : selected.join(', ')
                }
              >
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <MenuItem key={day} value={day}>
                    <Checkbox checked={(tempUser[name] || user[name] || []).includes(day)} />
                    <ListItemText primary={day} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <p className="text-gray-800 border-solid border border-gray-200 text-sm py-2 px-2 bg-gray-100 rounded-md pointer-events-none">
              {value?.join(', ') || 'Not specified'}
            </p>
          )}
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
    <div className='relative w-full h-full px-4 sm:px-8 pt-4 sm:pt-6 pb-3 sm:pb-8'>
      {/* Simple Heading */}
      <div className="flex items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex flex-col gap-1">
          <h2 style={{ fontFamily: 'Lato' }} className="text-2xl sm:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">Profile Information</h2>
          <p style={{ fontFamily: 'Lato' }} className="text-xs sm:text-sm text-slate-500">Manage and keep your personal details up to date</p>
        </div>
        <Button
          onClick={handleEditToggle}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            px: 2.5,
            py: 1.1,
            zIndex: 20,
            background: isEditing ? 'linear-gradient(90deg,#059669,#10B981)' : 'linear-gradient(90deg,#2563EB,#4F46E5)',
            color: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 12px -2px rgba(0,0,0,0.12),0 2px 4px rgba(0,0,0,0.06)',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            letterSpacing: 0.3,
            '&:hover': {
              filter: 'brightness(1.05)',
              boxShadow: '0 6px 16px -2px rgba(0,0,0,0.15),0 3px 6px rgba(0,0,0,0.08)'
            }
          }}
        >
          {!isEditing && <EditIcon size={14} style={{ marginRight: '0.4rem' }} />}
          {isEditing ? 'Save Changes' : 'Edit'}
        </Button>
      </div>

      {/* Profile summary card with integrated notifications toggle */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={isEditing ? 'edit-mode-company' : 'view-mode-company'}
          variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative max-w-xl bg-white/75 backdrop-blur-lg border border-slate-200 rounded-2xl p-5 mb-8 sm:mb-12 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          <div className="absolute -top-10 -right-14 w-56 h-56 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="relative flex items-start gap-5">
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-3xl shadow-inner ring-2 ring-white/40">
              {user.initials}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-[10px] font-semibold text-white shadow ring-2 ring-white">
                {user.subscription_active ? 'PRO' : 'STD'}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-800">{tempUser.name}</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">ID: {tempUser.id}</p>
              <div className="flex items-center flex-wrap gap-3 mt-1">
                <div className={`px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide shadow-inner border ${subscriptionActive ? 'bg-emerald-50/80 text-emerald-600 border-emerald-300/60' : 'bg-slate-50/70 text-slate-500 border-slate-200'}`}>{subscriptionActive ? 'Subscription Active' : 'Free Tier'}</div>
                {isEditing && <div className="px-2 py-1 rounded-md bg-amber-50 text-amber-600 text-[11px] font-medium border border-amber-200">Editing</div>}
                <div className="hidden sm:flex items-center gap-2 ml-auto pr-1">
                  <span className={`text-[13px] sm:text-[16px] font-medium ${subscriptionActive ? 'text-slate-600' : 'text-slate-400'}`}>Notifications</span>
                  <IOSSwitch
                    checked={user.notificationsEnabled && subscriptionActive}
                    onChange={() => setUser({ ...user, notificationsEnabled: !user.notificationsEnabled })}
                    inputProps={{ 'aria-label': 'Enable notifications', disabled: !subscriptionActive }}
                    sx={{ pointerEvents: subscriptionActive ? 'auto' : 'none' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      

      {/* Personal Details Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isEditing ? "edit-mode" : "view-mode"}
          variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white/75 backdrop-blur-lg rounded-2xl border-solid border border-slate-200 px-3 sm:px-6 pt-5 pb-5 mb-10 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06)] overflow-clip"
        >
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute top-0 left-0 h-1 w-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent rounded-br-full" />
          <h3 className="text-lg z-10 sm:text-xl font-semibold text-slate-800 mb-5 tracking-tight">Personal Details</h3>
          <div className="grid z-10 grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {renderField('Full Name', 'name', tempUser.name)}
            {renderField('Email address', 'email', tempUser.email, 'email')}
            {renderField('Phone', 'phone', tempUser.phone, 'tel')}
            {renderField('Gender', 'gender', tempUser.gender)}
            {renderField('Work Experience', 'workExperience', tempUser.workExperience, 'text')}
            {renderField('Date of Birth', 'dateOfBirth', tempUser.dateOfBirth, 'date')}
            {renderField('Working Days', 'workingDays', tempUser.workingDays, 'text')}
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
          className="relative bg-white/75 backdrop-blur-lg rounded-2xl border-solid border border-slate-200 px-3 sm:px-6 pt-5 pb-5 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06)] overflow-clip"
        >
          <div className="absolute top-0 left-0 h-1 w-28 bg-gradient-to-r from-amber-500 via-orange-500 to-transparent rounded-br-full" />
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-5 tracking-tight">Address</h3>
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

      {/* Delete Account Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key="delete-account"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative bg-white/75 backdrop-blur-lg rounded-2xl border-solid border border-red-400/90 px-3 sm:px-6 pt-5 pb-5 mt-6 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06)] overflow-clip"
        >
          {/* <div className="absolute top-0 left-0 h-1 w-32 bg-gradient-to-r from-red-500 via-red-600 to-transparent rounded-br-full" /> */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 tracking-tight">Delete Your Account</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outlined"
              sx={{
                borderColor: '#ef4444',
                color: '#ef4444',
                '&:hover': {
                  borderColor: '#dc2626',
                  backgroundColor: '#fef2f2',
                  color: '#dc2626'
                },
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                py: 1.5,
                borderRadius: '8px'
              }}
              onClick={() => {
                // Handle delete account logic here
                console.log('Delete account clicked');
              }}
            >
              Delete Account
            </Button>
            <p className="text-xs text-slate-500 flex items-center">
              This action cannot be undone.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Edit Button - Sticky at bottom-right */}
      <Button
        onClick={handleEditToggle}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'sticky',
          bottom: 20,
          ml: 'auto',
          mt: 2,
          zIndex: 50,
          alignItems: 'center',
          px: 3.2,
          py: 1.4,
          minWidth: 110,
          background: isEditing ? 'linear-gradient(90deg,#059669,#10B981)' : 'linear-gradient(90deg,#2563EB,#4F46E5)',
          color: 'white',
          borderRadius: '28px',
          boxShadow: '0 6px 20px -4px rgba(37,99,235,0.5)',
          '&:hover': { filter: 'brightness(1.07)', boxShadow: '0 10px 28px -4px rgba(37,99,235,0.55)' },
          transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
          textTransform: 'none',
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: 0.4
        }}
      >
        {!isEditing && <EditIcon size={16} style={{ marginRight: '0.5rem' }} />}
        {isEditing ? 'Save' : 'Edit'}
      </Button>
    </div>
  );
};

export default PersonalInformation;