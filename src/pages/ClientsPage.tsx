
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ClientsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Client Management</CardTitle>
          <CardDescription>
            View and manage all your clients.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Client listing will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsPage;
