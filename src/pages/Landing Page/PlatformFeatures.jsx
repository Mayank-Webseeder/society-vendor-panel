import { Box } from '@mui/material';
import SocietyFeaturesSection from './SocietyFeaturesSection';
import VendorFeaturesSection from './VendorFeaturesSection';


const PlatformFeatures = () => {

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 3, sm: 6, lg: 7 }
      }}
    >
      {/* Society Platform Features */}
      <SocietyFeaturesSection />

      {/* Vendor Platform Features */}
      <VendorFeaturesSection />
    </Box>
  );
};


export default PlatformFeatures;