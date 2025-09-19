export default function Settings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">System Settings</h2>
      <div className="card p-5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Payment Gateway</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Stripe (Demo)</option>
              <option>SSLCommerz (Demo)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Shipping Provider</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Pathao (Demo)</option>
              <option>Redx (Demo)</option>
            </select>
          </div>
        </div>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">Save</button>
      </div>
    </div>
  )
}
