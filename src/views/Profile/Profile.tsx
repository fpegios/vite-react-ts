import React, { useRef, useState } from 'react';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import ProfileHeader from './components/ProfileHeader';
import ProfileDetails from './components/ProfileDetails';
import ProfileForm from './components/ProfileForm';
import { useUpdateProfile, useUploadProfileImage, useUserProfile } from '../../hooks/useProfile';


const Profile: React.FC = () => {
  const { data: profile, status, error } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();
  const uploadImageMutation = useUploadProfileImage();
  
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProfileUpdate = (formData: any) => {
    updateProfileMutation.mutate(formData, {
      onSuccess: () => setIsEditing(false)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('avatar', e.target.files[0]);
      uploadImageMutation.mutate(formData);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (status === 'pending') {
    return <LoadingState />;
  }

  if (status === 'error') {
    return <ErrorState message={(error as Error).message} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile Page</h1>
        <button
          onClick={handleEditToggle}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {!isEditing ? (
          // View Mode
          <>
            <ProfileHeader profile={profile!} onImageClick={triggerFileInput} />
            <ProfileDetails profile={profile!} />
          </>
        ) : (
          // Edit Mode
          <ProfileForm 
            initialData={{
              name: profile?.name,
              email: profile?.email,
              username: profile?.username,
              phone: profile?.phone,
              location: profile?.location
            }}
            onSubmit={handleProfileUpdate}
            onCancel={handleEditToggle}
            isSubmitting={updateProfileMutation.isPending}
          />
        )}
      </div>

      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleImageUpload} 
      />
      
      {uploadImageMutation.isPending && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-600 rounded-lg">
          Uploading image...
        </div>
      )}
    </div>
  );
};

export default Profile;