import { TProcurement } from '@/types/procurement.types'

export const dummyData: TProcurement[] = [
  {
    requisitionNo: 'REQ-001',
    requisitionDate: new Date('2024-10-01'),
    requestor: 'Sam Wilson',
    department: 'Engineering',
    expenseType: 'Office Supplies',
    purpose: 'Purchase office supplies for new hires',
    supplierVendorInformation: {
      name: 'ABC Supplies Co.',
      address: '123 Market Street',
      phoneNumber: '123-456-7890',
      expectedDate: new Date('2024-10-15')
    },
    items: [
      { name: 'Laptop', quantity: 2, unitPrice: 1000, totalPrice: 2000 },
      { name: 'Monitor', quantity: 2, unitPrice: 200, totalPrice: 400 }
    ],
    totalNetPrice: 2400,
    approvedBy: {
      level1: 'Jane Doe',
      level2: 'John Smith'
    },
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'APPROVED',
      finalStatus: 'APPROVED'
    }
  },
  {
    requisitionNo: 'REQ-002',
    requisitionDate: new Date('2024-09-20'),
    requestor: 'Alex Brown',
    department: 'Marketing',
    expenseType: 'Event',
    purpose: 'Purchase materials for marketing event',
    supplierVendorInformation: {
      name: 'Event Rentals Inc.',
      address: '456 Broadway',
      phoneNumber: '234-567-8901',
      expectedDate: new Date('2024-09-25')
    },
    items: [
      { name: 'Banner', quantity: 5, unitPrice: 50, totalPrice: 250 },
      { name: 'Flyers', quantity: 1000, unitPrice: 0.1, totalPrice: 100 }
    ],
    totalNetPrice: 350,
    approvedBy: {
      level1: 'Linda White'
    },
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'PENDING',
      finalStatus: 'PENDING'
    }
  },
  {
    requisitionNo: 'REQ-003',
    requisitionDate: new Date('2024-10-05'),
    requestor: 'Michael Green',
    department: 'HR',
    expenseType: 'Training',
    purpose: 'Purchase materials for employee training',
    supplierVendorInformation: {
      name: 'Training Hub',
      address: '789 1st Ave',
      phoneNumber: '345-678-9012',
      expectedDate: new Date('2024-10-10')
    },
    items: [
      { name: 'Training Book', quantity: 10, unitPrice: 15, totalPrice: 150 },
      { name: 'Notepads', quantity: 20, unitPrice: 2, totalPrice: 40 }
    ],
    totalNetPrice: 190,
    approvedBy: {
      level1: 'Sarah Black'
    },
    verificationStatus: {
      level1: 'PENDING',
      level2: 'PENDING',
      finalStatus: 'PENDING'
    }
  },
  {
    requisitionNo: 'REQ-004',
    requisitionDate: new Date('2024-09-18'),
    requestor: 'Emily Stone',
    department: 'Finance',
    expenseType: 'Technology',
    purpose: 'Upgrade finance team computers',
    supplierVendorInformation: {
      name: 'Tech World',
      address: '101 Tech Drive',
      phoneNumber: '456-789-0123',
      expectedDate: new Date('2024-09-30')
    },
    items: [
      { name: 'Desktop', quantity: 5, unitPrice: 500, totalPrice: 2500 },
      { name: 'Keyboard', quantity: 5, unitPrice: 20, totalPrice: 100 }
    ],
    totalNetPrice: 2600,
    approvedBy: {
      level1: 'Rachel Brown',
      level2: 'Thomas Miller'
    },
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'APPROVED',
      finalStatus: 'PENDING'
    }
  },
  {
    requisitionNo: 'REQ-005',
    requisitionDate: new Date('2024-10-08'),
    requestor: 'Daniel Adams',
    department: 'Operations',
    expenseType: 'Equipment',
    purpose: 'Replace old warehouse equipment',
    supplierVendorInformation: {
      name: 'Warehouse Direct',
      address: '555 Industry Lane',
      phoneNumber: '567-890-1234',
      expectedDate: new Date('2024-10-20')
    },
    items: [
      { name: 'Forklift', quantity: 1, unitPrice: 5000, totalPrice: 5000 },
      { name: 'Pallet Jack', quantity: 2, unitPrice: 300, totalPrice: 600 }
    ],
    totalNetPrice: 5600,
    approvedBy: {
      level1: 'Jessica Green'
    },
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'REJECTED',
      finalStatus: 'REJECTED'
    }
  },
  {
    requisitionNo: 'REQ-006',
    requisitionDate: new Date('2024-09-25'),
    requestor: 'Chris Johnson',
    department: 'R&D',
    expenseType: 'Materials',
    purpose: 'Purchase lab supplies',
    supplierVendorInformation: {
      name: 'Lab Central',
      address: '900 Science St',
      phoneNumber: '678-901-2345',
      expectedDate: new Date('2024-10-01')
    },
    items: [
      { name: 'Beakers', quantity: 100, unitPrice: 2, totalPrice: 200 },
      { name: 'Chemicals', quantity: 10, unitPrice: 50, totalPrice: 500 }
    ],
    totalNetPrice: 700,
    approvedBy: {
      level1: 'Anna Taylor'
    },
    verificationStatus: {
      level1: 'PENDING',
      level2: 'PENDING',
      finalStatus: 'PENDING'
    }
  },
  {
    requisitionNo: 'REQ-007',
    requisitionDate: new Date('2024-10-02'),
    requestor: 'Laura Roberts',
    department: 'IT',
    expenseType: 'Software',
    purpose: 'Purchase new software licenses',
    supplierVendorInformation: {
      name: 'Software Plus',
      address: '1234 App Way',
      phoneNumber: '789-012-3456',
      expectedDate: new Date('2024-10-12')
    },
    items: [
      { name: 'License A', quantity: 10, unitPrice: 200, totalPrice: 2000 },
      { name: 'License B', quantity: 5, unitPrice: 300, totalPrice: 1500 }
    ],
    totalNetPrice: 3500,
    approvedBy: {
      level1: 'Michael King',
      level2: 'Olivia Scott'
    },
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'APPROVED',
      finalStatus: 'APPROVED'
    }
  },
  {
    requisitionNo: 'REQ-008',
    requisitionDate: new Date('2024-09-30'),
    requestor: 'George Lee',
    department: 'Legal',
    expenseType: 'Professional Services',
    purpose: 'Retain outside counsel',
    supplierVendorInformation: {
      name: 'Law Firm LLC',
      address: '999 Law Ave',
      phoneNumber: '890-123-4567',
      expectedDate: new Date('2024-10-05')
    },
    items: [
      {
        name: 'Consulting Hours',
        quantity: 20,
        unitPrice: 150,
        totalPrice: 3000
      }
    ],
    totalNetPrice: 3000,
    approvedBy: {
      level1: 'Emily Wilson'
    },
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'APPROVED',
      finalStatus: 'APPROVED'
    }
  },
  {
    requisitionNo: 'REQ-009',
    requisitionDate: new Date('2024-10-09'),
    requestor: 'Paul Walker',
    department: 'Customer Service',
    expenseType: 'Supplies',
    purpose: 'Purchase customer support materials',
    supplierVendorInformation: {
      name: 'Office Depot',
      address: '500 Office Lane',
      phoneNumber: '901-234-5678',
      expectedDate: new Date('2024-10-15')
    },
    items: [
      { name: 'Folders', quantity: 100, unitPrice: 1, totalPrice: 100 },
      { name: 'Pens', quantity: 200, unitPrice: 0.5, totalPrice: 100 }
    ],
    totalNetPrice: 200,
    approvedBy: {
      level1: 'Lily Parker'
    },
    verificationStatus: {
      level1: 'PENDING',
      level2: 'PENDING',
      finalStatus: 'PENDING'
    }
  },
  {
    requisitionNo: 'REQ-010',
    requisitionDate: new Date('2024-10-11'),
    requestor: 'Natalie Brown',
    department: 'Admin',
    expenseType: 'Furniture',
    purpose: 'Order new office chairs',
    supplierVendorInformation: {
      name: 'Furniture World',
      address: '123 Home St',
      phoneNumber: '234-567-8910',
      expectedDate: new Date('2024-10-20')
    },
    items: [
      { name: 'Office Chair', quantity: 10, unitPrice: 100, totalPrice: 1000 }
    ],
    totalNetPrice: 1000,
    approvedBy: {
      level1: 'Adam Black',
      level2: 'Mary Jones'
    },
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'APPROVED',
      finalStatus: 'APPROVED'
    }
  }
]

