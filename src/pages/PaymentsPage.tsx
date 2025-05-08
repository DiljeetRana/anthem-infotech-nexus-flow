
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payment Management</CardTitle>
          <CardDescription>
            Track and manage all client payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Payment listing will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsPage;
