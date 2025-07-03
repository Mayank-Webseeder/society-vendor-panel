import { useState } from 'react';
import { Paper, Typography, Box, IconButton, TextField, Collapse, Button } from '@mui/material';
import { ChevronLeft, Search, Plus, Minus } from 'lucide-react';
import dummyData from '../static/dummyData_FAQ';


const FAQS_PER_LOAD = 5; // Number of FAQs to load initially and per 'Load More' click


const FAQ = () => {

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
        <Paper
            elevation={3}
            sx={{
                backgroundColor: "white",
                boxShadow: 3,
                border: '1px solid #E0E0E0',
                borderRadius: '12px', // Ensure rounded corners are applied
                width: '100%', // Responsive width
                maxWidth: { xs: '100%', sm: '600px', md: '700px' }, // Example max-width for larger screens
                p: { xs: 2, sm: 3 }, // Responsive padding
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 3 }, // Responsive spacing between sections
                //mx: 'auto', // Center the card
                ml: 4,
                mb: 5
              }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
                <IconButton sx={{ mr: 1, p: 0 }}>
                    <ChevronLeft size={20} color="#424242" />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 'semibold', color: '#424242' }}>
                    FAQ
                </Typography>
            </Box>

            {/* Changed color of "Frequently Asked Questions" */}
            <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#4487AE', mb: 1 }}>
                Frequently Asked Questions
            </Typography>

            {/* Search Bar */}
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    // Moved Search icon to the end
                    endAdornment: (
                        <Search size={20} style={{ color: '#757575', marginLeft: '8px' }} />
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        bgcolor: '#ffffff',
                        '& fieldset': { borderColor: '#e0e0e0' },
                    },
                    '& .MuiInputBase-input': {
                        color: '#424242',
                        fontSize: '0.875rem',
                        py: '10px',
                    },
                }}
            />

            {/* FAQ List */}
            <Box sx={{ mt: { xs: 1, sm: 2 } }}>
                {faqsToDisplay.length === 0 && searchTerm !== '' ? (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center', py: 3 }}>
                        No matching FAQs found.
                    </Typography>
                ) : faqsToDisplay.length === 0 && searchTerm === '' ? (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center', py: 3 }}>
                        No FAQs available.
                    </Typography>
                ) : (
                    faqsToDisplay.map((faq) => (
                        <Box key={faq.id} sx={{ mb: 1.5 }}>
                            <Box
                                onClick={() => handleToggleExpand(faq.id)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between', // Keep space-between for icon and text
                                    cursor: 'pointer',
                                    py: 1,
                                    borderBottom: '1px solid #E0E0E0', // Separator line
                                    '&:hover': {
                                        bgcolor: '#f5f5f5', // Light hover background
                                    },
                                }}
                            >
                                {/* Moved IconButton to the front */}
                                <IconButton size="small" sx={{ color: '#757575', mr: 1 }}>
                                    {expandedId === faq.id ? <Minus size={18} /> : <Plus size={18} />}
                                </IconButton>
                                <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#424242', flexGrow: 1 }}>
                                    {faq.question}
                                </Typography>
                            </Box>
                            <Collapse in={expandedId === faq.id} timeout="auto" unmountOnExit>
                                <Box sx={{ p: 2, bgcolor: '#f9f9f9', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {faq.answer}
                                    </Typography>
                                </Box>
                            </Collapse>
                        </Box>
                    ))
                )}
            </Box>

            {/* Load More / View Less Button */}
            {(showLoadMoreButton || showViewLessButton) && (
                <Button
                    variant="outlined"
                    onClick={handleLoadMoreToggle} // Use the new toggle handler
                    sx={{
                        mt: { xs: 1, sm: 2 },
                        py: '8px',
                        borderColor: '#1976D2',
                        color: '#1976D2',
                        fontWeight: 'semibold',
                        borderRadius: '8px',
                        textTransform: 'none',
                        '&:hover': {
                            bgcolor: '#E3F2FD',
                            borderColor: '#1565C0',
                        },
                        width: '120px',
                        alignSelf: 'center',
                    }}
                >
                    {showLoadMoreButton ? 'Load More' : 'View Less'}
                </Button>
            )}
        </Paper>
    );
};


export default FAQ;