# MERN Todo App

A full-stack todo application built with the MERN stack (MongoDB, Express, React, Node.js). Features include task creation, editing, deletion, filtering, sorting, and dark mode support.

## Project Structure

```
mern-todo/
├── server/              # Express.js backend
│   ├── models/         # MongoDB models
│   ├── controllers/    # Request handlers
│   ├── routes/         # API routes
│   ├── config/         # Configuration files
│   ├── middleware/     # Custom middleware
│   ├── server.js       # Entry point
│   └── package.json
│
└── client/             # Vite + React frontend
    ├── src/
    │   ├── components/  # Reusable React components
    │   ├── context/     # React Context API
    │   ├── redux/       # Redux store, slices, thunks
    │   ├── services/    # API service layer
    │   ├── hooks/       # Custom React hooks
    │   ├── App.tsx      # Main app component
    │   └── main.tsx     # Entry point
    ├── vite.config.ts   # Vite configuration
    └── package.json
```

## Prerequisites

- Node.js (v14+)
- MongoDB (local installation)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd mern-todo
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```
MONGODB_URI=mongodb://localhost:27017/mern-todo
PORT=5000
NODE_ENV=development
```

### 3. Setup Frontend

```bash
cd ../client
npm install
```

## Running the Application

### Start MongoDB

Make sure MongoDB is running locally:
```bash
mongod
```

### Start Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

### Start Frontend Development Server

In a new terminal:
```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

- ✅ Create, Read, Update, Delete (CRUD) tasks
- 🎯 Filter tasks by status (Todo, In Progress, Completed)
- 📊 Filter tasks by priority (Low, Medium, High)
- 📈 Sort tasks by date, priority, or status
- 🌙 Dark mode toggle with persistence
- 🎨 Modern UI with Tailwind CSS
- 📦 Redux Toolkit for state management
- 🔄 Async operations with Redux Thunk
- 🎭 Context API for theme management
- 🔌 Axios for API communication
- ✨ Responsive design for mobile and desktop

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Technologies Used

### Backend
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM for MongoDB
- CORS - Cross-Origin Resource Sharing
- dotenv - Environment variables

### Frontend
- React 18 - UI library
- Vite - Build tool
- Redux Toolkit - State management
- React-Redux - Redux bindings for React
- Axios - HTTP client
- Tailwind CSS - Utility-first CSS framework
- TypeScript - Type safety

## Development

### Adding a New Feature

1. **Backend**:
   - Add model in `server/models/`
   - Create controller in `server/controllers/`
   - Add routes in `server/routes/`

2. **Frontend**:
   - Create components in `src/components/`
   - Add Redux slice in `src/redux/slices/`
   - Create async thunk in `src/redux/thunks/`
   - Create API service in `src/services/`

### Building for Production

```bash
# Frontend
cd client
npm run build

# Output will be in client/dist/
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally
- Check the MONGODB_URI in server/.env
- Default: `mongodb://localhost:27017/mern-todo`

### Port Already in Use
- Backend: Change PORT in server/.env
- Frontend: Change port in client/vite.config.ts

### CORS Errors
- Ensure backend is running on http://localhost:5000
- Check the proxy configuration in client/vite.config.ts

## License

MIT
