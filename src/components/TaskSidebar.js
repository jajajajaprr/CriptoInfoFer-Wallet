import React, { useState } from 'react';

const TaskSidebar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsOpen(false); // Cerrar sidebar al navegar
  };

  return (
    <>
      {/* Botón para abrir/cerrar sidebar */}
      <button
        className="fixed top-4 left-4 z-20 p-2 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-black transition-transform duration-300 ease-in-out"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {/* SVG para icono de menú */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay oscuro */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-xl z-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Menú</h2>
          <nav>
            <ul>
              <li className="mb-4">
                <button
                  className="w-full text-left text-lg hover:text-gray-300 transition-colors focus:outline-none"
                  onClick={() => handleNavigation('kanban')}
                >
                  Kanban
                </button>
              </li>
              <li className="mb-4">
                <button
                  className="w-full text-left text-lg hover:text-gray-300 transition-colors focus:outline-none"
                  onClick={() => handleNavigation('calendar')}
                >
                  Calendario
                </button>
              </li>
              <li className="mb-4">
                <button
                  className="w-full text-left text-lg hover:text-gray-300 transition-colors focus:outline-none"
                  onClick={() => handleNavigation('settings')}
                >
                  Configuración
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TaskSidebar;