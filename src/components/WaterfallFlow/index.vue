<template>
  <div class="waterfall-flow">
    <div class="column" v-for="(col, index) in columns" :key="index">
      <div class="item" v-for="(item, idx) in col" :key="idx">
        <!-- 这里根据业务需求展示瀑布流每个元素的内容 -->
        {{ item.id }}
        <img :src="item.imgUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, onUnmounted} from 'vue'

export default defineComponent({
  name: 'WaterfallFlow',
  props: {
    // 瀑布流数据源
    dataSource: {
      type: Array,
      required: true
    },
    // 列数
    columnNum: {
      type: Number,
      default: 3
    },
    // 列之间的间距
    columnGap: {
      type: Number,
      default: 10
    },
    // 行之间的间距
    rowGap: {
      type: Number,
      default: 10
    }
  },
  setup(props) {
    // 计算列宽度和瀑布流每个元素的样式
    const {columns, itemStyle} = computeLayout(props.dataSource, props.columnNum, props.columnGap, props.rowGap)

    return {
      columns,
      itemStyle
    }
  }
})

// 计算瀑布流布局
function computeLayout(dataSource: any[], columnNum: number, columnGap: number, rowGap: number) {
  const columns = new Array(columnNum).fill(null).map(() => [])
  const itemWidth = Math.floor((window.innerWidth - (columnNum - 1) * columnGap) / columnNum)
  const itemStyle = {
    width: `${itemWidth}px`,
    marginBottom: `${rowGap}px`
  }

  dataSource.forEach(item => {
    const minIndex = columns.reduce((prev, cur, index) => {
      if (cur.length < columns[prev].length) {
        return index
      } else {
        return prev
      }
    }, 0)

    columns[minIndex].push(item)
  })

  return {
    columns,
    itemStyle
  }
}
</script>

<style scoped>
.waterfall-flow {
  display: flex;
  justify-content: space-between;
}

.column {
  flex: 1;
}

.item {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
}
</style>
