<template>
  <div class="gzjl">
    <SjTitle title="工作经历" />
    <div class="content">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          type="primary"
          hollow="true"
          color="#36A3FF"
          :key="index"
        >
          <div class="text">{{ activity }}</div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup lang="ts">
import SjTitle from "@/views/daPing/components/sj-title.vue";

const activities = ref([
  "集成法院中层正职",
  "集成法院中层副职",
  "集成法院中层副职",
]);
</script>

<style scoped lang="scss">
.gzjl {
  width: 100%;
  height: 50%;
  margin-bottom: 18px;
  box-sizing: border-box;
  background-image: url(/src/assets/images/fgxx.card2.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  box-sizing: border-box;
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: calc(100% - 50px);
    align-items: center;
    .text {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>
