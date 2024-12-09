import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { fetchHomepage } from '../controller/hijau';

const Homepage = () => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // React Router hook for navigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchHomepage();
                const categoryMap = new Map();
                const formattedSubCategories = [];

                data.forEach((item) => {
                    // Collect unique categories
                    if (!categoryMap.has(item.kategori_id)) {
                        categoryMap.set(item.kategori_id, { id: item.kategori_id, name: item.kategori_nama });
                    }
                    // Add subcategories with category reference
                    formattedSubCategories.push({
                        id: item.subkategori_id,
                        categoryId: item.kategori_id,
                        categoryName: item.kategori_nama,
                        name: item.subkategori_nama,
                        description: item.subkategori_deskripsi || '',
                    });
                });

                setCategories(Array.from(categoryMap.values()));
                setSubCategories(formattedSubCategories);
            } catch (err) {
                setError(err.message || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubCategoryClick = (subcategoryId) => {
        // Ensure navigation to the specific subcategory detail page
        navigate(`/homepage/${subcategoryId}`);
    };

    const filteredSubCategories = subCategories.filter((sub) =>
        (!selectedCategory || sub.categoryId === selectedCategory) &&
        (!searchTerm || sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
                    <div
                        key={subCategory.id}
                        className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleSubCategoryClick(subCategory.id)}
                    >
                        <h3 className="text-xl font-semibold mb-2">{subCategory.name}</h3>
                        <p className="text-gray-600 mb-2">{subCategory.description}</p>
                        <p className="text-sm text-gray-500">Category: {subCategory.categoryName}</p>
                        <p className="text-sm text-gray-500">Click to view details</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;