<template>
    <v-container class="pt-8 px-4">
      <v-card color="primary" dark class="mb-6">
        <v-card-title class="text-h5 font-weight-bold">Edit Task</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleUpdate">
            <v-text-field
              v-model="form.title"
              label="Task Title"
              outlined
              dense
              color="white"
              required
            ></v-text-field>
  
            <v-textarea
              v-model="form.description"
              label="Task Description"
              outlined
              dense
              color="white"
              rows="3"
            ></v-textarea>
  
            <v-text-field
              v-model="form.deadline"
              label="Deadline"
              outlined
              dense
              color="white"
              required
            ></v-text-field>
  
            <v-btn color="primary" type="submit" block large class="mt-5 font-weight-bold">
              Update Task
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { useTaskStore } from '@/stores/taskStore';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        form: {
          title: '',
          description: '',
          deadline: '',
        },
      };
    },
    setup() {
      const taskStore = useTaskStore();
      const route = useRoute();
      const router = useRouter();
  
      // Load the task details to prefill the form
      const taskId = parseInt(route.params.id);
      const task = taskStore.tasks.find((task) => task.id === taskId);
  
      if (task) {
        return {
          form: { ...task },
        };
      }
  
      return {};
    },
    methods: {
      handleUpdate() {
        const taskStore = useTaskStore();
        taskStore.updateTask(this.form); // Pass the updated form data to updateTask
        this.$router.push('/'); // Navigate back to the task list
      },
    },
  };
  </script>
  