<template>
  <el-select style="height: 200px" v-model="selectedItem" :loading="isLoading" @visible-change="handleVisibleChange" @scroll="handleScroll">
    <el-option  v-for="option in options" :key="option.value" :label="option.label" :value="option.value"></el-option>
    <el-option v-if="isLoading" label="Loading..." disabled></el-option>
  </el-select>
</template>

<script >
import { ref } from 'vue';

export default {
  setup() {
    const selectedItem = ref(null);
    const options = ref([]);
    const isLoading = ref(false);
    const page = ref(1);
    const listRef = ref(null);

    async function loadOptions() {
      isLoading.value = true;
      // 模拟异步请求
      setTimeout(() => {
        const results = [];
        for (let i = 1; i <= 10; i++) {
          results.push({
            value: page.value * 10 + i,
            label: `Option ${page.value * 10 + i}`
          });
        }
        options.value = [...options.value, ...results];
        isLoading.value = false;
        page.value++;
      }, 1000);
    }

    function handleVisibleChange(visible) {
      if (visible && options.value.length === 0) {
        loadOptions();
      }
    }

    function handleScroll(event) {
      console.log(event)
      const list = event.target;
      if (list.scrollHeight - list.scrollTop === list.clientHeight && !isLoading.value) {
        loadOptions();
      }
    }

    return {
      selectedItem,
      options,
      isLoading,
      listRef,
      handleVisibleChange,
      handleScroll
    };
  }
}
</script>
