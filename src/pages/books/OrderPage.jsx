import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (isError) return <div className="text-center py-20 text-red-500">Error fetching orders data</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No orders found!</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div key={order._id} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300">
              <p className="text-sm font-semibold bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full mb-3">
                #{index + 1}
              </p>
              <h3 className="font-bold text-lg mb-1">Order ID: {order._id}</h3>
              <p className="text-gray-700"><strong>Name:</strong> {order.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {order.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {order.phone}</p>
              <p className="text-gray-700 font-semibold mt-2"><strong>Total Price:</strong> ${order.totalPrice}</p>

              <div className="mt-3">
                <h4 className="font-semibold">Address:</h4>
                <p className="text-gray-600 text-sm">
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <div className="mt-3">
                <h4 className="font-semibold">Products:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {order.productIds.map((productId) => (
                    <li key={productId}>{productId}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;