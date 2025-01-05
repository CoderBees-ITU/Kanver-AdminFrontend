import { useEffect, useState } from 'react';
import { BloodRequestService } from '@/services/request_service';
import pino from 'pino';

const logger = pino();

export function TotalDonations() {
  const [totalDonations, setTotalDonations] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  async function fetchRequests() {
    setLoading(true);
    try {
      const data = await BloodRequestService.getRequests(); // Fetch the requests data
      setTotalDonations(data.length); // Calculate the total number of requests
    } catch (error) {
      logger.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="text-2xl font-bold">{totalDonations}</div>
      )}
    </div>
  );
}
