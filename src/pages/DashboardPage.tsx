import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

// Mock data
const statCards = [
  {
    title: 'Total Clients',
    value: 24,
    change: 2,
    trend: 'up',
    icon: <Users className="h-5 w-5 text-blue-500" />,
    color: 'bg-blue-50',
  },
  {
    title: 'Active Tasks',
    value: 18,
    change: -3,
    trend: 'down',
    icon: <FileText className="h-5 w-5 text-purple-500" />,
    color: 'bg-purple-50',
  },
  {
    title: 'Pending Payments',
    value: 12,
    change: 5,
    trend: 'up',
    icon: <DollarSign className="h-5 w-5 text-green-500" />,
    color: 'bg-green-50',
  },
  {
    title: 'Completed Tasks',
    value: 86,
    change: 12,
    trend: 'up',
    icon: <CheckCircle className="h-5 w-5 text-amber-500" />,
    color: 'bg-amber-50',
  },
  {
    title: 'Overdue Payments',
    value: 3,
    change: 1,
    trend: 'up',
    icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    color: 'bg-red-50',
  },
];

const clientStatusData = {
  active: 15,
  idle: 7,
  gone: 2,
};

const taskStatusData = {
  requirements: 5,
  quote: 3,
  approved: 2,
  progress: 6,
  submitted: 2,
  feedback: 3,
  complete: 12,
};

const paymentStatusData = {
  due: 4,
  invoiced: 5,
  pending: 3,
  received: 16,
  overdue: 2,
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}!
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((stat) => (
          <Card key={stat.title} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.color} p-2 rounded-full`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.trend === 'up' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-green-500 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-red-500 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change} {stat.trend === 'up' ? 'more' : 'less'}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Client Status Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Client Status</CardTitle>
            <CardDescription>Distribution of clients by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* We'd normally use a chart here, but we're keeping it simple for now */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="status-dot bg-status-active"></span>
                  <span>Active</span>
                </div>
                <span className="font-semibold">{clientStatusData.active}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="status-dot bg-status-idle"></span>
                  <span>Idle</span>
                </div>
                <span className="font-semibold">{clientStatusData.idle}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="status-dot bg-status-gone"></span>
                  <span>Gone</span>
                </div>
                <span className="font-semibold">{clientStatusData.gone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Status Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
            <CardDescription>Distribution of tasks by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(taskStatusData).map(([status, value]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`status-dot bg-status-${status}`}></span>
                    <span className="capitalize">{status.replace(/([A-Z])/g, ' $1')}</span>
                  </div>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Status Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Distribution of payments by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(paymentStatusData).map(([status, value]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`status-dot bg-status-${status}`}></span>
                    <span className="capitalize">{status}</span>
                  </div>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Task completed</p>
                  <p className="text-sm text-muted-foreground">Website redesign for Client XYZ</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Payment received</p>
                  <p className="text-sm text-muted-foreground">$1,200 from Client ABC</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium">New task created</p>
                  <p className="text-sm text-muted-foreground">Mobile app development for Client LMN</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks and payments due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">E-commerce website</p>
                    <span className="text-sm text-red-500 font-medium">Tomorrow</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Client PQR</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">Invoice #INV-2023-042</p>
                    <span className="text-sm text-amber-500 font-medium">3 days</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Client ABC - $2,500</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">CRM Integration</p>
                    <span className="text-sm text-blue-500 font-medium">Next week</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Client XYZ</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
