import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/feedBack/feedback', formData);
      alert('Feedback sent successfully!');
    } catch (error) {
      alert('Error sending feedback');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-800">
  <div className="flex-1 p-8 m-5 bg-white dark:bg-gray-900 rounded-xl shadow-md">
    <h2 className="text-4xl font-bold mb-4">Contact us </h2>
    <p className="mb-8">We'd love to hear from you! Please fill out the form below and we'll get back to you shortly.</p>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="email">Email</label>
        <input
          required
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-3 py-2 text-black border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="name">Name</label>
        <input
          required
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="message">Message</label>
        <textarea
          required
          id="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full px-3 py-2 border rounded-lg h-32 resize-none text-black"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full">
        SEND
      </button>
    </form>
  </div>

  <div className="flex-1 p-8 m-5 bg-blue-900 text-white rounded-xl shadow-md">
    <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
    <p className="mb-4"><strong>Email:</strong> amanjshkur15@gmail.com</p>
    <p className="mb-4"><strong>Phone:</strong> 0751 522 4100</p>
    <p className="mb-4"><strong>Address:</strong> Zerin City - Erbil</p>
    <p className="mb-4"><strong>Developer:</strong> Amanj Shkur</p>
  </div>
</div>

  );
};

export default Contact;
