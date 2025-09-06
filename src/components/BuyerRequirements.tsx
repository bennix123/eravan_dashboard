import React, { useState } from 'react';
import { dummyBuyerRequirements } from '../data/dummyData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Search, Filter, Download, Calendar } from 'lucide-react';

export const BuyerRequirements: React.FC = () => {
  const [requirements] = useState(dummyBuyerRequirements);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterQuality, setFilterQuality] = useState<string>('all');

  const filteredRequirements = requirements.filter(req => {
    const matchesSearch = req.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.buyerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesQuality = filterQuality === 'all' || req.quality === filterQuality;
    return matchesSearch && matchesStatus && matchesQuality;
  });

  // Chart data
  const demandByType = requirements.reduce((acc, req) => {
    acc[req.cropName] = (acc[req.cropName] || 0) + req.quantityNeeded;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(demandByType).map(([name, quantity]) => ({
    name,
    quantity
  }));

  const priceData = requirements.map(req => ({
    crop: req.cropName,
    maxPrice: req.maxPrice,
    quantity: req.quantityNeeded
  }));

  const totalDemand = requirements.reduce((sum, req) => sum + req.quantityNeeded, 0);
  const averagePrice = requirements.reduce((sum, req) => sum + req.maxPrice, 0) / requirements.length;
  const openRequirements = requirements.filter(req => req.status === 'open').length;

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Buyer Requirements Analysis</h1>
        <p className="text-gray-600">Track and analyze crop demands from buyers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Requirements</h3>
          <p className="text-3xl font-bold text-blue-600">{requirements.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Demand</h3>
          <p className="text-3xl font-bold text-emerald-600">{totalDemand.toLocaleString()} kg</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Average Max Price</h3>
          <p className="text-3xl font-bold text-orange-600">₹{Math.round(averagePrice)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Open Requirements</h3>
          <p className="text-3xl font-bold text-purple-600">{openRequirements}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Demand by Crop Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kg`, 'Demand']} />
              <Bar dataKey="quantity" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Price vs Quantity Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="maxPrice" stroke="#F97316" strokeWidth={2} name="Max Price" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search requirements or buyers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={filterQuality}
              onChange={(e) => setFilterQuality(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Quality</option>
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
              <option value="Economy">Economy</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Requirements Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequirements.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{req.cropName}</div>
                    <div className="text-sm text-gray-500">{req.variety || 'Any variety'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.buyerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {req.quantityNeeded} {req.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{req.maxPrice}/{req.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      req.quality === 'Premium' ? 'bg-purple-100 text-purple-800' :
                      req.quality === 'Standard' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {req.quality}
                    </span>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(req.requiredBy).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Urgent Requirements */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Urgent Requirements (Next 7 Days)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requirements
              .filter(req => {
                const reqDate = new Date(req.requiredBy);
                const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                return reqDate <= nextWeek && req.status === 'open';
              })
              .map((req) => (
                <div key={req.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-red-900">{req.cropName}</h4>
                      <p className="text-sm text-red-700">{req.buyerName}</p>
                      <p className="text-sm text-red-600">
                        {req.quantityNeeded} {req.unit} @ ₹{req.maxPrice}/{req.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-red-600">Required by</div>
                      <div className="text-sm font-semibold text-red-900">
                        {new Date(req.requiredBy).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};