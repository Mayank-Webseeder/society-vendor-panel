import { useState } from 'react';
import { Paper, Typography, TextField, Button, Box, FormControl, Autocomplete } from '@mui/material';
import indianStates from '../static/dummyData_IndianStates';
import { useUser } from '../UserContext';



const AddressFormCard = () => {

    const { user, setUser } = useUser();

    const [tempUserDetails, setTempUserDetails] = useState({
        building: user.building || '',
        landmark: user.landmark || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
    });

    // Update tempUserDetails when user context changes (optional, for sync)
    // useEffect(() => { setTempUserDetails(user); }, [user]);

    // Helper to update a single field in temporary form
    const handleChange = (field) => (e) => {
        setTempUserDetails({ ...tempUserDetails, [field]: e.target.value });
    };


    // Handler for edit button --> Finally, save the temporary formData to user-context
    const handleEdit = () => {
        setUser({ ...user, ...tempUserDetails });
        console.log(tempUserDetails);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                backgroundColor: "white",
                boxShadow: 3,
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                width: '100%',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'semibold', color: '#424242', mb: 1 }}>
                Address
            </Typography>

            <Box sx={{ width: '100%', '& > div': { mb: 2 } }}>
                <Typography variant="subtitle1" sx={{ fontWeight: '500', color: 'rgb(28,27,31,0.69)' }}>
                    Building/Flat/Shop No.
                </Typography>
                <TextField
                    placeholder='Flat-203/Shanti Residency, Sector 21, Navi Mumbai, Maharashtra - 400706'
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    value={tempUserDetails.building || ''}
                    onChange={handleChange('building')}
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

                <Typography variant="subtitle1" sx={{ fontWeight: '500', color: 'rgb(28,27,31,0.69)' }}>
                    Landmark
                </Typography>
                <TextField
                    placeholder='Purple Residency'
                    variant="outlined"
                    fullWidth
                    value={tempUserDetails.landmark || ''}
                    onChange={handleChange('landmark')}
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

                <Typography variant="subtitle1" sx={{ fontWeight: '500', color: 'rgb(28,27,31,0.69)' }}>
                    City
                </Typography>
                <TextField
                    placeholder='Mumbai'
                    variant="outlined"
                    fullWidth
                    value={tempUserDetails.city || ''}
                    onChange={handleChange('city')}
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

                <Typography variant="subtitle1" sx={{ fontWeight: '500', color: 'rgb(28,27,31,0.69)' }}>
                    State
                </Typography>
                <FormControl fullWidth variant="outlined" required>
                    <Autocomplete
                        options={indianStates}
                        getOptionLabel={option => option.label}
                        value={indianStates.find(opt => opt.value === tempUserDetails.state) || null}
                        onChange={(e, newValue) => setTempUserDetails({ ...tempUserDetails, state: newValue ? newValue.value : '' })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Select State"
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        bgcolor: '#ffffff',
                                        fontSize: '0.875rem',
                                        py: '5px',
                                        '& fieldset': { borderColor: '#e0e0e0' },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#424242',
                                        fontSize: '0.875rem',
                                        py: '5px',
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '0.875rem',
                                        color: '#757575',
                                    },
                                }}
                            />
                        )}
                        disablePortal
                        openOnFocus
                        sx={{
                            borderRadius: '8px',
                            bgcolor: '#ffffff',
                            maxWidth: '100%',
                            mb: 2,
                            // Optional: match the height of other fields
                            '& .MuiAutocomplete-inputRoot': {
                                paddingX: 1,
                                paddingY: 0.5,
                            },
                        }}
                    />
                </FormControl>

                <Typography variant="subtitle1" sx={{ fontWeight: '500', color: 'rgb(28,27,31,0.69)' }}>
                    Pincode
                </Typography>
                <TextField
                    placeholder='302019'
                    variant="outlined"
                    fullWidth
                    value={tempUserDetails.pincode || ''}
                    onChange={handleChange('pincode')}
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
            </Box>

            <Button
                variant="outlined"
                sx={{
                    mt: 1,
                    py: '10px',
                    fontWeight: 'semibold',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                    width: '120px',
                    alignSelf: 'center',
                }}
                onClick={handleEdit}
            >
                Edit
            </Button>
        </Paper>
    );
};


export default AddressFormCard;