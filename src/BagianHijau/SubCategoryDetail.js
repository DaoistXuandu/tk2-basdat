import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { FaUserCircle, FaStar, FaRegStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSubcategoryDetails, joinSubcategory, checkWorkerMembership } from "../controller/hijau";
import { fetchTestimoniBySubkategori } from "../controller/biru";
import { useCookies } from "react-cookie";

const SubCategoryDetail = () => {
    const { id } = useParams(); // Subcategory ID from URL
    const navigate = useNavigate(); // For navigation
    const [cookies] = useCookies(['userId', 'status', 'name']);
    const [subcategory, setSubcategory] = useState(null);
    const [testimonis, setTestimonis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMember, setIsMember] = useState(false);

    const isWorker = cookies.status === "pekerja";

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
            } catch (err) {
                setError(err.message || "Failed to load subcategory data.");
                // Optional: redirect back to homepage if data fetch fails
                // navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, cookies.userId, isWorker, navigate]);

    const handleJoin = async () => {
        try {
            await joinSubcategory({ worker_id: cookies.userId, subcategory_id: id });
            setIsMember(true);
            alert("You have successfully joined this subcategory!");
        } catch (error) {
            alert("Failed to join subcategory. Please try again.");
        }
    };

    const handleBooking = (serviceId) => {
        // Navigate to booking form for specific service
        navigate(`/homepage/${id}/booking/${serviceId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!subcategory) return <div>No subcategory found</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 mt-16">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                {/* Rest of the component remains the same */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Service Sessions</h3>
                    {subcategory.services && subcategory.services.length > 0 ? (
                        subcategory.services.map((service, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border rounded-md p-4"
                            >
                                <div className="flex-1">
                                    <span className="font-medium">{service.name || 'Unnamed Service'}</span>
                                    <span className="ml-4 text-gray-600">
                                        Rp {service.price ? service.price.toLocaleString("id-ID") : 'N/A'}
                                    </span>
                                </div>
                                {!isWorker && (
                                    <button
                                        onClick={() => handleBooking(service.id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        Pesan
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No services available for this subcategory.</p>
                    )}
                </div>

                {/* Rest of the component remains the same */}
            </div>
        </div>
    );
};

export default SubCategoryDetail;