import React, { useState } from 'react';

const subCategories = [
    {
        id: 1,
        name: 'Deep Cleaning',
        description: 'Thorough cleaning of all rooms',
        price: 150000,
        testimonials: [
            { id: 1, userName: 'Alex', rating: 5, comment: 'Excellent service!' },
            { id: 2, userName: 'Maria', rating: 4, comment: 'Good service.' },
        ],
    },
    {
        id: 2,
        name: 'Basic Cleaning',
        description: 'Standard cleaning service',
        price: 100000,
        testimonials: [
            { id: 3, userName: 'John', rating: 5, comment: 'Great value for money!' },
            { id: 4, userName: 'Emma', rating: 4, comment: 'Very professional.' },
        ],
    },
];

const ServiceMarketplace = () => {
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    return (
        <div className="p-6">
            {!selectedSubCategory ? (
                // Homepage View
                <div>
                    <h1 className="text-3xl font-bold mb-4">Service Categories</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {subCategories.map((subCategory) => (
                            <div
                                key={subCategory.id}
                                className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => setSelectedSubCategory(subCategory)}
                            >
                                <h3 className="text-xl font-semibold">{subCategory.name}</h3>
                                <p className="text-gray-600">{subCategory.description}</p>
                                <p className="text-sm text-gray-500">Price: Rp {subCategory.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // SubCategory Details View
                <div>
                    <button
                        onClick={() => setSelectedSubCategory(null)}
                        className="text-blue-500 hover:text-blue-600 mb-4"
                    >
                        ← Back to Homepage
                    </button>
                    <h1 className="text-3xl font-bold mb-4">{selectedSubCategory.name}</h1>
                    <p className="text-gray-600 mb-4">{selectedSubCategory.description}</p>
                    <p className="text-xl font-medium mb-6">Price: Rp {selectedSubCategory.price.toLocaleString()}</p>

                    <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
                    {selectedSubCategory.testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="border p-4 mb-4 rounded">
                            <p className="font-medium">{testimonial.userName}</p>
                            <p className="text-gray-500">{testimonial.rating} ⭐</p>
                            <p className="text-gray-600">{testimonial.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServiceMarketplace;
