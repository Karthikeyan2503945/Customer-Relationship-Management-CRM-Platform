import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Mail, Phone, Building, Briefcase, Calendar, Info, Send } from 'lucide-react';
import { selectLead, addLeadTimeline } from '../../../redux/slices/leadSlice';
import { showToast } from '../../../components/ui/Toast';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Avatar from '../../../components/ui/Avatar';

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lead = useSelector((state) => state.lead.selectedLead);
  const currentUser = useSelector((state) => state.auth.user);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    dispatch(selectLead(id));
  }, [id, dispatch]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    dispatch(addLeadTimeline({
      leadId: id,
      text: noteText,
      actor: currentUser?.name || 'Marcus Wright'
    }));

    showToast.success('Timeline updated');
    setNoteText('');
  };

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <h2 className="text-h2 font-bold mb-4 text-red-500">Opportunity Not Found</h2>
        <Button variant="primary" onClick={() => navigate('/leads')}>
          Return to Leads
        </Button>
      </div>
    );
  }

  const stageColors = {
    qualification: 'primary',
    proposal: 'info',
    negotiation: 'warning',
    won: 'success',
    lost: 'danger',
  };

  const stageNames = {
    qualification: 'Qualification',
    proposal: 'Proposal Sent',
    negotiation: 'Negotiation',
    won: 'Closed Won',
    lost: 'Closed Lost',
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back link & Title */}
      <div>
        <Link to="/leads" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-4">
          <ArrowLeft className="h-3 w-3" />
          <span>Back to Leads Directory</span>
        </Link>
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-h1 font-black text-slate-900 dark:text-white leading-tight">
                {lead.title}
              </h1>
              <span className="text-xs text-slate-400">Registered {new Date(lead.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <Badge variant={stageColors[lead.stage]}>{stageNames[lead.stage]}</Badge>
        </div>
      </div>

      {/* Details layout grids */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left card */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 flex flex-col gap-5 h-fit">
          <h3 className="text-body font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Opportunity Details
          </h3>
          <div className="flex flex-col gap-4 text-small">
            <div className="flex items-center gap-3">
              <Building className="h-5 w-5 text-slate-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block">Account/Company</span>
                <span className="text-slate-600 dark:text-slate-300 font-semibold">{lead.company}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-slate-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block">Contact Name</span>
                <span className="text-slate-600 dark:text-slate-300 font-semibold">{lead.contactName}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-slate-400 shrink-0" />
              <span className="text-slate-600 dark:text-slate-300 truncate">{lead.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-slate-400 shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">{lead.phone || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-slate-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block">Source Channel</span>
                <Badge variant="default" className="mt-1">{lead.source}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-slate-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block">Next Follow-Up Date</span>
                <span className="text-slate-600 dark:text-slate-300 font-semibold">{lead.followUpDate || 'N/A'}</span>
              </div>
            </div>
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
            <div className="flex justify-between items-center text-xs text-slate-400 uppercase font-bold tracking-wider">
              <span>Deal Value</span>
              <span className="text-h3 font-black text-slate-800 dark:text-white">₹{lead.value.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Right timeline */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Notes logger */}
          <Card className="p-5 bg-white dark:bg-slate-900 border-slate-100">
            <h3 className="text-body font-bold text-slate-800 dark:text-white mb-4">Log Deal Negotiation Note</h3>
            <form onSubmit={handleAddNote} className="flex gap-3">
              <input
                type="text"
                placeholder="Log pipeline updates e.g. 'Contract proposal sent, waiting on VP callback...'"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="flex-1 px-4 py-2.5 text-body bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-input outline-none transition-all dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
              />
              <Button type="submit" variant="primary" icon={<Send className="h-4 w-4" />}>
                Log note
              </Button>
            </form>
          </Card>

          {/* Timeline Feed */}
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 flex-1">
            <h3 className="text-body font-bold text-slate-800 dark:text-white mb-6">Negotiation Timeline Log</h3>
            
            {lead.timeline.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                No pipeline updates logged yet.
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3.5 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                {lead.timeline.map((act) => (
                  <div key={act.id} className="relative pl-9 flex flex-col gap-1.5 text-small">
                    <span className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 bg-accent shadow-sm" />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        Updated by {act.actor}
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
