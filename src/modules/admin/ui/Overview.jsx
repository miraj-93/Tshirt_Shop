import StatCard from '../../common/StatCard.jsx'
import ChartCard from '../../common/ChartCard.jsx'
import { salesMonthly } from '../../data/mock.js'

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Orders Today" value="320" />
        <StatCard title="Revenue Today" value="$8,120" />
        <StatCard title="Active Users" value="1,240" />
        <StatCard title="Refund Requests" value="12" />
      </div>
      <ChartCard title="Revenue (Last 12 months)" data={salesMonthly} />
    </div>
  )
}
