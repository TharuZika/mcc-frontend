"use client"
import { useState } from 'react';
import { FaCar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { bookingDetailsAtom } from '@/atoms/bookingAtoms';

export default function BookingForm() {
  const router = useRouter();
  const setBookingDetails = useSetAtom(bookingDetailsAtom);
  
  const [location, setLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [serviceType, setServiceType] = useState('taxi');
  const [rentalDays, setRentalDays] = useState(1);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!location) {
      setError('Please enter pickup location');
      return;
    }
    if (serviceType === 'taxi' && !dropLocation) {
      setError('Please enter drop-off location');
      return;
    }
    if (!vehicleType) {
      setError('Please select vehicle type');
      return;
    }
    if (serviceType === 'taxi' && (!pickupDate || !pickupTime)) {
      setError('Please select pickup date and time');
      return;
    }

    setBookingDetails({
      serviceType: serviceType as 'taxi' | 'rental',
      pickupLocation: location,
      dropLocation: serviceType === 'taxi' ? dropLocation : undefined,
      pickupDate: serviceType === 'taxi' ? pickupDate : undefined,
      pickupTime: serviceType === 'taxi' ? pickupTime : undefined,
      rentalDays: serviceType === 'rental' ? rentalDays : undefined,
      vehicleType
    });

    router.push(serviceType === 'taxi' ? '/book-now' : '/rent-now');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 hover:border-amber-500/30 transition-colors duration-500">
      <h3 className="text-2xl font-bold mb-6 text-center">Book Your Cab</h3>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
          {error}
        </div>
      )}

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

      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-300">Pickup Location</label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-amber-400 z-10" />
            <input
              type="text"
              placeholder="Enter pickup location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-white/10 border border-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {serviceType === 'taxi' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-300">Pickup Date</label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-3 text-amber-400" />
                  <input 
                    type="date" 
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
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
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-white/10 border border-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-300">Drop-off Location</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-amber-400 z-10" />
                <input
                  type="text"
                  placeholder="Enter drop-off location"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className="w-full bg-white/10 border border-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </>
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
            <select 
              className="w-full bg-white/10 border border-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" className="bg-gray-900">Select vehicle type</option>
              <option value="CAR" className="bg-gray-900">Car</option>
              <option value="SUV" className="bg-gray-900">SUV</option>
              <option value="VAN" className="bg-gray-900">Van</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="h-4 w-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all"
        >
          {serviceType === 'taxi' ? 'BOOK TAXI' : 'RENT CAR'}
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        <p>Terms and conditions apply.</p>
      </div>
    </div>
  );
} 