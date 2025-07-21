import React from 'react';

const CryptoHeader = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-gray-900 bg-opacity-80 backdrop-blur-sm shadow-lg p-4 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold text-teal-400">CryptoPulse</h1>
      <div className="flex items-center space-x-4">
        {/* SVG para icono de búsqueda */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 cursor-pointer hover:text-teal-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {/* SVG para icono de notificaciones */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 cursor-pointer hover:text-teal-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
        </svg>
      </div>
    </header>
  );
};

export default CryptoHeader;