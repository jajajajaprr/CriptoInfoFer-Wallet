import React from 'react';
import CriptoNovaPortfolio from './CriptoNovaPortfolio';

const CriptoNovaDashboard = ({ user, cryptoPrices }) => {
  if (!user || !cryptoPrices || cryptoPrices.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        Cargando datos del dashboard...
      </div>
    );
  }

  const updatedPortfolio = user.portfolio.map(asset => {
    const currentPrice = cryptoPrices.find(crypto => crypto.symbol === `${asset.symbol}USDT`);
    const valueUSD = currentPrice ? asset.quantity * parseFloat(currentPrice.price) : 0;
    return { ...asset, valueUSD };
  });

  const totalPortfolioValue = updatedPortfolio.reduce((sum, asset) => sum + asset.valueUSD, 0);
  const totalBalance = user.balance + totalPortfolioValue;

  const chartData = updatedPortfolio.map(asset => ({
    name: asset.symbol,
    value: asset.valueUSD,
  }));

  if (user.balance > totalBalance * 0.05) {
     chartData.push({ name: 'USD', value: user.balance });
  }

  const colors = ['#4ADE80', '#FACC15', '#60A5FA', '#F87171', '#A78BFA', '#34D399', '#FACC15', '#60A5FA'];

  return (
    <div className="p-6">
      <div className="bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-700 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-green-400 mb-6">Dashboard</h2>

        <div className="mb-6 text-center">
          <p className="text-gray-400 text-sm">Saldo Total Estimado</p>
          <p className="text-4xl font-bold text-white">${totalBalance.toFixed(2)}</p>
        </div>

        {chartData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Distribución del Portafolio</h3>
            <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gray-700"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
                Gráfico
              </div>
            </div>
             <p className="text-center text-gray-500 text-sm mt-2">Gráfico de distribución simulado.</p>
          </div>
        )}

        <CriptoNovaPortfolio portfolioAssets={updatedPortfolio} totalValue={totalPortfolioValue} />

      </div>
    </div>
  );
};

export default CriptoNovaDashboard;