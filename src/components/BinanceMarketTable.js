import React from 'react';
import BinancePriceTicker from './BinancePriceTicker';

const BinanceMarketTable = ({ prices }) => {
  return (
    <div className="p-6">
      <div className="bg-gray-800 rounded-2xl shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-3 bg-gray-700 text-gray-400 text-xs font-semibold uppercase">
          <div className="flex-1">Par</div>
          <div className="flex-1 text-right">Precio</div>
          <div className="flex-1 text-right">Cambio 24h</div>
          <div className="flex-1 text-right hidden md:block">Volumen 24h</div>
        </div>
        <div className="divide-y divide-gray-700">
          {prices.map(crypto => (
            <BinancePriceTicker
              key={crypto.symbol}
              symbol={crypto.symbol}
              price={crypto.price}
              change24h={crypto.change24h}
              volume={crypto.volume}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BinanceMarketTable;