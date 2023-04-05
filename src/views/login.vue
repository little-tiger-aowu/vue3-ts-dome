<template>
  <div class="loginBox">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        label-width="70px"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="ruleForm.userName" type="text" autocomplete="off"/>
      </el-form-item>

      <el-form-item label="密码:" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
      </el-form-item>

      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button class="login-btn" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, resolveDirective} from "vue";
import {ElMessage} from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {useRouter} from "vue-router";
import {loginDate} from "@/type/login";
import {login} from "@/api/user";
import axios from "axios";

const router = useRouter();

const {ruleForm} = reactive(new loginDate())


// const userAgent = navigator.userAgent.toLowerCase();
// console.log(userAgent)


//登录
const submitForm = () => {
  if (ruleForm.password && ruleForm.userName) {
    // mock 模拟登录
    axios.post('/api/login', {
      username: ruleForm.userName,
      password: ruleForm.password
    }).then(response => {
      const {code, message, data} = response.data;
      if (code === 200) {
        ElMessage.success(message)
        localStorage.setItem('token', data.token)
        setTimeout(() => {
          router.push({
            path: '/home/goods'
          })
        }, 1000)
      } else {
        ElMessage.error(message)
      }
    }).catch(error => {
      ElMessage.error(error)
    })
    // login(ruleForm).then(res => {
    //   if (res.code === 200) {
    //     ElMessage({
    //       showClose: true,
    //       message: '登录成功',
    //       type: 'success',
    //     })
    //     setTimeout(()=>{
    //       router.push({
    //         path:'/home/goods'
    //       })
    //     },1000)
    //
    //   }
    // })
  }
}

</script>

<style scoped lang="less">
.loginBox {
  width: 100%;
  height: 100%;
  background-image: url("../assets/bg-img.jpg");
  background-size: 100% 100%;
  padding: 1px;

  .el-form {
    width: 500px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    margin: 200px auto;
    padding: 20px;
    text-align: center;

    h2 {
      margin: 5px;
    }
  }
}
</style>
