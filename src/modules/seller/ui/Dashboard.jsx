import StatCard from '../../common/StatCard.jsx'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Products" value="58" />
      <StatCard title="Total Orders" value="1,245" />
      <StatCard title="Earnings" value="$24,320" />
      <StatCard title="Pending Orders" value="23" />
    </div>
  )
}
