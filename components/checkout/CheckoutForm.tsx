"use client"
import { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { useSession } from 'next-auth/react';
import { bookingDetailsAtom, selectedVehicleAtom } from '@/atoms/bookingAtoms';
import Spinner from '@/components/common/Spinner';

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

interface CheckoutFormProps {
  customerDetails: CustomerDetails;
}

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

  

const SPRING_BOOT_API = 'http://localhost:8080/api'; // Update this with your Spring Boot API URL

export default function CheckoutForm({ customerDetails }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  
  const bookingDetails = useAtomValue(bookingDetailsAtom);
  const selectedVehicle = useAtomValue(selectedVehicleAtom);
  const { data: session } = useSession();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!session?.accessToken) {
      setError('Please login to continue');
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

      // Send booking request to Spring Boot backend
      const bookingResponse = await fetch(`${SPRING_BOOT_API}/bookings/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          paymentMethod: "CARD",
          cardToken: paymentMethod.id,
          bookingDetails: {
            serviceType: bookingDetails?.serviceType,
            pickupLocation: bookingDetails?.pickupLocation,
            dropLocation: bookingDetails?.dropLocation,
            pickupDate: bookingDetails?.pickupDate,
            pickupTime: bookingDetails?.pickupTime,
            rentalDays: bookingDetails?.rentalDays,
            vehicleType: bookingDetails?.vehicleType
          },
          vehicle: {
            id: selectedVehicle?.id,
            make: selectedVehicle?.make,
            model: selectedVehicle?.model,
            type: selectedVehicle?.type,
            pricePerDay: selectedVehicle?.pricePerDay,
            pricePerKm: selectedVehicle?.pricePerKm
          },
          totalAmount,
          customerDetails: {
            name: `${customerDetails.firstName} ${customerDetails.lastName}`,
            email: customerDetails.email,
            phone: customerDetails.phone,
            address: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.state} ${customerDetails.zipCode}`,
          }
        }),
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.message || 'Failed to process booking');
      }

      const bookingResult = await bookingResponse.json();

      // Store booking data in localStorage for the success page
      const bookingData = {
        bookingId: bookingResult.id || 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        timestamp: new Date().toISOString(),
        totalAmount,
        customerDetails: {
          name: `${customerDetails.firstName} ${customerDetails.lastName}`,
          email: customerDetails.email,
          phone: customerDetails.phone,
        },
        bookingDetails,
        selectedVehicle,
      };

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
        className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-4 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {processing ? (
          <>
            <Spinner size="small" color="white" />
            <span className="ml-2">Processing...</span>
          </>
        ) : (
          'Confirm Payment'
        )}
      </button>
    </form>
  );
} 