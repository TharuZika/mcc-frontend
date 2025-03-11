"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import ServiceModal from '../modals/ServiceModal';

export default function Header() {
  const { data: session } = useSession();
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <div className="relative w-10 h-10 mr-2 overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    width={64}
                    height={64}
                    alt="Mega City Cab"
                    className="w-12 h-12"
                  />
                </div>
                {/* <span className="text-white text-xl font-bold tracking-wider">
                  <span className="text-amber-400">MEGA</span> CITY CAB
                </span> */}
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-wider">HOME</Link>
              <button 
                onClick={() => setIsServiceModalOpen(true)}
                className="text-white hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-wider"
              >
                FLEET
              </button>
              <Link href="/about" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-wider">ABOUT US</Link>
              <Link href="/blog" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-wider">BLOG</Link>
              <Link href="/contact" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-wider">CONTACT</Link>
              <div className="flex items-center text-amber-300 pl-4 border-l border-gray-700">
                <FaPhoneAlt className="mr-2 animate-pulse" />
                <span className="font-semibold">+1 (555) 555 1234</span>
              </div>
              {session ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-white">
                    <FaUser className="mr-2 text-amber-400" />
                    <span className="font-medium">{session.user?.name}</span>
                  </div>
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="bg-amber-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                >
                  Login
                </Link>
              )}
              <button 
                onClick={() => setIsServiceModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-2.5 rounded-lg font-bold shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all"
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </nav>

      <ServiceModal 
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
      />
    </>
  );
} 