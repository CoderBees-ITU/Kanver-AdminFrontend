import { useEffect, useState } from 'react';
import { BloodRequestService } from '@/services/request_service';

export function Overview() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await BloodRequestService.getRequests({});
        setDonations(data); // Populate with fetched data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) { /* empty */ }
    }

    fetchRequests();
  }, []);

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
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
