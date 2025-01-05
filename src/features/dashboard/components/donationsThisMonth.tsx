import { useEffect, useState } from 'react';
import { BloodRequestService } from '@/services/request_service'; // Replace with your actual service path
import pino from 'pino';

const logger = pino();

export function DonationsThisMonth() {
  const [donationsThisMonth, setDonationsThisMonth] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  async function fetchDonations() {
    setLoading(true);
    try {
      const data = await BloodRequestService.getRequests(); // Fetch all requests
      const currentMonth = new Date().getMonth() + 1; // Get current month (0-based index)
      const currentYear = new Date().getFullYear();

      const donations = data.filter((request: any) => {
        const requestDate = new Date(request.Create_Time);
        const requestMonth = requestDate.getMonth() + 1; // Convert to 1-based month
        const requestYear = requestDate.getFullYear();
        return (
          requestMonth === currentMonth &&
          requestYear === currentYear &&
          request.Status !== 'pending' // Exclude pending donations
        );
      });

      setDonationsThisMonth(donations.length); // Count donations for this month
    } catch (error) {
      logger.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="text-2xl font-bold">{donationsThisMonth}</div>
      )}
    </div>
  );
}
