import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpiModal from "../../components/modals/payment/UpiModal";
import UpiConfirmModal from "../../components/modals/payment/UpiConfirmModal";
import UpiSuccessModal from "../../components/modals/payment/UpiSuccessModal";
import SubscriptionBenefits from "./SubscriptionBenefits";
import PaymentMethod from "./PaymentMethod";
import { CircularProgress } from "@mui/material";

const Payment = () => {
  const [modalStep, setModalStep] = useState(null); // null | 'upi' | 'confirm' | 'success'
  const [loading, setLoading] = useState(false); // <-- Spinner state
  const navigate = useNavigate();

  // Handler for close button
  const handleClose = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{
        background:
          "linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 30%, #94a3b8 70%, #1e3a8a 100%)",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Enhanced Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundSize: "200px 200px, 300px 300px, 30px 30px, 30px 30px",
          opacity: 0.8,
          pointerEvents: "none",
        }}
      />

      {/* Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70">
          <CircularProgress size={60} thickness={5} color="primary" />
          <span className="mt-6 text-lg font-semibold z-[60] text-[rgba(0,0,0,0.59)]">
            Please wait while we take you back to your dashboard...
          </span>
        </div>
      )}

      {/* Navbar */}
      {/* <div className='border-solid w-full h-16 px-10 flex justify-between items-center'>
        <img src={Logo} alt="mysocietyneeds-logo" />
        <button
          className='h-fit bg-[#56A9D9] border-none p-1 flex justify-center items-center rounded-full transition-colors duration-200 hover:bg-[#3577a3]'
          onClick={handleClose}
          disabled={loading}
          style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          <IoClose color='white' size={24} />
        </button>
      </div> */}

      {/* Main Content */}
      <div className="flex md:px-4 w-full h-full flex-1 flex-col sm:flex-row gap-2 sm:gap-4 my-3 sm:my-1.5">
        {/* Left Half */}
        <div className="flex w-full md:flex-1 justify-center p-2 md:p-2">
          <SubscriptionBenefits />
        </div>

        {/* Right Half */}
        <div className="flex w-full md:flex-1 p-2 md:p-2 relative">
          <PaymentMethod onUpiClick={() => setModalStep("upi")} />
        </div>
      </div>

      {/* Modals */}
      {modalStep === "upi" && (
        <UpiModal
          onProceed={() => setModalStep("confirm")}
          onClose={() => setModalStep(null)}
        />
      )}
      {modalStep === "confirm" && (
        <UpiConfirmModal
          onProceed={() => setModalStep("success")}
          onClose={() => setModalStep(null)}
        />
      )}
      {modalStep === "success" && (
        <UpiSuccessModal
          onGoToDashboard={() => navigate("/dashboard")}
          onClose={() => setModalStep(null)}
        />
      )}
    </div>
  );
};

export default Payment;
