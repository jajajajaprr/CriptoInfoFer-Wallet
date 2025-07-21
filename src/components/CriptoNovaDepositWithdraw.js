import React, { useState } from 'react';

const CriptoNovaDepositWithdraw = ({ userBalance, onDeposit, onWithdraw }) => {
  const [amount, setAmount] = useState('');
  const [actionType, setActionType] = useState('deposit');
  const [selectedNetwork, setSelectedNetwork] = useState('TRC20');
  const [withdrawalAddress, setWithdrawalAddress] = useState('');

  const networks = [
    { name: 'TRC20', depositAddress: 'TT92MzURF3gr91JHw3wReT8ohGyAPonwgT', time: '1 min' },
    { name: 'BEP20 (BNB Smart Chain)', depositAddress: '0xd26c5cb5232af08c531f45f44078c34197550dce', time: '8 min' },
    { name: 'ERC20', depositAddress: '0xd26c5cb5232af08c531f45f44078c34197550dce', time: '12 min' },
    { name: 'BTC', depositAddress: '1E4kSU3zVzYuNY7ndKnEtT6dcpQ6KbSDDP', time: '5 min' },
  ];

  const currentNetworkInfo = networks.find(net => net.name === selectedNetwork);

  const handleAction = () => {
    const amountValue = parseFloat(amount);

    if (!amountValue || amountValue <= 0) {
      alert('Por favor, ingresa una cantidad válida.');
      return;
    }

    if (actionType === 'deposit') {
      onDeposit(amountValue); // Llama a la función onDeposit que abrirá la pasarela
    } else {
      if (amountValue > userBalance) {
        alert('Saldo insuficiente para retirar.');
        return;
      }
      if (!withdrawalAddress) {
        alert('Por favor, ingresa una dirección de retiro.');
        return;
      }
      onWithdraw(amountValue);
      alert(`Simulando retiro de $${amountValue.toFixed(2)} USD a la dirección ${withdrawalAddress} en la red ${selectedNetwork}. Tiempo estimado: ${currentNetworkInfo.time}`);
    }

    setAmount('');
    setWithdrawalAddress('');
  };

  return (
    <div className="p-6">
      <div className="bg-gray-800 rounded-2xl shadow-md p-6 w-full max-w-md mx-auto border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-6">Depósito / Retiro</h2>

        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 rounded-l-lg font-semibold transition-colors focus:outline-none ${
              actionType === 'deposit' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
            onClick={() => setActionType('deposit')}
          >
            Depositar
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg font-semibold transition-colors focus:outline-none ${
              actionType === 'withdraw' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
            onClick={() => setActionType('withdraw')}
          >
            Retirar
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="network">
            Red
          </label>
          <select
            id="network"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition"
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
          >
            {networks.map(network => (
              <option key={network.name} value={network.name}>{network.name}</option>
            ))}
          </select>
        </div>

        {actionType === 'deposit' && (
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Dirección de Depósito ({selectedNetwork})
            </label>
            <div className="bg-gray-700 border border-gray-600 rounded-lg p-3 break-all text-sm text-white">
              {currentNetworkInfo.depositAddress}
            </div>
            <p className="text-gray-500 text-xs mt-1">Tiempo estimado: {currentNetworkInfo.time}</p>
            <p className="text-gray-500 text-xs mt-1">Solo envía USDT a esta dirección. Otros activos se perderán.</p>
          </div>
        )}

        {actionType === 'withdraw' && (
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="withdrawalAddress">
              Dirección de Retiro
            </label>
            <input
              type="text"
              id="withdrawalAddress"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition"
              placeholder="Ingresa la dirección de retiro"
              value={withdrawalAddress}
              onChange={(e) => setWithdrawalAddress(e.target.value)}
            />
            <p className="text-gray-500 text-xs mt-1">Tiempo estimado: {currentNetworkInfo.time}</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="amount">
            Cantidad (USD)
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

        <div className="mb-6 text-center">
          <p className="text-gray-400 text-sm">Saldo Actual:</p>
          <p className="text-xl font-bold text-white">${userBalance.toFixed(2)} USD</p>
        </div>

        <button
          className={`w-full py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 ${
            actionType === 'deposit' ? 'bg-green-500 hover:bg-green-600 focus:ring-green-400' : 'bg-red-500 hover:bg-red-600 focus:ring-red-400'
          } text-white`}
          onClick={handleAction}
        >
          {actionType === 'deposit' ? 'Confirmar Depósito' : 'Confirmar Retiro'}
        </button>
      </div>
    </div>
  );
};

export default CriptoNovaDepositWithdraw;