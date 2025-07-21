import { useState, useRef, useEffect } from 'react';
import { Paper, Typography, Checkbox, FormControlLabel, Button } from '@mui/material';
import { Search, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import onboardingImage from '../../assets/onboardingImage.png';
import logoWhite from '../../assets/logoWhite.png';
import dummyOffers from '../../static/dummyData_ServicesOffered';
import { useOnBoarding } from './OnboardingContext';



const Step2_WhatYouOffer = () => {

  const { onboardingData, updateOnboardingData } = useOnBoarding();
  const navigate = useNavigate();

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState(onboardingData.whatYouOffer || []);
  const dropdownRef = useRef(null);

  
  // Sync context when selectedServices changes
  useEffect(() => {
    if (
      Array.isArray(onboardingData.whatYouOffer) &&
      Array.isArray(selectedServices) &&
      onboardingData.whatYouOffer.length === selectedServices.length &&
      onboardingData.whatYouOffer.every((v, i) => v === selectedServices[i])
    ) {
      return;
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

  const handleAgreedCheckboxChange = (event) => {
    setAgreedToTerms(event.target.checked);
    updateOnboardingData({ 
      ...onboardingData, 
      agreedTermsAndConditions: event.target.checked, 
      agreedPrivacyPolicy: event.target.checked 
    });
  };

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
    navigate('/auth/onboarding/working-days', { replace: true });
  };




  return (
    <div style={{ position: 'relative', width: '80%', height: '80%' }}>
      {/* Velra logo absolutely positioned relative to this wrapper */}
      <div
        style={{
          position: 'absolute',
          top: '-4rem',
          left: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <img src={logoWhite} alt="velra-logo" />
        <h3 className="font-semibold text-5xl text-white">VELRA</h3>
      </div>

      <Paper
        elevation={7}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          borderRadius: '20px',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >

        {/* Debugging Purposes */}
        <pre>{JSON.stringify(onboardingData, null, 2)}</pre>

        {/* Left Half: Form Content */}
        <div className='flex flex-col flex-1 p-8 sm:p-12 justify-between bg-white'>
          <div className="flex flex-col">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#1a1a1a',
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.5rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Tell Us What You Offer
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#6b7280',
                mb: { xs: 4, sm: 8 },
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.6,
              }}
            >
              We'll help connect you with the right societies
            </Typography>

            {/* Multi-Select Input */}
            <div className="relative w-full max-w-lg" ref={dropdownRef}>
              <div
                className="w-full bg-white rounded-xl py-4 pl-14 pr-4 text-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-gray-300 transition-all duration-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Search size={20} className="absolute left-4 text-gray-400 pointer-events-none" />
                <span className="ml-8 text-gray-700 text-base">
                  {selectedServices.length > 0
                    ? `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`
                    : 'Select services you offer...'
                  }
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </div>

              {isDropdownOpen && (
                <div
                  className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-2 py-2 z-10 backdrop-blur-sm"
                  style={{ maxHeight: '280px', overflowY: 'auto' }}
                >
                  {dummyOffers.map((offer) => (
                    <div
                      key={offer.value}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                      onClick={() => handleServiceToggle(offer.value)}
                    >
                      <Checkbox
                        checked={selectedServices.includes(offer.value)}
                        onChange={() => handleServiceToggle(offer.value)}
                        sx={{
                          color: '#9ca3af',
                          '&.Mui-checked': {
                            color: '#3b82f6',
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(59, 130, 246, 0.04)',
                          },
                        }}
                      />
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#374151', 
                          ml: 1.5,
                          fontSize: '0.95rem',
                          fontWeight: 500,
                        }}
                      >
                        {offer.label}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Services Tags */}
            {selectedServices.length > 0 && (
              <div className="flex flex-wrap gap-x-3 gap-y-3 mt-6 max-w-lg">
                {selectedServices.map((serviceValue) => {
                  const service = dummyOffers.find(o => o.value === serviceValue);
                  return service ? (
                    <div
                      key={service.value}
                      className="relative flex items-center rounded-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors duration-150"
                    >
                      <span>{service.label}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(service.value)}
                        className="ml-2 w-5 h-5 flex justify-center items-center border-none rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-150 focus:outline-none"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center gap-6 mt-8">
            {/* Continue Button */}
            {selectedServices.length > 0 && (
              <Button
                variant="contained"
                onClick={handleContinue}
                disabled={!agreedToTerms}
                sx={{
                  py: '12px',
                  px: '32px',
                  bgcolor: !agreedToTerms ? '#f3f4f6' : '#3b82f6',
                  color: !agreedToTerms ? '#9ca3af' : 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: '12px',
                  boxShadow: !agreedToTerms ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.4)',
                  '&:hover': {
                    bgcolor: !agreedToTerms ? '#f3f4f6' : '#2563eb',
                    boxShadow: !agreedToTerms ? 'none' : '0 6px 16px rgba(59, 130, 246, 0.5)',
                  },
                  textTransform: 'none',
                  transition: 'all 0.2s ease-in-out',
                  '&:disabled': {
                    bgcolor: '#f3f4f6',
                    color: '#9ca3af',
                  },
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
                    color: '#d1d5db',
                    '&.Mui-checked': {
                      color: '#3b82f6',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(59, 130, 246, 0.04)',
                    },
                  }}
                />
              }
              label={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                  }}
                >
                  By continuing, you agree to our{' '}
                  <span style={{ color: '#3b82f6', cursor: 'pointer' }}>Terms & Conditions</span>
                  {' '}and{' '}
                  <span style={{ color: '#3b82f6', cursor: 'pointer' }}>Privacy Policy</span>.
                </Typography>
              }
              sx={{ alignSelf: 'flex-start' }}
            />
          </div>
        </div>

        {/* Right Half: Image */}
        <div className='flex-1 hidden md:flex items-center justify-center bg-white'>
          <img
            src={onboardingImage}
            alt="Illustration"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </Paper>
    </div>
  );
};

export default Step2_WhatYouOffer;