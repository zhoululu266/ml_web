<template>
  <div class="gryj">
    <SjTitle title="个人预警" />
    <div class="content">
      <div v-for="item in arr">
        <div class="title">{{ item.title }}</div>
        <div class="img-box">
          <div>{{ item.val }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SjTitle from "@/views/daPing/components/sj-title.vue";

const arr = ref([
  { title: "临近审限案件", val: 1024 },
  { title: "超审限案件", val: 100 },
  { title: "超6个月未结案件", val: 50 },
  { title: "超12个月未结案件", val: 20 },
]);
</script>

<style scoped lang="scss">
.gryj {
  width: 600px;
  height: 413px;
  background-image: url(/src/assets/images/info-bg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  box-sizing: border-box;
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    > div {
      width: 50%;
      position: relative;
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .title {
      position: absolute;
      z-index: 10;
      width: 165px;
      height: 20px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: bold;
      padding-left: 24px;
      line-height: 32px;
      color: #dddddd;
    }
    .img-box {
      z-index: 0;
      background-image: url(/src/assets/images/fgxx-gr.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 158px;
      height: 140px;
      line-height: 124px;
      text-align: center;
      div {
        font-size: 34px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #edfbff;

        background: linear-gradient(
          179deg,
          rgba(40, 217, 255, 0.5) 0%,
          rgba(255, 255, 255, 0.5) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
</style>
