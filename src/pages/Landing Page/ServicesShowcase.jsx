import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import dummyOffers from '../../static/dummyData_ServicesOffered';

const ServicesShowcase = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  // Group services into categories
  const serviceCategories = {
    'All': dummyOffers,
    'Cleaning': dummyOffers.filter(service => 
      service.label.includes('Cleaning') || 
      service.label.includes('Housekeeping') || 
      service.label.includes('Pest Control')
    ),
    'Maintenance': dummyOffers.filter(service => 
      service.label.includes('Maintenance') || 
      service.label.includes('Repairs') || 
      service.label.includes('Plumbing') || 
      service.label.includes('Electrical') || 
      service.label.includes('AC') || 
      service.label.includes('Carpentry') || 
      service.label.includes('Painting')
    ),
    'Security': dummyOffers.filter(service => 
      service.label.includes('Security') || 
      service.label.includes('CCTV') || 
      service.label.includes('Fire Safety') || 
      service.label.includes('Visitor')
    ),
    'Management': dummyOffers.filter(service => 
      service.label.includes('Management') || 
      service.label.includes('Administration') || 
      service.label.includes('Event')
    ),
  };

  const tabLabels = Object.keys(serviceCategories);
  const currentServices = serviceCategories[tabLabels[selectedTab]];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Box
      sx={{
        // border: '2px solid pink',
        mx: 'auto',
        // maxWidth: { xs: '90%' },
        py: { xs: 6, md: 10 },
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: '700',
                color: '#1e293b',
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
                lineHeight: 1.2,
              }}
            >
              50+ Services for your essential needs
            </Typography>
          </Box>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 6 } }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#3b82f6',
                  height: 3,
                  borderRadius: '3px',
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', md: '1.1rem' },
                  color: '#64748b',
                  px: { xs: 2, md: 3 },
                  '&.Mui-selected': {
                    color: '#3b82f6',
                    fontWeight: 600,
                  },
                },
              }}
            >
              {tabLabels.map((label) => (
                <Tab key={label} label={label} />
              ))}
            </Tabs>
          </Box>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          key={selectedTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={{ xs: 1.5, md: 2 }} sx={{ justifyContent: 'center', mx: 'auto', width: { xs: '100%', sm: '90%'} }}>
            {/* Display up to 9 services */}
            {currentServices.slice(0, 9).map((service, index) => (
              <Grid item xs={6} sm={4} md={2.4} key={service.value}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: '1px solid rgba(226, 232, 240, 0.8)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      height: { xs: '45px', md: '50px' },
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        background: 'rgba(255, 255, 255, 1)',
                        borderColor: '#3b82f6',
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 1, md: 1.5 },
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        '&:last-child': { pb: { xs: 1, md: 1.5 } },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: '500',
                          color: '#3b82f6',
                          fontSize: { xs: '0.75rem', md: '1rem' },
                          lineHeight: 1.2,
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {service.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
            
            {/* Show "& more" card if there are more than 10 services */}
            {currentServices.length > 10 && (
              <Grid item xs={6} sm={4} md={2.4}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      borderRadius: '8px',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      height: { xs: '45px', md: '50px' },
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 1, md: 1.5 },
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        '&:last-child': { pb: { xs: 1, md: 1.5 } },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: '500',
                          color: 'white',
                          fontSize: { xs: '0.75rem', md: '1rem' },
                          lineHeight: 1.2,
                          textAlign: 'center',
                        }}
                      >
                        & {currentServices.length - 9} more
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              mt: { xs: 4, md: 10 },
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                color: 'white',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: '30px',
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: '600',
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(249, 115, 22, 0.4)',
                },
              }}
            >
              Get a Demo
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#3b82f6',
                color: '#3b82f6',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: '30px',
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: '600',
                textTransform: 'none',
                borderWidth: '2px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#3b82f6',
                  background: '#3b82f6',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                  borderWidth: '2px',
                },
              }}
            >
              Start Trial
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServicesShowcase;
