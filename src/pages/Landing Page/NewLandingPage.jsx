import { Box } from '@mui/material';
import LandingNavbar from './LandingNavbar';
import LandingIntroSection from './LandingIntroSection';
import AboutUs from './LandingAboutUs';
import HeroSection from './HeroSection';
import LandingReviews from './LandingReviews';
import LandingContact from './LandingContact';
import LandingFAQ from './LandingFAQ';
import LandingFooter from './LandingFooter';


const NewLandingPage = () => {
  
  return (
    <Box sx={{border: '2px solid red'}}>
      <LandingNavbar />
      <LandingIntroSection />
      <AboutUs />
      <HeroSection />
      <LandingReviews />
      <LandingContact />
      <LandingFAQ />
      <LandingFooter />
    </Box>
  );
};

export default NewLandingPage;
