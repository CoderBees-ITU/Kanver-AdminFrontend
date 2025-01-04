import { useEffect, useState } from 'react';
import { BloodRequestService } from '@/services/request_service';

import pino from 'pino'
const logger = pino()

export function Overview() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await BloodRequestService.getRequests();
        setDonations(data);
      } catch (error) {
        logger.error('Error fetching blood requests:', error);
      }
    }
    fetchRequests();
  }, []);

  const handleDelete = async (requestId: string) => {
    if (!window.confirm('Are you sure you want to delete this request?')) {
      return; // Exit if the user cancels the action
    }

    try {
      await BloodRequestService.deleteRequest(requestId);
      setDonations((prev) =>
        prev.filter((donation) => donation.Request_ID !== requestId)
      );
      alert('Request deleted successfully.');
    } catch (error) {
      logger.error('Error deleting request:', error);
      alert('Failed to delete the request.');
    }
  };

  const handleEdit = async (requestId: string) => {
    const updatedData = { /* Collect and add updated fields here */ };
    try {
      await BloodRequestService.updateRequest(requestId, updatedData);
      alert('Request updated successfully.');
      // Optionally refetch data or update the specific record in state
    } catch (error) {
      logger.error('Error updating request:', error);
      alert('Failed to update the request.');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Request Date</th>
          <th className="border border-gray-300 px-4 py-2">Location</th>
          <th className="border border-gray-300 px-4 py-2">Patient</th>
          <th className="border border-gray-300 px-4 py-2">Blood Type</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">On The Way</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
        </thead>
        <tbody>
        {donations.map((donation: any) => (
          <tr key={donation.Request_ID} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">
              {donation.Create_Time}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {`${donation.City}, ${donation.District}`}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {`${donation.patient_name} ${donation.patient_surname}`}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {donation.Blood_Type}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {donation.Status}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {donation.On_The_Way_Count}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                onClick={() => handleEdit(donation.Request_ID)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(donation.Request_ID)}
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
