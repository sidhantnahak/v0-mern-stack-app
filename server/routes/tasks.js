const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// Get all tasks
router.get('/', getTasks);

// Get single task
router.get('/:id', getTask);

// Create task
router.post('/', createTask);

// Update task
router.put('/:id', updateTask);

// Delete task
router.delete('/:id', deleteTask);

module.exports = router;
