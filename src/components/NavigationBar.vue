<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const currentRoute = useRoute()
//导入导航栏资源
import home from '../../public/NavigationBar/home.png'
import home_selected from '../../public/NavigationBar/home_selected.png'
import order from '../../public/NavigationBar/order.png'
import order_selected from '../../public/NavigationBar/order_selected.png'
import user from '../../public/NavigationBar/user.png'
import user_selected from '../../public/NavigationBar/user_selected.png'
//导航栏配置数组
const navList = [
  {
    id: 1,
    icon: home,
    selectedIcon: home_selected,
    text: '首页',
    url: '/home',
  },
  {
    id: 2,
    icon: order,
    selectedIcon: order_selected,
    text: '订单',
    url: '/order',
  },
  {
    id: 3,
    icon: user,
    selectedIcon: user_selected,
    text: '我的',
    url: '/user',
  },
]
//活跃导航id
const active_id = ref(1)
/**
 * 导航栏跳转函数
 * @param url 跳转地址
 * @param id 导航栏id
 */
const gotoPage = (url: string, id: number) => {
  if (currentRoute?.path === url) {
    return console.log('重复跳转,跳转失败')
  }
  active_id.value = id
  localStorage.setItem('active_id',JSON.stringify(active_id.value))
  router.push(url)
  console.log('跳转成功', url)
}
//初始化
onMounted(()=>{
  if(localStorage.getItem('active_id')){
    active_id.value = +JSON.parse(localStorage.getItem('active_id') as string)
  }
})
</script>

<template>
  <div class="navigationBarBox">
    <div class="navigationItem" v-for="item in navList" :key="item.id">
      <img :src="active_id === item.id ? item.selectedIcon : item.icon" alt="">
      <span @click="gotoPage(item.url, item.id)">{{ item.text }}</span>
    </diV>
  </div>
</template>

<style lang="less" scoped>
.navigationBarBox {
  width: 100%;
  height: 6%;
  background-color: white;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;

  .navigationItem {
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    img {
      width: 40%;
    }

    span {
      font-size: 12px;
    }
  }
}
</style>