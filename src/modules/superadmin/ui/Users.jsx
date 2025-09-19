import { useState } from 'react'
import Table from '../../common/Table.jsx'
import { users as seed } from '../../data/mock.js'

export default function Users() {
  const [rows, setRows] = useState(seed)

  const toggleBan = (row) => {
    setRows(rows.map(r => r.id === row.id ? { ...r, status: r.status === 'active' ? 'banned' : 'active' } : r))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">All Users</h2>
      <Table
        columns={[
          { key: 'name', title: 'Name' },
          { key: 'email', title: 'Email' },
          { key: 'role', title: 'Role' },
          { key: 'status', title: 'Status' },
        ]}
        data={rows}
        actions={[
          { label: 'Toggle Ban', onClick: toggleBan },
        ]}
      />
    </div>
  )
}
