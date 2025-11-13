import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Edit, Save, X, User, MapPin, Camera, Upload, Mail, Phone, Briefcase, Navigation } from "lucide-react";
import { useUser } from "../UserContext";
import indianStates from "../static/dummyData_IndianStates";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PersonalInformation = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token found!");

        const res = await axios.get(`${API_BASE_URL}/api/vendor/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        const profile = {
          id: data._id,
          name: data.name || "",
          email: data.email || "",
          phone: data.contactNumber || "",
          workExperience: data.experience || "",
          profilePicture: data.profilePicture || null,
          building: data.address?.buildingNumber || "",
          locality: data.address?.locality || "",
          landmark: data.address?.landmark || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          country: "India",
          pincode: data.address?.pincode || "",
        };

        setUser(profile);
        setFormData(profile);
        setImagePreview(profile.profilePicture);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, or WebP)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setFetchingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          
          // Use Nominatim API for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=18`,
            {
              headers: {
                'User-Agent': 'VendorProfileApp/1.0',
                'Accept-Language': 'en'
              }
            }
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log("Reverse geocoding response:", data);
          
          const address = data.address || {};

          // More comprehensive address mapping
          const building = address.house_number || 
                          address.building || 
                          address.house || "";
          
          const locality = address.suburb || 
                          address.neighbourhood || 
                          address.residential || 
                          address.quarter || 
                          address.road || 
                          address.street || "";
          
          const landmark = address.amenity || 
                          address.tourism || 
                          address.shop || 
                          address.historic || "";
          
          const city = address.city || 
                      address.town || 
                      address.village || 
                      address.municipality || 
                      address.county || "";
          
          const state = address.state || 
                       address.state_district || 
                       address.region || "";
          
          const pincode = address.postcode || "";
          
          const country = address.country || "India";

          // Update form data with fetched location
          setFormData((prev) => ({
            ...prev,
            building: building || prev.building,
            locality: locality || prev.locality,
            landmark: landmark || prev.landmark,
            city: city || prev.city,
            state: state || prev.state,
            country: country,
            pincode: pincode || prev.pincode,
          }));

          alert(`Location fetched successfully!\nLat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`);
        } catch (error) {
          console.error("Error fetching location details:", error);
          alert("Failed to fetch location details. Please try again or check your internet connection.");
        } finally {
          setFetchingLocation(false);
        }
      },
      (error) => {
        setFetchingLocation(false);
        console.error("Geolocation error:", error);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location permission denied. Please enable location access in your browser settings.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable. Please check if location services are enabled.");
            break;
          case error.TIMEOUT:
            alert("Location request timed out. Please try again.");
            break;
          default:
            alert("An unknown error occurred while fetching location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  const uploadProfileImage = async () => {
    if (!profileImage) return null;
    try {
      setUploadingImage(true);
      const token = localStorage.getItem("authToken");
      const formDataImg = new FormData();
      formDataImg.append("profilePicture", profileImage);

      const res = await axios.put(`${API_BASE_URL}/api/vendor/profile`, formDataImg, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.vendor?.profilePicture;
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image. Please try again.");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found!");

      let pictureUrl = formData.profilePicture;
      if (profileImage) {
        const uploadedUrl = await uploadProfileImage();
        if (uploadedUrl) pictureUrl = uploadedUrl;
      }

      const payload = {
        name: formData.name,
        contactNumber: formData.phone,
        experience: formData.workExperience,
        profilePicture: pictureUrl,
        address: {
          buildingNumber: formData.building,
          locality: formData.locality,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
      };

      await axios.put(`${API_BASE_URL}/api/vendor/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedFormData = { ...formData, profilePicture: pictureUrl };
      setUser(updatedFormData);
      setFormData(updatedFormData);
      setIsEditing(false);
      setProfileImage(null);
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setImagePreview(user.profilePicture);
    setProfileImage(null);
    setIsEditing(false);
  };

  if (loading && !formData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading personal information...</p>
        </div>
      </div>
    );
  }

  if (!formData) return null;

  const renderInput = (label, name, type = "text", options = null, icon = null) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      {isEditing ? (
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          {options ? (
            <select
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white`}
            >
              <option value="">Select {label}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          )}
        </div>
      ) : (
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <p className={`${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl text-gray-800 font-medium`}>
            {formData[name] || <span className="text-gray-400">Not specified</span>}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">
                Manage your personal details and account information
              </p>
            </div>
            {isEditing ? (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold transition-all"
                >
                  <X className="w-5 h-5" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading || uploadingImage}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl hover:from-gray-800 hover:to-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow"
                >
                  <Save className="w-5 h-5" />
                  {uploadingImage ? "Uploading..." : loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 border-none px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold transition-all shadow"
              >
                <Edit className="w-5 h-5" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow p-8 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div
                  className={`w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow ring-4 ring-gray-100 ${
                    isEditing ? "cursor-pointer" : ""
                  }`}
                  onClick={() => isEditing && fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <img
                      src={
                        imagePreview?.startsWith("http")
                          ? imagePreview
                          : `${API_BASE_URL}${imagePreview}`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center">
                      <User className="w-20 h-20 text-white" />
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-10 h-10 text-white" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    className="absolute bottom-2 right-2 p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-110"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 font-medium">
                  {isEditing ? "Click to upload photo" : "Profile Picture"}
                </p>
                {isEditing && (
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG, WebP • Max 5MB
                  </p>
                )}
              </div>
            </div>

            {/* Personal Details */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {renderInput("Full Name", "name", "text", null, <User className="w-5 h-5" />)}
                {renderInput("Email Address", "email", "email", null, <Mail className="w-5 h-5" />)}
                {renderInput("Phone Number", "phone", "tel", null, <Phone className="w-5 h-5" />)}
                {renderInput("Work Experience", "workExperience", "text", null, <Briefcase className="w-5 h-5" />)}
              </div>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Address Information</h3>
            </div>
            
            {isEditing && (
              <button
                onClick={fetchCurrentLocation}
                disabled={fetchingLocation}
                className="flex items-center border-none gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow"
              >
                <Navigation className={`w-5 h-5 ${fetchingLocation ? 'animate-pulse' : ''}`} />
                {fetchingLocation ? "Fetching..." : "Get Current Location"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderInput("Building/Flat Number", "building", "text", null, <MapPin className="w-5 h-5" />)}
            {renderInput("Locality", "locality", "text", null, <MapPin className="w-5 h-5" />)}
            {renderInput("Landmark", "landmark", "text", null, <MapPin className="w-5 h-5" />)}
            {renderInput("City", "city", "text", null, <MapPin className="w-5 h-5" />)}
            {renderInput("State", "state", "text", indianStates, <MapPin className="w-5 h-5" />)}
            {renderInput("Country", "country", "text", null, <MapPin className="w-5 h-5" />)}
            {renderInput("Pincode", "pincode", "text", null, <MapPin className="w-5 h-5" />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;