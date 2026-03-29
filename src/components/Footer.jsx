import React from 'react'
import footerLogo from "../assets/footer-logo.png"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* 🏷 Logo + About */}
        <div>
          <img src={footerLogo} alt="Logo" className="w-32 mb-4" />
          <p className="text-sm">
            Discover your next favorite book with Bookify. We bring you the best collection at unbeatable prices.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/books" className="hover:text-white">Books</a></li>
            <li><a href="/orders" className="hover:text-white">Orders</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* 📞 Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* 📩 Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Subscribe</h3>
          <p className="text-sm mb-4">
            Get latest updates and offers.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l-md text-black text-sm focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md text-white hover:bg-blue-700">
              Join
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-lg">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>

      </div>

      {/* 🔻 Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Bookify. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer