<template>
  <WaterfallFlow :dataSource="dataSource"/>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";

const dataSource = reactive([
  {
    id: 1,
    imgUrl: 'https://picsum.photos/300/100'
  },
  {
    id: 2,
    imgUrl: 'https://picsum.photos/300/250'
  },
  {
    id: 3,
    imgUrl: 'https://picsum.photos/300/150'
  },
  {
    id: 4,
    imgUrl: 'https://picsum.photos/300/120'
  },
  {
    id: 5,
    imgUrl: 'https://picsum.photos/300/250'
  },
  {
    id: 6,
    imgUrl: 'https://picsum.photos/300/130'
  },
  {
    id: 7,
    imgUrl: 'https://picsum.photos/300/120'
  },
  {
    id: 8,
    imgUrl: 'https://picsum.photos/300/180'
  },
  {
    id: 9,
    imgUrl: 'https://picsum.photos/300/380'
  },
  {
    id: 10,
    imgUrl: 'https://picsum.photos/300/280'
  }
])
</script>

<style scoped lang="scss">

</style>
