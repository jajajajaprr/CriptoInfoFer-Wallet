import React, { useState } from 'react';

const CriptoNovaTransactionHistory = ({ transactions }) => {
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const getTransactionColor = (type) => {
    switch (type) {
      case 'buy':
        return 'text-green-400';
      case 'sell':
        return 'text-red-400';
      case 'deposit':
        return 'text-blue-400';
      case 'withdraw':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        Aún no tienes transacciones.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-gray-800 rounded-2xl shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold text-green-400 p-6 border-b border-gray-700">Historial de Operaciones</h2>

        <div className="p-6 flex space-x-4 text-gray-400 text-sm overflow-x-auto whitespace-nowrap">
          <button
            className={`focus:outline-none px-3 py-1 rounded-lg ${filter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setFilter('all')}
          >
            Todas
          </button>
          <button
            className={`focus:outline-none px-3 py-1 rounded-lg ${filter === 'buy' ? 'bg-green-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setFilter('buy')}
          >
            Compras
          </button>
          <button
            className={`focus:outline-none px-3 py-1 rounded-lg ${filter === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setFilter('sell')}
          >
            Ventas
          </button>
          <button
            className={`focus:outline-none px-3 py-1 rounded-lg ${filter === 'deposit' ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setFilter('deposit')}
          >
            Depósitos
          </button>
          <button
            className={`focus:outline-none px-3 py-1 rounded-lg ${filter === 'withdraw' ? 'bg-yellow-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setFilter('withdraw')}
          >
            Retiros
          </button>
        </div>

        <div className="divide-y divide-gray-700">
          {filteredTransactions.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              No hay transacciones de este tipo.
            </div>
          ) : (
            filteredTransactions.map((tx, index) => (
              <div key={index} className="flex justify-between items-center p-4">
                <div>
                  <p className={`text-lg font-semibold ${getTransactionColor(tx.type)}`}>
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </p>
                  <p className="text-gray-400 text-sm">{new Date(tx.timestamp).toLocaleString()}</p>
                </div>
                <div className="text-right">
                   {tx.symbol && <p className="text-white font-medium">{tx.quantity.toFixed(4)} {tx.symbol}</p>}
                   {tx.amountUSD && <p className="text-white font-medium">${tx.amountUSD.toFixed(2)} USD</p>}
                   {tx.price && <p className="text-gray-400 text-sm">@{tx.price.toFixed(2)}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CriptoNovaTransactionHistory;