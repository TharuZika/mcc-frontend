"use client"
import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Image
                src="/images/logo.png"
                width={48}
                height={48}
                alt="Mega City Cab"
                className="w-12 h-12"
              />
              <span className="text-white text-xl font-bold">
                <span className="text-amber-400">MEGA</span> CITY CAB
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Premium car rental and transportation services for those who expect excellence.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`} 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white transition-colors"
                >
                  <span className="sr-only">{social}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li><Link href="/fleet" className="hover:text-amber-400 transition-colors">Our Fleet</Link></li>
              <li><Link href="/pricing" className="hover:text-amber-400 transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-amber-400 transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-amber-400 mr-3 mt-1" />
                <span>123 Luxury Drive, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-amber-400 mr-3" />
                <span>+94 77 5080 969</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-amber-500" />
                <span>info@megacitycab.com</span>
              </li>
              <li className="flex items-center">
                <FaClock className="text-amber-400 mr-3" />
                <span>Open 24/7</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button 
                  type="submit" 
                  className="bg-amber-500 text-black px-4 py-2 rounded-r-lg hover:bg-amber-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
            <p className="text-gray-500 text-sm">
              By subscribing, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Mega City Cab Luxury Rentals. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</Link>
              <Link href="/faq" className="text-gray-500 hover:text-gray-400 text-sm">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 