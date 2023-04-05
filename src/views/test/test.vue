<script lang="ts" setup>
import {reactive, ref, onMounted, onBeforeUnmount} from 'vue'
import _ from 'lodash'
import {ElMessageBox} from 'element-plus'
import {getMenuList} from "@/api/goods";
import axios from "axios";

const flag = ref<boolean>(true)
const value1 = ref() // 初始化下来框数据
// const value1_back = ref()
// let newArr = ref([])
const changSelect = (val: any) => {
  console.log('chang')
  console.table(val)
}
const addOp = ref()
const removeOp = ref()
const sumbit = () => {
  // const newArr = _.values(value1.value)
  // const oldArr = listInfo.oldArr
  // addOp.value = _.difference(newArr,oldArr)
  // removeOp.value = _.difference(oldArr,newArr)
  // console.log('新增的字段为：',addOp.value)
  // console.log('删除的字段为：',removeOp.value)
  // listInfo.oldArr = value1.value
  // getMenuList().then(res => {
  //   console.log(res)
  // })
}
// 离开页面时触发 清除页面内的定时器
onBeforeUnmount(() => {
  clearInterval(a.value)
})
const time = ref(0)
const a = ref<any>(null)
onMounted(() => {
  a.value = setInterval(() => {
    console.log(time.value++)
    if (time.value >= 15) {
      clearInterval(a.value)
    }
  }, 1000)
  axios.get('/menu/list').then(res => {
    options.value = res.data.menusList
    console.log(options.value)
  })
  axios.get('/user/list').then(res => {
    console.log(res.data.userMenu)
    value1.value = res.data.userMenu
    // options.value = res.data.menusList
    // console.log(options.value)
  })
  // axios.get('/product/menu').then(res => {
  //   console.log(res.data)
  //   // value1.value = res.data.userMenu
  // })
})
// const sumbitBtn = () => {
//   console.log(123)
//   // console.log(value1)
// }

const sumbitBtn = _.throttle(() => {
  console.log(Math.ceil(34 / 10) * 10)
}, 1000)

const click = _.throttle(() => {
  console.log(Math.ceil(128 / 10))
}, 5000, {trailing: false})

// const listInfo = {
//   name:'123',
//   age:0,
//   oldArr:[{value: 1, label: 'Option1'},{value: 2, label: 'Option2'},{value:22, label: 'Option22'}]
// }
// value1.value = listInfo.oldArr


const options = ref<any>()


const handleVisibleChange = (val: any) => {
  // let select_dom:any = document.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
  // console.log(123)
  // select_dom.addEventListener('scroll', function (this:any) {
  //   let height = this.scrollHeight - this.scrollTop <= this.clientHeight;
  //   if (height) {
  //     console.log(123)
  //     // code...
  //   }
  // })
}

const getList = () => {
}

// 搜索
const loading = ref(false)
const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      console.log('搜索成功')
    }, 500)
  } else {
    console.log('error')
  }
}
</script>

<template>
  <h2>选择器</h2>
  <el-select
      v-model="value1"
      value-key="label"
      multiple
      filterable
      remote
      placeholder="Select"
      style="width: 240px"
      @visible-change="handleVisibleChange"
      @change="changSelect"
      :remote-method="remoteMethod"
      :loading="loading"
  >
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item"
    />
  </el-select>
  <el-button @click="sumbit">获取数据</el-button>
  <table style="margin-top: 30px" width="30%" border="1" cellspacing="0" cellpadding="4" align="center">
    <tr v-for="(item,index) in value1">
      <td>{{ item.label }}</td>
      <td style="width: 30%">
        <el-input style="width: 100%" v-model="item.order"></el-input>
      </td>
    </tr>
  </table>
  <el-button @click="sumbitBtn">保存</el-button>
  <el-button @click="click">点击</el-button>
</template>

<style scoped lang='scss'>
// 根据所取的名字,会提供6个类
.fade-enter-from {
  // 进入时的过渡前
  opacity: 0;
}

.fade-enter-active {
  // 进入时的过渡中
  transition: all 1s ease;
}

.fade-enter-to {
  // 进入时的过渡结束
  opacity: 1;
}

.fade-leave-from {
  // 离开时的过渡前
  opacity: 1;
}

.fade-leave-active {
  // 离开时的过渡中
  transition: all 1s ease;
}

.fade-leave-to {
  // 离开时的过渡结束
  opacity: 0;
}
</style>
