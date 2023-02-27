<template>
 <div class="goodsBox">
   <div class="formTop" style="margin-bottom: 10px">
     <el-input v-model="pageType.keywords" style="width: 20%;margin-right: 10px" placeholder="输入关键词" />
     <el-button type="primary" @click="searchBtn" :disabled="isDisabled" size="default">搜索</el-button>
     <el-button type="primary" @click="AddGoodsBtn" :disabled="isDisabled" size="default">添加商品</el-button>
   </div>
   <el-table :data="goodsList" border style="width: 100%">
     <el-table-column prop="product_id" label="ID" width="180" />
     <el-table-column prop="name" label="商品" width="180" />
     <el-table-column prop="price" label="价格" />
     <el-table-column prop="quantity" label="数量" />
     <el-table-column label="操作" width="180">
       <template #default="scope">
         <el-button type="danger" @click="deleteGoods(scope.row)" size="small">删除</el-button>
         <el-button type="primary" @click="upGoods(scope.row)" size="small">编辑</el-button>
       </template>
     </el-table-column>
   </el-table>
   <el-pagination @current-change="currentChange" background layout="prev, pager, next" :total="totalType.total*2" />
   <!-- 弹出层 -->
   <el-dialog v-model="dialogTableVisible" @open="openDia()"  title="编辑商品">
     <el-form>
       <el-form-item label="商品名称">
         <el-input v-model="updataGoods.goodsName" placeholder="Please input" />
       </el-form-item>
       <el-form-item label="商品介绍">
         <el-input
             v-model="updataGoods.goodsDescribe"
             :rows="8"
             type="textarea"
             placeholder="Please input"
         />
       </el-form-item>
       <el-form-item>
         <el-button>取消</el-button>
         <el-button type="primary" @click="upGoodsBtn">确定</el-button>
       </el-form-item>
     </el-form>
   </el-dialog>
 </div>

</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch,nextTick} from "vue";
import { useRouter } from "vue-router";
import {goodsDate, goodsType} from "@/type/goods";
import {getGoods,delGoodsBYId,upGoodsInfo} from "@/api/goods";
import { ElMessage, ElMessageBox } from 'element-plus'
import "element-plus/theme-chalk/el-message-box.css";
import 'element-plus/theme-chalk/el-message.css'
// import { ElMessage } from 'element-plus'
const router = useRouter();
const {pageType} = reactive(new goodsDate())
let {totalType} = reactive(new goodsDate())
let {goodsList} = reactive(new goodsDate())
let { updataGoods } =reactive(new goodsDate())

onMounted(() => {
  getAllGoods()
})

// 获取数据
const getAllGoods = () => {
  goodsList.length = 0
  getGoods(pageType).then(res => {
    console.log(res.data.goods)
    goodsList.push(...res.data.goods)
    totalType.total = res.data.total
  })
}

// 分页
const currentChange = (page: number) => {
  pageType.page = page
  goodsList.length = 0
  getAllGoods()
}

// 删除
const deleteGoods = (row: any) => {
  ElMessageBox.confirm(
      '确定删除此商品?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        const params = {
          goodsId:row.goods_id
        }
        delGoodsBYId(params).then(res => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
          } else {
            ElMessage({
              type: 'warning',
              message: '删除失败',
            })
          }
          getAllGoods()
        })

      })
}

watch(() => pageType.keywords,(newValue) => {
  if (newValue.length === 0) {
    getAllGoods()
  }
})

// 搜索
const searchBtn = () => {
  getAllGoods()
}

// 添加商品
const AddGoodsBtn = () => {
  dialogTableVisible.value = true
}

const openDia = () => {
  console.log(1111111111)
}

// 编辑
const dialogTable = ref(true)
const dialogTableVisible = ref(false)
const upGoods = (row: any) => {
    updataGoods = reactive({
      goodsId:row.goods_id,
      goodsName:row.goods_name,
      goodsDescribe:row.goods_describe
    })
  dialogTableVisible.value = true
}
const upGoodsBtn = () => {
  upGoodsInfo(updataGoods).then(res => {
    if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
    } else {
      ElMessage({
        type: 'warning',
        message: '删除失败',
      })
    }
    dialogTableVisible.value = false
    getAllGoods()
  })
}


// 模糊查询
const seachValue =ref('')
const isDisabled = ref(false)
</script>

<style scoped lang="less">
  .el-pagination{
    display: flex;
    justify-content: end;
    margin-top: 10px
  }
  :deep(.el-form-item__content){
    display: flex;
    justify-content: flex-end;
  }
  .el-message-box__status{
    position: absolute !important;
  }
  .disabledBox{
    position: absolute;
  }
</style>
