import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProfile } from '../services/api/auth';
import {
    User,
    Building,
    MapPin,
    Briefcase,
    Award,
    Upload,
    X,
    CheckCircle,
    AlertCircle,
    Navigation,
    RotateCcw
} from 'lucide-react';

const SERVICE_OPTIONS = [
    { label: 'Plumber', value: 'Plumber' },
    { label: 'Electrician', value: 'Electrician' },
    { label: 'Carpenter', value: 'Carpenter' },
    { label: 'CCTV Installation', value: 'CCTV Installation' },
    { label: 'Maid Services', value: 'Maid Services' },
    { label: 'Driver on Demand', value: 'Driver on Demand' },
    { label: 'Gardener', value: 'Gardener' },
];

const EXPERIENCES = [
    { label: '0-1 years', value: '0-1' },
    { label: '1-3 years', value: '1-3' },
    { label: '3-5 years', value: '3-5' },
    { label: '5+ years', value: '5+' },
];

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Reverse geocoding function using OpenStreetMap Nominatim (free service)
const reverseGeocode = async (lat, lng) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();

        if (data && data.display_name) {
            return data.display_name;
        }
        return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
        console.error('Reverse geocoding failed:', error);
        return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
};

export default function VendorCreateProfile() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const [form, setForm] = useState({
        name: '',
        businessName: '',
        address: {
            buildingNumber: '',
            locality: '',
            landmark: '',
            city: '',
            state: '',
            pincode: '',
        },
        services: [],
        experience: '',
        location: {
            GeoLocation: {
                latitude: '',
                longitude: '',
            },
            formattedAddress: '',
        },
        idProof: {
            name: '',
            fileBase64: '',
        },
    });

    const [submitting, setSubmitting] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [successText, setSuccessText] = useState('');
    const [gettingLocation, setGettingLocation] = useState(false);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

    const handleChange = (path, value) => {
        setForm(prev => {
            const next = structuredClone(prev);
            const keys = Array.isArray(path) ? path : path.split('.');
            let cur = next;
            for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
            cur[keys[keys.length - 1]] = value;
            return next;
        });
        setErrorText('');
    };

    const handleServicesToggle = (value) => {
        setForm(prev => {
            const exists = prev.services.includes(value);
            return {
                ...prev,
                services: exists ? prev.services.filter(v => v !== value) : [...prev.services, value],
            };
        });
    };

    const handleFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setErrorText('Please upload a PDF file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setErrorText('File size must be less than 5MB');
            return;
        }

        try {
            const dataUrl = await fileToDataUrl(file);
            handleChange('idProof.name', file.name);
            handleChange('idProof.fileBase64', dataUrl);
            setErrorText('');
        } catch (error) {
            setErrorText('Failed to process file');
        }
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setErrorText('Geolocation is not supported by this browser');
            return;
        }

        setGettingLocation(true);
        setLocationPermissionDenied(false);
        setErrorText('');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                // Get formatted address using reverse geocoding
                const formattedAddress = await reverseGeocode(latitude, longitude);

                handleChange('location.GeoLocation.latitude', latitude);
                handleChange('location.GeoLocation.longitude', longitude);
                handleChange('location.formattedAddress', formattedAddress);
                setGettingLocation(false);
            },
            (error) => {
                setGettingLocation(false);

                if (error.code === error.PERMISSION_DENIED) {
                    setLocationPermissionDenied(true);
                    setErrorText('Location permission denied. You can try again or enter coordinates manually.');
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    setErrorText('Location information unavailable. Please enter coordinates manually.');
                } else if (error.code === error.TIMEOUT) {
                    setErrorText('Location request timed out. Please try again or enter coordinates manually.');
                } else {
                    setErrorText('Failed to get your location. Please enter coordinates manually.');
                }
            },
            {
                timeout: 10000,
                enableHighAccuracy: true,
                maximumAge: 600000 // Cache for 10 minutes
            }
        );
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                return form.name.trim() && form.businessName.trim();
            case 2:
                return form.address.buildingNumber.trim() && form.address.locality.trim() &&
                    form.address.city.trim() && form.address.state.trim() && form.address.pincode.trim();
            case 3:
                return form.services.length > 0 && form.experience &&
                    form.location.GeoLocation.latitude && form.location.GeoLocation.longitude;
            case 4:
                return form.idProof.fileBase64;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps));
            setErrorText('');
        } else {
            setErrorText('Please fill in all required fields');
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        setErrorText('');
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(currentStep)) {
            setErrorText('Please complete all required fields');
            return;
        }

        setSubmitting(true);
        setErrorText('');
        setSuccessText('');

        try {
            const payload = {
                name: form.name.trim(),
                businessName: form.businessName.trim(),
                address: {
                    buildingNumber: form.address.buildingNumber.trim(),
                    locality: form.address.locality.trim(),
                    landmark: form.address.landmark.trim(),
                    city: form.address.city.trim(),
                    state: form.address.state.trim(),
                    pincode: form.address.pincode.trim(),
                },
                services: form.services,
                experience: form.experience,
                location: {
                    GeoLocation: {
                        latitude: Number(form.location.GeoLocation.latitude),
                        longitude: Number(form.location.GeoLocation.longitude),
                    },
                    formattedAddress: form.location.formattedAddress.trim(),
                },
                idProof: {
                    name: form.idProof.name,
                    fileBase64: form.idProof.fileBase64,
                },
            };

            await createProfile(payload);
            setSuccessText('Profile created successfully! Redirecting...');

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (err) {
            setErrorText(err?.response?.data?.message || 'Failed to create profile. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                                <p className="text-sm text-gray-600">Tell us about yourself and your business</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={form.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={form.businessName}
                                    onChange={(e) => handleChange('businessName', e.target.value)}
                                    placeholder="ABC Services"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <MapPin className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Business Address</h3>
                                <p className="text-sm text-gray-600">Where is your business located?</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Building Number *</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={form.address.buildingNumber}
                                    onChange={(e) => handleChange('address.buildingNumber', e.target.value)}
                                    placeholder="123"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Locality *</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={form.address.locality}
                                    onChange={(e) => handleChange('address.locality', e.target.value)}
                                    placeholder="Sector 1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={form.address.landmark}
                                    onChange={(e) => handleChange('address.landmark', e.target.value)}
                                    placeholder="Near Metro Station"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={form.address.city}
                                    onChange={(e) => handleChange('address.city', e.target.value)}
                                    placeholder="New Delhi"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={form.address.state}
                                    onChange={(e) => handleChange('address.state', e.target.value)}
                                    placeholder="Delhi"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={form.address.pincode}
                                    onChange={(e) => handleChange('address.pincode', e.target.value)}
                                    placeholder="110001"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Briefcase className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Services & Experience</h3>
                                <p className="text-sm text-gray-600">Select services and provide your experience details</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={form.experience}
                                onChange={(e) => handleChange('experience', e.target.value)}
                                required
                            >
                                <option value="">Select experience range</option>
                                {EXPERIENCES.map(x => (
                                    <option key={x.value} value={x.value}>{x.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered (minimum 1 required) *</label>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <p className="text-sm text-blue-800">
                                    <strong>Selected: {form.services.length}</strong> services
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 border border-gray-200 rounded-lg p-4">
                                {SERVICE_OPTIONS.map(opt => (
                                    <label key={opt.value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${form.services.includes(opt.value)
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                        <input
                                            type="checkbox"
                                            checked={form.services.includes(opt.value)}
                                            onChange={() => handleServicesToggle(opt.value)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="font-medium text-gray-900">Service Location *</h4>
                                    <p className="text-sm text-gray-600">Required for service area mapping</p>
                                </div>
                                <div className="flex gap-2">
                                    {locationPermissionDenied && (
                                        <button
                                            type="button"
                                            onClick={getCurrentLocation}
                                            disabled={gettingLocation}
                                            className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            {gettingLocation ? 'Trying...' : 'Try Again'}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={getCurrentLocation}
                                        disabled={gettingLocation}
                                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        <Navigation className="w-4 h-4" />
                                        {gettingLocation ? 'Getting Location...' : 'Use Current Location'}
                                    </button>
                                </div>
                            </div>

                            {/* Display current location if available */}
                            {form.location.formattedAddress && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-green-800">Location Detected</p>
                                            <p className="text-sm text-green-700 mt-1">{form.location.formattedAddress}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Manual entry option */}
                            <div className="border-t border-gray-200 pt-4">
                                <p className="text-sm text-gray-600 mb-3">Or enter coordinates manually:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Latitude *</label>
                                        <input
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={form.location.GeoLocation.latitude}
                                            onChange={(e) => handleChange('location.GeoLocation.latitude', e.target.value)}
                                            placeholder="28.6139"
                                            type="number"
                                            step="any"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Longitude *</label>
                                        <input
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={form.location.GeoLocation.longitude}
                                            onChange={(e) => handleChange('location.GeoLocation.longitude', e.target.value)}
                                            placeholder="77.2090"
                                            type="number"
                                            step="any"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Upload className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Identity Verification</h3>
                                <p className="text-sm text-gray-600">Upload a valid ID proof document</p>
                            </div>
                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            {form.idProof.name ? (
                                <div className="space-y-4">
                                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                                    <div>
                                        <p className="font-medium text-gray-900">{form.idProof.name}</p>
                                        <p className="text-sm text-gray-600">File uploaded successfully</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleChange('idProof.name', '');
                                            handleChange('idProof.fileBase64', '');
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                        className="text-red-600 hover:text-red-700 text-sm font-medium p-2 rounded"
                                    >
                                        Remove file
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                                    <div>
                                        <p className="font-medium text-gray-900">Upload ID Proof</p>
                                        <p className="text-sm text-gray-600">PDF format only, max 5MB</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Choose File
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFile}
                                        className="hidden"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-amber-800 font-medium mb-1">Accepted Documents</p>
                                    <ul className="text-xs text-amber-700 space-y-1">
                                        <li>• Aadhaar Card</li>
                                        <li>• PAN Card</li>
                                        <li>• Driving License</li>
                                        <li>• Voter ID</li>
                                        <li>• Business Registration Certificate</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
                {/* Image */}
                <div className='flex justify-center mb-6'>
                    <img
                        src="/public/faviconFinal.png"
                        alt="Vendor Illustration"
                        className="w-32 h-32 object-contain"
                    />
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Your Vendor Profile</h1>
                    <p className="text-gray-600">Complete your profile to start receiving job opportunities</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
                        <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    {/* Success Message */}
                    {successText && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            {successText}
                        </div>
                    )}

                    {/* Error Message */}
                    {errorText && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            {errorText}
                        </div>
                    )}

                    <form onSubmit={onSubmit}>
                        {renderStep()}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Creating Profile...' : 'Complete Profile'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
