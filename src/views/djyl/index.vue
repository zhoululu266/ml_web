<template>
  <div class="dj-page">
    <div class="dj-top"><TimeBox /></div>
    <div class="dj-content">
      <Left />
      <Center />
      <Right />
    </div>
    <div class="dj-bottom">
      <Bottom />
    </div>
  </div>
</template>

<script setup lang="ts">
import Left from "./left.vue";
import Right from "./right.vue";
import Center from "./center.vue";
import Bottom from "./bottom.vue";
import TimeBox from "@/components/timeBox.vue";
</script>

<style scoped lang="scss">
.dj-page {
  background: url("@/assets/images/tsbg.png") no-repeat;
  background-color: #081e34c9;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  font-family: Source Han Sans CN;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0px 60px 0px 60px;

  :deep(.title-circle) {
    background-image: url("@/assets/images/dj-title.png");
    padding-left: 40px;
    box-sizing: border-box;
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .dj-top {
    height: 127px;
    width: 100%;
  }
  .dj-content {
    display: flex;
    flex-direction: row;
    height: calc(100% - 367px);
  }
  .dj-bottom {
    display: flex;
    flex-direction: row;
    height: 240px;
  }
}
</style>
