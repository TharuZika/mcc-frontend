"use client"
import { FaCar, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaRegCreditCard, FaStar, FaWallet } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Hero from '@/components/home/Hero';
import BookingForm from '@/components/home/BookingForm';

const luxuryBrands = [
  { name: 'Audi', logo: '/images/brands/audi-logo.png' },
  { name: 'Mercedes', logo: '/images/brands/mercedes-logo.png' },
  { name: 'Land Rover', logo: '/images/brands/landrover-logo.png' },
  { name: 'Ferrari', logo: '/images/brands/ferrari-logo.png' },
  { name: 'Tesla', logo: '/images/brands/tesla-logo.png' },
];

const features = [
  {
    title: "Premium Fleet",
    description: "Choose from our collection of luxury and exotic vehicles",
    icon: "/images/icons/premium-car.png"
  },
  {
    title: "Flexible Pickup",
    description: "We'll deliver your vehicle to your doorstep or preferred location",
    icon: "/images/icons/location.png"
  },
  {
    title: "24/7 Support",
    description: "Our team is available around the clock to assist you",
    icon: "/images/icons/support.png"
  },
  {
    title: "No Hidden Fees",
    description: "Transparent pricing with no surprise charges",
    icon: "/images/icons/wallet.png"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />

      <section className="relative min-h-screen flex items-center pt-20">
        
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-car.jpg"
            alt="Luxury Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10"></div>
        </div>

        <div className="relative z-20 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="lg:pr-8">
              <Hero />
            </div>
            <div className="lg:pl-8">
              <BookingForm />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-20">
          <span className="text-xs text-amber-400 mb-2">Scroll Down</span>
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">EXCLUSIVE LUXURY BRANDS</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our fleet features the finest vehicles from the world's most prestigious automotive manufacturers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {luxuryBrands.map((brand) => (
              <div 
                key={brand.name} 
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all duration-300"
              >
                <div className="h-16 flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={100}
                    height={40}
                    className="object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black relative overflow-hidden">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-amber-500 blur-3xl"></div>
          <div className="absolute -left-20 top-1/2 w-64 h-64 rounded-full bg-amber-600 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">PREMIUM EXPERIENCE</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're dedicated to providing an exceptional experience from booking to return.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-amber-500/30 transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Image src={feature.icon} alt={feature.title} width={32} height={32} className="filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-900 to-black relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
            <div className="relative h-[400px] overflow-hidden rounded-xl">
              <Image
                src="/images/white-porsche.jpg"
                alt="White Porsche"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-2">LUXURY SPORTS CARS</h3>
                <p className="text-gray-300">Experience the thrill of driving our premium sports vehicles</p>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-6">HIT THE ROAD IN STYLE!</h2>
              <div className="w-24 h-1 bg-amber-400 mb-6"></div>
              <p className="text-gray-300 mb-6">
                Experience the thrill of driving our premium vehicles on the open road. Our fleet of meticulously maintained luxury vehicles offers unparalleled comfort and performance.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Latest models from top manufacturers</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Fully insured and professionally maintained</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Unlimited mileage options available</span>
                </li>
              </ul>
              <Link
                href="/fleet"
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-3 rounded-lg transition-colors w-fit shadow-xl hover:shadow-amber-500/30"
              >
                EXPLORE FLEET
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-4xl font-bold mb-6">FREEDOM ON WHEELS</h2>
              <div className="w-24 h-1 bg-amber-400 mb-6"></div>
              <p className="text-gray-300 mb-6">
                Choose from our extensive collection of luxury vehicles and experience true driving freedom. Whether you're planning a special date night, business trip, or weekend getaway, we have the perfect vehicle to match your needs.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-800/70 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <GiPathDistance className="text-amber-400 mr-2 text-xl" />
                    <span className="font-semibold">Unlimited Miles</span>
                  </div>
                  <p className="text-sm text-gray-400">No mileage restrictions on select packages</p>
                </div>
                <div className="bg-gray-800/70 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaWallet className="text-amber-400 mr-2 text-xl" />
                    <span className="font-semibold">Best Price</span>
                  </div>
                  <p className="text-sm text-gray-400">Competitive rates with no hidden fees</p>
                </div>
              </div>
              <Link
                href="/services"
                className="border-2 border-amber-500 hover:bg-amber-500 text-amber-400 hover:text-black font-bold px-8 py-3 rounded-lg transition-all w-fit"
              >
                LEARN MORE
              </Link>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl group order-1 md:order-2">
              <Image
                src="/images/night-car.jpg"
                alt="Car at night"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-2">PREMIUM SEDANS</h3>
                <p className="text-gray-300">Elegant and comfortable for business or leisure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">WHAT OUR CLIENTS SAY</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="bg-gray-900/70 p-8 rounded-xl border border-gray-800 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-amber-400 mr-1" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6">
                  "The service was impeccable. The car was delivered on time, spotlessly clean, and performed flawlessly. I'll definitely be using Mega City Cab for all my future rentals."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">John Smith</h4>
                    <p className="text-sm text-gray-400">Business Executive</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* <div className="text-center mt-12">
            <Link href="/testimonials" className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center">
              View All Reviews
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div> */}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="white" points="0,100 100,0 100,100"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-black">READY TO EXPERIENCE LUXURY?</h2>
            <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
              Reserve your premium vehicle today and elevate your journey. Our customer service team is ready to assist you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/book" 
                className="bg-black text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors shadow-xl"
              >
                BOOK NOW
              </Link>
              <Link 
                href="/contact" 
                className="bg-transparent border-2 border-black text-black font-bold px-8 py-3 rounded-lg hover:bg-black/10 transition-colors"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}