
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TasksPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
          <CardDescription>
            Track and manage all project tasks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Task listing will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksPage;
