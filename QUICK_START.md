# Quick Start - MERN Todo App

Get your MERN Todo application running in 5 minutes!

## 1. Prerequisites Check

Make sure you have:
- Node.js installed (`node --version`)
- MongoDB running (`mongod` in a terminal)

## 2. Install Dependencies

```bash
npm run mern:install
```

This installs both backend and frontend packages.

## 3. Start the App

```bash
npm run mern:dev
```

This starts both servers concurrently:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

## 4. Open Your Browser

Navigate to `http://localhost:3000` and start creating tasks!

## Keyboard Shortcuts & Features

- **Create Task:** Click "+ New Task" button
- **Edit Task:** Click "Edit" on any task card
- **Delete Task:** Click "Delete" on any task card
- **Toggle Dark Mode:** Click moon/sun icon in header
- **Filter Tasks:** Use the dropdown filters
- **Sort Tasks:** Choose sort order from dropdown

## Common Issues

**MongoDB won't connect?**
- Ensure `mongod` is running in another terminal
- Check `server/.env` for correct MongoDB URI

**Port 3000 already in use?**
- Kill the process: `lsof -ti:3000 | xargs kill -9`
- Or change port in `client/vite.config.ts`

**Need more help?**
See `SETUP_GUIDE.md` for detailed instructions.

## Project Architecture

```
MERN Stack:
├── Backend: Express.js + MongoDB
│   └── Port 5000, RESTful API
├── State: Redux Toolkit + Redux Thunk
│   └── Global task state & async operations
├── Context: Theme + Preferences
│   └── Dark mode & user preferences
└── UI: React + Tailwind CSS
    └── Modern, responsive components
```

## Next Steps

- Add more features (tags, categories, due dates)
- Deploy to production
- Add user authentication
- Implement notifications
- Add search functionality

Enjoy building! 🚀
