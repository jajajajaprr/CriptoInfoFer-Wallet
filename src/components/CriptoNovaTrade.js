import React, { useState } from 'react';
import CriptoNovaChart from './CriptoNovaChart';

const CriptoNovaTrade = ({ cryptoPrices, userBalance, userPortfolio, onTrade }) => {
  const [tradeType, setTradeType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [selectedPair, setSelectedPair] = useState('BTCUSDT');

  const selectedCrypto = cryptoPrices.find(crypto => crypto.symbol === selectedPair);
  const currentPrice = selectedCrypto ? parseFloat(selectedCrypto.price) : 0;
  const totalCost = currentPrice * parseFloat(amount || 0);

  const handleTrade = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Por favor, ingresa una cantidad válida.');
      return;
    }

    if (tradeType === 'buy') {
      if (totalCost > userBalance) {
        alert('Saldo insuficiente.');
        return;
      }
      onTrade(tradeType, selectedPair, parseFloat(amount), currentPrice);
    } else { // sell
      const assetInPortfolio = userPortfolio.find(asset => asset.symbol === selectedPair.replace('USDT', ''));
      if (!assetInPortfolio || assetInPortfolio.quantity < parseFloat(amount)) {
        alert('Cantidad insuficiente en tu portafolio.');
        return;
      }
      onTrade(tradeType, selectedPair, parseFloat(amount), currentPrice);
    }

    setAmount('');
  };

  const pairs = cryptoPrices.map(crypto => crypto.symbol);

  return (
    <div className="p-6">
      <div className="bg-gray-800 rounded-2xl shadow-md p-6 w-full max-w-md mx-auto border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-6">Trade</h2>

        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 rounded-l-lg font-semibold transition-colors focus:outline-none ${
              tradeType === 'buy' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
            onClick={() => setTradeType('buy')}
          >
            Comprar
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg font-semibold transition-colors focus:outline-none ${
              tradeType === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
            onClick={() => setTradeType('sell')}
          >
            Vender
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="pair">
            Par
          </label>
          <select
            id="pair"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition"
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
          >
            {pairs.map(pair => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
        </div>

        {selectedPair && (
          <div className="mb-6">
            <CriptoNovaChart symbol={selectedPair} interval="1h" limit={24} />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="amount">
            Cantidad ({selectedPair.replace('USDT', '')})
          </label>
          <input
            type="number"
            id="amount"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="price">
            Precio Actual (USD)
          </label>
          <input
            type="text"
            id="price"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-white transition cursor-not-allowed"
            value={currentPrice.toFixed(2)}
            readOnly
          />
        </div>

        <div className="mb-6 text-center">
          <p className="text-gray-400 text-sm">Total Estimado:</p>
          <p className="text-xl font-bold text-white">${totalCost.toFixed(2)} USD</p>
        </div>

        <button
          className={`w-full py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 ${
            tradeType === 'buy' ? 'bg-green-500 hover:bg-green-600 focus:ring-green-400' : 'bg-red-500 hover:bg-red-600 focus:ring-red-400'
          } text-white`}
          onClick={handleTrade}
        >
          {tradeType === 'buy' ? 'Comprar' : 'Vender'} {selectedPair.replace('USDT', '')}
        </button>
      </div>
    </div>
  );
};

export default CriptoNovaTrade;