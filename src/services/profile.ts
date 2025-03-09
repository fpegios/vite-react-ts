export interface UserProfile {
  id: number;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ProfileResponse {
  data: UserProfile;
}

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
};

export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/1`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return response.json();
};

export const uploadProfileImage = async (formData: FormData): Promise<{url: string}> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload profile image');
  return response.json();
};