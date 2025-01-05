import { useEffect, useState } from 'react';
import pino from 'pino';
import { fetchUsers } from '@/features/users/data/users.ts'

const logger = pino();

export function UserCount() {
  const [totalUser, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  async function fetchUserRequests() {
    setLoading(true);
    try {
      const data = await fetchUsers(); // Fetch the requests data
      setTotalUsers(data.length); // Calculate the total number of requests
    } catch (error) {
      logger.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserRequests();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="text-2xl font-bold">{totalUser}</div>
      )}
    </div>
  );
}
