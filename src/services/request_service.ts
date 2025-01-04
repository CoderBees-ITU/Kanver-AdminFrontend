import axios from 'axios';

const BASE_URL = "https://kanver-backend-93774604105.us-central1.run.app";

export const BloodRequestService = {
  async getRequests(filters: { bloodType?: string; city?: string; district?: string }) {
    const query = new URLSearchParams(filters).toString();
    try {
      const response = await axios.get(`${BASE_URL}/request/personalized?${query}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'user-auth-token',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching requests:", error);
      throw error;
    }
  },

  async createRequest(requestData: any) {
    try {
      const response = await axios.post(`${BASE_URL}/request`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'user-auth-token',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  },

  async deleteRequest(requestId: string) {
    try {
      const response = await axios.delete(`${BASE_URL}/request/${requestId}`, {
        headers: {
          'Authorization': 'user-auth-token',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting request:", error);
      throw error;
    }
  },
};