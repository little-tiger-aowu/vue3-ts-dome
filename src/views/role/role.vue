<template>
  <div class="font2" v-loading="loading">
    角色管理页面
    <el-button @click="getMock">模拟请求</el-button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import {reactive, ref} from "vue";
import {mockCeshi} from "@/api/ceshi";

const loading = ref(true)

const getMock = () => {
  axios.get('/user/menu').then((res) => {
    console.log(res);
    // menus.mensList = res.data.menusList
  })
}
setTimeout(() => {
  loading.value = false
}, 3000)
</script>

<style scoped lang="scss">

</style>
