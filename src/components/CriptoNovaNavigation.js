import React from 'react';

const CriptoNovaNavigation = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'market', label: 'Mercado' },
    { id: 'favorites', label: 'Favoritos' },
    { id: 'portfolio', label: 'Portafolio' },
    { id: 'trade', label: 'Trade' },
    { id: 'history', label: 'Historial' },
    { id: 'depositWithdraw', label: 'Depósito/Retiro' },
    { id: 'info', label: 'Info' }, // Nuevo apartado de Info
    { id: 'profile', label: 'Perfil' },
  ];

  return (
    <nav className="w-full bg-gray-800 border-b border-gray-700 flex justify-center space-x-6 p-3 overflow-x-auto whitespace-nowrap">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`text-sm font-medium focus:outline-none transition-colors px-3 py-1 ${
            currentPage === item.id ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-green-400'
          }`}
          onClick={() => onNavigate(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default CriptoNovaNavigation;