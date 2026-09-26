// In-memory data for the demo. It resets whenever the server restarts.

export type Plan = 'starter' | 'growth' | 'scale'

export interface Customer {
  id: string
  name: string
  email: string
  plan: Plan
  since: string
}

export interface LineItem {
  description: string
  quantity: number
  unitPrice: number
}

export type InvoiceStatus = 'draft' | 'open' | 'paid'

export interface Invoice {
  id: string
  customerId: string
  issuedAt: string
  dueAt: string
  status: InvoiceStatus
  lines: LineItem[]
  paidAt?: string
}

export const PLAN_PRICE: Record<Plan, number> = {
  starter: 29,
  growth: 99,
  scale: 299,
}

export const TAX_RATE = 0.18

export const customers: Customer[] = [
  { id: 'c_1', name: 'Kivu Coffee Roasters', email: 'billing@kivucoffee.example', plan: 'growth', since: '2025-11-02' },
  { id: 'c_2', name: 'Nyungwe Outfitters', email: 'accounts@nyungwe.example', plan: 'starter', since: '2026-01-15' },
  { id: 'c_3', name: 'Akagera Logistics', email: 'finance@akagera.example', plan: 'scale', since: '2025-06-20' },
  { id: 'c_4', name: 'Musanze Studio', email: 'hello@musanze.example', plan: 'growth', since: '2026-03-08' },
  { id: 'c_5', name: 'Rubavu Bikes', email: 'pay@rubavu.example', plan: 'starter', since: '2026-07-01' },
]

export const invoices: Invoice[] = [
  {
    id: 'inv_1001', customerId: 'c_1', issuedAt: '2026-08-01', dueAt: '2026-08-15', status: 'paid', paidAt: '2026-08-09',
    lines: [{ description: 'Growth plan, August', quantity: 1, unitPrice: 99 }, { description: 'Extra seats', quantity: 3, unitPrice: 12 }],
  },
  {
    id: 'inv_1002', customerId: 'c_3', issuedAt: '2026-08-01', dueAt: '2026-08-15', status: 'paid', paidAt: '2026-08-14',
    lines: [{ description: 'Scale plan, August', quantity: 1, unitPrice: 299 }],
  },
  {
    id: 'inv_1003', customerId: 'c_2', issuedAt: '2026-09-01', dueAt: '2026-09-15', status: 'open',
    lines: [{ description: 'Starter plan, September', quantity: 1, unitPrice: 29 }],
  },
  {
    id: 'inv_1004', customerId: 'c_1', issuedAt: '2026-09-01', dueAt: '2026-09-30', status: 'open',
    lines: [{ description: 'Growth plan, September', quantity: 1, unitPrice: 99 }, { description: 'Extra seats', quantity: 3, unitPrice: 12 }],
  },
  {
    id: 'inv_1005', customerId: 'c_3', issuedAt: '2026-09-01', dueAt: '2026-09-30', status: 'open',
    lines: [{ description: 'Scale plan, September', quantity: 1, unitPrice: 299 }, { description: 'Onboarding workshop', quantity: 1, unitPrice: 450 }],
  },
  {
    id: 'inv_1006', customerId: 'c_4', issuedAt: '2026-09-10', dueAt: '2026-10-10', status: 'open',
    lines: [{ description: 'Growth plan, September (prorated)', quantity: 1, unitPrice: 66 }],
  },
  {
    id: 'inv_1007', customerId: 'c_5', issuedAt: '2026-09-25', dueAt: '2026-10-25', status: 'draft',
    lines: [{ description: 'Starter plan, October', quantity: 1, unitPrice: 29 }],
  },
]

// The demo pretends today is the hackathon's last day, so "overdue" stays stable.
export const TODAY = '2026-09-27'
