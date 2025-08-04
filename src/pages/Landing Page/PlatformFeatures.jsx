import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';


const PlatformFeatures = () => {

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}
    >
      {/* Society Platform Features */}
      <SocietyFeaturesDropdown />

      {/* Vendor Platform Features */}
      <VendorFeaturesDropdown />
    </Box>
  );
};



// Society Features Dropdown Component
const SocietyFeaturesDropdown = () => {

  const [activeDropdown, setActiveDropdown] = useState(null);

  const societyFeatures = [
    {
      id: 'payroll',
      title: 'Society Management & Administration',
      description: 'Streamline your society operations with comprehensive management tools and administrative features.',
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Service Management',
      description: 'Efficiently manage maintenance requests, track service providers, and ensure quality delivery.',
    },
    {
      id: 'financial',
      title: 'Financial Management & Reporting',
      description: 'Handle society finances, maintenance collections, and generate detailed financial reports.',
    },
    {
      id: 'communication',
      title: 'Communication & Resident Services',
      description: 'Enhance resident communication with announcements, notices, and community engagement tools.',
    },
    {
      id: 'security',
      title: 'Security & Access Control',
      description: 'Manage visitor access, security protocols, and ensure safe community living.',
    },
  ];

  const handleDropdownClick = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };



  return (
    <Container maxWidth="xl" border>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: '700',
              color: '#1e293b',
              mb: { xs: 4, md: 6 },
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              textAlign: 'center',
            }}
          >
            Combine all your Society systems into one platform
          </Typography>

          <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
              {/* Left Side - Dropdown Menu */}
              <Box sx={{ flex: 1 }}>
                {societyFeatures.map((feature) => (
                    <Box key={feature.id} sx={{ mb: 2 }}>
                      <Box
                        onClick={() => handleDropdownClick(feature.id)}
                        sx={{
                          p: { xs: 2, md: 2.5 },
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backgroundColor: activeDropdown === feature.id ? '#f8fafc' : 'white',
                          borderColor: activeDropdown === feature.id ? '#3b82f6' : '#e2e8f0',
                          '&:hover': {
                            borderColor: '#3b82f6',
                            backgroundColor: '#f8fafc',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: '600',
                              color: '#1e293b',
                              fontSize: { xs: '1rem', md: '1.1rem' },
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Box
                            sx={{
                              transform: activeDropdown === feature.id ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease',
                              color: '#64748b',
                            }}
                          >
                            ▼
                          </Box>
                        </Box>
                        
                        {activeDropdown === feature.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e2e8f0' }}>
                              <Typography
                                variant="body1"
                                sx={{
                                  color: '#64748b',
                                  fontSize: { xs: '0.9rem', md: '1rem' },
                                  lineHeight: 1.6,
                                  mb: 3,
                                }}
                              >
                                {feature.description}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                  variant="contained"
                                  sx={{
                                    backgroundColor: '#22c55e',
                                    color: 'white',
                                    px: 3,
                                    py: 1,
                                    borderRadius: '6px',
                                    textTransform: 'none',
                                    fontWeight: '600',
                                    '&:hover': {
                                      backgroundColor: '#16a34a',
                                    },
                                  }}
                                >
                                  Get a Demo
                                </Button>
                                
                                <Button
                                  variant="outlined"
                                  sx={{
                                    borderColor: '#22c55e',
                                    color: '#22c55e',
                                    px: 3,
                                    py: 1,
                                    borderRadius: '6px',
                                    textTransform: 'none',
                                    fontWeight: '600',
                                    '&:hover': {
                                      borderColor: '#16a34a',
                                      backgroundColor: '#f0fdf4',
                                    },
                                  }}
                                >
                                  Learn More
                                </Button>
                              </Box>
                            </Box>
                          </motion.div>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

              {/* Right Side - Visual Placeholder */}
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    height: { xs: '300px', md: '500px' },
                    backgroundColor: '#dcfce7',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #22c55e',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#22c55e',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >
                    Visual Placeholder<br />
                    (Society Management Dashboard, etc.)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};





// Vendor Features Dropdown Component
const VendorFeaturesDropdown = () => {

  const [activeDropdown, setActiveDropdown] = useState(null);

  const vendorFeatures = [
    {
      id: 'jobs',
      title: 'Job Management & Scheduling',
      description: 'Efficiently manage job assignments, track progress, and optimize scheduling for maximum productivity.',
    },
    {
      id: 'clients',
      title: 'Client Relationship Management',
      description: 'Build stronger relationships with societies and residents through comprehensive client management tools.',
    },
    {
      id: 'payments',
      title: 'Payment & Billing Solutions',
      description: 'Streamline payment processing, generate invoices, and manage financial transactions seamlessly.',
    },
    {
      id: 'workforce',
      title: 'Workforce Management',
      description: 'Manage your team effectively with scheduling, performance tracking, and resource allocation tools.',
    },
    {
      id: 'analytics',
      title: 'Business Analytics & Insights',
      description: 'Gain valuable insights into your business performance with detailed analytics and reporting features.',
    },
  ];

  const handleDropdownClick = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };



  return (
    <Container maxWidth="xl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: '700',
              color: '#1e293b',
              mb: { xs: 4, md: 6 },
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              textAlign: 'center',
            }}
          >
            Empower your Service Business with our Vendor Platform
          </Typography>

          <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
              {/* Left Side - Visual Placeholder */}
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    height: { xs: '300px', md: '500px' },
                    backgroundColor: '#fef3c7',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #f59e0b',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#f59e0b',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >
                    Visual Placeholder<br />
                    (Vendor Dashboard, Analytics, etc.)
                  </Typography>
                </Box>
              </Box>

              {/* Right Side - Dropdown Menu */}
              <Box sx={{ flex: 1 }}>
                {vendorFeatures.map((feature) => (
                    <Box key={feature.id} sx={{ mb: 2 }}>
                      <Box
                        onClick={() => handleDropdownClick(feature.id)}
                        sx={{
                          p: { xs: 2, md: 2.5 },
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backgroundColor: activeDropdown === feature.id ? '#fef3c7' : 'white',
                          borderColor: activeDropdown === feature.id ? '#f59e0b' : '#e2e8f0',
                          '&:hover': {
                            borderColor: '#f59e0b',
                            backgroundColor: '#fef3c7',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: '600',
                              color: '#1e293b',
                              fontSize: { xs: '1rem', md: '1.1rem' },
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Box
                            sx={{
                              transform: activeDropdown === feature.id ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease',
                              color: '#64748b',
                            }}
                          >
                            ▼
                          </Box>
                        </Box>
                        
                        {activeDropdown === feature.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e2e8f0' }}>
                              <Typography
                                variant="body1"
                                sx={{
                                  color: '#64748b',
                                  fontSize: { xs: '0.9rem', md: '1rem' },
                                  lineHeight: 1.6,
                                  mb: 3,
                                }}
                              >
                                {feature.description}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                  variant="contained"
                                  sx={{
                                    backgroundColor: '#f59e0b',
                                    color: 'white',
                                    px: 3,
                                    py: 1,
                                    borderRadius: '6px',
                                    textTransform: 'none',
                                    fontWeight: '600',
                                    '&:hover': {
                                      backgroundColor: '#d97706',
                                    },
                                  }}
                                >
                                  Get a Demo
                                </Button>
                                
                                <Button
                                  variant="outlined"
                                  sx={{
                                    borderColor: '#f59e0b',
                                    color: '#f59e0b',
                                    px: 3,
                                    py: 1,
                                    borderRadius: '6px',
                                    textTransform: 'none',
                                    fontWeight: '600',
                                    '&:hover': {
                                      borderColor: '#d97706',
                                      backgroundColor: '#fffbeb',
                                    },
                                  }}
                                >
                                  Learn More
                                </Button>
                              </Box>
                            </Box>
                          </motion.div>
                        )}
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default PlatformFeatures;
