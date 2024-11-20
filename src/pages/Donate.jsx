import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DollarSign, Heart } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

// Currency symbols mapping
const currencySymbols = {
  Ksh: 'KSh',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

// Validation schema
const validationSchema = Yup.object({
  donationAmount: Yup.number()
    .min(1, 'Donation must be at least 1')
    .required('Donation amount is required'),
  currency: Yup.string().required('Currency is required'),
  paymentMethod: Yup.string().required('Payment method is required'),
});

// Main Donate Component
export default function Donate() {
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [error, setError] = useState(null); // Error state to handle API errors

  const formik = useFormik({
    initialValues: {
      donationAmount: '',
      currency: 'Ksh',
      isRecurring: false,
      frequency: 'monthly',
      isAnonymous: false,
      paymentMethod: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null); // Reset error on form submission

      try {
        const response = await fetch('https://project-backend-1-z8k0.onrender.com/donate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorData = await response.json(); // Capture the error response from the server
          throw new Error(errorData.message || 'Server responded with an error');
        }

        const result = await response.json();
        alert(result.message); // Alert the success message from the backend
        formik.resetForm(); // Reset form after successful donation
      } catch (error) {
        console.error('Error processing donation:', error);
        setError(error.message || 'An error occurred while processing your donation. Please try again later.');
      } finally {
        setLoading(false); // Reset loading state after API call
      }
    },
  });

  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <DollarSign className="mx-auto h-16 w-16 text-white" />
          <h1 className="mt-4 text-4xl font-bold">Make a Donation</h1>
          <p className="mt-2 text-lg">Support environmental conservation efforts worldwide</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={formik.handleSubmit}>
            {/* Donation Amount */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Donation Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">
                  {currencySymbols[formik.values.currency]}
                </span>
                <input
                  name="donationAmount"
                  type="number"
                  value={formik.values.donationAmount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Enter amount"
                />
                {formik.touched.donationAmount && formik.errors.donationAmount && (
                  <p className="text-red-500">{formik.errors.donationAmount}</p>
                )}
              </div>
            </div>

            {/* Currency Selector */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Currency</label>
              <select
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="Ksh">Kenyan Shilling (Ksh)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
              </select>
            </div>

            {/* Recurring Donation */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <input
                  name="isRecurring"
                  type="checkbox"
                  checked={formik.values.isRecurring}
                  onChange={formik.handleChange}
                  className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-900">
                  Make this a recurring donation
                </label>
              </div>

              {formik.values.isRecurring && (
                <div className="ml-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Frequency</label>
                  <div className="flex space-x-4">
                    {['monthly', 'quarterly', 'yearly'].map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                          formik.values.frequency === freq
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => formik.setFieldValue('frequency', freq)}
                      >
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Anonymous Donation */}
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  name="isAnonymous"
                  type="checkbox"
                  checked={formik.values.isAnonymous}
                  onChange={formik.handleChange}
                  className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-900">Make this an anonymous donation</label>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700">Payment Method</label>
              <select
                name="paymentMethod"
                value={formik.values.paymentMethod}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Payment Method</option>
                <option value="creditCard">Credit Card</option>
                <option value="mpesa">MPESA</option>
                <option value="paypal">PayPal</option>
              </select>
              {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                <p className="text-red-500 text-sm">{formik.errors.paymentMethod}</p>
              )}
            </div>

            {/* Donation Summary */}
            <div className="mt-8 border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Frequency</span>
                <span className="capitalize">
                  {formik.values.isRecurring ? formik.values.frequency : 'One-time'}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  {currencySymbols[formik.values.currency]} {formik.values.donationAmount}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 mt-6"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <Heart size={20} />
                  Complete Donation
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mt-4">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800"><FaFacebook /></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><FaInstagram /></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><FaTwitter /></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><FaWhatsapp /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
