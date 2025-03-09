"use client"
import { useState } from 'react';
import { FaSearch, FaCar, FaFilter, FaDollarSign, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const rentalVehicles = [
  {
    id: 1,
    name: 'Porsche 911',
    type: 'Sports Car',
    price: 299,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    features: ['Sport Mode', 'Leather Interior', 'Premium Sound'],
    transmission: 'Automatic',
    mileage: 'Unlimited'
  },
  {
    id: 2,
    name: 'Range Rover Sport',
    type: 'Luxury SUV',
    price: 250,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    features: ['4x4', 'Panoramic Roof', 'Premium Sound'],
    transmission: 'Automatic',
    mileage: 'Unlimited'
  },
  {
    id: 3,
    name: 'Audi R8',
    type: 'Sports Car',
    price: 399,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    features: ['V10 Engine', 'Carbon Fiber', 'Sport Exhaust'],
    transmission: 'Automatic',
    mileage: '200 miles/day'
  },
];

export default function RentNow() {
  const [filters, setFilters] = useState({
    type: '',
    priceRange: '',
    transmission: '',
    searchTerm: ''
  });

  const filteredVehicles = rentalVehicles.filter(vehicle => {
    if (filters.searchTerm && !vehicle.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.type && vehicle.type !== filters.type) {
      return false;
    }
    if (filters.transmission && vehicle.transmission !== filters.transmission) {
      return false;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Rent a Car</h1>
        
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={filters.searchTerm}
                  onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                />
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <select
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">Vehicle Type</option>
                <option value="Sports Car">Sports Car</option>
                <option value="Luxury SUV">Luxury SUV</option>
                <option value="Luxury Sedan">Luxury Sedan</option>
                <option value="Supercar">Supercar</option>
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <select
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.transmission}
                onChange={(e) => setFilters({...filters, transmission: e.target.value})}
              >
                <option value="">Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <select
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              >
                <option value="">Price Range</option>
                <option value="100-200">$100-$200/day</option>
                <option value="200-300">$200-$300/day</option>
                <option value="300+">$300+/day</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-gray-800/50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:shadow-amber-500/10"
            >
              <div className="relative h-48">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{vehicle.name}</h3>
                    <p className="text-gray-400">{vehicle.type}</p>
                  </div>
                  <div className="flex items-center bg-amber-500/20 px-2 py-1 rounded">
                    <FaStar className="text-amber-400 mr-1" />
                    <span>{vehicle.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {vehicle.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-sm px-3 py-1 rounded-full text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                  <span>Transmission: {vehicle.transmission}</span>
                  <span>Mileage: {vehicle.mileage}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-amber-400">
                    ${vehicle.price}
                    <span className="text-sm text-gray-400">/day</span>
                  </div>
                  <button
                    className="bg-amber-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors"
                    onClick={() => {console.log("Clicked")}}
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
} 