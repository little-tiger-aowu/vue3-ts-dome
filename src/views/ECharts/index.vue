<template>
  <div style="display: flex">
    <div class="lineBox" style="height: auto;width: 50%;">
      <h3>折线图</h3>
      <BrokenLine :data="chartData" xAxisName="日期" yAxisName="销售额"></BrokenLine>
    </div>
    <div class="barBox" style="height: auto;width: 50%;">
      <h3>柱状图</h3>
      <Columnar :data="chartData" xAxisName="日期" yAxisName="销售额"></Columnar>
    </div>
  </div>
  <div class="" style="display: flex">
    <div style="height: auto;width: 50%;">
      <h3>饼图</h3>
      <pie-chart :data="picData"></pie-chart>
    </div>
    <div style="height: auto;width: 50%;">
      <h3>仪表盘</h3>
      <gauge :value="gaugeValue"></gauge>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import PieChart from "@/components/ECharts/PieChart.vue";
import Gauge from "@/components/ECharts/gauge.vue";

const chartData = [
  {name: '2022-01-01', value: 220},
  {name: '2022-01-02', value: 200},
  {name: '2022-01-03', value: 300},
  {name: '2022-01-04', value: 400},
  {name: '2022-01-05', value: 600},
]
const picData = [
  {value: 1050, name: 'Search Engine'},
  {value: 735, name: 'Direct'},
  {value: 580, name: 'Email'},
  {value: 484, name: 'Union Ads'},
  {value: 300, name: 'Video Ads'}
]

const gaugeValue = ref(50)
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
