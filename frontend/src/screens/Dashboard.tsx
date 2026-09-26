import { Link } from 'react-router'
import { getInvoices, getStats } from '../api'
import { StatusBadge } from '../components/StatusBadge'
import { formatDate, formatMoney } from '../format'
import { useLoad } from '../useLoad'

export function Dashboard() {
  const stats = useLoad(getStats, [])
  const overdue = useLoad(() => getInvoices('overdue'), [])

  if (stats.error) return <p className="error">{stats.error}</p>
  if (!stats.data) return <p className="muted">Loading…</p>
  const s = stats.data

  return (
    <>
      <h1>Overview</h1>
      <div className="tiles">
        <div className="tile" data-tour="stat-mrr">
          <span className="tile-label">Monthly recurring revenue</span>
          <span className="tile-value">{formatMoney(s.mrr)}</span>
        </div>
        <div className="tile" data-tour="stat-outstanding">
          <span className="tile-label">Outstanding</span>
          <span className="tile-value">{formatMoney(s.outstanding)}</span>
        </div>
        <div className="tile" data-tour="stat-overdue">
          <span className="tile-label">Overdue invoices</span>
          <span className="tile-value">{s.overdueCount}</span>
        </div>
        <div className="tile">
          <span className="tile-label">Paid this month</span>
          <span className="tile-value">{s.paidThisMonth}</span>
        </div>
      </div>

      <h2>Needs attention</h2>
      <table data-tour="overdue-list">
        <thead>
          <tr><th>Invoice</th><th>Customer</th><th>Due</th><th>Status</th><th className="num">Total</th></tr>
        </thead>
        <tbody>
          {overdue.data?.length === 0 && (
            <tr><td colSpan={5} className="muted">Nothing overdue.</td></tr>
          )}
          {overdue.data?.map((i) => (
            <tr key={i.id}>
              <td><Link to={`/invoices/${i.id}`}>{i.id}</Link></td>
              <td>{i.customer}</td>
              <td>{formatDate(i.dueAt)}</td>
              <td><StatusBadge status={i.status} overdue={i.overdue} /></td>
              <td className="num">{formatMoney(i.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
