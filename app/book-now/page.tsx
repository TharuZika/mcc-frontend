"use client"
import { useState } from 'react';
import { FaSearch, FaCar, FaFilter, FaDollarSign, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const vehicles = [
  {
    id: 1,
    name: 'Mercedes S-Class',
    type: 'Luxury Sedan',
    price: 75,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    features: ['Leather Seats', 'WiFi', 'Premium Sound'],
    passengers: 4
  },
  {
    id: 2,
    name: 'BMW 7 Series',
    type: 'Luxury Sedan',
    price: 70,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    features: ['Heated Seats', 'WiFi', 'Premium Sound'],
    passengers: 4
  },
  {
    id: 3,
    name: 'Tesla Model S',
    type: 'Electric Luxury',
    price: 80,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    features: ['Autopilot', 'Zero Emissions', 'Premium Sound'],
    passengers: 5
  },
];

export default function BookNow() {
  const [filters, setFilters] = useState({
    type: '',
    priceRange: '',
    passengers: '',
    searchTerm: ''
  });

  const filteredVehicles = vehicles.filter(vehicle => {
    if (filters.searchTerm && !vehicle.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.type && vehicle.type !== filters.type) {
      return false;
    }
    if (filters.passengers && vehicle.passengers !== parseInt(filters.passengers)) {
      return false;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Book a Taxi</h1>
        
        {/* filter Section */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            {/* search Bar */}
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

            {/* vehicle Type Filter */}
            <div className="w-full sm:w-auto">
              <select
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">Vehicle Type</option>
                <option value="Luxury Sedan">Luxury Sedan</option>
                <option value="Electric Luxury">Electric Luxury</option>
                <option value="SUV">SUV</option>
              </select>
            </div>

            {/* passengers Filter */}
            <div className="w-full sm:w-auto">
              <select
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.passengers}
                onChange={(e) => setFilters({...filters, passengers: e.target.value})}
              >
                <option value="">Passengers</option>
                <option value="2">2 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5 Passengers</option>
                <option value="6">6+ Passengers</option>
              </select>
            </div>

            {/* price Range Filter */}
            <div className="w-full sm:w-auto">
              <select
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              >
                <option value="">Price Range</option>
                <option value="50-75">$50-$75</option>
                <option value="75-100">$75-$100</option>
                <option value="100+">$100+</option>
              </select>
            </div>
          </div>
        </div>

        {/* vehicle Cards Grid */}
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

                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-amber-400">
                    ${vehicle.price}
                    <span className="text-sm text-gray-400">/hour</span>
                  </div>
                  <button
                    className="bg-amber-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors"
                    onClick={() => {console.log("Booking")}}
                  >
                    Book Now
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