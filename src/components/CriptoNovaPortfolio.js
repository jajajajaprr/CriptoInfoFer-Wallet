import React from 'react';

const CriptoNovaPortfolio = ({ portfolioAssets, totalValue }) => {
  return (
    <div className="p-6">
      <div className="bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-700 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-green-400 mb-6">Mi Portafolio</h2>
        <div className="mb-6">
          <p className="text-gray-400 text-sm">Valor Total Estimado</p>
          <p className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</p>
        </div>
        <div className="space-y-4">
          {portfolioAssets.length === 0 ? (
            <p className="text-center text-gray-400">Aún no tienes activos en tu portafolio.</p>
          ) : (
            portfolioAssets.map(asset => (
              <div key={asset.symbol} className="flex justify-between items-center border-b border-gray-700 pb-3 last:border-b-0">
                <div>
                  <p className="text-lg font-semibold text-white">{asset.symbol}</p>
                  <p className="text-gray-400 text-sm">{asset.quantity} {asset.symbol}</p>
                </div>
                <p className="text-lg font-medium text-green-400">${asset.valueUSD.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CriptoNovaPortfolio;