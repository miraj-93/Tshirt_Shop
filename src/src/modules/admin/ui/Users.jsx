import Table from '../../common/Table.jsx'
import { users } from '../../data/mock.js'

export default function Users() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Manage Customers & Sellers</h2>
      <Table
        columns={[
          { key: 'name', title: 'Name' },
          { key: 'email', title: 'Email' },
          { key: 'role', title: 'Role' },
          { key: 'status', title: 'Status' },
        ]}
        data={users}
      />
    </div>
  )
}
