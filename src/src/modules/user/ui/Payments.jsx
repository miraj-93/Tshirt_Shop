export default function Payments() {
  return (
    <div className="card p-5 space-y-3">
      <h2 className="text-lg font-semibold">Payment Methods</h2>
      <div className="flex items-center gap-3">
        <input type="checkbox" id="card" />
        <label htmlFor="card">Save card on file (demo)</label>
      </div>
      <button className="px-3 py-2 border rounded-lg">Update</button>
    </div>
  )
}
