
export const notifications = [
    { id: 1, message: 'New job opportunity matching your profile', type: 'info', time: '1 hour ago' },
    { id: 2, message: 'Payment received for last week\'s services', type: 'success', time: '3 hours ago' },
    { id: 3, message: 'Client feedback pending for completed job', type: 'warning', time: '1 day ago' },
    { id: 4, message: 'Your profile was viewed by a recruiter', type: 'info', time: '2 days ago' },
    { id: 5, message: 'Service request cancelled by client', type: 'error', time: '3 days ago' },
    { id: 6, message: 'Reminder: Update your availability', type: 'warning', time: '5 days ago' },
    { id: 7, message: 'New message from client', type: 'info', time: '6 days ago' },
    { id: 8, message: 'Your subscription is about to expire', type: 'warning', time: '1 week ago' }
];

export const notificationCount = () => notifications.length;