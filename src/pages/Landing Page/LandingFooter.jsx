import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';


const LandingFooter = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* VELRA Brand Section */}
            <Grid item xs={12} md={3}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '700',
                    color: '#1e293b',
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                    mb: 3,
                  }}
                >
                  VELRA
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#64748b',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                  }}
                >
                  Driving growth with smart solutions across society management, 
                  vendor coordination, and residential community services.
                </Typography>
              </motion.div>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2.25}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '600',
                    color: '#f97316',
                    fontSize: '1.1rem',
                    mb: 3,
                  }}
                >
                  Quick Links
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Link
                    href="#"
                    sx={{
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#3b82f6',
                      },
                    }}
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#3b82f6',
                      },
                    }}
                  >
                    How we work
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#3b82f6',
                      },
                    }}
                  >
                    Request Demo
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#3b82f6',
                      },
                    }}
                  >
                    Contact
                  </Link>
                </Box>
              </motion.div>
            </Grid>

            {/* Resources */}
            <Grid item xs={12} sm={6} md={2.25}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '600',
                    color: '#f97316',
                    fontSize: '1.1rem',
                    mb: 3,
                  }}
                >
                  Resources
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Link
                    href="#"
                    sx={{
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#3b82f6',
                      },
                    }}
                  >
                    Blog
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#3b82f6',
                      },
                    }}
                  >
                    FAQs
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#3b82f6',
                      },
                    }}
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#3b82f6',
                      },
                    }}
                  >
                    Help Center
                  </Link>
                </Box>
              </motion.div>
            </Grid>

            {/* Stay Connected */}
            <Grid item xs={12} md={4.5}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '600',
                    color: '#f97316',
                    fontSize: '1.1rem',
                    mb: 3,
                  }}
                >
                  Stay Connected
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton
                    sx={{
                      backgroundColor: '#0077b5',
                      color: 'white',
                      width: 40,
                      height: 40,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#005582',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: '#1877f2',
                      color: 'white',
                      width: 40,
                      height: 40,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#166fe5',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: '#1da1f2',
                      color: 'white',
                      width: 40,
                      height: 40,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#0d8bd9',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <TwitterIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: '#ea4335',
                      color: 'white',
                      width: 40,
                      height: 40,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#d23321',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <EmailIcon fontSize="small" />
                  </IconButton>
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          {/* Bottom Copyright Section */}
          <motion.div
            variants={itemVariants}
            style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e2e8f0',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#9ca3af',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                Made with{' '}
                <FavoriteIcon 
                  sx={{ 
                    color: '#ef4444', 
                    fontSize: '1rem' 
                  }} 
                />{' '}
                by Webseeder Technologies
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#9ca3af',
                  fontSize: '0.9rem',
                }}
              >
                © 2025 VELRA. All rights reserved.
              </Typography>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingFooter;
