import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const supportOptions = [
  {
    id: 'help-support',
    title: 'Help and Support',
    bgColor: '#B5E3FD',
    hoverColor: '#CFE2F3',
    route: 'help-support'
  },
  {
    id: 'faq',
    title: 'FAQ',
    bgColor: '#B5CBFD',
    hoverColor: '#CFE2F3',
    route: 'faq'
  },
  {
    id: 'terms',
    title: 'Terms and Conditions',
    bgColor: '#BAB5FD',
    hoverColor: '#E0D8F1',
    route: 'terms-conditions'
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    bgColor: '#D4B5FD',
    hoverColor: '#E0D8F1',
    route: 'privacy-policy'
  }
];

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};


const AccountAndSupport = () => {

    const navigate = useNavigate();

    const handleClick = (route) => {
        navigate(route);
    }



    return (
        <AnimatePresence mode='wait'>
            <Box className='p-5 sm:p-8 w-full h-full'>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid #E0E0E0',
                    pb: { xs: 0.75, sm: 2 },
                    mb: { xs: 3.5, sm: 5 }
                }}>
                    <Typography 
                        variant="h2" 
                            sx={{ 
                                fontSize: { xs: '1.55rem', sm: '2rem' },
                                fontWeight: 'semibold', 
                                color: '#4A5568',
                                lineHeight: { xs: 1.25, sm: 1.3 }
                            }}
                    >
                        Account & Support
                        
                        {/* <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                            Account & Support
                        </Box> */}
                    </Typography>
                </Box>

                {/* Grid of Support Options */}
                <motion.div
                    key="account-support-content"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr', // Single column on extra small screens
                                sm: '1fr 1fr', // Two columns on small and up
                            },
                            gap: { xs: 2, sm: 3.5 }, // Reduced gap between grid items
                            mx: { xs: 1, sm: 1 }, // Responsive margins
                        }}
                    >
                        {supportOptions.map((option) => (
                            <Box
                                key={option.id}
                                onClick={() => handleClick(option.route)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: { xs: 2, sm: 2.5 },
                                    bgcolor: option.bgColor,
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    border: '2px solid white',
                                    boxShadow: '0px 2px 8px rgba(0,0,0,0.10)',
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': {
                                        bgcolor: option.hoverColor,
                                    },
                                }}
                            >
                                <Typography variant="body1" sx={{ 
                                    fontSize: { xs: '1rem', sm: '1.125rem' }, 
                                    fontWeight: '800', 
                                    color: 'rgb(0,0,0,0.59)' 
                                }}>
                                    {option.title}
                                </Typography>
                                <ChevronRight size={26} strokeWidth={3} color="rgb(0,0,0,0.59)" />
                            </Box>
                        ))}
                    </Box>
                </motion.div>
            </Box>
        </AnimatePresence>
    );
};


export default AccountAndSupport;