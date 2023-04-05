<template>
  <div>
    <ImgCutter :sizeChange="false" @cutDown="cutDown">
      <template #open>
        <button>选择图片</button>
        <div class="">
          <img :src="newUrl" alt="">
        </div>
      </template>
    </ImgCutter>
  </div>
</template>

<script setup lang="ts">
import ImgCutter from 'vue-img-cutter'
import {reactive, ref} from "vue";
import 'vue-cropper/dist/index.css'


const newUrl = ref(null)
const cutDown = (obj: any) => {
  console.log(obj)
  newUrl.value = obj.dataURL
}
</script>

<style scoped lang="scss">

</style>
