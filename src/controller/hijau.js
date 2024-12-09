import { PORT } from "./deploy";

// Utility function for handling fetch with timeout
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("Request timeout");
        }
        throw error;
    }
}

// Fetch all service sessions
async function fetchServiceSessions() {
    try {
        const response = await fetchWithTimeout(`${PORT}/service-sessions`);
        if (!response.ok) throw new Error(`Failed to fetch service sessions: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching service sessions:", error.message);
        throw error;
    }
}

// Create new booking (pesanan)
async function createPesanan(data) {
    try {
        if (!data || typeof data !== "object") throw new Error("Invalid data for creating order");
        const response = await fetchWithTimeout(`${PORT}/pesan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Failed to create order: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error creating order:", error.message);
        throw error;
    }
}
function SubCategoryDetail({ subcategoryDetails }) {
    return (
        <div>
            <h2>Service Sessions</h2>
            {subcategoryDetails.services.map((service, index) => (
                <div key={index}>
                    <h3>{service.name}</h3>
                    <p>{service.price}</p>
                    <button>Book</button>
                </div>
            ))}
        </div>
    );
}

async function fetchSubcategoryDetails(id) {
    const response = await fetch(`${PORT}/subcategory?id=${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch subcategory details");
    }
    return response.json();
}


// Fetch orders
async function fetchOrders(userId) {
    try {
        if (!userId) throw new Error("User ID is required");
        const response = await fetchWithTimeout(`${PORT}/orders?userId=${userId}`);
        if (!response.ok) throw new Error(`Failed to fetch orders: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        throw error;
    }
}

// Fetch homepage data
async function fetchHomepage() {
    try {
        const response = await fetchWithTimeout(`${PORT}/homepage`);
        if (!response.ok) throw new Error(`Failed to fetch homepage data: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching homepage data:", error.message);
        throw error;
    }
}

// Join subcategory
async function joinSubcategory(data) {
    try {
        if (!data || typeof data !== "object") throw new Error("Invalid data for joining subcategory");
        const response = await fetchWithTimeout(`${PORT}/join-subcategory`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Failed to join subcategory: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error joining subcategory:", error.message);
        throw error;
    }
}

// Check worker membership
async function checkWorkerMembership(workerId, subcategoryId) {
    try {
        if (!workerId || !subcategoryId) throw new Error("Worker ID and Subcategory ID are required");
        const response = await fetchWithTimeout(
            `${PORT}/check-worker-membership?worker_id=${workerId}&subcategory_id=${subcategoryId}`
        );
        if (!response.ok) throw new Error(`Failed to check membership: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error checking membership:", error.message);
        throw error;
    }
}

// Fetch all subcategories
async function fetchAllSubcategories() {
    try {
        const response = await fetchWithTimeout(`${PORT}/homepage`);
        if (!response.ok) throw new Error(`Failed to fetch subcategories: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching subcategories:", error.message);
        throw error;
    }
}



export {
    fetchServiceSessions,
    createPesanan,
    fetchSubcategoryDetails,
    fetchOrders,
    fetchHomepage,
    joinSubcategory,
    checkWorkerMembership,
    fetchAllSubcategories,
};
