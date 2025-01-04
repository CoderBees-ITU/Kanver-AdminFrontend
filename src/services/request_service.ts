import axios from 'axios';


const BASE_URL = "https://kanver-backend-93774604105.us-central1.run.app";

export const BloodRequestService = {
  getRequests: async (p: {}) => {
    const response = await axios.get(
      'https://kanver-backend-93774604105.us-central1.run.app/request',
      {
        headers: {
          Authorization: 'iJFXvfpDakVUQ6iYWp0OMJfJv5z2',
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data // Return the array of blood requests
  },

  async createRequest(requestData: any) {
    try {
      const response = await axios.post(`${BASE_URL}/request`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'user-auth-token',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error creating request:', error)
      throw error
    }
  },

  async deleteRequest(requestId: string) {
    try {
      const response = await axios.delete(`${BASE_URL}/request/${requestId}`, {
        headers: {
          Authorization: 'user-auth-token',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error deleting request:', error)
      throw error
    }
  },
}