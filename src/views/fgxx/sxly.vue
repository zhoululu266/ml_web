<template>
  <div class="gryj">
    <SjTitle title="熟悉领域" />
    <div class="content">
      <div v-for="item in arr">
        <div class="title">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SjTitle from "@/views/daPing/components/sj-title.vue";

const arr = ref(Array.from({ length: 8 }, () => "商事审判"));
</script>

<style scoped lang="scss">
.gryj {
  width: 100%;
  height: 207px;
  background-image: url(/src/assets/images/fgxx.card2.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  box-sizing: border-box;
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: -20px;
    padding: 0 30px;
    > div {
      width: 25%;
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .title {
      z-index: 0;
      background-image: url(/src/assets/images/fgxx-sxly.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 122px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>
