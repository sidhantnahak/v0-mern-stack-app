import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { openModal, toggleDarkMode } from '../redux/slices/uiSlice';
import { Button } from './Button';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const allTasksCount = useSelector((state: RootState) => state.tasks.items.length);
  const completedTasksCount = useSelector(
    (state: RootState) => state.tasks.items.filter((t) => t.status === 'completed').length
  );

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Task Manager
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {completedTasksCount} of {allTasksCount} tasks completed
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={handleToggleDarkMode}
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
            <Button variant="primary" onClick={handleOpenModal}>
              + New Task
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
