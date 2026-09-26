import { NavLink, Route, Routes } from 'react-router'
import { Customers } from './screens/Customers'
import { Dashboard } from './screens/Dashboard'
import { InvoiceDetail } from './screens/InvoiceDetail'
import { Invoices } from './screens/Invoices'

export function App() {
  return (
    <div className="shell">
      <aside className="nav" data-tour="main-nav">
        <div className="brand">Ledgerly</div>
        <NavLink to="/" end>Overview</NavLink>
        <NavLink to="/invoices">Invoices</NavLink>
        <NavLink to="/customers">Customers</NavLink>
      </aside>
      <main className="page">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/:id" element={<InvoiceDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="*" element={<p className="muted">Page not found.</p>} />
        </Routes>
      </main>
    </div>
  )
}
