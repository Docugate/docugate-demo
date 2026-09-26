import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { getInvoice, payInvoice } from '../api'
import { StatusBadge } from '../components/StatusBadge'
import { formatDate, formatMoney } from '../format'
import { useLoad } from '../useLoad'

export function InvoiceDetail() {
  const { id = '' } = useParams()
  const { data: invoice, error, reload } = useLoad(() => getInvoice(id), [id])
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState<string>()

  if (error) return <p className="error">{error}</p>
  if (!invoice) return <p className="muted">Loading…</p>

  async function markPaid() {
    setPaying(true)
    setPayError(undefined)
    try {
      await payInvoice(id)
      reload()
    } catch (e) {
      setPayError((e as Error).message)
    } finally {
      setPaying(false)
    }
  }

  return (
    <>
      <p className="crumbs"><Link to="/invoices">Invoices</Link> / {invoice.id}</p>
      <div className="invoice-head">
        <div>
          <h1>{invoice.id}</h1>
          <p className="muted">
            Billed to <strong data-tour="invoice-customer">{invoice.customer.name}</strong>
          </p>
        </div>
        <StatusBadge status={invoice.status} overdue={invoice.overdue} tour="invoice-status" />
      </div>

      <dl className="meta">
        <div><dt>Issued</dt><dd>{formatDate(invoice.issuedAt)}</dd></div>
        <div><dt>Due</dt><dd>{formatDate(invoice.dueAt)}</dd></div>
        {invoice.paidAt && <div><dt>Paid</dt><dd>{formatDate(invoice.paidAt)}</dd></div>}
      </dl>

      <table data-tour="invoice-lines">
        <thead>
          <tr><th>Item</th><th className="num">Qty</th><th className="num">Unit price</th><th className="num">Amount</th></tr>
        </thead>
        <tbody>
          {invoice.lines.map((l, n) => (
            <tr key={n}>
              <td>{l.description}</td>
              <td className="num">{l.quantity}</td>
              <td className="num">{formatMoney(l.unitPrice)}</td>
              <td className="num">{formatMoney(l.quantity * l.unitPrice)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><td colSpan={3}>Subtotal</td><td className="num">{formatMoney(invoice.subtotal)}</td></tr>
          <tr><td colSpan={3}>Tax (18%)</td><td className="num">{formatMoney(invoice.tax)}</td></tr>
          <tr className="total"><td colSpan={3}>Total</td><td className="num" data-tour="invoice-total">{formatMoney(invoice.total)}</td></tr>
        </tfoot>
      </table>

      {invoice.status === 'open' && (
        <button className="primary" data-tour="mark-paid" onClick={markPaid} disabled={paying}>
          {paying ? 'Saving…' : 'Mark as paid'}
        </button>
      )}
      {payError && <p className="error">{payError}</p>}
    </>
  )
}
