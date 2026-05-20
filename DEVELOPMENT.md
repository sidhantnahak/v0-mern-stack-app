# Development Guide - MERN Todo App

Guide for developers working on the MERN Todo application.

## Development Workflow

### 1. Starting Development

```bash
# Install all dependencies
npm run mern:install

# Start MongoDB (in a separate terminal)
mongod

# Start both servers concurrently
npm run mern:dev
```

### 2. Project Organization

```
Backend (Express):
- Models define data structure
- Controllers contain business logic
- Routes map HTTP methods to controllers
- Services handle external API calls

Frontend (React):
- Components are reusable UI building blocks
- Redux manages global application state
- Services handle API communication
- Contexts provide shared state (theme, preferences)
- Hooks encapsulate component logic
```

## Adding a New Feature

### Example: Adding a Due Date Field

#### 1. Backend Changes

**Update Model** (`server/models/Task.js`)
```javascript
dueDate: {
  type: Date,
  default: null
}
```

**Update Controller** - No changes needed (schema handles new field)

**Update Routes** - No changes needed (already flexible)

#### 2. Frontend Changes

**Update Types** (`client/src/redux/slices/taskSlice.ts`)
```typescript
interface Task {
  // ... existing fields
  dueDate?: string;
}
```

**Update Form Component** (`client/src/components/TaskForm.tsx`)
```typescript
// Add date input
<Input
  type="date"
  label="Due Date"
  value={formData.dueDate}
  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
/>
```

**Update API Service** - Already flexible (sends any field)

## Code Structure Guidelines

### Component Organization

```typescript
// 1. Imports
import React from 'react';
import { useDispatch } from 'react-redux';

// 2. Interface/Types
interface ComponentProps {
  // ...
}

// 3. Component Definition
export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 4. Hooks (useState, useDispatch, etc.)
  const dispatch = useDispatch();
  const [state, setState] = useState('');

  // 5. Effects
  useEffect(() => {
    // ...
  }, []);

  // 6. Handlers
  const handleClick = () => {
    // ...
  };

  // 7. Render
  return (
    // JSX
  );
};
```

### Redux Slice Pattern

```typescript
// 1. Define types
interface State {
  data: any[];
  loading: boolean;
}

// 2. Initial state
const initialState: State = {
  data: [],
  loading: false,
};

// 3. Create slice
const slice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    // Synchronous actions
  },
  extraReducers: (builder) => {
    // Handle async thunks
  },
});

// 4. Export actions and reducer
export const { action1, action2 } = slice.actions;
export default slice.reducer;
```

## Common Tasks

### Debugging Redux State

In browser console:
```javascript
// Install Redux DevTools browser extension
// Then in browser DevTools: Redux tab
// View full state tree and action history
```

### Testing API Changes

Use Postman or curl:
```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test task","priority":"high"}'

# Update task
curl -X PUT http://localhost:5000/api/tasks/[ID] \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'

# Delete task
curl -X DELETE http://localhost:5000/api/tasks/[ID]
```

### Styling Best Practices

Use Tailwind utility classes:

```typescript
// Good: Composable utilities
<div className="flex items-center gap-4 p-6">

// Avoid: Inline styles
<div style={{ display: 'flex', gap: '1rem' }}>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Dark mode
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
```

## Performance Tips

1. **Use Redux Selectors Properly**
   ```typescript
   // Memoize to prevent unnecessary re-renders
   const tasks = useSelector(state => state.tasks.items);
   ```

2. **Lazy Load Components**
   ```typescript
   const TaskModal = lazy(() => import('./TaskModal'));
   ```

3. **Optimize Re-renders**
   ```typescript
   // Use callbacks to prevent new function creation
   const handleClick = useCallback(() => {
     dispatch(action());
   }, [dispatch]);
   ```

4. **Bundle Analysis**
   ```bash
   cd client
   npm run build
   # Check dist/ folder size
   ```

## Environment Configuration

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/mern-todo
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Production
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
PORT=3000
NODE_ENV=production
VITE_API_BASE_URL=https://api.example.com
```

## Testing Checklist

Before committing:
- [ ] Syntax errors fixed
- [ ] No console errors
- [ ] No console warnings
- [ ] Feature works as expected
- [ ] Responsive design tested
- [ ] Dark mode works
- [ ] Database operations verified
- [ ] Error states handled

## Build & Deploy

### Development Build
```bash
npm run mern:dev
```

### Production Build
```bash
npm run mern:build
# Builds frontend in client/dist/
```

### Start Production Server
```bash
cd server
npm start
# Serve from node with NODE_ENV=production
```

## Useful Scripts

```bash
# Root level
npm run mern:install     # Install all deps
npm run mern:dev        # Start both servers
npm run mern:build      # Build frontend

# Backend only
cd server && npm run dev # Start backend

# Frontend only
cd client && npm run dev # Start frontend
cd client && npm run build # Build for prod
```

## Troubleshooting

### Redux not updating
- Check Redux DevTools
- Verify action is dispatched
- Ensure reducer handles action type

### API call failing
- Check backend is running
- Verify MongoDB is connected
- Check network tab in DevTools
- Review error in console

### Styling not applying
- Check class names in Tailwind config
- Ensure CSS file is imported
- Clear browser cache (Cmd+Shift+R)
- Check dark mode class on html

### Component not rendering
- Check console for errors
- Verify imports are correct
- Check props being passed
- Use React DevTools to inspect

## Resources

- [React Docs](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [MongoDB](https://docs.mongodb.com)
- [Vite](https://vitejs.dev)

## Contributing Guidelines

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes following code structure guidelines
3. Test thoroughly
4. Commit with descriptive messages
5. Push and create pull request

## Code Review Checklist

- [ ] Code follows project structure
- [ ] TypeScript types are properly defined
- [ ] Components are reusable
- [ ] No hardcoded values
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Responsive design tested
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Performance optimized

Happy coding! 🚀
