'use client';
import { useState, useRef } from 'react';
import HouseCart from './HouseCart';
import searchHouses from '@/app/actions/createSearch';
import getAllHouse from '@/app/actions/getAllHouse';
export default function SearchFilter() {
  const [priceRange, setPriceRange] = useState(0);
  const [propertyType, setPropertyType] = useState('all');
  const locationRef = useRef(null);
  const [houses, setHouses] = useState([]);
  const [housess, setHousess] = useState(true);

  const handlePriceChange = (e) => setPriceRange(e.target.value);
  const handleTypeChange = (e) => setPropertyType(e.target.value);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const location = locationRef.current.value;
    const results = await searchHouses({
      prices: priceRange,
      location,
    });
    setHousess(false)
    setHouses(results);
  };
  console.log()

  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className=" py-4 max-w-md w-full " >
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Search Properties
        </h2>
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Price Range
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">${priceRange}</p>
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              ref={locationRef}
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full max-w-5xl">
        
        {houses.length===0&&<p>Not Found</p>}
        {houses.map((house) => (
          <HouseCart key={house.$id} house={house} />
        ))}

      </div>
    </div>
  );
}
