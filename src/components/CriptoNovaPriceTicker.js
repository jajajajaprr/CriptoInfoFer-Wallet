import React, { useState, useEffect, useRef } from 'react';

const CriptoNovaPriceTicker = ({ symbol, price, change24h, volume, onClick, isFavorite, onToggleFavorite }) => {
  const [flash, setFlash] = useState(false);
  const prevPriceRef = useRef();

  useEffect(() => {
    if (prevPriceRef.current && prevPriceRef.current !== price) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = price;
  }, [price]);

  const isPositive = change24h >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const flashClass = flash ? (isPositive ? 'bg-green-900' : 'bg-red-900') : '';

  return (
    <div
      className={`flex justify-between items-center p-3 border-b border-gray-700 last:border-b-0 transition-colors cursor-pointer hover:bg-gray-700 ${flashClass}`}
    >
      <div className="flex-1" onClick={onClick}>
        <h3 className="text-sm font-semibold text-white">{symbol}</h3>
      </div>
      <div className="flex-1 text-right" onClick={onClick}>
        <p className="text-sm font-medium text-green-400">${parseFloat(price).toFixed(2)}</p>
      </div>
      <div className="flex-1 text-right" onClick={onClick}>
        <p className={`text-sm ${changeColor}`}>{change24h.toFixed(2)}%</p>
      </div>
      <div className="flex-1 text-right hidden md:block" onClick={onClick}>
        <p className="text-sm text-gray-400">${parseFloat(volume).toFixed(2)}</p>
      </div>
      <div className="w-8 text-center">
        <button onClick={onToggleFavorite} className="focus:outline-none">
          {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-4.914-3.578a1 1 0 00-1.176 0l-4.914 3.578c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.95-.69l1.519-4.674z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default CriptoNovaPriceTicker;