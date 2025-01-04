import { ColumnDef } from '@tanstack/react-table';
// import pino from 'pino'
import { User } from '../data/schema';


// const logger = pino()

export const getColumns = (bannedUsers: string[], refreshBannedUsers: () => void): ColumnDef<User>[] => [
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
    cell: (info) => new Date(info.getValue()).toLocaleDateString(), // Format date as MM/DD/YYYY
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
    id: 'banned',
    header: 'Banned?',
    cell: ({ row }) => {
      const user = row.original; // Access the row's data
      return bannedUsers.includes(user.tcId.toString()) ? 'Yes' : 'No'; // Convert to string if needed
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;

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

        const ban_date = new Date().toISOString().split('T')[0];

        try {
          const response = await fetch('https://kanver-backend-93774604105.us-central1.run.app/ban_user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tc_id: user.id.toString(),
              cause,
              unban_date,
              ban_date,
            }),
          });

          if (response.ok) {
            alert('User banned successfully');
            await refreshBannedUsers();
          } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
          }
        } catch (error) {
          console.error('Error banning user:', error);
          alert('Failed to ban user. Please try again.');
        }
      };

      const handleUnban = async () => {
        try {
          const response = await fetch(
            `https://kanver-backend-93774604105.us-central1.run.app/unban_user/${user.tcId}`,
            { method: 'DELETE' }
          );

          if (response.ok) {
            alert('User unbanned successfully');
            refreshBannedUsers()
          } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
          }
        } catch (error) {
          console.error('Error unbanning user:', error);
          alert('Failed to unban user. Please try again.');
        }
      };

      if (bannedUsers.includes(user.tcId.toString())) {
        return (
          <button
            onClick={handleUnban}
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
          >
            Unban
          </button>
        );
      }

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
]
