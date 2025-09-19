export default function Earnings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Earnings</h2>
      <div className="card p-5">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-sm text-gray-500">Total Earnings</div>
            <div className="text-2xl font-semibold">$24,320</div>
          </div>
          <button className="px-3 py-2 border rounded-lg">Withdraw Balance</button>
        </div>
      </div>
    </div>
  )
}
