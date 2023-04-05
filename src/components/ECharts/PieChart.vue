<template>
 <div class="chart-container">
   <div ref="picChart" class="chart"></div>
 </div>
</template>

<script setup lang="ts">
import {reactive, defineProps, ref, onMounted, nextTick, onUpdated} from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  data:{
    type: Array,
    required: true
  },
})

let chart: echarts.ECharts | null = null;
const picChart = ref<any>(null);

const initChart = () => {
  console.log(props.data)
  const element = picChart.value;
  chart = echarts.init(element)
  chart.setOption({
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: props.data.map((item) => item),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
}

const resizeChart = () =>{
  chart?.resize();
}

onMounted(() => {
  nextTick(() => {
    initChart()
    window.addEventListener('resize',resizeChart)
  })
})

onUpdated(() => {
  // console.log('onUpdated')
  // nextTick(() => {
  //   console.log('onUpdated11')
  //   chart?.setOption({
  //
  //   })
  // })
})

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
