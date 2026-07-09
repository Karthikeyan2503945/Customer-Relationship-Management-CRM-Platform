import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { FileSpreadsheet, Download, Users, TrendingUp, Calendar, Filter } from 'lucide-react';
import { showToast } from '../../../components/ui/Toast';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Select from '../../../components/ui/Select';
import DataTable from '../../../components/ui/DataTable';
import ErrorBoundary from '../../../components/Common/ErrorBoundary';

export default function AnalyticsDashboard() {
  const reportsData = useSelector((state) => state.report.data);
  const [teamFilter, setTeamFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  const handleExport = (format) => {
    showToast.success(`Generating ${format} report export...`);
    setTimeout(() => {
      showToast.success(`${format} report downloaded successfully.`);
    }, 1000);
  };

  const execColumns = [
    { key: 'name', label: 'Executive', render: (row) => <span className="font-bold">{row.name}</span> },
    { key: 'dealsClosed', label: 'Deals Closed' },
    { key: 'salesValue', label: 'Contract Value', render: (row) => <span>₹{row.salesValue.toLocaleString()}</span> },
    { key: 'conversion', label: 'Conversion Rate', render: (row) => <Badge variant="primary">{row.conversion}%</Badge> },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h1 font-black text-slate-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-small text-slate-500">Aggregate sales volumes, pipelines, and performance ratios.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" size="sm" onClick={() => handleExport('CSV')} icon={<FileSpreadsheet className="h-4 w-4" />}>
            Export Excel
          </Button>
          <Button variant="primary" size="sm" onClick={() => handleExport('PDF')} icon={<Download className="h-4 w-4" />}>
            Download PDF
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="p-4 bg-white dark:bg-slate-900 border-slate-100 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Filter className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Analytics Query Filters</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Select
            options={[
              { value: 'all', label: 'All Teams' },
              { value: 'north', label: 'North Regional' },
              { value: 'south', label: 'South Regional' }
            ]}
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="!py-2 !px-3"
          />
          <Select
            options={[
              { value: 'all', label: 'All Time' },
              { value: 'q1', label: 'Q1 Analytics' },
              { value: 'q2', label: 'Q2 Analytics' },
              { value: 'month', label: 'This Month' }
            ]}
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="!py-2 !px-3"
          />
        </div>
      </Card>

      {/* Revenue area chart */}
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 flex flex-col gap-4">
        <div>
          <h3 className="text-body font-bold text-slate-800 dark:text-white">Revenue Performance vs Expenses</h3>
          <span className="text-xs text-slate-400">Monthly breakdown of gross income against operating expenses</span>
        </div>
        <div className="h-[300px] w-full pt-4">
          <ErrorBoundary>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reportsData.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{ borderRadius: '14px', background: '#0F172A', border: 'none', color: '#F8FAFC' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fillOpacity={0.1} fill="#2563EB" name="Revenue (₹)" />
                <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} fillOpacity={0.05} fill="#EF4444" name="Expenses (₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </ErrorBoundary>
        </div>
      </Card>

      {/* Pipeline Funnel & Executive Performance Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pipeline Funnel */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 flex flex-col gap-4">
          <div>
            <h3 className="text-body font-bold text-slate-800 dark:text-white">Pipeline stage valuations</h3>
            <span className="text-xs text-slate-400">Total deal weights in progress</span>
          </div>
          <div className="h-[250px] w-full pt-4">
            <ErrorBoundary>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportsData.salesPipelineFunnel}>
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <RechartsTooltip contentStyle={{ borderRadius: '14px', background: '#0F172A', border: 'none', color: '#F8FAFC' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={36}>
                    {reportsData.salesPipelineFunnel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ErrorBoundary>
          </div>
        </Card>

        {/* Executive Table */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 flex flex-col gap-4">
          <div>
            <h3 className="text-body font-bold text-slate-800 dark:text-white">Executive Sales Audit</h3>
            <span className="text-xs text-slate-400">Conversion efficiency metrics per representative</span>
          </div>
          <div className="flex-1 mt-4">
            <DataTable
              columns={execColumns}
              data={reportsData.performanceByExecutive}
              emptyMessage="No performance data available."
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
