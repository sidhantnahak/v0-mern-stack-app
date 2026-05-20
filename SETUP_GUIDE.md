# MERN Todo App - Setup Guide

This guide will help you get the MERN Todo application up and running on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - [Download Community Edition](https://www.mongodb.com/try/download/community)
3. **Git** (optional, for cloning)

## Step-by-Step Setup

### Step 1: Verify Prerequisites

Check that Node.js is installed:
```bash
node --version
npm --version
```

Verify MongoDB is installed:
```bash
mongod --version
```

### Step 2: Start MongoDB

Before running the application, start the MongoDB server:

**On Mac/Linux:**
```bash
mongod
```

**On Windows:**
MongoDB typically starts as a service. If not, navigate to your MongoDB installation and run:
```bash
mongod
```

Keep this terminal open while developing.

### Step 3: Install Dependencies

Navigate to the project root and install all dependencies:

```bash
npm run mern:install
```

This will install dependencies for both the backend server and frontend client.

### Step 4: Start the Application

In the project root, run both the backend and frontend concurrently:

```bash
npm run mern:dev
```

This command will:
- Start the Express backend on `http://localhost:5000`
- Start the Vite frontend dev server on `http://localhost:3000`

You should see both servers starting up. Keep this terminal open.

### Step 5: Open the Application

Once both servers are running, open your browser and go to:
```
http://localhost:3000
```

You should see the MERN Todo App dashboard!

## Running Servers Individually (Optional)

If you prefer to run the servers in separate terminals:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## Troubleshooting

### MongoDB Connection Error
**Error:** `MongooseError: Cannot connect to MongoDB`

**Solution:**
1. Ensure MongoDB is running: `mongod`
2. Check the connection string in `server/.env`
3. Default: `mongodb://localhost:27017/mern-todo`

### Port 3000 Already in Use
**Error:** `Port 3000 already in use`

**Solution:**
1. Kill the process using port 3000:
   - **Mac/Linux:** `lsof -ti:3000 | xargs kill -9`
   - **Windows:** `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
2. Or change the port in `client/vite.config.ts`

### Port 5000 Already in Use
**Error:** `Port 5000 already in use`

**Solution:**
1. Change PORT in `server/.env` to a different port
2. Update the API URL in `client/.env` to match

### CORS Errors
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Ensure the backend is running on `http://localhost:5000`
2. Check that `client/vite.config.ts` has the correct proxy configuration
3. Verify the API base URL in axios calls

### Dependencies Installation Issues
**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
npm install --legacy-peer-deps
```

## Project Structure Quick Reference

```
mern-todo/
├── server/
│   ├── models/           # MongoDB models
│   ├── controllers/      # Business logic
│   ├── routes/          # API endpoints
│   ├── config/          # Configuration
│   ├── server.js        # Entry point
│   └── .env             # Environment variables
│
└── client/
    ├── src/
    │   ├── components/   # React components
    │   ├── redux/        # State management
    │   ├── services/     # API calls
    │   ├── App.tsx       # Main app
    │   └── main.tsx      # Entry point
    └── vite.config.ts    # Vite config
```

## Key Features to Try

1. **Create a Task:** Click the "+ New Task" button
2. **Edit a Task:** Click "Edit" on any task
3. **Delete a Task:** Click "Delete" on any task
4. **Filter Tasks:** Use the status and priority filters
5. **Sort Tasks:** Change the sort order
6. **Dark Mode:** Toggle the moon/sun icon in the header

## Environment Variables

### Backend (`server/.env`)
```
MONGODB_URI=mongodb://localhost:27017/mern-todo
PORT=5000
NODE_ENV=development
```

### Frontend (`client/.env`)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Building for Production

To build the frontend for production:

```bash
npm run mern:build
```

The optimized build will be in `client/dist/`

## Next Steps

- Read the full [README.md](./README.md) for more details
- Explore the API endpoints in the backend
- Customize the styling and components
- Add new features as needed

## Getting Help

If you encounter any issues:

1. Check the Troubleshooting section above
2. Review the console logs in both terminals
3. Check MongoDB is running
4. Ensure all dependencies are installed correctly

Happy coding! 🎉
