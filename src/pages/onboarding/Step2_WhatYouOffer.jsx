import { useState, useRef, useEffect } from 'react';
import { Paper, Typography, Checkbox, FormControlLabel, Button } from '@mui/material';
import { Search, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import onboardingImage from '../../assets/onboardingImage.png';
import dummyOffers from '../../static/dummyData_ServicesOffered';
import { useOnBoarding } from './OnboardingContext';


const Step2_WhatYouOffer = () => {

  const { onboardingData, updateOnboardingData } = useOnBoarding();

  const navigate = useNavigate();

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState(onboardingData.whatYouOffer || []);
  const dropdownRef = useRef(null); // Ref for clicking outside to close

  const handleAgreedCheckboxChange = (event) => {
    setAgreedToTerms(event.target.checked);
  };


  // Sync context when selectedServices changes
  useEffect(() => {
    if (
      Array.isArray(onboardingData.whatYouOffer) &&
      Array.isArray(selectedServices) &&
      onboardingData.whatYouOffer.length === selectedServices.length &&
      onboardingData.whatYouOffer.every((v, i) => v === selectedServices[i])
    ) {
      return; // No change, don't update
    }
    updateOnboardingData({ whatYouOffer: selectedServices });
  }, [selectedServices, onboardingData.whatYouOffer, updateOnboardingData]);


  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleServiceToggle = (serviceValue) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceValue)
        ? prevSelected.filter((val) => val !== serviceValue)
        : [...prevSelected, serviceValue]
    );
  };

  const handleRemoveTag = (serviceValue) => {
    setSelectedServices((prevSelected) =>
      prevSelected.filter((val) => val !== serviceValue)
    );
  };

  const handleContinue = () => {
    console.log("Continue clicked with selected services:", selectedServices);
    navigate('/auth/onboarding/working-days');
  };



  return (
    <Paper
      elevation={7}
      sx={{
        width: '80%',
        height: '80%',
        display: 'flex',
        borderRadius: '12px', // Example: Add some border radius to the Paper
        overflow: 'hidden', // Hide overflow for rounded corners
      }}
    >

      {/* Debugging Purposes */}
      <pre>{JSON.stringify(onboardingData, null, 2)}</pre>


      {/* Left Half: Form Content */}
      <div className='flex flex-col flex-1 p-8 sm:p-12 justify-between bg-white'> {/* Added padding and flex-col for layout */}
        <div className="flex flex-col">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#212121',
              mb: 1, // Margin bottom for heading
              fontSize: { xs: '1.75rem', sm: '2.25rem' }, // Responsive font size
            }}
          >
            Tell Us What You Offer
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#616161',
              mb: { xs: 4, sm: 8 }, // Margin bottom for subtitle
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            We'll help connect you with the right societies
          </Typography>

          {/* Multi-Select Input */}
          <div className="relative w-full max-w-md" ref={dropdownRef}>
            <div
              className="w-full bg-white rounded-lg py-3 pl-12 pr-4 text-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 shadow-sm flex items-center justify-between cursor-pointer" // Added border and shadow
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Search size={20} className="absolute left-4 text-gray-400 pointer-events-none" />
              <span className="ml-8 text-gray-700">
                {selectedServices.length > 0
                  ? `${selectedServices.length} selected`
                  : 'Select services...'
                }
              </span>
              <ChevronDown size={20} className="text-gray-500" />
            </div>

            {isDropdownOpen && (
              <div
                className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 py-2 z-10"
                style={{ maxHeight: '250px', overflowY: 'auto' }} // Max height and scrollbar
              >
                {dummyOffers.map((offer) => (
                  <div
                    key={offer.value}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedServices.includes(offer.value)}
                      onChange={() => handleServiceToggle(offer.value)}
                      onClick={(e) => e.stopPropagation()} // Stop propagation here
                      sx={{
                        color: '#B0B0B0', // Faint gray for unchecked box outline
                        '&.Mui-checked': {
                          color: '#4487AE', // Distinct blue for the checkmark
                        },
                      }}
                    />
                    <Typography variant="body1" sx={{ color: '#424242' }}>
                      {offer.label}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Services Tags */}
          {selectedServices.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 max-w-md">
              {selectedServices.map((serviceValue) => {
                const service = dummyOffers.find(o => o.value === serviceValue);
                return service ? (
                  <div
                    key={service.value}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 border border-gray-200"
                  >
                    <span>{service.label}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(service.value)}
                      className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Continue Button */}
        {selectedServices.length > 0 && (
          <Button
            variant="contained"
            onClick={handleContinue}
            disabled={!agreedToTerms}
            sx={{
              mt: { xs: 3, sm: 4 }, // Margin top
              py: '10px',
              bgcolor: !agreedToTerms ? '#f5f5f5' : '#56A9D9', // Grayed out if not agreed
              color: !agreedToTerms ? '#bdbdbd' : 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: !agreedToTerms ? '#f5f5f5' : '#42A5F5',
              },
              width: '150px', // Fixed width for the button
              alignSelf: 'center', // Center the button
              opacity: !agreedToTerms ? 0.7 : 1,
              pointerEvents: !agreedToTerms ? 'none' : 'auto',
            }}
          >
            Continue
          </Button>
        )}


        {/* Checkbox for Terms & Conditions */}
        <FormControlLabel
          control={
            <Checkbox
              checked={agreedToTerms}
              onChange={handleAgreedCheckboxChange}
              sx={{
                color: '#B0B0B0', // Faint gray for unchecked box outline
                '&.Mui-checked': {
                  color: '#4487AE', // Distinct blue for the checkmark
                },
              }}
            />
          }
          label={
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.59)' }}> {/* Adjusted text color */}
              By continuing, you agree to our Terms & Conditions<br />and Privacy Policy.
            </Typography>
          }
          sx={{ mt: { xs: 4, sm: 6 }, alignSelf: 'flex-start' }} // Align to start, responsive margin top
        />
      </div>



      {/* Right Half: Image */}
      <div className='flex-1 flex items-center justify-center'> {/* Placeholder for the image background */}
        <img
          src={onboardingImage}
          alt="Illustration"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </Paper>
  );
};

export default Step2_WhatYouOffer;
