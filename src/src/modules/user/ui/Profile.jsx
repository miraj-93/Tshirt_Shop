export default function Profile() {
  return (
    <div className="card p-5 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input className="w-full border rounded-lg px-3 py-2" defaultValue="Demo User" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input className="w-full border rounded-lg px-3 py-2" defaultValue="demo@example.com" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone</label>
          <input className="w-full border rounded-lg px-3 py-2" defaultValue="+8801XXXXXXXXX" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Address</label>
          <input className="w-full border rounded-lg px-3 py-2" defaultValue="Dhaka, Bangladesh" />
        </div>
      </div>
      <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">Save</button>
    </div>
  )
}
