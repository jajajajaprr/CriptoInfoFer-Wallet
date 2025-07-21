import React from 'react';

const CryptoPriceCard = ({ symbol, price, change24h }) => {
  const isPositive = change24h >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const arrowSvg = isPositive ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );

  return (
    <div className="bg-gray-800 rounded-2xl shadow-md p-4 border border-gray-700 hover:shadow-lg transition-shadow flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-white">{symbol}</h3>
        <p className="text-gray-400 text-sm">Precio Actual</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-teal-400">${parseFloat(price).toFixed(2)}</p>
        <p className={`text-sm ${changeColor}`}>
          {arrowSvg}
          {change24h.toFixed(2)}% (24h)
        </p>
      </div>
    </div>
  );
};

export default CryptoPriceCard;