import { z } from 'zod';

// Define the schema for a single User
export const userSchema = z.object({
  Birth_Date: z.string().transform((date) => new Date(date)),
  Blood_Type: z.string(),
  City: z.string().nullable(), // Allow null
  District: z.string().nullable(), // Allow null
  Email: z.string().email(),
  Is_Eligible: z.number().refine((val) => val === 1 || val === 0, {
    message: 'Is_Eligible must be 1 or 0',
  }).transform((val) => val === 1),
  Last_Donation_Date: z.string().nullable().transform((date) => (date ? new Date(date) : null)),
  Name: z.string(),
  Surname: z.string(),
  TC_ID: z.number(),
  User_id: z.string(),
});

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
  birthDate: Date; // Birthdate as Date object
  lastDonationDate: Date | null; // Nullable last donation date
  tcId: number; // Add this line for the TC_ID field
}