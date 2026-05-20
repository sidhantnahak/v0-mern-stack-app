import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchTasks, createTask, updateTask, deleteTask } from '../redux/thunks/taskThunks';
import { Task } from '../redux/slices/taskSlice';

export const useTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.tasks);
  const { filterStatus, filterPriority, sortBy } = useSelector(
    (state: RootState) => state.ui
  );

  const handleFetchTasks = () => {
    dispatch(fetchTasks());
  };

  const handleCreateTask = (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    return dispatch(createTask(taskData));
  };

  const handleUpdateTask = (id: string, data: Partial<Task>) => {
    return dispatch(updateTask({ id, data }));
  };

  const handleDeleteTask = (id: string) => {
    return dispatch(deleteTask(id));
  };

  // Filter and sort tasks
  const filteredTasks = items
    .filter((task) => {
      if (filterStatus !== 'all' && task.status !== filterStatus) return false;
      if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === 'status') {
        const statusOrder = { 'in-progress': 0, todo: 1, completed: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });

  return {
    tasks: filteredTasks,
    allTasks: items,
    loading,
    error,
    fetchTasks: handleFetchTasks,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
  };
};
