<script setup lang="ts">
import { ref } from 'vue'
import { test } from '@/services/apis/home'

const testStr = ref('')
const getTestStr = async ()=>{
  const res = await test()
  console.log(res)
}
getTestStr()
</script>

<template>
  <div>我是主页</div>
  <div>{{ testStr }}</div>
</template>

<style lang="less" scoped>

</style>