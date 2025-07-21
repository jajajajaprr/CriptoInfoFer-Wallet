import React from 'react';

const CriptoNovaProfile = ({ user, onLogout, onResetData }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-700 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-6">Mi Perfil</h2>

        <div className="flex flex-col items-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.98 5.98 0 0110 16a5.976 5.976 0 014.546-2.916A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
          <p className="text-xl font-semibold text-white">{user.email}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-700 pb-3">
            <p className="text-gray-400 text-sm">Saldo USD:</p>
            <p className="text-white font-medium">${user.balance.toFixed(2)}</p>
          </div>
        </div>

        <button
          className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={onLogout}
        >
          Cerrar Sesión
        </button>

        <button
          className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={onResetData}
        >
          Reiniciar Datos
        </button>
      </div>
    </div>
  );
};

export default CriptoNovaProfile;