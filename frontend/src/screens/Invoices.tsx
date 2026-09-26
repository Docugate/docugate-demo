import { Link, useSearchParams } from 'react-router'
import { getInvoices } from '../api'
import { StatusBadge } from '../components/StatusBadge'
import { formatDate, formatMoney } from '../format'
import { useLoad } from '../useLoad'

const FILTERS = ['all', 'draft', 'open', 'overdue', 'paid'] as const

export function Invoices() {
  const [params, setParams] = useSearchParams()
  const status = params.get('status') ?? 'all'
  const { data, error } = useLoad(() => getInvoices(status === 'all' ? undefined : status), [status])

  return (
    <>
      <h1>Invoices</h1>
      <div className="filters" data-tour="invoice-filter" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={f === status}
            className={f === status ? 'active' : ''}
            onClick={() => setParams(f === 'all' ? {} : { status: f })}
          >
            {f}
          </button>
        ))}
      </div>

      {error && <p className="error">{error}</p>}
      <table data-tour="invoice-table">
        <thead>
          <tr><th>Invoice</th><th>Customer</th><th>Issued</th><th>Due</th><th>Status</th><th className="num">Total</th></tr>
        </thead>
        <tbody>
          {data?.map((i) => (
            <tr key={i.id}>
              <td><Link to={`/invoices/${i.id}`}>{i.id}</Link></td>
              <td>{i.customer}</td>
              <td>{formatDate(i.issuedAt)}</td>
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
