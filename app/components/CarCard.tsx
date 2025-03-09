import Image from 'next/image';
import { FaCar, FaGasPump } from 'react-icons/fa';
import { BsSpeedometer } from 'react-icons/bs';

interface CarCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  type: string;
  transmission: string;
  fuelType: string;
  year: number;
  mileage: string;
}

const CarCard = ({ id, name, image, price, type, transmission, fuelType, year, mileage }: CarCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-lg font-bold text-blue-600">${price}/day</p>
        </div>
        <div className="text-gray-600 text-sm mb-4">
          <p>Year: {year}</p>
          <p>Type: {type}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FaCar />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaGasPump />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <BsSpeedometer />
            <span>{mileage}</span>
          </div>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard; 