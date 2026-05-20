import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  filterStatus: 'all' | 'todo' | 'in-progress' | 'completed';
  filterPriority: 'all' | 'low' | 'medium' | 'high';
  sortBy: 'date' | 'priority' | 'status';
  showModal: boolean;
  editingTaskId: string | null;
  darkMode: boolean;
}

const initialState: UIState = {
  filterStatus: 'all',
  filterPriority: 'all',
  sortBy: 'date',
  showModal: false,
  editingTaskId: null,
  darkMode: localStorage.getItem('darkMode') === 'true' || false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFilterStatus: (state, action: PayloadAction<UIState['filterStatus']>) => {
      state.filterStatus = action.payload;
    },
    setFilterPriority: (state, action: PayloadAction<UIState['filterPriority']>) => {
      state.filterPriority = action.payload;
    },
    setSortBy: (state, action: PayloadAction<UIState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    openModal: (state) => {
      state.showModal = true;
      state.editingTaskId = null;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.editingTaskId = null;
    },
    setEditingTaskId: (state, action: PayloadAction<string | null>) => {
      state.editingTaskId = action.payload;
      state.showModal = action.payload !== null;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', String(state.darkMode));
    },
  },
});

export const {
  setFilterStatus,
  setFilterPriority,
  setSortBy,
  openModal,
  closeModal,
  setEditingTaskId,
  toggleDarkMode,
} = uiSlice.actions;

export default uiSlice.reducer;
