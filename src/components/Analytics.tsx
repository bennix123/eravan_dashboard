import React from 'react';
import { dummyCrops, dummyBuyerRequirements, dummyUsers } from '../data/dummyData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingCart, Wheat, DollarSign } from 'lucide-react';

export const Analytics: React.FC = () => {
  // Calculate key metrics
  const totalCrops = dummyCrops.length;
  const totalRequirements = dummyBuyerRequirements.length;
  const totalUsers = dummyUsers.length;
  const totalValue = dummyCrops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0);

  // Monthly trends (mock data)
  const monthlyData = [
    { month: 'Jan', crops: 45, requirements: 38, users: 12, value: 125000 },
    { month: 'Feb', crops: 52, requirements: 45, users: 18, value: 145000 },
    { month: 'Mar', crops: 48, requirements: 42, users: 15, value: 135000 },
    { month: 'Apr', crops: 61, requirements: 55, users: 22, value: 168000 },
    { month: 'May', crops: 55, requirements: 48, users: 19, value: 152000 },
    { month: 'Jun', crops: 67, requirements: 62, users: 25, value: 185000 },
  ];

  // Crop distribution
  const cropDistribution = dummyCrops.reduce((acc, crop) => {
    acc[crop.name] = (acc[crop.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cropData = Object.entries(cropDistribution).map(([name, count]) => ({
    name,
    count
  }));

  // Quality distribution
  const qualityData = dummyCrops.reduce((acc, crop) => {
    acc[crop.quality] = (acc[crop.quality] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const qualityChartData = Object.entries(qualityData).map(([quality, count]) => ({
    quality,
    count
  }));

  // Regional distribution (mock data based on locations)
  const regionalData = [
    { region: 'Punjab', value: 35 },
    { region: 'Haryana', value: 28 },
    { region: 'Gujarat', value: 22 },
    { region: 'Maharashtra', value: 18 },
    { region: 'Karnataka', value: 15 },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

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
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-3xl font-bold text-purple-600">₹{(totalValue / 1000).toFixed(0)}K</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-red-600">-3% from last month</span>
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
              <Tooltip />
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
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#F59E0B" strokeWidth={3} name="New Users" />
              <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={3} name="Platform Value (₹)" />
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quality Standards</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={qualityChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quality" />
              <YAxis />
              <Tooltip />
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
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Efficiency</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Match Rate</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Avg. Time to Match</span>
                <span>2.3 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>User Satisfaction</span>
                <span>4.2/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Categories</h3>
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Milestones</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">1000+ Active Users</p>
                <p className="text-xs text-gray-500">Achieved this month</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">₹10M+ in Transactions</p>
                <p className="text-xs text-gray-500">Total platform volume</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">50+ Cities Covered</p>
                <p className="text-xs text-gray-500">Expanding nationwide</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">95% Satisfaction Rate</p>
                <p className="text-xs text-gray-500">User feedback score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};