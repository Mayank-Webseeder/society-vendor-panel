import { useState } from 'react';
import { Box, Typography, Button, Container, Paper, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Work as WorkIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
  Groups as GroupsIcon,
  Analytics as AnalyticsIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';


const VendorFeaturesSection = () => {

  const [activeDropdown, setActiveDropdown] = useState(null);

  const vendorFeatures = [
    {
      id: 'jobs',
      icon: WorkIcon,
      title: 'Job Management & Scheduling',
      description: 'Efficiently manage job assignments, track progress, and optimize scheduling for maximum productivity.',
      benefits: ['Smart Scheduling', 'Task Automation', 'Progress Tracking'],
      color: '#f59e0b'
    },
    {
      id: 'clients',
      icon: PeopleIcon,
      title: 'Client Relationship Management',
      description: 'Build stronger relationships with societies and residents through comprehensive client management tools.',
      benefits: ['Customer Database', 'Communication Hub', 'Feedback Management'],
      color: '#3b82f6'
    },
    {
      id: 'payments',
      icon: PaymentIcon,
      title: 'Payment & Billing Solutions',
      description: 'Streamline payment processing, generate invoices, and manage financial transactions seamlessly.',
      benefits: ['Digital Payments', 'Invoice Generation', 'Financial Reports'],
      color: '#10b981'
    },
    {
      id: 'workforce',
      icon: GroupsIcon,
      title: 'Workforce Management',
      description: 'Manage your team effectively with scheduling, performance tracking, and resource allocation tools.',
      benefits: ['Team Scheduling', 'Performance Analytics', 'Resource Planning'],
      color: '#8b5cf6'
    },
    {
      id: 'analytics',
      icon: AnalyticsIcon,
      title: 'Business Analytics & Insights',
      description: 'Gain valuable insights into your business performance with detailed analytics and reporting features.',
      benefits: ['Revenue Analytics', 'Performance Metrics', 'Growth Insights'],
      color: '#ef4444'
    },
  ];

  const handleDropdownClick = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };



  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 3 } }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Heading & Subheading */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Chip
              label="Vendor Management Platform"
              sx={{
                backgroundColor: '#fef3c7',
                color: '#92400e',
                fontWeight: '600',
                fontSize: { xs: '0.7rem', md: '0.75rem' },
                mb: { xs: 1.5, md: 2 },
                px: { xs: 1.2, md: 1.5 },
                py: 0.3
              }}
            />
          </motion.div>
          
          <Typography
            variant="h2"
            sx={{
              fontWeight: '800',
              color: '#0f172a',
              mb: { xs: 1.5, md: 2 },
              fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.2rem', lg: '2.5rem' },
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #92400e 0%, #f59e0b 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              px: { xs: 1, md: 0 },
            }}
          >
            Empower your Service Business
            <br />
            with our Vendor Platform
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: '#64748b',
              maxWidth: { xs: '320px', md: '550px' },
              mx: 'auto',
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              lineHeight: 1.5,
              fontWeight: '400',
              px: { xs: 1, md: 0 },
            }}
          >
            Scale your business operations, manage your workforce, and deliver exceptional service to societies
          </Typography>
        </Box>

          <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 2, md: 4 }, 
              alignItems: 'flex-start',
              flexDirection: { xs: 'column', lg: 'row' }
            }}>
              {/* Left Side - Feature Cards */}
              <Box sx={{ flex: 1, width: '100%' }}>
                {vendorFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          mb: { xs: 1, md: 1.5 },
                          border: '1px solid',
                          borderColor: activeDropdown === feature.id ? feature.color : '#e2e8f0',
                          borderRadius: { xs: '8px', md: '12px' },
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          backgroundColor: activeDropdown === feature.id ? `${feature.color}05` : 'white',
                          '&:hover': {
                            borderColor: feature.color,
                            backgroundColor: `${feature.color}08`,
                            transform: { xs: 'translateY(-1px)', md: 'translateY(-2px)' },
                            boxShadow: { 
                              xs: `0 8px 16px -4px ${feature.color}20, 0 4px 6px -2px ${feature.color}10`,
                              md: `0 15px 20px -5px ${feature.color}20, 0 8px 8px -5px ${feature.color}10` 
                            },
                          },
                        }}
                        onClick={() => handleDropdownClick(feature.id)}
                      >
                        <Box sx={{ px: { xs: 1.6, md: 2 }, py: { xs: 1.1, md: 2 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 1, md: 1.5 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 1.5 } }}>
                              <Box
                                sx={{
                                  p: { xs: 0.8, md: 1 },
                                  borderRadius: { xs: '8px', md: '10px' },
                                  backgroundColor: `${feature.color}15`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <IconComponent sx={{ color: feature.color, fontSize: { xs: '1.1rem', md: '1.25rem' } }} />
                              </Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: '700',
                                  color: '#0f172a',
                                  fontSize: { xs: '0.85rem', md: '1.1rem' },
                                  lineHeight: 1.3,
                                  maxWidth: { xs: '250px', md: 'none' },
                                }}
                              >
                                {feature.title}
                              </Typography>
                            </Box>
                            
                            <motion.div
                              animate={{ 
                                rotate: activeDropdown === feature.id ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <Box
                                sx={{
                                  p: { xs: 0.6, md: 0.75 },
                                  borderRadius: { xs: '4px', md: '6px' },
                                  backgroundColor: activeDropdown === feature.id ? `${feature.color}15` : '#f1f5f9',
                                  color: activeDropdown === feature.id ? feature.color : '#64748b',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  minWidth: { xs: '24px', md: '28px' },
                                  minHeight: { xs: '24px', md: '28px' },
                                }}
                              >
                                <ArrowForwardIcon sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, transform: 'rotate(90deg)' }} />
                              </Box>
                            </motion.div>
                          </Box>

                          <AnimatePresence>
                            {activeDropdown === feature.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                              >
                                <Box sx={{ mt: { xs: 2, md: 2.5 }, pt: { xs: 2, md: 2.5 }, borderTop: `1px solid ${feature.color}20` }}>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color: '#475569',
                                      fontSize: { xs: '0.85rem', md: '1rem' },
                                      lineHeight: 1.6,
                                      mb: { xs: 2, md: 3 },
                                      fontWeight: '400'
                                    }}
                                  >
                                    {feature.description}
                                  </Typography>

                                  <Box sx={{ mb: { xs: 2, md: 3 } }}>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        color: '#0f172a',
                                        fontWeight: '600',
                                        mb: { xs: 1, md: 1.5 },
                                        fontSize: { xs: '0.75rem', md: '0.8rem' },
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                      }}
                                    >
                                      Key Benefits
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 0.8, md: 1 } }}>
                                      {feature.benefits.map((benefit, idx) => (
                                        <motion.div
                                          key={idx}
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                                        >
                                          <Box
                                            sx={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: { xs: 0.5, md: 0.75 },
                                              backgroundColor: `${feature.color}08`,
                                              px: { xs: 1, md: 1.5 },
                                              py: { xs: 0.5, md: 0.75 },
                                              borderRadius: { xs: '12px', md: '16px' },
                                              border: `1px solid ${feature.color}20`,
                                            }}
                                          >
                                            <CheckCircleIcon 
                                              sx={{ 
                                                color: feature.color, 
                                                fontSize: { xs: '0.75rem', md: '0.875rem' }
                                              }} 
                                            />
                                            <Typography
                                              variant="body2"
                                              sx={{
                                                color: '#374151',
                                                fontWeight: '500',
                                                fontSize: { xs: '0.75rem', md: '0.8rem' }
                                              }}
                                            >
                                              {benefit}
                                            </Typography>
                                          </Box>
                                        </motion.div>
                                      ))}
                                    </Box>
                                  </Box>

                                  <Box sx={{ 
                                    display: 'flex', 
                                    gap: { xs: 1, md: 1.5 }, 
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    '& > *': { flex: { xs: 1, sm: 'none' } }
                                  }}>
                                    <Button
                                      variant="contained"
                                      sx={{
                                        backgroundColor: feature.color,
                                        color: 'white',
                                        px: { xs: 2.5, md: 3 },
                                        py: { xs: 1, md: 1 },
                                        borderRadius: { xs: '6px', md: '8px' },
                                        textTransform: 'none',
                                        fontWeight: '600',
                                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                                        boxShadow: `0 3px 10px ${feature.color}30`,
                                        '&:hover': {
                                          backgroundColor: feature.color,
                                          filter: 'brightness(0.9)',
                                          transform: 'translateY(-1px)',
                                          boxShadow: `0 6px 20px ${feature.color}40`,
                                        },
                                      }}
                                    >
                                      Get a Demo
                                    </Button>

                                    <Button
                                      variant="outlined"
                                      sx={{
                                        borderColor: feature.color,
                                        color: feature.color,
                                        px: { xs: 2.5, md: 3 },
                                        py: { xs: 1, md: 1 },
                                        borderRadius: { xs: '6px', md: '8px' },
                                        textTransform: 'none',
                                        fontWeight: '600',
                                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                                        '&:hover': {
                                          borderColor: feature.color,
                                          backgroundColor: `${feature.color}08`,
                                          transform: 'translateY(-1px)',
                                        },
                                      }}
                                    >
                                      Learn More
                                    </Button>
                                  </Box>
                                </Box>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Box>
                      </Paper>
                    </motion.div>
                  );
                })}
              </Box>


              {/* Right Side - Enhanced Visual */}
              <Box 
                sx={{
                  // border: '2px solid red', 
                  flex: 1, 
                  order: { xs: -1, sm: 2 },
                  position: { xs: 'static', lg: 'sticky' }, 
                  top: 80,
                  mx: 'auto',
                  // mt: { xs: 2, lg: 0 }
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      // border: '2px solid red',
                      minWidth: '300px',
                      height: { xs: '250px', sm: '320px', md: '450px' },
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      borderRadius: { xs: '12px', md: '16px' },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // border: '1px solid #e2e8f0',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Background Pattern */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'radial-gradient(circle at 75% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                      }}
                    />
                    
                    {/* Content */}
                    <Box sx={{ textAlign: 'center', zIndex: 1, p: { xs: 2, md: 3 } }}>
                      <WorkIcon sx={{ 
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, 
                        color: 'rgba(255,255,255,0.9)', 
                        mb: { xs: 1.5, md: 2 } 
                      }} />
                      <Typography
                        variant="h4"
                        sx={{
                          color: 'white',
                          fontWeight: '700',
                          mb: { xs: 1, md: 1.5 },
                          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                          lineHeight: 1.2,
                        }}
                      >
                        Vendor Management
                        <br />
                        Dashboard Preview
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: { xs: '0.85rem', md: '0.95rem' },
                          lineHeight: 1.5,
                          px: { xs: 1, md: 0 }
                        }}
                      >
                        Advanced tools for business
                        <br />
                        growth and efficiency
                      </Typography>
                    </Box>

                    {/* Floating Elements - Hide on mobile for performance */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ position: 'absolute', top: '20%', left: '20%' }}
                      >
                        <Box
                          sx={{
                            width: { sm: 40, md: 50 },
                            height: { sm: 40, md: 50 },
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                          }}
                        />
                      </motion.div>

                      <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ position: 'absolute', bottom: '25%', right: '15%' }}
                      >
                        <Box
                          sx={{
                            width: { sm: 28, md: 35 },
                            height: { sm: 28, md: 35 },
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(10px)',
                          }}
                        />
                      </motion.div>
                    </Box>
                  </Paper>
                </motion.div>
              </Box>
            </Box>
          </Box>
      </motion.div>
    </Container>
  );
};

export default VendorFeaturesSection;