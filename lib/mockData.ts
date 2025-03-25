// Mock User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  drivingLicense: {
    number: string;
    expiryDate: string;
    imageUrl: string;
  };
}

// Mock Vehicle Interface
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  type: string;
  year: number;
  pricePerDay: number;
  pricePerKm: number;
  image: string;
  available: boolean;
  isRent: boolean;
  isTaxi: boolean;
}

// Mock Booking Interface
export interface Booking {
  id: string;
  userId: string;
  serviceType: 'rental' | 'taxi';
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  rentalDays?: number;
  totalAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  vehicle: Vehicle;
  createdAt: string;
}

// Mock Users Data
const users: User[] = [
  {
    id: '1',
    name: 'tharuzika',
    email: 'tharuzika@gmail.com',
    password: 'password123',
    drivingLicense: {
      number: 'DL123456',
      expiryDate: '2025-12-31',
      imageUrl: 'https://example.com/dummy-license.jpg'
    }
  },
];

// Mock Vehicles Data
export const vehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    type: 'Sedan',
    year: 2022,
    pricePerDay: 50,
    pricePerKm: 1.5,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    available: true,
    isRent: true,
    isTaxi: true,
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    type: 'SUV',
    year: 2023,
    pricePerDay: 75,
    pricePerKm: 2.0,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500',
    available: true,
    isRent: true,
    isTaxi: true,
  },
  {
    id: '3',
    make: 'Tesla',
    model: 'Model 3',
    type: 'Electric',
    year: 2023,
    pricePerDay: 100,
    pricePerKm: 2.5,
    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=500',
    available: true,
    isRent: true,
    isTaxi: true,
  },
];

// Mock Bookings Data
const bookings: Booking[] = [];

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Mock Vehicle Service
export const mockVehicleService = {
  getAllVehicles: async () => {
    return vehicles;
  },

  getVehicleById: async (id: string) => {
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    return vehicle;
  },
};

// Mock Booking Service
export const mockBookingService = {
  createBooking: async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    };
    bookings.push(newBooking);
    return newBooking;
  },

  getUserBookings: async (userId: string) => {
    return bookings.filter(b => b.userId === userId);
  },

  getBookingById: async (id: string) => {
    const booking = bookings.find(b => b.id === id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  },
};

// Mock Invoice Generation
export const mockInvoiceService = {
  generateInvoice: async (bookingId: string) => {
    const booking = await mockBookingService.getBookingById(bookingId);
    return {
      invoiceId: 'INV-' + generateId(),
      bookingId: booking.id,
      userId: booking.userId,
      vehicle: booking.vehicle,
      amount: booking.totalAmount,
      tax: booking.totalAmount * 0.1,
      total: booking.totalAmount * 1.1,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    };
  },
}; 