"use client"
import { useState } from 'react';
import Image from 'next/image';
import { FaCar, FaUsers, FaCalendar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useSetAtom, useAtomValue } from 'jotai';
import { bookingDetailsAtom, selectedVehicleAtom } from '@/atoms/bookingAtoms';
import BookingFormModal from '../modals/BookingFormModal';

interface VehicleCardProps {
  vehicle: {
    id: number;
    make: string;
    model: string;
    type: string;
    seats: number;
    year: number;
    plateNo: string;
    pricePerDay?: number;
    pricePerKm?: number;
    imgUrl: string;
  };
  mode: 'taxi' | 'rental';
}

export default function VehicleCard({ vehicle, mode }: VehicleCardProps) {
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const setSelectedVehicle = useSetAtom(selectedVehicleAtom);
  const bookingDetails = useAtomValue(bookingDetailsAtom);

  const handleBookNow = () => {
    if (bookingDetails) {
      // If we have booking details, set the selected vehicle and go to checkout
      setSelectedVehicle(vehicle);
      router.push('/checkout');
    } else {
      // If no booking details, show the booking form modal
      setIsBookingModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all group">
        {/* Vehicle Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={vehicle.imgUrl || "/images/logo.png"}
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Vehicle Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{vehicle.make} {vehicle.model}</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-400">
              <FaCar className="mr-2 text-amber-500" />
              <span>{vehicle.type}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <FaUsers className="mr-2 text-amber-500" />
              <span>{vehicle.seats} Seats</span>
            </div>
            <div className="flex items-center text-gray-400">
              <FaCalendar className="mr-2 text-amber-500" />
              <span>{vehicle.year}</span>
            </div>
          </div>

          <div className="text-amber-500">
            <span className="text-sm">Price {mode === 'taxi' ? 'per KM' : 'per Day'}</span>
            <p className="text-xl font-bold">
              Rs. {mode === 'taxi' ? vehicle.pricePerKm?.toFixed(2) : vehicle.pricePerDay?.toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleBookNow}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black px-4 py-2 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all mt-4"
          >
            Book Now
          </button>
        </div>
      </div>

      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType={mode}
        vehicle={vehicle}
      />
    </>
  );
} 