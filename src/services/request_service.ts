import axios from 'axios'
import { getAuth } from 'firebase/auth'

import pino from 'pino'
const logger = pino()


const BASE_URL = 'https://kanver-backend-93774604105.us-central1.run.app'

export const BloodRequestService = {
  async getRequests() {
    try {
      const response = await axios.get(`${BASE_URL}/request?`, {
        headers: {
          Authorization: 'iJFXvfpDakVUQ6iYWp0OMJfJv5z2',
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      logger.error('Error fetching requests:', error)
      throw error
    }
  },

  async deleteRequest(requestId: string) {
    try {
      const response = await axios.delete(`${BASE_URL}/admin_request/${requestId}`, {
        params: { request_id: requestId },
        headers: {
          Authorization: getAuth().currentUser?.uid,
        },
      })
      return response.data
    } catch (error) {
      logger.error('Error deleting request:', error)
      throw error
    }
  },

}
