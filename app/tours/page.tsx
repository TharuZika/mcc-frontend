import CarCard from '../components/CarCard';

const carsData = [
  {
    id: 1,
    name: "Toyota Camry",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DDTlmlnA2H5U&psig=AOvVaw1oWwNk-zEik8nS6Zi-yx3L&ust=1741288634525000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCzjObT84sDFQAAAAAdAAAAABAE",
    price: 65,
    type: "Sedan",
    transmission: "Automatic",
    fuelType: "Petrol",
    year: 2023,
    mileage: "15k mi"
  },
  {
    id: 2,
    name: "Honda CR-V",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.caranddriver.com%2Fhonda%2Fcr-v-hybrid&psig=AOvVaw3vRlhFM8QRzAsMBexmDHKl&ust=1741288652091000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOj_oe7T84sDFQAAAAAdAAAAABAE",
    price: 75,
    type: "SUV",
    transmission: "Automatic",
    fuelType: "Hybrid",
    year: 2023,
    mileage: "12k mi"
  },
  {
    id: 3,
    name: "BMW 3 Series",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBMW_3_Series&psig=AOvVaw1yfDhmKYWeXvQ_GAf_RwBK&ust=1741288667138000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNj29fTT84sDFQAAAAAdAAAAABAE",
    price: 120,
    type: "Luxury Sedan",
    transmission: "Automatic",
    fuelType: "Petrol",
    year: 2023,
    mileage: "8k mi"
  },
  {
    id: 4,
    name: "Tesla Model 3",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.drivingelectric.com%2Ftesla%2Fmodel-3&psig=AOvVaw1F5pcu5_hwTAyGujE_dz86&ust=1741288683965000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDhz_3T84sDFQAAAAAdAAAAABAE",
    price: 130,
    type: "Electric Sedan",
    transmission: "Automatic",
    fuelType: "Electric",
    year: 2023,
    mileage: "10k mi"
  },
  {
    id: 5,
    name: "Ford Mustang",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFord_Mustang&psig=AOvVaw2ur269BXe74zsteJSuZdWx&ust=1741288701622000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjYxIbU84sDFQAAAAAdAAAAABAE",
    price: 150,
    type: "Sports Car",
    transmission: "Manual",
    fuelType: "Petrol",
    year: 2023,
    mileage: "5k mi"
  },
  {
    id: 6,
    name: "Mercedes-Benz GLC",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.edmunds.com%2Fmercedes-benz%2Fglc-class%2F&psig=AOvVaw327sQMjBYdfGg7CRBY52SB&ust=1741288718802000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPi1yo3U84sDFQAAAAAdAAAAABAJ",
    price: 140,
    type: "Luxury SUV",
    transmission: "Automatic",
    fuelType: "Diesel",
    year: 2023,
    mileage: "7k mi"
  },
  {
    id: 7,
    name: "Audi Q5",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pooleaudi.co.uk%2Fnews%2Faudi-unveils-its-new-look-q5%2F90112&psig=AOvVaw0FGJOp2OwMpeg_Pkepd66L&ust=1741288735737000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiRoZbU84sDFQAAAAAdAAAAABAJ",
    price: 135,
    type: "Luxury SUV",
    transmission: "Automatic",
    fuelType: "Petrol",
    year: 2023,
    mileage: "9k mi"
  },
  {
    id: 8,
    name: "Volkswagen Golf",
    image: "/images/cars/golf.jpg",
    price: 60,
    type: "Hatchback",
    transmission: "Manual",
    fuelType: "Petrol",
    year: 2023,
    mileage: "11k mi"
  },
  {
    id: 9,
    name: "Lexus RX",
    image: "/images/cars/rx.jpg",
    price: 145,
    type: "Luxury SUV",
    transmission: "Automatic",
    fuelType: "Hybrid",
    year: 2023,
    mileage: "6k mi"
  },
  {
    id: 10,
    name: "Porsche 911",
    image: "/images/cars/911.jpg",
    price: 250,
    type: "Sports Car",
    transmission: "Automatic",
    fuelType: "Petrol",
    year: 2023,
    mileage: "3k mi"
  },
  {
    id: 11,
    name: "Range Rover Sport",
    image: "/images/cars/rangerover.jpg",
    price: 200,
    type: "Luxury SUV",
    transmission: "Automatic",
    fuelType: "Diesel",
    year: 2023,
    mileage: "4k mi"
  },
  {
    id: 12,
    name: "Chevrolet Corvette",
    image: "/images/cars/corvette.jpg",
    price: 220,
    type: "Sports Car",
    transmission: "Manual",
    fuelType: "Petrol",
    year: 2023,
    mileage: "2k mi"
  }
];

export default function ToursPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {carsData.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
    </div>
  );
}
