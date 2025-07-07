import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Box, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { ChevronLeft } from 'lucide-react';
import termsData from '../static/dummyData_TermsConditions';
import { useUser } from '../UserContext';



const TermsAndConditions = () => {

    const { user, setUser } = useUser();

    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setUser({ ...user, agreedTermsAndConditions: event.target.checked })
        setTimeout(() => navigate('/my-profile/account-support'), 1000);
    };



    return (
        <Paper
            elevation={3}
            sx={{
                backgroundColor: "white",
                boxShadow: 3,
                border: '1px solid #E0E0E0',
                borderRadius: '12px', // Ensure rounded corners are applied
                width: '80%', // Responsive width
                //maxWidth: { xs: '100%', sm: '600px', md: '700px' }, // Example max-width for larger screens
                p: { xs: 2, sm: 3 }, // Responsive padding
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 3 }, // Responsive spacing between sections
                // mx: 'auto', // Center the card
                ml: 4,
                mb: 5
                // The ml: 4 and mb: 5 from your template are removed here
                // as they are typically applied by the parent component that uses this card
                // to ensure the component itself is truly responsive and reusable.
                // If you need them, they should be applied where TermsAndConditions is rendered.
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
                <IconButton onClick={() => navigate('/my-profile/account-support')} sx={{ mr: 1, p: 0 }}>
                    <ChevronLeft size={27} strokeWidth={3} color="rgb(0,0,0,0.59)" />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(0,0,0,0.59)' }}>
                    Terms and Condition
                </Typography>
            </Box>

            {/* Content Container with increased left padding */}
            <Box sx={{ pl: { xs: 2, sm: 4 }, pr: { xs: 0, sm: 0 }, pt: { xs: 0, sm: 0 }, pb: { xs: 0, sm: 0 } }}> {/* Added responsive left padding */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 1, sm: 2 } }}>
                    Last Updated: 14-06-2025
                </Typography>

                <Typography variant="body1" sx={{ mb: { xs: 1, sm: 2 }, color: 'rgb(0,0,0,0.65)' }}>
                    By using this app, you agree to the following:
                </Typography>

                {/* Terms List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
                    {termsData.map((term) => (
                        <Box key={term.id}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5, color: 'rgb(0,0,0,0.65)' }}>
                                {term.id}. {term.heading}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ pl: 2, lineHeight: 1.6, color:'rgb(0,0,0,0.59)' }}>
                                {term.content}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 2, sm: 3 } }}>
                    For support, visit the Help & Support section.
                </Typography>

                {/* Checkbox Agreement */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={user.agreedTermsAndConditions}
                            onChange={handleCheckboxChange}
                            sx={{
                                color: '#4487AE', // Changed checkbox color
                                '&.Mui-checked': {
                                    color: '#4487AE', // Changed checked state color
                                },
                            }}
                        />
                    }
                    label={
                        <Typography variant="body2" sx={{ color: '#4487AE' }}> {/* Changed text color */}
                            By continuing, you agree to our Terms & Conditions.
                        </Typography>
                    }
                    sx={{ mt: { xs: 2, sm: 3 }, alignSelf: 'flex-start' }} // Align to start
                />
            </Box>
        </Paper>
    );
};


export default TermsAndConditions;