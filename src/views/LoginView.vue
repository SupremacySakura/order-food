<script setup lang="ts">
import {ref} from 'vue'
import { loginByPassword } from '@/services/apis/user'
import { showToast } from 'vant';
const account = ref<number>()
const password = ref<string>('')

const login = async()=>{
  if(account.value){
    const res =await loginByPassword({ account: account.value,password:password.value })
    showToast(res.data.message);
    console.log(res)
  }
}
</script>

<template>
  <div class="loginBox">
    <form>
      <h4>欢迎登录点餐网站</h4>
      <div>
        <van-field v-model="account" type="digit" label="账号" required />
        <van-field v-model="password" type="password" label="密码" required />
      </div>
      <button class="login" @click.prevent="login">登录</button>
    </form>
  </div>
</template>

<style lang="less" scoped>
.loginBox{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f7f7f7;
  form{
    width: 300px;
    height: 400px;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    h4{
      font-size: 24px;
      font-weight: normal;
      margin-bottom: 10px;
    }
    .login{
      width: 90%;
      height: 50px;
      border-radius: 10px;
      border: none;
    }
  }
}
</style>