import React, { useState } from 'react';
// SubCategory Detail Component

const testimonials = [
    { id: 1, userName: 'Alex', rating: 5, comment: 'Excellent service! Very thorough and professional.' },
    { id: 2, userName: 'Maria', rating: 4, comment: 'Good service, would recommend.' }
  ];
  
const SubCategoryDetail = ({ subCategory, onBooking, testimonials }) => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">{subCategory.name}</h1>
            <p className="text-gray-600 mb-6">{subCategory.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="border rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Available Sessions</h2>
                    {subCategory.sessions.map(session => (
                        <div key={session.id} className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="font-medium">{session.name}</h3>
                                <p className="text-gray-600">Rp {session.price.toLocaleString()}</p>
                            </div>
                            <button
                                onClick={() => onBooking(session)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="border rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Available Workers</h2>
                    {subCategory.workers.map(worker => (
                        <div key={worker.id} className="mb-4">
                            <h3 className="font-medium">{worker.name}</h3>
                            <p className="text-gray-600">Rating: {worker.rating} ⭐</p>
                            <p className="text-gray-600">Completed Jobs: {worker.completedJobs}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="mb-4">
                        <div className="flex items-center mb-2">
                            <span className="font-medium mr-2">{testimonial.userName}</span>
                            <span>{testimonial.rating} ⭐</span>
                        </div>
                        <p className="text-gray-600">{testimonial.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubCategoryDetail;
