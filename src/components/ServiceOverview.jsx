import { CheckCircle, AlertCircle } from 'lucide-react';
import { useUser } from '../UserContext';

const ServiceOverview = () => {
    const { user } = useUser();
    const services = user?.services || [];

    return (
        <div className="space-y-3">
            {services.length > 0 ? (
                services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium text-gray-800">{service.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                            Active
                        </span>
                    </div>
                ))
            ) : (
                <div className="text-center py-4">
                    <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No services selected</p>
                    <button className="text-xs text-blue-600 hover:text-blue-700 mt-1">
                        Add services
                    </button>
                </div>
            )}
        </div>
    );
};

export default ServiceOverview;
