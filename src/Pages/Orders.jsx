import { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://tshirt-shop-server.vercel.app/api/orders"); // adjust API
        setOrders(res.data);
        setFilteredOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  // Calculate total amount
  useEffect(() => {
    const total = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    setTotalAmount(total);
  }, [filteredOrders]);

  // Handle date filter
  const handleFilter = (e) => {
    const value = e.target.value;
    setDateFilter(value);
    if (value) {
      const filtered = orders.filter(order => order.date.startsWith(value));
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  };

  // PDF Download
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Orders Report", 14, 20);
    doc.setFontSize(10);
    const tableData = filteredOrders.map(order => [
      order._id,
      order.buyerName,
      order.totalAmount.toFixed(2),
      order.status,
      new Date(order.date).toLocaleString(),
    ]);
    doc.autoTable({
      head: [["Order ID", "Buyer", "Amount", "Status", "Date"]],
      body: tableData,
      startY: 25,
    });
    doc.save(`orders_${dateFilter || "all"}.pdf`);
  };

  return (
    <div className="p-6 mt-[120px]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Orders Dashboard</h1>

      {/* Summary */}
      <div className="flex flex-wrap justify-between items-center mb-6 bg-white shadow rounded p-4">
        <div className="text-gray-700 font-medium">
          Total Orders: <span className="font-bold">{filteredOrders.length}</span>
        </div>
        <div className="text-gray-700 font-medium">
          Total Selling Amount: <span className="font-bold">${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={dateFilter}
            onChange={handleFilter}
            className="border p-2 rounded"
          />
          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <FaDownload /> Download PDF
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-semibold text-gray-700">Order ID</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Buyer</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Amount</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2">{order._id}</td>
                <td className="px-4 py-2">{order.buyerName}</td>
                <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white font-medium ${
                    order.status === "Pending" ? "bg-yellow-500" :
                    order.status === "Completed" ? "bg-green-500" :
                    order.status === "Cancelled" ? "bg-red-500" : "bg-gray-500"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">{new Date(order.date).toLocaleString()}</td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
