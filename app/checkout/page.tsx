"use client"
import { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCar, FaCalendar, FaClock, FaUserTie } from 'react-icons/fa';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Image from 'next/image';


const cardElementStyles = {
    style: {
      base: {
        border: "1px solid gray",
        iconColor: "#424770",
        fontSize: "18px",
        color: "#424770",
        fontFamily: "Arial, sans-serif",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "20px 0",
  
        lineHeight: "48px",
      },
      invalid: {
        color: "#9e2146",
        iconColor: "#9e2146",
      },
    },
  };

const stripePromise = loadStripe("pk_test_51QqwtFFqcbje1ppeF1QqdIPEEhhofmcv03GRGoMWlcnQPjJ4Q2GShkU8H3AWfkpUra3DFWhkcik5TESZpriK9jxS00rrfmfNPe");

const mockBookingData = {
  serviceType: 'taxi', 
  vehicle: {
    name: 'Mercedes S-Class',
    plateNo: 'ABC123',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    type: 'Luxury Sedan',
    features: ['Leather Seats', 'WiFi', 'Premium Sound']
  },
  booking: {
    pickupDate: '2024-03-20',
    pickupTime: '14:00',
    pickupLocation: '123 Main St, City',
    dropoffLocation: '456 Park Ave, City',
    duration: 2, 
    isRental: false
  },
  driver: {
    name: 'John Smith',
    phone: '+1 (555) 123-4567',
    rating: 4.9,
    experience: '5 years'
  },
  pricing: {
    subtotal: 150,
    tax: 15,
    advanceAmount: 50,
    total: 165
  }
};

const PaymentForm = () => {
  const handleChange = (event: any) => {
    if (event.error) {
      console.log('[error]', event.error);
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  return (
    <div className="w-full">
      <CardElement options={cardStyle} onChange={handleChange} />
    </div>
  );
};

export default function Checkout() {
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* payment / customer details */}
          <div className="space-y-8">
            {/* payment details */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
              <Elements stripe={stripePromise}>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <PaymentForm />
                </div>
              </Elements>
            </div>

            {/* cstomer details */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Customer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-amber-400" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={customerDetails.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-amber-400" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={customerDetails.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-amber-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={customerDetails.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 text-amber-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={customerDetails.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative md:col-span-2">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-amber-400" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={customerDetails.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={customerDetails.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={customerDetails.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* booking summary */}
          <div className="space-y-8">
            {/* vehicle details */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Vehicle Details</h2>
              <div className="flex items-start space-x-4">
                <div className="relative w-32 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={mockBookingData.vehicle.image}
                    alt={mockBookingData.vehicle.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{mockBookingData.vehicle.name}</h3>
                  <p className="text-gray-400">Plate No: {mockBookingData.vehicle.plateNo}</p>
                  <p className="text-gray-400">{mockBookingData.vehicle.type}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mockBookingData.vehicle.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-sm px-2 py-1 rounded-full text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* booking details */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaCalendar className="text-amber-400 mr-3" />
                  <div>
                    <p className="text-gray-400">Pickup Date</p>
                    <p className="font-semibold">{mockBookingData.booking.pickupDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-amber-400 mr-3" />
                  <div>
                    <p className="text-gray-400">Pickup Time</p>
                    <p className="font-semibold">{mockBookingData.booking.pickupTime}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-amber-400 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-400">Pickup Location</p>
                    <p className="font-semibold">{mockBookingData.booking.pickupLocation}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-amber-400 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-400">Drop-off Location</p>
                    <p className="font-semibold">{mockBookingData.booking.dropoffLocation}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-amber-400 mr-3" />
                  <div>
                    <p className="text-gray-400">Duration</p>
                    <p className="font-semibold">
                      {mockBookingData.booking.duration} {mockBookingData.booking.isRental ? 'days' : 'hours'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* driver details (for taxi service) */}
            {!mockBookingData.booking.isRental && (
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">Driver Details</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <FaUserTie className="text-2xl text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{mockBookingData.driver.name}</h3>
                    <p className="text-gray-400">{mockBookingData.driver.phone}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-amber-400 mr-2">★</span>
                      <span>{mockBookingData.driver.rating}</span>
                      <span className="text-gray-400 ml-2">• {mockBookingData.driver.experience} experience</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* price details */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Price Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${mockBookingData.pricing.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax (10%)</span>
                  <span>${mockBookingData.pricing.tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Advance Amount</span>
                  <span>${mockBookingData.pricing.advanceAmount}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-amber-400">${mockBookingData.pricing.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* place order button */}
            <button
              className="w-full bg-amber-500 text-black py-4 rounded-lg font-bold text-lg hover:bg-amber-600 transition-colors"
              onClick={() => {console.log("CLICKED")}}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 