import { Hono } from 'hono'
import { customerRoutes } from './routes/customers.js'
import { invoiceRoutes } from './routes/invoices.js'
import { statsRoutes } from './routes/stats.js'

const app = new Hono().basePath('/api')

app.route('/stats', statsRoutes)
app.route('/invoices', invoiceRoutes)
app.route('/customers', customerRoutes)
app.notFound((c) => c.json({ error: 'Not found' }, 404))

export default app
