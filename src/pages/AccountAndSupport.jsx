import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Corrected import statement


const AccountAndSupport = () => {

    const navigate = useNavigate();

    const handleClick = (item) => {
      if (item === 'Help and Support') navigate('help-support');
      else if (item === 'FAQ') navigate('faq');
      else if (item === 'Terms and Conditions') navigate('terms-conditions');
      else if (item === 'Privacy Policy') navigate('privacy-policy');
    }



    return (
        <Paper
            elevation={3}
            sx={{
                backgroundColor: "white",
                boxShadow: 3,
                border: '1px solid #E0E0E0',
                borderRadius: '12px', // Ensure rounded corners are applied
                width: '80%', // Responsive width
                height: '80%',
                // maxWidth: { xs: '100%', sm: '600px', md: '700px' }, // Example max-width for larger screens
                p: { xs: 2, sm: 3 }, // Responsive padding
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 3 }, // Responsive spacing between sections
                // mx: 'auto', // Center the card
                ml: 4,
                mb: 5
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
                <IconButton onClick={() => navigate('/my-profile')} sx={{ mr: 1, p: 0 }}>
                    <ChevronLeft size={27} strokeWidth={3} color="rgb(0,0,0,0.59)" />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 'semibold', color: 'rgb(0,0,0,0.59)' }}>
                    Account and Support
                </Typography>
            </Box>

            {/* Grid of Support Options */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr', // Single column on extra small screens
                        sm: '1fr 1fr', // Two columns on small and up
                    },
                    gap: { xs: 2, sm: 4 }, // Responsive gap between grid items
                }}
            >
                {/* Help and Support Card */}
                <Box
                    onClick={() => handleClick('Help and Support')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: { xs: 2, sm: 2.5 },
                        bgcolor: '#B5E3FD', // Light blue background
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: '2px solid white',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.10)',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            bgcolor: '#CFE2F3', // Slightly darker blue on hover
                        },
                    }}
                >
                    <Typography variant="body1" sx={{ fontSize: 18 , fontWeight: '800', color: 'rgb(0,0,0,0.59)' }}>
                        Help and Support
                    </Typography>
                    <ChevronRight size={26} strokeWidth={3} color="rgb(0,0,0,0.59)" />
                </Box>

                {/* FAQ Card */}
                <Box
                    onClick={() => handleClick('FAQ')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: { xs: 2, sm: 2.5 },
                        bgcolor: '#B5CBFD', // Light blue background
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: '2px solid white',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.10)',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            bgcolor: '#CFE2F3',
                        },
                    }}
                >
                    <Typography variant="body1" sx={{ fontSize: 18 , fontWeight: '800', color: 'rgb(0,0,0,0.59)' }}>
                        FAQ
                    </Typography>
                    <ChevronRight size={26} strokeWidth={3} color="rgb(0,0,0,0.59)" />
                </Box>

                {/* Terms and Conditions Card */}
                <Box
                    onClick={() => handleClick('Terms and Conditions')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: { xs: 2, sm: 2.5 },
                        bgcolor: '#BAB5FD', // Light purple background
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: '2px solid white',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.10)',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            bgcolor: '#E0D8F1', // Slightly darker purple on hover
                        },
                    }}
                >
                    <Typography variant="body1" sx={{ fontSize: 18 , fontWeight: '800', color: 'rgb(0,0,0,0.59)' }}>
                        Terms and Conditions
                    </Typography>
                    <ChevronRight size={26} strokeWidth={3} color="rgb(0,0,0,0.59)" />
                </Box>

                {/* Privacy Policy Card */}
                <Box
                    onClick={() => handleClick('Privacy Policy')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: { xs: 2, sm: 2.5 },
                        bgcolor: '#D4B5FD', // Light purple background
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: '2px solid white',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.10)',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            bgcolor: '#E0D8F1',
                        },
                    }}
                >
                    <Typography variant="body1" sx={{ fontSize: 18 , fontWeight: '800', color: 'rgb(0,0,0,0.59)' }}>
                        Privacy Policy
                    </Typography>
                    <ChevronRight size={26} strokeWidth={3} color="rgb(0,0,0,0.59)" />
                </Box>
            </Box>

            {/* Responsive Empty Space */}
            <Box sx={{ py: { xs: 8, sm: 12, md: 16 } }} /> {/* Adjust padding as needed for desired height */}
                            
        </Paper>
    );
};


export default AccountAndSupport;