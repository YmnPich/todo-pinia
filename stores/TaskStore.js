// stores/taskStore.js
import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => {
    let savedTasks = [];
    let nextId = 1;

    if (process.client) {
      const storedTasks = localStorage.getItem("tasks");
      savedTasks = storedTasks ? JSON.parse(storedTasks) : [];
      nextId =
        savedTasks.length > 0
          ? Math.max(...savedTasks.map((task) => task.id)) + 1
          : 1;
    }

    return {
      tasks: savedTasks,
      currentTask: {},
      nextId: nextId,
    };
  },
  getters: {
    getTasks() {
      return this.tasks;
    },
    getCurrentTask() {
      return { ...this.currentTask };
    },
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
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
    },
    removeTask(taskId) {
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);

        if (process.client) {
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
        }
      }
    },
    // New updateTask method
    updateTask(updatedTask) {
      const taskIndex = this.tasks.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (taskIndex !== -1) {
        // Update the task in the store
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
    
        // Update localStorage to persist changes
        if (process.client) {
          localStorage.setItem("tasks", JSON.stringify(this.tasks)); 
        }
      }
    },
    fetchTasks() {
      this.tasks = this.readTaskFromLocalStorage();
    },
    fetchTaskById(taskId) {
      const task = this.tasks.find((task) => task.id === Number(taskId)); // Ensure the ID is a number
      if (task) {
        this.currentTask = task; // Assign task to currentTask for editing
      } else {
        console.error("Task not found with id", taskId);
        this.currentTask = {}; // Assign empty object if task is not found
      }
    },    
    readTaskFromLocalStorage() {
      if (process.client) {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
      }
      return [];
    },
  },
});
