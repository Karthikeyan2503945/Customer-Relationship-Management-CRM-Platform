import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Target, CheckCircle, TrendingUp, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { updateLeadStage, addLead, deleteLead } from '../../../redux/slices/leadSlice';
import { showToast } from '../../../components/ui/Toast';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

export default function LeadBoard() {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.lead.items);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', company: '', value: '', stage: 'qualification', priority: 'medium' });

  const columns = [
    { key: 'qualification', label: 'Qualification', color: 'border-t-blue-500 bg-blue-500/5' },
    { key: 'proposal', label: 'Proposal Sent', color: 'border-t-cyan-500 bg-cyan-500/5' },
    { key: 'negotiation', label: 'Negotiation', color: 'border-t-yellow-500 bg-yellow-500/5' },
    { key: 'won', label: 'Closed Won', color: 'border-t-success bg-success/5' },
    { key: 'lost', label: 'Closed Lost', color: 'border-t-danger bg-danger/5' },
  ];

  // Drag and Drop
  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('text/plain', leadId);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, stage) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) {
      dispatch(updateLeadStage({ leadId, stage }));
      showToast.success(`Opportunity moved to ${stage.replace('_', ' ')}`);
    }
  };

  const handleDeleteOpportunity = (id) => {
    dispatch(deleteLead(id));
    showToast.success('Opportunity removed from pipeline');
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!form.title || !form.value) {
      showToast.error('Please enter opportunity title and contract value');
      return;
    }
    dispatch(addLead({
      ...form,
      value: Number(form.value)
    }));
    showToast.success('Opportunity added to pipeline');
    setModalOpen(false);
    setForm({ title: '', company: '', value: '', stage: 'qualification', priority: 'medium' });
  };

  const getPriorityBadgeVariant = (priority) => {
    const variants = {
      high: 'danger',
      medium: 'warning',
      low: 'success',
    };
    return variants[priority] || 'default';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h1 font-black text-slate-900 dark:text-white">Sales Pipeline</h1>
          <p className="text-small text-slate-500">Drag opportunities between stages to update negotiation phases.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} icon={<Plus className="h-4 w-4" />}>
          Add Deal
        </Button>
      </div>

      {/* Board columns grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start overflow-x-auto min-h-[550px] pb-6">
        {columns.map((col) => {
          const colLeads = leads.filter(l => l.stage === col.key);
          const totalValue = colLeads.reduce((acc, curr) => acc + curr.value, 0);
          
          return (
            <div
              key={col.key}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.key)}
              className={`flex flex-col h-full rounded-card border border-slate-100 dark:border-slate-800 p-4 min-h-[500px] transition-colors border-t-4 ${col.color} shrink-0 w-full sm:min-w-[220px]`}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-body font-bold text-slate-800 dark:text-slate-200">{col.label}</span>
                  <span className="text-xs text-slate-400 font-medium">
                    {colLeads.length} {colLeads.length === 1 ? 'deal' : 'deals'}
                  </span>
                </div>
                <span className="text-small font-black text-slate-700 dark:text-slate-300">
                  ₹{(totalValue / 1000).toFixed(0)}k
                </span>
              </div>

              {/* Column list */}
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    onDragEnd={handleDragEnd}
                    className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-card shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-small font-extrabold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug">
                        {lead.title}
                      </span>
                      <button
                        onClick={() => handleDeleteOpportunity(lead.id)}
                        className="p-1 rounded text-slate-400 hover:text-danger hover:bg-danger/5 transition-colors shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-1 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{lead.company}</span>
                      <span>Assigned: {lead.assignedTo}</span>
                    </div>

                    <div className="flex justify-between items-center mt-1 border-t border-slate-100 dark:border-slate-800/60 pt-2">
                      <Badge variant={getPriorityBadgeVariant(lead.priority)} className="text-[10px]">
                        {lead.priority}
                      </Badge>
                      <span className="text-small font-black text-slate-850 dark:text-slate-200">
                        ₹{lead.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
                {colLeads.length === 0 && (
                  <div className="text-center py-12 text-slate-400 text-xs border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                    Drag deals here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Deal Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Opportunity Deal">
        <form onSubmit={handleCreateLead} className="space-y-4">
          <Input label="Deal Opportunity Title" placeholder="SSO Integration Contract" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="Company/Account" placeholder="Linear Co" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          <Input label="Contract Value (₹)" type="number" placeholder="15000" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Stage"
              options={[
                { value: 'qualification', label: 'Qualification' },
                { value: 'proposal', label: 'Proposal Sent' },
                { value: 'negotiation', label: 'Negotiation' }
              ]}
              value={form.stage}
              onChange={(e) => setForm({ ...form, stage: e.target.value })}
            />
            <Select
              label="Priority"
              options={[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }]}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Create Deal</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
