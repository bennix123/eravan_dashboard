import React, { useState } from 'react';
import { dummyAdPosters, AdPoster } from '../data/dummyData';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';
import { adPostersAPI } from '../api/apiCalls';

export const AdManagement: React.FC = () => {
  const [adPosters, setAdPosters] = useState(dummyAdPosters);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAd, setEditingAd] = useState<string | null>(null);

  const [newAd, setNewAd] = useState<Partial<AdPoster>>({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    isActive: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleAddAd = async () => {
    try {
      const adToAdd = {
        ...newAd,
        id: Date.now().toString()
      } as AdPoster;

      // Commented API call
      // await adPostersAPI.addAdPoster(adToAdd);
      
      setAdPosters([...adPosters, adToAdd]);
      setShowAddForm(false);
      setNewAd({
        title: '',
        description: '',
        imageUrl: '',
        link: '',
        isActive: true,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding ad poster:', error);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const updatedAds = adPosters.map(ad =>
        ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
      );
      setAdPosters(updatedAds);

      // Commented API call
      // const ad = adPosters.find(a => a.id === id);
      // if (ad) {
      //   await adPostersAPI.updateAdPoster(id, { isActive: !ad.isActive });
      // }
    } catch (error) {
      console.error('Error toggling ad status:', error);
    }
  };

  const handleDeleteAd = async (id: string) => {
    try {
      // Commented API call
      // await adPostersAPI.deleteAdPoster(id);
      
      setAdPosters(adPosters.filter(ad => ad.id !== id));
    } catch (error) {
      console.error('Error deleting ad poster:', error);
    }
  };

  const activeAds = adPosters.filter(ad => ad.isActive);
  const totalImpressions = adPosters.length * 1000; // Mock data
  const clickThroughRate = 2.5; // Mock data

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ad Management</h1>
        <p className="text-gray-600">Manage promotional banners and advertisements</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Ads</h3>
          <p className="text-3xl font-bold text-blue-600">{adPosters.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Active Ads</h3>
          <p className="text-3xl font-bold text-emerald-600">{activeAds.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Impressions</h3>
          <p className="text-3xl font-bold text-orange-600">{totalImpressions.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Click Through Rate</h3>
          <p className="text-3xl font-bold text-purple-600">{clickThroughRate}%</p>
        </div>
      </div>

      {/* Add Ad Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Advertisement Posters</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Ad
        </button>
      </div>

      {/* Add Ad Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add New Advertisement</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Ad Title"
                value={newAd.title}
                onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="md:col-span-2">
              <textarea
                placeholder="Description"
                value={newAd.description}
                onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows={3}
              />
            </div>
            <input
              type="url"
              placeholder="Image URL"
              value={newAd.imageUrl}
              onChange={(e) => setNewAd({ ...newAd, imageUrl: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="url"
              placeholder="Link URL"
              value={newAd.link}
              onChange={(e) => setNewAd({ ...newAd, link: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="date"
              placeholder="Start Date"
              value={newAd.startDate}
              onChange={(e) => setNewAd({ ...newAd, startDate: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="date"
              placeholder="End Date"
              value={newAd.endDate}
              onChange={(e) => setNewAd({ ...newAd, endDate: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newAd.isActive}
                  onChange={(e) => setNewAd({ ...newAd, isActive: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>
          {newAd.imageUrl && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
              <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={newAd.imageUrl} 
                  alt="Ad preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="font-bold">{newAd.title}</h3>
                    <p className="text-sm">{newAd.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAd}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Advertisement
            </button>
          </div>
        </div>
      )}

      {/* Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adPosters.map((ad) => (
          <div key={ad.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img 
                src={ad.imageUrl} 
                alt={ad.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
                  <p className="text-sm">{ad.description}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  ad.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {ad.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{ad.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{ad.description}</p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-3">
                <div>Start: {new Date(ad.startDate).toLocaleDateString()}</div>
                <div>End: {new Date(ad.endDate).toLocaleDateString()}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleActive(ad.id)}
                    className={`flex items-center px-2 py-1 rounded text-xs font-medium ${
                      ad.isActive
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {ad.isActive ? (
                      <>
                        <EyeOff className="w-3 h-3 mr-1" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3 mr-1" />
                        Show
                      </>
                    )}
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingAd(ad.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAd(ad.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ad Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{activeAds.length}</div>
            <div className="text-sm text-gray-600">Currently Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{totalImpressions.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{(totalImpressions * clickThroughRate / 100).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Clicks</div>
          </div>
        </div>
      </div>
    </div>
  );
};