<template>
  <v-container class="pt-8 px-4">
    <v-card color="primary" dark class="mb-6">
      <v-card-title class="text-h5 font-weight-bold">Create New Task</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
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

          <div class="d-flex align-center mt-3">
            <v-text-field
              v-model="formattedDeadline"
              label="Deadline"
              outlined
              dense
              readonly
              color="white"
              class="mr-2"
            ></v-text-field>
            <v-btn
              icon
              color="white"
              class="ml-2"
              @click="datePickerDialog = true"
            >
              <v-icon>mdi-calendar</v-icon>
            </v-btn>
          </div>

          <v-dialog v-model="datePickerDialog" max-width="400" persistent>
            <v-card>
              <v-date-picker
                v-model="form.deadline"
                color="primary"
                @input="saveDeadline"
              ></v-date-picker>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="datePickerDialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn
            color="primary"
            type="submit"
            block
            large
            class="mt-5 font-weight-bold"
          >
            Save Task
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { useTaskStore } from '@/stores/TaskStore';
import { v4 as uuidv4 } from 'uuid';  // Importing UUID v4 generator

export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        deadline: null,
      },
      datePickerDialog: false,
    };
  },
  computed: {
    formattedDeadline() {
      return this.form.deadline
        ? new Date(this.form.deadline).toLocaleDateString()
        : 'Select a deadline';
    },
  },
  methods: {
    handleSubmit() {
      // Create a new task with a unique id
      const newTask = {
        id: uuidv4(),  // Assign a unique id to the new task
        ...this.form,
        isCompleted: false,
      };

      const taskStore = useTaskStore();
      taskStore.addTask(newTask);

      this.$router.push('/'); // Redirect to the homepage or task list after adding the task
    },
    saveDeadline() {
      this.datePickerDialog = false;
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
.v-card-title {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.v-btn {
  font-size: 1.1em;
}
.v-btn--icon {
  background-color: transparent;
}
</style>
