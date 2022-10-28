import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      num: 1
    }
  },
  actions: {},
  getters: {}
})
