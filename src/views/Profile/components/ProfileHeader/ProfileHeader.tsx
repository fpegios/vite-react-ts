import { UserProfile } from "../../../../services/profile";
import ProfileAvatar from "../ProfileAvatar";

interface ProfileHeaderProps {
  profile: UserProfile;
  onImageClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onImageClick }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <ProfileAvatar 
        name={profile.name}
        avatarUrl={profile.avatarUrl}
        editable={true}
        onImageClick={onImageClick}
        size="lg"
      />
      <div>
        <h2 className="text-2xl font-semibold">{profile.name}</h2>
        <p className="text-gray-600">{profile.email}</p>
        {profile.username && <p className="text-gray-500">@{profile.username}</p>}
      </div>
    </div>
  );
};

export default ProfileHeader;