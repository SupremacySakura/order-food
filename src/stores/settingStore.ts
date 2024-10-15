import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useSettingStore = defineStore('counter', () => {
  //声明数据
  const primary_color = ref('pink')
  //活跃导航id
  const change_Primary_color = (color:string)=>{
    primary_color.value = color
  }

  // 声明操作数据的方法 action (普通函数)

  // 异步函数

  //声明基于数据派生的计算属性 getters (computed)


  return {
    primary_color,
    change_Primary_color
  }
})