import { Crop, BuyerRequirement, User, AdPoster } from '../data/dummyData';

const API_BASE_URL = 'https://api.your-agriculture-platform.com';

// Crops API
export const cropsAPI = {
  // Get all crops
  getAllCrops: async (): Promise<Crop[]> => {
    // const response = await fetch(`${API_BASE_URL}/crops`);
    // return response.json();
    console.log('API call: getAllCrops');
    return [];
  },

  // Add new crop
  addCrop: async (crop: Omit<Crop, 'id'>): Promise<Crop> => {
    // const response = await fetch(`${API_BASE_URL}/crops`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(crop)
    // });
    // return response.json();
    console.log('API call: addCrop', crop);
    return { ...crop, id: Date.now().toString() };
  },

  // Update crop
  updateCrop: async (id: string, crop: Partial<Crop>): Promise<Crop> => {
    // const response = await fetch(`${API_BASE_URL}/crops/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(crop)
    // });
    // return response.json();
    console.log('API call: updateCrop', id, crop);
    return {} as Crop;
  },

  // Delete crop
  deleteCrop: async (id: string): Promise<void> => {
    // await fetch(`${API_BASE_URL}/crops/${id}`, { method: 'DELETE' });
    console.log('API call: deleteCrop', id);
  }
};

// Buyer Requirements API
export const buyerRequirementsAPI = {
  // Get all buyer requirements
  getAllRequirements: async (): Promise<BuyerRequirement[]> => {
    // const response = await fetch(`${API_BASE_URL}/buyer-requirements`);
    // return response.json();
    console.log('API call: getAllRequirements');
    return [];
  },

  // Add new requirement
  addRequirement: async (requirement: Omit<BuyerRequirement, 'id'>): Promise<BuyerRequirement> => {
    // const response = await fetch(`${API_BASE_URL}/buyer-requirements`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(requirement)
    // });
    // return response.json();
    console.log('API call: addRequirement', requirement);
    return { ...requirement, id: Date.now().toString() };
  },

  // Update requirement
  updateRequirement: async (id: string, requirement: Partial<BuyerRequirement>): Promise<BuyerRequirement> => {
    // const response = await fetch(`${API_BASE_URL}/buyer-requirements/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(requirement)
    // });
    // return response.json();
    console.log('API call: updateRequirement', id, requirement);
    return {} as BuyerRequirement;
  },

  // Delete requirement
  deleteRequirement: async (id: string): Promise<void> => {
    // await fetch(`${API_BASE_URL}/buyer-requirements/${id}`, { method: 'DELETE' });
    console.log('API call: deleteRequirement', id);
  }
};

// Users API
export const usersAPI = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    // const response = await fetch(`${API_BASE_URL}/users`);
    // return response.json();
    console.log('API call: getAllUsers');
    return [];
  },

  // Get farmers only
  getFarmers: async (): Promise<User[]> => {
    // const response = await fetch(`${API_BASE_URL}/users?type=farmer`);
    // return response.json();
    console.log('API call: getFarmers');
    return [];
  },

  // Get buyers only
  getBuyers: async (): Promise<User[]> => {
    // const response = await fetch(`${API_BASE_URL}/users?type=buyer`);
    // return response.json();
    console.log('API call: getBuyers');
    return [];
  },

  // Update user status
  updateUserStatus: async (id: string, status: 'active' | 'inactive'): Promise<User> => {
    // const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status })
    // });
    // return response.json();
    console.log('API call: updateUserStatus', id, status);
    return {} as User;
  }
};

// Ad Posters API
export const adPostersAPI = {
  // Get all ad posters
  getAllAdPosters: async (): Promise<AdPoster[]> => {
    // const response = await fetch(`${API_BASE_URL}/ad-posters`);
    // return response.json();
    console.log('API call: getAllAdPosters');
    return [];
  },

  // Add new ad poster
  addAdPoster: async (adPoster: Omit<AdPoster, 'id'>): Promise<AdPoster> => {
    // const response = await fetch(`${API_BASE_URL}/ad-posters`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(adPoster)
    // });
    // return response.json();
    console.log('API call: addAdPoster', adPoster);
    return { ...adPoster, id: Date.now().toString() };
  },

  // Update ad poster
  updateAdPoster: async (id: string, adPoster: Partial<AdPoster>): Promise<AdPoster> => {
    // const response = await fetch(`${API_BASE_URL}/ad-posters/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(adPoster)
    // });
    // return response.json();
    console.log('API call: updateAdPoster', id, adPoster);
    return {} as AdPoster;
  },

  // Delete ad poster
  deleteAdPoster: async (id: string): Promise<void> => {
    // await fetch(`${API_BASE_URL}/ad-posters/${id}`, { method: 'DELETE' });
    console.log('API call: deleteAdPoster', id);
  }
};