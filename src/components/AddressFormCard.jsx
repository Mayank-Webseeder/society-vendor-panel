import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';

const AddressFormCard = ({
    buildingFlatShopNo: initialBuildingFlatShopNo = '',
    landmark1: initialLandmark1 = '',
    landmark2: initialLandmark2 = '',
    city: initialCity = '',
    state: initialState = '',
    pincode: initialPincode = '',
}) => {
    const [buildingFlatShopNo, setBuildingFlatShopNo] = useState(initialBuildingFlatShopNo);
    const [landmark1, setLandmark1] = useState(initialLandmark1);
    const [landmark2, setLandmark2] = useState(initialLandmark2);
    const [city, setCity] = useState(initialCity);
    const [stateValue, setStateValue] = useState(initialState);
    const [pincode, setPincode] = useState(initialPincode);

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
                    // label="Building/Flat/Shop No."
                    placeholder='Flat-203/Shanti Residency, Sector 21, Navi Mumbai, Maharashtra - 400706'
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    value={buildingFlatShopNo}
                    onChange={e => setBuildingFlatShopNo(e.target.value)}
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
                    // label="Landmark"
                    placeholder='Purple Residency'
                    variant="outlined"
                    fullWidth
                    value={landmark1}
                    onChange={e => setLandmark1(e.target.value)}
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
                    // label="City"
                    placeholder='Mumbai'
                    variant="outlined"
                    fullWidth
                    value={city}
                    onChange={e => setCity(e.target.value)}
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
                <TextField
                    // label="State"
                    placeholder='Maharashtra'
                    variant="outlined"
                    fullWidth
                    value={stateValue}
                    onChange={e => setStateValue(e.target.value)}
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
                    Pincode
                </Typography>
                <TextField
                    // label="Pincode"
                    placeholder='302019'
                    variant="outlined"
                    fullWidth
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
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
                    // bgcolor: '#1976D2',
                    // color: 'white',
                    fontWeight: 'semibold',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                    // '&:hover': {
                    //     bgcolor: '#1565C0',
                    // },
                    width: '120px',
                    alignSelf: 'center',
                }}
            >
                Edit
            </Button>
        </Paper>
    );
};

export default AddressFormCard;
