"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { mockBookingService } from '@/lib/mockData';
import type { Booking } from '@/lib/mockData';

export default function MyBookingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.id) {
      router.push('/login?callbackUrl=/my-bookings');
      return;
    }

    const fetchBookings = async () => {
      try {
        const data = await mockBookingService.getUserBookings(session.user.id);
        setBookings(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching your bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500 text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center">
            <p className="text-gray-400">You haven't made any bookings yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-amber-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {booking.vehicle.make} {booking.vehicle.model}
                    </h3>
                    <p className="text-amber-500">{booking.serviceType.toUpperCase()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === 'COMPLETED' ? 'bg-green-500/20 text-green-500' :
                    booking.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-2 text-gray-300 text-sm">
                  <p>
                    <span className="text-gray-400">From:</span> {booking.pickupLocation}
                  </p>
                  <p>
                    <span className="text-gray-400">To:</span> {booking.dropLocation}
                  </p>
                  <p>
                    <span className="text-gray-400">Date:</span> {new Date(booking.pickupDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="text-gray-400">Time:</span> {booking.pickupTime}
                  </p>
                  {booking.rentalDays && (
                    <p>
                      <span className="text-gray-400">Duration:</span> {booking.rentalDays} days
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Amount</span>
                    <span className="text-white font-semibold">
                      ${booking.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 