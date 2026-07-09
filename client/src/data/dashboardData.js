export const mockDashboardData = {
  kpis: {
    monthlyRevenue: { value: 298000, change: 12.4, target: 350000 },
    activeCustomers: { value: 1420, change: 8.2, target: 1500 },
    activeLeads: { value: 84, change: -2.3, target: 100 },
    pendingTasks: { value: 18, change: -15.0, target: 0 },
    closedDeals: { value: 92, change: 24.5, target: 80 },
    conversionRate: { value: 18.6, change: 4.1, target: 20.0 }
  },
  recentActivities: [
    { id: 1, type: 'deal_won', user: 'Sarah Connor', detail: 'Closed enterprise contract with Stripe Inc.', date: '10m ago' },
    { id: 2, type: 'lead_assigned', user: 'System', detail: 'New lead from Retool Inc assigned to Marcus Wright.', date: '45m ago' },
    { id: 3, type: 'task_completed', user: 'John Connor', detail: 'Completed follow-up sync draft with Linear Co.', date: '2h ago' },
    { id: 4, type: 'customer_added', user: 'Marcus Wright', detail: 'Registered Drew Cano from Figma Corp.', date: '5h ago' }
  ],
  upcomingDeadlines: [
    { id: 1, title: 'Contract Proposal due', customer: 'Stripe Inc', date: 'Tomorrow at 10 AM', status: 'pending' },
    { id: 2, title: 'SSO setup checklist review', customer: 'Linear Co', date: 'Jul 15 at 2 PM', status: 'pending' }
  ],
  upcomingMeetings: [
    { id: 1, title: 'SSO Sync Call', contact: 'Olivia Rhye', company: 'Linear Co', date: 'July 10 at 10:00 AM' },
    { id: 2, title: 'API Upgrade Review', contact: 'Phoenix Baker', company: 'Stripe Inc', date: 'July 12 at 2:00 PM' }
  ],
  todaysFollowups: [
    { id: 1, text: 'Confirm contract budget release with Demi Wilkinson.', company: 'Vercel Group', time: 'Before 5 PM' },
    { id: 2, text: 'Email details regarding consulting scope to Lana Steiner.', company: 'Figma Corp', time: 'Before noon' }
  ],
  topSalesExecutive: {
    name: 'Sarah Connor',
    dealsClosed: 32,
    salesValue: 240000,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    title: 'Operations Director'
  }
};
