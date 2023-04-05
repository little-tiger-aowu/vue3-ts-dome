<template>
  <div class="chart-container">
    <div ref="chart" id="chart" class="chart"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, nextTick } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'LineChart',
  props: {
    data: {
      type: Array,
      required: true
    },
    xAxisName: {
      type: String,
      default: ''
    },
    yAxisName: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let chart: echarts.ECharts | null = null;

    function initChart() {
      const element = document.getElementById('chart') as HTMLDivElement;
      chart = echarts.init(element);
      chart.setOption({
        xAxis: {
          type: 'category',
          data: props.data.map(item => item.name),
          name: props.xAxisName
        },
        yAxis: {
          type: 'value',
          name: props.yAxisName
        },
        series: [{
          type: 'line',
          data: props.data.map(item => item.value)
        }]
      });
    }

    function resizeChart() {
      chart?.resize();
    }

    onMounted(() => {
      nextTick(() => {
        initChart();
        window.addEventListener('resize', resizeChart);
      });
    });

    onUpdated(() => {
      nextTick(() => {
        chart?.setOption({
          xAxis: {
            data: props.data.map(item => item.name),
            name: props.xAxisName
          },
          series: [{
            data: props.data.map(item => item.value)
          }]
        });
        resizeChart();
      });
    });

    return {
      resizeChart
    };
  }
});
</script>

<style>
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
