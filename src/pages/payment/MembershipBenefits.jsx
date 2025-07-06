import { Box, Typography, Button } from '@mui/material';
import { Check } from 'lucide-react'; // Using Lucide icon for checkmark


const MembershipBenefits = () => {

  const benefits = [
    'Access verified society job requests',
    'Priority visibility in nearby societies',
    'Build trust with a verified vendor',
    'Direct leads from residential communities',
    'Yearly membership at just ₹999',
  ];

  const handleSubscribe = () => {
    console.log("Subscribe Now clicked!");
    // Implement subscription logic here
  };




  return (
    <Box
      sx={{
        width: '58%',
        height: '100%',
        //border: '2px solid red',
        // minHeight: '100vh', // Occupy full height of the viewport
        display: 'flex',
        flexDirection: 'column',
        // Removed alignItems: 'center' to allow left alignment
        justifyContent: 'flex-start', // Align content to the top
        // alignItems: 'center',
        bgcolor: 'white', // White background for the entire component
        fontFamily: 'Inter, sans-serif', // Ensure Inter font is used
        p: { xs: 1, sm: 2 }, // Responsive padding
        boxSizing: 'border-box', // Include padding in width/height
      }}
    >
      {/* VELRA Title */}
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }, // Responsive font size
          fontWeight: 'bold',
          color: '#56A9D9', // Changed color to #56A9D9
          mb: 1,
          textAlign: 'left', // Changed to left alignment
          textShadow: '2px 2px 4px rgba(0,0,0,0.4)', // Increased shadow values for more prominence
        }}
      >
        VELRA
      </Typography>

      {/* Tagline */}
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '1rem', sm: '1.25rem', md: '1.25rem' }, // Responsive font size
          color: '#616161', // Gray color
          mb: { xs: 2, sm: 4, md: 4 },
          textAlign: 'left', // Changed to left alignment
          lineHeight: 1.5,
        }}
      >
        Just ₹999/year. One payment. Full access. No hassle.
      </Typography>

      {/* Get Started Section */}
      <Box sx={{ width: '100%', maxWidth: '400px', mb: { xs: 2, sm: 2 } }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: 'rgba(0,0,0,0.80)',
            mb: 1,
            textAlign: 'left', // Already left-aligned, kept for clarity
          }}
        >
          Get Started with<br />Vendor Gold Membership
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '',
            mb: { xs: 1, sm: 2 },
            textAlign: 'left', // Already left-aligned, kept for clarity
            fontWeight: 400
          }}
        >
          One plan. All benefits.
        </Typography>

        {/* Why Join? Section */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
            color: 'rgba(0,0,0,0.80)',
            mb: { xs: 1, sm: 1.5 },
            textAlign: 'left', // Already left-aligned, kept for clarity
          }}
        >
          Why Join?
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 1 } }}>
          {benefits.map((benefit, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', color: '#424242' }}>
              <Check size={18} color="#1976D2" strokeWidth={3} style={{ marginRight: '8px', marginTop: '2px' }} /> {/* Increased strokeWidth for thicker checkmark */}
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                {benefit}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* No hidden charges link */}
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(0, 0, 0, 0.69)', // Changed color to rgba(0, 0, 0, 0.69)
          textDecoration: 'underline',
          // cursor: 'auto',
          mb: { xs: 4, sm: 6, md: 5 },
          textAlign: 'left', // Changed to left alignment
        }}
        onClick={() => console.log("No hidden charges clicked")}
      >
        No hidden charges
      </Typography>

      {/* Subscribe Button */}
      <Button
        variant="contained"
        onClick={handleSubscribe}
        sx={{
          py: { xs: 1.5, sm: 1 },
          px: { xs: 4, sm: 5 },
          bgcolor: '#56A9D9', // A light blue color for the button
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '5px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
          textTransform: 'none', // Prevent uppercase
          fontSize: { xs: '1rem', sm: '1.2rem' },
          '&:hover': {
            bgcolor: '#42A5F5', // Darker blue on hover
          },
          width: { xs: '80%', sm: 'auto' }, // Responsive width for button
          maxWidth: '300px', // Max width for button
          alignSelf: 'flex-start', // Align button to the left
        }}
      >
        Subscribe Now!
      </Button>
    </Box>
  );
};


export default MembershipBenefits;