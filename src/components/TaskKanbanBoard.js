import React from 'react';
import TaskItemCard from './TaskItemCard';

const TaskKanbanBoard = ({ tasks, onEditTask, onDeleteTask }) => {
  const columns = [
    { id: 'todo', title: 'Por Hacer' },
    { id: 'inprogress', title: 'En Progreso' },
    { id: 'done', title: 'Hecho' },
  ];

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 p-6">
      {columns.map(column => (
        <div key={column.id} className="flex-1 bg-gray-100 rounded-2xl p-4 shadow-inner">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{column.title}</h2>
          <div className="space-y-4">
            {tasks
              .filter(task => task.status === column.id)
              .map(task => (
                <TaskItemCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskKanbanBoard;