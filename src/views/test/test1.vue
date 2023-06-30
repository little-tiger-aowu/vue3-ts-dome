<template>
  <div>
    <el-upload
        class="avatar-uploader"
        :action="action"
        :data="data"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>
    <el-button @click="getToken">getToken</el-button>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'

import type {UploadProps} from 'element-plus'
import axios from "axios";

const action = 'https://up-z2.qiniup.com'
onMounted(() => {
  console.log(456)
})
const dataList = {
  token: ''
}

const beforeAvatarUpload = async (file: any) => {
  console.log(file)
  const {data} = await axios.get('/token/data')
  dataList.token = data.token
  console.log(dataList)
  return true
}
const getToken = async () => {

  // upload(data.token)
}
const upload = (token: any) => {
  console.log(token)
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
