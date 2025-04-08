import React, { useState } from 'react';
import { FiX, FiMail, FiPhone, FiMapPin, FiSend, FiMessageSquare } from 'react-icons/fi';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact Form Submission from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
    window.location.href = `mailto:marknjenga25@gmail.com?subject=${subject}&body=${body}`;
    setIsModalOpen(false);
  };

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Whether you have a concern or simply want to say hello, we're here to help.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-max p-4 rounded-full mb-6">
              <FiMail className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Address</h3>
            <p className="text-gray-600">marknjenga25@gmail.com</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-teal-100 w-max p-4 rounded-full mb-6">
              <FiPhone className="text-teal-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Phone Number</h3>
            <p className="text-gray-600">+254-769-992-344</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-max p-4 rounded-full mb-6">
              <FiMapPin className="text-purple-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
            >
              View Locations
            </button>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          {[
            { city: 'Nairobi', address: '34 High Street, Westlands', img: 'https://tinyurl.com/ux64pmea' },
            { city: 'Nakuru', address: '34 Forest Road, Milimani', img: 'https://tinyurl.com/374rzc5a' },
            { city: 'Mombasa', address: '456 Likoni Rd', img: 'https://tinyurl.com/2y5ewxpw' },
            { city: 'Kisumu', address: '987 Oginga Odinga Rd', img: 'https://tinyurl.com/3fewwetu' }
          ].map((location, index) => (
            <div key={index} className="relative group h-96 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={location.img} 
                alt={location.city} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{location.city}</h3>
                <p className="text-sm opacity-90">{location.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Contact Form</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-md transition-all"
                  >
                    <FiSend className="inline mr-2" /> Send Message
                  </button>
                  <a
                    href="https://wa.me/254769992344"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <FiMessageSquare className="inline" /> WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;