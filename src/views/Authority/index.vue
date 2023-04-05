<template>
  <el-tree ref="tree" node-key="id" @getCheckedKeys="getCheckedKeys" @check-change="checkChange"  :data="data" :default-checked-keys="defaultChecked"  show-checkbox />
  <el-button @click="sumbit">保存</el-button>
  <div>当前所选中节点：{{ checkNodeId }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const defaultChecked = ref([21,22])

// const checkChange = (a,b,c) => {
//   console.table({a})
//   console.table({b})
//   console.table({b})
// }

// const getCheckedKeys = (leafOnly) => {
//   console.log(leafOnly)
// }

// 保存
const tree = ref<any>(null)
const checkNodeId = ref<any>([])
const sumbit = () => {
 const checkNode = tree.value.getCheckedNodes(true,true)
  checkNodeId.value.length = 0
  checkNode.forEach((item: any) => {
    console.log(item)
    checkNodeId.value.push(item.id)
  })
  console.log(checkNodeId.value)
}


const data: Tree[] = [
  {
    id: 1,
    label: '素材管理',
    children: [
      {
        id: 11,
        label: '视频管理',
        children: [
          {
            id:111,
            label: '检索视频',
          },
          {
            id: 112,
            label: '添加视频',
          },
          {
            id: 113,
            label: '编辑视频',
          },
          {
            id: 114,
            label: '删除视频',
          },
          {
            id: 115,
            label: '查看详情',
          },
        ],
      },
      {
        id: 12,
        label: '产品管理',
        children: [
          {
            id: 121,
            label: '检索产品',
          },
          {
            id: 122,
            label: '添加产品',
          },
          {
            id: 123,
            label: '编辑产品',
          },
          {
            id: 124,
            label: '删除产品',
          },
          {
            id: 125,
            label: '查看详情',
          },
        ]
      }
    ],
  },
  {
    id: 2,
    label: '热点管理',
    children: [
      {
        id: 21,
        label: '检索热点',
      },
      {
        id: 22,
        label: '编辑热点',
      },
    ],
  },
  {
    id: 3,
    label: '协议管理',
    children: [
      {
        id: 31,
        label: '编辑协议',
      },
    ],
  },
  {
    id: 4,
    label: '访客信息',
    children: [
      {
        id: 41,
        label: '个人信息',
        children: [
          {
            id: 411,
            label: '检索个人信息'
          },
          {
            id: 412,
            label: '导出个人信息'
          }
        ]
      },
      {
        id: 42,
        label: '用户行为',
        children: [
          {
            id: 421,
            label: '检索用户行为'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    label: '系统管理',
    children: [
      {
        id: 51,
        label: '用户管理',
        children: [
          {
            id: 511,
            label: '检索用户'
          },
          {
            id: 512,
            label: '重置用户'
          },
          {
            id: 513,
            label: '新增用户'
          },
          {
            id: 514,
            label: '删除用户'
          },
          {
            id: 515,
            label: '导入用户'
          },
          {
            id: 516,
            label: '导出用户'
          },
          {
            id: 517,
            label: '查看详情'
          },
          {
            id: 518,
            label: '编辑用户'
          },
        ]
      },
      {
        id: 52,
        label: '系统日志',
        children: [
          {
            id: 521,
            label: '检索日志'
          },
          {
            id: 522,
            label: '重置日志'
          },
          {
            id: 523,
            label: '删除日志'
          },
          {
            id: 524,
            label: '清空日志'
          },
          {
            id: 525,
            label: '解锁用户'
          },
          {
            id: 526,
            label: '导出日志'
          }
        ]
      }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>

