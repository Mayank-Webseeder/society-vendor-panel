import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Box, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { ChevronLeft } from 'lucide-react';
import policyData from '../static/dummyData_PrivacyPolicy';
import { useUser } from '../UserContext';


const PrivacyPolicy = () => {

    const { user, setUser } = useUser();

    const navigate = useNavigate();
  
    const handleCheckboxChange = (event) => {
        setUser({ ...user, agreedPrivacyPolicy: event.target.checked })
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
                //mx: 'auto', // Center the card
                ml: 4,
                mb: 5
                // The ml: 4 and mb: 5 from your template are removed here
                // as they are typically applied by the parent component that uses this card
                // to ensure the component itself is truly responsive and reusable.
                // If you need them, they should be applied where PrivacyPolicy is rendered.
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
                <IconButton onClick={() => navigate('/my-profile/account-support')} sx={{ mr: 1, p: 0 }}>
                    <ChevronLeft size={27} strokeWidth={3} color="rgba(0,0,0,0.59)" />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.59)' }}>
                    Privacy Policy
                </Typography>
            </Box>

            {/* Content Container with increased left padding */}
            <Box sx={{ pl: { xs: 2, sm: 4 }, pr: { xs: 0, sm: 0 }, pt: { xs: 0, sm: 0 }, pb: { xs: 0, sm: 0 } }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 1, sm: 2 } }}>
                    Last Updated: 14-06-2025
                </Typography>

                <Typography variant="body1" sx={{ mb: { xs: 1, sm: 2 }, color: 'rgb(0,0,0,0.65)' }}>
                    We respect your privacy. By using this app, you agree to how we collect and use your information.
                </Typography>

                {/* Policy Sections */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
                    {policyData.map((section) => (
                        <Box key={section.id}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5, color: 'rgb(0,0,0,0.65)' }}>
                                {section.id}. {section.heading}
                            </Typography>
                            {section.type === 'list' && (
                                <Box component="ul" sx={{ pl: 4, mt: 0, mb: 0 }}> {/* List styling */}
                                    {section.items.map((item, index) => (
                                        <Typography component="li" key={index} variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 0.5, color: 'rgb(0,0,0,0.55)' }}>
                                            {item}
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                            {section.type === 'text' && (
                                <>
                                    <Typography variant="body2" color="text.secondary" sx={{ pl: 2, lineHeight: 1.6 }}>
                                        {section.content}
                                    </Typography>
                                    {section.subItems && (
                                        <Box component="ul" sx={{ pl: 4, mt: 0, mb: 0 }}> {/* Sub-list styling */}
                                            {section.subItems.map((item, index) => (
                                                <Typography component="li" key={index} variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 0.5 }}>
                                                    {item}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                </>
                            )}
                        </Box>
                    ))}
                </Box>

                {/* Checkbox Agreement */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={user.agreedPrivacyPolicy}
                            onChange={handleCheckboxChange}
                            sx={{
                                color: '#4487AE', // Checkbox color
                                '&.Mui-checked': {
                                    color: '#4487AE', // Checked state color
                                },
                            }}
                        />
                    }
                    label={
                        <Typography variant="body2" sx={{ color: '#4487AE' }}>
                            By continuing, you agree to our Terms & Conditions.
                        </Typography>
                    }
                    sx={{ mt: { xs: 2, sm: 3 }, alignSelf: 'flex-start' }} // Align to start
                />
            </Box>
        </Paper>
    );
};


export default PrivacyPolicy;