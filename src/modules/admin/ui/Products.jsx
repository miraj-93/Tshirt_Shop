import { useState } from 'react'
import Table from '../../common/Table.jsx'

const seed = [
  { id: 'p1', name: 'Wireless Headphones', status: 'approved' },
  { id: 'p2', name: 'Smart Watch', status: 'pending' },
]

export default function Products() {
  const [rows, setRows] = useState(seed)
  const approve = (row) => setRows(rows.map(r => r.id === row.id ? { ...r, status: 'approved' } : r))

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Product Approvals</h2>
      <Table
        columns={[
          { key: 'name', title: 'Product' },
          { key: 'status', title: 'Status' },
        ]}
        data={rows}
        actions={[{ label: 'Approve', onClick: approve }]}
      />
    </div>
  )
}
