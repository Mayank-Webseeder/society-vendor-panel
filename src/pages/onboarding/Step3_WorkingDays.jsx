import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Button, Box, Fade, Zoom } from "@mui/material";
import { CheckCircle, EventAvailable } from "@mui/icons-material";
import onboardingImage from "../../assets/onboardingImage.png";
import { useOnBoarding } from "./OnboardingContext";
import faviconFinal from "/faviconFinal.png";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Step3_WorkingDays = () => {
  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();

  const [selectedDays, setSelectedDays] = useState(
    onboardingData.workingDays || []
  );
  const [error, setError] = useState("");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  useEffect(() => {
    const orderedDays = daysOfWeek.filter((day) => selectedDays.includes(day));
    updateOnboardingData({
      workingDays: orderedDays,
    });
  }, [selectedDays, updateOnboardingData]);

  const handleDayToggle = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleContinue = () => {
    if (selectedDays.length === 0) {
      setError("Please select at least one working day.");
      return;
    }

    setError("");
    navigate("/auth/onboarding/profile-1");
  };

  return (
    <div
      style={{
        position: "relative",
        width: window.innerWidth < 640 ? "100%" : "80%",
        height: window.innerWidth < 640 ? "100%" : "80%",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "100%",
          minHeight: { sm: "620px" },
          display: "flex",
          position: "relative",
          borderRadius: "16px",
          // backgroundColor: '#ffffff',
          border: "none",
          boxShadow: "none",
          overflowY: "auto",
          overflow: "hidden",
          background: {
            xs: "linear-gradient(135deg, #071032 0%, #0b1536 30%, #0b1022 100%)",
            sm: "#ffffff",
          },
          backgroundBlendMode: { xs: "normal", sm: "normal" },
          // Subtle overlay patterns matching OnboardingLayout
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: {
              xs: `
                radial-gradient(circle at 30% 30%, rgba(59,130,246,0.08), transparent 40%),
                radial-gradient(circle at 70% 70%, rgba(139,92,246,0.06), transparent 45%)
              `,
              sm: "none",
            },
            backgroundSize: {
              xs: "400px 400px, 300px 300px, 20px 20px",
              sm: "auto",
            },
            opacity: { xs: 0.7, sm: 0 },
            pointerEvents: "none",
            zIndex: 1,
          },
          // No additional decorative layer for desktop
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "none",
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
          "@media (max-width:639px)": {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // minHeight: '100vh',
          },
          "@media (min-width:640px) and (max-width:1150px)": {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          },
        }}
      >
        {/* Debugging Purposes */}
        {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

        <img
          src={faviconFinal}
          className="flex sm:hidden absolute top-1.5 left-2 z-10 w-12 h-12"
          alt="logo"
        />

        {/* Left Half: Redesigned Content with Pure White Background */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            position: "relative",
            minWidth: 0,
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 3, sm: 4 },
            minHeight: "100%",
            backgroundColor: { xs: "transparent", sm: "#ffffff" },
            overflow: "visible",
            flexWrap: "wrap",
            zIndex: 2,
            "@media (max-width:639px)": {
              width: "100%",
              minHeight: "100vh",
              justifyContent: "center",
              alignItems: "center",
              px: 4,
              py: 4,
              flex: "unset",
              // Mobile white card container with subtle shadow
              "&::before": {
                content: '""',
                position: "absolute",
                top: "8%",
                left: "5%",
                right: "5%",
                bottom: "8%",
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.95) 0%, 
                    rgba(248, 250, 252, 0.98) 50%,
                    rgba(255, 255, 255, 0.95) 100%
                  )
                `,
                backdropFilter: "blur(20px)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                boxShadow: `
                  0 20px 60px rgba(0, 0, 0, 0.4),
                  0 8px 24px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 1),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                zIndex: -1,
              },
            },
            "@media (min-width:640px) and (max-width:1200px)": {
              width: "100%",
              alignItems: "center",
              flex: "unset",
              minWidth: 0,
            },
            "@media (min-width:1201px)": {
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
            },
          }}
        >
          {/* Subtle background patterns */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                window.innerWidth < 640
                  ? `
                radial-gradient(circle at 15% 25%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 85% 75%, rgba(118, 75, 162, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.1) 0%, transparent 30%),
                radial-gradient(circle at 20% 90%, rgba(255, 255, 255, 0.08) 0%, transparent 40%)
              `
                  : `
                radial-gradient(circle at 20% 20%, rgba(86, 169, 217, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(86, 169, 217, 0.03) 0%, transparent 50%)
              `,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Decorative corner accents */}
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
              display: window.innerWidth >= 640 ? "block" : "none",
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
              display: window.innerWidth >= 640 ? "block" : "none",
              zIndex: 0,
            }}
          />

          <Fade in={showContent} timeout={1000}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent:
                  window.innerWidth < 640 ? "flex-start" : "space-between",
                alignItems: "center",
                position: "relative",
                minWidth: 0,
                width: "100%",
                textAlign: "center",
                minHeight: window.innerWidth < 640 ? "auto" : "100%",
                maxHeight:
                  window.innerWidth < 640 ? "calc(80vh - 80px)" : "calc(100vh - 200px)",
                gap: window.innerWidth < 640 ? 3 : 0,
                overflowY: "auto",
                paddingRight: window.innerWidth < 640 ? "8px" : "8px",
                // Custom scrollbar styling
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(59, 130, 246, 0.3) transparent",
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(59, 130, 246, 0.3)",
                  borderRadius: "2px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "rgba(59, 130, 246, 0.5)",
                },
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
                {/* Mobile: Enhanced Corporate Header */}
                <Box
                  sx={{
                    display: { xs: "block", sm: "none" },
                    textAlign: "center",
                    mb: 4,
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "60px",
                      height: "4px",
                      background:
                        "linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.8) 100%)", // changed color
                      borderRadius: "2px",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "800",
                      background:
                        "linear-gradient(135deg, rgba(30, 58, 138, 0.98) 0%, rgba(37, 99, 235, 0.95) 50%, rgba(29, 78, 216, 0.92) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "2.4rem",
                      fontFamily: '"Inter", "Roboto", sans-serif',
                      letterSpacing: "-0.01em",
                      mb: 2,
                      textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-8px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "80px",
                        height: "3px",
                        background:
                          "linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 1) 50%, rgba(29, 78, 216, 0.8) 100%)", // changed color
                        borderRadius: "2px",
                      },
                    }}
                  >
                    Working Days
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(30, 58, 138, 1)", // changed color
                      fontSize: "1.1rem",
                      fontWeight: "500",
                      mb: 3,
                      px: 2,
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      lineHeight: 1.5,
                      fontFamily: '"Inter", "Roboto", sans-serif',
                      maxWidth: "280px",
                      mx: "auto",
                      position: "relative",
                    }}
                  >
                    Select the days you're available to work
                  </Typography>
                  {/* Mobile: Professional Icon */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "16px",
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 16px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <EventAvailable sx={{ color: "rgba(59, 130, 246, 0.8)", fontSize: 24 }} />
                    </Box>
                  </Box>
                </Box>

                {/* Desktop: Original Hero Design */}
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  {/* Main Title */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "700",
                      background:
                        "linear-gradient(135deg, #1e3a8a 0%, #56A9D9 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: { xs: "2rem", sm: "2.5rem", md: "2.8rem" },
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
                        width: "17%",
                        height: "3px",
                        background: "linear-gradient(90deg, #56A9D9, #1e3a8a)",
                        borderRadius: "1px",
                      },
                    }}
                  >
                    Choose Your Days
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: "rgba(30, 58, 138, 0.7)",
                      fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                      fontWeight: "400",
                      textAlign: "center",
                      mb: 2,
                      fontFamily: "Roboto, sans-serif",
                    }}
                  >
                    Select the days you're available to work
                  </Typography>

                  {/* Briefcase Icon */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
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
                      <EventAvailable sx={{ fontSize: 24, color: "rgba(86, 169, 217, 0.8)" }} />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Middle Section - Form Content */}
              <div className="flex flex-col w-full items-center flex-1">
                {/* Working Days Selection - Compact Design */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(auto-fit, minmax(70px, 1fr))",
                      sm: "repeat(4, 1fr)",
                    },
                    gap: { xs: 1.5, sm: 3 },
                    mb: { xs: 4, sm: 5 },
                    maxWidth: "500px",
                    width: { xs: "95%", sm: "100%" },
                  }}
                >
                  {daysOfWeek.map((day, index) => (
                    <Zoom
                      key={day}
                      in={showContent}
                      timeout={600 + index * 100}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleDayToggle(day)}
                        sx={{
                          minWidth: "auto",
                          px: { xs: 1.5, sm: 2.5 },
                          py: { xs: 1.2, sm: 1.5 },
                          borderRadius: "12px",
                          fontSize: { xs: "0.85rem", sm: "0.95rem" },
                          fontWeight: "600",
                          textTransform: "none",
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          transform: "translateY(0)",
                          color: selectedDays.includes(day)
                            ? "white"
                            : "#56A9D9",
                          background: selectedDays.includes(day)
                            ? "linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)"
                            : "linear-gradient(135deg, rgba(86, 169, 217, 0.08) 0%, rgba(66, 165, 245, 0.05) 100%)",
                          border: selectedDays.includes(day)
                            ? "2px solid transparent"
                            : "2px solid rgba(86, 169, 217, 0.2)",
                          boxShadow: selectedDays.includes(day)
                            ? "0 6px 20px rgba(86, 169, 217, 0.3)"
                            : "0 2px 8px rgba(86, 169, 217, 0.1)",
                          "&:hover": {
                            transform: "translateY(-2px) scale(1.03)",
                            boxShadow: selectedDays.includes(day)
                              ? "0 8px 25px rgba(86, 169, 217, 0.4)"
                              : "0 4px 16px rgba(86, 169, 217, 0.2)",
                            background: selectedDays.includes(day)
                              ? "linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)"
                              : "linear-gradient(135deg, rgba(86, 169, 217, 0.15) 0%, rgba(66, 165, 245, 0.1) 100%)",
                          },
                          "&:active": {
                            transform: "translateY(-1px) scale(1.01)",
                          },
                          ...(selectedDays.includes(day) && {
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background:
                                "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                              pointerEvents: "none",
                            },
                          }),
                        }}
                      >
                        {selectedDays.includes(day) && (
                          <CheckCircle
                            sx={{
                              fontSize: "0.9rem",
                              mr: 0.4,
                              animation: "checkPulse 2s ease-in-out infinite",
                              "@keyframes checkPulse": {
                                "0%, 100%": {
                                  opacity: 0.8,
                                  transform: "scale(1)",
                                },
                                "50%": { opacity: 1, transform: "scale(1.1)" },
                              },
                            }}
                          />
                        )}
                        {day}
                      </Button>
                    </Zoom>
                  ))}
                </Box>

                {/* Enhanced Error Message */}
                {error && (
                  <Fade in={!!error}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "12px",
                        background: "rgba(244, 67, 54, 0.08)",
                        border: "1px solid rgba(244, 67, 54, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                        maxWidth: "350px",
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 4,
                          height: 35,
                          borderRadius: "2px",
                          background:
                            "linear-gradient(135deg, #f44336 0%, #ff5252 100%)",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#d32f2f",
                          fontWeight: "500",
                          fontSize: "0.9rem",
                        }}
                      >
                        {error}
                      </Typography>
                    </Box>
                  </Fade>
                )}
              </div>

              {/* Bottom Section - Continue Button */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={handleContinue}
                  sx={{
                    py: 2,
                    px: 5,
                    background:
                      "linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    borderRadius: "12px",
                    boxShadow: "0 6px 20px rgba(86, 169, 217, 0.3)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    textTransform: "none",
                    minWidth: "180px",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)",
                      boxShadow: "0 8px 28px rgba(86, 169, 217, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    "&:active": {
                      transform: "translateY(-1px)",
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
                      left: "100%",
                    },
                  }}
                >
                  Continue
                </Button>
              </Box>
            </div>
          </Fade>
        </Box>


      </Paper>
    </div>
  );
};

export default Step3_WorkingDays;
