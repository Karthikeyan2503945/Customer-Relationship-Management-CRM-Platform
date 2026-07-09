import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Eye, GitPullRequest } from 'lucide-react';
import { addLead, deleteLead } from '../../../redux/slices/leadSlice';
import { showToast } from '../../../components/ui/Toast';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import SearchBar from '../../../components/ui/SearchBar';
import DataTable from '../../../components/ui/DataTable';
import Pagination from '../../../components/ui/Pagination';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

export default function LeadList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const leads = useSelector((state) => state.lead.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', company: '', value: '', stage: 'qualification', priority: 'medium', contactName: '', email: '', phone: '', source: 'Web', dueDate: '', followUpDate: '' });

  // Filter logic
  const filteredLeads = leads.filter(l => {
    const titleMatch = l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       l.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const stageMatch = stageFilter === 'all' || l.stage === stageFilter;
    const priorityMatch = priorityFilter === 'all' || l.priority === priorityFilter;
    return titleMatch && stageMatch && priorityMatch;
  });

  const handleRowClick = (lead) => {
    navigate(`/leads/${lead.id}`);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteLead(id));
    showToast.success('Lead opportunity removed');
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!form.title || !form.value || !form.contactName || !form.email) {
      showToast.error('Please fill all required fields');
      return;
    }
    dispatch(addLead({
      ...form,
      value: Number(form.value)
    }));
    showToast.success('Opportunity created successfully');
    setModalOpen(false);
    setForm({ title: '', company: '', value: '', stage: 'qualification', priority: 'medium', contactName: '', email: '', phone: '', source: 'Web', dueDate: '', followUpDate: '' });
  };

  const getPriorityBadgeVariant = (priority) => {
    const variants = {
      high: 'danger',
      medium: 'warning',
      low: 'success',
    };
    return variants[priority] || 'default';
  };

  const columns = [
    { key: 'title', label: 'Opportunity', render: (row) => <span className="font-bold text-slate-800 dark:text-slate-200">{row.title}</span> },
    { key: 'company', label: 'Company' },
    { key: 'contactName', label: 'Contact Person' },
    { key: 'value', label: 'Deal Value', render: (row) => <span>₹{row.value.toLocaleString()}</span> },
    { key: 'source', label: 'Source' },
    {
      key: 'stage',
      label: 'Stage',
      render: (row) => {
        const stageNames = {
          qualification: 'Qualification',
          proposal: 'Proposal',
          negotiation: 'Negotiation',
          won: 'Closed Won',
          lost: 'Closed Lost',
        };
        const stageColors = {
          qualification: 'primary',
          proposal: 'info',
          negotiation: 'warning',
          won: 'success',
          lost: 'danger',
        };
        return <Badge variant={stageColors[row.stage]}>{stageNames[row.stage]}</Badge>;
      }
    },
    { key: 'priority', label: 'Priority', render: (row) => <Badge variant={getPriorityBadgeVariant(row.priority)}>{row.priority}</Badge> },
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
          <h1 className="text-h1 font-black text-slate-900 dark:text-white">Leads Directory</h1>
          <p className="text-small text-slate-500">Track contact channels, priority weights, and follow-up activities.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} icon={<Plus className="h-4 w-4" />}>
          Add Lead
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-white dark:bg-slate-900 border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search opportunities..." />
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Filters:</span>
          <Select
            options={[
              { value: 'all', label: 'All Stages' },
              { value: 'qualification', label: 'Qualification' },
              { value: 'proposal', label: 'Proposal Sent' },
              { value: 'negotiation', label: 'Negotiation' },
              { value: 'won', label: 'Closed Won' },
              { value: 'lost', label: 'Closed Lost' }
            ]}
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="!py-2 !px-3"
          />
          <Select
            options={[
              { value: 'all', label: 'All Priorities' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' }
            ]}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="!py-2 !px-3"
          />
        </div>
      </Card>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={filteredLeads}
        emptyMessage="No lead records match your search filters."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredLeads.length}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
      />

      {/* Add Lead Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register Opportunity Lead">
        <form onSubmit={handleCreateLead} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Deal Opportunity Title" placeholder="Enterprise licensing" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Input label="Company Name" placeholder="Retool Inc" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Contact Person" placeholder="Drew Cano" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} required />
            <Input label="Contact Email" type="email" placeholder="drew.cano@retool.dev" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Input label="Contact Phone" placeholder="+1 (555) 789-0123" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Deal Value (₹)" type="number" placeholder="12000" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} required />
            <Select
              label="Source Channel"
              options={[{ value: 'Web', label: 'Web' }, { value: 'Referral', label: 'Referral' }, { value: 'Cold Call', label: 'Cold Call' }, { value: 'LinkedIn', label: 'LinkedIn' }, { value: 'Email campaign', label: 'Email campaign' }]}
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
            />
            <Select
              label="Priority"
              options={[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }]}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Due Date" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            <Input label="Follow Up Date" type="date" value={form.followUpDate} onChange={(e) => setForm({ ...form, followUpDate: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Create Lead</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
