import Table from '../../common/Table.jsx'
import { orders } from '../../data/mock.js'

export default function Orders() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Orders Overview</h2>
      <Table
        columns={[
          { key: 'id', title: 'Order ID' },
          { key: 'user', title: 'Customer' },
          { key: 'amount', title: 'Amount' },
          { key: 'status', title: 'Status' },
          { key: 'date', title: 'Date' },
        ]}
        data={orders}
      />
    </div>
  )
}
