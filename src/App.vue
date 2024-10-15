<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
//获取视窗高度
const viewPortHeight = ref(0)
onBeforeMount(()=>{
  viewPortHeight.value = window.innerHeight

})
</script>

<template>
  <div class="appBox" :style="{height:viewPortHeight+'px'}">
    <RouterView />
  </div>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.appBox{
  width: 100%;
  background-color: aqua;
}
</style>
