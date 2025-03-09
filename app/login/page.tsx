"use client"
import { useState } from 'react';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login details:', loginDetails);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 rounded-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-amber-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={loginDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-amber-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={loginDetails.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={loginDetails.rememberMe}
                    onChange={handleInputChange}
                    className="rounded bg-gray-700 border-gray-600 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-amber-400 hover:text-amber-300">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 text-black py-3 rounded-lg font-bold text-lg hover:bg-amber-600 transition-colors"
              >
                Login
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800/50 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 bg-gray-700 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FaGoogle className="text-red-500" />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 bg-gray-700 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FaFacebook className="text-blue-500" />
                  <span>Facebook</span>
                </button>
              </div>

              <p className="text-center text-gray-400">
                Don't have an account?{' '}
                <Link href="/register" className="text-amber-400 hover:text-amber-300">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}