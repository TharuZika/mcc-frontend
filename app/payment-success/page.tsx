"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface BookingData {
  bookingId: string;
  timestamp: string;
  totalAmount: number;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  bookingDetails: any;
  selectedVehicle: any;
}

const dummyBookingData: BookingData = {
  bookingId: "GS3PA17R",
  timestamp: new Date().toISOString(),
  totalAmount: 385,
  customerDetails: {
    name: "Tharushika Dilakshan",
    email: "tharuzika@gmail.com",
    phone: "0788877145",
  },
  bookingDetails: {
    serviceType: "taxi",
    pickupLocation: "Bedi mawatha Akmeemana",
    dropoffLocation: "Galle Bus Stand",
    pickupDateTime: "2025-03-14 at 2:34 PM",
    dropoffDateTime: "2025-03-14T11:00:00Z",
    duration: "4 hours",
  },
  selectedVehicle: {
    vehicleId: "VH-78910",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    type: "CAR",
    color: "White",
    plateNumber: "WP ABC-1234",
  },
};

console.log(dummyBookingData);


export default function PaymentSuccess() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(dummyBookingData);

  useEffect(() => {
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  const handleDownloadPDF = async () => {
    const invoice = document.getElementById('invoice');
    if (!invoice) return;

    const canvas = await html2canvas(invoice);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${bookingData?.bookingId}.pdf`);
  };

  const handleReturnHome = () => {
    localStorage.removeItem('bookingData');
    router.push('/');
  };

  // if (!bookingData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white text-gray-800 rounded-xl p-8 shadow-lg" id="invoice">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-amber-600">Invoice</h1>
                <p className="text-gray-600">Booking ID: {bookingData.bookingId}</p>
                <p className="text-gray-600">Date: {new Date(bookingData.timestamp).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-gray-800">Mega City Cabs</h2>
                <p className="text-gray-600">Galle Road</p>
                <p className="text-gray-600">Colombo 07</p>
                <p className="text-gray-600">Tel: +94 77 5080 969</p>
                <p className="text-gray-600">Email: info@megacitycab.com</p>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <h3 className="text-lg font-semibold mb-3">Customer Details</h3>
              <p className="text-gray-600">Name: {bookingData.customerDetails.name}</p>
              <p className="text-gray-600">Email: {bookingData.customerDetails.email}</p>
              <p className="text-gray-600">Phone: {bookingData.customerDetails.phone}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Booking Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Service Type: {bookingData.bookingDetails.serviceType}</p>
                  <p className="text-gray-600">Vehicle: {bookingData.selectedVehicle.make} {bookingData.selectedVehicle.model}</p>
                  <p className="text-gray-600">Vehicle Type: {bookingData.selectedVehicle.type}</p>
                  <p className="text-gray-600">Driver Name: Thilanka Kumara</p>
                </div>
                <div>
                  <p className="text-gray-600">Pickup Location: {bookingData.bookingDetails.pickupLocation}</p>
                  {bookingData.bookingDetails.serviceType === 'taxi' ? (
                    <>
                      <p className="text-gray-600">Drop-off Location: {bookingData.bookingDetails.dropoffLocation}</p>
                      <p className="text-gray-600">Pickup Date: {bookingData.bookingDetails.pickupDateTime}</p>
                      {/* <p className="text-gray-600">Pickup Time: {bookingData.bookingDetails.pickupTime}</p> */}
                    </>
                  ) : (
                    <p className="text-gray-600">Rental Duration: {bookingData.bookingDetails.rentalDays} days</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total Amount</span>
                <span className="text-amber-600">Rs. {bookingData.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-amber-500 text-black rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Download Invoice
            </button>
            <button
              onClick={handleReturnHome}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 