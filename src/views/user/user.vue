<template>
 <div class="userBox">
   <el-table :data="userList" style="width: 100%">
     <el-table-column prop="user_id" label="ID" width="180" />
     <el-table-column prop="userName" label="姓名" width="180" />
     <el-table-column prop="roles" label="身份">
        <template #default="scope">
          <el-button
              v-for="item in scope.row.roles"
              @click="getRow(scope)"
              size="small"
              type="primary"
          >
            {{item.identity_name}}
          </el-button>
        </template>
     </el-table-column>
   </el-table>
   <div>
     <span v-html="text"></span>
   </div>
 </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import { useRouter } from "vue-router";
import {getAllUser} from "@/api/user";
import { userData } from "@/type/user";

let { userList }  = reactive(new userData())
const router = useRouter();

onMounted(() =>{
  getUserList()
})

const getRow = (scope: any) => {
  console.log(scope)
}

const getUserList = () => {
  getAllUser().then(res =>{
    userList.push(...res.data)
  })
}

const text = ref('')
const textContent = ref(`这是一段文字说明，<br>下边还有一段文字说明，<br>没有任何的意义只是为了凑字数.`)
const textLength = textContent.value.length
let i  = 0
const print = setInterval(()=>{
    text.value += textContent.value[i]
    i++
  if (i >= textLength) {
    clearInterval(print)
  }
},500)

</script>

<style scoped lang="scss">

</style>
