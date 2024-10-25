import { TProcurement } from '@/types/procurement.types'

export const dummyData: TProcurement[] = [
  {
    requisitionNo: 'REQ-001',
    requisitionDate: new Date('2023-10-01'),
    requestor: 'Alice Johnson',
    department: 'Marketing',
    expenseType: 'Operational',
    purpose: 'Office Supplies',
    supplierVendorInformation: {
      name: 'Office Depot',
      address: '123 Supply St, City, State',
      expectedDate: new Date('2023-10-10'),
      phoneNumber: '123-456-7890'
    },
    items: [
      { name: 'Printer Paper', quantity: 10, unitPrice: 5.0, totalPrice: 50.0 },
      { name: 'Markers', quantity: 20, unitPrice: 1.5, totalPrice: 30.0 }
    ],
    approvedBy: {
      level1: 'Bob Smith',
      level2: 'Mary Lee'
    },
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'REJECTED',
      finalStatus: 'REJECTED'
    }
  },
  {
    requisitionNo: 'REQ-002',
    requisitionDate: new Date('2023-10-02'),
    requestor: 'John Davis',
    department: 'IT',
    expenseType: 'Capital',
    purpose: 'New Laptops',
    supplierVendorInformation: {
      name: 'TechStore',
      address: '456 Tech Rd, City, State',
      expectedDate: new Date('2023-10-15'),
      phoneNumber: '987-654-3210'
    },
    items: [
      { name: 'Laptop', quantity: 5, unitPrice: 800.0, totalPrice: 4000.0 }
    ],
    approvedBy: {
      level1: 'Tom Hardy',
      level2: 'Jennifer Lawrence'
    },
    verificationStatus: {
      level1: 'PENDING',
      level2: 'PENDING',
      finalStatus: 'PENDING'
    }
  },
  {
    requisitionNo: 'REQ-003',
    requisitionDate: new Date('2023-10-03'),
    requestor: 'Emily White',
    department: 'HR',
    expenseType: 'Operational',
    purpose: 'Employee Training Materials',
    items: [
      {
        name: 'Training Manuals',
        quantity: 15,
        unitPrice: 20.0,
        totalPrice: 300.0
      }
    ],
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'APPROVED',
      finalStatus: 'APPROVED'
    }
  },
  {
    requisitionNo: 'REQ-004',
    requisitionDate: new Date('2023-10-04'),
    requestor: 'Chris Green',
    department: 'Finance',
    expenseType: 'Operational',
    purpose: 'Office Furniture',
    items: [
      { name: 'Desk', quantity: 2, unitPrice: 300.0, totalPrice: 600.0 },
      { name: 'Chair', quantity: 2, unitPrice: 150.0, totalPrice: 300.0 }
    ],
    approvedBy: {
      level1: 'Lisa Black',
      level2: 'Mark Brown'
    },
    verificationStatus: {
      level1: 'PENDING',
      level2: 'APPROVED',
      finalStatus: 'PENDING'
    }
  },
  {
    requisitionNo: 'REQ-005',
    requisitionDate: new Date('2023-10-05'),
    requestor: 'Sophia Turner',
    department: 'Legal',
    expenseType: 'Operational',
    purpose: 'Legal Books',
    items: [
      { name: 'Legal Book', quantity: 5, unitPrice: 50.0, totalPrice: 250.0 }
    ],
    verificationStatus: {
      level1: 'PENDING',
      level2: 'PENDING',
      finalStatus: 'PENDING'
    }
  },
  {
    requisitionNo: 'REQ-006',
    requisitionDate: new Date('2023-10-06'),
    requestor: 'Liam Smith',
    department: 'Sales',
    expenseType: 'Operational',
    purpose: 'Sales Software License',
    items: [
      {
        name: 'CRM Software License',
        quantity: 3,
        unitPrice: 200.0,
        totalPrice: 600.0
      }
    ],
    approvedBy: {
      level1: 'Paul White',
      level2: 'Anna Green'
    },
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'PENDING',
      finalStatus: 'PENDING'
    }
  },
  {
    requisitionNo: 'REQ-007',
    requisitionDate: new Date('2023-10-07'),
    requestor: 'Isabella Johnson',
    department: 'Operations',
    expenseType: 'Operational',
    purpose: 'New Machinery',
    items: [
      { name: 'Forklift', quantity: 1, unitPrice: 15000.0, totalPrice: 15000.0 }
    ],
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'APPROVED',
      finalStatus: 'APPROVED'
    }
  },
  {
    requisitionNo: 'REQ-008',
    requisitionDate: new Date('2023-10-08'),
    requestor: 'Mia Williams',
    department: 'Customer Support',
    expenseType: 'Operational',
    purpose: 'Support Tools',
    items: [
      { name: 'Headset', quantity: 10, unitPrice: 25.0, totalPrice: 250.0 }
    ],
    approvedBy: {
      level1: 'Jake Black',
      level2: 'Nina Gray'
    },
    verificationStatus: {
      level1: 'PENDING',
      level2: 'PENDING',
      finalStatus: 'PENDING'
    }
  },
  {
    requisitionNo: 'REQ-009',
    requisitionDate: new Date('2023-10-09'),
    requestor: 'Noah Brown',
    department: 'IT',
    expenseType: 'Capital',
    purpose: 'Server Upgrade',
    items: [
      { name: 'Server', quantity: 2, unitPrice: 5000.0, totalPrice: 10000.0 }
    ],
    approvedBy: {
      level1: 'Victoria Adams',
      level2: 'Ethan Clark'
    },
    verificationStatus: {
      level1: 'APPROVED',
      level2: 'APPROVED',
      finalStatus: 'APPROVED'
    }
  },
  {
    requisitionNo: 'REQ-010',
    requisitionDate: new Date('2023-10-10'),
    requestor: 'Olivia Martinez',
    department: 'R&D',
    expenseType: 'Capital',
    purpose: 'Research Equipment',
    items: [
      { name: 'Microscope', quantity: 1, unitPrice: 1200.0, totalPrice: 1200.0 }
    ],
    verificationStatus: {
      level1: 'PENDING',
      level2: 'PENDING',
      finalStatus: 'PENDING'
    }
  }
]
