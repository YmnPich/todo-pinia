import {ref,computed} from 'vue'
import { defineStore } from 'pinia'

export const taskStore = defineStore('task', {
    state: () => ({ count: 0, name: 'Eduardo' }),
    getters: {
      doubleCount: (state) => state.count * 2,
    },
    actions: {
      increment() {
        this.count++
      },
    },
  })