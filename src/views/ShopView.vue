<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const id = ref()
onMounted(()=>{
  id.value = route.query?.id
})

</script>

<template>
  <div>{{ id }}</div>
</template>

<style lang="less" scoped>

</style>