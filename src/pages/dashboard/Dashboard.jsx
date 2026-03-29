import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { MdIncompleteCircle } from 'react-icons/md';
import RevenueChart from './RevenueChart';
import { FaBook, FaDollarSign, FaChartLine, FaShoppingCart } from 'react-icons/fa';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        alert('Failed to fetch dashboard data. Please login again.');
        navigate('/'); // redirect to login
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <Loading />;

  const stats = [
    {
      title: "Products",
      value: data.totalBooks,
      icon: <FaBook className="h-6 w-6" />,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Total Sales",
      value: `$${data.totalSales}`,
      icon: <FaDollarSign className="h-6 w-6" />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Trending Books",
      value: data.trendingBooks,
      icon: <FaChartLine className="h-6 w-6" />,
      bg: "bg-red-100",
      color: "text-red-600",
      subtitle: "(13%)",
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: <MdIncompleteCircle className="h-6 w-6" />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-8 px-6 py-6 bg-gray-50 min-h-screen">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
          >
            <div
              className={`inline-flex items-center justify-center h-16 w-16 rounded-full mr-6 ${item.bg} ${item.color} text-2xl`}
            >
              {item.icon}
            </div>
            <div>
              <span className="block text-3xl font-bold text-gray-800">{item.value}</span>
              {item.subtitle && <span className="inline-block text-lg text-gray-500 font-medium ml-2">{item.subtitle}</span>}
              <span className="block text-gray-500 font-medium">{item.title}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Revenue Chart */}
      <section className="p-6 bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Revenue Chart</h3>
          <span className="text-sm text-gray-500">Last 30 Days</span>
        </div>
        <RevenueChart data={data.revenueStats} />
      </section>

      {/* Recent Orders or Stats Table (Optional) */}
      {/* <section className="p-6 bg-white shadow-lg rounded-xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h3>
        <RecentOrdersTable orders={data.recentOrders} />
      </section> */}
    </div>
  );
};

export default Dashboard;