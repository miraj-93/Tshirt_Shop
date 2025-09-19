import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <p className="text-sm">
          © {new Date().getFullYear()} TShirtShop. All rights reserved.
        </p>

        {/* Middle Links */}
        <div className="flex gap-6 text-sm my-3 md:my-0">
          <Link to="/aboutUs" className="hover:text-blue-400">About Us</Link>
          <Link to="/contact" className="hover:text-blue-400">Contact</Link>
          <Link to="/termsPolicy" className="hover:text-blue-400">Privacy Policy</Link>
        </div>

        {/* Right Section */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
