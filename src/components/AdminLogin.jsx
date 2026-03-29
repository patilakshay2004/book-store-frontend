import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from '../utils/baseURL';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      const auth = response.data;

      if(auth.token) {
        localStorage.setItem('token', auth.token);

        setTimeout(() => {
          localStorage.removeItem('token');
          alert('Token has expired! Please login again.');
          navigate("/");
        }, 3600 * 1000); // 1 hour expiration
      }

      alert("Admin Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMessage("Invalid username or password");
      console.error(error);
    }
  }

  return (
    <div className='h-screen flex justify-center items-center bg-gray-100'>
      <div className='w-full max-w-md bg-white shadow-xl rounded-lg px-10 py-8'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Admin Dashboard Login</h2>

        {message && <p className='text-red-500 text-center mb-4'>{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className='block text-gray-700 mb-2 font-medium' htmlFor="username">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              id="username"
              placeholder='Enter your username'
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.username && <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className='block text-gray-700 mb-2 font-medium' htmlFor="password">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              placeholder='Enter your password'
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all disabled:bg-blue-300'
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className='mt-6 text-center text-gray-500 text-sm'>©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  )
}

export default AdminLogin;