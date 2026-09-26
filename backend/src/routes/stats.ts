import { Hono } from 'hono'
import { invoices } from '../data.js'
import { isOverdue, mrr, totals } from '../billing.js'

export const statsRoutes = new Hono()

statsRoutes.get('/', (c) => {
  const open = invoices.filter((i) => i.status === 'open')
  return c.json({
    mrr: mrr(),
    outstanding: Math.round(open.reduce((sum, i) => sum + totals(i).total, 0) * 100) / 100,
    overdueCount: open.filter(isOverdue).length,
    paidThisMonth: invoices.filter((i) => i.paidAt?.startsWith('2026-09')).length,
  })
})
