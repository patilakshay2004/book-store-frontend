import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Admin", href: "/admin" },
  { name: "Orders", href: "/orders" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
  };

  const userName = currentUser?.email
    ? currentUser.email.substring(0, 3).toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <HiMiniBars3CenterLeft className="text-2xl" />
          </button>

          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            Bookify
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-gray-600 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/shop" className="hover:text-blue-600 transition">Shop</Link>
            <Link to="/orders" className="hover:text-blue-600 transition">Orders</Link>
          </div>
        </div>

        {/* Search Bar
        <div className="hidden md:block w-1/3">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <HiOutlineShoppingCart className="text-2xl text-gray-700" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                <span className="text-sm font-semibold">{userName}</span>
                <img
                  src={avatarImg}
                  className="w-7 h-7 rounded-full ring-2 ring-blue-500"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl overflow-hidden">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}

                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
            >
              Login <HiOutlineUser />
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col gap-3 text-gray-700">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/orders">Orders</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
