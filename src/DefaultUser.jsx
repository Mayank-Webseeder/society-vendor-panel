// List of default User values

const defaultUser = {
  name: "User",
  initials: 'U',
  id: '#User132175',
  bio: 'Working to cater to willing professionals.',
  dateOfBirth: '2000-01-01',    // YYYY-MM-DD
  gender: 'Male',
  jobTitle: 'Service Provider',
  email: 'velra@business.com',
  businessName: "Velra Pvt. Ltd.",
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
  get address() {
    return [
      this.building,
      this.locality,
      this.landmark,
      this.city,
      this.state,
      this.country,
      this.pincode
    ].join(', ');
  },
  locationCoordinates: "N/A",
  whatYouOffer: ["Housekeeping Services", "Pest Control", "Society Office Administration", "Carpentry Work", "Waste Management", "Elevator Maintenance", "Plumbing Services"],
  get servicesCount() {    // Since servicesCount is defined as a getter in the defaultUser object, you can access it like a regular property, ex, defaultUser.servicesCount. A getter is a special type of property that calculates its value dynamically when accessed.
    return this.whatYouOffer.length;
  },
  workingDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sun'],
  // workingHours: '9 AM - 7 PM',
  phone: "+91 9999999999",
  otp: "1234",
  avgResponseTime: 12,
  // rating: 2,
  earnings: 780,
  notificationsEnabled: true,
  agreedTermsAndConditions: false,
  agreedPrivacyPolicy: false,
  membershipActive: false,
  membershipStatus: "Premium",
  membershipPrice: 999,
  membershipStartDate: '2025-04-12', // YYYY-MM-DD
  membershipEndDate: '2026-04-12',   // YYYY-MM-DD
  membershipEndTime: '11:30',
  testMode: false,
  serviceBasePrice: 1000, // Base price per service
  get totalCost() {
    return this.serviceBasePrice * this.servicesCount;
  },
  discountLowerLimit: 3,
  discountUpperLimit: 5,
  gstRate: 0.18 // 18% GST for services (standard rate for professional/maintenance services in India)
};

export default defaultUser;
