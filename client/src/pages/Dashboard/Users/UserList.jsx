import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Trash2, Edit2, ShieldAlert, UserCheck } from 'lucide-react';
import { adminAddUser, adminUpdateUser, adminDeleteUser } from '../../../redux/slices/authSlice';
import { showToast } from '../../../components/ui/Toast';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Avatar from '../../../components/ui/Avatar';
import DataTable from '../../../components/ui/DataTable';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

export default function UserList() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.auth.allUsers);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  const [form, setForm] = useState({ name: '', email: '', role: 'sales_executive', title: '' });
  const [editForm, setEditForm] = useState({ id: '', name: '', email: '', role: 'sales_executive', title: '' });

  const handleDelete = (id) => {
    dispatch(adminDeleteUser(id));
    showToast.success('User account removed');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      showToast.error('Please enter name and email');
      return;
    }
    dispatch(adminAddUser(form));
    showToast.success('New representative added to workspace');
    setModalOpen(false);
    setForm({ name: '', email: '', role: 'sales_executive', title: '' });
  };

  const handleEditClick = (user) => {
    setEditForm(user);
    setEditModalOpen(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(adminUpdateUser(editForm));
    showToast.success('User details updated');
    setEditModalOpen(false);
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'danger',
      sales_manager: 'warning',
      sales_executive: 'primary',
    };
    return badges[role] || 'default';
  };

  const columns = [
    {
      key: 'name',
      label: 'Representative',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} name={row.name} size="sm" />
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 dark:text-slate-200">{row.name}</span>
            <span className="text-[11px] text-slate-400">{row.title || 'Sales Representative'}</span>
          </div>
        </div>
      )
    },
    { key: 'email', label: 'Email Address' },
    {
      key: 'role',
      label: 'Role Level',
      render: (row) => <Badge variant={getRoleBadge(row.role)}>{row.role?.replace('_', ' ')}</Badge>
    },
    {
      key: 'status',
      label: 'Status',
      render: () => (
        <span className="inline-flex items-center gap-1.5 text-xs text-success font-semibold">
          <span className="h-2 w-2 rounded-full bg-success" />
          <span>Active</span>
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditClick(row)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
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
          <h1 className="text-h1 font-black text-slate-900 dark:text-white">Representative Directory</h1>
          <p className="text-small text-slate-500">Configure role levels (Admin, Manager, Executive) and monitor access.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} icon={<Plus className="h-4 w-4" />}>
          Add User
        </Button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={allUsers}
        emptyMessage="No representatives registered in workspace."
      />

      {/* Add User Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register Representative Profile">
        <form onSubmit={handleAddUser} className="space-y-4">
          <Input label="Full Name" placeholder="Kate Brewster" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email Address" type="email" placeholder="kate.brewster@crm360.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Job Title" placeholder="Senior Sales Agent" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Select
            label="Security Access Role"
            options={[
              { value: 'sales_executive', label: 'Sales Executive (Basic Operations)' },
              { value: 'sales_manager', label: 'Sales Manager (Can view Reports)' },
              { value: 'admin', label: 'Administrator (Full Access)' }
            ]}
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Create Account</Button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Modify Representative details">
        <form onSubmit={handleUpdateUser} className="space-y-4">
          <Input label="Full Name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required />
          <Input label="Email Address" type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} required />
          <Input label="Job Title" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
          <Select
            label="Security Access Role"
            options={[
              { value: 'sales_executive', label: 'Sales Executive (Basic Operations)' },
              { value: 'sales_manager', label: 'Sales Manager (Can view Reports)' },
              { value: 'admin', label: 'Administrator (Full Access)' }
            ]}
            value={editForm.role}
            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
