import React, { useState } from 'react';
import CriptoNovaPriceTicker from './CriptoNovaPriceTicker';
import CriptoNovaChart from './CriptoNovaChart';

const CriptoNovaFavoritesList = ({ prices, favorites, onToggleFavorite }) => {
  const [expandedSymbol, setExpandedSymbol] = useState(null);

  const handleSelectCrypto = (symbol) => {
    setExpandedSymbol(expandedSymbol === symbol ? null : symbol);
  };

  if (prices.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        Aún no tienes criptomonedas favoritas.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-gray-800 rounded-2xl shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-3 bg-gray-700 text-gray-400 text-xs font-semibold uppercase">
          <div className="flex-1">Par</div>
          <div className="flex-1 text-right">Precio</div>
          <div className="flex-1 text-right">Cambio 24h</div>
          <div className="flex-1 text-right hidden md:block">Volumen 24h</div>
          <div className="w-8 text-center">Fav</div>
        </div>
        <div className="divide-y divide-gray-700">
          {prices.map(crypto => (
            <React.Fragment key={crypto.symbol}>
              <CriptoNovaPriceTicker
                symbol={crypto.symbol}
                price={crypto.price}
                change24h={crypto.change24h}
                volume={crypto.volume}
                onClick={() => handleSelectCrypto(crypto.symbol)}
                isFavorite={favorites.includes(crypto.symbol)}
                onToggleFavorite={() => onToggleFavorite(crypto.symbol)}
              />
              {expandedSymbol === crypto.symbol && (
                <div className="p-4 bg-gray-700">
                  <CriptoNovaChart symbol={crypto.symbol} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CriptoNovaFavoritesList;