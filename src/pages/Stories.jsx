import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import axios from 'axios';

// Stories data (initial state, later modified after form submission)
const initialStories = [
  {
    id: 1,
    title: "Restoring the Amazon Rainforest",
    content: "Through community efforts and sustainable practices, we've helped restore over 1,000 hectares of rainforest...",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    organization: "Rainforest Alliance",
    date: "2024-03-01"
  },
  {
    id: 2,
    title: "Marine Life Conservation Success",
    content: "Our recent initiative has successfully protected endangered sea turtles and their nesting sites...",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    organization: "Ocean Conservation Initiative",
    date: "2024-02-28"
  },
  {
    id: 3,
    title: "Wildlife Protection Achievement",
    content: "Thanks to donor support, we've established a new sanctuary for endangered species...",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    organization: "Wildlife Protection Fund",
    date: "2024-02-25"
  }
];

// Form validation schema with Yup
const validationSchema = Yup.object({
  organization: Yup.string().required('Organization name is required'),
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  image: Yup.string().url('Invalid image URL').optional(),
});

export default function Stories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [date, setDate] = useState(new Date()); // Automatically updating date
  const [stories, setStories] = useState(initialStories); // State to store stories

  const formik = useFormik({
    initialValues: {
      organization: '',
      title: '',
      content: '',
      image: '',
      date: date.toISOString(),
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Add new story to stories state
      const newStory = {
        id: stories.length + 1, // New unique ID for the story
        title: values.title,
        content: values.content,
        image: values.image || "https://via.placeholder.com/600x400", // Default image if none provided
        organization: values.organization,
        date: date.toISOString(),
      };

      setStories((prevStories) => [...prevStories, newStory]); // Add the new story to the state
      resetForm(); // Reset the form after submission
    }
  });

  const nextStory = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date()); // This will trigger a re-render
    }, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, []); // Empty dependency array to run only once when component mounts

  useEffect(() => {
    const intervalId = setInterval(nextStory, 5000); // Change stories every 5 seconds
    return () => clearInterval(intervalId);
  }, [stories.length]); // Add dependency on stories.length to reset the interval if the length changes

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-white-200 via-white-300 to-white-500">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl mt-10">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Post a Story</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Organization Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Organization Name</label>
              <input
                type="text"
                name="organization"
                placeholder="Enter your organization name"
                value={formik.values.organization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {formik.touched.organization && formik.errors.organization ? (
                <div className="text-red-500 text-sm">{formik.errors.organization}</div>
              ) : null}
            </div>

            {/* Title */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter story title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-red-500 text-sm">{formik.errors.title}</div>
              ) : null}
            </div>

            {/* Content */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Content</label>
              <textarea
                name="content"
                placeholder="Enter story content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="6"
              />
              {formik.touched.content && formik.errors.content ? (
                <div className="text-red-500 text-sm">{formik.errors.content}</div>
              ) : null}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Image URL (Optional)</label>
              <input
                type="text"
                name="image"
                placeholder="Enter image URL"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {formik.touched.image && formik.errors.image ? (
                <div className="text-red-500 text-sm">{formik.errors.image}</div>
              ) : null}
            </div>

            {/* Current Date */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Current Date and Time</label>
              <p className="text-gray-600">{date.toLocaleString()}</p>
            </div>

            {/* Post Story Button */}
            <button
              type="submit" // Using the default type to submit the form
              className="w-full py-3 bg-green-600 text-white font-semibold text-lg rounded-md hover:bg-green-700 transition duration-200"
            >
              Post Story
            </button>
          </form>

          <h3 className="text-2xl font-bold text-center text-green-700 mt-12 mb-6">Success Stories</h3>

          <div className="relative">
            <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
              <img
                src={stories[currentIndex].image}
                alt={stories[currentIndex].title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute inset-0 flex justify-between items-center">
              <button
                onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length)}
                className="text-white bg-gray-800 p-4 rounded-full opacity-50 hover:opacity-100 transition duration-200"
              >
                &#10094;
              </button>
              <button
                onClick={nextStory}
                className="text-white bg-gray-800 p-4 rounded-full opacity-50 hover:opacity-100 transition duration-200"
              >
                &#10095;
              </button>
            </div>

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent py-4 px-6">
              <h3 className="text-xl font-bold text-white">{stories[currentIndex].title}</h3>
              <p className="text-sm text-white">{stories[currentIndex].organization} - {stories[currentIndex].date}</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
          <p className="text-lg">&copy; 2024 EcoGuard. All rights reserved.</p>
          <p className="mt-2 text-sm">Your support helps protect the planet for future generations.</p>

          <div className="flex justify-center mt-4 space-x-6">
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-green-600 text-2xl hover:text-green-800" />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-green-600 text-2xl hover:text-green-800" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-green-600 text-2xl hover:text-green-800" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-green-600 text-2xl hover:text-green-800" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
