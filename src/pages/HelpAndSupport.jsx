import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import { ChevronLeft, Headphones, Phone, Mail } from 'lucide-react'; // Using Lucide icons



const HelpAndSupport = () => {

    const navigate = useNavigate();

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
                border: '3px solid white',
                borderRadius: '12px',
                width: '70%',
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                ml: 4,
                mb: 5
            }}
        >
            {/* Top Blue Header Section */}
            <Box
                sx={{
                    bgcolor: '#387091',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                {/* Back Arrow */}
                <IconButton onClick={() => navigate('/my-profile/account-support')} sx={{ position: 'absolute', top: { xs: 8, sm: 16 }, left: { xs: 8, sm: 16 }, p: 0 }}>
                    <ChevronLeft size={27} strokeWidth={3} color="white" />
                </IconButton>
                <Headphones size={32} color="white" sx={{ mb: 0.5, mt: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2, color: 'white', mb: 0.5, textAlign: 'center' }}>
                    Help and Support
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'white',
                        opacity: 0.8,
                        textAlign: 'center',
                        fontSize: { xs: '0.6rem', sm: '0.7rem' },
                        lineHeight: 1.3,
                        maxWidth: '80%',
                        mx: 'auto',
                    }}
                >
                    We're here to assist you with any questions or concerns.
                </Typography>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
                {/* Services Offered - Label only as per image */}
                <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                    <Typography variant="h6" sx={{ fontWeight: '600', color: 'rgb(28,27,31,0.69)' }}>
                        Services Offered
                    </Typography>
                </Box>

                {/* What's the issue you're facing? */}
                <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'rgb(28,27,31,0.69)', mb: 1 }}>
                        What's the issue you're facing?
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={15}
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
                        mt: { xs: 1, sm: 2 },
                        py: '10px',
                        bgcolor: '#56A9D9',
                        color: 'white',
                        fontWeight: 'semibold',
                        borderRadius: '6px',
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                        '&:hover': {
                            bgcolor: '#1565C0',
                        },
                        width: '120px',
                        alignSelf: 'center',
                    }}
                >
                    Save
                </Button>
            </Box>

            {/* Contact Options */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: { xs: 2, sm: 4 },
                    py: { xs: 2, sm: 2 },
                    mt: { xs: 1, sm: 1 },
                    mb: { xs: 1, sm: 2 },
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Phone size={20} color="#757575" />
                        <Typography variant="body2" sx={{ color: 'rgb(0,0,0,0.49)', fontSize: '0.875rem' }}>
                            Call us
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'rgb(68,135,174,0.79)', fontSize: '0.875rem' }}>
                        +91 999 999 9999
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Mail size={20} color="#757575" sx={{ mb: 0.5 }} />
                        <Typography variant="body2" sx={{ color: 'rgb(0,0,0,0.49)', fontSize: '0.875rem' }}>
                            Email
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'rgb(68,135,174,0.79)', fontSize: '0.875rem' }}>
                        abc99@gmail.com
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};


export default HelpAndSupport;