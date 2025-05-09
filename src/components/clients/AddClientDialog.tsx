
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Client, ClientStatus } from '@/types';
import { toast } from 'sonner';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for client being edited
const mockClients: Record<string, Client> = {
  '1': {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acmecorp.com',
    phone: '555-123-4567',
    address: '123 Business St, Suite 100, Industry City, CA 94105',
    status: 'active',
    hasAccount: true,
    notes: 'Long-standing client with multiple projects',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-05-20')
  },
  '2': {
    id: '2',
    name: 'Globex Industries',
    email: 'info@globexindustries.com',
    phone: '555-987-6543',
    address: '456 Enterprise Ave, Corporate Park, NY 10001',
    status: 'idle',
    hasAccount: false,
    notes: 'New client, initial project completed',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-04-22')
  },
  '3': {
    id: '3',
    name: 'Initech Solutions',
    email: 'support@initechsolutions.com',
    phone: '555-246-8135',
    address: '789 Tech Blvd, Innovation District, TX 75001',
    status: 'gone',
    hasAccount: true,
    notes: 'No response for over 3 months',
    createdAt: new Date('2022-11-05'),
    updatedAt: new Date('2023-02-15')
  },
};

// Form schema for client
const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  status: z.enum(['active', 'idle', 'gone']),
  notes: z.string().optional(),
});

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string | null;
  onClientSaved: () => void;
}

const AddClientDialog: React.FC<AddClientDialogProps> = ({
  open,
  onOpenChange,
  clientId,
  onClientSaved,
}) => {
  const isEditing = !!clientId;
  
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      status: 'active' as ClientStatus,
      notes: '',
    }
  });

  useEffect(() => {
    if (clientId && mockClients[clientId]) {
      const client = mockClients[clientId];
      form.reset({
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
        status: client.status,
        notes: client.notes || '',
      });
    } else {
      form.reset({
        name: '',
        email: '',
        phone: '',
        address: '',
        status: 'active',
        notes: '',
      });
    }
  }, [clientId, form]);

  function onSubmit(values: z.infer<typeof clientSchema>) {
    // In a real app, this would communicate with an API
    console.log("Form values:", values);
    
    setTimeout(() => {
      toast.success(isEditing ? 'Client updated successfully' : 'Client added successfully');
      onOpenChange(false);
      onClientSaved();
    }, 500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Client' : 'Add New Client'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the client information below.' 
              : 'Fill in the client information to add a new client.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter client name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="client@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} />
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="idle">Idle</SelectItem>
                        <SelectItem value="gone">Gone</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Client address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Additional notes about this client" {...field} />
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
                {isEditing ? 'Update Client' : 'Add Client'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialog;
