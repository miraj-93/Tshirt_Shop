import { useState } from 'react'
import Table from '../../common/Table.jsx'

export default function Products() {
  const [rows, setRows] = useState([
    { id: 'p1', name: 'Bluetooth Speaker', stock: 42 },
    { id: 'p2', name: 'Smart Watch', stock: 12 },
  ])

  const add = () => setRows([...rows, { id: 'p'+(rows.length+1), name: 'New Product', stock: 0 }])
  const del = (row) => setRows(rows.filter(r => r.id !== row.id))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Products</h2>
        <button onClick={add} className="px-3 py-2 border rounded-lg">Add New</button>
      </div>
      <Table
        columns={[
          { key: 'id', title: 'ID' },
          { key: 'name', title: 'Name' },
          { key: 'stock', title: 'Stock' },
        ]}
        data={rows}
        actions={[{ label: 'Delete', onClick: del }]}
      />
    </div>
  )
}
