<script setup lang="ts">
//导入vue相关api
import { onMounted, ref } from 'vue'
//导入请求相关api
import { loginByPassword } from '@/services/apis/user'
//导入vant组件库
import { showToast } from 'vant'
//导入仓库
import { useUserStore } from '@/stores/userStore'
const { _userInfo, _setUserInfo } = useUserStore()
//导入vue-router相关api
import { useRouter } from 'vue-router'
const router = useRouter()
//导入图片
import user_headPortrait from '../../public/user_headPortrait.png'
//账户
const account = ref<number>()
//密码
const password = ref<string>('')
/**
 * 登录
 */
const login = async () => {
  if (account.value) {
    const res = await loginByPassword({ account: account.value, password: password.value })
    showToast(res.data.message);
    if (+res.data.code === 200) {
      //将buffer图片转换为blob
      if (res.data.data.headPortrait.length > 0) {
        const blob = new Blob([res.data.data.headPortrait], { type: 'image/jpg' });
        res.data.data.headPortrait = URL.createObjectURL(blob)
      } else {
        res.data.data.headPortrait = user_headPortrait
      }
    }
    _setUserInfo(res.data.data)
    router.push('/user')
  }
}

onMounted(() => {
  //路由守卫,如果已登录跳转回用户页面
  if (_userInfo) {
    router.push('/user')
  }
})
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
.loginBox {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f7f7f7;

  form {
    width: 300px;
    height: 400px;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    h4 {
      font-size: 24px;
      font-weight: normal;
      margin-bottom: 10px;
    }

    .login {
      width: 90%;
      height: 50px;
      border-radius: 10px;
      border: none;
    }
  }
}
</style>