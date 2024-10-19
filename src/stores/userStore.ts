import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { userClass } from "@/class/userClass"
export const useUserStore = defineStore('user', () => {
  //声明数据
  const _userInfo = ref<userClass|null>()

  // 声明操作数据的方法 action (普通函数)
  const _setUserInfo = (item:userClass|null)=>{
    _userInfo.value = item
  }
  // 异步函数

  //声明基于数据派生的计算属性 getters (computed)


  return {
   _userInfo,
   _setUserInfo
  }
}, { persist: true })