import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { userClass } from "@/class/userClass"
export const useUserStore = defineStore('user', () => {
  //用户信息
  const _userInfo = ref<userClass | null>()
  //设置用户信息
  const _setUserInfo = (item: userClass | null) => {
    _userInfo.value = item
  }
  return {
    _userInfo,
    _setUserInfo
  }
}, { persist: true })