import { z } from 'zod'
import axios from 'axios'
// import pino from 'pino'
import { User, userSchema } from '@/features/users/data/schema.ts'

// Schema for a list of users
export const userListSchema = z.array(userSchema)

// Define the TypeScript interface for the API response
interface UserResponse {
  Birth_Date: string
  Blood_Type: string
  City: string
  District: string
  Email: string
  Is_Eligible: number
  Last_Donation_Date: string | null
  Name: string
  Surname: string
  TC_ID: number
  User_id: string
}

// const logger = pino()

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<UserResponse[]>(
      'https://kanver-backend-93774604105.us-central1.run.app/users'
    )
    const validatedUsers = userListSchema.parse(response.data)
    return validatedUsers.map((user) => ({
      id: user.User_id,
      name: user.Name,
      surname: user.Surname,
      email: user.Email,
      city: user.City || 'Unknown', // Default to 'Unknown' if null
      district: user.District || 'Unknown', // Default to 'Unknown' if null
      bloodType: user.Blood_Type,
      isEligible: user.Is_Eligible,
      birthDate: new Date(user.Birth_Date),
      lastDonationDate: user.Last_Donation_Date
        ? new Date(user.Last_Donation_Date)
        : null,
      tcId: user.TC_ID,
    }))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      /* logger.error({
        msg: 'Axios error',
        error: error.response?.data || error.message,
      })*/
      throw new Error(
        `Failed to fetch user data: ${error.response?.data?.message || error.message}`
      )
    }
    if (error instanceof z.ZodError) {
      //logger.error({ msg: 'Validation error', errors: error.errors })
      throw new Error(
        `Validation error: ${JSON.stringify(error.errors, null, 2)}`
      )
    }
    // logger.error({ msg: 'Unknown error', error })
    throw new Error('An unknown error occurred. Please try again later.')
  }
}
