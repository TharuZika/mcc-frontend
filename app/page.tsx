import { FaCar, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaRegCreditCard, FaStar, FaWallet } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FaCar className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">Mega City Cab</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">My Bookings</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Services</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Booking Form */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">Your Reliable Ride in Colombo</h1>
            <p className="text-xl mb-8">Safe, Comfortable, and Affordable Cab Services</p>
          </div>
          
          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-700 mb-2 font-medium">Pickup Location</label>
                <input 
                  type="text" 
                  className="p-3 border rounded-lg"
                  placeholder="Enter pickup address"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 mb-2 font-medium">Destination</label>
                <input 
                  type="text" 
                  className="p-3 border rounded-lg"
                  placeholder="Enter drop location"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 mb-2 font-medium">Pickup Time</label>
                <input 
                  type="datetime-local" 
                  className="p-3 border rounded-lg text-gray-700"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
                  Find Cabs Now
                </button>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">*Available 24/7 for instant bookings</p>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Colombo Fort', 'Bandaranaike Airport', 'Galle Face Green'].map((destination) => (
            <div key={destination} className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src={`https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/78/2f/0c/colombo-fort-railway.jpg?w=900&h=500&s=1`} 
                alt={destination}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                <h3 className="text-white text-xl font-bold">{destination}</h3>
                <p className="text-gray-200">From ₹1500</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {icon: FaMapMarkerAlt, title: 'Choose Location', text: 'Enter your pickup and drop locations'},
              {icon: FaCar, title: 'Select Vehicle', text: 'Choose from various cab categories'},
              {icon: FaWallet, title: 'Confirm Payment', text: 'Pay via cash or digital payment'},
              {icon: FaStar, title: 'Rate Your Ride', text: 'Share your experience with us'},
            ].map((step, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <step.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((item) => (
            <div key={item} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">John D.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className="h-4 w-4" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Excellent service! The cab arrived right on time and the driver was very professional.
                Highly recommend Mega City Cab for airport transfers."
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Promotions */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">First Ride Offer!</h2>
          <p className="text-xl mb-8">Get 20% off on your first booking with code: MEGA20</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100">
            Claim Your Discount
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Mega City Cab</h4>
              <p className="text-gray-400">Your trusted transportation partner in Colombo since 2015</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Airport Transfers</a></li>
                <li><a href="#" className="hover:text-white">City Tours</a></li>
                <li><a href="#" className="hover:text-white">Corporate Travel</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <p className="text-gray-400">24/7 Support: +94 76 123 4567</p>
              <p className="text-gray-400">Email: support@megacity.lk</p>
              <p className="text-gray-400">Address: 123 Galle Road, Colombo</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2023 Mega City Cab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}