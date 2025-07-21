import React from 'react';
import CryptoPriceCard from './CryptoPriceCard';

const CryptoMarketOverview = ({ prices }) => {
  return (
    <div className="p-4 grid grid-cols-1 gap-4">
      {prices.map(crypto => (
        <CryptoPriceCard
          key={crypto.symbol}
          symbol={crypto.symbol}
          price={crypto.price}
          change24h={crypto.change24h}
        />
      ))}
    </div>
  );
};

export default CryptoMarketOverview;