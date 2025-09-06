import React, { useState } from 'react';
import { dummyAdPosters, dummyCrops, dummyBuyerRequirements, dummyUsers } from '../data/dummyData';
import { TrendingUp, Users, ShoppingCart, Wheat } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const activeAds = dummyAdPosters.filter(ad => ad.isActive);
  
  const stats = {
    totalCrops: dummyCrops.length,
    totalRequirements: dummyBuyerRequirements.length,
    totalFarmers: dummyUsers.filter(user => user.type === 'farmer').length,
    totalBuyers: dummyUsers.filter(user => user.type === 'buyer').length
  };

  React.useEffect(() => {
    if (activeAds.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % activeAds.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeAds.length]);

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to EravanAdmin Dashboard</h1>
        <p className="text-gray-600">Manage your agricultural marketplace efficiently</p>
      </div>

      {/* Ad Poster Section */}
      {activeAds.length > 0 && (
        <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64 bg-gradient-to-r from-emerald-500 to-blue-600">
            <img 
              src={activeAds[currentAdIndex].imageUrl} 
              alt={activeAds[currentAdIndex].title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">{activeAds[currentAdIndex].title}</h2>
                <p className="text-xl mb-6">{activeAds[currentAdIndex].description}</p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            {activeAds.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {activeAds.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAdIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentAdIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Crops</p>
              <p className="text-3xl font-bold text-emerald-600">{stats.totalCrops}</p>
            </div>
            <Wheat className="w-8 h-8 text-emerald-500" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Requirements</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalRequirements}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+8% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Farmers</p>
              <p className="text-3xl font-bold text-orange-600">{stats.totalFarmers}</p>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+15% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Buyers</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalBuyers}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+5% from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Crop Listings</h3>
          <div className="space-y-4">
            {dummyCrops.slice(0, 3).map((crop) => (
              <div key={crop.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <img src={crop.image} alt={crop.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{crop.name} - {crop.variety}</p>
                  <p className="text-sm text-gray-600">by {crop.farmerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">₹{crop.price}/{crop.unit}</p>
                  <p className="text-sm text-gray-500">{crop.quantity} {crop.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Requirements</h3>
          <div className="space-y-4">
            {dummyBuyerRequirements.slice(0, 3).map((req) => (
              <div key={req.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{req.cropName}</p>
                  <p className="text-sm text-gray-600">by {req.buyerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">₹{req.maxPrice}/{req.unit}</p>
                  <p className="text-sm text-gray-500">{req.quantityNeeded} {req.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};