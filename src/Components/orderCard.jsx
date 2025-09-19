const OrderCard = ({ order, onUpdate }) => (
  <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
    <div>
      <p className="font-semibold">Order #{order._id}</p>
      <p className="text-gray-600 text-sm">Status: {order.status}</p>
    </div>
    <select
      value={order.status}
      onChange={(e) => onUpdate(order._id, e.target.value)}
      className="border rounded px-2 py-1"
    >
      <option value="pending">Pending</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
    </select>
  </div>
);

export default OrderCard;
