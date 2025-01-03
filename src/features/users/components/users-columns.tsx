import { ColumnDef } from '@tanstack/react-table';
import { User } from '../data/schema';

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
];