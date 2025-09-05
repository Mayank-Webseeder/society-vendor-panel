import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  Fade,
  Grow,
  Zoom,
} from "@mui/material";
import { MapPin, Building, Landmark, CheckCircle } from "lucide-react";
import indianStates from "../../static/dummyData_IndianStates";
import { useOnBoarding } from "./OnboardingContext";
import faviconFinal from "/faviconFinal.png";

const Step5_Profile2 = () => {
  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnBoarding();

  // Initialize state from context
  const [buildingFlatShopNo, setBuildingFlatShopNo] = useState(
    onboardingData.building || ""
  );
  const [localityTown, setLocalityTown] = useState(
    onboardingData.locality || ""
  );
  const [landmark, setLandmark] = useState(onboardingData.landmark || "");
  const [state, setState] = useState(onboardingData.state || "");
  const [city, setCity] = useState(onboardingData.city || "");
  const [pincode, setPincode] = useState(onboardingData.pincode || "");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    setShowContent(true);
  }, []);

  // Sync local state to context on change
  useEffect(() => {
    updateOnboardingData({
      building: buildingFlatShopNo,
      locality: localityTown,
      landmark,
      state,
      city,
      pincode,
    });
  }, [
    buildingFlatShopNo,
    localityTown,
    landmark,
    state,
    city,
    pincode,
    updateOnboardingData,
  ]);

  const handleContinue = () => {
    if (
      !buildingFlatShopNo.trim() ||
      !localityTown.trim() ||
      !landmark.trim() ||
      !state ||
      !city.trim() ||
      pincode.length !== 6
    ) {
      setError("All fields are required and pincode must be 6 digits.");
      return;
    }
    setError("");
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/auth/onboarding/steps/location");
    }, 800);
  };

  const isFieldComplete = (value) => {
    return (
      value && (typeof value === "string" ? value.trim().length > 0 : true)
    );
  };

  // getFieldIcon to include icons
  const getFieldIcon = (fieldName) => {
    switch (fieldName) {
      case "building":
        return <Building size={20} />;
      case "locality":
        return <MapPin size={20} />;
      case "landmark":
        return <Landmark size={20} />;
      case "state":
        return <MapPin size={20} />;
      case "city":
        return <MapPin size={20} />;
      case "pincode":
        return <MapPin size={20} />;
      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: { sm: "620px" },
        maxHeight: { sm: "620px" },
        display: "flex",
        position: "relative",
        borderRadius: "16px",
        border: "1px solid #D1D5DB",
        // backgroundColor: '#ffffff',
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        overflow: "auto",
        background:
          "linear-gradient(135deg, rgba(191, 219, 254, 0.8) 0%, rgba(219, 234, 254, 0.9) 20%, rgba(240, 248, 255, 0.95) 40%, rgba(255, 255, 255, 0.98) 60%, rgba(248, 250, 252, 0.85) 80%, rgba(241, 245, 249, 0.75) 100%)",
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
        justifyContent: "center", // Added to center the left column
      }}
    >
      {/* Debugging Purposes */}
      {/* <pre className='pt-56'>{JSON.stringify(onboardingData, null, 2)}</pre> */}

      {/* Main Content Container */}
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
              overflow: "visible",
            }}
            className="w-full h-full rounded-xl flex flex-col"
          >
            {/* Top Section - Hero */}
            <Box
              sx={{
                mb: { xs: 3, sm: 2 },
                position: "relative",
                zIndex: 1,
                width: "100%",
              }}
            >
              {/* Desktop: Original Hero Design (unchanged) */}
              <Box>
                {/* Main Title */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "700",
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #56A9D9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "2.5rem",
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
                      width: "20%",
                      height: "3px",
                      background: "linear-gradient(90deg, #56A9D9, #1e3a8a)",
                      borderRadius: "1px",
                    },
                  }}
                >
                  Your Address Details
                </Typography>

                {/* Subtitle */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(30, 58, 138, 0.7)",
                    fontSize: "1rem",
                    fontWeight: "400",
                    textAlign: "center",
                    mb: 3,
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  Tell us where you're located to serve you better
                </Typography>
              </Box>
            </Box>

            {/* Middle Section - Form Content */}
            <div className="flex flex-col w-full items-center flex-1 max-w-5xl">
              {/* Grid Layout for Form Fields */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  columnGap: "5rem",
                  rowGap: "1.9rem",
                  marginBottom: "2rem",
                  width: "100%",
                }}
              >
                {/* Row 1: Building/Flat  &  Landmark */}
                <Grow in={true} timeout={600}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(0, 0, 0, 0.8)",
                        mb: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {getFieldIcon("building")}
                      Building/Flat/Shop No.
                      {isFieldComplete(buildingFlatShopNo) && (
                        <CheckCircle size={16} style={{ color: "#10B981" }} />
                      )}
                    </Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Enter Building/Flat/Shop No."
                      value={buildingFlatShopNo}
                      onChange={(e) => setBuildingFlatShopNo(e.target.value)}
                      onFocus={() => setFocusedField("building")}
                      onBlur={() => setFocusedField("")}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor:
                            focusedField === "building" ? "#f0f9ff" : "#ffffff",
                          transition: "all 0.3s ease",
                          boxShadow: "none",
                          "& fieldset": {
                            borderColor:
                              focusedField === "building"
                                ? "#56A9D9"
                                : "#e2e8f0",
                            borderWidth:
                              focusedField === "building" ? "2px" : "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#56A9D9",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#56A9D9",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#0f172a",
                          fontSize: "1rem",
                          py: "14px",
                          px: "16px",
                          fontWeight: 500,
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "#94a3b8",
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>
                </Grow>
                <Grow in={true} timeout={800}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(0, 0, 0, 0.8)",
                        mb: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {getFieldIcon("landmark")}
                      Landmark
                      {isFieldComplete(landmark) && (
                        <CheckCircle size={16} style={{ color: "#10B981" }} />
                      )}
                    </Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Enter a Landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      onFocus={() => setFocusedField("landmark")}
                      onBlur={() => setFocusedField("")}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor:
                            focusedField === "landmark" ? "#f0f9ff" : "#ffffff",
                          transition: "all 0.3s ease",
                          boxShadow: "none",
                          "& fieldset": {
                            borderColor:
                              focusedField === "landmark"
                                ? "#56A9D9"
                                : "#e2e8f0",
                            borderWidth:
                              focusedField === "landmark" ? "2px" : "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#56A9D9",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#56A9D9",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#0f172a",
                          fontSize: "1rem",
                          py: "14px",
                          px: "16px",
                          fontWeight: 500,
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "#94a3b8",
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>
                </Grow>

                {/* Row 2: Locality/Town  &  City */}
                <Grow in={true} timeout={700}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(0, 0, 0, 0.8)",
                        mb: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {getFieldIcon("locality")}
                      Locality/Town
                      {isFieldComplete(localityTown) && (
                        <CheckCircle size={16} style={{ color: "#10B981" }} />
                      )}
                    </Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Enter Locality/Town"
                      value={localityTown}
                      onChange={(e) => setLocalityTown(e.target.value)}
                      onFocus={() => setFocusedField("locality")}
                      onBlur={() => setFocusedField("")}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor:
                            focusedField === "locality" ? "#f0f9ff" : "#ffffff",
                          transition: "all 0.3s ease",
                          boxShadow: "none",
                          "& fieldset": {
                            borderColor:
                              focusedField === "locality"
                                ? "#56A9D9"
                                : "#e2e8f0",
                            borderWidth:
                              focusedField === "locality" ? "2px" : "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#56A9D9",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#56A9D9",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#0f172a",
                          fontSize: "1rem",
                          py: "14px",
                          px: "16px",
                          fontWeight: 500,
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "#94a3b8",
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>
                </Grow>
                <Grow in={true} timeout={1000}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(0, 0, 0, 0.8)",
                        mb: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {getFieldIcon("city")}
                      City
                      {isFieldComplete(city) && (
                        <CheckCircle size={16} style={{ color: "#10B981" }} />
                      )}
                    </Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Enter City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onFocus={() => setFocusedField("city")}
                      onBlur={() => setFocusedField("")}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor:
                            focusedField === "city" ? "#f0f9ff" : "#ffffff",
                          transition: "all 0.3s ease",
                          boxShadow: "none",
                          "& fieldset": {
                            borderColor:
                              focusedField === "city" ? "#56A9D9" : "#e2e8f0",
                            borderWidth:
                              focusedField === "city" ? "2px" : "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#56A9D9",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#56A9D9",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#0f172a",
                          fontSize: "1rem",
                          py: "14px",
                          px: "16px",
                          fontWeight: 500,
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "#94a3b8",
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>
                </Grow>

                {/* Row 3: State  &  Pincode */}
                <Grow in={true} timeout={900}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(0, 0, 0, 0.8)",
                        mb: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {getFieldIcon("state")}
                      State
                      {isFieldComplete(state) && (
                        <CheckCircle size={16} style={{ color: "#10B981" }} />
                      )}
                    </Typography>
                    <FormControl fullWidth variant="outlined" required>
                      <Select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        onFocus={() => setFocusedField("state")}
                        onBlur={() => setFocusedField("")}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: 250,
                            },
                          },
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                        }}
                        sx={{
                          borderRadius: "12px",
                          backgroundColor:
                            focusedField === "state" ? "#f0f9ff" : "#ffffff",
                          transition: "all 0.3s ease",
                          boxShadow: "none",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor:
                              focusedField === "state" ? "#56A9D9" : "#e2e8f0",
                            borderWidth:
                              focusedField === "state" ? "2px" : "1px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#56A9D9",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#56A9D9",
                            borderWidth: "2px",
                          },
                          "& .MuiSelect-select": {
                            color: state === "" ? "#64748b" : "#0f172a",
                            fontSize: "1rem",
                            py: "14px",
                            px: "16px",
                            fontWeight: 500,
                          },
                        }}
                      >
                        <MenuItem value="" disabled sx={{ color: "#94A3B8" }}>
                          Select State
                        </MenuItem>
                        {indianStates.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grow>
                <Grow in={true} timeout={1100}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(0, 0, 0, 0.8)",
                        mb: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {getFieldIcon("pincode")}
                      Pincode
                      {pincode.length === 6 && (
                        <CheckCircle size={16} style={{ color: "#10B981" }} />
                      )}
                    </Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Enter Pincode"
                      value={pincode}
                      onChange={(e) => {
                        // Only allow numbers and max 6 digits
                        const val = e.target.value
                          .replace(/[^0-9]/g, "")
                          .slice(0, 6);
                        setPincode(val);
                      }}
                      onFocus={() => setFocusedField("pincode")}
                      onBlur={() => setFocusedField("")}
                      inputProps={{
                        maxLength: 6,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor:
                            focusedField === "pincode" ? "#f0f9ff" : "#ffffff",
                          transition: "all 0.3s ease",
                          boxShadow: "none",
                          "& fieldset": {
                            borderColor:
                              focusedField === "pincode"
                                ? "#56A9D9"
                                : "#e2e8f0",
                            borderWidth:
                              focusedField === "pincode" ? "2px" : "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#56A9D9",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#56A9D9",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#0f172a",
                          fontSize: "1rem",
                          py: "14px",
                          px: "16px",
                          fontWeight: 500,
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "#94a3b8",
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>
                </Grow>
              </Box>
            </div>

            {/* Bottom Section - Error, Success and Continue Button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                mt: 4,
              }}
            >
              {/* Error Message */}
              {error && (
                <Fade in={!!error} timeout={500}>
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
                      maxWidth: "400px",
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

              {/* Success Message */}
              {showSuccess && (
                <Fade in={showSuccess} timeout={500}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      background: "rgba(16, 185, 129, 0.08)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  >
                    <CheckCircle size={20} style={{ color: "#10B981" }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#10B981",
                        fontWeight: "500",
                        fontSize: "0.9rem",
                      }}
                    >
                      Address saved! Redirecting...
                    </Typography>
                  </Box>
                </Fade>
              )}

              {/* Continue Button */}
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
            </Box>
          </div>
        </Fade>
      </Box>
    </Paper>
  );
};

export default Step5_Profile2;