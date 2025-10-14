import { useNavigate } from 'react-router-dom';
import { ChevronRight, HelpCircle, BookOpen, FileText, Shield } from 'lucide-react';

const supportOptions = [
    {
        id: 'help-support',
        title: 'Help & Support',
        description: 'Get help with your account and technical issues',
        route: 'help-support',
        icon: HelpCircle
    },
    {
        id: 'faq',
        title: 'FAQ',
        description: 'Find answers to commonly asked questions',
        route: 'faq',
        icon: BookOpen
    },
    {
        id: 'terms',
        title: 'Terms & Conditions',
        description: 'Read our terms of service and usage agreement',
        route: 'terms-conditions',
        icon: FileText
    },
    {
        id: 'privacy',
        title: 'Privacy Policy',
        description: 'Learn how we handle and protect your data',
        route: 'privacy-policy',
        icon: Shield
    }
];

const AccountAndSupport = () => {
    const navigate = useNavigate();

    const handleClick = (route) => {
        navigate(route);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Account & Support</h2>
                <p className="text-gray-600 text-sm">Get help and access important account information</p>
            </div>

            {/* Support Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.id}
                            onClick={() => handleClick(option.route)}
                            className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <Icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        {option.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {option.description}
                                    </p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Additional Help Section */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Need More Help?</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">Email us at support@example.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">Call us at +91 1234567890</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">Available Monday to Friday, 9 AM - 6 PM</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="p-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <h4 className="font-medium mb-1">Report an Issue</h4>
                    <p className="text-sm text-gray-600">Let us know about problems you're experiencing</p>
                </button>
                <button className="p-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <h4 className="font-medium mb-1">Feature Request</h4>
                    <p className="text-sm text-gray-600">Suggest new features or improvements</p>
                </button>
            </div>
        </div>
    );
};

export default AccountAndSupport;
