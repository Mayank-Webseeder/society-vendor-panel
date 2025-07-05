import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, Select, MenuItem, FormControl } from '@mui/material';
import { useOnBoarding } from './OnboardingContext';



const Step5_Profile2 = () => {

  const navigate = useNavigate();

  const { onboardingData, updateOnboardingData } = useOnBoarding();

  // Initialize state from context
  const [buildingFlatShopNo, setBuildingFlatShopNo] = useState(onboardingData.building || '');
  const [localityTown, setLocalityTown] = useState(onboardingData.locality || '');
  const [landmark, setLandmark] = useState(onboardingData.landmark || '');
  const [state, setState] = useState(onboardingData.state || '');
  const [city, setCity] = useState(onboardingData.city || '');
  const [pincode, setPincode] = useState(onboardingData.pincode || '');

  // Dummy data for State and City dropdowns
  const dummyStates = [
    { label: 'Maharashtra', value: 'maharashtra' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Karnataka', value: 'karnataka' },
  ];

  const dummyCities = [
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Bangalore', value: 'bangalore' },
  ];

  // Sync local state to context on change
  useEffect(() => {
    updateOnboardingData({
      building: buildingFlatShopNo,
      locality: localityTown,
      landmark,
      state,
      city,
      pincode,
    });
  }, [buildingFlatShopNo, localityTown, landmark, state, city, pincode, updateOnboardingData]);

  const handleContinue = () => {
    navigate('/auth/onboarding/location');
  };



  return (
    <Paper
      elevation={7}
      sx={{
        width: '80%',
        height: '80%',
        display: 'flex',
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
      }}
    >

      {/* Debugging Purposes */}
      <pre>{JSON.stringify(onboardingData, null, 2)}</pre>

      {/* Page-Content */}
      <div className='w-full h-full rounded-xl p-8 sm:p-12 flex flex-col justify-between bg-white'>
        <div className="flex flex-col">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#212121',
              mb: { xs: 4, sm: 6 },
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
            }}
          >
            Let's Complete your profile
          </Typography>

          {/* Grid for Address Fields */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
              },
              gap: { xs: 3, sm: 4 },
              mb: { xs: 6, sm: 8 },
            }}
          >
            {/* Building/Flat/Shop No. */}
            <Box>
              <Typography variant="body1" sx={{ color: '#212121', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Building/Flat/Shop No.
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={buildingFlatShopNo}
                onChange={(e) => setBuildingFlatShopNo(e.target.value)}
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

            {/* Locality/Town */}
            <Box>
              <Typography variant="body1" sx={{ color: '#212121', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Locality/Town
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={localityTown}
                onChange={(e) => setLocalityTown(e.target.value)}
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

            {/* Landmark */}
            <Box>
              <Typography variant="body1" sx={{ color: '#212121', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Landmark
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
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

            {/* State Dropdown */}
            <Box>
              <Typography variant="body1" sx={{ color: '#212121', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                State
              </Typography>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    borderRadius: '8px',
                    bgcolor: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '& .MuiSelect-select': {
                      color: '#424242',
                      fontSize: '0.875rem',
                      py: '10px',
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select State
                  </MenuItem>
                  {dummyStates.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* City Dropdown */}
            <Box>
              <Typography variant="body1" sx={{ color: '#212121', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                City
              </Typography>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    borderRadius: '8px',
                    bgcolor: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '& .MuiSelect-select': {
                      color: '#424242',
                      fontSize: '0.875rem',
                      py: '10px',
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select City
                  </MenuItem>
                  {dummyCities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Pincode */}
            <Box>
              <Typography variant="body1" sx={{ color: '#212121', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Pincode
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={pincode}
                onChange={(e) => {
                  // Only allow numbers and max 6 digits
                  const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                  setPincode(val);
                }}
                inputProps={{
                  maxLength: 6,
                  inputMode: 'numeric',
                  pattern: '[0-9]*'
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
                }}
              />
            </Box>
          </Box>
        </div>

        {/* Continue Button */}
        <Button
          variant="outlined"
          onClick={handleContinue}
          disabled={pincode.length !== 6}
          sx={{
            py: '10px',
            bgcolor: 'white',
            color: '#56A9D9',
            borderColor: '#56A9D9',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            '&:hover': {
              bgcolor: '#E0F2FF',
              borderColor: '#56A9D9',
            },
            width: '150px',
            alignSelf: 'center',
          }}
        >
          Continue
        </Button>
      </div>
    </Paper>
  );
};


export default Step5_Profile2;