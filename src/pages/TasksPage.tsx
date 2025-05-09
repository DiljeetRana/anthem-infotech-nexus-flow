
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import TaskList from '@/components/tasks/TaskList';
import AddTaskDialog from '@/components/tasks/AddTaskDialog';
import { Task, TaskStatus } from '@/types';

// Mock data for tasks
const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Website Redesign",
    clientId: "client-1",
    description: "Complete redesign of the client's e-commerce website with new branding",
    status: "requirements",
    estimatedHours: 40,
    estimatedCost: 4000,
    createdAt: new Date(2025, 4, 1),
    updatedAt: new Date(2025, 4, 1),
    dueDate: new Date(2025, 4, 15)
  },
  {
    id: "task-2",
    title: "Mobile App Development",
    clientId: "client-2",
    description: "Create a native mobile app for iOS and Android platforms",
    status: "quote",
    estimatedHours: 120,
    estimatedCost: 12000,
    createdAt: new Date(2025, 4, 2),
    updatedAt: new Date(2025, 4, 2),
    dueDate: new Date(2025, 5, 15)
  },
  {
    id: "task-3",
    title: "API Integration",
    clientId: "client-3",
    description: "Integrate payment gateway into the client's platform",
    status: "approved",
    estimatedHours: 20,
    estimatedCost: 2000,
    createdAt: new Date(2025, 4, 3),
    updatedAt: new Date(2025, 4, 3),
    dueDate: new Date(2025, 4, 20)
  },
  {
    id: "task-4",
    title: "Database Optimization",
    clientId: "client-1",
    description: "Optimize database queries and improve performance",
    status: "progress",
    estimatedHours: 16,
    estimatedCost: 1600,
    createdAt: new Date(2025, 4, 4),
    updatedAt: new Date(2025, 4, 4),
    dueDate: new Date(2025, 4, 12)
  },
  {
    id: "task-5",
    title: "Security Audit",
    clientId: "client-4",
    description: "Perform security audit and implement fixes",
    status: "submitted",
    estimatedHours: 24,
    estimatedCost: 2400,
    createdAt: new Date(2025, 4, 5),
    updatedAt: new Date(2025, 4, 5),
    dueDate: new Date(2025, 4, 18)
  },
  {
    id: "task-6",
    title: "Content Migration",
    clientId: "client-2",
    description: "Migrate content from old CMS to new platform",
    status: "feedback",
    estimatedHours: 30,
    estimatedCost: 3000,
    createdAt: new Date(2025, 4, 6),
    updatedAt: new Date(2025, 4, 6),
    dueDate: new Date(2025, 4, 22)
  },
  {
    id: "task-7",
    title: "Email Template Design",
    clientId: "client-3",
    description: "Design and develop responsive email templates",
    status: "complete",
    estimatedHours: 10,
    estimatedCost: 1000,
    actualHours: 12,
    actualCost: 1200,
    createdAt: new Date(2025, 4, 7),
    updatedAt: new Date(2025, 4, 7),
    dueDate: new Date(2025, 4, 14),
    completedAt: new Date(2025, 4, 13)
  }
];

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  
  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };
  
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setTaskToEdit(null);
  };
  
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsAddDialogOpen(true);
  };
  
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          updatedAt: new Date(),
          ...(newStatus === 'complete' ? { completedAt: new Date() } : {})
        };
      }
      return task;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => {setTaskToEdit(null); setIsAddDialogOpen(true);}}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
          <CardDescription>
            Manage all project tasks and track their progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskList 
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        </CardContent>
      </Card>
      
      <AddTaskDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default TasksPage;
