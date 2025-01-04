import { useEffect, useState } from 'react'
import { BloodRequestService } from '@/services/request_service.ts';

export function Overview() {
  const [donations, setDonations] = useState([]);

  // Fetch donation data from the backend
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await BloodRequestService.getRequests({});
        setDonations(response.data); // Assuming `data` is the array of donations
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) { /* empty */ }
    }
    fetchData();
  }, []);

  // Handle edit action
  const handleEdit = (id: number) => {
  };

  // Handle delete action
  const handleDelete = async (id: number) => {
    try {
      await BloodRequestService.deleteRequest(id.toString());
      setDonations((prevDonations) =>
        prevDonations.filter((donation) => donation.id !== id)
      );
    } catch (error) {
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Opened Date</th>
          <th className="border border-gray-300 px-4 py-2">Location</th>
          <th className="border border-gray-300 px-4 py-2">Requestee</th>
          <th className="border border-gray-300 px-4 py-2">Blood Type</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
        </thead>
        <tbody>
        {donations.map((donation: any) => (
          <tr key={donation.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">
              {donation.openedDate}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {donation.location}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {donation.requestee}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {donation.bloodType}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                onClick={() => handleEdit(donation.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(donation.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}