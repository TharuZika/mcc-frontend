"use client"
import { useState } from 'react';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        username: loginDetails.username,
        password: loginDetails.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid username or password');
      } else {
        router.push('/'); // Redirect to home page after successful login
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 rounded-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-amber-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={loginDetails.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Password Input */}
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

              {/* Remember Me & Forgot Password */}
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

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 text-black py-3 rounded-lg font-bold text-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              {/* Social Login Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800/50 text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
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

              {/* Register Link */}
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