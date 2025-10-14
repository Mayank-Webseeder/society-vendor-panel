import { useUser } from '../UserContext';
import { CheckCircle, Settings, CreditCard, AlertTriangle, Crown, ShoppingCart, Wrench } from 'lucide-react';

const SubscriptionPage = () => {
    const { user } = useUser();

    // Mock user's subscribed services
    const subscribedServices = [
        { name: 'Plumbing', active: true, price: 200 },
        { name: 'Electrical', active: true, price: 200 },
        { name: 'Cleaning', active: true, price: 200 }
    ];

    // Available services for subscription
    const availableServices = [
        { name: 'HVAC', price: 200 },
        { name: 'Gardening', price: 200 },
        { name: 'Security', price: 200 },
        { name: 'Painting', price: 200 },
        { name: 'Carpentry', price: 200 }
    ];

    const totalSubscriptionValue = subscribedServices.length * 200;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Subscription Details</h2>
                <p className="text-gray-600 text-sm">Manage your service subscriptions and access to job opportunities</p>
            </div>

            {user?.subscription_active ? (
                <div className="space-y-6">
                    {/* Current Subscription Overview */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-green-900">Active Subscription</h3>
                                <p className="text-sm text-green-700">You can apply to jobs for {subscribedServices.length} services</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Vendor Name</p>
                                <p className="text-gray-900">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Subscription ID</p>
                                <p className="text-gray-900 font-mono text-sm">{user.subscription_referenceId || 'SUB-2024-001'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Total Services</p>
                                <p className="text-gray-900 font-semibold">{subscribedServices.length} Services</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Total Value</p>
                                <p className="text-gray-900 font-semibold">₹{totalSubscriptionValue}</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                Active Subscription
                            </span>
                        </div>
                    </div>

                    {/* Subscribed Services */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Settings className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Your Services</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {subscribedServices.map((service, index) => (
                                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Wrench className="w-4 h-4 text-blue-600" />
                                            <span className="font-medium text-gray-900">{service.name}</span>
                                        </div>
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">₹{service.price}/service</p>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                        Active
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What You Can Do */}
                    <div className="bg-blue-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-blue-900 mb-4">With Your Subscription</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                <span className="text-blue-800">Apply to jobs in your subscribed services</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                <span className="text-blue-800">Upload quotations for jobs that require them</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                <span className="text-blue-800">Get notified about job status updates</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                <span className="text-blue-800">Access to application tracking</span>
                            </div>
                        </div>
                    </div>

                    {/* Add More Services */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Add More Services</h3>
                        <p className="text-gray-600 mb-4">Expand your service offerings to access more job opportunities</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {availableServices.slice(0, 3).map((service, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Wrench className="w-4 h-4 text-gray-600" />
                                        <span className="font-medium text-gray-900">{service.name}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">₹{service.price}/service</p>
                                    <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                        Add Service
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <a
                                href="/payment"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                View All Services
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                /* No Active Subscription */
                <div className="flex justify-center">
                    <div className="max-w-md text-center">
                        <div className="bg-white rounded-lg border border-gray-200 p-8">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Crown className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Subscription</h3>
                            <p className="text-gray-600 mb-6">
                                Subscribe to services to start applying for jobs posted by societies in your area.
                            </p>

                            {/* Service Pricing Info */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <h4 className="font-medium text-gray-900 mb-3">How it works:</h4>
                                <div className="text-left space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        Each service costs ₹200
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        Subscribe to multiple services
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        Apply to jobs in your subscribed services
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        Upload quotations when required
                                    </div>
                                </div>
                            </div>

                            <a
                                href="/payment"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Choose Services
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscriptionPage;
