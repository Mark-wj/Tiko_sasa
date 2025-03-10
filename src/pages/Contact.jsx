import React, { useState } from 'react';

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
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex gap-x-24 clear-left md:mb-16 mb-10">
          <div className="md:mb-0 mb-4">
            <h2 className="text-black font-manrope text-4xl font-semibold leading-10 mb-5 md:text-left text-center">
              Get In Touch
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-7 mb-7 md:text-left text-center">
              Whether you have a concern or simply want to say hello, we are here to facilitate communication with you.
            </p>
            <div className="flex md:items-center md:justify-start justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-36 h-12 rounded-full bg-indigo-600 transition-all duration-700 hover:bg-indigo-800 shadow text-white text-center text-base font-semibold leading-6"
              >
                Contact Us
              </button>
            </div>
          </div>
          <div className="border-l-2 md:border-indigo-600 border-white px-10 py-6">
            <div className="mb-8">
              <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">Email Address</h6>
              <h3 className="text-black text-xl font-semibold leading-8 md:text-start text-center">marknjenga25@gmail.com</h3>
            </div>
            <div>
              <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">Phone Number</h6>
              <h3 className="text-black text-xl font-semibold leading-8 md:text-start text-center">+254-769-992-344</h3>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          {/* City images... */}
          <div className="h-96 relative flex justify-center">
            <div className="w-full h-full absolute bg-gradient-to-t from-gray-800/50 to-gray-600/50"></div>
            <img src="https://tinyurl.com/ux64pmea" alt="Nairobi City image" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 mb-6 text-center px-6">
              <h5 className="text-white text-lg font-semibold leading-7 mb-2">Nairobi</h5>
              <p className="text-white text-base font-medium leading-6">34 High Street, Westlands, Nairobi</p>
            </div>
          </div>
          <div className="h-96 relative flex justify-center">
            <div className="w-full h-full absolute bg-gradient-to-t from-gray-800/50 to-gray-600/50"></div>
            <img src="https://tinyurl.com/374rzc5a" alt="Nakuru City image" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 mb-6 text-center px-6">
              <h5 className="text-white text-lg font-semibold leading-7 mb-2">Nakuru</h5>
              <p className="text-white text-base font-medium leading-6">34 Forest Road, Milimani, Nakuru</p>
            </div>
          </div>
          <div className="h-96 relative flex justify-center">
            <div className="w-full h-full absolute bg-gradient-to-t from-gray-800/50 to-gray-600/50"></div>
            <img src="https://tinyurl.com/2y5ewxpw" alt="Mombasa City image" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 mb-6 text-center px-6">
              <h5 className="text-white text-lg font-semibold leading-7 mb-2">Mombasa</h5>
              <p className="text-white text-base font-medium leading-6">456 Likoni Rd, Mombasa</p>
            </div>
          </div>
          <div className="h-96 relative flex justify-center">
            <div className="w-full h-full absolute bg-gradient-to-t from-gray-800/50 to-gray-600/50"></div>
            <img src="https://tinyurl.com/3fewwetu" alt="Kisumu City image" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 mb-6 text-center px-6">
              <h5 className="text-white text-lg font-semibold leading-7 mb-2">Kisumu</h5>
              <p className="text-white text-base font-medium leading-6">987 Oginga Odinga Rd, Kisumu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for the contact form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <button type="submit" className="bg-rose-400 text-white px-4 py-2 rounded hover:bg-indigo-700">
                  Send
                </button>
                <a
                  href="https://wa.me/254769992344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-400 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
