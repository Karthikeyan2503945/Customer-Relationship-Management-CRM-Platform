import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TrendingUp,
  Users,
  Target,
  FileSpreadsheet,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  Award,
  ChevronRight,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { showToast } from '../../components/ui/Toast';
import { addCustomer } from '../../redux/slices/customerSlice';
import { addLead } from '../../redux/slices/leadSlice';
import { addTask } from '../../redux/slices/taskSlice';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Avatar from '../../components/ui/Avatar';
import ErrorBoundary from '../../components/Common/ErrorBoundary';

export default function Overview() {
  const dispatch = useDispatch();
  
  // Load data from Redux Slices
  const kpis = useSelector((state) => state.dashboard.data.kpis);
  const activities = useSelector((state) => state.dashboard.data.recentActivities);
  const meetings = useSelector((state) => state.dashboard.data.upcomingMeetings) || [];
  const followups = useSelector((state) => state.dashboard.data.todaysFollowups) || [];
  const topExec = useSelector((state) => state.dashboard.data.topSalesExecutive);
  const revenueTrend = useSelector((state) => state.report.data.monthlyRevenue);
  const segments = useSelector((state) => state.report.data.customerSegments);

  // Modal triggers
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  // Form states
  const [custForm, setCustForm] = useState({ firstName: '', lastName: '', company: '', email: '', phone: '', status: 'active' });
  const [leadForm, setLeadForm] = useState({ title: '', company: '', value: '', stage: 'qualification', priority: 'medium' });

  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!custForm.firstName || !custForm.lastName || !custForm.email) {
      showToast.error('Please fill required fields');
      return;
    }
    dispatch(addCustomer(custForm));
    showToast.success(`Registered customer ${custForm.firstName} ${custForm.lastName}`);
    setCustomerModalOpen(false);
    setCustForm({ firstName: '', lastName: '', company: '', email: '', phone: '', status: 'active' });
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!leadForm.title || !leadForm.value) {
      showToast.error('Please enter deal title and value');
      return;
    }
    dispatch(addLead({ ...leadForm, value: Number(leadForm.value) }));
    showToast.success(`Added pipeline opportunity: ${leadForm.title}`);
    setLeadModalOpen(false);
    setLeadForm({ title: '', company: '', value: '', stage: 'qualification', priority: 'medium' });
  };

  // KPI card structures
  const kpiCards = [
    { label: 'Monthly Revenue', value: `₹${(kpis.monthlyRevenue.value / 1000).toFixed(0)}k`, change: kpis.monthlyRevenue.change, target: `₹${(kpis.monthlyRevenue.target / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'text-primary bg-primary/10' },
    { label: 'Active Customers', value: kpis.activeCustomers.value, change: kpis.activeCustomers.change, target: kpis.activeCustomers.target, icon: Users, color: 'text-success bg-success/10' },
    { label: 'Active Leads', value: kpis.activeLeads.value, change: kpis.activeLeads.change, target: kpis.activeLeads.target, icon: Target, color: 'text-accent bg-accent/10' },
    { label: 'Closed Deals', value: kpis.closedDeals.value, change: kpis.closedDeals.change, target: kpis.closedDeals.target, icon: FileSpreadsheet, color: 'text-warning bg-warning/10' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h1 font-black text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-small text-slate-500 dark:text-slate-400">Manage customers, lead pipeline negotiations, and representative audits.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setCustomerModalOpen(true)} icon={<Plus className="h-4 w-4" />}>
            New Customer
          </Button>
          <Button variant="primary" size="sm" onClick={() => setLeadModalOpen(true)} icon={<Plus className="h-4 w-4" />}>
            New Opportunity
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          const isPositive = card.change >= 0;
          return (
            <Card key={idx} className="p-5 flex items-center justify-between bg-white dark:bg-slate-900 border-slate-100">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{card.label}</span>
                <span className="text-h2 font-black text-slate-900 dark:text-white">{card.value}</span>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className={`inline-flex items-center font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
                    {isPositive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                    {isPositive ? '+' : ''}{card.change}%
                  </span>
                  <span className="text-slate-400">target {card.target}</span>
                </div>
              </div>
              <div className={`p-3.5 rounded-button shrink-0 ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <Card className="p-6 lg:col-span-2 bg-white dark:bg-slate-900 border-slate-100 flex flex-col gap-4">
          <div>
            <h3 className="text-body font-bold text-slate-800 dark:text-white">Annual Sales Performance</h3>
            <span className="text-xs text-slate-400">Gross revenue earnings vs target limits</span>
          </div>
          <div className="h-[280px] w-full pt-4">
            <ErrorBoundary>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <RechartsTooltip contentStyle={{ borderRadius: '14px', background: '#0F172A', border: 'none', color: '#F8FAFC' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGrad)" name="Revenue (₹)" />
                  <Area type="monotone" dataKey="target" stroke="#06B6D4" strokeWidth={1.5} strokeDasharray="5 5" fillOpacity={0} name="Target (₹)" />
                </AreaChart>
              </ResponsiveContainer>
            </ErrorBoundary>
          </div>
        </Card>

        {/* Customer segments Bar Chart */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-body font-bold text-slate-800 dark:text-white">Customer Segments</h3>
            <span className="text-xs text-slate-400">Portfolio proportions by client size</span>
          </div>
          <div className="h-[180px] w-full my-4">
            <ErrorBoundary>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={segments} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} width={80} />
                  <RechartsTooltip contentStyle={{ borderRadius: '14px', background: '#0F172A', border: 'none', color: '#F8FAFC' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                    {segments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ErrorBoundary>
          </div>
          <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
            {segments.map((seg, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                <span>{seg.name} ({seg.value}%)</span>
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* 3-Column Info Feed Section (Meetings, Follow-ups, Top Performer, Activities) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left: Recent Activity Feed */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 flex flex-col gap-5">
          <h3 className="text-body font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Recent Activity Feed</span>
          </h3>
          <div className="space-y-4 flex-1">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-small">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div className="flex-1">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{act.user}</span>{' '}
                  <span className="text-slate-500 dark:text-slate-400">{act.detail}</span>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap shrink-0">{act.date}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Middle: Meetings & Today's Follow-ups */}
        <div className="flex flex-col gap-6">
          {/* Upcoming Meetings */}
          <Card className="p-5 bg-white dark:bg-slate-900 border-slate-100">
            <h3 className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest mb-3.5 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-accent" />
              <span>Upcoming Meetings</span>
            </h3>
            <div className="space-y-3">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="flex items-start gap-3 text-small p-2.5 rounded-lg bg-slate-50/50 dark:bg-slate-950/20 border border-slate-50 dark:border-slate-800/40">
                  <div className="flex-1">
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">{meeting.title}</span>
                    <span className="text-xs text-slate-500">{meeting.contact} &bull; {meeting.company}</span>
                  </div>
                  <span className="text-[10px] bg-accent/15 text-accent font-bold px-2 py-0.5 rounded-full shrink-0">
                    {meeting.date.split(' at ')[1] || meeting.date}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Today's Follow-ups */}
          <Card className="p-5 bg-white dark:bg-slate-900 border-slate-100">
            <h3 className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest mb-3.5 flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-warning" />
              <span>Today's Follow-ups</span>
            </h3>
            <div className="space-y-3">
              {followups.map((fup) => (
                <div key={fup.id} className="text-small p-2.5 rounded-lg bg-slate-50/50 dark:bg-slate-950/20 border border-slate-50 dark:border-slate-800/40 flex justify-between items-center">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-850 dark:text-slate-200 leading-snug">{fup.company}</span>
                    <span className="text-xs text-slate-500 leading-tight">{fup.text}</span>
                  </div>
                  <Badge variant="warning" className="text-[9px] shrink-0">{fup.time}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Top Sales Executive Card */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <h3 className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest mb-6 flex justify-center items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-yellow-500" />
              <span>Top Performer</span>
            </h3>
            
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <Avatar src={topExec.avatar} name={topExec.name} size="xl" className="border-4 border-yellow-400 shadow-lg" />
                <span className="absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center text-slate-900 text-xs font-bold">1</span>
              </div>
              <div className="flex flex-col mt-2">
                <span className="text-body font-black text-slate-800 dark:text-white leading-tight">{topExec.name}</span>
                <span className="text-xs text-slate-500">{topExec.title}</span>
              </div>
            </div>
          </div>

          <div className="w-full bg-slate-50 dark:bg-slate-950/30 p-4 border border-slate-100 dark:border-slate-800 rounded-button mt-6 flex justify-around items-center">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Deals</span>
              <span className="text-body font-black text-slate-800 dark:text-white">{topExec.dealsClosed} Won</span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-850" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Revenue Closed</span>
              <span className="text-body font-black text-slate-800 dark:text-white">₹{(topExec.salesValue / 1000).toFixed(0)}k</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 6. CREATE CUSTOMER MODAL */}
      <Modal isOpen={customerModalOpen} onClose={() => setCustomerModalOpen(false)} title="Register New Customer">
        <form onSubmit={handleCreateCustomer} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Olivia" value={custForm.firstName} onChange={(e) => setCustForm({ ...custForm, firstName: e.target.value })} required />
            <Input label="Last Name" placeholder="Rhye" value={custForm.lastName} onChange={(e) => setCustForm({ ...custForm, lastName: e.target.value })} required />
          </div>
          <Input label="Company Name" placeholder="Linear Co" value={custForm.company} onChange={(e) => setCustForm({ ...custForm, company: e.target.value })} />
          <Input label="Email Address" type="email" placeholder="olivia.rhye@linear.app" value={custForm.email} onChange={(e) => setCustForm({ ...custForm, email: e.target.value })} required />
          <Input label="Phone Number" placeholder="+1 (555) 234-5678" value={custForm.phone} onChange={(e) => setCustForm({ ...custForm, phone: e.target.value })} />
          <Select
            label="Initial Status"
            options={[{ value: 'active', label: 'Active Customer' }, { value: 'inactive', label: 'Inactive Customer' }, { value: 'lead', label: 'Sales Lead' }]}
            value={custForm.status}
            onChange={(e) => setCustForm({ ...custForm, status: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={() => setCustomerModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Register</Button>
          </div>
        </form>
      </Modal>

      {/* 7. CREATE LEAD MODAL */}
      <Modal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} title="Add Deal Opportunity">
        <form onSubmit={handleCreateLead} className="space-y-4">
          <Input label="Deal Opportunity Title" placeholder="SSO Integration Contract" value={leadForm.title} onChange={(e) => setLeadForm({ ...leadForm, title: e.target.value })} required />
          <Input label="Company/Account" placeholder="Stripe Inc" value={leadForm.company} onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })} />
          <Input label="Deal Value (₹)" type="number" placeholder="45000" value={leadForm.value} onChange={(e) => setLeadForm({ ...leadForm, value: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Pipeline Stage"
              options={[
                { value: 'qualification', label: 'Qualification' },
                { value: 'proposal', label: 'Proposal Sent' },
                { value: 'negotiation', label: 'Negotiation' }
              ]}
              value={leadForm.stage}
              onChange={(e) => setLeadForm({ ...leadForm, stage: e.target.value })}
            />
            <Select
              label="Priority"
              options={[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }]}
              value={leadForm.priority}
              onChange={(e) => setLeadForm({ ...leadForm, priority: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={() => setLeadModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Add Opportunity</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
