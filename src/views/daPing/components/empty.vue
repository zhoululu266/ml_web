<template>
  <div class="empty">
    <!-- <img v-if="emptyType === '1'" :src="'./images/icon/tsp-Empty.png'" width="90" />
    <img v-if="emptyType === '2'" :src="'./images/icon/tsp-loading.png'" width="90" />
    <img v-if="emptyType === '3'" :src="'./images/icon/tsp-error.png'" width="90" /> -->
    <span v-if="emptyType === '1'" class="no-text">暂无数据</span>
    <span v-if="emptyType === '2'" class="no-text">数据加载中...</span>
    <span v-if="emptyType === '3'" class="no-text"
      >数据加载失败<br />(当前网络环境不佳)</span
    >
  </div>
</template>
<script setup lang="ts">
defineProps({
  emptyType: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.empty {
  height: calc(100% - 34px);
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  img {
    width: 380px;
    height: 240px;
    // margin-bottom: 5px;
  }
  .no-text {
    text-align: center;
    color: #ffffff;

    font-size: 16px;
    // position: absolute;
    bottom: 40%;
  }
}
</style>
