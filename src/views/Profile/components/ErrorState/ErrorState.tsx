interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <p className="text-red-500">Error loading profile: {message}</p>
    </div>
  </div>
);

export default ErrorState;