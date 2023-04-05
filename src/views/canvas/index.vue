<template>
  <div class="canvas">
    <div class="paletteBox">
      <div class="toolbar" style="margin: 10px;display: flex">
        <el-button @click="save">保存</el-button>
        <el-button @click="clear">清空</el-button>
        <el-button @click="undo">撤回</el-button>
        <div style="width: 40%;display: flex;align-items: center;margin: 0 10px 0 10px" class="slider-demo-block">
          <div style="font-size: 0.7rem;width: 48%;font-weight: bolder;color: white"> 画笔尺寸：</div>
          <el-slider :min="1" :max="10" v-model="value1"/>
        </div>
        <div style="width: 30%;display: flex;align-items: center;margin-left: 1px" class="demo-color-block">
          <div style="font-size: 0.7rem;width: 40%;font-weight: bolder;color: white">画笔颜色</div>
          <el-color-picker v-model="color1"/>
        </div>
      </div>
      <div class="palette">
        <canvas ref="canvas" width="420" height="200" style="border: 1px solid black;" id="canvas"></canvas>
      </div>
      <div class="showImg">
        <img :src="imgUrl">
      </div>
    </div>
    <div class="clock">

    </div>
  </div>
</template>

<script setup lang="ts">
import {nextTick, reactive, ref} from "vue";

let painting = ref(false);
let startPoint = reactive({
  x: undefined,
  y: undefined,
});
const canvas = ref<any>(null);
const ctx = ref<any>(null);
const imgUrl = ref(null);
const value1 = ref(3)
const color1 = ref('#000000')
// 记录画布历史状态的数组
const canvasHistory: any = [];

// 初始化画布环境
nextTick(() => {
  ctx.value = canvas.value.getContext("2d");
  getOnmousedown();
  getOnmouseMove();
  getOnmouseUp();
});

// 鼠标按下事件处理程序
const getOnmousedown = () => {
  canvas.value.onmousedown = (e: any) => {
    const x = e.offsetX;
    const y = e.offsetY;
    startPoint.x = x;
    startPoint.y = y;
    painting.value = true;

    // 保存当前画布状态
    const currentState = ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height);
    canvasHistory.push(currentState);
  };
};

// 鼠标移动事件处理程序
const getOnmouseMove = () => {
  canvas.value.onmousemove = (e: any) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const newPoint = reactive({x, y});
    if (painting.value) {
      drawLine(startPoint.x, startPoint.y, newPoint.x, newPoint.y);
      startPoint.x = newPoint.x;
      startPoint.y = newPoint.y;
    }
  };
};

// 鼠标松开事件处理程序
const getOnmouseUp = () => {
  canvas.value.onmouseup = () => {
    painting.value = false;
  };
};

// 绘制线条
const drawLine = (xStart: undefined, yStart: undefined, xEnd: any, yEnd: any) => {
  ctx.value.beginPath();
  ctx.value.lineWidth = value1.value;
  ctx.value.strokeStyle = color1.value
  ctx.value.moveTo(xStart, yStart);
  ctx.value.lineTo(xEnd, yEnd);
  ctx.value.stroke();
  ctx.value.closePath();
};

// 清空画布
const clear = () => {
  ctx.value.fillStyle = '#ffffff';
  ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height);

  // 保存当前画布状态
  const currentState = ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height);
  canvasHistory.push(currentState);
};

// 撤回操作
const i = ref(0)
const undo = () => {
  i.value++
  console.log(canvasHistory.length)
  if (canvasHistory.length > 1) { // 至少要保留一个初始状态
    canvasHistory.pop(); // 弹出当前状态
    console.log(canvasHistory)
    const lastState = canvasHistory[canvasHistory.length - i.value]; // 获取前一个状态
    clear(); // 清空画布
    ctx.value.putImageData(lastState, 0, 0); // 绘制前一个状态
  }
};

// 保存画布内容
const save = () => {
  const url = canvas.value.toDataURL('image/jpg');
  imgUrl.value = url;

  // 下载图片
  // const a: any = document.createElement('a')
  // a.href = url
  // a.download = '画板'
  // a.target = '_blank'
  // a.click()

  // 保存当前画布状态
  const currentState = ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height);
  canvasHistory.push(currentState);
};
</script>

<style scoped lang="scss">
.canvas {
  display: flex;
  height: 100%;

  .paletteBox {
    background-color: #999999;
    width: 50%;
    height: 100%;

    .palette {
      width: 80%;
      height: 200px;
      background-color: white;
      text-align: center;
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translate(-50%, -30%);
    }

    .showImg {
      width: 80%;
      height: 200px;
      border: 1px solid;
      text-align: center;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -30%);
    }
  }
}
</style>
