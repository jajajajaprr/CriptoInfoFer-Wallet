import React from 'react';

const BinanceHeader = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-gray-900 bg-opacity-80 backdrop-blur-sm shadow-lg p-4 flex justify-between items-center text-white">
      <h1 className="text-2xl font-bold text-yellow-400">BinanceClone</h1>
      <div className="flex items-center space-x-4">
        {/* SVG para icono de búsqueda */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 cursor-pointer hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {/* SVG para icono de usuario */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 cursor-pointer hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </header>
  );
};

export default BinanceHeader;