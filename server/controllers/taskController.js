const Task = require('../models/Task');
const mockDB = require('../config/mockDB');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
exports.getTasks = async (req, res) => {
  try {
    let tasks;
    
    if (process.env.USE_MOCK_DB === 'true') {
      tasks = mockDB.getAllTasks().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      tasks = await Task.find().sort({ createdAt: -1 });
    }
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Public
exports.getTask = async (req, res) => {
  try {
    let task;
    
    if (process.env.USE_MOCK_DB === 'true') {
      task = mockDB.getTaskById(req.params.id);
    } else {
      task = await Task.findById(req.params.id);
    }
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create task
// @route   POST /api/tasks
// @access  Public
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    let task;
    
    if (process.env.USE_MOCK_DB === 'true') {
      task = mockDB.createTask({
        title,
        description: description || '',
        status: status || 'todo',
        priority: priority || 'medium'
      });
    } else {
      task = await Task.create({
        title,
        description,
        status,
        priority
      });
    }

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Public
exports.updateTask = async (req, res) => {
  try {
    let task;
    
    if (process.env.USE_MOCK_DB === 'true') {
      task = mockDB.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({
          success: false,
          error: 'Task not found'
        });
      }
      task = mockDB.updateTask(req.params.id, req.body);
    } else {
      task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({
          success: false,
          error: 'Task not found'
        });
      }
      task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Public
exports.deleteTask = async (req, res) => {
  try {
    let task;
    
    if (process.env.USE_MOCK_DB === 'true') {
      task = mockDB.deleteTask(req.params.id);
    } else {
      task = await Task.findByIdAndDelete(req.params.id);
    }

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
