<template>
  <div style="display: flex;height: 100%">
    <!-- 歌曲搜索列表 -->
    <div class="searchMusic" style="border: 1px solid;width: 40%;height: 100%">
      <el-input style="padding: 10px" @keydown.enter="getMusic" v-model="musicName" placeholder="搜索歌名"/>
      <el-row style="border-bottom: 1px solid #999999;margin: 0 5px">
        <el-col style="font-size: 0.8rem;margin-left:5px;letter-spacing: 2px" :span="8">歌曲名</el-col>
        <el-col style="font-size: 0.8rem;text-align: center;letter-spacing: 2px" :span="6">歌手</el-col>
      </el-row>
      <el-row v-for="item in musicList" @click="getMusicById(item)">
        <el-col class="listCol" :span="10">
          {{ item.name }}
        </el-col>
        <el-col v-for="arItem in item.ar" class="listCol"
                style="" :span="10">
          {{ arItem.name }}
        </el-col>
      </el-row>
    </div>
    <!-- 歌曲播放组件 -->
    <div class="audioBox">
      <div class="musicTitle">
        {{ musicInfo }}
      </div>
      <div class="lyrBox">
        <div v-if="allLyrics" style="background-color: #DD4A68;height: 300px;width: 60%">
          <div v-for="(item,index) in allLyrics" style="text-align: center">
            <div v-if="progressTime > allKey[index] && progressTime < allKey[index+1]">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
      <div class="musicTab">
        <img v-if="!isPlay" @click="play" style="width: 6%;height: auto" src="../../assets/font/playBtn.png" alt="">
        <img v-else style="width: 6%;height: auto" @click="stop" src="../../assets/font/stopBtn.png" alt="">
      </div>
      <audio v-if="musicUrl" ref="audio">
        <source :src="musicUrl"/>
      </audio>
    </div>
  </div>

</template>

<script setup lang="ts">
import {reactive, ref, nextTick, watch} from "vue";
import _ from 'lodash'
import axios from "axios";
import {Soccer} from "@element-plus/icons-vue";
// 获取播放器
const audio = ref<any>(null)
// 获取播放进度
const progressTime = ref(0)
// 获取当前选中歌曲信息
const musicInfo = ref(null)

// 搜索获音乐
const musicName = ref('')
const musicList = ref(null)
const getMusic = () => {
  musicList.value = null
  axios.get(`http://localhost:3000/cloudsearch?keywords=${musicName.value}&limit=10`).then((res) => {
    // console.log('deta:', res.data.result.songs)
    musicList.value = res.data.result.songs
  })
}
// 播放音乐 获取音乐url
const musicUrl = ref('')
const getMusicById = (item: any) => {
  musicInfo.value = item.name
  musicUrl.value = ''
  axios.get(`http://localhost:3000/song/url?id=${item.id}`).then((res) => {
    getLrcBytd(item.id)
    musicUrl.value = res.data.data[0].url
  })
}


// 获取歌词
const lrc = ref([])
const allLyrics = ref<any>([]);
const getLrcBytd: any = (mid: number) => {
  allLyrics.value = [];
  axios.get(`http://localhost:3000/lyric?id=${mid}`).then(res => {
    const lines = res.data.lrc.lyric.split('\n');
    lines.forEach((lines: any) => {
      const timeExp = /\[(\d{2}):(\d{2})\.(\d{3})\]/;
      const result = timeExp.exec(lines);
      if (result) {
        const time = parseInt(result[1], 10) * 60 + parseInt(result[2], 10) + parseFloat(result[3]) / 1000;
        const text = lines.replace(timeExp, '').trim();
        allLyrics.value.push({time, text});
      }
    });
    getAllKey()
  })
}
const allKey = ref<any>([])
const getAllKey = () => {
  allKey.value = []
  allLyrics.value.forEach((item: any) => {
    allKey.value.push(item.time)
  })
  console.log(allKey.value)
}

// 获取播放进度
const getProgressTime = () => {
  audio.value.addEventListener('timeupdate', (event: any) => {
    progressTime.value = audio.value.currentTime
    console.log(progressTime.value)
  })
}

// 播放按钮
const isPlay = ref(false)
const play = () => {
  isPlay.value = true
  audio.value.play()
  getProgressTime()
}
const stop = () => {
  isPlay.value = false
  audio.value.pause()
}

const sumbit = () => {
  console.log('双击')
}

</script>

<style scoped lang="scss">
.listCol {
  font-size: 0.8rem;
  letter-spacing: 2px;
  overflow: hidden;
  padding: 3px;
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.audioBox {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.musicTitle {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  letter-spacing: 2px;
  font-size: 1.2rem;
  font-weight: bolder;
}

.lyrBox {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.musicTab {
  width: 95%;
  height: 50px;
  border-top: 1px solid #DD4A68;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>
