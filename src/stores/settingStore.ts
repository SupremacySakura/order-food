import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useSettingStore = defineStore('setting', () => {
  const primary_color = ref('pink')
  //活跃导航id
  const change_Primary_color = (color: string) => {
    primary_color.value = color
  }

  return {
    primary_color,
    change_Primary_color
  }
}, { persist: true })