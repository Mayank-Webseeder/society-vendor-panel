import { Clock, FileText, UserCheck, XCircle } from 'lucide-react';

const RecentActivity = () => {
    const activities = [
        {
            type: 'application',
            message: 'Applied for Plumbing job at Society A',
            time: '2 hours ago',
            icon: FileText,
            color: 'text-blue-600'
        },
        {
            type: 'accepted',
            message: 'Application accepted for Electrical work',
            time: '1 day ago',
            icon: UserCheck,
            color: 'text-green-600'
        },
        {
            type: 'rejected',
            message: 'Application declined for Cleaning job',
            time: '2 days ago',
            icon: XCircle,
            color: 'text-red-600'
        }
    ];

    return (
        <div className="space-y-3">
            {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Icon className={`w-4 h-4 mt-0.5 ${activity.color}`} />
                        <div className="flex-1">
                            <p className="text-sm text-gray-800">{activity.message}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{activity.time}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RecentActivity;
