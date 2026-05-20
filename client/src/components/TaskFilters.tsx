import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setFilterStatus, setFilterPriority, setSortBy } from '../redux/slices/uiSlice';
import { Select } from './Select';

export const TaskFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { filterStatus, filterPriority, sortBy } = useSelector(
    (state: RootState) => state.ui
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Select
        label="Filter by Status"
        value={filterStatus}
        onChange={(e) => dispatch(setFilterStatus(e.target.value as any))}
        options={[
          { value: 'all', label: 'All Status' },
          { value: 'todo', label: 'To Do' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
        ]}
      />

      <Select
        label="Filter by Priority"
        value={filterPriority}
        onChange={(e) => dispatch(setFilterPriority(e.target.value as any))}
        options={[
          { value: 'all', label: 'All Priority' },
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
        ]}
      />

      <Select
        label="Sort By"
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value as any))}
        options={[
          { value: 'date', label: 'Date Created' },
          { value: 'priority', label: 'Priority' },
          { value: 'status', label: 'Status' },
        ]}
      />
    </div>
  );
};
