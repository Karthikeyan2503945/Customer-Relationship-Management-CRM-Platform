export const mockCustomers = [
  {
    id: 'cust_1',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Linear Co',
    email: 'john.doe@linear.app',
    phone: '+1 (555) 234-5678',
    status: 'active',
    assignedTo: 'Marcus Wright',
    revenue: 48000,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '2026-01-15T09:30:00Z',
    timeline: [
      { id: 1, type: 'note', text: 'Onboarded client, configured billing endpoints.', actor: 'Marcus Wright', date: '2026-01-16T10:00:00Z' },
      { id: 2, type: 'email', text: 'Sent welcome layout deck and pipeline manuals.', actor: 'Marcus Wright', date: '2026-01-15T14:30:00Z' }
    ]
  },
  {
    id: 'cust_2',
    firstName: 'Ravi',
    lastName: 'Kumar',
    company: 'Stripe Inc',
    email: 'ravi.kumar@stripe.com',
    phone: '+1 (555) 876-5432',
    status: 'active',
    assignedTo: 'John Connor',
    revenue: 120000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '2026-02-10T11:20:00Z',
    timeline: [
      { id: 1, type: 'call', text: 'Contract renewal discussion. Client requested 10% volume discount.', actor: 'John Connor', date: '2026-06-05T16:00:00Z' }
    ]
  },
  {
    id: 'cust_3',
    firstName: 'Teju',
    lastName: 'Sharma',
    company: 'Figma Corp',
    email: 'teju.sharma@figma.com',
    phone: '+1 (555) 456-7890',
    status: 'inactive',
    assignedTo: 'Marcus Wright',
    revenue: 35000,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '2025-11-02T14:00:00Z',
    timeline: [
      { id: 1, type: 'status', text: 'Account moved to inactive due to budget cuts.', actor: 'System', date: '2026-05-01T08:00:00Z' }
    ]
  },
  {
    id: 'cust_4',
    firstName: 'Amit',
    lastName: 'Patel',
    company: 'Vercel Group',
    email: 'amit.patel@vercel.com',
    phone: '+1 (555) 345-6789',
    status: 'active',
    assignedTo: 'John Connor',
    revenue: 95000,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '2026-03-22T10:15:00Z',
    timeline: []
  },
  {
    id: 'cust_5',
    firstName: 'Priya',
    lastName: 'Singh',
    company: 'Retool Inc',
    email: 'priya.singh@retool.dev',
    phone: '+1 (555) 789-0123',
    status: 'lead',
    assignedTo: 'Sarah Connor',
    revenue: 0,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '2026-05-18T15:40:00Z',
    timeline: []
  }
];
