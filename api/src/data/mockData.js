const mockData = {
  stats: {
    activeVehicles: 24,
    newLeads: 20,
    websiteOnly: 8,
    autoTraderPublished: 16,
    financeEnabled: 20,
    vehicleInquiries: 8
  },
  recentActivity: [
    { id: 1, title: '2023 BMW M4 Competition', description: 'Vehicle added', time: '2 hours ago', type: 'added' },
    { id: 2, title: '2021 Porsche 911 GT3', description: 'Vehicle updated', time: '4 hours ago', type: 'updated' },
    { id: 3, title: '2022 Mercedes-AMG GT 63 S', description: 'Marked as sold', time: '6 hours ago', type: 'sold' },
    { id: 4, title: '2020 Audi RS6 Avant', description: 'Finance enabled', time: '8 hours ago', type: 'finance' },
    { id: 5, title: '2023 Range Rover Sport', description: 'Published to Auto Trader', time: '1 day ago', type: 'published' },
    { id: 6, title: '2024 Ferrari F8 Tributo', description: 'Vehicle added', time: '1 day ago', type: 'added' }
  ],
  vehicles: [
    {
      id: 1,
      make: 'BMW',
      model: 'M4 Competition',
      year: 2023,
      registration: 'BX23 KLM',
      price: 75995,
      finance: true,
      autotrader: true,
      website: true,
      status: 'Live',
      updated: '2 hours ago',
      image: '/vehicles/m4.jpg'
    },
    {
      id: 2,
      make: 'Porsche',
      model: '911 GT3',
      year: 2021,
      registration: 'PO21 RSH',
      price: 145000,
      finance: true,
      autotrader: true,
      website: true,
      status: 'Live',
      updated: '4 hours ago',
      image: '/vehicles/911.jpg'
    },
    {
      id: 3,
      make: 'Mercedes-AMG',
      model: 'GT 63 S',
      year: 2022,
      registration: 'MR22 AMG',
      price: 125500,
      finance: false,
      autotrader: false,
      website: true,
      status: 'Sold',
      updated: '6 hours ago',
      image: '/vehicles/gt63s.jpg'
    },
    {
      id: 4,
      make: 'Audi',
      model: 'RS6 Avant',
      year: 2020,
      registration: 'AU20 RSX',
      price: 68995,
      finance: true,
      autotrader: true,
      website: true,
      status: 'Live',
      updated: '1 day ago',
      image: '/vehicles/rs6.jpg'
    },
    {
      id: 5,
      make: 'Range Rover',
      model: 'Sport',
      year: 2023,
      registration: 'RR23 SVR',
      price: 95000,
      finance: true,
      autotrader: true,
      website: true,
      status: 'Live',
      updated: '1 day ago',
      image: '/vehicles/rr_sport.jpg'
    },
    {
      id: 6,
      make: 'Ferrari',
      model: 'F8 Tributo',
      year: 2024,
      registration: 'FE21 RRI',
      price: 225000,
      finance: false,
      autotrader: false,
      website: true,
      status: 'Draft',
      updated: '2 days ago',
      image: '/vehicles/f8.jpg'
    }
  ],
  leads: [
    {
      id: 1,
      date: '2024-03-01',
      registration: 'BX20 ABC',
      mileage: '15,000 miles',
      valuation: '£18,500',
      name: 'John Smith',
      contact: '07700 900123 / john.smith@email.com',
      status: 'New'
    },
    {
      id: 2,
      date: '2024-02-28',
      registration: 'PO19 RSH',
      mileage: '20,000 miles',
      valuation: '£52,000',
      name: 'Sarah Johnson',
      contact: '07700 900456 / sarah.j@email.com',
      status: 'Contacted'
    },
    {
      id: 3,
      date: '2024-02-27',
      registration: 'MR21 AMG',
      mileage: '5,000 miles',
      valuation: '£89,000',
      name: 'David Brown',
      contact: '07700 900789 / d.brown@email.com',
      status: 'Closed'
    }
  ],
  users: [
    {
      id: 1,
      firstName: 'James',
      lastName: 'Wilson',
      email: 'admin@veloceautos.co.uk',
      password: 'admin123', // In a real app, this would be hashed
      phone: '+44 7700 900123',
      twoFactor: true
    }
  ]
};

module.exports = mockData;
