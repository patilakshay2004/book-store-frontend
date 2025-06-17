import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Admin Login", href: "/admin" },
    { name: "Orders", href: "/orders" },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser, logout } = useAuth();

    const handleLogOut = () => {
        logout();
    };

    const token = localStorage.getItem('token');
    const userName = currentUser ? currentUser.email : null; // First 3 letters of email in uppercase

    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6 bg-slate-200">
            <nav className="flex justify-between items-center">
                {/* Left Side */}
                <div className="flex items-center md:gap-16 gap-2">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="size-6" />
                    </Link>

                    {/* Logo */}
                    <div className="relative sm:w-72 w-40 space-x-2">
                        <img src="https://portal.bookify.space/media/logos/logo.png" alt="#" width={150} />
                    </div>
                </div>

                {/* Right Side */}
                <div className="relative flex items-center md:space-x-8 space-x-2">
                    <div>
                        {
                            currentUser ? <>
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                                    className="flex gap-2">
                                    <span>{userName}</span> {/* Display first 3 letters of email */}
                                    <img src={avatarImg} alt="User Avatar" className={`size-6 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {
                                    isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                            <ul className="py-2">
                                                {
                                                    navigation.map((item) => (
                                                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                            <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                <li>
                                                    <button
                                                        onClick={handleLogOut}
                                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </> : token ? <Link to="/dashboard" className='border-b-2 border-primary'>Dashboard</Link> : (
                                <div className="flex py-2 px-4 bg-primary items-center rounded-md">
                                    <Link to="/login" className="text-md font-semibold sm:ml-1">Login</Link>
                                    <Link to="/login"><HiOutlineUser className="size-5 " /></Link>
                                </div>
                            )
                        }
                    </div>

                    {/* Cart Button */}
                    <Link to="/cart" className={`bg-primary py-2 px-4 flex items-center rounded-md ${cartItems.length > 0 ? 'bg-blue-500' : ''}`}>
                        <HiOutlineShoppingCart className='' />
                        <span className="text-sm font-semibold sm:ml-1">
                            {cartItems.length > 0 ? cartItems.length : 0}
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
