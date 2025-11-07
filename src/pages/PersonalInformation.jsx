import { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Save, X, User, MapPin } from "lucide-react";
import { useUser } from "../UserContext";
import indianStates from "../static/dummyData_IndianStates";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PersonalInformation = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch user profile
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
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save updated profile
  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found!");

      const payload = {
        name: formData.name,
        contactNumber: formData.phone,
        experience: formData.workExperience,
        address: {
          buildingNumber: formData.building,
          locality: formData.locality,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
      };

      await axios.put(`${API_BASE_URL}/api/vendor/profile/update`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel editing
  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  if (loading && !formData) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading personal information...
      </div>
    );
  }

  if (!formData) return null;

  const renderInput = (label, name, type = "text", options = null) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {isEditing ? (
        options ? (
          <select
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
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
            className="w-full px-3 py-2 border rounded-lg"
          />
        )
      ) : (
        <p className="px-3 py-2 bg-gray-50 border rounded-lg text-gray-800">
          {formData[name] || "Not specified"}
        </p>
      )}
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          <p className="text-gray-600 text-sm">
            Manage your personal details and account information
          </p>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        )}
      </div>

      {/* Personal Details */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Personal Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Full Name", "name")}
          {renderInput("Email Address", "email", "email")}
          {renderInput("Phone Number", "phone", "tel")}
          {renderInput("Work Experience", "workExperience")}
        </div>
      </div>

      {/* Address Details */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <MapPin className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Address Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Building/Flat", "building")}
          {renderInput("Locality", "locality")}
          {renderInput("Landmark", "landmark")}
          {renderInput("City", "city")}
          {renderInput("State", "state", "text", indianStates)}
          {renderInput("Country", "country")}
          {renderInput("Pincode", "pincode")}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
