import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/campaigns'; // Update this if your backend URL changes

export const fetchCampaigns = async (query: string, filters: any, sortOption: string) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: { query, ...filters, sort: sortOption },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
};
