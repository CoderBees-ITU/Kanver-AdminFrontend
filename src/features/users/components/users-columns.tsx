import { ColumnDef } from '@tanstack/react-table';
import { User } from '../data/schema';
import pino from 'pino';
const logger = pino();

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'First Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'surname',
    header: 'Last Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'bloodType',
    header: 'Blood Type',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'birthDate',
    header: 'Birth Date',
    cell: (info) =>
      new Date(info.getValue()).toLocaleDateString(), // Format date as MM/DD/YYYY
  },
  {
    accessorKey: 'lastDonationDate',
    header: 'Last Donation Date',
    cell: (info) =>
      info.getValue()
        ? new Date(info.getValue()).toLocaleDateString() // Format date if available
        : 'Never Donated', // Fallback if null
  },
  {
    accessorKey: 'isEligible',
    header: 'Eligible?',
    cell: (info) => (info.getValue() ? 'Yes' : 'No'), // Convert boolean to Yes/No
  },
  {
    accessorKey: 'id',
    header: 'User ID',
    cell: (info) => info.getValue(),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original; // Access the user data for this row
      logger.info('User:', user);
      const handleBan = async () => {
        const cause = prompt('Enter ban cause:', 'Violation of terms');
        if (!cause) {
          alert('Ban cause is required');
          return;
        }

        const unban_date = prompt('Enter unban date (YYYY-MM-DD):', '2025-12-31');
        if (!unban_date) {
          alert('Unban date is required');
          return;
        }

        try {
          await banUser(user.tcId, cause, unban_date);
        } catch (error) {
          console.error('Error banning user:', error);
        }
      };

      return (
        <button
          onClick={handleBan}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Ban
        </button>
      );
    },
  },
];

export const banUser = async (tc_id: number, cause: string, unban_date: string): Promise<void> => {
  const apiUrl = 'https://kanver-backend-93774604105.us-central1.run.app/ban_user';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tc_id,
        cause,
        unban_date,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to ban user');
    }

    alert('User banned successfully');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    alert(`Error: ${error.message}`);
  }
};
