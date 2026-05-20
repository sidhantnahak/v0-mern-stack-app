import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { fetchTasks } from './redux/thunks/taskThunks';
import { closeModal } from './redux/slices/uiSlice';
import { ThemeProvider } from './context/ThemeContext';
import { PreferencesProvider } from './context/PreferencesContext';

import { Header } from './components/Header';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import { Modal } from './components/Modal';
import { TaskForm } from './components/TaskForm';
import { Button } from './components/Button';

const AppContent: React.FC = () => {
  const dispatch = useDispatch() as any;
  const showModal = useSelector((state: RootState) => state.ui.showModal);
  const editingTaskId = useSelector((state: RootState) => state.ui.editingTaskId);
  const loading = useSelector((state: RootState) => state.tasks.loading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleModalSubmit = () => {
    dispatch(closeModal());
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <TaskFilters />
        <TaskList />
      </main>

      <Modal
        isOpen={showModal}
        title={editingTaskId ? 'Edit Task' : 'Create New Task'}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        submitText={editingTaskId ? 'Update' : 'Create'}
        isLoading={loading}
      >
        <TaskForm onSubmit={handleModalSubmit} />
      </Modal>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <PreferencesProvider>
        <AppContent />
      </PreferencesProvider>
    </ThemeProvider>
  );
}

export default App;
