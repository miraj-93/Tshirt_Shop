import StatCard from '../../common/StatCard.jsx'
import ChartCard from '../../common/ChartCard.jsx'
import Table from '../../common/Table.jsx'
import { salesMonthly, topProducts } from '../../data/mock.js'

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="4,230" hint="+3% from last month" />
        <StatCard title="Total Orders" value="12,540" hint="+1.2% from last month" />
        <StatCard title="Total Revenue" value="$1,240,300" hint="+5.1% from last month" />
        <StatCard title="Active Sellers" value="312" hint="+12 new this week" />
      </div>

      <ChartCard title="Monthly Sales" data={salesMonthly} />

      <div>
        <div className="font-medium mb-2">Top Selling Products</div>
        <Table
          columns={[
            { key: 'name', title: 'Product' },
            { key: 'sold', title: 'Units Sold' },
            { key: 'revenue', title: 'Revenue' },
          ]}
          data={topProducts}
        />
      </div>
    </div>
  )
}
