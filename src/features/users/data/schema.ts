import { z } from 'zod';

// Define the schema for a single User
export const userSchema = z.object({
  Birth_Date: z.string().transform((date) => new Date(date)), // Transform to Date object
  Blood_Type: z.string(), // Blood type as string (e.g., "A+")
  City: z.string(), // City name
  District: z.string(), // District name
  Email: z.string().email(), // Validate email format
  Is_Eligible: z.number().refine((val) => val === 1 || val === 0, {
    message: 'Is_Eligible must be 1 or 0',
  }).transform((val) => val === 1), // Transform to boolean
  Last_Donation_Date: z.string().nullable().transform((date) => (date ? new Date(date) : null)), // Nullable Date
  Name: z.string(), // First name
  Surname: z.string(), // Last name
  TC_ID: z.number(), // Numeric ID
  User_id: z.string(), // User ID as string
});

// Define the schema for a list of Users
export const userListSchema = z.array(userSchema);

// TypeScript interface for a single User
export interface User {
  id: string; // User ID
  name: string; // First name
  surname: string; // Last name
  email: string; // Email address
  city: string; // City
  district: string; // District
  bloodType: string; // Blood type
  isEligible: boolean; // Eligibility status
  birthDate: Date; // Birth date as Date object
  lastDonationDate: Date | null; // Nullable last donation date
}