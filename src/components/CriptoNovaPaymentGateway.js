import React, { useState } from 'react';

const CriptoNovaPaymentGateway = ({ onDepositSuccess, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleConfirmPayment = () => {
    const depositAmount = parseFloat(amount);

    if (!depositAmount || depositAmount <= 0) {
      alert('Por favor, ingresa una cantidad válida para depositar.');
      return;
    }
    if (!cardNumber || !expiryDate || !cvv) {
      alert('Por favor, completa todos los datos de la tarjeta.');
      return;
    }
    // Validaciones básicas de formato (simuladas)
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert('Número de tarjeta inválido (debe ser 16 dígitos).');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      alert('Fecha de vencimiento inválida (MM/AA).');
      return;
    }
    if (cvv.length !== 3 || isNaN(cvv)) {
      alert('CVV inválido (debe ser 3 dígitos).');
      return;
    }

    // Simular procesamiento de pago
    alert(`Simulando pago de $${depositAmount.toFixed(2)} USD con tarjeta. ¡Pago exitoso!`);
    onDepositSuccess(depositAmount);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-6">Pasarela de Pago</h2>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="depositAmount">
            Monto a Depositar (USD)
          </label>
          <input
            type="number"
            id="depositAmount"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition"
            placeholder="Ej: 100.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="cardNumber">
            Número de Tarjeta
          </label>
          <input
            type="text"
            id="cardNumber"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition"
            placeholder="XXXX XXXX XXXX XXXX"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>

        <div className="flex mb-6 space-x-4">
          <div className="flex-1">
            <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="expiryDate">
              Fecha de Vencimiento (MM/AA)
            </label>
            <input
              type="text"
              id="expiryDate"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition"
              placeholder="MM/AA"
              maxLength="5"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition"
              placeholder="XXX"
              maxLength="3"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>

        <button
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
          onClick={handleConfirmPayment}
        >
          Confirmar Pago
        </button>
        <button
          className="w-full text-gray-400 py-2 rounded-lg font-semibold hover:underline focus:outline-none"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CriptoNovaPaymentGateway;