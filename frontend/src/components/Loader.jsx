import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-[#0c4a34]"></div>
    </div>
  );
};

export default Loader;
