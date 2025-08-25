import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  IconButton,
  TextField,
  Collapse,
  Button,
} from "@mui/material";
import { ChevronLeft, Search, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dummyData from "../static/dummyData_SupportFAQ";

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
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const handleKeyToggle = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleExpand(id);
    }
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

  const filteredFaqs = dummyData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const faqsToDisplay = filteredFaqs.slice(0, visibleFaqCount);

  const showLoadMoreButton = visibleFaqCount < filteredFaqs.length;
  const showViewLessButton =
    visibleFaqCount >= filteredFaqs.length &&
    filteredFaqs.length > FAQS_PER_LOAD;

  return (
    <AnimatePresence mode="wait">
      <Box className="p-3 sm:p-8 w-full h-full">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pt: { xs: 1, sm: 0 },
            mb: { xs: 3, sm: 4 },
          }}
        >
          <IconButton
            onClick={() => navigate("/my-profile/account-support")}
            sx={{
              mr: 1,
              p: 0,
              color: "#334155",
              transition: "color .2s ease",
              "&:hover": { color: "#1D4ED8", backgroundColor: "transparent" },
            }}
          >
            <ChevronLeft size={25} strokeWidth={3} />
          </IconButton>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.2,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                lineHeight: 1.2,
                color: "#334155",
              }}
            >
              FAQ
            </Typography>
          </Box>
        </Box>

        <motion.div
          key="faq-content"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          // className='border-solid'
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ mx: { xs: 2, sm: 3 } }}>
            {/* Changed color of "Frequently Asked Questions" */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "#0ea5e9",
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Frequently Asked Questions
            </Typography>

            {/* Search Bar */}
            <TextField
              variant="outlined"
              placeholder="Search FAQs...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: <Search size={20} style={{ color: "#757575" }} />,
              }}
              sx={{
                width: "100%",
                mb: { xs: 1, sm: 2 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  bgcolor: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(6px)",
                  "& fieldset": {
                    borderColor: "rgba(148,163,184,0.35)",
                    borderStyle: "solid",
                  },
                  "&:hover fieldset": { borderColor: "rgba(148,163,184,0.55)" },
                  "&.Mui-focused fieldset": { borderColor: "#60A5FA" },
                },
                "& .MuiInputBase-input": {
                  color: "#1f2937",
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  py: { xs: "8px", sm: "10px" },
                },
              }}
            />

            {/* FAQ List */}
            <Box sx={{ mt: { xs: 1, sm: 2 }, width: "100%" }}>
              <AnimatePresence>
                {faqsToDisplay.length === 0 && searchTerm !== "" ? (
                  <motion.div
                    key="no-match"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontStyle: "italic",
                        textAlign: "center",
                        py: 3,
                        fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      }}
                    >
                      No matching FAQs found.
                    </Typography>
                  </motion.div>
                ) : faqsToDisplay.length === 0 && searchTerm === "" ? (
                  <motion.div
                    key="no-faq"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontStyle: "italic",
                        textAlign: "center",
                        py: 3,
                        fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      }}
                    >
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
                      <Box sx={{ mb: { xs: 1.25, sm: 1.5 } }}>
                        <Box
                          sx={{
                            border: "1px solid rgba(148,163,184,0.35)",
                            borderStyle: "solid",
                            borderRadius: "12px",
                            bgcolor: "rgba(255,255,255,0.65)",
                            backdropFilter: "blur(8px)",
                            boxShadow: "0 10px 30px rgba(2, 8, 23, 0.06)",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            onClick={() => handleToggleExpand(faq.id)}
                            onKeyDown={(e) => handleKeyToggle(e, faq.id)}
                            role="button"
                            tabIndex={0}
                            aria-expanded={expandedId === faq.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: "pointer",
                              px: { xs: 1.25, sm: 1.5 },
                              py: { xs: 1, sm: 1.25 },
                              transition: "background-color .2s ease",
                              "&:hover": { bgcolor: "rgba(99,102,241,0.06)" },
                            }}
                          >
                            <IconButton
                              size="small"
                              sx={{
                                color:
                                  expandedId === faq.id ? "#2563EB" : "#64748B",
                                mr: 1,
                                transition: "color .2s ease",
                                "&:hover": { color: "#1D4ED8" },
                              }}
                            >
                              {expandedId === faq.id ? (
                                <Minus size={16} />
                              ) : (
                                <Plus size={16} />
                              )}
                            </IconButton>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 600,
                                color: "#334155",
                                flexGrow: 1,
                                fontSize: { xs: "0.9rem", sm: "1rem" },
                              }}
                            >
                              {faq.question}
                            </Typography>
                          </Box>
                          <Collapse
                            in={expandedId === faq.id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box
                              sx={{
                                p: { xs: 1.5, sm: 2 },
                                bgcolor: "rgba(248,250,252,0.7)",
                                borderTop: "1px solid rgba(148,163,184,0.25)",
                                // borderStyle: 'solid'
                              }}
                            >
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  lineHeight: 1.65,
                                  color: "#475569",
                                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                                }}
                              >
                                {faq.answer}
                              </Typography>
                            </Box>
                          </Collapse>
                        </Box>
                      </Box>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </Box>

            {/* Load More / View Less Button */}
            <Box
              sx={{
                width: "full",
                mt: { xs: 4, sm: 6 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {(showLoadMoreButton || showViewLessButton) && (
                <Button
                  variant="outlined"
                  onClick={handleLoadMoreToggle}
                  sx={{
                    mx: "auto",

                    py: { xs: "6px", sm: "8px" },
                    borderColor: "#1976D2",
                    color: "#1976D2",
                    fontWeight: "semibold",
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#E3F2FD",
                      borderColor: "#1565C0",
                    },
                    width: { xs: "100px", sm: "120px" },
                    alignSelf: "center",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  {showLoadMoreButton ? "Load More" : "View Less"}
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
