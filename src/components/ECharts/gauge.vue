<template>
  <div class="chart-gauge">
    <div ref="gaugeItem" class="chart"></div>
  </div>
</template>
<script setup lang="ts">
import {defineProps, nextTick, onMounted, onUpdated, reactive, ref} from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  // xAxisName: {
  //   type: String,
  //   default: '',
  // },
  // yAxisName: {
  //   type: String,
  //   default: '',
  // },
});

let chart: echarts.ECharts | null = null;
const gaugeItem = ref<any>(null);

const initChart = () => {
  const element = gaugeItem.value;
  chart = echarts.init(element);
  chart.setOption({
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: '仪表盘',
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}'
        },
        data: [
          {
            value: props.value,
            name: '分数'
          }
        ]
      }
    ]
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

onUpdated(() => {
  console.log('onUpdated')
  nextTick(() => {
    console.log('onUpdated1')
    chart?.setOption({
      series: [
        {
          data: [
            {
              value: props.value,
              name: 'SCORE'
            }
          ]
        },
      ],
    });
    resizeChart()
  });
});
</script>

<style scoped lang="scss">
.chart-gauge {
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
