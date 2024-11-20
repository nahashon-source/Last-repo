import React from 'react';
import { Building2 } from 'lucide-react';
import OrganizationCard from '../components/OrganizationCard';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Import social media icons

const organizations = [
  {
    id: 1,
    name: "Rainforest Alliance",
    description: "Protecting rainforests and supporting sustainable agriculture practices worldwide.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    raised: 850000
  },
  {
    id: 2,
    name: "Ocean Conservation Initiative",
    description: "Dedicated to preserving marine ecosystems and protecting endangered sea life.",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    raised: 620000
  },
  {
    id: 3,
    name: "Wildlife Protection Fund",
    description: "Safeguarding endangered species and their natural habitats across the globe.",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    raised: 935000
  },
  {
    id: 4,
    name: "Clean Energy Alliance",
    description: "Promoting renewable energy solutions and reducing carbon emissions globally.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    raised: 445000
  },
  {
    id: 5,
    name: "Sustainable Agriculture Network",
    description: "Supporting farmers in adopting environmentally friendly farming practices.",
    image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    raised: 580000
  },
  {
    id: 6,
    name: "Water Conservation Trust",
    description: "Protecting freshwater resources and ensuring clean water access worldwide.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    raised: 720000
  }
];

export default function Organizations() {
  return (
    <div className="pt-16">
      <div className="bg-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Building2 className="mx-auto h-12 w-12 text-green-600" />
            <h1 className="mt-4 text-4xl font-bold text-green-900">Environmental Organizations</h1>
            <p className="mt-2 text-lg text-gray-600">Support verified organizations making real impact</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizations.map(org => (
            <OrganizationCard key={org.id} org={org} />
          ))}
        </div>
      </div>

      <footer className="bg-white py-6 mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
          <p className="text-lg">&copy; 2024 Mazingira. All rights reserved.</p>
          <p className="mt-2 text-sm">Your support helps protect the planet for future generations.</p>

          <div className="flex justify-center mt-4 space-x-6">
            {/* Social Media Icons */}
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={30} className="text-green-600 hover:text-green-800" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} className="text-blue-600 hover:text-blue-800" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} className="text-pink-600 hover:text-pink-800" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={30} className="text-blue-400 hover:text-blue-600" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
