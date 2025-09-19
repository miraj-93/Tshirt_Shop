export default function Content() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Content Management</h2>
      <div className="card p-5 space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Homepage Banner Title</label>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Summer Sale up to 50% off" />
        </div>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">Save</button>
      </div>
    </div>
  )
}
