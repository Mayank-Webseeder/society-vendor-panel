import { useState } from 'react';
import { Paper, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import { ChevronLeft, Headphones, Phone, Mail } from 'lucide-react'; // Using Lucide icons


const HelpAndSupport = () => {

    const [issueDescription, setIssueDescription] = useState('');

    const handleSave = () => {
        console.log("Issue Description:", issueDescription);
        // Implement save/submit logic here
    };




    return (
        <Paper
            elevation={3}
            sx={{
                backgroundColor: "white",
                boxShadow: 3,
                border: '1px solid #E0E0E0',
                borderRadius: '12px', // Ensure rounded corners are applied
                width: '100%', // Responsive width
                maxWidth: { xs: '100%', sm: '500px', md: '600px' }, // Example max-width for larger screens
                p: 0, // Remove default padding from Paper, sections will add their own
                display: 'flex',
                flexDirection: 'column',
                //mx: 'auto', // Center the card
                ml: 4,
                mb: 5
            }}
        >
            {/* Top Blue Header Section */}
            <Box
                sx={{
                    bgcolor: '#387091', // Darker bluish background color
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    p: { xs: 2, sm: 3 }, // Responsive padding
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                {/* Back Arrow */}
                <IconButton sx={{ position: 'absolute', top: { xs: 8, sm: 16 }, left: { xs: 8, sm: 16 }, p: 0 }}>
                    <ChevronLeft size={20} color="white" />
                </IconButton>
                <Headphones size={32} color="white" sx={{ mb: 0.5 }} /> {/* Changed icon color back to white */}
                <Typography variant="h6" sx={{ fontWeight: 'semibold', color: 'white', mb: 0.25, textAlign: 'center' }}>
                    Help and Support
                </Typography>
                {/* Made subtitle text smaller and ensured two lines with text-center */}
                <Typography
                    variant="body2"
                    sx={{
                        color: 'white',
                        opacity: 0.8,
                        textAlign: 'center',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' }, // Made font size smaller
                        lineHeight: 1.3, // Adjust line height for better two-line flow
                        maxWidth: '80%', // Constrain width to encourage two lines on smaller screens
                        mx: 'auto', // Center the text if maxWidth is applied
                    }}
                >
                    We're here to assist you with any questions or concerns.
                </Typography>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
                {/* Services Offered - Label only as per image */}
                <Box sx={{ mb: { xs: 2, sm: 3 } }}> {/* Increased margin-bottom for more spacing */}
                    <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#424242' }}>
                        Services Offered
                    </Typography>
                    {/* If this needs to be an actual input/select, you'd add it here */}
                </Box>

                {/* What's the issue you're facing? */}
                <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#424242', mb: 1 }}>
                        What's the issue you're facing?
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={10} // Increased rows for more height (from 8 to 10)
                        placeholder="Describe your issue here..."
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
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

                {/* Save Button */}
                <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                        mt: { xs: 1, sm: 2 }, // Responsive margin top
                        py: '10px',
                        bgcolor: '#1976D2', // Blue background
                        color: 'white',
                        fontWeight: 'semibold',
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                        '&:hover': {
                            bgcolor: '#1565C0', // Darker blue on hover
                        },
                        width: '120px', // Fixed width for the button
                        alignSelf: 'center', // Center the button
                    }}
                >
                    Save
                </Button>
            </Box>

            {/* Contact Options */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // Stack on small, row on larger
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: { xs: 2, sm: 4 }, // Responsive gap
                    py: { xs: 2, sm: 3 }, // Padding top/bottom
                    mt: { xs: 2, sm: 3 }, // Margin top
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Phone size={20} color="#757575" sx={{ mb: 0.5 }} />
                    <Typography variant="body2" sx={{ color: '#424242', fontSize: '0.875rem' }}>
                        Call us
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.875rem' }}>
                        +91 999 999 9999
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Mail size={20} color="#757575" sx={{ mb: 0.5 }} />
                    <Typography variant="body2" sx={{ color: '#424242', fontSize: '0.875rem' }}>
                        Email
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.875rem' }}>
                        abc99@gmail.com
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};


export default HelpAndSupport;