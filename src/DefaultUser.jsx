// List of default User values

const defaultUser = {
  name: "User",
  initials: 'U',
  id: '#User132175',
  role: 'vendor',
  bio: 'Working to cater to willing professionals.',
  dateOfBirth: '2000-01-01',    // YYYY-MM-DD
  gender: 'Male',
  jobTitle: 'Service Provider',
  email: 'mysocietyneeds@business.com',
  businessName: "MySocietyNeeds Pvt. Ltd.",
  workExperience: "Less than 1 year",
  idProof: "None",
  idProofFile: null,
  // payscale: '₹10,000 - ₹15,000',
  preferredPaymentMethod: 'UPI',
  lastPayments: '0',
  building: "Flat-203/Shanti Residency",
  locality: "Purple Residency",
  landmark: "Andheri West Club",
  city: "Mumbai",
  state: "Maharashtra",
  country: 'India',
  pincode: "400706",
  address: "Flat-203/Shanti Residency, Purple Residency, Andheri West Club, Mumbai, Maharashtra, India, 400706",
  locationCoordinates: "N/A",
  whatYouOffer: ["Housekeeping Services", "Waste Management", "Elevator Maintenance", "Plumbing Services"],
  servicesCount: 4,
  workingDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sun'],
  phone: "+91 9999999999",
  otp: "1234",
  avgResponseTime: 12,
  // rating: 2,
  earnings: 780,
  notificationsEnabled: true,
  agreedTermsAndConditions: false,
  agreedPrivacyPolicy: false,
  subscription_active: false,
  subscription_status: "Premium",
  subscription_validFrom: '2025-04-12', // YYYY-MM-DD
  subscription_validTill: '2026-04-12',   // YYYY-MM-DD
  subscription_endTime: '11:30',
  subscription_referenceId: 'N/A',
  testMode: false,
  serviceBasePrice: 1000, // Base price per service
  totalCost: 4000,
  discountLowerLimit: 3,
  discountUpperLimit: 5,
  gstRate: 0.18 // 18% GST for services (standard rate for professional/maintenance services in India)
};

export default defaultUser;
