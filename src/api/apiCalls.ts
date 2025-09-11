import { Crop, BuyerRequirement, User, AdPoster } from '../data/dummyData';

// Define the BankDetail interface according to your data structure
export interface BankDetail {
  account_number: string;
  ifsc_code: string;
  bank_name: string;
  account_holder_name: string;
  // Add more fields as needed
}
export interface BuyerRequirement {
  id: string;
  name: string | null;
  buying_capacity_value: number;
  buying_capacity_frequency: string;
  next_tentative_procurement_date: string;
  tentative_selling_price_per_kg: number;
  user_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = 'https://api.eravan.in/api/2024';
// Update your User interface to match the API response
export interface User {
  id: string;
  name: string | null;
  bank_details: BankDetail[] | null;
  profile_photo: string | null;
  phone_number: string;
  whatsapp_number: string | null;
  user_type: 'farmer' | 'buyer';
  is_user_signup: boolean;
  is_active: boolean;
  address: string | null;
  gst: string | null;
  created_at: string;
  updated_at: string;
  user_documents: null;
}
export interface Crop {
  id: string;
  name: string;
  crop_photo: string;
  production_capacity_value: number;
  production_capacity_frequency: string;
  next_tentative_supply_date: string;
  tentative_selling_price_per_kg: number;
  user_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BuyerRequirement {
  id: string;
  name: string | null;
  buying_capacity_value: number;
  buying_capacity_frequency: string;
  next_tentative_procurement_date: string;
  tentative_selling_price_per_kg: number;
  user_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
// Crops API
export const cropsAPI = {
  // Get all crops
  getAllCrops: async (): Promise<Crop[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/crop/get_all_crops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to_apply_pagination: false })
      });
      const result = await response.json();
      console.log(result);

      if (result.status && result.data.cropsData) { // Changed to cropsData
        // Transform the API response to match Crop interface
        return result.data.cropsData.map((crop: any) => ({
          id: crop.id,
          name: crop.name,
          crop_photo: crop.crop_photo,
          production_capacity_value: crop.production_capacity_value,
          production_capacity_frequency: crop.production_capacity_frequency,
          next_tentative_supply_date: crop.next_tentative_supply_date,
          tentative_selling_price_per_kg: crop.tentative_selling_price_per_kg,
          user_id: crop.user_id,
          is_active: crop.is_active,
          created_at: crop.created_at,
          updated_at: crop.updated_at
        }));
      }
      throw new Error(result.message || 'Failed to fetch crops');
    } catch (error) {
      console.error('Error fetching crops:', error);
      throw error;
    }
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
    try {
      const response = await fetch(`${API_BASE_URL}/crop/get_all_crop_requirements`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ to_apply_pagination: false })

        }); // Update endpoint if needed
      const result = await response.json();

      if (result.status && result.data.cropRequirementsData) { // Changed to cropRequirementsData
        // Transform the API response to match BuyerRequirement interface
        return result.data.cropRequirementsData.map((requirement: any) => ({
          id: requirement.id,
          name: requirement.name,
          buying_capacity_value: requirement.buying_capacity_value,
          buying_capacity_frequency: requirement.buying_capacity_frequency,
          next_tentative_procurement_date: requirement.next_tentative_procurement_date,
          tentative_selling_price_per_kg: requirement.tentative_selling_price_per_kg,
          user_id: requirement.user_id,
          is_active: requirement.is_active,
          created_at: requirement.created_at,
          updated_at: requirement.updated_at
        }));
      }
      throw new Error(result.message || 'Failed to fetch buyer requirements');
    } catch (error) {
      console.error('Error fetching buyer requirements:', error);
      throw error;
    }
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
    try {
      const response = await fetch(`${API_BASE_URL}/user/get_all_users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to_apply_pagination: false })
      });
      const result = await response.json();

      if (result.status && result.data.usersData) {
        // Return the raw data without unnecessary transformations
        return result.data.usersData.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          profile_photo: user.profile_photo,
          phone_number: user.phone_number,
          whatsapp_number: user.whatsapp_number,
          user_type: user.user_type,
          is_user_signup: user.is_user_signup,
          is_active: user.is_active,
          address: user.address,
          gst: user.gst,
          bank_details: user.bank_details,
          created_at: user.created_at,
          updated_at: user.updated_at,
          user_documents: user.user_documents
        }));
      }
      throw new Error(result.message || 'Failed to fetch users');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
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