<template>
  <div class="chart-container">
    <div ref="ColumnarItem" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, nextTick, onMounted, onUpdated, reactive, ref } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  xAxisName: {
    type: String,
    default: '',
  },
  yAxisName: {
    type: String,
    default: '',
  },
});

let chart: echarts.ECharts | null = null;
const ColumnarItem = ref<any>(null);

const initChart = () => {
  const element = ColumnarItem.value;
  chart = echarts.init(element);
  chart.setOption({
    xAxis: {
      type: 'category',
      data: props.data.map((item) => item.name),
      name: props.xAxisName,
    },
    yAxis: {
      type: 'value',
      name: props.yAxisName,
    },
    series: [
      {
        type: 'bar',
        data: props.data.map((item) => item.value),
      },
    ],
  });
};

const resizeChart = () => {
  chart?.resize();
};

onMounted(() => {
  nextTick(() => {
    initChart();
    window.addEventListener('resize', resizeChart);
  });
});

// 当数据改变时重新加载数据
onUpdated(() => {
  console.log('onUpdated')
  nextTick(() => {
    console.log('onUpdated1')
    chart?.setOption({
      xAxis: {
        // ...chart?.getOption().xAxis,
        data: props.data.map((item) => item.name),
        name: props.xAxisName,
      },
      series: [
        {
          data: props.data.map((item) => item.value),
        },
      ],
    });
    resizeChart()
  });
});
</script>

<style scoped lang="scss">
.chart-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 50%; /* 控制容器宽高比，这里设置为2:1 */
}

.chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
