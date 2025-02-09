import React from 'react'

function Availbility() {
  return (
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
  )
}

export default Availbility