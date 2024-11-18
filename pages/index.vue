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
                  <div class="mt-2">
                    <strong>Deadline:</strong> {{ task.deadline }}
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <nuxt-link :to="`${task.id}/edit/`">
                  <v-icon color="green">mdi-pencil</v-icon>
                </nuxt-link>
                <v-icon color="red" @click="confirmDelete(task.id)">
                  mdi-delete
                </v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
          <v-alert v-else type="info" class="mt-4">No tasks available.</v-alert>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>

  <!-- Confirmation Dialog -->
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete this task?</v-card-title>
      <v-card-actions>
        <v-btn color="green darken-1" text @click="deleteTask">Yes</v-btn>
        <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useTaskStore } from "@/stores/TaskStore";

export default {
  data() {
    return {
      taskStore: useTaskStore(),
      dialog: false,
      taskToDelete: null, // Store the task to be deleted
    };
  },
  computed: {
    tasks() {
      return this.taskStore.tasks;
    },
  },
  methods: {
    confirmDelete(taskId) {
      this.taskToDelete = taskId; // Store the taskId for deletion
      this.dialog = true; // Open the confirmation dialog
    },
    deleteTask() {
      if (this.taskToDelete !== null) {
        this.taskStore.removeTask(this.taskToDelete); // Delete the task from the store
        this.dialog = false; // Close the dialog
      }
    },
  },
  created() {
    this.taskStore.fetchTasks(); // Fetch tasks when the component is created
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
