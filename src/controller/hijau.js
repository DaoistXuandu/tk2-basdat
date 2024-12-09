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

// Fetch subcategory details
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


export { fetchServiceSessions, createPesanan, fetchOrders };
