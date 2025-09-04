import { useState, useRef, useEffect } from "react";
import { Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import groupMenBlueUniforms from "../../assets/groupMenBlueUniforms.png";
import { sendOtp } from "../../services/api/auth";

const RESEND_TIME = 59; // seconds

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIME);
  const [isTiming, setIsTiming] = useState(false);
  const [buttonText, setButtonText] = useState("Send OTP");
  const timerRef = useRef();

  useEffect(() => {
    if (isTiming) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTiming(false);
            setShowResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isTiming]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call API 3 to send OTP
      await sendOtp(email);
      console.log("OTP sent successfully to:", email);

      // Update button text and start timer
      setButtonText("Proceed to Verify");
      setShowResend(true);
      setIsTiming(true);
      setTimer(RESEND_TIME);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    if (isTiming) return; // Disable if timer is running

    try {
      // Call API 3 to resend otp
      await sendOtp(email);
      console.log("OTP resent successfully to:", email);

      // Restart timer without changing button text
      setIsTiming(true);
      setTimer(RESEND_TIME);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };

  const formatTimer = (t) => `0:${t.toString().padStart(2, "0")}`;

  const formPanelVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const imagePanelVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div className="min-h-screen overflow-y-hidden flex flex-col md:flex-row font-inter overflow-hidden relative">
      {/* Background layers: animated gradient, soft color blobs, vignette */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ x: 0 }}
        // animate={useReducedMotion() ? undefined : { x: [0, 30, -30, 0] }}
        // transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1e3a8a 30%, #1e40af 100%)',
          filter: 'saturate(1.05) contrast(1.02)'
        }}
      />

      {/* Soft blue blob (top-left) */}
      <motion.div
        className="absolute -left-20 -top-20 w-80 h-80 rounded-full z-0 pointer-events-none"
        initial={{ x: 0, y: 0, opacity: 0.9 }}
        animate={useReducedMotion() ? undefined : { x: [0, 12, -8, 0], y: [0, -8, 6, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.18), transparent 40%)',
          filter: 'blur(48px)'
        }}
      />

      {/* Soft purple blob (bottom-right) */}
      <motion.div
        className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full z-0 pointer-events-none"
        initial={{ x: 0, y: 0, opacity: 0.85 }}
        animate={useReducedMotion() ? undefined : { x: [0, -10, 14, 0], y: [0, 8, -6, 0] }}
        transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 70% 70%, rgba(139,92,246,0.12), transparent 45%)',
          filter: 'blur(56px)'
        }}
      />

      {/* Ambient halo behind form column */}
      <div
        className="absolute left-[-10%] md:left-[-6%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(59,130,246,0.20), rgba(99,102,241,0.14) 32%, transparent 90%)',
          filter: 'blur(64px)'
        }}
      />

      {/* Subtle vignette to ground the layout */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.32) 100%)'
        }}
      />
      {/* Left: Form Section */}
      <motion.div
        className="relative flex flex-col justify-center items-center p-6 md:px-12 flex-1 md:w-1/2 min-h-screen z-10"
        variants={formPanelVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Professional grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Subtle geometric accent */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full z-0"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
            transform: "skewX(15deg)",
            transformOrigin: "top",
          }}
        ></div>

        {/* Professional corner accents */}
        <div
          className="absolute top-0 right-0 w-48 h-48 z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-72 h-72 z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            transform: "translate(-50%, 50%)",
          }}
        ></div>

        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-16 px-4 text-center z-10">
          <Typography
            variant="h1"
            sx={{
              fontWeight: "700",
              background: "linear-gradient(90deg, #ffffff, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: '2.35rem', sm: '3rem', md: '4rem' },
              fontFamily: "Roboto, sans-serif",
              letterSpacing: "0.05em",
              textAlign: "center",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              position: "relative",
              mb: 2,
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: '56%',
                height: "2px",
                background: "linear-gradient(90deg, #60a5fa, #ffffff)",
                borderRadius: "1px",
              },
            }}
          >
            My Society Needs
          </Typography>

          <motion.p
            className="text-base text-center text-white/60 mt-2"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ fontFamily: "Roboto" }}
          >
            Your gateway to professional opportunities.
          </motion.p>
        </div>

        {/* Form */}
        <div className="w-full max-w-md px-4 z-10">
          <div className="rounded-2xl bg-black/10 backdrop-blur-md border-solid border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.25)] p-5 sm:p-6">
            <motion.h2
              className="text-xl font-semibold text-white/90 text-left mb-6"
              style={{ fontFamily: "Lato" }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Reset Password
            </motion.h2>

            <form
              onSubmit={
                buttonText === "Send OTP"
                  ? handleFormSubmit
                  : () =>
                      navigate("/auth/forgot-password/verify-otp", {
                        state: { email },
                      })
              }
              className="space-y-6"
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-2.5 border-solid border border-white/20 rounded-lg placeholder-gray-300/80
                             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                             bg-white/90 text-gray-800 backdrop-blur transition-all duration-200 text-base
                             ${isTiming ? 'opacity-70 cursor-not-allowed' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isTiming}
                />
              </motion.div>

              <motion.p
                className="text-left font-medium text-sm text-white/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Enter your registered email address. We'll send you a One-Time
                Password (OTP) to reset your password.
              </motion.p>

              {showResend && (
                <motion.div
                  className="flex items-center justify-between mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <span className="text-sm font-medium text-white/70">
                    Didn't receive the email? Click{" "}
                    <span
                      onClick={handleResend}
                      className={`underline ${
                        isTiming
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-blue-400 hover:text-blue-500 cursor-pointer"
                      }`}
                    >
                      Resend
                    </span>
                  </span>
                  <span className="text-sm text-white font-semibold min-w-[40px] text-right">
                    {isTiming ? formatTimer(timer) : "0:00"}
                  </span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                className={`w-full border-none py-3 px-6 rounded-lg font-semibold transition-all duration-200 text-base
                           ${
                             email.trim() === ""
                               ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                               : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                           }
                           shadow-md`}
                disabled={email.trim() === ""}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {buttonText}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Right: Image Section */}
      <motion.div
        className="relative hidden md:flex flex-1 md:w-1/2 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${groupMenBlueUniforms})` }}
        variants={imagePanelVariants}
        initial="hidden"
        animate="visible"
      >
  {/* Dark overlay with subtle gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/80 via-[#0b1120]/40 to-transparent"></div>

        {/* Tagline */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
        >
          <p className="font-semibold text-5xl text-white text-center leading-tight drop-shadow-lg">
            You bring the expertise.
            <br /> We bring the exposure.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
