import { useState } from 'react'
import Table from '../../common/Table.jsx'

const seed = [
  { id: 'p1', name: 'Wireless Headphones', status: 'active' },
  { id: 'p2', name: 'Smart Watch', status: 'active' },
  { id: 'p3', name: 'Phone Case', status: 'banned' },
]

export default function Products() {
  const [rows, setRows] = useState(seed)
  const toggle = (row) => setRows(rows.map(r => r.id === row.id ? { ...r, status: r.status === 'active' ? 'banned' : 'active' } : r))

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">All Products</h2>
      <Table
        columns={[
          { key: 'name', title: 'Name' },
          { key: 'status', title: 'Status' },
        ]}
        data={rows}
        actions={[{ label: 'Toggle Ban', onClick: toggle }]}
      />
    </div>
  )
}
