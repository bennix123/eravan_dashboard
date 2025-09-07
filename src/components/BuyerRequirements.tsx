import React, { useState, useEffect } from 'react';
// import { buyerRequirementsAPI } from '../data/dummyData'; // Update import path as needed
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import {buyerRequirementsAPI,BuyerRequirement} from  '../api/apiCalls'

export const BuyerRequirements: React.FC = () => {
  const [requirements, setRequirements] = useState<BuyerRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        setLoading(true);
        const requirementsData = await buyerRequirementsAPI.getAllRequirements();
        setRequirements(requirementsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch buyer requirements');
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, []);

  const filteredRequirements = requirements.filter(req => {
    const matchesSearch = (req.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesStatus = filterStatus === 'all' || (req.is_active ? 'active' : 'inactive') === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Chart data - simplified based on available fields
  const demandByType = requirements.reduce((acc, req) => {
    const cropName = req.name || 'Unknown Crop';
    acc[cropName] = (acc[cropName] || 0) + req.buying_capacity_value;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(demandByType).map(([name, quantity]) => ({
    name,
    quantity
  }));

  const priceData = requirements.map(req => ({
    crop: req.name || 'Unknown',
    price: req.tentative_selling_price_per_kg,
    quantity: req.buying_capacity_value
  }));

  const totalDemand = requirements.reduce((sum, req) => sum + req.buying_capacity_value, 0);
  const averagePrice = requirements.length > 0 
    ? requirements.reduce((sum, req) => sum + req.tentative_selling_price_per_kg, 0) / requirements.length 
    : 0;
  const activeRequirements = requirements.filter(req => req.is_active).length;

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center">Loading buyer requirements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Buyer Requirements Analysis</h1>
        <p className="text-gray-600">Track and analyze crop demands from buyers</p>
      </div>

      {/* Stats Cards - Updated for API fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Requirements</h3>
          <p className="text-3xl font-bold text-blue-600">{requirements.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Demand</h3>
          <p className="text-3xl font-bold text-emerald-600">{totalDemand.toLocaleString()} units</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Average Price</h3>
          <p className="text-3xl font-bold text-orange-600">₹{Math.round(averagePrice)}/kg</p>
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
              <Tooltip formatter={(value) => [`${value} units`, 'Demand']} />
              <Bar dataKey="quantity" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Price per kg']} />
              <Line type="monotone" dataKey="price" stroke="#F97316" strokeWidth={2} name="Price per kg" />
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
                placeholder="Search crop requirements..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Requirements Table - Updated for API fields */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buying Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Procurement Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price per kg</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequirements.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {req.name || 'Unknown Crop'}
                    </div>
                    <div className="text-sm text-gray-500">ID: {req.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {req.buying_capacity_value} {req.buying_capacity_frequency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {req.next_tentative_procurement_date ? (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(req.next_tentative_procurement_date).toLocaleDateString()}
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{req.tentative_selling_price_per_kg}/kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      req.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {req.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(req.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Urgent Requirements - Updated for API fields */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Procurement Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requirements
              .filter(req => {
                if (!req.next_tentative_procurement_date || !req.is_active) return false;
                const procDate = new Date(req.next_tentative_procurement_date);
                const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                return procDate <= nextWeek;
              })
              .map((req) => (
                <div key={req.id} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-orange-900">{req.name || 'Unknown Crop'}</h4>
                      <p className="text-sm text-orange-700">
                        {req.buying_capacity_value} {req.buying_capacity_frequency}
                      </p>
                      <p className="text-sm text-orange-600">
                        @ ₹{req.tentative_selling_price_per_kg}/kg
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-orange-600">Procurement by</div>
                      <div className="text-sm font-semibold text-orange-900">
                        {new Date(req.next_tentative_procurement_date!).toLocaleDateString()}
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