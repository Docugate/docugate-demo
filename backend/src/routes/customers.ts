import { Hono } from 'hono'
import { PLAN_PRICE, customers } from '../data.js'
import { balance } from '../billing.js'

export const customerRoutes = new Hono()

customerRoutes.get('/', (c) =>
  c.json(
    customers.map((cu) => ({
      ...cu,
      monthlyPrice: PLAN_PRICE[cu.plan],
      balance: balance(cu.id),
    })),
  ),
)
