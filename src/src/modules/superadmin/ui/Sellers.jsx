import { useState } from 'react'
import Table from '../../common/Table.jsx'
import { sellers as seed } from '../../data/mock.js'

export default function Sellers() {
  const [rows, setRows] = useState(seed)

  const approve = (row) => {
    setRows(rows.map(r => r.id === row.id ? { ...r, status: 'active' } : r))
  }
  const reject = (row) => {
    setRows(rows.filter(r => r.id !== row.id))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Seller Requests & Management</h2>
      <Table
        columns={[
          { key: 'name', title: 'Name' },
          { key: 'email', title: 'Email' },
          { key: 'status', title: 'Status' },
          { key: 'rating', title: 'Rating' },
        ]}
        data={rows}
        actions={[
          { label: 'Approve', onClick: approve },
          { label: 'Reject', onClick: reject },
        ]}
      />
    </div>
  )
}
