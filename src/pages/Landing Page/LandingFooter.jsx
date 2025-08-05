import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';


const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'How we work', href: '#' },
  { label: 'Request Demo', href: '#' },
  { label: 'Contact', href: '#' },
];

const resources = [
  { label: 'Blog', href: '#' },
  { label: 'FAQs', href: '#' },
  { label: 'Case Studies', href: '#' },
  { label: 'Help Center', href: '#' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
];

const socialLinks = [
  { icon: LinkedInIcon, color: '#0077b5', hoverColor: '#005582' },
  { icon: FacebookIcon, color: '#1877f2', hoverColor: '#166fe5' },
  { icon: TwitterIcon, color: '#1da1f2', hoverColor: '#0d8bd9' },
  { icon: EmailIcon, color: '#ea4335', hoverColor: '#d23321' },
];


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
        background: 'linear-gradient(90deg, #0f172a 0%, #334155 100%)',
        borderTop: '1px solid #1e293b',
        pt: { xs: 3, md: 5 },
        pb: { xs: 1, md: 3 },
        px: { xs: 0, md: 0 },
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          // className='xs:w-[100%] sm:w-[90%]'
          className='flex flex-col gap-12'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          
        >
          <Grid 
            container 
            spacing={{ xs: 3, md: 10 }} 
            justifyContent='space-between'
            
          >
            {/* VELRA Brand Section - Hidden on mobile */}
            <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div variants={itemVariants} className='max-w-lg'>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '700',
                    color: '#f8fafc',
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                    mb: { xs: 1, md: 2 },
                  }}
                >
                  VELRA
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#cbd5e1',
                    opacity: 0.6,
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
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    mb: { xs: 1, md: 2 },
                  }}
                >
                  Quick Links
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 1.5 } }}>
                  {quickLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      sx={{
                        color: '#cbd5e1',
                        textDecoration: 'none',
                        fontSize: { xs: '0.9rem', md: '0.95rem' },
                        transition: 'color 0.3s ease',
                        py: { xs: 0.25, md: 0 },
                        '&:hover': {
                          color: '#3b82f6',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
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
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    mb: { xs: 1, md: 2 },
                  }}
                >
                  Resources
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 1.5 } }}>
                  {resources.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      sx={{
                        color: '#64748b',
                        textDecoration: 'none',
                        fontSize: { xs: '0.9rem', md: '0.95rem' },
                        transition: 'color 0.3s ease',
                        py: { xs: 0.25, md: 0 },
                        '&:hover': {
                          color: '#3b82f6',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Legal */}
            <Grid item xs={12} sm={6} md={2.25}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '600',
                    color: '#f97316',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    mb: { xs: 1, md: 2 },
                  }}
                >
                  Legal
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 1.5 } }}>
                  {legalLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      sx={{
                        color: '#64748b',
                        textDecoration: 'none',
                        fontSize: { xs: '0.9rem', md: '0.95rem' },
                        transition: 'color 0.3s ease',
                        py: { xs: 0.25, md: 0 },
                        '&:hover': {
                          color: '#3b82f6',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
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
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    mb: { xs: 1, md: 2 },
                  }}
                >
                  Stay Connected
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: 1.5, md: 2 },
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  {socialLinks.map((link, index) => (
                    <IconButton
                      key={index}
                      sx={{
                        backgroundColor: link.color,
                        color: 'white',
                        width: { xs: 36, md: 40 },
                        height: { xs: 36, md: 40 },
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: link.hoverColor,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <link.icon fontSize="small" />
                    </IconButton>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>


          {/* Bottom Copyright Section */}
          <motion.div
            variants={itemVariants}
            style={{
              // mt: '3rem',
              // pt: '2rem',
              my: '10px',
              marginTop: { xs: '2rem', md: '3rem' },
              paddingTop: { xs: '1.5rem', md: '2rem' },
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                // border: '2px solid red',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                mt: '16px',
                gap: { xs: 0.5, sm: 1 },
                textAlign: 'center',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#9ca3af',
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                Made with{' '}
                <FavoriteIcon 
                  sx={{ 
                    color: '#ef4444', 
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }} 
                />{' '}
                by Webseeder Technologies
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#9ca3af',
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
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