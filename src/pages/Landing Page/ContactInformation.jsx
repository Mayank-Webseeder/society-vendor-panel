import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ContactInformation = () => {
  return (
    <Box sx={{ pr: { md: 3 }, px: { xs: 1, md: 0 } }}>
      {/* Get in Touch Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: '600',
          color: '#1e293b',
          fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.7rem' },
          lineHeight: 1.2,
          mt: { xs: 2, md: 3 },
          mb: 1
        }}
      >
        Get in Touch
      </Typography>

      {/* Description */}
      <Typography
        variant="body2"
        sx={{
          color: '#64748b',
          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' },
          lineHeight: 1.5,
          mb: { xs: 2.5, md: 3 },
        }}
      >
        Have questions or need assistance? Reach out to us, and our friendly team will be happy to help.
      </Typography>

      {/* Our Address */}
      <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 0.8, md: 1 } }}>
          <LocationOnIcon 
            sx={{ 
              color: '#3b82f6', 
              fontSize: { xs: '1.2rem', md: '1.3rem' },
              mr: { xs: 1.2, md: 1.5 }
            }} 
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              color: '#1e293b',
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            Our Address
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
            fontSize: { xs: '0.85rem', md: '0.95rem' },
            lineHeight: 1.5,
            ml: { xs: 3, md: 3.5 },
            maxWidth: 500
          }}
        >
          Office No 34, Maple High Street, Narmadapuram Rd, in front of Aashima Mall, Danish Nagar, Bagmugaliya, Bhopal, Madhya Pradesh 462042
        </Typography>
      </Box>

      {/* Opening Hours */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 0.8, md: 1 } }}>
          <AccessTimeIcon 
            sx={{ 
              color: '#3b82f6', 
              fontSize: { xs: '1.2rem', md: '1.3rem' },
              mr: { xs: 1.2, md: 1.5 }
            }} 
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              color: '#1e293b',
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            Opening Hours
          </Typography>
        </Box>
        <Box sx={{ ml: { xs: 3, md: 3.5 } }}>
          <Typography
            variant="body2"
            sx={{
              color: '#64748b',
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              lineHeight: 1.4,
              mb: 0.5,
            }}
          >
            Mon-Sat: 10AM - 6PM
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#64748b',
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              lineHeight: 1.4,
            }}
          >
            Sunday: Closed
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactInformation;
