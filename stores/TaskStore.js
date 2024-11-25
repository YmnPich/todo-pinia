import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { useNuxtApp } from '#app';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],         // Array to hold all tasks
    currentTask: {},   // Object to hold the currently selected task
  }),

  getters: {
    getTasks: (state) => state.tasks,                   // Retrieve all tasks
    getCurrentTask: (state) => ({ ...state.currentTask }), // Get the current task
  },

  actions: {
    // Helper function to get the Supabase client
    getSupabaseClient() {
      const { $supabase } = useNuxtApp();
      if (!$supabase) {
        throw new Error('Supabase client is not initialized.');
      }
      return $supabase;
    },

    // Fetch all tasks from Supabase
    async fetchTasks() {
      try {
        const $supabase = this.getSupabaseClient();
        const { data, error } = await $supabase
          .from('tasks')
          .select('*')
          .order('task_deadline', { ascending: true });

        if (error) throw error;

        this.tasks = data || [];
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    },

    // Add a new task to Supabase
    async addTask(task) {
      try {
        const $supabase = this.getSupabaseClient();
        const newTask = {
          ...task,
          id: uuidv4(), // Generate a new UUID for the task ID
          isCompleted: false,
        };

        const { data, error } = await $supabase.from('tasks').insert([newTask]);
        if (error) throw error;

        this.tasks.push(data[0]); // Add the new task to local state
      } catch (error) {
        console.error('Error adding task:', error.message);
      }
    },

    // Remove a task from Supabase
    async removeTask(taskId) {
      try {
        const $supabase = this.getSupabaseClient();
        const { error } = await $supabase.from('tasks').delete().eq('id', taskId);
        if (error) throw error;

        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      } catch (error) {
        console.error('Error removing task:', error.message);
      }
    },

    // Update an existing task in Supabase
    async updateTask(updatedTask) {
      try {
        const $supabase = this.getSupabaseClient();
        const { error } = await $supabase
          .from('tasks')
          .update(updatedTask)
          .eq('id', updatedTask.id);

        if (error) throw error;

        const taskIndex = this.tasks.findIndex((task) => task.id === updatedTask.id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
        }
      } catch (error) {
        console.error('Error updating task:', error.message);
      }
    },

    // Fetch a task by ID from local state
    fetchTaskById(taskId) {
      const task = this.tasks.find((task) => task.id === taskId);
      this.currentTask = task || {};
      if (!task) {
        console.warn(`Task with ID ${taskId} not found.`);
      }
    },
  },
});
