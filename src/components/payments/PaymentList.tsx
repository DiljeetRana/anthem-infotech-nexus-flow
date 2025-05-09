
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Payment, PaymentStatus } from '@/types';
import { Edit, MoreVertical, Trash2, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Mock data for payment list
const mockPayments: Payment[] = [
  {
    id: '1',
    taskId: '101',
    clientId: '1',
    amount: 2500.00,
    status: 'due',
    dueDate: new Date('2023-06-30'),
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-15')
  },
  {
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
  {
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
  },
  {
    id: '4',
    taskId: '104',
    clientId: '3',
    amount: 1200.00,
    status: 'overdue',
    dueDate: new Date('2023-05-01'),
    invoiceNumber: 'INV-2023-003',
    invoicedAt: new Date('2023-04-01'),
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-04-01')
  },
  {
    id: '5',
    taskId: '105',
    clientId: '2',
    amount: 950.00,
    status: 'pending',
    dueDate: new Date('2023-07-30'),
    invoiceNumber: 'INV-2023-004',
    invoicedAt: new Date('2023-06-15'),
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: '6',
    taskId: '106',
    clientId: '3',
    amount: 500.00,
    status: 'canceled',
    dueDate: new Date('2023-06-15'),
    notes: 'Project canceled by client',
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-06-02')
  },
];

// Client name mapping
const clientNames: Record<string, string> = {
  '1': 'Acme Corporation',
  '2': 'Globex Industries',
  '3': 'Initech Solutions',
};

interface PaymentListProps {
  onEdit: (paymentId: string) => void;
}

const PaymentList: React.FC<PaymentListProps> = ({ onEdit }) => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<string | null>(null);

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'received': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'due': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'invoiced': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'pending': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'overdue': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'canceled': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getRowColor = (status: PaymentStatus) => {
    switch (status) {
      case 'received': return 'border-l-4 border-l-green-500';
      case 'due': return 'border-l-4 border-l-blue-500';
      case 'invoiced': return 'border-l-4 border-l-purple-500';
      case 'pending': return 'border-l-4 border-l-amber-500';
      case 'overdue': return 'border-l-4 border-l-red-500';
      case 'canceled': return 'border-l-4 border-l-gray-500';
      default: return '';
    }
  };

  const handleStatusChange = (paymentId: string, newStatus: PaymentStatus) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId ? { ...payment, status: newStatus, updatedAt: new Date() } : payment
    ));
    toast.success(`Payment status updated to ${newStatus}`);
  };

  const confirmDelete = (paymentId: string) => {
    setPaymentToDelete(paymentId);
    setDeleteDialogOpen(true);
  };
  
  const handleDelete = () => {
    if (paymentToDelete) {
      setPayments(payments.filter(payment => payment.id !== paymentToDelete));
      toast.success('Payment deleted successfully');
      setDeleteDialogOpen(false);
      setPaymentToDelete(null);
    }
  };

  const generateInvoice = (paymentId: string) => {
    // In a real app, this would generate a PDF invoice or similar
    toast.success('Invoice generated and ready to send');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Invoice #</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id} className={getRowColor(payment.status)}>
              <TableCell className="font-medium">{clientNames[payment.clientId]}</TableCell>
              <TableCell>{formatCurrency(payment.amount)}</TableCell>
              <TableCell>{format(payment.dueDate, 'MMM d, yyyy')}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`rounded-full px-2.5 text-xs font-semibold ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleStatusChange(payment.id, 'due')}>
                      <Badge variant="outline" className={getStatusColor('due')}>Due</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(payment.id, 'invoiced')}>
                      <Badge variant="outline" className={getStatusColor('invoiced')}>Invoiced</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(payment.id, 'pending')}>
                      <Badge variant="outline" className={getStatusColor('pending')}>Pending</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(payment.id, 'received')}>
                      <Badge variant="outline" className={getStatusColor('received')}>Received</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(payment.id, 'overdue')}>
                      <Badge variant="outline" className={getStatusColor('overdue')}>Overdue</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(payment.id, 'canceled')}>
                      <Badge variant="outline" className={getStatusColor('canceled')}>Canceled</Badge>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>{payment.invoiceNumber || '-'}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(payment.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => generateInvoice(payment.id)}>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Invoice
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => confirmDelete(payment.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this payment record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentList;
