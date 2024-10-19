<script setup lang="ts">
import {onMounted, ref} from 'vue'
import moneyIcon from '../../public/money.png'
import {useRouter} from 'vue-router'
import { useUserStore } from '@/stores/userStore'
const { _userInfo, _setUserInfo } = useUserStore()
import { useSettingStore } from '@/stores/settingStore'
import colorIcon from '../../public/color.png'
const {primary_color,change_Primary_color} = useSettingStore()
const router = useRouter()
//导入默认头像
import user_headPortrait from '../../public/user_headPortrait.png'
import setting from '../../public/setting.png'
//登出
const logout = ()=>{
  console.log('退出登录')
  _setUserInfo(null)
}
const userName = ref('')
const color = ref(primary_color)
const changeColor = ()=>{
  console.log('修改颜色')
  change_Primary_color(color.value)
}
onMounted(()=>{
  console.log(_userInfo)
  if(_userInfo){
    userName.value = _userInfo.username
  }
})
</script>

<template>
  <div class="userBox">
    <div class="user" :style="{backgroundColor:color}">
      <div class="user_left">
        <img :src="_userInfo?.headPortrait||user_headPortrait" alt="">
        <span v-if="!_userInfo" @click="router.push('/login')">去登录</span>
        <span v-else>{{ userName }}</span>
      </div>
      <div class="user_right">
        <img :src="setting" alt="">
      </div>
    </div>

    <div class="money" v-if="_userInfo">
      <div class="icon">
        <img :src="moneyIcon" alt="">
        <span>余额</span>
      </div>
      <div>
        ￥{{ _userInfo?.money }}
      </div>
    </div>
    <div class="color">
      <div class="icon">
        <img :src="colorIcon" alt="">
        <span>主题色:{{ color }}</span>
    </div>
    <el-color-picker v-model="color"  @change="changeColor" />
  </div>
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
  .color,.money{
    width: 100%;
    height: 80px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.5);
    .icon{
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        width: 30px;
        margin: 10px;
      }
    }
  }
}
</style>