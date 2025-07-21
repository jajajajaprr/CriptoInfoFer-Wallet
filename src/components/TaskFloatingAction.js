import React from 'react';

const TaskFloatingAction = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-6 right-6 z-10 p-4 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black transform hover:scale-110"
      onClick={onClick}
      aria-label="Add new task"
    >
      {/* SVG para icono de más */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </button>
  );
};

export default TaskFloatingAction;