"use client"
import { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { bookingDetailsAtom, selectedVehicleAtom } from '@/atoms/bookingAtoms';

const cardStyle = {
  style: {
    base: {
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      },
      backgroundColor: 'transparent'
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  
  const bookingDetails = useAtomValue(bookingDetailsAtom);
  const selectedVehicle = useAtomValue(selectedVehicleAtom);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create a payment method using the card element
      const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });

      if (cardError) {
        throw cardError;
      }

      // Calculate total amount
      const totalAmount = bookingDetails?.serviceType === 'rental'
        ? (selectedVehicle?.pricePerDay || 0) * (bookingDetails?.rentalDays || 1)
        : (selectedVehicle?.pricePerKm || 0) * 10; // Dummy distance for taxi

      // Simulate API call to backend
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod: "CARD",
          cardToken: "paymentMethod.id",
          bookingDetails,
          selectedVehicle,
          totalAmount,
          customerDetails: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            address: '123 Main St, Anytown, USA',
          }
        }),
      });

      if (!bookingResponse.ok) {
        throw new Error('Failed to process booking');
      }

      // Simulate successful booking
      const bookingData = {
        bookingId: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        timestamp: new Date().toISOString(),
        totalAmount,
        customerDetails: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
        },
        bookingDetails,
        selectedVehicle,
      };

      // Store booking data in localStorage for the success page
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
      
      // Redirect to success page
      router.push('/payment-success');
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing your payment.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white/10 border border-gray-600 rounded-lg p-4">
        <CardElement options={cardStyle} />
      </div>
      {error && (
        <div className="mt-4 text-red-500 text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-4 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : 'Confirm Payment'}
      </button>
    </form>
  );
} 