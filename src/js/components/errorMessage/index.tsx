import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-center text-red-500 mt-10 text-lg font-medium">
      {message}
    </div>
  );
};

export default ErrorMessage;
