"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Location } from '../constents'; // Assuming Location is imported from constents.ts


const Predict = () => {
    const [formData, setFormData] = useState({
        location: '',
        area: '',
        bath: '',
        bed: '',
        parking: '',
        type: ''
    });

    const [prediction, setPrediction] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const formatPrediction = (value: number): string => {
        if (value < 100000) {
            return `${Math.round(value / 1000)} thousand `;
        } else if (value < 10000000) {
            return `${Math.round(value / 100000)} lakh `;
        } else {
            return `${Math.round(value / 10000000)} crore +`;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Make a POST request to the server endpoint
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch prediction data');
            }

            // Parse the response JSON
            const predictionData = await response.json();

            // Update UI with the prediction
            const roundedPrediction = Math.round(predictionData.prediction);
            setPrediction(formatPrediction(roundedPrediction)); // Set the formatted prediction string
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='flex bg-white justify-center'>
            <div className='border p-7 w-full md:w-3/5 shadow'>
                <div className="space-y-12 mt-20">
                    <div className="border-b-2 border-black pb-12">
                        <h2 className="pb-15 text-4xl font-semibold leading-9 text-center text-gray-900">Enter Your Property Details</h2>
                        <div className='content'>
                            <form onSubmit={handleSubmit}>
                                {/* Location */}
                                <div className="grid gap-6 mb-6 md:grid-cols-2 pt-8">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Location</label>
                                    <select id="location" className="bg-white border border-gray-900 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange}>
                                        <option value="">Select Location</option>
                                        {Location.map((count: string, i: number) => (
                                            <option key={i}>{count}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Area */}
                                <div className="grid gap-6 mb-6 md:grid-cols-2 pt-8">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Area</label>
                                    <input type="text" id="area" className="bg-white border border-gray-900 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the Area in sq feet" onChange={handleInputChange} />
                                </div>
                                {/* Bedrooms */}
                                <div className="grid gap-6 mb-6 md:grid-cols-2 pt-8">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Bedrooms</label>
                                    <select id="bed" className="bg-white border border-gray-900 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange}>
                                        <option value="">Select Number of Bedrooms</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>
                                {/* Bathrooms */}
                                <div className="grid gap-6 mb-6 md:grid-cols-2 pt-8">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Bathrooms</label>
                                    <select id="bath" className="bg-white border border-gray-900 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange}>
                                        <option value="">Select Number of Bathrooms</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>
                                {/* Parking */}
                                <div className="grid gap-6 mb-6 md:grid-cols-2 pt-8">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Parking</label>
                                    <select id="parking" className="bg-white border border-gray-900 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange}>
                                        <option value="">Select Parking</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                {/* Property Type */}
                                <div className="grid gap-6 mb-6 md:grid-cols-2 pt-8">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Type</label>
                                    <select id="type" className="bg-white border border-gray-900 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange}>
                                        <option value="">Select Property Type</option>
                                        <option value="yes">Flat</option>
                                        <option value="no">Individual House</option>
                                    </select>
                                </div>
                                {/* Submit button */}
                                <div className='justify-center pt-16'>
                                    <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Predict Price</button>
                                    {prediction !== null && (
                                        <div className="mt-4 text-center">
                                            <p className="text-gray-900 font-medium">Approx Price:</p>
                                            <p className="text-xl font-semibold text-blue-700">₹ {prediction} </p>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Predict;
