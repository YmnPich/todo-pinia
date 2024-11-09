// stores/taskStore.js
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => {
    let savedTasks = [];
    let nextId = 1;

    if (process.client) {
      const storedTasks = localStorage.getItem('tasks');
      savedTasks = storedTasks ? JSON.parse(storedTasks) : [];
      nextId = savedTasks.length > 0 ? Math.max(...savedTasks.map(task => task.id)) + 1 : 1;
    }

    return {
      tasks: savedTasks,
      nextId: nextId,
    };
  },
  actions: {
    addTask(task) {
      const newTask = {
        ...task,
        id: this.nextId,
        isCompleted: false,
      };

      this.tasks.push(newTask);
      this.nextId++;

      if (process.client) {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    },

    removeTask(taskId) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);

        if (process.client) {
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
      }
    },

    // New updateTask method
    updateTask(updatedTask) {
      const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask }; // Update the task

        if (process.client) {
          localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Save the updated tasks to localStorage
        }
      }
    },
  },
});
