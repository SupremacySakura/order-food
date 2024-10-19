<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
//导入默认头像
import user_headPortrait from '../../public/user_headPortrait.png'
import setting from '../../public/setting.png'

const user = ref({})
</script>

<template>
  <div class="userBox">
    <div class="user">
      <div class="user_left">
        <img :src="user_headPortrait" alt="">
        <span v-if="user" @click="router.push('/login')">去登录</span>
      </div>
      <div class="user_right">
        <img :src="setting" alt="">
      </div>
    </div>
    <div></div>
  </div>
</template>

<style lang="less" scoped>
.userBox{
  width: 100%;
  height: 100vh;
  background-color:#f7f7f7;
  .user{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid black;
    .user_left{
      display: flex;
      align-items: center;
      img {
          width: 60px;
          border-radius: 60px;
          margin-right: 10px;
        }
    }
    .user_right{
      display: flex;
      align-items: center;
      img{
        width: 40px;
      }
    }

  }
}
</style>