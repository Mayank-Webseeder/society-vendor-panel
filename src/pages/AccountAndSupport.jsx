import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { ChevronRight, HelpCircle, BookOpen, FileText, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded support options enriched with icon + gradient tokens
const supportOptions = [
    {
        id: 'help-support',
        title: 'Help & Support',
        description: 'Contact & ticket centre',
        route: 'help-support',
        icon: HelpCircle,
        gradient: 'linear-gradient(135deg,#60a5fa,#2563eb)'
    },
    {
        id: 'faq',
        title: 'FAQ',
        description: 'Common questions answered',
        route: 'faq',
        icon: BookOpen,
        gradient: 'linear-gradient(135deg,#60a5fa,#2563eb)'
    },
    {
        id: 'terms',
        title: 'Terms & Conditions',
        description: 'Usage & service agreement',
        route: 'terms-conditions',
        icon: FileText,
        gradient: 'linear-gradient(135deg,#60a5fa,#2563eb)'
    },
    {
        id: 'privacy',
        title: 'Privacy Policy',
        description: 'Data handling & security',
        route: 'privacy-policy',
        icon: Shield,
        gradient: 'linear-gradient(135deg,#60a5fa,#2563eb)'
    }
    // {
    //     id: 'faq',
    //     title: 'FAQ',
    //     description: 'Common questions answered',
    //     route: 'faq',
    //     icon: BookOpen,
    //     gradient: 'linear-gradient(135deg,#818cf8,#4f46e5)'
    // },
    // {
    //     id: 'terms',
    //     title: 'Terms & Conditions',
    //     description: 'Usage & service agreement',
    //     route: 'terms-conditions',
    //     icon: FileText,
    //     gradient: 'linear-gradient(135deg,#a78bfa,#7c3aed)'
    // },
    // {
    //     id: 'privacy',
    //     title: 'Privacy Policy',
    //     description: 'Data handling & security',
    //     route: 'privacy-policy',
    //     icon: Shield,
    //     gradient: 'linear-gradient(135deg,#c084fc,#9333ea)'
    // }
];

// Animation variants (page + items)
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
};

