import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchUserProfile, 
  updateUserProfile, 
  uploadProfileImage, 
  UserProfile 
} from '../services/profile';

// Define the specific query key factory to keep it consistent
const PROFILE_QUERY_KEY = {
  all: ['profile'] as const,
  detail: () => [...PROFILE_QUERY_KEY.all, 'detail'] as const,
};

/**
 * Hook to fetch user profile
 */
export const useUserProfile = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY.detail(),
    queryFn: fetchUserProfile,
  });
};

/**
 * Hook to update user profile with optimistic updates
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onMutate: async (newProfileData) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: PROFILE_QUERY_KEY.all });
      
      // Snapshot the previous value
      const previousProfileData = queryClient.getQueryData(PROFILE_QUERY_KEY.detail());
      
      // Optimistically update to the new value
      queryClient.setQueryData(PROFILE_QUERY_KEY.detail(), (oldData: UserProfile | undefined) => {
        if (!oldData) return oldData;
        return { ...oldData, ...newProfileData };
      });
      
      // Return context with the previous data
      return { previousProfileData };
    },
    
    // If the mutation fails, roll back to the previous state
    onError: (error, variables, context) => {
      if (!context) return;
      queryClient.setQueryData(PROFILE_QUERY_KEY.detail(), context.previousProfileData);
    },
    
    // After success or failure, refresh the data
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.all });
      }, 2000);
    },
  });
};

/**
 * Hook to upload profile image
 */
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  const updateProfileMutation = useUpdateProfile();

  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      // Update the profile with the new image URL
      updateProfileMutation.mutate({ avatarUrl: data.url });
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.all });
      }, 2000);
    },
  });
};