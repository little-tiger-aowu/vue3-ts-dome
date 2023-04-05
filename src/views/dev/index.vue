<template>
  <div>
    dev分支
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

const router = useRouter();
//
// const getArrDifference = (arr1:any, arr2:any) => {
//   return arr1.concat(arr2).filter((v:any, i:any, arr:any) => {
//     return arr1.indexOf(v) === arr.lastIndexOf(v);
//   })
// };
// const list = [ 2, 3, 4, 5] // 原数组
// const list2 = [3, 1, 5, 6, 7] // 新数组
// // const list3 = [1, 3, 5]
// // const list4 = [1, 2, 4]
// console.log('删除的数组：',getArrDifference(list,list2));
// console.log('新增的数组：',getArrDifference(list2,list));
const username = ref('admin')
const password = ref('admin')
const login = () => {
  axios.post('/api/login', {
    username: username.value,
    password: password.value
  }).then(response => {
    const {code, message, data} = response.data;
    if (code === 200) {
      console.log('登录成功')
      console.log(data)
      localStorage.setItem('token', data.token)
    } else {
      console.log(message)
    }
  }).catch(error => {
    console.log(error)
  })
}

</script>

<style scoped lang="scss">

</style>
