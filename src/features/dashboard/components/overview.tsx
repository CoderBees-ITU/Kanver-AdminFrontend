import { useEffect, useState } from 'react';
import { BloodRequestService } from '@/services/request_service';
import pino from 'pino';

const logger = pino();

export function Overview() {
  interface Donation {
    Request_ID: string;
    Create_Time: string;
    City: string;
    District: string;
    patient_name: string;
    patient_surname: string;
    Blood_Type: string;
    Status: string;
    On_The_Way_Count: number;
  }

  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false); // Loading state for delete

  async function fetchRequests() {
    try {
      const data = await BloodRequestService.getRequests();
      setDonations(data);
    } catch (error) {
      logger.error('Error fetching blood requests:', error);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (requestId: string) => {
    if (!window.confirm('Are you sure you want to delete this request?')) {
      return; // Exit if the user cancels the action
    }

    setLoading(true); // Set loading to true
    try {
      await BloodRequestService.deleteRequest(requestId);
    } catch (error) {
      logger.error('Error deleting request:', error);
      alert('Failed to delete the request.');
    } finally {
      fetchRequests().finally(() => setLoading(false)); // Fetch requests and set loading to false
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
        {loading ?
          <tbody>
            <tr>
              <td colSpan={7} className="border border-gray-300 px-4 py-2 text-center">Loading...</td>
            </tr>
          </tbody> :

          <tbody>
            {donations.map((donation: any) => (
              <tr key={donation?.Request_ID} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{donation?.Create_Time}</td>
                <td className="border border-gray-300 px-4 py-2">{`${donation?.City}, ${donation?.District}`}</td>
                <td className="border border-gray-300 px-4 py-2">{`${donation?.patient_name} ${donation?.patient_surname}`}</td>
                <td className="border border-gray-300 px-4 py-2">{donation?.Blood_Type}</td>
                <td className="border border-gray-300 px-4 py-2">{donation?.Status}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{donation?.On_The_Way_Count}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className={`bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    onClick={() => !loading && handleDelete(donation?.Request_ID)} // Prevent multiple clicks
                    disabled={loading} // Disable button during loading
                  >
                    {'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>}
      </table>
    </div>
  );
}
