import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { dummyCrops, dummyBuyerRequirements, Crop, BuyerRequirement } from '../data/dummyData';
import { cropsAPI, buyerRequirementsAPI } from '../api/apiCalls';

export const AdminPanel: React.FC = () => {
  const [crops, setCrops] = useState(dummyCrops);
  const [requirements, setRequirements] = useState(dummyBuyerRequirements);
  const [activeTab, setActiveTab] = useState<'crops' | 'requirements'>('crops');
  const [editingCrop, setEditingCrop] = useState<string | null>(null);
  const [editingRequirement, setEditingRequirement] = useState<string | null>(null);
  const [showAddCropForm, setShowAddCropForm] = useState(false);
  const [showAddRequirementForm, setShowAddRequirementForm] = useState(false);

  // New crop form state
  const [newCrop, setNewCrop] = useState<Partial<Crop>>({
    name: '',
    variety: '',
    quantity: 0,
    unit: 'kg',
    price: 0,
    farmerName: '',
    location: '',
    quality: 'Standard',
    description: '',
    status: 'available'
  });

  // New requirement form state
  const [newRequirement, setNewRequirement] = useState<Partial<BuyerRequirement>>({
    cropName: '',
    variety: '',
    quantityNeeded: 0,
    unit: 'kg',
    maxPrice: 0,
    buyerName: '',
    location: '',
    quality: 'Standard',
    status: 'open',
    description: ''
  });

  const handleAddCrop = async () => {
    try {
      const cropToAdd = {
        ...newCrop,
        id: Date.now().toString(),
        farmerId: 'temp-' + Date.now(),
        harvestDate: new Date().toISOString().split('T')[0],
        image: 'https://images.pexels.com/photos/1478286/pexels-photo-1478286.jpeg'
      } as Crop;

      // Commented API call
      // await cropsAPI.addCrop(cropToAdd);
      
      setCrops([...crops, cropToAdd]);
      setShowAddCropForm(false);
      setNewCrop({
        name: '',
        variety: '',
        quantity: 0,
        unit: 'kg',
        price: 0,
        farmerName: '',
        location: '',
        quality: 'Standard',
        description: '',
        status: 'available'
      });
    } catch (error) {
      console.error('Error adding crop:', error);
    }
  };

  const handleAddRequirement = async () => {
    try {
      const requirementToAdd = {
        ...newRequirement,
        id: Date.now().toString(),
        buyerId: 'temp-' + Date.now(),
        requiredBy: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      } as BuyerRequirement;

      // Commented API call
      // await buyerRequirementsAPI.addRequirement(requirementToAdd);
      
      setRequirements([...requirements, requirementToAdd]);
      setShowAddRequirementForm(false);
      setNewRequirement({
        cropName: '',
        variety: '',
        quantityNeeded: 0,
        unit: 'kg',
        maxPrice: 0,
        buyerName: '',
        location: '',
        quality: 'Standard',
        status: 'open',
        description: ''
      });
    } catch (error) {
      console.error('Error adding requirement:', error);
    }
  };

  const handleDeleteCrop = async (id: string) => {
    try {
      // Commented API call
      // await cropsAPI.deleteCrop(id);
      
      setCrops(crops.filter(crop => crop.id !== id));
    } catch (error) {
      console.error('Error deleting crop:', error);
    }
  };

  const handleDeleteRequirement = async (id: string) => {
    try {
      // Commented API call
      // await buyerRequirementsAPI.deleteRequirement(id);
      
      setRequirements(requirements.filter(req => req.id !== id));
    } catch (error) {
      console.error('Error deleting requirement:', error);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage crops and buyer requirements</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('crops')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'crops'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Crop Management
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'requirements'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Buyer Requirements
            </button>
          </nav>
        </div>
      </div>

      {/* Crops Tab */}
      {activeTab === 'crops' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Crop Listings</h2>
            <button
              onClick={() => setShowAddCropForm(true)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-emerald-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Crop
            </button>
          </div>

          {/* Add Crop Form */}
          {showAddCropForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Crop</h3>
                <button
                  onClick={() => setShowAddCropForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Crop Name"
                  value={newCrop.name}
                  onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Variety"
                  value={newCrop.variety}
                  onChange={(e) => setNewCrop({ ...newCrop, variety: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newCrop.quantity}
                  onChange={(e) => setNewCrop({ ...newCrop, quantity: Number(e.target.value) })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <select
                  value={newCrop.unit}
                  onChange={(e) => setNewCrop({ ...newCrop, unit: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="kg">kg</option>
                  <option value="tons">tons</option>
                  <option value="quintal">quintal</option>
                </select>
                <input
                  type="number"
                  placeholder="Price per unit"
                  value={newCrop.price}
                  onChange={(e) => setNewCrop({ ...newCrop, price: Number(e.target.value) })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Farmer Name"
                  value={newCrop.farmerName}
                  onChange={(e) => setNewCrop({ ...newCrop, farmerName: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newCrop.location}
                  onChange={(e) => setNewCrop({ ...newCrop, location: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <select
                  value={newCrop.quality}
                  onChange={(e) => setNewCrop({ ...newCrop, quality: e.target.value as 'Premium' | 'Standard' | 'Economy' })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                  <option value="Economy">Economy</option>
                </select>
              </div>
              <div className="mt-4">
                <textarea
                  placeholder="Description"
                  value={newCrop.description}
                  onChange={(e) => setNewCrop({ ...newCrop, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={3}
                />
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddCropForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCrop}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Crop
                </button>
              </div>
            </div>
          )}

          {/* Crops Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {crops.map((crop) => (
                    <tr key={crop.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-lg object-cover" src={crop.image} alt={crop.name} />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{crop.name}</div>
                            <div className="text-sm text-gray-500">{crop.variety}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{crop.farmerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {crop.quantity} {crop.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{crop.price}/{crop.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          crop.status === 'available' ? 'bg-green-100 text-green-800' :
                          crop.status === 'sold' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {crop.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingCrop(crop.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCrop(crop.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Requirements Tab */}
      {activeTab === 'requirements' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Buyer Requirements</h2>
            <button
              onClick={() => setShowAddRequirementForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Requirement
            </button>
          </div>

          {/* Add Requirement Form */}
          {showAddRequirementForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Requirement</h3>
                <button
                  onClick={() => setShowAddRequirementForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Crop Name"
                  value={newRequirement.cropName}
                  onChange={(e) => setNewRequirement({ ...newRequirement, cropName: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Variety"
                  value={newRequirement.variety}
                  onChange={(e) => setNewRequirement({ ...newRequirement, variety: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Quantity Needed"
                  value={newRequirement.quantityNeeded}
                  onChange={(e) => setNewRequirement({ ...newRequirement, quantityNeeded: Number(e.target.value) })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <select
                  value={newRequirement.unit}
                  onChange={(e) => setNewRequirement({ ...newRequirement, unit: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="kg">kg</option>
                  <option value="tons">tons</option>
                  <option value="quintal">quintal</option>
                </select>
                <input
                  type="number"
                  placeholder="Max Price per unit"
                  value={newRequirement.maxPrice}
                  onChange={(e) => setNewRequirement({ ...newRequirement, maxPrice: Number(e.target.value) })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Buyer Name"
                  value={newRequirement.buyerName}
                  onChange={(e) => setNewRequirement({ ...newRequirement, buyerName: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newRequirement.location}
                  onChange={(e) => setNewRequirement({ ...newRequirement, location: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <select
                  value={newRequirement.quality}
                  onChange={(e) => setNewRequirement({ ...newRequirement, quality: e.target.value as 'Premium' | 'Standard' | 'Economy' })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                  <option value="Economy">Economy</option>
                </select>
              </div>
              <div className="mt-4">
                <textarea
                  placeholder="Description"
                  value={newRequirement.description}
                  onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={3}
                />
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddRequirementForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRequirement}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Requirement
                </button>
              </div>
            </div>
          )}

          {/* Requirements Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requirements.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{req.cropName}</div>
                        <div className="text-sm text-gray-500">{req.variety}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.buyerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {req.quantityNeeded} {req.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{req.maxPrice}/{req.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          req.status === 'open' ? 'bg-green-100 text-green-800' :
                          req.status === 'fulfilled' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingRequirement(req.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRequirement(req.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};