import { PLAN_PRICE, TAX_RATE, TODAY, customers, invoices } from './data.js'
import type { Invoice } from './data.js'

const round = (n: number) => Math.round(n * 100) / 100

/** Subtotal, tax and total are always derived from the line items, never stored. */
export function totals(invoice: Invoice) {
  const subtotal = round(invoice.lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0))
  const tax = round(subtotal * TAX_RATE)
  return { subtotal, tax, total: round(subtotal + tax) }
}

/** An open invoice past its due date. Drafts and paid invoices are never overdue. */
export function isOverdue(invoice: Invoice) {
  return invoice.status === 'open' && invoice.dueAt < TODAY
}

/** Money still owed by a customer: the total of their open invoices. */
export function balance(customerId: string) {
  return round(
    invoices
      .filter((i) => i.customerId === customerId && i.status === 'open')
      .reduce((sum, i) => sum + totals(i).total, 0),
  )
}

/** Monthly recurring revenue: the list price of every customer's plan, before tax. */
export function mrr() {
  return customers.reduce((sum, c) => sum + PLAN_PRICE[c.plan], 0)
}

export function customerName(customerId: string) {
  return customers.find((c) => c.id === customerId)?.name ?? 'Unknown customer'
}
