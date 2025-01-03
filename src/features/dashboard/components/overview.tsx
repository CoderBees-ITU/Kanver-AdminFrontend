import React from "react";

// Example donation data
const donations = [
  {
    id: 1,
    openedDate: "2025-01-01",
    location: "New York",
    requestee: "John Doe",
    bloodType: "A+",
  },
  {
    id: 2,
    openedDate: "2025-01-02",
    location: "Los Angeles",
    requestee: "Jane Smith",
    bloodType: "B-",
  },
  {
    id: 3,
    openedDate: "2025-01-03",
    location: "Chicago",
    requestee: "Alice Brown",
    bloodType: "O+",
  },
];

export function Overview() {
  const handleEdit = (id) => {
    console.log("Edit donation with ID:", id);
    // Add edit logic here
  };

  const handleDelete = (id) => {
    console.log("Delete donation with ID:", id);
    // Add delete logic here
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
        {donations.map((donation) => (
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