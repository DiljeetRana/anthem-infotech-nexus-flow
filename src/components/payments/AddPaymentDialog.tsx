
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Payment, PaymentStatus } from '@/types';
import { toast } from 'sonner';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

// Mock data for payment being edited
const mockPayments: Record<string, Payment> = {
  '1': {
    id: '1',
    taskId: '101',
    clientId: '1',
    amount: 2500.00,
    status: 'due',
    dueDate: new Date('2023-06-30'),
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-15')
  },
  '2': {
    id: '2',
    taskId: '102',
    clientId: '2',
    amount: 1800.00,
    status: 'invoiced',
    dueDate: new Date('2023-07-15'),
    invoiceNumber: 'INV-2023-002',
    invoicedAt: new Date('2023-06-01'),
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2023-06-01')
  },
  '3': {
    id: '3',
    taskId: '103',
    clientId: '1',
    amount: 3200.00,
    status: 'received',
    dueDate: new Date('2023-05-15'),
    invoiceNumber: 'INV-2023-001',
    invoicedAt: new Date('2023-04-15'),
    receivedAt: new Date('2023-05-10'),
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2023-05-10')
  }
};

// Mock data for clients and tasks
const mockClients = [
  { id: '1', name: 'Acme Corporation' },
  { id: '2', name: 'Globex Industries' },
  { id: '3', name: 'Initech Solutions' },
];

const mockTasks = [
  { id: '101', title: 'Website Redesign' },
  { id: '102', title: 'Mobile App Development' },
  { id: '103', title: 'SEO Optimization' },
  { id: '104', title: 'Brand Identity Update' },
  { id: '105', title: 'Content Marketing Campaign' },
  { id: '106', title: 'Email Newsletter Design' },
];

// Form schema for payment
const paymentSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  taskId: z.string().min(1, 'Task is required'),
  amount: z.coerce.number().positive('Amount must be positive'),
  status: z.enum(['due', 'invoiced', 'pending', 'received', 'overdue', 'canceled']),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  invoiceNumber: z.string().optional(),
  notes: z.string().optional(),
});

interface AddPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentId: string | null;
  onPaymentSaved: () => void;
}

const AddPaymentDialog: React.FC<AddPaymentDialogProps> = ({
  open,
  onOpenChange,
  paymentId,
  onPaymentSaved,
}) => {
  const isEditing = !!paymentId;
  
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      clientId: '',
      taskId: '',
      amount: 0,
      status: 'due' as PaymentStatus,
      dueDate: new Date(),
      invoiceNumber: '',
      notes: '',
    }
  });

  useEffect(() => {
    if (paymentId && mockPayments[paymentId]) {
      const payment = mockPayments[paymentId];
      form.reset({
        clientId: payment.clientId,
        taskId: payment.taskId,
        amount: payment.amount,
        status: payment.status,
        dueDate: payment.dueDate,
        invoiceNumber: payment.invoiceNumber || '',
        notes: payment.notes || '',
      });
    } else {
      form.reset({
        clientId: '',
        taskId: '',
        amount: 0,
        status: 'due',
        dueDate: new Date(),
        invoiceNumber: '',
        notes: '',
      });
    }
  }, [paymentId, form]);

  function onSubmit(values: z.infer<typeof paymentSchema>) {
    // In a real app, this would communicate with an API
    console.log("Form values:", values);
    
    setTimeout(() => {
      toast.success(isEditing ? 'Payment updated successfully' : 'Payment added successfully');
      onOpenChange(false);
      onPaymentSaved();
    }, 500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Payment' : 'Add New Payment'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the payment information below.' 
              : 'Fill in the payment information to create a new record.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockClients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taskId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select task" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockTasks.map((task) => (
                          <SelectItem key={task.id} value={task.id}>{task.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="due">Due</SelectItem>
                        <SelectItem value="invoiced">Invoiced</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="received">Received</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. INV-2023-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Additional notes about this payment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Payment' : 'Add Payment'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentDialog;
