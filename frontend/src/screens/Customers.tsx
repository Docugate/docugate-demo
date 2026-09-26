import { getCustomers } from '../api'
import { formatDate, formatMoney } from '../format'
import { useLoad } from '../useLoad'

export function Customers() {
  const { data, error } = useLoad(getCustomers, [])

  return (
    <>
      <h1>Customers</h1>
      {error && <p className="error">{error}</p>}
      <table data-tour="customer-table">
        <thead>
          <tr><th>Customer</th><th>Plan</th><th className="num">Price / month</th><th>Customer since</th><th className="num">Balance</th></tr>
        </thead>
        <tbody>
          {data?.map((c) => (
            <tr key={c.id}>
              <td>
                {c.name}
                <div className="muted small">{c.email}</div>
              </td>
              <td><span className="plan" data-tour="customer-plan">{c.plan}</span></td>
              <td className="num">{formatMoney(c.monthlyPrice)}</td>
              <td>{formatDate(c.since)}</td>
              <td className="num" data-tour="customer-balance">{formatMoney(c.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
