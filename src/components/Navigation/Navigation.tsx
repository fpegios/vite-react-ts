import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="flex items-center justify-center space-x-4 p-4 bg-gray-100 shadow-md rounded-lg">
      <Link 
        to="/" 
        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
      >
        Home
      </Link>
      
      <div className="text-gray-400">|</div>
      
      <Link 
        to="/profile" 
        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
      >
        Profile
      </Link>
    </nav>
  );
};

export default Navigation;