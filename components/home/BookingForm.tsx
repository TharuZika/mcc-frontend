"use client"
import { useState } from 'react';
import { FaCar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import CustomButton from '../common/CustomButton';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const libraries = ['places'];

export default function BookingForm() {
  const [location, setLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [serviceType, setServiceType] = useState('taxi');
  const [rentalDays, setRentalDays] = useState(1);

  const handlePlaceSelect = (place: any, type: 'pickup' | 'dropoff') => {
    if (place.formatted_address) {
      if (type === 'pickup') {
        setLocation(place.formatted_address);
      } else {
        setDropLocation(place.formatted_address);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={libraries as any}
    >
      <div className="w-full max-w-md mx-auto bg-black/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 hover:border-amber-500/30 transition-colors duration-500">
        <h3 className="text-2xl font-bold mb-6 text-center">Reserve Your Ride</h3>
        
        <div className="mb-8">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                serviceType === 'taxi'
                  ? 'bg-amber-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setServiceType('taxi')}
            >
              Taxi Service
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                serviceType === 'rental'
                  ? 'bg-amber-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setServiceType('rental')}
            >
              Car Rental
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-300">Pickup Location</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-amber-400 z-10" />
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    handlePlaceSelect(place, 'pickup');
                  });
                }}
              >
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/10 border border-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </Autocomplete>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-300">Pickup Date</label>
              <div className="relative">
                <FaClock className="absolute left-3 top-3 text-amber-400" />
                <input 
                  type="date" 
                  className="w-full bg-white/10 border border-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-300">Pickup Time</label>
              <div className="relative">
                <FaClock className="absolute left-3 top-3 text-amber-400" />
                <input 
                  type="time" 
                  className="w-full bg-white/10 border border-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          {serviceType === 'taxi' ? (
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-300">Drop-off Location</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-amber-400 z-10" />
                <Autocomplete
                  onLoad={(autocomplete) => {
                    autocomplete.addListener('place_changed', () => {
                      const place = autocomplete.getPlace();
                      handlePlaceSelect(place, 'dropoff');
                    });
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter drop-off location"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    className="w-full bg-white/10 border border-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </Autocomplete>
              </div>
            </div>
          ) : (
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-300">Rental Duration (Days)</label>
              <div className="relative">
                <FaClock className="absolute left-3 top-3 text-amber-400" />
                <input
                  type="number"
                  min="1"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(parseInt(e.target.value))}
                  className="w-full bg-white/10 border border-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
          
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-300">Vehicle Type</label>
            <div className="relative">
              <FaCar className="absolute left-3 top-3 text-amber-400" />
              <select className="w-full bg-white/10 border border-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                <option value="">Select vehicle type</option>
                <option value="luxury">Luxury Sedan</option>
                <option value="suv">Premium SUV</option>
                <option value="sports">Sports Car</option>
                <option value="executive">Executive Van</option>
              </select>
            </div>
          </div>
          
          <CustomButton
            onClick={() => window.location.href = serviceType === 'taxi' ? '/book-now' : '/rent-now'}
            variant="primary"
            className="w-full mt-4"
          >
            {serviceType === 'taxi' ? 'BOOK TAXI' : 'RENT CAR'}
          </CustomButton>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Terms and conditions apply.</p>
        </div>
      </div>
    </LoadScript>
  );
} 