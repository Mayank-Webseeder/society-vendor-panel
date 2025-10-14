import { useState, useEffect } from 'react';
import { Edit, Save, X, User, MapPin, Trash2 } from 'lucide-react';
import { useUser } from '../UserContext';
import indianStates from '../static/dummyData_IndianStates';

const PersonalInformation = () => {
  const { user, setUser } = useUser();
  const [tempUser, setTempUser] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTempUser({ ...user });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        setLoading(true);
        setUser({ ...tempUser });
        console.log('Profile Saved:', tempUser);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setTempUser({ ...user });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setTempUser({ ...user });
    setIsEditing(false);
  };

  const renderField = (label, name, value, type = 'text', options = null) => {
    if (options) {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
          {isEditing ? (
            <select
              name={name}
              value={tempUser[name] || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
              {options.find(opt => opt.value === value)?.label || value || 'Not specified'}
            </p>
          )}
        </div>
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={tempUser[name] || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
            {value || 'Not specified'}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Personal Information</h2>
          <p className="text-gray-600 text-sm">Manage your personal details and account information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleEditToggle}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save'}
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{user.name || 'User Name'}</h3>
            <p className="text-gray-600 text-sm">ID: {user.id}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.subscription_active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
                }`}>
                {user.subscription_active ? 'Premium Member' : 'Free Account'}
              </span>
            </div>
          </div>
        </div>
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
          {renderField('Full Name', 'name', tempUser.name)}
          {renderField('Email Address', 'email', tempUser.email, 'email')}
          {renderField('Phone Number', 'phone', tempUser.phone, 'tel')}
          {renderField('Gender', 'gender', tempUser.gender, 'text', [
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other' }
          ])}
          {renderField('Date of Birth', 'dateOfBirth', tempUser.dateOfBirth, 'date')}
          {renderField('Work Experience', 'workExperience', tempUser.workExperience)}
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <MapPin className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Address Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Building/Flat', 'building', tempUser.building)}
          {renderField('Locality', 'locality', tempUser.locality)}
          {renderField('Landmark', 'landmark', tempUser.landmark)}
          {renderField('City', 'city', tempUser.city)}
          {renderField('State', 'state', tempUser.state, 'text', indianStates)}
          {renderField('Country', 'country', tempUser.country)}
          {renderField('Pincode', 'pincode', tempUser.pincode)}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Email Notifications</p>
            <p className="text-sm text-gray-600">Receive updates about your jobs and account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={user.notificationsEnabled && user.subscription_active}
              onChange={() => setUser({ ...user, notificationsEnabled: !user.notificationsEnabled })}
              disabled={!user.subscription_active}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 disabled:opacity-50"></div>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-red-900">Danger Zone</h3>
        </div>
        <p className="text-red-700 text-sm mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default PersonalInformation;
