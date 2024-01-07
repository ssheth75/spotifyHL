import React, { useEffect, useState } from 'react';

const GridLines = () => {
  
  return (
    <div className="flex items-center h-screen w-screen">
      <div className="absolute top-0 left-0 h-full w-px bg-gray-300"></div>
      <div className="absolute top-0 left-1/3 h-full w-px bg-gray-300"></div>
      <div className="absolute top-0 left-2/3 h-full w-px bg-gray-300"></div>

      {/* Horizontal Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gray-300"></div>
      <div className="absolute top-1/3 left-0 w-full h-px bg-gray-300"></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gray-300"></div>
    </div>
  );
};

export default GridLines;
