import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { FaUserCircle, FaStar, FaRegStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSubcategoryDetails, joinSubcategory, checkWorkerMembership } from "../controller/hijau";
import { fetchTestimoniBySubkategori } from "../controller/biru"; // Fetch testimonials
import { useCookies } from "react-cookie";

const SubCategoryDetail = () => {
    const { id } = useParams(); // Subcategory ID from the route
    const [cookies] = useCookies(["userId", "status", "name"]); // Extract user cookies
    const navigate = useNavigate();

    // State variables
    const [subcategory, setSubcategory] = useState(null);
    const [testimonis, setTestimonis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMember, setIsMember] = useState(false);

    const isWorker = cookies.status === "pekerja"; // Determine if user is a worker

    // Fetch data for the subcategory, services, and testimonials
    useEffect(() => {
        const fetchData = async () => {
            try {
                const subcategoryData = await fetchSubcategoryDetails(id);
                setSubcategory(subcategoryData);

                const testimoniData = await fetchTestimoniBySubkategori(id);
                setTestimonis(testimoniData);

                if (isWorker) {
                    const membership = await checkWorkerMembership(cookies.userId, id);
                    setIsMember(membership.isMember);
                }
            } catch (error) {
                setError("Failed to load subcategory data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, cookies.userId, isWorker]);

    const handleJoin = async () => {
        try {
            await joinSubcategory({ worker_id: cookies.userId, subcategory_id: id });
            setIsMember(true);
            alert("You have successfully joined this subcategory!");
        } catch (error) {
            alert("Failed to join subcategory. Please try again.");
        }
    };

    const handleServiceBooking = (serviceId) => {
        navigate(`/homepage/${id}/booking/${serviceId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!subcategory) return <div>No subcategory found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 mt-16">
            {/* Subcategory Overview */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={subcategory.name}
                        className="border rounded-md p-2"
                        readOnly
                    />
                    <input
                        type="text"
                        value={subcategory.category}
                        className="border rounded-md p-2"
                        readOnly
                    />
                </div>
                <textarea
                    value={subcategory.description}
                    className="w-full border rounded-md p-3 h-24"
                    readOnly
                />

                {/* Service Sessions */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Service Sessions</h3>
                    {subcategory.services?.length > 0 ? (
                        subcategory.services.map((service) => (
                            <div
                                key={service.id}
                                className="flex items-center justify-between border rounded-md p-4"
                            >
                                <div className="flex-1">
                                    <span className="font-medium">{service.name || "Unnamed Service"}</span>
                                    <span className="ml-4 text-gray-600">
                                        Rp {service.price ? service.price.toLocaleString("id-ID") : "N/A"}
                                    </span>
                                </div>
                                {!isWorker && (
                                    <button
                                        onClick={() => handleServiceBooking(service.id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        Book
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No services available for this subcategory.</p>
                    )}
                </div>

                {/* Workers */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Workers</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {subcategory.workers?.map((worker) => (
                            <div
                                onClick={() => navigate(`/profilPekerja/${worker.id}`)}
                                key={worker.id}
                                className="cursor-pointer border rounded-md p-3 text-center space-y-2"
                            >
                                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
                                <p className="font-medium">{worker.name}</p>
                                <div className="flex items-center justify-center text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <span className="ml-1">{worker.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Customer Testimonials</h3>
                    <div className="space-y-6">
                        {testimonis.length > 0 ? (
                            testimonis.map((testimoni) => (
                                <div key={testimoni.id} className="border p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <FaUserCircle className="text-indigo-500 text-3xl mr-4" />
                                        <span className="font-semibold text-gray-800">{testimoni.name}</span>
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

                {/* Join Button */}
                {isWorker && !isMember && (
                    <button
                        onClick={handleJoin}
                        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
                    >
                        Join
                    </button>
                )}
            </div>
        </div>
    );
};

export default SubCategoryDetail;
