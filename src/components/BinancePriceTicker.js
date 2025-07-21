import React, { useState, useEffect, useRef } from 'react';

const BinancePriceTicker = ({ symbol, price, change24h, volume }) => {
  const [flash, setFlash] = useState(false);
  const prevPriceRef = useRef();

  useEffect(() => {
    if (prevPriceRef.current && prevPriceRef.current !== price) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 500); // Flash por 500ms
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = price;
  }, [price]);

  const isPositive = change24h >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const flashClass = flash ? (isPositive ? 'bg-green-900' : 'bg-red-900') : '';

  return (
    <div className={`flex justify-between items-center p-3 border-b border-gray-700 last:border-b-0 transition-colors ${flashClass}`}>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-white">{symbol}</h3>
      </div>
      <div className="flex-1 text-right">
        <p className="text-sm font-medium text-yellow-400">${parseFloat(price).toFixed(2)}</p>
      </div>
      <div className="flex-1 text-right">
        <p className={`text-sm ${changeColor}`}>{change24h.toFixed(2)}%</p>
      </div>
      <div className="flex-1 text-right hidden md:block">
        <p className="text-sm text-gray-400">${parseFloat(volume).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BinancePriceTicker;