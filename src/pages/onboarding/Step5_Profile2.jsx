import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, TextField, Box, Select, MenuItem, FormControl } from '@mui/material';
import logoWhite from '../../assets/logoWhite.png';
import indianStates from '../../static/dummyData_IndianStates';
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
  const [error, setError] = useState('');

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
    if (
      !buildingFlatShopNo.trim() ||
      !localityTown.trim() ||
      !landmark.trim() ||
      !state ||
      !city.trim() ||
      pincode.length !== 6
    ) {
      setError('All fields are required and pincode must be 6 digits.');
      return;
    }
    setError('');
    navigate('/auth/onboarding/location');
  };

console.log(onboardingData.idProofFile);

  
  return (
    <Paper
      elevation={7}
      sx={{
        width: '80%',
        height: '80%',
        display: 'flex',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >

      {/* Debugging Purposes */}
      {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

      <div
        className="w-full h-full rounded-xl p-8 sm:p-12 flex flex-col justify-between bg-white"
        style={{
          overflowY: 'auto',
          scrollbarGutter: 'stable',    // Prevent layout shift when scrollbar appears (optional, modern browsers)
        }}
      >
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
              columnGap: { xs: 0, sm: 7 }, // Increase this value for more column gap (e.g., sm: 6 or sm: 8)
              rowGap: { xs: 3, sm: 4 },    // Use rowGap for vertical spacing
              mb: { xs: 6, sm: 8 },
            }}
          >
            {/* Building/Flat/Shop No. */}
            <Box>
              <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Building/Flat/Shop No.
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                required
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
              <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Locality/Town
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                required
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
              <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Landmark
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                required
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
              <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                State
              </Typography>
              <FormControl fullWidth variant="outlined" required>
                <Select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 250,
                      },
                    },
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left',
                    },
                  }}
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
                  {indianStates.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* City Input */}
            <Box>
              <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                City
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
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

            {/* Pincode */}
            <Box>
              <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.69)', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Pincode
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                required
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

        {/* Error Message */}
        {error && (
          <Typography variant="body2" sx={{ color: 'red', mb: 2, fontWeight: 500 }}>
            {error}
          </Typography>
        )}

        {/* Continue Button */}
        <Button
          variant="outlined"
          onClick={handleContinue}
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