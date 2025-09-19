// src/Pages/TermsPolicy.jsx
import React from "react";

const TermsPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Terms & Policy</h1>
      <div className="max-w-4xl mx-auto text-gray-700 space-y-6">
        <h2 className="text-2xl font-semibold">Terms of Service</h2>
        <p>
          By using TShirt-Shop, you agree to comply with our terms of service. 
          You must provide accurate information and not engage in fraudulent activities. 
          We reserve the right to suspend or terminate accounts that violate our rules.
        </p>
        <h2 className="text-2xl font-semibold">Privacy Policy</h2>
        <p>
          We respect your privacy and do not share your personal data with third parties without your consent. 
          Your information is used to improve your shopping experience and provide better customer support.
        </p>
        <h2 className="text-2xl font-semibold">Returns & Refunds</h2>
        <p>
          All return requests must be made within 14 days of delivery. Items must be unused and in original packaging. 
          Refunds will be processed after inspection of the returned item.
        </p>
        <h2 className="text-2xl font-semibold">Shipping Policy</h2>
        <p>
          We offer worldwide shipping with tracking. Delivery times may vary depending on location. 
          Shipping charges may apply for certain regions.
        </p>
      </div>
    </div>
  );
};

export default TermsPolicy;
