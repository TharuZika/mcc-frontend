"use client"
import { useState } from 'react';
import { FaCar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { bookingDetailsAtom, selectedVehicleAtom } from '@/atoms/bookingAtoms';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: 'taxi' | 'rental';
  vehicle: any;
}

export default function BookingFormModal({ isOpen, onClose, serviceType, vehicle }: BookingFormModalProps) {
  const router = useRouter();
  const setBookingDetails = useSetAtom(bookingDetailsAtom);
  const setSelectedVehicle = useSetAtom(selectedVehicleAtom);
  
  const [location, setLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [rentalDays, setRentalDays] = useState(1);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
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
    if (serviceType === 'taxi' && (!pickupDate || !pickupTime)) {
      setError('Please select pickup date and time');
      return;
    }

    setBookingDetails({
      serviceType,
      pickupLocation: location,
      dropLocation: serviceType === 'taxi' ? dropLocation : undefined,
      pickupDate: serviceType === 'taxi' ? pickupDate : undefined,
      pickupTime: serviceType === 'taxi' ? pickupTime : undefined,
      rentalDays: serviceType === 'rental' ? rentalDays : undefined,
      vehicleType: vehicle.type
    });

    setSelectedVehicle(vehicle);
    onClose();
    router.push('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">Book Your {serviceType === 'taxi' ? 'Taxi' : 'Rental'}</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
            {error}
          </div>
        )}

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

          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 