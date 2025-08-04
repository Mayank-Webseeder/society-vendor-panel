import { Box } from '@mui/material';
import ServicesShowcase from './ServicesShowcase';
import PlatformFeatures from './PlatformFeatures';

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        pb:12
      }}
    >
      {/* Services Showcase Section */}
      <ServicesShowcase />

      {/* Platform Features Section */}
      <PlatformFeatures />
    </Box>
  );
};

export default HeroSection;
