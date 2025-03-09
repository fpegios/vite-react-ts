import { UserProfile } from "../../../../services/profile";

interface ProfileDetailsProps {
  profile: UserProfile;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
  return (
    <div className="border-t border-gray-200 pt-4 space-y-3">
      {profile.phone && (
        <div className="flex">
          <span className="font-medium w-24">Phone:</span>
          <span>{profile.phone}</span>
        </div>
      )}
      {profile.location && (
        <div className="flex">
          <span className="font-medium w-24">Location:</span>
          <span>{profile.location}</span>
        </div>
      )}
      <div className="flex">
        <span className="font-medium w-24">Member since:</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ProfileDetails;