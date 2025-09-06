import { useState, useRef, useEffect } from "react";
import { Paper, Typography, Checkbox, FormControlLabel, Button, Box, Fade, Zoom } from "@mui/material";
import { Search, ChevronDown, X, Briefcase } from "lucide-react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import dummyOffers from "../../static/dummyData_ServicesOffered";
import { useOnBoarding } from "./OnboardingContext";
import faviconFinal from "/faviconFinal.png";

const Step2_WhatYouOffer = () => {
  const { onboardingData, updateOnboardingData } = useOnBoarding();
  const navigate = useNavigate();

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState(
    onboardingData.whatYouOffer || []
  );
  const [showContent, setShowContent] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setShowContent(true);
  }, []);

  // Sync context when selectedServices changes
  useEffect(() => {
    if (
      Array.isArray(onboardingData.whatYouOffer) &&
      Array.isArray(selectedServices) &&
      onboardingData.whatYouOffer.length === selectedServices.length &&
      onboardingData.whatYouOffer.every((v, i) => v === selectedServices[i])
    ) {
      return;
    }
    updateOnboardingData({ whatYouOffer: selectedServices });
  }, [selectedServices, onboardingData.whatYouOffer, updateOnboardingData]);

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAgreedCheckboxChange = (event) => {
    setAgreedToTerms(event.target.checked);
    updateOnboardingData({
      ...onboardingData,
      agreedTermsAndConditions: event.target.checked,
      agreedPrivacyPolicy: event.target.checked,
    });
  };

  const handleServiceToggle = (serviceValue) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceValue)
        ? prevSelected.filter((val) => val !== serviceValue)
        : [...prevSelected, serviceValue]
    );
  };

  const handleRemoveTag = (serviceValue) => {
    setSelectedServices((prevSelected) =>
      prevSelected.filter((val) => val !== serviceValue)
    );
  };

  const handleContinue = () => {
    navigate("/auth/onboarding/steps/working-days", { replace: true });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "620px",
        maxHeight: "620px",
        display: "flex",
        position: "relative",
        borderRadius: "16px",
        border: "1px solid #d1d5db",
        // border: "2px solid red",
        // backgroundColor: '#ffffff',
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        overflow: "auto",
        // background: "linear-gradient(135deg, rgba(191, 219, 254, 0.9) 0%, rgba(219, 234, 254, 0.95) 25%, rgba(147, 197, 253, 0.85) 50%, rgba(96, 165, 250, 0.8) 75%, rgba(241, 245, 249, 0.9) 90%, rgba(255, 255, 255, 0.95) 100%)",
        backgroundBlendMode: { xs: "normal", sm: "normal" },
        // Subtle overlay patterns matching OnboardingLayout
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "none",
          backgroundSize: "auto",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 1,
        },
        // Hide scrollbar for webkit browsers (Chrome, Safari, Edge)
        "&::-webkit-scrollbar": {
          display: "none",
        },
        // Hide scrollbar for Firefox
        scrollbarWidth: "none",
        // Alternative for older browsers
        msOverflowStyle: "none",
        justifyContent: "center", // Added to center the left column
      }}
    >
        {/* Debugging Purposes */}
        {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        {/* Form Content */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            position: "relative",
            minWidth: 0,
            // border:'4px solid green',
            justifyContent: "center",
            alignItems: "center",
            px: 4,
            py: 4,
            minHeight: "100%",
            height: 'fit-content',
            backgroundColor: "transparent",
            overflowX: "clip",
            flexWrap: "wrap",
            zIndex: 30,
            "@media (min-width:1201px)": {
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
            },
            
          }}
        >
          {/* Enhanced background patterns - Corporate mobile design */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(86, 169, 217, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(86, 169, 217, 0.03) 0%, transparent 50%)
              `,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(86, 169, 217, 0.08) 0%, transparent 70%)",
              transform: "translate(50%, -50%)",
              display: "block",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(86, 169, 217, 0.06) 0%, transparent 70%)",
              transform: "translate(-50%, 50%)",
              display: "block",
              zIndex: 0,
            }}
          />

          <Fade in={showContent} timeout={1000}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                minWidth: 0,
                width: "100%",
                textAlign: "center",
                minHeight: "100%",
                gap: 0,
                paddingRight: "8px",
              }}
              className="w-full h-full rounded-xl z-40 flex flex-col"
            >
              {/* Top Section - Hero */}
              <Box
                sx={{
                  mb: { xs: 3, sm: 4 },
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                }}
              >
                {/* Desktop: Original Hero Design */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {/* Main Title */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "700",
                      background:
                        "linear-gradient(135deg, #1e3a8a 0%, #56A9D9 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: { xs: "2rem", sm: "2.5rem" },
                      fontFamily: "Roboto, sans-serif",
                      letterSpacing: "0.02em",
                      textAlign: "center",
                      mb: 1.5,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-6px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: window.innerWidth < 640 ? "40%": "20%",
                        height: "3px",
                        background: "linear-gradient(90deg, #56A9D9, #1e3a8a)",
                        borderRadius: "1px",
                      },
                    }}
                  >
                    {window.innerWidth < 640 ? "What You Offer" : "Tell Us What You Offer"}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: "rgba(30, 58, 138, 0.7)",
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                      maxWidth: { xs: "200px", sm: "360px"},
                      fontWeight: "400",
                      // border:"2px solid red",
                      textAlign: "center",
                      mb: 2,
                      fontFamily: "Roboto, sans-serif",
                    }}
                  >
                    We'll help connect you with the right societies
                  </Typography>

                  {/* Briefcase Icon */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: { xs: 0, sm: 2 },
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 44, sm: 56 },
                        height: { xs: 44, sm: 56 },
                        borderRadius: "16px",
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(86, 169, 217, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 16px rgba(86, 169, 217, 0.1)",
                      }}
                    >
                      <span className="sm:hidden flex"><Briefcase size={20} color="rgba(86, 169, 217, 0.8)" /></span>
                      <span className="hidden sm:flex"><Briefcase size={24} color="rgba(86, 169, 217, 0.8)" /></span>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Middle Section - Form Content */}
              <div
                className="flex flex-col w-full items-center max-w-lg"
                style={{
                maxWidth: "32rem",
                  flex: 1,
                }}
              >
                {/* Multi-Select Input with Info Icon */}
                <div
                  className="relative w-full mb-6 flex items-center gap-2 sm:gap-3"
                  ref={dropdownRef}
                  style={{
                  marginBottom: "1.5rem",
                  }}
                >
                  <Zoom in={showContent} timeout={800} style={{ flex: 1 }}>
                    <div
                      className="w-full rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg flex items-center justify-between cursor-pointer transition-all duration-300"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(156, 163, 175, 0.2)",
                        // border: "2px solid red",
                        padding: window.innerWidth < 640 ? "12px 12px 12px 44px" : "16px 16px 16px 56px",
                        borderRadius: "12px",
                        fontSize: window.innerWidth < 640 ? "0.9rem" : "1rem",
                        minHeight: window.innerWidth < 640 ? "48px" : "56px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        color: "#374151",
                      }}
                    >
                      <Search
                        size={window.innerWidth < 640 ? 18 : 20}
                        className="absolute pointer-events-none"
                        style={{
                          left: window.innerWidth < 640 ? "12px" : "16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#60a5fa",
                        }}
                      />
                      <span
                        className="font-medium"
                        style={{
                        fontSize: window.innerWidth < 640 ? "0.9rem" : "1rem",
                          marginLeft: window.innerWidth < 640 ? "1.5rem" : "2rem",
                          color: "#374151",
                        }}
                      >
                        {selectedServices.length > 0
                          ? `${selectedServices.length} service${selectedServices.length > 1 ? "s" : ""} selected`
                          : `${window.innerWidth < 640 ? "Select services..." : "Select services you offer..."}`}
                      </span>
                      <ChevronDown
                        size={window.innerWidth < 640 ? 18 : 20}
                        className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                        style={{
                          color: "#3b82f6",
                        }}
                      />
                    </div>
                  </Zoom>

                  {/* Info Icon with Hover Dialog - Hidden on Mobile */}
                  <div className="hidden sm:block">
                    <div
                      className="relative"
                      onMouseEnter={() => setShowInfoDialog(true)}
                      onMouseLeave={() => setShowInfoDialog(false)}
                      onClick={() => setShowInfoDialog(!showInfoDialog)}
                    >
                        <Zoom in={showContent} timeout={1000}>
                          <div
                            className="flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                            style={{
                              width: "40px",
                              height: "40px",
                              background:
                                "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                              boxShadow: "0 2px 8px rgba(59, 130, 246, 0.15)",
                            }}
                          >
                            <IoInformationCircleOutline
                              size={20}
                              className="transition-colors duration-200"
                              style={{
                                color: "#3b82f6",
                              }}
                            />
                          </div>
                        </Zoom>

                        {/* Info Dialog - Desktop Only */}
                        {showInfoDialog && (
                          <Fade in={showInfoDialog} timeout={200}>
                            <div
                              className="absolute bg-white rounded-xl shadow-2xl border border-blue-100 p-4 z-[100]"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)",
                                backdropFilter: "blur(10px)",
                                width: "320px",
                                top: "48px",
                                right: "0",
                                transform: "translateX(50%)",
                              }}
                            >
                              {/* Arrow pointing up */}
                              <div
                                className="absolute w-4 h-4 bg-white border-l border-t border-blue-100 rotate-45 z-[999999]"
                                style={{
                                  background:
                                    "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)",
                                  top: "-8px",
                                  right: "50%",
                                  transform: "translateX(50%) rotate(45deg)",
                                }}
                              />
                              <div className="flex items-start gap-3">
                                <div className="flex-1">
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      fontSize: "1rem",
                                      fontWeight: "600",
                                      color: "#1e3a8a",
                                      mb: 1,
                                      fontFamily: "Roboto, sans-serif",
                                    }}
                                  >
                                    Service Registration Info
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontSize: "0.875rem",
                                      color: "rgba(30, 58, 138, 0.8)",
                                      lineHeight: 1.5,
                                      mb: 2,
                                      fontFamily: "Roboto, sans-serif",
                                    }}
                                  >
                                    A charge of ₹{onboardingData.serviceBasePrice}{" "}
                                    is applicable per service being registered.
                                  </Typography>
                                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontSize: "0.85rem",
                                        color: "#059669",
                                        fontWeight: "600",
                                        lineHeight: 1.4,
                                        fontFamily: "Roboto, sans-serif",
                                      }}
                                    >
                                      💡 Discount: Select at least{" "}
                                      {onboardingData.discountLowerLimit} services
                                      to avail special discounts!
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Fade>
                        )}
                      </div>
                    </div>

                  {/* Services Select Dropdown */}
                  {isDropdownOpen && (
                    <Fade in={isDropdownOpen} timeout={300}>
                      <div
                        className="absolute top-full left-0 w-full bg-white border-2 border-blue-200 rounded-xl shadow-2xl mt-2 py-2 z-10 backdrop-blur-sm"
                        style={{
                          maxHeight: window.innerWidth < 640 ? "240px" : "280px",
                          overflowY: "auto",
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "12px",
                        }}
                      >
                        {dummyOffers.map((offer, index) => (
                          <Zoom
                            in={isDropdownOpen}
                            timeout={300 + index * 50}
                            key={offer.value}
                          >
                            <div
                              className="flex items-center hover:bg-blue-50 cursor-pointer transition-all duration-200 rounded-lg"
                              onClick={() => handleServiceToggle(offer.value)}
                              style={{
                                padding: window.innerWidth < 640 ? "10px 12px" : "12px 16px",
                                margin: window.innerWidth < 640 ? "1px 4px" : "2px 8px",
                                minHeight: window.innerWidth < 640 ? "44px" : "48px",
                              }}
                            >
                              <Checkbox
                                checked={selectedServices.includes(offer.value)}
                                onChange={() =>
                                  handleServiceToggle(offer.value)
                                }
                                size={window.innerWidth < 640 ? "small" : "medium"}
                                sx={{
                                  color: "#56A9D9",
                                  "&.Mui-checked": {
                                    color: "#42A5F5",
                                  },
                                  "&:hover": {
                                    backgroundColor: "rgba(86, 169, 217, 0.1)",
                                  },
                                  "& .MuiSvgIcon-root": {
                                    fontSize: window.innerWidth < 640 ? "1.25rem" : "1.5rem",
                                  },
                                }}
                              />
                              <Typography
                                variant="body1"
                                sx={{
                                  color: "#374151",
                                  ml: window.innerWidth < 640 ? 1 : 1.5,
                                  fontSize: window.innerWidth < 640 ? "0.85rem" : "0.95rem",
                                  fontWeight: 500,
                                }}
                              >
                                {offer.label}
                              </Typography>
                            </div>
                          </Zoom>
                        ))}
                      </div>
                    </Fade>
                  )}
                </div>

                {/* Mobile: Enhanced Service Pricing Info */}
                {false && (
                  <Fade in={showContent} timeout={1000}>
                    <div
                      className="w-[90%] mb-4 p-4 rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.06) 50%, rgba(29, 78, 216, 0.08) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1.5px solid rgba(59, 130, 246, 0.15)",
                        boxShadow:
                          "0 8px 32px rgba(59, 130, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Subtle animated background accent */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-50%",
                          right: "-20%",
                          width: "100px",
                          height: "100px",
                          background:
                            "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
                          borderRadius: "50%",
                          animation: "float 4s ease-in-out infinite",
                          "@keyframes float": {
                            "0%, 100%": { transform: "translateY(0px)" },
                            "50%": { transform: "translateY(-8px)" },
                          },
                        }}
                      />
                      <div className="flex items-center justify-center mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.8) 100%)",
                              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                            }}
                          >
                            <span style={{ fontSize: "1rem" }}>💰</span>
                          </div>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(59, 130, 246, 0.95)",
                              fontSize: "0.9rem",
                              fontWeight: "700",
                              fontFamily: '"Inter", "Roboto", sans-serif',
                              textShadow: "0 1px 2px rgba(0,0,0,0.05)",
                              letterSpacing: "0.01em",
                            }}
                          >
                            ₹{onboardingData.serviceBasePrice} per service
                          </Typography>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.8) 100%)",
                              boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                            }}
                          >
                            <span style={{ fontSize: "0.75rem" }}>💡</span>
                          </div>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(55, 65, 81, 0.8)",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                              textAlign: "center",
                              fontFamily: '"Inter", "Roboto", sans-serif',
                              letterSpacing: "0.005em",
                            }}
                          >
                            Select {onboardingData.discountLowerLimit}+ services
                            for special discounts
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Fade>
                )}

                {/* Selected Services Tags */}
                {selectedServices.length > 0 && (
                  <Fade in={selectedServices.length > 0} timeout={500}>
                    <div
                      className="flex flex-wrap w-full"
                      style={{
                        gap: window.innerWidth < 640 ? "8px" : "12px",
                        justifyContent: "flex-start",
                        marginBottom: "0",
                      }}
                    >
                      {selectedServices.map((serviceValue, index) => {
                        const service = dummyOffers.find(
                          (o) => o.value === serviceValue
                        );
                        return service ? (
                          <Zoom
                            in
                            timeout={400 + index * 100}
                            key={service.value}
                          >
                            <div
                              className="relative flex items-center rounded-full text-white bg-gradient-to-r from-blue-500 to-blue-600 border border-blue-300 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                              style={{
                                padding: window.innerWidth < 640 ? "6px 12px" : "8px 16px",
                                fontSize: window.innerWidth < 640 ? "0.75rem" : "0.875rem",
                                fontWeight: 500,
                              }}
                            >
                              <span
                                style={{
                                  maxWidth: window.innerWidth < 640 ? "120px" : "160px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {service.label}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(service.value)}
                                className="border-none rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-150 focus:outline-none"
                                style={{
                                  marginLeft: window.innerWidth < 640 ? "6px" : "8px",
                                  width: window.innerWidth < 640 ? "16px" : "20px",
                                  height: window.innerWidth < 640 ? "16px" : "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <X size={window.innerWidth < 640 ? 10 : 12} />
                              </button>
                            </div>
                          </Zoom>
                        ) : null;
                      })}
                    </div>
                  </Fade>
                )}
              </div>

              {/* Bottom Section - Button and Terms */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  mt: 4,
                  width: "100%",
                }}
              >
                {/* Continue Button - Mobile optimized */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleContinue}
                    disabled={selectedServices.length === 0 || !agreedToTerms}
                    sx={{
                      py: window.innerWidth < 640 ? 1.5 : 2,
                      px: window.innerWidth < 640 ? 4 : 5,
                      background:
                        selectedServices.length === 0 || !agreedToTerms
                          ? "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)"
                          : "linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)",
                      backdropFilter: "none",
                      border: "none",
                      color:
                        selectedServices.length === 0 || !agreedToTerms
                          ? "#9ca3af"
                          : "white",
                      fontWeight: "600",
                      fontSize: window.innerWidth < 640 ? "1rem" : "1.1rem",
                      borderRadius: "12px",
                      boxShadow:
                        selectedServices.length === 0 || !agreedToTerms
                          ? "none"
                          : "0 6px 20px rgba(86, 169, 217, 0.3)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      textTransform: "none",
                      minWidth: window.innerWidth < 640 ? "160px" : "180px",
                      minHeight: "auto",
                      width: "auto",
                      maxWidth: "none",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        background:
                          selectedServices.length === 0 || !agreedToTerms
                            ? "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)"
                            : "linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)",
                        boxShadow:
                          selectedServices.length === 0 || !agreedToTerms
                            ? "none"
                            : "0 8px 28px rgba(86, 169, 217, 0.4)",
                        transform:
                          selectedServices.length === 0 || !agreedToTerms
                            ? "none"
                            : "translateY(-2px)",
                      },
                      "&:active": {
                        transform:
                          selectedServices.length === 0 || !agreedToTerms
                            ? "none"
                            : "translateY(-1px)",
                      },
                      "&:disabled": {
                        background:
                          "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                        color: "#9ca3af",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.5s",
                      },
                      "&:hover::before": {
                        left:
                          selectedServices.length > 0 && agreedToTerms
                            ? "100%"
                            : "-100%",
                      },
                    }}
                  >
                    Continue
                  </Button>
                </Box>

                {/* Terms & Conditions Checkbox - Enhanced Mobile */}
                <Fade in={showContent} timeout={1200}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreedToTerms}
                        onChange={handleAgreedCheckboxChange}
                        size="medium"
                        sx={{
                          color: "#56A9D9",
                          "&.Mui-checked": {
                            color: "#42A5F5",
                          },
                          "&:hover": {
                            backgroundColor: "rgba(86, 169, 217, 0.1)",
                          },
                          p: window.innerWidth < 640 ? 0.5 : 1,
                          "& .MuiSvgIcon-root": {
                            fontSize: window.innerWidth < 640 ? "1.25rem" : "1.5rem",
                            filter: "none",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(30, 58, 138, 0.7)",
                          fontSize: window.innerWidth < 640 ? "0.8rem" : "0.875rem",
                          lineHeight: 1.5,
                          fontWeight: 500,
                          maxWidth: "500px",
                          textAlign: "center",
                          textShadow: "none",
                        }}
                      >
                        By continuing, you agree to our{" "}Terms & Conditions and{" "}Privacy Policy
                        {/* <span
                          style={{
                            color: "#56A9D9",
                            cursor: "pointer",
                            fontWeight: 600,
                            textDecoration: "underline",
                            textDecorationColor: "rgba(86, 169, 217, 0.5)",
                          }}
                        >
                          Terms & Conditions
                        </span>{" "}
                        and{" "}
                        <span
                          style={{
                            color: "#56A9D9",
                            cursor: "pointer",
                            fontWeight: 600,
                            textDecoration: "underline",
                            textDecorationColor: "rgba(86, 169, 217, 0.5)",
                          }}
                        >
                          Privacy Policy
                        </span> */}
                        .
                      </Typography>
                    }
                    sx={{
                      alignSelf: "center",
                      mx: 0,
                      "& .MuiFormControlLabel-label": {
                        textAlign: "center",
                      },
                    }}
                  />
                </Fade>
              </Box>
            </div>
          </Fade>
        </Box>
      </Paper>
    );
  };

export default Step2_WhatYouOffer;