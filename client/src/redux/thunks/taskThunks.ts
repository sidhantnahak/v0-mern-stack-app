import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../slices/taskSlice';
import {
  getTasks as getTasksService,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from '../../services/taskService';

export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTasksService();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk<
  Task,
  Omit<Task, '_id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await createTaskService(taskData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk<
  Task,
  { id: string; data: Partial<Task> },
  { rejectValue: string }
>(
  'tasks/updateTask',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateTaskService(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk<string, string, { rejectValue: string }>(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTaskService(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete task');
    }
  }
);
