<template>
 <div class="box">
    页面a
 </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped lang="scss">
  .box{
    width: 100px;
    height: 100px;
    background-color: blue;
  }
</style>
