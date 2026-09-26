import type { InvoiceStatus } from '../api'

export function StatusBadge({ status, overdue, tour }: { status: InvoiceStatus; overdue: boolean; tour?: string }) {
  const label = overdue ? 'overdue' : status
  return (
    <span className={`badge badge-${label}`} data-tour={tour}>
      {label}
    </span>
  )
}
