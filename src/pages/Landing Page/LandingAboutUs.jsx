import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';


const LandingAboutUs = () => {

  return (
    <Box
      sx={{
        // border: '2px solid green',
        py: { xs: 6, md: 10 },
        backgroundColor: 'white',
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          className='flex justify-center'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: '90%'},
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 4, md: 6 },
              // border: '2px solid pink'
            }}
          >
            {/* Left Side - Content */}
            <Box sx={{ flex: 2, pr: { md: 4 } }}>
                {/* Title with underline */}
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: '700',
                      color: '#1e293b',
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      lineHeight: 1.2,
                      mb: 2,
                    }}
                  >
                    About Us
                  </Typography>
                  <Box
                    sx={{
                      width: '80px',
                      height: '4px',
                      backgroundColor: '#f97316',
                      borderRadius: '2px',
                    }}
                  />
                </Box>

                {/* Description Content */}
                <Typography
                  variant="body1"
                  sx={{
                    color: '#64748b',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.7,
                    mb: 4,
                  }}
                >
                  At VELRA, we specialize in delivering seamless Society and Vendor Management 
                  (Maintenance, Services, Operations, and Administration) solutions tailored to the 
                  unique needs of residential societies and service providers. With services that 
                  span across facility management, vendor coordination, and resident services, we 
                  ensure every interaction is as efficient as it is reliable.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#64748b',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.7,
                  }}
                >
                  Our commitment goes beyond technology. At VELRA, we 
                  strive to create management experiences that leave a lasting 
                  impression. Whether it's residential society management, vendor 
                  coordination, or a comprehensive service marketplace, we focus on 
                  fostering meaningful connections and delivering exceptional 
                  service. Every solution we design is guided by a passion for 
                  excellence, trust, and a deep understanding of what makes 
                  community living truly rewarding.
                </Typography>
            </Box>


            {/* Right Side - Images */}
            <Box sx={{ flex: 1}}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{ position: 'relative' }}>
                  {/* Top Large Image */}
                  <Box
                    sx={{
                      mb: 2,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      height: { xs: '200px', md: '240px' },
                      backgroundColor: '#e2e8f0',
                      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        textAlign: 'center',
                      }}
                    >
                      Society Management Dashboard
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    {/* Bottom Left Image */}
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          borderRadius: '16px',
                          overflow: 'hidden',
                          height: { xs: '160px', md: '180px' },
                          backgroundColor: '#f1f5f9',
                          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            fontWeight: '600',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            textAlign: 'center',
                          }}
                        >
                          Service Providers
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Bottom Right - Stats */}
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          borderRadius: '16px',
                          overflow: 'hidden',
                          height: { xs: '160px', md: '180px' },
                          backgroundColor: '#f8fafc',
                          border: '2px solid #e2e8f0',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 3,
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight: '800',
                            color: '#1e293b',
                            fontSize: { xs: '2.5rem', md: '3rem' },
                            lineHeight: 1,
                            mb: 1,
                          }}
                        >
                          100+
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: '600',
                            color: '#64748b',
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            textAlign: 'center',
                            lineHeight: 1.2,
                          }}
                        >
                          Societies Served
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingAboutUs;
