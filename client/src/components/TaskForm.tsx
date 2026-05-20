import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { RootState } from '../redux/store';
import { createTask, updateTask } from '../redux/thunks/taskThunks';
import { Task } from '../redux/slices/taskSlice';

interface TaskFormProps {
  onSubmit?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const dispatch = useDispatch() as any;
  const { loading } = useSelector((state: RootState) => state.tasks);
  const editingTaskId = useSelector((state: RootState) => state.ui.editingTaskId);
  const allTasks = useSelector((state: RootState) => state.tasks.items);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as const,
    priority: 'medium' as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const editingTask = editingTaskId ? allTasks.find((t) => t._id === editingTaskId) : null;

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        status: editingTask.status,
        priority: editingTask.priority,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
      });
    }
  }, [editingTask]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingTaskId) {
      await dispatch(updateTask({ id: editingTaskId, data: formData }));
    } else {
      await dispatch(createTask(formData));
    }
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        placeholder="Enter task title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={errors.title}
      />

      <Textarea
        label="Description"
        placeholder="Enter task description (optional)"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <Select
        label="Status"
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
        options={[
          { value: 'todo', label: 'To Do' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
        ]}
      />

      <Select
        label="Priority"
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
        options={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
        ]}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Saving...' : editingTaskId ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};
