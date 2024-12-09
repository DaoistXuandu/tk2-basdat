import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { FaUserCircle, FaStar, FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { fetchSubcategoryDetails, joinSubcategory, checkWorkerMembership } from "../controller/hijau";
import { fetchTestimoniBySubkategori } from "../controller/biru"; // Import fungsi fetch testimoni
import { useCookies } from "react-cookie";

const SubCategoryDetail = () => {
    const { id } = useParams(); // Subcategory ID from the URL
    const [cookies] = useCookies(['userId', 'status', 'name']);
    const [subcategory, setSubcategory] = useState(null); // Subcategory details
    const [testimonis, setTestimonis] = useState([]); // Testimonial list
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [isMember, setIsMember] = useState(false); // Membership state

    const isWorker = cookies.status === "pekerja"; // Check if the user is a worker

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (!id) throw new Error("Invalid subcategory ID");
    
                // Fetch subcategory details
                const subcategoryData = await fetchSubcategoryDetails(id);
                setSubcategory(subcategoryData);
    
                // Fetch testimonials by subcategory ID
                const testimoniData = await fetchTestimoniBySubkategori(id);
                setTestimonis(testimoniData || []);
    
                // Check if the user is a member (only for workers)
                if (isWorker) {
                    const membership = await checkWorkerMembership(cookies.userId, id);
                    setIsMember(membership?.isMember || false);
                }
            } catch (err) {
                console.error("Error fetching subcategory data:", err.message);
                setError("Failed to load subcategory data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [id, isWorker, cookies.userId]);

    const handleJoin = async () => {
        try {
            await joinSubcategory({ worker_id: cookies.userId, subcategory_id: id });
            setIsMember(true);
            alert("You have successfully joined this subcategory!");
        } catch (err) {
            console.error("Error joining subcategory:", err);
            alert("Failed to join subcategory. Please try again.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 mt-16">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                {/* Subcategory Details */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={subcategory?.name || "Unnamed Subcategory"}
                        className="border rounded-md p-2"
                        readOnly
                    />
                    <input
                        type="text"
                        value={subcategory?.category || "Unknown Category"}
                        className="border rounded-md p-2"
                        readOnly
                    />
                </div>
                <textarea
                    value={subcategory?.description || "No description available"}
                    className="w-full border rounded-md p-3 h-24"
                    readOnly
                />

                {/* Services Section */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Service Sessions</h3>
                    {subcategory?.services?.length > 0 ? (
                        subcategory.services.map((service, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border rounded-md p-4"
                            >
                                <div className="flex-1">
                                    <span className="font-medium">{service.name}</span>
                                    <span className="ml-4 text-gray-600">
                                        Rp {service.price.toLocaleString("id-ID")}
                                    </span>
                                </div>
                                {!isWorker && (
                                    <a
                                        href={`${window.location.href}/form`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        Pesan
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No services available.</p>
                    )}
                </div>

                {/* Workers Section */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Workers</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {subcategory?.workers?.length > 0 ? (
                            subcategory.workers.map((worker, index) => (
                                <div
                                    onClick={() =>
                                        (window.location.href = `/profilPekerja/${worker.id}`)
                                    }
                                    key={index}
                                    className="cursor-pointer border rounded-md p-3 text-center space-y-2"
                                >
                                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto" />
                                    <p className="font-medium">{worker.name}</p>
                                    <div className="flex items-center justify-center text-yellow-500">
                                        <Star size={16} fill="currentColor" />
                                        <span className="ml-1">{worker.rating}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No workers available.</p>
                        )}
                    </div>
                </div>

                {/* Join Button (For Workers Only) */}
                {isWorker && !isMember && (
                    <button
                        onClick={handleJoin}
                        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
                    >
                        Bergabung
                    </button>
                )}

                {/* Testimonials Section */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Customer Testimonials</h3>
                    <div className="space-y-6">
                        {testimonis.length > 0 ? (
                            testimonis.map((testimoni, index) => (
                                <div key={index} className="border p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <FaUserCircle className="text-indigo-500 text-3xl mr-4" />
                                        <span className="font-semibold text-gray-800">
                                            {testimoni.name}
                                        </span>
                                        <div className="flex ml-4">
                                            {[...Array(10)].map((_, i) => (
                                                <span key={i}>
                                                    {i + 1 <= testimoni.rating ? (
                                                        <FaStar className="text-yellow-400" />
                                                    ) : (
                                                        <FaRegStar className="text-yellow-400" />
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">"{testimoni.message}"</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-700">No testimonials yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubCategoryDetail;
