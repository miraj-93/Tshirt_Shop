export default function Support() {
  return (
    <div className="card p-5 space-y-3">
      <h2 className="text-lg font-semibold">Support</h2>
      <textarea className="w-full border rounded-lg px-3 py-2" rows="4" placeholder="Write your message..." />
      <button className="px-3 py-2 bg-gray-900 text-white rounded-lg">Send</button>
    </div>
  )
}
