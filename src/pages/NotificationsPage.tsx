
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NotificationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Notifications Center</CardTitle>
          <CardDescription>
            View all your recent notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Notifications will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
