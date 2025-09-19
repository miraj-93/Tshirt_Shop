

import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

export default function Checkout() {
  const { cart, resetCart } = useCart();
  const { user } = useAuth();

  const [shipping, setShipping] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /** Generate Invoice PDF */
  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Customer: ${shipping.name}`, 20, 40);
    doc.text(`Email: ${shipping.email}`, 20, 50);
    doc.text(`Phone: ${shipping.phone}`, 20, 60);
    doc.text(`Address: ${shipping.address}, ${shipping.city}`, 20, 70);

    let y = 90;
    cart.forEach((item) => {
      doc.text(
        `${item.name} (${item.quantity} pcs) - $${(
          item.price * item.quantity
        ).toFixed(2)}`,
        20,
        y
      );
      y += 10;
    });

    doc.text(`Total: $${totalPrice.toFixed(2)}`, 20, y + 10);
    doc.save("invoice.pdf");
  };

  /** Handle Payment flow */
  const handlePayment = async () => {
    if (!shipping.phone || !shipping.address) {
      Swal.fire("Missing Info", "Please fill shipping details!", "warning");
      return;
    }

    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1500)); // simulate API
    setProcessing(false);

    if (paymentMethod === "card") {
      // Debit/Credit Card Flow
      Swal.fire("Payment Success", "Your card payment was successful!", "success");
      generateInvoice();
      resetCart();

    } else if (paymentMethod === "paypal") {
      // Mobile Banking Simulation
      Swal.fire("Payment Success", "Your mobile banking payment was successful!", "success");
      generateInvoice();
      resetCart();

    } else if (paymentMethod === "cod") {
      // Cash on Delivery Flow → Add delivery charge
      const deliveryCharge = 5;
      Swal.fire(
        "Order Confirmed",
        `Your COD order is confirmed! Delivery charge $${deliveryCharge} added.`,
        "success"
      );
      generateInvoice();
      resetCart();
    }

    // 🚀 Here you can also call backend to trigger SMS to shipping.phone
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left: Shipping + Payment */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <div className="space-y-3">
            <input type="text" name="name" placeholder="Full Name" value={shipping.name} onChange={handleChange} className="w-full p-3 border rounded"/>
            <input type="email" name="email" placeholder="Email" value={shipping.email} onChange={handleChange} className="w-full p-3 border rounded"/>
            <input type="text" name="phone" placeholder="Phone Number" value={shipping.phone} onChange={handleChange} className="w-full p-3 border rounded"/>
            <input type="text" name="address" placeholder="Address" value={shipping.address} onChange={handleChange} className="w-full p-3 border rounded"/>
            <div className="flex gap-3">
              <input type="text" name="city" placeholder="City" value={shipping.city} onChange={handleChange} className="flex-1 p-3 border rounded"/>
              <input type="text" name="postalCode" placeholder="Postal Code" value={shipping.postalCode} onChange={handleChange} className="flex-1 p-3 border rounded"/>
            </div>
            <input type="text" name="country" placeholder="Country" value={shipping.country} onChange={handleChange} className="w-full p-3 border rounded"/>
          </div>

          {/* Payment Selection */}
          <h2 className="text-2xl font-bold mt-6 mb-4">Payment Method</h2>
          <div className="flex flex-col gap-2">
            <label><input type="radio" value="card" checked={paymentMethod==="card"} onChange={()=>setPaymentMethod("card")}/> Debit / Credit Card</label>
            <label><input type="radio" value="paypal" checked={paymentMethod==="paypal"} onChange={()=>setPaymentMethod("paypal")}/> Mobile Banking</label>
            <label><input type="radio" value="cod" checked={paymentMethod==="cod"} onChange={()=>setPaymentMethod("cod")}/> Cash on Delivery</label>
          </div>

          <button onClick={handlePayment} disabled={processing} className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg">
            {processing ? "Processing..." : `Confirm & Pay $${totalPrice.toFixed(2)}`}
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cart.map((item)=>(
            <div key={item.id} className="flex justify-between items-center py-2">
              <div className="flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500">{item.quantity} pcs</p>
                </div>
              </div>
              <p className="font-semibold">${(item.price*item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="mt-4 flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
