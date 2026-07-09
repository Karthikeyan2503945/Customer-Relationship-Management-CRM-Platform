export const mockNotifications = [
  {
    id: 'notif_1',
    title: 'New lead assigned',
    message: 'Ilkka Paananen has been assigned to you from Supercell.',
    type: 'lead',
    priority: 'high',
    isRead: false,
    createdAt: '10m ago'
  },
  {
    id: 'notif_2',
    title: 'Task due today',
    message: 'Follow up on Budget Approvals for Vercel Group is scheduled for today.',
    type: 'task',
    priority: 'high',
    isRead: false,
    createdAt: '2h ago'
  },
  {
    id: 'notif_3',
    title: 'System backup succeeded',
    message: 'Database automated copy has finished processing without exceptions.',
    type: 'system',
    priority: 'low',
    isRead: true,
    createdAt: '1d ago'
  },
  {
    id: 'notif_4',
    title: 'Deal Won!',
    message: 'Sarah Connor successfully closed the Figma Corp design contract!',
    type: 'lead',
    priority: 'medium',
    isRead: true,
    createdAt: '3d ago'
  }
];
