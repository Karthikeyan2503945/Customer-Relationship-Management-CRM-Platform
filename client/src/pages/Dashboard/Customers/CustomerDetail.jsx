import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Mail, Phone, Building, Briefcase, Plus, Send } from 'lucide-react';
import { selectCustomer, addCustomerTimeline } from '../../../redux/slices/customerSlice';
import { showToast } from '../../../components/ui/Toast';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Avatar from '../../../components/ui/Avatar';
import Input from '../../../components/ui/Input';

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customer = useSelector((state) => state.customer.selectedCustomer);
  const currentUser = useSelector((state) => state.auth.user);
  const [noteText, setNoteText] = useState('');

  // Fetch customer details on mount
  useEffect(() => {
    dispatch(selectCustomer(id));
  }, [id, dispatch]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    dispatch(addCustomerTimeline({
      customerId: id,
      type: 'note',
      text: noteText,
      actor: currentUser?.name || 'Marcus Wright'
    }));

    showToast.success('Note added to client timeline');
    setNoteText('');
  };

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <h2 className="text-h2 font-bold mb-4 text-red-500">Customer Profile Not Found</h2>
        <Button variant="primary" onClick={() => navigate('/customers')}>
          Return to Directory
        </Button>
      </div>
    );
  }

  const badgeVariants = {
    active: 'success',
    inactive: 'default',
    lead: 'primary',
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <Link to="/customers" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-4">
          <ArrowLeft className="h-3 w-3" />
          <span>Back to Customers Directory</span>
        </Link>
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <Avatar src={customer.avatar} name={`${customer.firstName} ${customer.lastName}`} size="lg" />
            <div>
              <h1 className="text-h1 font-black text-slate-900 dark:text-white leading-tight">
                {customer.firstName} {customer.lastName}
              </h1>
              <span className="text-xs text-slate-400">Created on {new Date(customer.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <Badge variant={badgeVariants[customer.status]}>{customer.status}</Badge>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contact Info Card */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 flex flex-col gap-5 h-fit">
          <h3 className="text-body font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Contact Information
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-small">
              <Mail className="h-5 w-5 text-slate-400 shrink-0" />
              <span className="text-slate-600 dark:text-slate-300 truncate">{customer.email}</span>
            </div>
            <div className="flex items-center gap-3 text-small">
              <Phone className="h-5 w-5 text-slate-400 shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">{customer.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-small">
              <Building className="h-5 w-5 text-slate-400 shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">{customer.company}</span>
            </div>
            <div className="flex items-center gap-3 text-small">
              <Briefcase className="h-5 w-5 text-slate-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block">Assigned Account Manager</span>
                <span className="text-slate-600 dark:text-slate-300 font-semibold">{customer.assignedTo}</span>
              </div>
            </div>
            <div className="mt-2 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Annual Value</span>
              <span className="text-h3 font-black text-slate-800 dark:text-white">₹{customer.revenue.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Timeline & Notes Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Notes editor */}
          <Card className="p-5 bg-white dark:bg-slate-900 border-slate-100">
            <h3 className="text-body font-bold text-slate-800 dark:text-white mb-4">Add Client Activity Note</h3>
            <form onSubmit={handleAddNote} className="flex gap-3">
              <input
                type="text"
                placeholder="Log activity details e.g., 'Met with billing manager, contract approved...'"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="flex-1 px-4 py-2.5 text-body bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-input outline-none transition-all dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
              />
              <Button type="submit" variant="primary" icon={<Send className="h-4 w-4" />}>
                Log Note
              </Button>
            </form>
          </Card>

          {/* Activity timeline feed */}
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 flex-1">
            <h3 className="text-body font-bold text-slate-800 dark:text-white mb-6">Activity Timeline History</h3>
            
            {customer.timeline.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                No logged timeline notes yet for this client.
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3.5 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                {customer.timeline.map((act) => (
                  <div key={act.id} className="relative pl-9 flex flex-col gap-1.5 text-small">
                    {/* Circle Indicator */}
                    <span className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 bg-primary shadow-sm" />
                    
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                        {act.type} by {act.actor}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(act.date).toLocaleDateString()} at {new Date(act.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-lg border border-slate-50 dark:border-slate-800/40">
                      {act.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
