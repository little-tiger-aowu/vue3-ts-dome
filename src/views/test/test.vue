<script lang="ts" setup>
import {ref} from 'vue'
import _ from 'lodash'
const flag = ref<boolean>(true)
const value1 = ref() // 初始化下来框数据
// const value1_back = ref()
// let newArr = ref([])
const changSelect = (val:any) =>{

  // console.log(_.values(value1.value))
  // addOp.value = _.difference(val,value1.value)
  // removeOp.value = _.difference(value1.value,val)
  // console.log('新增的字段为：',addOp.value)
  // console.log('删除的字段为：',removeOp.value)
}
const addOp = ref()
const removeOp = ref()
const sumbit = () => {
  const newArr = _.values(value1.value)
  const oldArr = listInfo.oldArr
  addOp.value = _.difference(newArr,oldArr)
  removeOp.value = _.difference(oldArr,newArr)
  console.log('新增的字段为：',addOp.value)
  console.log('删除的字段为：',removeOp.value)
}

const listInfo = {
  name:'123',
  age:0,
  oldArr:[1, 2, 3]
}
value1.value = listInfo.oldArr


const options:any = [
  {
    value: 1,
    label: 'Option1',
  },
  {
    value: 2,
    label: 'Option2',
  },
  {
    value: 3,
    label: 'Option3',
  },
  {
    value: 4,
    label: 'Option4',
  },
  {
    value: 5,
    label: 'Option5',
  },
  {
    value: 6,
    label: 'Option6',
  },
  {
    value: 7,
    label: 'Option7',
  },
  {
    value: 8,
    label: 'Option8',
  },
  {
    value: 9,
    label: 'Option9',
  },
  {
    value: 10,
    label: 'Option10',
  },
  {
    value: 11,
    label: 'Option11',
  },
  {
    value: 12,
    label: 'Option12',
  },
  {
    value: 13,
    label: 'Option13',
  },
  {
    value: 14,
    label: 'Option14',
  },
  {
    value: 15,
    label: 'Option15',
  },
  {
    value: 16,
    label: 'Option16',
  },
  {
    value: 17,
    label: 'Option17',
  },
  {
    value: 18,
    label: 'Option18',
  },
  {
    value: 19,
    label: 'Option19',
  },
  {
    value: 20,
    label: 'Option20',
  },
]

const handleVisibleChange = () => {
  let select_dom:any = document.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
  select_dom.addEventListener('scroll', function (this:any) {
    let height = this.scrollHeight - this.scrollTop <= this.clientHeight;
    if (height) {
      console.log(123)
      // code...
    }
  })
}

const getList = () => {
}


const loading = ref(false)
const remoteMethod = (query: string) => {
  console.log(query)
  if (query) {


  } else {
    console.log('error')
    // options.value = []
  }
}

</script>

<template>
<!--  <div>-->
<!--    <button @click="flag = !flag">切换</button>-->
<!--    <transition name="fade">-->
<!--      <h1 v-if="flag">大家好!</h1>-->
<!--    </transition>-->
<!--  </div>-->
<!--  <div class="ada">-->
<!--    三大大撒大声地撒大所大所大所-->
<!--  </div>-->

  <h2>选择器</h2>
  <el-select
      v-model="value1"
      multiple
      filterable
      remote
      placeholder="Select"
      style="width: 240px"
      @visible-change="handleVisibleChange"
      @change="changSelect"
      :remote-method="remoteMethod"
  >
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <el-button @click="sumbit">保存</el-button>
</template>

<style scoped lang='scss'>
// 根据所取的名字,会提供6个类
.fade-enter-from{
  // 进入时的过渡前
  opacity: 0;
}
.fade-enter-active{
  // 进入时的过渡中
  transition: all 1s ease;
}
.fade-enter-to{
  // 进入时的过渡结束
  opacity: 1;
}
.fade-leave-from{
  // 离开时的过渡前
  opacity: 1;
}
.fade-leave-active{
  // 离开时的过渡中
  transition: all 1s ease;
}
.fade-leave-to{
  // 离开时的过渡结束
  opacity: 0;
}
</style>
