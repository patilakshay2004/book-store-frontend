import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [message, setMessage] = useState("");
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Google sign in failed!");
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
          </div>

          {message && <p className="text-red-500 text-sm mb-4">{message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Login
          </Link>
        </p>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            <FaGoogle />
            Sign in with Google
          </button>
        </div>

        <p className="mt-8 text-center text-gray-400 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;