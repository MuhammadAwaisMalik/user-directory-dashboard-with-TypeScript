import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50">
      <div className="w-full h-full flex items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-y-2 border-solid border-gray-900 z-50" />
      </div>
    </div>
  );
};

export default Loader;
