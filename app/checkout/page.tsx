"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { bookingDetailsAtom, selectedVehicleAtom } from '@/atoms/bookingAtoms';
import CheckoutForm from '@/components/checkout/CheckoutForm';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function Checkout() {
  const router = useRouter();
  const bookingDetails = useAtomValue(bookingDetailsAtom);
  const selectedVehicle = useAtomValue(selectedVehicleAtom);

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  // Redirect if no booking details or selected vehicle
  useEffect(() => {
    if (!bookingDetails || !selectedVehicle) {
      router.push('/');
    }
  }, [bookingDetails, selectedVehicle, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!bookingDetails || !selectedVehicle) {
    return null; // Will redirect in useEffect
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            {/* Customer Details */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Customer Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={customerDetails.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={customerDetails.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={customerDetails.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerDetails.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                  <textarea
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-white/10 border border-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={customerDetails.city}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={customerDetails.state}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={customerDetails.zipCode}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-8">
            {/* Vehicle Details */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Vehicle Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Vehicle</span>
                  <span className="font-medium">{selectedVehicle.make} {selectedVehicle.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Type</span>
                  <span className="font-medium">{selectedVehicle.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Seats</span>
                  <span className="font-medium">{selectedVehicle.seats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Plate No</span>
                  <span className="font-medium">{selectedVehicle.plateNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Year</span>
                  <span className="font-medium">{selectedVehicle.year}</span>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Booking Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Service Type</span>
                  <span className="font-medium capitalize">{bookingDetails.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Pickup Location</span>
                  <span className="font-medium">{bookingDetails.pickupLocation}</span>
                </div>
                {bookingDetails.serviceType === 'taxi' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Drop-off Location</span>
                      <span className="font-medium">{bookingDetails.dropLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pickup Date</span>
                      <span className="font-medium">{bookingDetails.pickupDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pickup Time</span>
                      <span className="font-medium">{bookingDetails.pickupTime}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Rental Duration</span>
                    <span className="font-medium">{bookingDetails.rentalDays} days</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Price Details</h2>
              <div className="space-y-4">
                {bookingDetails.serviceType === 'taxi' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Price per KM</span>
                      <span className="font-medium">Rs. {selectedVehicle.pricePerKm?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Estimated Distance</span>
                      <span className="font-medium">13KM</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Price per Day</span>
                      <span className="font-medium">Rs. {selectedVehicle.pricePerDay?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Number of Days</span>
                      <span className="font-medium">{bookingDetails.rentalDays}</span>
                    </div>
                  </>
                )}
                <div className="pt-4 border-t border-gray-600">
                  <div className="flex justify-between text-lg">
                    <span className="font-medium text-gray-300">Total Amount</span>
                    <span className="font-bold text-amber-500">
                      Rs. {bookingDetails.serviceType === 'rental'
                        ? (selectedVehicle.pricePerDay! * bookingDetails.rentalDays!).toFixed(2)
                        : {(selectedVehicle.pricePerKm! * 13).toFixed(2)}
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 