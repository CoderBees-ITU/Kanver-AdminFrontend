export const fetchBannedUsers = async (): Promise<string[]> => {
  const apiUrl = 'https://kanver-backend-93774604105.us-central1.run.app/banned_users';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch banned users');
    }

    const bannedUsers = await response.json();
    // Map TC_IDs from the response to a list
    return bannedUsers.map((user: { TC_ID: string }) => user.TC_ID.toString());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return [];
  }
};

export const banUser = async (tc_id: number, cause: string, unban_date: string, ban_date: string): Promise<void> => {
  const apiUrl = 'https://kanver-backend-93774604105.us-central1.run.app/ban_user';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tc_id,
        cause,
        unban_date,
        ban_date,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to ban user');
    }

    alert('User banned successfully');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    alert(`Error: ${error.message}`);
  }
};