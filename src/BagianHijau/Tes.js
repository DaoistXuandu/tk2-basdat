import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

// Dummy data
const categories = [
  { id: 1, name: 'Home Cleaning', description: 'Professional home cleaning services' },
  { id: 2, name: 'Plumbing', description: 'Expert plumbing repair and installation' },
  { id: 3, name: 'Electrical', description: 'Electrical repair and installation services' }
];

const subCategories = [
  { 
    id: 1, 
    categoryId: 1, 
    name: 'Deep Cleaning',
    description: 'Thorough cleaning of all rooms',
    sessions: [
      { id: 1, name: '2 Hours', price: 150000 },
      { id: 2, name: '4 Hours', price: 280000 }
    ],
    workers: [
      { id: 1, name: 'John Doe', rating: 4.8, completedJobs: 156 },
      { id: 2, name: 'Jane Smith', rating: 4.9, completedJobs: 243 }
    ]
  },
  { 
    id: 2, 
    categoryId: 1, 
    name: 'Basic Cleaning',
    description: 'Standard cleaning service',
    sessions: [
      { id: 3, name: '2 Hours', price: 100000 },
      { id: 4, name: '4 Hours', price: 180000 }
    ],
    workers: [
      { id: 3, name: 'Mike Johnson', rating: 4.7, completedJobs: 89 },
      { id: 4, name: 'Sarah Williams', rating: 4.6, completedJobs: 124 }
    ]
  }
];

const testimonials = [
  { id: 1, userName: 'Alex', rating: 5, comment: 'Excellent service! Very thorough and professional.' },
  { id: 2, userName: 'Maria', rating: 4, comment: 'Good service, would recommend.' }
];

// Homepage Component
const Homepage = ({ onSubCategoryClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubCategories = subCategories.filter(sub => 
    (!selectedCategory || sub.categoryId === parseInt(selectedCategory)) &&
    (!searchTerm || sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6">
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
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
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
        {filteredSubCategories.map(subCategory => (
          <div 
            key={subCategory.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSubCategoryClick(subCategory)}
          >
            <h3 className="text-xl font-semibold mb-2">{subCategory.name}</h3>
            <p className="text-gray-600 mb-2">{subCategory.description}</p>
            <p className="text-sm text-gray-500">
              Starting from Rp {Math.min(...subCategory.sessions.map(s => s.price)).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// SubCategory Detail Component
const SubCategoryDetail = ({ subCategory, onBooking }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{subCategory.name}</h1>
      <p className="text-gray-600 mb-6">{subCategory.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Available Sessions</h2>
          {subCategory.sessions.map(session => (
            <div key={session.id} className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium">{session.name}</h3>
                <p className="text-gray-600">Rp {session.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => onBooking(session)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Available Workers</h2>
          {subCategory.workers.map(worker => (
            <div key={worker.id} className="mb-4">
              <h3 className="font-medium">{worker.name}</h3>
              <p className="text-gray-600">Rating: {worker.rating} ⭐</p>
              <p className="text-gray-600">Completed Jobs: {worker.completedJobs}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="mb-4">
            <div className="flex items-center mb-2">
              <span className="font-medium mr-2">{testimonial.userName}</span>
              <span>{testimonial.rating} ⭐</span>
            </div>
            <p className="text-gray-600">{testimonial.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Booking Form Component
const BookingForm = ({ session, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    promoCode: '',
    paymentMethod: 'myPay'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Book Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Booking Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Promo Code</label>
            <input
              type="text"
              value={formData.promoCode}
              onChange={(e) => setFormData({...formData, promoCode: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Enter promo code (optional)"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="myPay">MyPay</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>

          <div className="mb-4">
            <p className="font-medium">Total Payment</p>
            <p className="text-xl">Rp {session.price.toLocaleString()}</p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Confirm Booking
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App Component
const ServiceMarketplace = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleBooking = (session) => {
    setSelectedSession(session);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (formData) => {
    // Here you would typically make an API call to create the booking
    console.log('Booking submitted:', { session: selectedSession, ...formData });
    setShowBookingForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!selectedSubCategory ? (
        <Homepage onSubCategoryClick={setSelectedSubCategory} />
      ) : (
        <div>
          <button
            onClick={() => setSelectedSubCategory(null)}
            className="m-6 text-blue-500 hover:text-blue-600"
          >
            ← Back to Homepage
          </button>
          <SubCategoryDetail
            subCategory={selectedSubCategory}
            onBooking={handleBooking}
          />
        </div>
      )}

      {showBookingForm && (
        <BookingForm
          session={selectedSession}
          onSubmit={handleBookingSubmit}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
};

export default ServiceMarketplace;