import React from "react";

interface ErrorProps {
  title?: string;
  description?: string;
}

const ErrorView: React.FC<ErrorProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h2 className="mb-2 text-2xl font-bold text-red-600 ">{title}</h2>
      <p className="text-gray-700 ">{description}</p>
    </div>
  );
};

export default ErrorView;
