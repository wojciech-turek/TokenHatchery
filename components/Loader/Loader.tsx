import React from "react";

const Loader = () => {
  return (
    <>
      <div className="w-10 h-10 border-4 border-b-0 rounded-full animate-spin border-indigo-400"></div>
      <div className="text-gray-700 font-bold">Loading...</div>
    </>
  );
};

export default Loader;
