import { useNavigate } from "react-router-dom";
import {
  Check,
  Lock,
  ChevronRight,
  Shield,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { IoClose } from "react-icons/io5";
import visa from "../../assets/logos/visa.svg";
import mastercard from "../../assets/logos/mastercard.svg";
import bhim from "../../assets/logos/bhim.svg";
import paytm from "../../assets/logos/paytm.svg";
import phonepe from "../../assets/logos/phonepe.svg";
import amazonpay from "../../assets/logos/amazonpay.svg";
import gpay from "../../assets/logos/gpay.svg";

const PaymentMethod = ({ onUpiClick }) => {
  const navigate = useNavigate();

  const planBenefits = [
    "Society job requests",
    "Priority listing in local societies",
    "Verified vendor status",
  ];

  const handlePaymentMethodClick = (method) => {
    if (method === "UPI AutoPay" && onUpiClick) {
      onUpiClick();
    }
  };

  return (
    <div
      className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center rounded-3xl overflow-auto"
      style={{
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #312e81 30%, #1e1b4b 100%)",
      }}
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            opacity: 0.5,
          }}
        />
        {/* Geometric accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            background:
              "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
            transform: "skewX(-15deg)",
            transformOrigin: "top",
          }}
        />
        {/* Corner accents */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            transform: "translate(50%, 50%)",
          }}
        />
      </div>

      {/* Close Button */}
      <button
        className="hidden sm:flex absolute right-4 top-4 md:right-6 md:top-6 h-fit bg-white/10 backdrop-blur-sm p-2.5 md:p-3 justify-center items-center border-none rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110 cursor-pointer z-50"
        onClick={() => navigate("/dashboard")}
      >
        <IoClose color="white" size={22} className="md:w-6 md:h-6" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-12">
        {/* Header Section */}
        <div className="mb-4 md:mb-12 text-center">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="hidden md:block w-16 h-px bg-gradient-to-r from-transparent to-blue-400"></div>
            <div className="mx-3 md:mx-4 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
              <Shield className="text-white md:w-8 md:h-8" size={26} />
            </div>
            <div className="hidden md:block w-16 h-px bg-gradient-to-l from-transparent to-blue-400"></div>
          </div>

          <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl text-white mb-2.5 md:mb-4 tracking-wide">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Payment Method
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-white/80 font-light mb-4 md:mb-6 max-w-2xl leading-relaxed text-center md:text-left">
            Secure & encrypted payments with{" "}
            <span className="text-blue-300 font-medium">
              enterprise-grade protection
            </span>
          </p>

          <div className="flex items-center justify-center gap-2 text-white/70 mb-5 md:mb-8">
            <Lock size={14} className="text-yellow-400" />
            <span className="text-xs sm:text-sm font-medium">
              256-bit SSL encryption • PCI DSS compliant
            </span>
          </div>
        </div>

        {/* Plan Benefits Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 md:p-6 border border-white/20 mb-8 md:mb-11 w-full max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Check size={20} className="text-blue-400" />
            <h3 className="text-white font-semibold text-sm sm:text-lg">
              What's included in your plan
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2.5 md:gap-3">
            {planBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-white/90 text-sm sm:text-base">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="w-full max-w-2xl space-y-4 md:space-y-8">
          {/* Credit/Debit Card */}
          <div
            onClick={() => handlePaymentMethodClick("Credit or Debit Card")}
            className="group bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-6 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <CreditCard size={22} className="text-white md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-bold text-lg md:text-xl mb-1">
                    Credit or Debit Card
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Visa, Mastercard & more
                  </p>
                </div>
              </div>
              <ChevronRight
                size={24}
                className="text-gray-400 group-hover:translate-x-1 transition-transform"
              />
            </div>

            <div className="border-t border-gray-200 pt-3 md:pt-4">
              <div className="flex items-center gap-4">
                <img src={visa} alt="Visa" className="h-8 md:h-10" />
                <img
                  src={mastercard}
                  alt="Mastercard"
                  className="h-8 md:h-10"
                />
                <span className="text-gray-500 text-xs md:text-sm">& more</span>
              </div>
            </div>
          </div>

          {/* UPI AutoPay */}
          <div
            onClick={() => handlePaymentMethodClick("UPI AutoPay")}
            className="group bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-6 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Smartphone size={22} className="text-white md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-bold text-lg md:text-xl mb-1">
                    UPI AutoPay
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Pay with any UPI app
                  </p>
                </div>
              </div>
              <ChevronRight
                size={24}
                className="text-gray-400 group-hover:translate-x-1 transition-transform"
              />
            </div>

            <div className="border-t border-gray-200 pt-3 md:pt-4">
              <div className="flex items-center gap-5 flex-wrap">
                <img src={bhim} alt="BHIM" className="h-4 sm:h-5" />
                <img src={paytm} alt="Paytm" className="h-4 sm:h-6 pb-1" />
                <img src={phonepe} alt="PhonePe" className="h-6 sm:h-7 pb-1" />
                <img src={amazonpay} alt="Amazon Pay" className="h-4 sm:h-5" />
                <img src={gpay} alt="Google Pay" className="h-5 md:h-6 pb-1" />
                <span className="text-gray-500 text-[10px] md:text-xs pb-2">
                  +10 more
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-10 md:mt-24 p-3 md:p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 max-w-2xl w-full">
          <p className="text-white/70 text-xs sm:text-sm text-center leading-relaxed">
            🔒 Your payment information is secure and encrypted. We never store
            your card details.
          </p>
        </div>
      </div>

      {/* Enhanced Styles */}
      <style>{`
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
};

export default PaymentMethod;
