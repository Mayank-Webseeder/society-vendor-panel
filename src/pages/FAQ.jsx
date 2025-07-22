import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, IconButton, TextField, Collapse, Button } from '@mui/material';
import { ChevronLeft, Search, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dummyData from '../static/dummyData_FAQ';


const FAQS_PER_LOAD = 5; // Number of FAQs to load initially and per 'Load More' click

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};


const FAQ = () => {

    const navigate = useNavigate();

    const [expandedId, setExpandedId] = useState(null); // State to manage which FAQ is expanded
    const [visibleFaqCount, setVisibleFaqCount] = useState(FAQS_PER_LOAD); // State for 'Load More' / 'View Less'
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggleExpand = (id) => {
        setExpandedId(prevId => (prevId === id ? null : id));
    };

    const handleLoadMoreToggle = () => {
        if (visibleFaqCount < filteredFaqs.length) {
            // If not all FAQs are visible, load more
            setVisibleFaqCount(filteredFaqs.length); // Show all remaining FAQs
        } else {
            // If all FAQs are visible, collapse back to initial count
            setVisibleFaqCount(FAQS_PER_LOAD);
            setExpandedId(null); // Collapse any open FAQ when collapsing the list
        }
    };

    const filteredFaqs = dummyData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const faqsToDisplay = filteredFaqs.slice(0, visibleFaqCount);

    const showLoadMoreButton = visibleFaqCount < filteredFaqs.length;
    const showViewLessButton = visibleFaqCount >= filteredFaqs.length && filteredFaqs.length > FAQS_PER_LOAD;

    


    return (
        <AnimatePresence mode='wait'>
            <Box className='p-3 sm:p-8 w-full h-full'>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', pt:{ xs: 1, sm: 0 }, mb: { xs: 3, sm: 4 } }}>
                    <IconButton onClick={() => navigate('/my-profile/account-support')} sx={{ mr: 1, p: 0 }}>
                        <ChevronLeft size={25} strokeWidth={3} color="rgb(0,0,0,0.65)" />
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgb(0,0,0,0.65)', fontSize: { xs: '1.25rem', sm: '1.45rem' } }}>
                        FAQ
                    </Typography>
                </Box>

                <motion.div
                    key="faq-content"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    // className='border-solid'
                    style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <Box sx={{ mx: { xs: 2, sm: 3 } }}>
                        {/* Changed color of "Frequently Asked Questions" */}
                        <Typography variant="body1" sx={{ 
                            fontWeight: 'medium', 
                            color: '#4487AE', 
                            mb: { xs: 2, sm: 3 },
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}>
                            Frequently Asked Questions
                        </Typography>

                        {/* Search Bar */}
                        <TextField
                            variant="outlined"
                            placeholder="Search FAQs...."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <Search size={20} style={{ color: '#757575' }} />
                                ),
                            }}
                            sx={{
                                width: '100%',
                                mb: { xs: 1, sm: 2 },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    bgcolor: '#ffffff',
                                    '& fieldset': { borderColor: '#e0e0e0' },
                                },
                                '& .MuiInputBase-input': {
                                    color: '#424242',
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                    py: { xs: '8px', sm: '10px' },
                                },
                            }}
                        />

                        {/* FAQ List */}
                        <Box sx={{ mt: { xs: 1, sm: 2 }, width: '100%' }}>
                            <AnimatePresence>
                                {faqsToDisplay.length === 0 && searchTerm !== '' ? (
                                    <motion.div
                                        key="no-match"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <Typography variant="body2" color="text.secondary" sx={{ 
                                            fontStyle: 'italic', 
                                            textAlign: 'center', 
                                            py: 3,
                                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                        }}>
                                            No matching FAQs found.
                                        </Typography>
                                    </motion.div>
                                ) : faqsToDisplay.length === 0 && searchTerm === '' ? (
                                    <motion.div
                                        key="no-faq"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <Typography variant="body2" color="text.secondary" sx={{ 
                                            fontStyle: 'italic', 
                                            textAlign: 'center', 
                                            py: 3,
                                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                        }}>
                                            No FAQs available.
                                        </Typography>
                                    </motion.div>
                                ) : (
                                    faqsToDisplay.map((faq) => (
                                        <motion.div
                                            key={faq.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
                                                <Box
                                                    onClick={() => handleToggleExpand(faq.id)}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        cursor: 'pointer',
                                                        py: { xs: 0.75, sm: 1 },
                                                        borderBottom: '1px solid #E0E0E0',
                                                        '&:hover': {
                                                            bgcolor: '#f5f5f5',
                                                        },
                                                    }}
                                                >
                                                    <IconButton size="small" sx={{ color: '#757575', mr: 1 }}>
                                                        {expandedId === faq.id ? <Minus size={16} /> : <Plus size={16} />}
                                                    </IconButton>
                                                    <Typography variant="body1" sx={{ 
                                                        fontWeight: 'medium', 
                                                        color: '#424242', 
                                                        flexGrow: 1,
                                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                                    }}>
                                                        {faq.question}
                                                    </Typography>
                                                </Box>
                                                <Collapse in={expandedId === faq.id} timeout="auto" unmountOnExit>
                                                    <Box sx={{ 
                                                        p: { xs: 1.5, sm: 2 }, 
                                                        bgcolor: '#f9f9f9', 
                                                        borderBottomLeftRadius: '8px', 
                                                        borderBottomRightRadius: '8px' 
                                                    }}>
                                                        <Typography variant="body2" color="text.secondary" sx={{ 
                                                            lineHeight: 1.6,
                                                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                                        }}>
                                                            {faq.answer}
                                                        </Typography>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </Box>

                        {/* Load More / View Less Button */}
                        <Box 
                            sx={{
                                width: 'full',
                                mt: { xs: 4, sm: 6 },
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {(showLoadMoreButton || showViewLessButton) && (
                                <Button
                                    variant="outlined"
                                    onClick={handleLoadMoreToggle}
                                    sx={{
                                        mx: 'auto',
                                        
                                        py: { xs: '6px', sm: '8px' },
                                        borderColor: '#1976D2',
                                        color: '#1976D2',
                                        fontWeight: 'semibold',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        '&:hover': {
                                            bgcolor: '#E3F2FD',
                                            borderColor: '#1565C0',
                                        },
                                        width: { xs: '100px', sm: '120px' },
                                        alignSelf: 'center',
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                    }}
                                >
                                    {showLoadMoreButton ? 'Load More' : 'View Less'}
                                </Button>
                            )}
                        </Box>
                    </Box>
                </motion.div>
            </Box>
        </AnimatePresence>
    );
};


export default FAQ;