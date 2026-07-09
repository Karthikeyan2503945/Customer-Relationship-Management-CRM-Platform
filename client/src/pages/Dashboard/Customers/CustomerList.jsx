import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Eye, UserPlus } from 'lucide-react';
import { selectCustomer, deleteCustomer, addCustomer } from '../../../redux/slices/customerSlice';
import { showToast } from '../../../components/ui/Toast';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Avatar from '../../../components/ui/Avatar';
import SearchBar from '../../../components/ui/SearchBar';
import DataTable from '../../../components/ui/DataTable';
import Pagination from '../../../components/ui/Pagination';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

export default function CustomerList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const customers = useSelector((state) => state.customer.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', phone: '', status: 'active', revenue: '' });

  // Filter & Search logic
  const filteredCustomers = customers.filter(c => {
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                          c.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRowClick = (customer) => {
    dispatch(selectCustomer(customer.id));
    navigate(`/customers/${customer.id}`);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteCustomer(id));
    showToast.success('Customer profile removed');
  };

  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      showToast.error('Please fill required fields');
      return;
    }
    dispatch(addCustomer({
      ...form,
      revenue: form.revenue ? Number(form.revenue) : 0
    }));
    showToast.success('New customer registered');
    setModalOpen(false);
    setForm({ firstName: '', lastName: '', company: '', email: '', phone: '', status: 'active', revenue: '' });
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} name={`${row.firstName} ${row.lastName}`} size="sm" />
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {row.firstName} {row.lastName}
          </span>
        </div>
      )
    },
    { key: 'company', label: 'Company' },
    { key: 'email', label: 'Email' },
    {
      key: 'revenue',
      label: 'Revenue',
      render: (row) => (
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          ₹{row.revenue.toLocaleString()}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const badgeVariants = {
          active: 'success',
          inactive: 'default',
          lead: 'primary',
        };
        return <Badge variant={badgeVariants[row.status]}>{row.status}</Badge>;
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRowClick(row)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => handleDelete(e, row.id)}
            className="p-1.5 rounded-full hover:bg-red-50 text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h1 font-black text-slate-900 dark:text-white">Customers Directory</h1>
          <p className="text-small text-slate-500">Search, filter, and review active client profiles.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} icon={<UserPlus className="h-4 w-4" />}>
          Register Client
        </Button>
      </div>

      {/* Filters card */}
      <Card className="p-4 bg-white dark:bg-slate-900 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search customers..." />
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Filter Status:</span>
          <Select
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'lead', label: 'Leads' }
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="!py-2 !px-3"
          />
        </div>
      </Card>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={filteredCustomers}
        emptyMessage="No customer records match your filters."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredCustomers.length}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
      />

      {/* Register Client Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register Client Profile">
        <form onSubmit={handleCreateCustomer} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Olivia" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
            <Input label="Last Name" placeholder="Rhye" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
          </div>
          <Input label="Company Name" placeholder="Linear Co" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          <Input label="Email Address" type="email" placeholder="olivia.rhye@linear.app" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Phone Number" placeholder="+1 (555) 234-5678" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Annual Contract Revenue (₹)" type="number" placeholder="48000" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} />
            <Select
              label="Status"
              options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'lead', label: 'Lead' }]}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Register Profile</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
