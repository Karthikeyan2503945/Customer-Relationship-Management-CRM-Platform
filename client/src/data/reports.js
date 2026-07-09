export const mockReportsData = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 45000, target: 40000, expenses: 15000 },
    { month: 'Feb', revenue: 52000, target: 42000, expenses: 16000 },
    { month: 'Mar', revenue: 61000, target: 45000, expenses: 18000 },
    { month: 'Apr', revenue: 58000, target: 45000, expenses: 17500 },
    { month: 'May', revenue: 71000, target: 50000, expenses: 22000 },
    { month: 'Jun', revenue: 84000, target: 55000, expenses: 25000 },
    { month: 'Jul', revenue: 95000, target: 60000, expenses: 28000 }
  ],
  salesPipelineFunnel: [
    { name: 'Qualification', value: 120000, count: 24, fill: '#3B82F6' },
    { name: 'Proposal Sent', value: 85000, count: 18, fill: '#06B6D4' },
    { name: 'Negotiation', value: 55000, count: 10, fill: '#F59E0B' },
    { name: 'Won', value: 48000, count: 8, fill: '#22C55E' }
  ],
  performanceByExecutive: [
    { name: 'Sarah Connor', dealsClosed: 32, salesValue: 240000, conversion: 22 },
    { name: 'Marcus Wright', dealsClosed: 28, salesValue: 185000, conversion: 18 },
    { name: 'John Connor', dealsClosed: 14, salesValue: 95000, conversion: 14 },
    { name: 'Kate Brewster', dealsClosed: 18, salesValue: 110000, conversion: 16 }
  ],
  customerSegments: [
    { name: 'Enterprise', value: 45, color: '#3B82F6' },
    { name: 'Mid-Market', value: 30, color: '#06B6D4' },
    { name: 'SMB', value: 25, color: '#10B981' }
  ]
};
