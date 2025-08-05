import { useState } from 'react';
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
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
        duration: 0.6,
      },
    },
  };



  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
        mx: 'auto',
        py: { xs: 4, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(249, 115, 22, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
        {/* Headings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 }, position: 'relative', zIndex: 2 }}>
            <Typography
              variant="body1"
              sx={{
                color: '#f97316',
                fontWeight: '600',
                fontSize: { xs: '0.75rem', md: '0.9rem' },
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                mb: { xs: 1, md: 1.5 },
              }}
            >
              Comprehensive Solutions
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: '700',
                color: '#0f172a',
                mb: { xs: 1.5, md: 2 },
                fontSize: { xs: '1.6rem', sm: '2rem', md: '2.8rem' },
                lineHeight: 1.1,
                background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                px: { xs: 2, md: 0 },
              }}
            >
              50+ Premium Services
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#64748b',
                fontWeight: '400',
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                lineHeight: 1.5,
                maxWidth: { xs: '280px', sm: '400px', md: '500px' },
                mx: 'auto',
                px: { xs: 2, md: 0 },
              }}
            >
              Tailored for every essential need in your residential community
            </Typography>
          </Box>
        </motion.div>


        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: { xs: 3, md: 5 },
            position: 'relative',
            zIndex: 2,
            px: { xs: 1, md: 0 },
          }}>
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: { xs: '12px', md: '16px' },
                border: '1px solid rgba(226, 232, 240, 0.5)',
                boxShadow: '0 6px 24px rgba(0, 0, 0, 0.06)',
                p: { xs: 0.5, md: 0.8 },
                width: { xs: '100%', md: 'auto' },
                maxWidth: { xs: '100%', md: 'none' },
              }}
            >
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  minHeight: 'auto',
                  '& .MuiTabs-indicator': {
                    display: 'none',
                  },
                  '& .MuiTabs-flexContainer': {
                    gap: { xs: 0.5, md: 0.8 },
                  },
                  '& .MuiTabs-scrollButtons': {
                    '&.Mui-disabled': { opacity: 0.3 },
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', md: '0.9rem' },
                    color: '#64748b',
                    px: { xs: 1.5, md: 2.5 },
                    py: { xs: 1, md: 1.5 },
                    borderRadius: { xs: '8px', md: '12px' },
                    minHeight: 'auto',
                    minWidth: { xs: 'auto', md: 'auto' },
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      color: 'white',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      boxShadow: '0 3px 8px rgba(59, 130, 246, 0.3)',
                    },
                    '&:hover:not(.Mui-selected)': {
                      background: 'rgba(59, 130, 246, 0.08)',
                      color: '#3b82f6',
                    },
                  },
                }}
              >
                {tabLabels.map((label) => (
                  <Tab key={label} label={label} />
                ))}
              </Tabs>
            </Box>
          </Box>
        </motion.div>


        {/* Services Grid */}
        <motion.div
          key={selectedTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ 
            // width: { xs: '95%', sm: '90%', md: '80%' }, 
            mx: 'auto',
            px: { xs: 1, md: 0 },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              width: { xs:'100%', lg: '90%', xl: '80%'},
              mx: 'auto',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: { xs: '12px', md: '16px' },
              border: '1px solid rgba(226, 232, 240, 0.5)',
              boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
              p: { xs: 1.5, md: 2.5 },
              mb: { xs: 3, md: 5 },
            }}
          >
            <Grid container spacing={{ xs: 1, md: 2 }} sx={{ justifyContent: 'center' }}>
              {/* Display up to 9 services */}
              {currentServices.slice(0, 9).map((service, index) => (
                <Grid item xs={6} sm={4} md={2.4} key={service.value}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        background: 'linear-gradient(135deg, #f4f6fa 0%, #e9ecef 100%)',
                        borderRadius: { xs: '8px', md: '12px' },
                        border: '1px solid #d1d5db',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        height: { xs: '40px', sm: '48px', md: '55px' },
                        boxShadow: '0 2px 8px rgba(30, 41, 59, 0.07)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: 'linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover': {
                          transform: { xs: 'translateY(-1px)', md: 'translateY(-3px) scale(1.01)' },
                          boxShadow: '0 8px 24px rgba(30, 41, 59, 0.13)',
                          background: 'linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)',
                          borderColor: '#2563eb',
                          '&::before': {
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          p: { xs: 0.8, md: 1.5 },
                          textAlign: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          '&:last-child': { pb: { xs: 0.8, md: 1.5 } },
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: '600',
                            color: '#1e293b',
                            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.9rem' },
                            lineHeight: { xs: 1.2, md: 1.3 },
                            textAlign: 'center',
                            transition: 'color 0.3s ease',
                            '.MuiCard-root:hover &': {
                              color: '#2563eb',
                            },
                          }}
                        >
                          {service.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}

              {/* Show "& more" card if there are more than 9 services */}
              {currentServices.length > 9 && (
                <Grid item xs={6} sm={4} md={2.4}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        borderRadius: { xs: '8px', md: '12px' },
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        height: { xs: '40px', sm: '48px', md: '55px' },
                        boxShadow: '0 6px 20px rgba(59, 130, 246, 0.25)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: '100px',
                          height: '100px',
                          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                          transform: 'translate(-50%, -50%)',
                          borderRadius: '50%',
                          transition: 'transform 0.3s ease',
                        },
                        '&:hover': {
                          transform: { xs: 'translateY(-1px)', md: 'translateY(-3px) scale(1.01)' },
                          boxShadow: '0 12px 32px rgba(59, 130, 246, 0.35)',
                          background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                          '&::before': {
                            transform: 'translate(-50%, -50%) scale(1.2)',
                          },
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          p: { xs: 0.8, md: 1.5 },
                          textAlign: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          position: 'relative',
                          zIndex: 1,
                          '&:last-child': { pb: { xs: 0.8, md: 1.5 } },
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: '600',
                            color: 'white',
                            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.9rem' },
                            lineHeight: { xs: 1.2, md: 1.3 },
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
          </Box>
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
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, md: 2.5 },
              mt: { xs: 3, md: 5 },
              px: { xs: 2, md: 0 },
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                color: 'white',
                px: { xs: 4, md: 5 },
                py: { xs: 1.5, md: 1.5 },
                borderRadius: '40px',
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: '600',
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(249, 115, 22, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: '280px', sm: 'none' },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transition: 'left 0.5s ease',
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(249, 115, 22, 0.35)',
                  '&::before': {
                    left: '100%',
                  },
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
                px: { xs: 4, md: 5 },
                py: { xs: 1.5, md: 1.5 },
                borderRadius: '40px',
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: '600',
                textTransform: 'none',
                borderWidth: '2px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: '280px', sm: 'none' },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '& .MuiButton-label': {
                  position: 'relative',
                  zIndex: 1,
                },
                '&:hover': {
                  borderColor: '#3b82f6',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)',
                  borderWidth: '2px',
                  '&::before': {
                    opacity: 1,
                  },
                },
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Start Trial</span>
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServicesShowcase;