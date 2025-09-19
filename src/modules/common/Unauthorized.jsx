export default function Unauthorized() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="card p-8 max-w-lg text-center">
        <h1 className="text-2xl font-semibold">Access denied</h1>
        <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
      </div>
    </div>
  )
}
