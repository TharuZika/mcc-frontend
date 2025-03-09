import { atom } from 'jotai';

export interface BookingDetails {
  serviceType: 'taxi' | 'rental';
  pickupLocation: string;
  dropLocation?: string;
  pickupDate?: string;
  pickupTime?: string;
  rentalDays?: number;
  vehicleType: string;
}

export interface SelectedVehicle {
  id: number;
  type: string;
  seats: number;
  model: string;
  plateNo: string;
  make: string;
  year: number;
  pricePerDay?: number;
  pricePerKm?: number;
  imgUrl: string;
  status?: string;
  rent?: boolean;
  taxi?: boolean;
}

export const bookingDetailsAtom = atom<BookingDetails | null>(null);
export const selectedVehicleAtom = atom<SelectedVehicle | null>(null);