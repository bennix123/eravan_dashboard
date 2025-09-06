export interface Crop {
  id: string;
  name: string;
  variety: string;
  quantity: number;
  unit: string;
  price: number;
  farmerId: string;
  farmerName: string;
  location: string;
  harvestDate: string;
  quality: 'Premium' | 'Standard' | 'Economy';
  image: string;
  description: string;
  status: 'available' | 'sold' | 'pending';
}

export interface BuyerRequirement {
  id: string;
  cropName: string;
  variety: string;
  quantityNeeded: number;
  unit: string;
  maxPrice: number;
  buyerId: string;
  buyerName: string;
  location: string;
  requiredBy: string;
  quality: 'Premium' | 'Standard' | 'Economy';
  status: 'open' | 'fulfilled' | 'cancelled';
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'farmer' | 'buyer';
  location: string;
  joinDate: string;
  status: 'active' | 'inactive';
  totalTransactions: number;
  rating: number;
}

export interface AdPoster {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export const dummyCrops: Crop[] = [
  {
    id: '1',
    name: 'Rice',
    variety: 'Basmati',
    quantity: 500,
    unit: 'kg',
    price: 85,
    farmerId: 'f1',
    farmerName: 'Rajesh Kumar',
    location: 'Punjab, India',
    harvestDate: '2024-01-15',
    quality: 'Premium',
    image: 'https://images.pexels.com/photos/1478286/pexels-photo-1478286.jpeg',
    description: 'Premium quality Basmati rice, freshly harvested',
    status: 'available'
  },
  {
    id: '2',
    name: 'Wheat',
    variety: 'Durum',
    quantity: 1000,
    unit: 'kg',
    price: 45,
    farmerId: 'f2',
    farmerName: 'Priya Sharma',
    location: 'Haryana, India',
    harvestDate: '2024-01-20',
    quality: 'Standard',
    image: 'https://images.pexels.com/photos/461960/pexels-photo-461960.jpeg',
    description: 'High-quality durum wheat suitable for premium flour',
    status: 'available'
  },
  {
    id: '3',
    name: 'Corn',
    variety: 'Sweet Corn',
    quantity: 750,
    unit: 'kg',
    price: 35,
    farmerId: 'f3',
    farmerName: 'Suresh Patel',
    location: 'Gujarat, India',
    harvestDate: '2024-01-10',
    quality: 'Premium',
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg',
    description: 'Fresh sweet corn, perfect for direct consumption',
    status: 'pending'
  },
  {
    id: '4',
    name: 'Tomato',
    variety: 'Cherry',
    quantity: 200,
    unit: 'kg',
    price: 60,
    farmerId: 'f4',
    farmerName: 'Anita Singh',
    location: 'Maharashtra, India',
    harvestDate: '2024-01-22',
    quality: 'Premium',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    description: 'Organic cherry tomatoes, pesticide-free',
    status: 'available'
  }
];

export const dummyBuyerRequirements: BuyerRequirement[] = [
  {
    id: '1',
    cropName: 'Rice',
    variety: 'Basmati',
    quantityNeeded: 2000,
    unit: 'kg',
    maxPrice: 90,
    buyerId: 'b1',
    buyerName: 'ABC Food Processing',
    location: 'Delhi, India',
    requiredBy: '2024-02-15',
    quality: 'Premium',
    status: 'open',
    description: 'Looking for premium Basmati rice for export quality processing'
  },
  {
    id: '2',
    cropName: 'Wheat',
    variety: 'Any',
    quantityNeeded: 5000,
    unit: 'kg',
    maxPrice: 50,
    buyerId: 'b2',
    buyerName: 'Golden Flour Mills',
    location: 'Rajasthan, India',
    requiredBy: '2024-02-10',
    quality: 'Standard',
    status: 'open',
    description: 'Bulk wheat requirement for flour production'
  },
  {
    id: '3',
    cropName: 'Tomato',
    variety: 'Roma',
    quantityNeeded: 1000,
    unit: 'kg',
    maxPrice: 40,
    buyerId: 'b3',
    buyerName: 'Fresh Market Co.',
    location: 'Karnataka, India',
    requiredBy: '2024-02-05',
    quality: 'Premium',
    status: 'fulfilled',
    description: 'Fresh Roma tomatoes for retail chain supply'
  }
];

export const dummyUsers: User[] = [
  {
    id: 'f1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 9876543210',
    type: 'farmer',
    location: 'Punjab, India',
    joinDate: '2023-08-15',
    status: 'active',
    totalTransactions: 25,
    rating: 4.8
  },
  {
    id: 'f2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543211',
    type: 'farmer',
    location: 'Haryana, India',
    joinDate: '2023-09-20',
    status: 'active',
    totalTransactions: 18,
    rating: 4.6
  },
  {
    id: 'b1',
    name: 'ABC Food Processing',
    email: 'contact@abcfood.com',
    phone: '+91 9876543212',
    type: 'buyer',
    location: 'Delhi, India',
    joinDate: '2023-07-10',
    status: 'active',
    totalTransactions: 45,
    rating: 4.9
  },
  {
    id: 'b2',
    name: 'Golden Flour Mills',
    email: 'orders@goldenflour.com',
    phone: '+91 9876543213',
    type: 'buyer',
    location: 'Rajasthan, India',
    joinDate: '2023-06-05',
    status: 'active',
    totalTransactions: 32,
    rating: 4.7
  }
];

export const dummyAdPosters: AdPoster[] = [
  {
    id: '1',
    title: 'Premium Seeds Available',
    description: 'Get the best quality seeds for your next harvest',
    imageUrl: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    link: '#',
    isActive: true,
    startDate: '2024-01-01',
    endDate: '2024-02-28'
  },
  {
    id: '2',
    title: 'Modern Farming Equipment',
    description: 'Upgrade your farming with latest technology',
    imageUrl: 'https://images.pexels.com/photos/2884865/pexels-photo-2884865.jpeg',
    link: '#',
    isActive: false,
    startDate: '2024-01-15',
    endDate: '2024-03-15'
  }
];