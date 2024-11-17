import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Dummy data for categories and subCategories
const categories = [
    { id: 1, name: 'Home Cleaning', description: 'Professional home cleaning services' },
    { id: 2, name: 'Plumbing', description: 'Expert plumbing repair and installation' },
    { id: 3, name: 'Electrical', description: 'Electrical repair and installation services' },
];

const subCategories = [
    {
        id: 1,
        categoryId: 1,
        name: 'Deep Cleaning',
        description: 'Thorough cleaning of all rooms',
        sessions: [
            { id: 1, name: '2 Hours', price: 150000 },
            { id: 2, name: '4 Hours', price: 280000 },
        ],
        workers: [
            { id: 1, name: 'John Doe', rating: 4.8, completedJobs: 156 },
            { id: 2, name: 'Jane Smith', rating: 4.9, completedJobs: 243 },
        ],
    },
    {
        id: 2,
        categoryId: 1,
        name: 'Basic Cleaning',
        description: 'Standard cleaning service',
        sessions: [
            { id: 3, name: '2 Hours', price: 100000 },
            { id: 4, name: '4 Hours', price: 180000 },
        ],
        workers: [
            { id: 3, name: 'Mike Johnson', rating: 4.7, completedJobs: 89 },
            { id: 4, name: 'Sarah Williams', rating: 4.6, completedJobs: 124 },
        ],
    },
];

const Homepage = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSubCategories = subCategories.filter((sub) =>
        (!selectedCategory || sub.categoryId === parseInt(selectedCategory)) &&
        (!searchTerm || sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="mt-16 p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-4">Service Categories</h1>
                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search subcategories..."
                            className="w-full p-2 border rounded pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubCategories.map((subCategory) => (
                    <a
                        key={subCategory.id}
                        className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        href={`/homepage/${subCategory.id}`}
                    >
                        <h3 className="text-xl font-semibold mb-2">{subCategory.name}</h3>
                        <p className="text-gray-600 mb-2">{subCategory.description}</p>
                        <p className="text-sm text-gray-500">
                            Starting from Rp {Math.min(...subCategory.sessions.map((s) => s.price)).toLocaleString()}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
