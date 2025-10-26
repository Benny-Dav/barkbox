import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-sm">
            We provide access to the best veterinary and other dog services in the country.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#homeBg" className="hover:text-white">Home</a></li>
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-2">
            <li>📍 Osu Plot 7, Accra GHANA</li>
            <li><Link to="mailto:barkbox@gmail.com">📧 barkbox@gmail.com</Link></li>
            <li>📞 +233 595 742 231</li>
          </ul>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-800 text-center py-4">
        <p className="text-sm">© 2024 BarkBox. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
