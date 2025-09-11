import React, { useState, useEffect } from 'react';
// import { usersAPI, cropsAPI, buyerRequirementsAPI } from '../data/dummyData';
import {User,usersAPI,buyerRequirementsAPI,BuyerRequirement,cropsAPI,Crop} from '../api/apiCalls'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingCart, Wheat, DollarSign } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [requirements, setRequirements] = useState<BuyerRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersData, cropsData, requirementsData] = await Promise.all([
          usersAPI.getAllUsers(),
          cropsAPI.getAllCrops(),
          buyerRequirementsAPI.getAllRequirements()
        ]);
        
        setUsers(usersData);
        setCrops(cropsData);
        setRequirements(requirementsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate key metrics from real data
  const totalCrops = crops.length;
  const totalRequirements = requirements.length;
  const totalUsers = users.length;
  
  // Calculate total value based on crops data (using tentative selling price)
  const totalValue = crops.reduce((sum, crop) => sum + (crop.tentative_selling_price_per_kg * (crop.production_capacity_value || 0)), 0);

  // Monthly trends (mock data since we don't have historical data)
  const monthlyData = [
    { month: 'Jan', crops: Math.round(totalCrops * 0.7), requirements: Math.round(totalRequirements * 0.6), users: Math.round(totalUsers * 0.5), value: Math.round(totalValue * 0.6) },
    { month: 'Feb', crops: Math.round(totalCrops * 0.8), requirements: Math.round(totalRequirements * 0.7), users: Math.round(totalUsers * 0.6), value: Math.round(totalValue * 0.7) },
    { month: 'Mar', crops: Math.round(totalCrops * 0.9), requirements: Math.round(totalRequirements * 0.8), users: Math.round(totalUsers * 0.7), value: Math.round(totalValue * 0.8) },
    { month: 'Apr', crops: Math.round(totalCrops * 0.95), requirements: Math.round(totalRequirements * 0.9), users: Math.round(totalUsers * 0.8), value: Math.round(totalValue * 0.9) },
    { month: 'May', crops: totalCrops, requirements: totalRequirements, users: totalUsers, value: totalValue },
    { month: 'Jun', crops: Math.round(totalCrops * 1.1), requirements: Math.round(totalRequirements * 1.1), users: Math.round(totalUsers * 1.2), value: Math.round(totalValue * 1.1) },
  ];

  // Crop distribution
  const cropDistribution = crops.reduce((acc, crop) => {
    acc[crop.name] = (acc[crop.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cropData = Object.entries(cropDistribution).map(([name, count]) => ({
    name,
    count
  }));

  // Regional distribution based on user locations (mock data since we don't have location data)
  const regionalData = [
    { region: 'Punjab', value: Math.round(totalUsers * 0.35) },
    { region: 'Haryana', value: Math.round(totalUsers * 0.28) },
    { region: 'Gujarat', value: Math.round(totalUsers * 0.22) },
    { region: 'Maharashtra', value: Math.round(totalUsers * 0.18) },
    { region: 'Karnataka', value: Math.round(totalUsers * 0.15) },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Calculate active users
  const activeUsers = users.filter(user => user.is_active).length;
  const activeCrops = crops.filter(crop => crop.is_active).length;
  const activeRequirements = requirements.filter(req => req.is_active).length;

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center">Loading analytics data...</div>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Crops</p>
              <p className="text-3xl font-bold text-emerald-600">{totalCrops}</p>
              <p className="text-sm text-gray-500">{activeCrops} active</p>
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
              <p className="text-sm font-medium text-gray-600">Requirements</p>
              <p className="text-3xl font-bold text-blue-600">{totalRequirements}</p>
              <p className="text-sm text-gray-500">{activeRequirements} active</p>
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
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-orange-600">{totalUsers}</p>
              <p className="text-sm text-gray-500">{activeUsers} active</p>
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
              <p className="text-sm font-medium text-gray-600">Platform Value</p>
              <p className="text-3xl font-bold text-purple-600">₹{(totalValue / 100000).toFixed(1)}L</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+18% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Count']} />
              <Area type="monotone" dataKey="crops" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Crops" />
              <Area type="monotone" dataKey="requirements" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Requirements" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Count']} />
              <Line type="monotone" dataKey="users" stroke="#F59E0B" strokeWidth={3} name="Users" />
              <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={3} name="Value (₹)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Crop Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={cropData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {cropData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Listings']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { type: 'Farmers', count: users.filter(u => u.user_type === 'farmer').length },
              { type: 'Buyers', count: users.filter(u => u.user_type === 'buyer').length }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Users']} />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Regional Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={regionalData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="region" type="category" />
              <Tooltip formatter={(value) => [value, 'Users']} />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Active Users Rate</span>
                <span>{totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full" 
                  style={{ width: `${totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Active Listings Rate</span>
                <span>{totalCrops > 0 ? Math.round((activeCrops / totalCrops) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${totalCrops > 0 ? (activeCrops / totalCrops) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Active Requirements Rate</span>
                <span>{totalRequirements > 0 ? Math.round((activeRequirements / totalRequirements) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full" 
                  style={{ width: `${totalRequirements > 0 ? (activeRequirements / totalRequirements) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Crop Categories</h3>
          <div className="space-y-4">
            {cropData.slice(0, 4).map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3`} style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm text-gray-600">{item.count} listings</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Statistics</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">{totalUsers}+ Registered Users</p>
                <p className="text-xs text-gray-500">Total platform users</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">₹{(totalValue / 100000).toFixed(1)}L+ Platform Value</p>
                <p className="text-xs text-gray-500">Estimated total value</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">{cropData.length}+ Crop Types</p>
                <p className="text-xs text-gray-500">Variety of crops</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">{Math.round((activeUsers / totalUsers) * 100)}% Active Rate</p>
                <p className="text-xs text-gray-500">User engagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};