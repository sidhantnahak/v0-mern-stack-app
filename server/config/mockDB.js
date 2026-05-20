// In-memory mock database for when MongoDB is not available
class MockDB {
  constructor() {
    this.tasks = [
      {
        _id: '1',
        title: 'Learn MERN Stack',
        description: 'Build a full-stack application with MongoDB, Express, React, and Node.js',
        status: 'in-progress',
        priority: 'high',
        createdAt: new Date('2024-05-15'),
        updatedAt: new Date('2024-05-18'),
      },
      {
        _id: '2',
        title: 'Setup Redux State Management',
        description: 'Implement Redux Toolkit for global state management',
        status: 'completed',
        priority: 'high',
        createdAt: new Date('2024-05-10'),
        updatedAt: new Date('2024-05-16'),
      },
      {
        _id: '3',
        title: 'Create UI Components',
        description: 'Build reusable React components with Tailwind CSS',
        status: 'completed',
        priority: 'medium',
        createdAt: new Date('2024-05-12'),
        updatedAt: new Date('2024-05-17'),
      },
    ];
    this.nextId = 4;
  }

  getAllTasks() {
    return JSON.parse(JSON.stringify(this.tasks));
  }

  getTaskById(id) {
    return JSON.parse(JSON.stringify(this.tasks.find(t => t._id === String(id))));
  }

  createTask(taskData) {
    const newTask = {
      _id: String(this.nextId++),
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(newTask);
    return JSON.parse(JSON.stringify(newTask));
  }

  updateTask(id, taskData) {
    const index = this.tasks.findIndex(t => t._id === String(id));
    if (index === -1) return null;
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...taskData,
      updatedAt: new Date(),
    };
    return JSON.parse(JSON.stringify(this.tasks[index]));
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t._id === String(id));
    if (index === -1) return null;
    
    const deleted = this.tasks.splice(index, 1)[0];
    return JSON.parse(JSON.stringify(deleted));
  }
}

// Create singleton instance
const mockDB = new MockDB();

module.exports = mockDB;
