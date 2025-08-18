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
                                xs: '1fr',
                                sm: '1fr 1fr',
                            },
                            gap: { xs: 2.2, sm: 3.5 },
                            mx: { xs: 0.5, sm: 1 },
                        }}
                    >
                        {supportOptions.map((option, idx) => (
                            <Box
                                key={option.id}
                                onClick={() => handleClick(option.route)}
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    p: { xs: 1.75, sm: 2.5 },
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    background: `linear-gradient(135deg, #ffffff 0%, ${option.bgColor} 95%)`,
                                    border: '1px solid rgba(100,116,139,0.15)',
                                    boxShadow: '0 4px 14px -2px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
                                    backdropFilter: 'blur(4px)',
                                    WebkitBackdropFilter: 'blur(4px)',
                                    transition: 'all 0.35s cubic-bezier(.4,.2,.2,1)',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)',
                                        opacity: 0,
                                        transition: 'opacity .4s'
                                    },
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '5px',
                                        borderRadius: '0 4px 4px 0',
                                        background: `linear-gradient(180deg, ${option.bgColor} 0%, ${option.hoverColor} 100%)`,
                                        boxShadow: '0 0 0 1px rgba(255,255,255,0.4) inset'
                                    },
                                    '&:hover': {
                                        transform: 'translateY(-4px) scale(1.015)',
                                        boxShadow: '0 10px 22px -6px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.08)',
                                        borderColor: 'rgba(59,130,246,0.35)'
                                    },
                                    '&:hover::before': {
                                        opacity: 1
                                    },
                                    '&:active': {
                                        transform: 'translateY(-1px) scale(0.995)'
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, pr: 1, flex: 1, minWidth: 0 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontSize: { xs: '0.95rem', sm: '1.05rem' },
                                            fontWeight: 600,
                                            letterSpacing: '.25px',
                                            color: 'rgba(15,23,42,0.85)',
                                            textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {option.title}
                                    </Typography>
                                    {/* <Box sx={{
                                        height: '3px',
                                        width: { xs: '42%', sm: '38%' },
                                        background: 'linear-gradient(90deg, rgba(59,130,246,0.55), rgba(59,130,246,0))',
                                        borderRadius: '2px'
                                    }} /> */}
                                </Box>
                                <Box sx={{
                                    position: 'relative',
                                    flexShrink: 0,
                                    width: { xs: 40, sm: 46 },
                                    height: { xs: 40, sm: 46 },
                                    borderRadius: '14px',
                                    background: `linear-gradient(145deg, ${option.hoverColor} 0%, ${option.bgColor} 90%)`,
                                    border: '1px solid rgba(255,255,255,0.6)',
                                    boxShadow: '0 4px 10px -3px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all .35s'
                                }}>
                                    <ChevronRight size={22} strokeWidth={3} color="rgba(15,23,42,0.7)" />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </motion.div>
            </Box>
        </AnimatePresence>
    );
};


export default AccountAndSupport;