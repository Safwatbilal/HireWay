'use client';

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JobList from "./Job";
import CityDropdown from "../CityDropdown";
import { FaSearch } from "react-icons/fa";

export default function AllJob() {
    const nameDescriptionRef = useRef(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [fromHour, setFromHour] = useState("");
    const [toHour, setToHour] = useState("");
    const [filterValues, setFilterValues] = useState({
        nameDescription: "",
        city: "",
        fromHour: "",
        toHour: "",
    });

    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setFilterValues({
            nameDescription: params.get("nameDescription") || "",
            city: params.get("city") || "",
            fromHour: params.get("fromHour") || "",
            toHour: params.get("toHour") || "",
        });
        setSelectedCity(params.get("city") || "");
        setFromHour(params.get("fromHour") || "");
        setToHour(params.get("toHour") || "");
    }, [window.location.search]);

    const handleLogInputs = () => {
        const nameDescription = nameDescriptionRef.current.value;
        const newFilterValues = {
            nameDescription,
            city: selectedCity,
            fromHour,
            toHour,
        };
        setFilterValues(newFilterValues);
        const params = new URLSearchParams();
        if (newFilterValues.nameDescription) params.set("nameDescription", newFilterValues.nameDescription);
        if (newFilterValues.city) params.set("city", newFilterValues.city);
        if (newFilterValues.fromHour) params.set("fromHour", newFilterValues.fromHour);
        if (newFilterValues.toHour) params.set("toHour", newFilterValues.toHour);

        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            <div className="lg:w-1/4">
                <div className="mb-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-second" />
                        <input
                            ref={nameDescriptionRef}
                            id="nameDescription"
                            type="text"
                            placeholder="Enter name or description..."
                            className="w-full pl-10 pr-4 py-2 bg-bgSecond text-white rounded-md focus:outline-none focus:ring-2 focus:ring-second"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <CityDropdown
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                        background={false}
                    />
                </div>
                <div className="mb-4">
                    <input
                        id="fromHour"
                        type="number"
                        min="0"
                        max="12"
                        value={fromHour}
                        onChange={(e) => setFromHour(e.target.value)}
                        placeholder="From hour"
                        className="w-full pl-2 pr-4 py-2 bg-bgSecond text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                    />
                </div>
                <div className="mb-4">
                    <input
                        id="toHour"
                        type="number"
                        min="0"
                        max="12"
                        value={toHour}
                        onChange={(e) => setToHour(e.target.value)}
                        placeholder="To hour"
                        className="w-full pl-2 pr-4 py-2 bg-bgSecond text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                    />
                </div>
                <button
                    onClick={handleLogInputs}
                    className="w-full hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg bg-second transition-all shadow-md"
                >
                    Filter
                </button>
            </div>

            <div className="lg:w-3/4 bg-bgSecond">
                <JobList
                    type="allJob"
                    nameDescription={filterValues.nameDescription}
                    city={filterValues.city}
                    fromHour={filterValues.fromHour}
                    toHour={filterValues.toHour}
                />
            </div>
        </div>
    );
}
