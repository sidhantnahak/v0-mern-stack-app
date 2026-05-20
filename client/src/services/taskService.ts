import axios from 'axios';
import { Task } from '../redux/slices/taskSlice';

const API_BASE_URL = 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add error interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get<{ data: Task[] }>('/tasks');
  return response.data.data;
};

export const getTask = async (id: string): Promise<Task> => {
  const response = await apiClient.get<{ data: Task }>(`/tasks/${id}`);
  return response.data.data;
};

export const createTask = async (
  taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Task> => {
  const response = await apiClient.post<{ data: Task }>('/tasks', taskData);
  return response.data.data;
};

export const updateTask = async (
  id: string,
  taskData: Partial<Task>
): Promise<Task> => {
  const response = await apiClient.put<{ data: Task }>(`/tasks/${id}`, taskData);
  return response.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
