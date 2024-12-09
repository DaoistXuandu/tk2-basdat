import { PORT } from "./deploy";

// apiController.js
export const fetchTestimoniBySubkategori = async (subkategoriID) => {
    try {
        const response = await fetch(`${ PORT }/getTestimoni?subkategori_id=${subkategoriID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch testimoni');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching testimoni:', error);
        throw error;
    }
};

// Create Testimoni
export const createTestimoni = async (userId, pemesananId, teks, rating) => {
    try {
        const response = await fetch(`${ PORT }/createTestimoni`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                pemesananId,
                teks,
                rating,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to create testimoni');
        }
        const data = await response.text(); // Backend Anda hanya mengembalikan teks
        return data;
    } catch (error) {
        console.error('Error creating testimoni:', error);
        throw error;
    }
};

// Delete Testimoni
export const deleteTestimoni = async (userId, pemesananId, tgl) => {
    try {
        const response = await fetch(`${ PORT }/deleteTestimoni`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                pemesananId,
                tgl,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to delete testimoni');
        }
        const data = await response.text(); // Backend Anda hanya mengembalikan teks
        return data;
    } catch (error) {
        console.error('Error deleting testimoni:', error);
        throw error;
    }
};

// Fetch Diskon (Voucher & Promo)
export const fetchDiskon = async () => {
    try {
        const response = await fetch(`${ PORT }/getDiskon`);
        if (!response.ok) {
            throw new Error('Failed to fetch diskon');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching diskon:', error);
        throw error;
    }
};

// Fungsi untuk membeli voucher
export const buyVoucher = async (userId, voucherCode) => {
    try {
      const response = await fetch(`${PORT}/buyVoucher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          voucherCode,
          metodeBayarId: 'e2ae7f92-eefb-47a7-aa1b-c7d157ab94d7', // ID MyPay default
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error buying voucher:', error);
      throw error;
    }
  };