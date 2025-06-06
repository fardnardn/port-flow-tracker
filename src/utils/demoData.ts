
// Demo account credentials for easy testing
export const demoAccounts = [
  {
    email: 'admin@trackport.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    company: 'TrackPort HQ'
  },
  {
    email: 'customer1@trackport.com',
    password: 'customer123',
    role: 'customer',
    name: 'ABC Electronics Corp',
    company: 'ABC Electronics'
  },
  {
    email: 'customer2@trackport.com',
    password: 'customer123',
    role: 'customer',
    name: 'Global Manufacturing Ltd',
    company: 'Global Manufacturing'
  },
  {
    email: 'driver1@trackport.com',
    password: 'driver123',
    role: 'driver',
    name: 'John Rodriguez',
    company: 'Fast Freight Logistics'
  },
  {
    email: 'driver2@trackport.com',
    password: 'driver123',
    role: 'driver',
    name: 'Maria Santos',
    company: 'Express Delivery Co'
  },
  {
    email: 'portstaff1@trackport.com',
    password: 'port123',
    role: 'port_staff',
    name: 'David Chen',
    company: 'TrackPort Operations'
  },
  {
    email: 'customs1@trackport.com',
    password: 'customs123',
    role: 'customs',
    name: 'Robert Johnson',
    company: 'Port Authority Customs'
  }
];

export const sampleShipments = [
  {
    shipment_number: 'TRK-2024-001',
    status: 'delivered',
    description: 'Electronics Components - Semiconductors and Circuit Boards',
    customer: 'ABC Electronics',
    driver: 'John Rodriguez',
    delivery_address: '123 Tech Boulevard, Silicon Valley, CA 94025'
  },
  {
    shipment_number: 'TRK-2024-002',
    status: 'in_transit',
    description: 'Automotive Parts - Engine Components and Transmissions',
    customer: 'Global Manufacturing',
    driver: 'Maria Santos',
    delivery_address: '456 Manufacturing Drive, Detroit, MI 48201'
  },
  {
    shipment_number: 'TRK-2024-003',
    status: 'cleared',
    description: 'Textile Materials - Cotton Fabrics and Synthetic Fibers',
    customer: 'Textile Solutions',
    delivery_address: '789 Textile Plaza, Charlotte, NC 28202'
  },
  {
    shipment_number: 'TRK-2024-004',
    status: 'flagged',
    description: 'Electronic Equipment - Laptops and Mobile Devices',
    customer: 'ABC Electronics',
    delivery_address: '321 Electronics Way, Austin, TX 73301'
  },
  {
    shipment_number: 'TRK-2024-005',
    status: 'arrived',
    description: 'Heavy Machinery - Industrial Equipment and Tools',
    customer: 'Global Manufacturing',
    delivery_address: '654 Industrial Blvd, Houston, TX 77002'
  }
];
