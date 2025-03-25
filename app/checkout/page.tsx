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
import { toast } from 'react-toastify';
import Spinner from '@/components/common/Spinner';

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

export default function CheckoutPage() {
  const router = useRouter();
  const bookingDetails = useAtomValue(bookingDetailsAtom);
  const selectedVehicle = useAtomValue(selectedVehicleAtom);
  const [isLoading, setIsLoading] = useState(true);

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

  // Redirect if no booking details
  useEffect(() => {
    if (!selectedVehicle || !bookingDetails) {
      toast("Please select vehicle before make a booking!")
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [selectedVehicle, bookingDetails, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate total amount
  const calculateTotal = () => {
    if (bookingDetails?.serviceType === 'taxi') {
      // For taxi, we'll use a dummy distance of 10km for the mock data
      const estimatedDistance = 10;
      return Number(selectedVehicle?.pricePerKm || 0) * estimatedDistance;
    } else {
      // For rental, calculate based on days
      return Number(selectedVehicle?.pricePerDay || 0) * Number(bookingDetails?.rentalDays || 1);
    }
  };

  const total = calculateTotal();
  const tax = total * 0.1; // 10% tax
  const grandTotal = total + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <Spinner size="large" color="amber" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            {/* Customer Details */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
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
                  <input
                    type="text"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
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
                <div className="col-span-2">
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
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
              <Elements stripe={stripePromise}>
                <CheckoutForm customerDetails={customerDetails} />
              </Elements>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-8">
            {/* Vehicle Details */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Vehicle Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Vehicle</span>
                  <span className="font-medium">{selectedVehicle?.make} {selectedVehicle?.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Type</span>
                  <span className="font-medium">{selectedVehicle?.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Year</span>
                  <span className="font-medium">{selectedVehicle?.year}</span>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Booking Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Service Type</span>
                  <span className="font-medium capitalize">{bookingDetails?.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Pickup Location</span>
                  <span className="font-medium">{bookingDetails?.pickupLocation}</span>
                </div>
                {bookingDetails?.serviceType === 'taxi' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Drop-off Location</span>
                      <span className="font-medium">{bookingDetails?.dropLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pickup Date</span>
                      <span className="font-medium">{bookingDetails?.pickupDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pickup Time</span>
                      <span className="font-medium">{bookingDetails?.pickupTime}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Rental Duration</span>
                    <span className="font-medium">{bookingDetails?.rentalDays} days</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Price Details</h2>
              <div className="space-y-4">
                {bookingDetails?.serviceType === 'taxi' ? (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Price per KM</span>
                    <span className="font-medium">Rs. {selectedVehicle?.pricePerKm?.toFixed(2)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Price per Day</span>
                    <span className="font-medium">Rs. {selectedVehicle?.pricePerDay?.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="font-medium">Rs. {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tax (10%)</span>
                  <span className="font-medium">Rs. {tax.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>Rs. {grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 