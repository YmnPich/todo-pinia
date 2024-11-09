<template>
    <v-container class="pt-8 px-4">
      <v-card color="primary" dark class="mb-6">
        <div class="d-flex align-center mt-3">
            <v-card-title class="text-h5 font-weight-bold">Tasks</v-card-title>
            <v-col cols="auto">
                <nuxt-link :to="`/create`">
                    <v-btn icon="mdi-plus" size="small"></v-btn>
                  </nuxt-link>
        
      </v-col>
          </div>
        <v-card-text>
          <v-list>
            <v-list-item-group v-if="tasks.length">
              <v-list-item v-for="task in tasks" :key="task.id">
                <v-list-item-content>
                  <v-list-item-title>{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <div>{{ task.description }}</div>
                    <div class="mt-2"><strong>Deadline:</strong> {{ task.deadline }}</div>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <nuxt-link :to="`${task.id}/edit/`">
                    <v-icon color="green">mdi-pencil</v-icon>
                  </nuxt-link>
                  <v-icon color="red" @click="removeTask(task.id)">mdi-delete</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
            <v-alert v-else type="info" class="mt-4">No tasks available.</v-alert>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { useTaskStore } from '@/stores/taskStore';  
  
  export default {
    computed: {
      tasks() {
        const taskStore = useTaskStore();
        return taskStore.tasks;  
      },
    },
    methods: {
      removeTask(taskId) {
        const taskStore = useTaskStore();
        taskStore.removeTask(taskId); 
      },
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    max-width: 600px;
    margin: auto;
    padding: 24px;
    border-radius: 12px;
  }
  .v-btn {
    font-size: 1.1em;
  }
  </style>
  