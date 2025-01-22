'use client';
import { useState, useEffect, useRef } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { citiesList } from "@/data/cityList";

export default function CityDropdown({ selectedCity, setSelectedCity, background }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const renderSelectedCity = () => {
        if (background && !selectedCity) {
            return <p>Choose City</p>;
        }
        if (!selectedCity || selectedCity === "Any City") {
            return <p>Any City</p>;
        }
        return <span>{selectedCity}</span>;
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-full">
            {!background && 
                <FaLocationArrow className="absolute left-3 top-1/2 transform -translate-y-1/2 text-second" />
            }
            <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${background ? 'bg-bgColor pl-4' : 'bg-bgSecond pl-9'} w-full pr-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#F39C12] cursor-pointer`}
            >
                {renderSelectedCity()}
            </div>

            {isDropdownOpen && (
                <ul className="absolute z-10 w-full mt-2 max-h-[200px] overflow-y-auto bg-bgSecond text-white rounded-md shadow-lg scrollbar-thin scrollbar-thumb-second scrollbar-track-bgSecond">
                    {!background && (
                        <li
                            onClick={() => handleCitySelect("Any City")}
                            className="px-4 py-2 hover:bg-[#F39C12] hover:text-white transition-colors"
                        >
                            Any City
                        </li>
                    )}
                    {citiesList.map((city) => (
                        <li
                            key={city}
                            onClick={() => handleCitySelect(city)}
                            className="px-4 py-2 hover:bg-[#F39C12] hover:text-white transition-colors"
                        >
                            {city}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
