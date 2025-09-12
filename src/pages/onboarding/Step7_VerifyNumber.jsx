import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  InputAdornment,
  Alert,
  Fade,
} from "@mui/material";
import { FaPhone } from "react-icons/fa6";
import { useOnBoarding } from "./OnboardingContext";
import { createProfile } from "../../services/api/auth";
import { useUser } from "../../UserContext";
import { useAuth } from "../../AuthContext";

const Step7_VerifyNumber = () => {
  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();
  const { setUser } = useUser();
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState(onboardingData.phone || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handlePhoneChange = (e) => {
    // Allow only numbers and max 10 digits
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhoneNumber(val);
    if (error) setError("");
  };

  const handleVerifyNumber = async () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      // Prepare form data for API call
      const formData = new FormData();
      formData.append("name", onboardingData.name);
      formData.append("businessName", onboardingData.businessName);
      formData.append("address", onboardingData.address);
      formData.append("services", JSON.stringify(onboardingData.whatYouOffer)); // Convert array to JSON string
      formData.append("workingDays",JSON.stringify(onboardingData.workingDays)); // Convert array to JSON string
      formData.append("workingHours", onboardingData.workingHours);
      // formData.append("payScale", onboardingData.payscale);

      // Format location as GeoJSON Point
      if (onboardingData.locationCoordinates) {
        const [lat, lng] = onboardingData.locationCoordinates.split(',').map(coord => parseFloat(coord.trim()));
        const locationGeoJSON = {
          type: "Point",
          coordinates: [lng, lat] // GeoJSON uses [longitude, latitude] order
        };
        formData.append("location", JSON.stringify(locationGeoJSON));
      }

      formData.append("paymentMethods", onboardingData.preferredPaymentMethod);
      // formData.append("lastPayments", onboardingData.lastPayments);
      formData.append("experience", onboardingData.workExperience);
      formData.append("phone", phoneNumber);
      if (onboardingData.idProofFile) {
        formData.append("uniqueName", onboardingData.idProofFile); // Attach file
      }

      // Call createProfile API (API 5)
      const profileData = await createProfile(formData);

      // Update user context
      setUser(profileData);

      // Log in the user
      login(profileData.authToken);

      // // Navigate to the dashboard or next step
      // navigate("/dashboard");

      // Navigate to the payment page
      navigate("/payment");
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
      setError("Failed to complete onboarding. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        border: "1px solid #D1D5DB",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        overflow: "auto",
        // background:
        //   "linear-gradient(135deg, rgba(191, 219, 254, 0.8) 0%, rgba(219, 234, 254, 0.9) 20%, rgba(240, 248, 255, 0.95) 40%, rgba(255, 255, 255, 0.98) 60%, rgba(248, 250, 252, 0.85) 80%, rgba(241, 245, 249, 0.75) 100%)",
        backgroundBlendMode: { xs: "normal", sm: "normal" },
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
        // Hide scrollbar
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        justifyContent: "center",
      }}
    >
      {/* Debugging Purposes */}
      {/* <pre>{JSON.stringify(onboardingData, null, 2)}</pre> */}

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          position: "relative",
          minWidth: 0,
          justifyContent: "center",
          alignItems: "center",
          px: 4,
          py: 4,
          minHeight: "100%",
          backgroundColor: "transparent",
          overflow: "visible",
          flexWrap: "wrap",
          zIndex: 2,
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
            backgroundImage: `
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
              zIndex: 1,
              textAlign: "center",
              minHeight: "100%",
            }}
            className="w-full h-full rounded-xl flex flex-col"
          >
            {/* Top Section - Hero */}
            <Box
              sx={{
                mb: 5,
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
                    fontSize: window.innerWidth < 640 ? "1.9rem" : "2.5rem",
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
                      width: "16%",
                      height: "3px",
                      background: "linear-gradient(90deg, #56A9D9, #1e3a8a)",
                      borderRadius: "1px",
                    },
                  }}
                >
                  {/* Verify Your Number */}
                  {window.innerWidth < 640 ? "Finish Registration" : "Complete Registration"}
                </Typography>

                {/* Subtitle */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(30, 58, 138, 0.7)",
                    fontSize: window.innerWidth < 640 ? "0.8rem" : "1rem",
                    fontWeight: "400",
                    maxWidth: { xs: "200px", sm: "380px"},
                    textAlign: "center",
                    mb: 2,
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  {/* Enter your mobile number to receive a verification code */}
                  Provide your contact details to connect with clients
                </Typography>

                {/* Phone icon */}
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
                      width: window.innerWidth < 640 ? 48 : 56,
                      height: window.innerWidth < 640 ? 48 : 56,
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
                    <FaPhone color="rgba(86, 169, 217, 0.8)" size={window.innerWidth < 640 ? 16 : 18} />
                  </Box>
                </Box>
              </Box>
            </Box>

            <div className="flex flex-col gap-7 items-center">
              {/* Middle Section - Form Content */}
              <div className="flex flex-col w-full items-center max-w-xl flex-1">
                <Box
                  sx={{
                    width: "100%",
                    minWidth: window.innerWidth < 640 ? "280px" : "420px",
                    textAlign: "center",
                    zIndex: 2,
                  }}
                >
                  {/* Phone Number Input */}
                  <Box
                    sx={{
                      mb: 3,
                      // border: '2px solid red',
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      placeholder="Enter your mobile number"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      type="tel"
                      inputProps={{
                        maxLength: 10,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                pr: 1.5,
                                mr: 1,
                                borderRight: "1px solid #e2e8f0",
                              }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  fontSize: "1.25rem",
                                  pb: 0.5,
                                }}
                              >
                                🇮🇳
                              </Box>
                              <Typography
                                variant="body1"
                                sx={{
                                  color: "#475569",
                                  fontWeight: 500,
                                  fontSize: window.innerWidth < 640 ? "0.85rem" : "0.95rem",
                                }}
                              >
                                +91
                              </Typography>
                            </Box>
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: "12px",
                          backgroundColor: "#ffffff",
                          transition: "all 0.2s ease",
                          "& fieldset": {
                            borderColor: "#e2e8f0",
                            borderWidth: "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#56A9D9",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#56A9D9",
                            borderWidth: "2px",
                            boxShadow: "0 0 0 3px rgba(86, 169, 217, 0.1)",
                          },
                          "& .MuiInputBase-input": {
                            color: "#1e293b",
                            fontSize: window.innerWidth < 640 ? "0.9rem" : "1rem",
                            fontWeight: 500,
                            py: window.innerWidth < 640 ? "12px" : "14px",
                            pl: 0,
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "#94a3b8",
                            opacity: 1,
                          },
                        },
                      }}
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Box>

                  {/* Error Message */}
                  {error && (
                    <Alert
                      severity="error"
                      sx={{
                        mb: 3,
                        borderRadius: "12px",
                        backgroundColor: "#fef2f2",
                        border: "1px solid #fecaca",
                        "& .MuiAlert-message": {
                          color: "#dc2626",
                          fontWeight: 500,
                        },
                      }}
                    >
                      {error}
                    </Alert>
                  )}
                </Box>
              </div>

              {/* Bottom Section - Continue Button */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  my: { xs: 6, sm: 5 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleVerifyNumber}
                    disabled={isLoading || phoneNumber.length !== 10}
                    sx={{
                      py: window.innerWidth < 640 ? 1.5 : 2,
                      px: window.innerWidth < 640 ? 4 : 5,
                      background:
                        phoneNumber.length === 10 && !isLoading
                          ? "linear-gradient(135deg, #56A9D9 0%, #42A5F5 100%)"
                          : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                      color:
                        phoneNumber.length === 10 && !isLoading
                          ? "white"
                          : "#9ca3af",
                      fontWeight: "600",
                      fontSize: window.innerWidth < 640 ? "1rem" : "1.1rem",
                      borderRadius: "12px",
                      boxShadow:
                        phoneNumber.length === 10 && !isLoading
                          ? "0 6px 20px rgba(86, 169, 217, 0.3)"
                          : "none",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      textTransform: "none",
                      minWidth: window.innerWidth < 640 ? "240px" : "280px",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        background:
                          phoneNumber.length === 10 && !isLoading
                            ? "linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)"
                            : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                        boxShadow:
                          phoneNumber.length === 10 && !isLoading
                            ? "0 8px 28px rgba(86, 169, 217, 0.4)"
                            : "none",
                        transform:
                          phoneNumber.length === 10 && !isLoading
                            ? "translateY(-2px)"
                            : "none",
                      },
                      "&:active": {
                        transform:
                          phoneNumber.length === 10 && !isLoading
                            ? "translateY(-1px)"
                            : "none",
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
                          phoneNumber.length === 10 && !isLoading
                            ? "100%"
                            : "-100%",
                      },
                    }}
                  >
                    {isLoading ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            border: "2px solid currentColor",
                            borderTop: "2px solid transparent",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            "@keyframes spin": {
                              "0%": { transform: "rotate(0deg)" },
                              "100%": { transform: "rotate(360deg)" },
                            },
                          }}
                        />
                        {/* Verifying... */}
                        "Creating Account..."
                      </Box>
                    ) : (
                      // "Send Verification Code"
                      "Finish Setup"
                    )}
                  </Button>
                </Box>
                {/* Message about redirection */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(30, 58, 138, 0.7)",
                    fontSize: window.innerWidth < 640 ? "0.8rem" : "0.9rem",
                    fontWeight: "400",
                    textAlign: "center",
                    mt: 1,
                    maxWidth: "320px",
                    lineHeight: 1.4,
                  }}
                >
                  Upon successful completion, you will be redirected to the
                  dashboard.
                </Typography>
              </Box>
            </div>
          </div>
        </Fade>
      </Box>
    </Paper>
  );
};

export default Step7_VerifyNumber;
