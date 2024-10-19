import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useSettingStore = defineStore('setting', () => {
  //声明数据
  const _userInfo = ref()

  // 声明操作数据的方法 action (普通函数)
  const _setUserInfo = (item:any)=>{
    _userInfo.value = item
  }
  // 异步函数

  //声明基于数据派生的计算属性 getters (computed)


  return {
   _userInfo,
   _setUserInfo
  }
}, { persist: true })