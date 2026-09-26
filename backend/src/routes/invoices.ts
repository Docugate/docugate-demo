import { Hono } from 'hono'
import { TODAY, invoices } from '../data.js'
import type { InvoiceStatus } from '../data.js'
import { customerName, isOverdue, totals } from '../billing.js'

export const invoiceRoutes = new Hono()

invoiceRoutes.get('/', (c) => {
  const status = c.req.query('status') as InvoiceStatus | 'overdue' | undefined
  const rows = invoices
    .filter((i) => !status || (status === 'overdue' ? isOverdue(i) : i.status === status))
    .map((i) => ({
      id: i.id,
      customer: customerName(i.customerId),
      issuedAt: i.issuedAt,
      dueAt: i.dueAt,
      status: i.status,
      overdue: isOverdue(i),
      total: totals(i).total,
    }))
  return c.json(rows)
})

invoiceRoutes.get('/:id', (c) => {
  const invoice = invoices.find((i) => i.id === c.req.param('id'))
  if (!invoice) return c.json({ error: 'Invoice not found' }, 404)
  return c.json({
    ...invoice,
    customer: { id: invoice.customerId, name: customerName(invoice.customerId) },
    overdue: isOverdue(invoice),
    ...totals(invoice),
  })
})

invoiceRoutes.post('/:id/pay', (c) => {
  const invoice = invoices.find((i) => i.id === c.req.param('id'))
  if (!invoice) return c.json({ error: 'Invoice not found' }, 404)
  if (invoice.status !== 'open') return c.json({ error: `A ${invoice.status} invoice cannot be paid` }, 409)
  invoice.status = 'paid'
  invoice.paidAt = TODAY
  return c.json({ id: invoice.id, status: invoice.status, paidAt: invoice.paidAt })
})
