
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Notification } from '@/types';
import { Bell, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: 'admin1',
    title: 'Task Updated',
    message: 'Website Redesign task has been moved to "In Progress" status.',
    read: false,
    createdAt: new Date('2023-06-15T09:23:00')
  },
  {
    id: '2',
    userId: 'admin1',
    title: 'New Client',
    message: 'A new client "XYZ Corp" has been added to your client list.',
    read: true,
    createdAt: new Date('2023-06-14T14:45:00')
  },
  {
    id: '3',
    userId: 'admin1',
    title: 'Payment Received',
    message: 'Acme Corporation has made a payment of $2,500.00.',
    read: false,
    createdAt: new Date('2023-06-13T11:30:00')
  },
  {
    id: '4',
    userId: 'admin1',
    title: 'Task Feedback',
    message: 'Globex Industries has provided feedback on the Mobile App Development task.',
    read: true,
    createdAt: new Date('2023-06-12T16:20:00')
  },
  {
    id: '5',
    userId: 'admin1',
    title: 'Payment Overdue',
    message: 'Payment for Initech Solutions is now overdue by 7 days.',
    read: false,
    createdAt: new Date('2023-06-10T08:15:00')
  }
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
    toast.success('Notification marked as read');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast.success('All notifications marked as read');
  };

  const formatNotificationTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return format(date, 'h:mm a');
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button 
          variant="outline" 
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Notifications Center</CardTitle>
          <CardDescription>
            View all your recent notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`flex items-start p-4 rounded-lg ${notification.read ? 'bg-background' : 'bg-muted/50'}`}
                >
                  <div className={`p-2 rounded-full mr-4 ${notification.read ? 'bg-muted' : 'bg-primary/10'}`}>
                    {notification.read ? (
                      <Check className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Bell className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${notification.read ? 'text-foreground' : 'text-primary'}`}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatNotificationTime(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-xs" 
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
