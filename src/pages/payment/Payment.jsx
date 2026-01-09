import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  ArrowLeft,
  CheckCircle,
  Crown,
  Zap,
  Shield,
  Smartphone,
  CreditCard,
  Building
} from "lucide-react";

const Payment = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Dynamic service categories - no icons, just names
  const serviceCategories = [
    { id: 'plumbing', name: 'Plumbing Services' },
    { id: 'electrical', name: 'Electrical Work' },
    { id: 'cleaning', name: 'Cleaning Services' },
    { id: 'hvac', name: 'HVAC Services' },
    { id: 'gardening', name: 'Garden Maintenance' },
    { id: 'painting', name: 'Painting Services' },
    { id: 'carpentry', name: 'Carpentry Work' },
    { id: 'security', name: 'Security Services' },
    { id: 'pest', name: 'Pest Control' },
    { id: 'waste', name: 'Waste Management' }
  ];

  const pricePerService = 200;

  const handleServiceToggle = (serviceId, event) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalAmount = selectedServices.length * pricePerService;

 const handlePayment = async () => {
  if (selectedServices.length === 0) return;

  setLoading(true);

  if (!window.Razorpay) {
    alert("Razorpay SDK not loaded");
    setLoading(false);
    return;
  }

  try {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: totalAmount * 100,
      currency: "INR",
      name: "My Society Needs",
      description: `Service subscription for ${selectedServices.length} services`,
      handler: function (response) {
        console.log("Payment successful:", response);
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "Vendor Name",
        email: "vendor@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#1f2937",
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Payment error:", error);
    setLoading(false);
  }
};


  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      navigate('/dashboard', {
        state: {
          paymentSuccess: true,
          services: selectedServices.length
        }
      });
    } catch (error) {
      console.error('Payment verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Services</h1>
              <p className="text-gray-600">Select services to start receiving job opportunities from societies</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Service Selection */}
          <div className="lg:col-span-3">
            {/* Pricing Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-600 rounded-full">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-900">Simple Pricing</h2>
                  <p className="text-blue-700">₹200 per service • No hidden fees • One-time payment</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Unlimited job applications
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Direct society connections
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Real-time notifications
                </div>
              </div>
            </div>

            {/* Service Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Available Services</h3>
                <div className="text-sm text-gray-600">
                  {selectedServices.length > 0 ? (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                      {selectedServices.length} services selected
                    </span>
                  ) : (
                    <span>Select services to continue</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {serviceCategories.map((service, index) => {
                  const isSelected = selectedServices.includes(service.id);

                  return (
                    <div
                      key={service.id}
                      onClick={(e) => handleServiceToggle(service.id, e)}
                      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg select-none ${isSelected
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      style={{
                        minHeight: '120px',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      {/* Selection Indicator */}
                      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                        }`}>
                        {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>

                      <div className="flex flex-col justify-center items-center text-center h-full">
                        <h4 className="font-semibold text-gray-900 mb-4 text-xl">{service.name}</h4>
                        <div>
                          <span className="text-2xl font-bold text-gray-900">₹{pricePerService}</span>
                          <span className="text-sm text-gray-500 ml-1">per service</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Order Summary - Fixed Structure */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

                {/* Fixed height container for services list */}
                <div className="min-h-[280px] flex flex-col">
                  {selectedServices.length > 0 ? (
                    <>
                      {/* Services List with fixed height */}
                      <div className="flex-1 mb-4">
                        <div className="space-y-3 max-h-[200px] overflow-y-auto">
                          {selectedServices.map(serviceId => {
                            const service = serviceCategories.find(s => s.id === serviceId);
                            return (
                              <div key={serviceId} className="flex justify-between items-center text-sm">
                                <span className="text-gray-700">{service.name}</span>
                                <span className="font-medium">₹{pricePerService}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Fixed bottom section */}
                      <div className="border-t border-gray-200 pt-4 mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold text-gray-900">Total</span>
                          <span className="text-2xl font-bold text-blue-600">₹{totalAmount}</span>
                        </div>

                        <button
                          onClick={handlePayment}
                          disabled={loading}
                          className="w-full bg-gray-900 text-white py-4 px-4 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
                        >
                          {loading ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Processing...
                            </div>
                          ) : (
                            'Subscribe Now'
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Empty state with same height structure */
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <Crown className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 text-sm">Select services to see pricing</p>
                        </div>
                      </div>

                      {/* Placeholder for button area */}
                      <div className="border-t border-gray-200 pt-4 mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold text-gray-400">Total</span>
                          <span className="text-2xl font-bold text-gray-400">₹0</span>
                        </div>
                        <button
                          disabled
                          className="w-full bg-gray-300 text-gray-500 py-4 px-4 rounded-xl font-semibold cursor-not-allowed text-lg"
                        >
                          Select Services
                        </button>
                      </div>
                    </div>
                  )}
                </div> 
              </div>

              {/* Payment Security */}
              <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-900">Secure Payment</h4>
                </div>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    256-bit SSL encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    PCI DSS compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Instant activation
                  </li>
                </ul>
              </div>

              {/* Accepted Payment Methods */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Accepted Payments</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Cards</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Smartphone className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">UPI</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Building className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Net Banking</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Zap className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Wallets</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
