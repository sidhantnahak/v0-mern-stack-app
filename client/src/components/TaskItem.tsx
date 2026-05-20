import React from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../redux/slices/taskSlice';
import { deleteTask } from '../redux/thunks/taskThunks';
import { setEditingTaskId } from '../redux/slices/uiSlice';
import { Button } from './Button';
import { Card } from './Card';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch() as any;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id));
    }
  };

  const handleEdit = () => {
    dispatch(setEditingTaskId(task._id));
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">{task.title}</h3>
        <div className="flex gap-2 ml-4">
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-2">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
          {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <span className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Card>
  );
};
