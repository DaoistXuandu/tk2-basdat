import { PORT } from "./deploy";

// Fetch all service sessions
async function fetchServiceSessions() {
    try {
        const response = await fetch(`${PORT}/service-sessions`); // Endpoint untuk sesi layanan
        if (!response.ok) throw new Error('Failed to fetch service sessions');
        return await response.json();
    } catch (error) {
        console.error('Error fetching service sessions:', error);
        throw error;
    }
}

// Create new booking (pesanan)
async function createPesanan(data) {
    try {
        const response = await fetch(`${PORT}/pesan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create order');
        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

async function fetchSubcategoryDetails(subcategoryId) {
    try {
        const response = await fetch(`${PORT}/subcategory-detail?id=${subcategoryId}`);
        if (!response.ok) throw new Error('Failed to fetch subcategory details');
        return await response.json();
    } catch (error) {
        console.error('Error fetching subcategory details:', error);
        throw error;
    }
}

async function fetchOrders(userId) {
    try {
        const response = await fetch(`${PORT}/orders?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}


// Fetch homepage data
async function fetchHomepage() {
    try {
        const response = await fetch(`${PORT}/homepage`);
        console.log(response)
        if (!response.ok) throw new Error('Failed to fetch homepage data');
        return await response.json();
    } catch (error) {
        console.error('Error fetching homepage data:', error);
        throw error;
    }
}

async function joinSubcategory(data) {
    try {
        const response = await fetch(`${PORT}/join-subcategory`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to join subcategory');
        return await response.json();
    } catch (error) {
        console.error('Error joining subcategory:', error);
        throw error;
    }
}

async function checkWorkerMembership(workerId, subcategoryId) {
    try {
        const response = await fetch(
            `${PORT}/check-worker-membership?worker_id=${workerId}&subcategory_id=${subcategoryId}`
        );
        if (!response.ok) throw new Error('Failed to check membership');
        return await response.json();
    } catch (error) {
        console.error('Error checking membership:', error);
        throw error;
    }
}


export { fetchServiceSessions, createPesanan, fetchSubcategoryDetails, fetchOrders, fetchHomepage, joinSubcategory, checkWorkerMembership };
