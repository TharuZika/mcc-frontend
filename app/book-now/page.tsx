"use client"
import { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAtom, useAtomValue } from 'jotai';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import VehicleCard from '@/components/vehicle/VehicleCard';
import { bookingDetailsAtom, selectedVehicleAtom } from '@/atoms/bookingAtoms';

interface Vehicle {
  id: number;
  type: string;
  seats: number;
  model: string;
  plateNo: string;
  make: string;
  year: number;
  pricePerDay: number;
  pricePerKm: number;
  imgUrl: string;
  status: string;
  rent: boolean;
  taxi: boolean;
}

export default function BookNow() {
  const router = useRouter();
  const bookingDetails = useAtomValue(bookingDetailsAtom);
  const [, setSelectedVehicle] = useAtom(selectedVehicleAtom);
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    type: bookingDetails?.vehicleType || '',
    minSeats: '',
    maxPrice: ''
  });

  // Redirect if no booking details
  // useEffect(() => {
  //   if (!bookingDetails) {
  //     router.push('/');
  //   }
  // }, [bookingDetails, router]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.minSeats) queryParams.append('minSeats', filters.minSeats);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);

      const response = await fetch(`http://localhost:8080/api/vehicles/taxi`);
      const data = await response.json();
      
      if (data.status === 200) {
        setVehicles(data.data);
      } else {
        setError(data.message || 'Failed to fetch vehicles');
      }
    } catch (err) {
      setError('Failed to fetch vehicles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVehicleSelect = (vehicleId: number) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      router.push('/checkout');
    }
  };

  // if (!bookingDetails) {
  //   return null; // Will redirect in useEffect
  // }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Book a Taxi</h1>

        {/* Booking Summary */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-300">
            <div>
              <span className="block text-sm text-gray-400">Pickup Location</span>
              <span className="block">{bookingDetails?.pickupLocation}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Drop-off Location</span>
              <span className="block">{bookingDetails?.dropLocation}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Pickup Date & Time</span>
              <span className="block">
                {bookingDetails?.pickupDate} at {bookingDetails?.pickupTime}
              </span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Vehicle Type</span>
              <span className="block">{bookingDetails?.vehicleType}</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search by make, model..."
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>

            {/* Vehicle Type */}
            <div className="relative">
              <select
                name="type"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.type}
                onChange={handleFilterChange}
              >
                <option value="">All Types</option>
                <option value="CAR">Car</option>
                <option value="SUV">SUV</option>
                <option value="VAN">Van</option>
              </select>
            </div>

            {/* Min Seats */}
            <div className="relative">
              <input
                type="number"
                name="minSeats"
                placeholder="Min Seats"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.minSeats}
                onChange={handleFilterChange}
                min="1"
              />
            </div>

            {/* Max Price per KM */}
            <div className="relative">
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price per KM"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading vehicles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No vehicles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map(vehicle => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={handleVehicleSelect}
                mode="taxi"
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
} 