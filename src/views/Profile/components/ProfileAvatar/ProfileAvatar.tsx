interface ProfileAvatarProps {
  name: string;
  avatarUrl?: string;
  editable?: boolean;
  onImageClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  name, 
  avatarUrl, 
  editable = false, 
  onImageClick,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-xl',
    lg: 'w-24 h-24 text-3xl'
  };

  return (
    <div 
      className={`${sizeClasses[size]} bg-gray-300 rounded-full flex items-center justify-center overflow-hidden ${editable ? 'cursor-pointer' : ''}`}
      onClick={editable ? onImageClick : undefined}
    >
      {avatarUrl ? (
        <img 
          src={avatarUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-500">{name.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};

export default ProfileAvatar;