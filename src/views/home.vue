<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header class="header">
        <img src="">
        <h2>后台管理系统</h2>
        <el-button>退出登录</el-button>
      </el-header>
      <el-container class="container">
        <el-aside width="200px" class="aside">
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              :default-active="active_menu"
              text-color="#fff"
              router
          >
            <el-menu-item :index="item.path" v-for="(item,index) in need_list" :key="item.path">
              <el-icon><icon-menu /></el-icon>
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="z-index: 0">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter,useRoute } from "vue-router";
const router = useRouter();
const route = useRoute()

const need_list = router.getRoutes().filter(v => v.meta.isShow)
const active_menu = route.path
console.log(need_list)

</script>

<style scoped lang="less">
  .common-layout{
    height: 100%;
    .header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #767678;

    }
    .container{
      height: 100%;
      .aside{
        height: 100%;
        .el-menu-vertical-demo{
          height: 100%;
        }
      }
    }
  }
  //.fade-enter-active {
  //  transition: all .5s linear;
  //}
  //.fade-enter {
  //  transform: translateY(50px);
  //  opacity: 0;
  //}
  //.slide-fade-enter-active {
  //  transition: all .3s ease;
  //}
  //.slide-fade-leave-active {
  //  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  //}
  //.slide-fade-enter, .slide-fade-leave-to {
  //  transform: translateX(50px);
  //  opacity: 0;
  //}

  .fade-enter-from{
    // 进入时的过渡前
    transform: translateY(50px);
    opacity: 0;
  }
  .fade-enter-active{
    // 进入时的过渡中
    transition: all 1s ease;
  }
  .fade-enter-to{
    // 进入时的过渡结束
    opacity: 1;
  }
  //.fade-leave-from{
  //  // 离开时的过渡前
  //  opacity: 1;
  //}
  //.fade-leave-active{
  //  // 离开时的过渡中
  //  transition: all 1s ease;
  //}
  //.fade-leave-to{
  //  // 离开时的过渡结束
  //  opacity: 0;
  //}
</style>
