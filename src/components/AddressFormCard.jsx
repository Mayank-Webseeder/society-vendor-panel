import { Paper, Typography, TextField, Button, Box } from '@mui/material';


const AddressFormCard = () => {
    
    // Dummy data for the address fields
    const addressData = {
        buildingFlatShopNo: 'Flat-203/Shanti Residency, Sector 21, Navi Mumbai, Maharashtra – 400706',
        landmark1: 'Purple Residency',
        landmark2: 'Purple Residency', // Assuming two landmark fields as per image
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '302019',
    };




    return (
        <Paper
            elevation={3}
            sx={{
                backgroundColor: "white",
                boxShadow: 3,
                border: '1px solid #E0E0E0',
                borderRadius: '12px', // Ensure rounded corners are applied
                width: '100%',
                p: 3, // Add padding inside the paper to contain content
                display: 'flex',
                flexDirection: 'column',
                gap: 2, // Spacing between elements
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'semibold', color: '#424242', mb: 1 }}>
                Address
            </Typography>

            <Box sx={{ width: '100%', '& > div': { mb: 2 } }}> {/* Container for form fields */}
                {/* Building/Flat/Shop No. */}
                <TextField
                    label="Building/Flat/Shop No."
                    variant="outlined"
                    fullWidth
                    multiline // For multiline address
                    rows={2} // Adjust rows as needed
                    value={addressData.buildingFlatShopNo}
                    InputProps={{ readOnly: true }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            bgcolor: '#ffffff', // Changed to white
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

                {/* Landmark 1 */}
                <TextField
                    label="Landmark"
                    variant="outlined"
                    fullWidth
                    value={addressData.landmark1}
                    InputProps={{ readOnly: true }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            bgcolor: '#ffffff', // Changed to white
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

                {/* Landmark 2 (Assuming a second one based on image repetition) */}
                <TextField
                    label="Landmark"
                    variant="outlined"
                    fullWidth
                    value={addressData.landmark2}
                    InputProps={{ readOnly: true }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            bgcolor: '#ffffff', // Changed to white
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

                {/* City */}
                <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    value={addressData.city}
                    InputProps={{ readOnly: true }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            bgcolor: '#ffffff', // Changed to white
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

                {/* State */}
                <TextField
                    label="State"
                    variant="outlined"
                    fullWidth
                    value={addressData.state}
                    InputProps={{ readOnly: true }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            bgcolor: '#ffffff', // Changed to white
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

                {/* Pincode */}
                <TextField
                    label="Pincode"
                    variant="outlined"
                    fullWidth
                    value={addressData.pincode}
                    InputProps={{ readOnly: true }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            bgcolor: '#ffffff', // Changed to white
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

            {/* Edit Button */}
            <Button
                variant="contained"
                sx={{
                    mt: 1, // Adjusted margin top
                    py: '10px',
                    bgcolor: '#1976D2',
                    color: 'white',
                    fontWeight: 'semibold',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                        bgcolor: '#1565C0',
                    },
                    width: '120px', // Fixed width for the button
                    alignSelf: 'center', // Center the button
                }}
            >
                Edit
            </Button>
        </Paper>
    );
};


export default AddressFormCard;