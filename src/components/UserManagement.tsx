import React, { useState } from 'react';
import { dummyUsers } from '../data/dummyData';
import { Search, Filter, UserCheck, UserX, Star, Phone, Mail, MapPin } from 'lucide-react';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || user.type === filterType;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    // Commented API call
    // await usersAPI.updateUserStatus(userId, newStatus);
  };

  const farmers = users.filter(user => user.type === 'farmer');
  const buyers = users.filter(user => user.type === 'buyer');
  const activeUsers = users.filter(user => user.status === 'active');
  const totalTransactions = users.reduce((sum, user) => sum + user.totalTransactions, 0);

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
        <p className="text-gray-600">Manage farmers, buyers, and their activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{users.length}</p>
          <div className="flex items-center mt-2">
            <div className="text-sm text-gray-600">
              {farmers.length} Farmers, {buyers.length} Buyers
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="text-3xl font-bold text-emerald-600">{activeUsers.length}</p>
          <div className="text-sm text-emerald-600">
            {((activeUsers.length / users.length) * 100).toFixed(1)}% active rate
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
          <p className="text-3xl font-bold text-orange-600">{totalTransactions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
          <p className="text-3xl font-bold text-purple-600">
            {(users.reduce((sum, user) => sum + user.rating, 0) / users.length).toFixed(1)}
          </p>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600 ml-1">out of 5.0</span>
          </div>
        </div>
      </div>

      {/* User Type Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Farmers by Transactions</h3>
          <div className="space-y-4">
            {farmers
              .sort((a, b) => b.totalTransactions - a.totalTransactions)
              .slice(0, 5)
              .map((farmer) => (
                <div key={farmer.id} className="flex items-center space-x-4 p-3 bg-emerald-50 rounded-lg">
                  <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-emerald-800">
                      {farmer.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{farmer.name}</p>
                    <p className="text-sm text-gray-600">{farmer.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">{farmer.totalTransactions}</p>
                    <p className="text-sm text-gray-500">transactions</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Buyers by Transactions</h3>
          <div className="space-y-4">
            {buyers
              .sort((a, b) => b.totalTransactions - a.totalTransactions)
              .slice(0, 5)
              .map((buyer) => (
                <div key={buyer.id} className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-blue-800">
                      {buyer.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{buyer.name}</p>
                    <p className="text-sm text-gray-600">{buyer.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{buyer.totalTransactions}</p>
                    <p className="text-sm text-gray-500">transactions</p>
                  </div>
                </div>
              ))}
          </div>
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="farmer">Farmers</option>
              <option value="buyer">Buyers</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        user.type === 'farmer' ? 'bg-emerald-200' : 'bg-blue-200'
                      }`}>
                        <span className={`font-semibold ${
                          user.type === 'farmer' ? 'text-emerald-800' : 'text-blue-800'
                        }`}>
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">
                          Joined {new Date(user.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.type === 'farmer' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{user.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-semibold">{user.totalTransactions}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span>{user.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleToggleUserStatus(user.id)}
                      className={`flex items-center px-3 py-1 rounded-lg text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {user.status === 'active' ? (
                        <>
                          <UserX className="w-3 h-3 mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3 h-3 mr-1" />
                          Activate
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};