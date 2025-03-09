"use client"
import { FaCar, FaTaxi } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceModal({ isOpen, onClose }: ServiceModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleServiceSelect = (type: 'taxi' | 'rental') => {
    onClose();
    router.push(type === 'taxi' ? '/book-now' : '/rent-now');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">Choose Your Service</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleServiceSelect('taxi')}
            className="flex flex-col items-center bg-gray-800 hover:bg-gray-700 p-6 rounded-xl transition-all group"
          >
            <FaTaxi className="text-4xl text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">Call a Cab</h3>
            <p className="text-sm text-gray-400 text-center">Book a taxi for your journey</p>
          </button>

          <button
            onClick={() => handleServiceSelect('rental')}
            className="flex flex-col items-center bg-gray-800 hover:bg-gray-700 p-6 rounded-xl transition-all group"
          >
            <FaCar className="text-4xl text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">Rent a Car</h3>
            <p className="text-sm text-gray-400 text-center">Rent a vehicle for your needs</p>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
} 