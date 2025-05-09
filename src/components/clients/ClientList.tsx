
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Client, ClientStatus } from '@/types';
import { Edit, MoreVertical, Trash2, Send, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

// Mock data for client list
const mockClients: Client[] = [
  {
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
  {
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
  {
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
];

interface ClientListProps {
  onEdit: (clientId: string) => void;
}

const ClientList: React.FC<ClientListProps> = ({ onEdit }) => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [createAccountDialogOpen, setCreateAccountDialogOpen] = useState(false);
  const [clientToCreateAccount, setClientToCreateAccount] = useState<Client | null>(null);
  const [password, setPassword] = useState('');

  const getStatusColor = (status: ClientStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'idle': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'gone': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getRowColor = (status: ClientStatus) => {
    switch (status) {
      case 'active': return 'border-l-4 border-l-green-500';
      case 'idle': return 'border-l-4 border-l-amber-500';
      case 'gone': return 'border-l-4 border-l-red-500';
      default: return '';
    }
  };

  const handleStatusChange = (clientId: string, newStatus: ClientStatus) => {
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, status: newStatus } : client
    ));
    toast.success(`Client status updated to ${newStatus}`);
  };

  const confirmDelete = (clientId: string) => {
    setClientToDelete(clientId);
    setDeleteDialogOpen(true);
  };
  
  const handleDelete = () => {
    if (clientToDelete) {
      setClients(clients.filter(client => client.id !== clientToDelete));
      toast.success('Client deleted successfully');
      setDeleteDialogOpen(false);
      setClientToDelete(null);
    }
  };

  const openCreateAccountDialog = (client: Client) => {
    setClientToCreateAccount(client);
    setCreateAccountDialogOpen(true);
  };

  const handleCreateAccount = () => {
    if (clientToCreateAccount) {
      // In a real application, this would create an account and send credentials
      setClients(clients.map(client => 
        client.id === clientToCreateAccount.id ? { ...client, hasAccount: true } : client
      ));
      toast.success(`Account credentials sent to ${clientToCreateAccount.email}`);
      setCreateAccountDialogOpen(false);
      setClientToCreateAccount(null);
      setPassword('');
    }
  };

  const handleSendCredentials = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      toast.success(`Credentials resent to ${client.email}`);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Account</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className={getRowColor(client.status)}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`rounded-full px-2.5 text-xs font-semibold ${getStatusColor(client.status)}`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleStatusChange(client.id, 'active')}>
                      <Badge variant="outline" className={getStatusColor('active')}>Active</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(client.id, 'idle')}>
                      <Badge variant="outline" className={getStatusColor('idle')}>Idle</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(client.id, 'gone')}>
                      <Badge variant="outline" className={getStatusColor('gone')}>Gone</Badge>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                {client.hasAccount ? (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Has Account
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    No Account
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(client.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {client.hasAccount ? (
                      <DropdownMenuItem onClick={() => handleSendCredentials(client.id)}>
                        <Send className="mr-2 h-4 w-4" />
                        Resend Credentials
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => openCreateAccountDialog(client)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Account
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-destructive" onClick={() => confirmDelete(client.id)}>
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
              Are you sure you want to delete this client? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Account Dialog */}
      <Dialog open={createAccountDialogOpen} onOpenChange={setCreateAccountDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Client Account</DialogTitle>
            <DialogDescription>
              Create a new account for {clientToCreateAccount?.name}. An email with login details will be sent to {clientToCreateAccount?.email}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input type="text" id="username" value={clientToCreateAccount?.email || ''} disabled />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter temporary password" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateAccountDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateAccount} disabled={!password}>Create & Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientList;
