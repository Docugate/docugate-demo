// Every request the frontend makes goes through this file.

export type InvoiceStatus = 'draft' | 'open' | 'paid'

export interface Stats {
  mrr: number
  outstanding: number
  overdueCount: number
  paidThisMonth: number
}

export interface InvoiceRow {
  id: string
  customer: string
  issuedAt: string
  dueAt: string
  status: InvoiceStatus
  overdue: boolean
  total: number
}

export interface Invoice {
  id: string
  customer: { id: string; name: string }
  issuedAt: string
  dueAt: string
  paidAt?: string
  status: InvoiceStatus
  overdue: boolean
  lines: { description: string; quantity: number; unitPrice: number }[]
  subtotal: number
  tax: number
  total: number
}

export interface Customer {
  id: string
  name: string
  email: string
  plan: 'starter' | 'growth' | 'scale'
  since: string
  monthlyPrice: number
  balance: number
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, init)
  const body = await res.json()
  if (!res.ok) throw new Error(body.error ?? `Request failed: ${res.status}`)
  return body as T
}

export const getStats = () => request<Stats>('/api/stats')

export const getInvoices = (status?: string) =>
  request<InvoiceRow[]>(status ? `/api/invoices?status=${status}` : '/api/invoices')

export const getInvoice = (id: string) => request<Invoice>(`/api/invoices/${id}`)

export const payInvoice = (id: string) => request<{ status: InvoiceStatus }>(`/api/invoices/${id}/pay`, { method: 'POST' })

export const getCustomers = () => request<Customer[]>('/api/customers')
