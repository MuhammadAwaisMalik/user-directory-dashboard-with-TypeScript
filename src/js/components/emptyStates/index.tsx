import React from "react";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <div className="text-center text-gray-500 mt-10 text-lg font-medium">
    {message}
  </div>
);

export default EmptyState;