const AccountAndSupport = () => {
    const navigate = useNavigate();

    const handleClick = (route) => navigate(route);

    return (
        <Box className='relative w-full h-full px-4 sm:px-8 pt-4 sm:pt-6 pb-12'>
            {/* Heading */}
                        <div className="flex flex-col gap-1 mb-8">
                            <h2 style={{ fontFamily: 'Lato' }} className="text-2xl sm:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">Account & Support</h2>
                            <p style={{ fontFamily: 'Lato' }} className="text-xs sm:text-sm text-slate-500">Manage & refine the services you provide</p>
                        </div>
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key="work-details-content"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full overflow-visible"
                            >
                                <Box
                                    className="relative pt-1.5 w-full h-full overflow-x-hidden"
                                    sx={{
                                        // Hide scrollbar for Webkit browsers
                                        '&::-webkit-scrollbar': { display: 'none' },
                                        // Hide scrollbar for Firefox
                                        scrollbarWidth: 'none',
                                        // Hide scrollbar for IE/Edge
                                        msOverflowStyle: 'none',
                                    }}
                                >
                                    

                        {/* Support Option Grid */}
                        <motion.div
                            key="account-support-cards"
                            variants={listVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                <Box
                                component={motion.div}
                                variants={itemVariants}
                                sx={{
                                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fill,minmax(300px,1fr))' },
                    gap: { xs: 2, sm: 3 },
                                    position: 'relative'
                                }}
                            >
                                {supportOptions.map((opt, i) => {
                                    const Icon = opt.icon;
                                    return (
                                        <motion.button
                                            key={opt.id}
                                            type="button"
                                            variants={itemVariants}
                                            onClick={() => handleClick(opt.route)}
                                            whileHover={{ y: -6 }}
                                            whileTap={{ scale: 0.985 }}
                                            style={{
                                                textAlign: 'left',
                                                border: 'none',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                position: 'relative'
                                            }}
                                            className="group"
                                            aria-label={opt.title}
                                        >
                                            <Box sx={{
                                                position: 'relative',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: { xs: 1.2, sm: 1.4 },
                                                height: '100%',
                                                p: { xs: 2, sm: 2.8 },
                                                borderRadius: { xs: '18px', sm: '22px' },
                                                background: 'linear-gradient(140deg,rgba(255,255,255,0.78),rgba(255,255,255,0.65))',
                                                border: '1px solid rgba(148,163,184,0.22)',
                                                boxShadow: '0 4px 10px -3px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
                                                backdropFilter: 'blur(12px)',
                                                WebkitBackdropFilter: 'blur(12px)',
                                                overflow: 'hidden',
                                                transition: 'border-color .4s, box-shadow .45s'
                                            }}>
                                                {/* Soft gradient overlay */}
                                                <Box sx={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: `${opt.gradient}`,
                                                    opacity: { xs: 0.06, sm: 0.08 },
                                                    transition: 'opacity .5s',
                                                    pointerEvents: 'none'
                                                }} className="group-hover:opacity-20" />
                                                {/* Accent bar */}
                                                <Box sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    height: '100%',
                                                    width: { xs: 4, sm: 6 },
                                                    background: opt.gradient,
                                                    opacity: 0.85,
                                                    borderRadius: '0 6px 6px 0'
                                                }} />
                                                {/* Shine */}
                                                <Box sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: { xs: 28, sm: 40 },
                                                    right: 0,
                                                    height: { xs: 56, sm: 80 },
                                                    background: 'linear-gradient(90deg,rgba(255,255,255,0.35),rgba(255,255,255,0))',
                                                    opacity: 0.4,
                                                    mixBlendMode: 'overlay'
                                                }} />
                                                {/* Icon */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <Box sx={{
                                                        position: 'relative',
                                                        width: { xs: 48, sm: 54 },
                                                        height: { xs: 48, sm: 54 },
                                                        borderRadius: { xs: '16px', sm: '18px' },
                                                        background: opt.gradient,
                                                        boxShadow: '0 6px 12px -4px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.10)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: '1px solid rgba(255,255,255,0.55)',
                                                        overflow: 'hidden'
                                                    }}>
                                                        <Icon size={24} color="#ffffff" strokeWidth={2.4} />
                                                        <Box sx={{
                                                            position: 'absolute',
                                                            inset: 0,
                                                            background: 'radial-gradient(circle at 30% 25%,rgba(255,255,255,0.45),rgba(255,255,255,0))'
                                                        }} />
                                                    </Box>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: .5, flex: 1, minWidth: 0 }}>
                                                        <Typography sx={{
                                                            fontSize: { xs: '1rem', sm: '1.1rem' },
                                                            fontWeight: 600,
                                                            letterSpacing: '.2px',
                                                            color: '#0f172a',
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}>
                                                            {opt.title}
                                                        </Typography>
                                                        <Typography sx={{
                                                            fontSize: { xs: '.7rem', sm: '.74rem' },
                                                            fontWeight: 500,
                                                            letterSpacing: '.35px',
                                                            color: 'rgba(15,23,42,.6)',
                                                            textTransform: 'uppercase',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}>
                                                            {opt.description}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                {/* Footer row / arrow */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: .5 }}>
                                                    <Box sx={{ display: 'flex', gap: 1.25 }}>
                                                        <Box sx={{
                                                            px: { xs: 1, sm: 1.15 },
                                                            py: { xs: .4, sm: .45 },
                                                            fontSize: { xs: '.62rem', sm: '.65rem' },
                                                            fontWeight: 600,
                                                            letterSpacing: '.6px',
                                                            color: 'rgba(15,23,42,.65)',
                                                            background: 'linear-gradient(90deg,rgba(255,255,255,0.9),rgba(255,255,255,0.5))',
                                                            border: '1px solid rgba(148,163,184,.35)',
                                                            borderRadius: '999px',
                                                            backdropFilter: 'blur(4px)'
                                                        }}>
                                                            OPEN
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{
                                                        width: { xs: 40, sm: 46 },
                                                        height: { xs: 40, sm: 46 },
                                                        borderRadius: { xs: '14px', sm: '16px' },
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        background: 'linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.55))',
                                                        border: '1px solid rgba(148,163,184,0.35)',
                                                        boxShadow: '0 3px 7px -3px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.08)',
                                                        transition: 'all .4s'
                                                    }} className="group-hover:shadow-xl group-hover:translate-x-0.5">
                                                        <ChevronRight size={22} strokeWidth={3} color="#334155" />
                                                    </Box>
                                                </Box>
                                                {/* Hover ring */}
                                                <Box sx={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    borderRadius: { xs: '18px', sm: '22px' },
                                                    padding: '1px',
                                                    background: 'linear-gradient(140deg,rgba(59,130,246,0.55),rgba(99,102,241,0.4),rgba(59,130,246,0))',
                                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                    WebkitMaskComposite: 'xor',
                                                    maskComposite: 'exclude',
                                                    opacity: 0,
                                                    transition: 'opacity .55s'
                                                }} className="group-hover:opacity-100" />
                                            </Box>
                                        </motion.button>
                                    );
                                })}
                            </Box>
                        </motion.div>
                    </Box>
                </motion.div>
            </AnimatePresence>
        </Box>
    );
};

export default AccountAndSupport;