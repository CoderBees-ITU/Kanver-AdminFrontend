import axios from 'axios';
import { z } from 'zod';

// Define the user schema for validation
export const userSchema = z.object({
  Birth_Date: z.string().transform((date) => new Date(date)), // Convert to Date object
  Blood_Type: z.string(),
  City: z.string(),
  District: z.string(),
  Email: z.string().email(), // Validate email format
  Is_Eligible: z.number().refine((val) => val === 1 || val === 0, {
    message: 'Is_Eligible must be 1 or 0',
  }).transform((val) => val === 1), // Transform to boolean
  Last_Donation_Date: z.string().nullable().transform((date) => (date ? new Date(date) : null)), // Nullable Date
  Name: z.string(),
  Surname: z.string(),
  TC_ID: z.number(), // Validate as number
  User_id: z.string(),
});

// Schema for a list of users
export const userListSchema = z.array(userSchema);

// Define the TypeScript interface for a User
export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  city: string;
  district: string;
  bloodType: string;
  isEligible: boolean;
  birthDate: Date;
  lastDonationDate: Date | null;
}

// Define the TypeScript interface for the API response
interface UserResponse {
  Birth_Date: string;
  Blood_Type: string;
  City: string;
  District: string;
  Email: string;
  Is_Eligible: number;
  Last_Donation_Date: string | null;
  Name: string;
  Surname: string;
  TC_ID: number;
  User_id: string;
}

// Fetch users from the API
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<UserResponse[]>('https://kanver-backend-93774604105.us-central1.run.app/users');

    // Validate the API response with zod
    const validatedUsers = userListSchema.parse(response.data);

    // Transform the validated data into the desired format
    // @ts-ignore
    return validatedUsers.map((user) => ({
      id: user.User_id,
      name: user.Name,
      surname: user.Surname,
      email: user.Email,
      city: user.City,
      district: user.District,
      bloodType: user.Blood_Type,
      isEligible: user.Is_Eligible, // Convert 1 to true and 0 to false
      birthDate: new Date(user.Birth_Date),
      lastDonationDate: user.Last_Donation_Date ? new Date(user.Last_Donation_Date) : null,
    }));
  } catch (error) {
    throw new Error('Failed to fetch user data. Please try again later.');
  }
};