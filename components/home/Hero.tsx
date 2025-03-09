"use client"
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaClock, FaRegCreditCard } from 'react-icons/fa';
import CustomButton from '../common/CustomButton';

export default function Hero() {
  return (
    <div className="text-left max-w-2xl">
      <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight">
        <span className="block">Experience Luxury</span>
        <span className="block text-amber-400">On Four Wheels</span>
      </h1>
      <p className="text-xl mb-8 text-gray-300 leading-relaxed">
        Life is a journey best taken in style. Discover our premium fleet of luxury vehicles and elevate your travel experience.
      </p>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
          <FaStar className="text-amber-400 mr-2" />
          <span>Premium Selection</span>
        </div>
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
          <FaClock className="text-amber-400 mr-2" />
          <span>24/7 Service</span>
        </div>
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
          <FaRegCreditCard className="text-amber-400 mr-2" />
          <span>No Hidden Fees</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <CustomButton href="/fleet" variant="primary">
          VIEW FLEET
        </CustomButton>
        <CustomButton href="/about" variant="outline">
          LEARN MORE
        </CustomButton>
      </div>
    </div>
  );
} 