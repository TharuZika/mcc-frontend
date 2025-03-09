"use client"
import Link from 'next/link';
import Image from 'next/image';
import { FaPhoneAlt } from 'react-icons/fa';

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-10 h-10 mr-2 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Ride Share"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white text-xl font-bold tracking-wider">
                <span className="text-amber-400">RIDE</span> SHARE
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-wider">HOME</Link>
            <Link href="/pages" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-wider">FLEET</Link>
            <Link href="/about" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-wider">ABOUT US</Link>
            <Link href="/blog" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-wider">BLOG</Link>
            <Link href="/contact" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-wider">CONTACT</Link>
            <div className="flex items-center text-amber-300 pl-4 border-l border-gray-700">
              <FaPhoneAlt className="mr-2 animate-pulse" />
              <span className="font-semibold">+1 (555) 555 1234</span>
            </div>
            <Link 
              href="/book" 
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-2.5 rounded-lg font-bold shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all"
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 