<template plate>
  <div class="dj-right">
    <ModelTitle model-title="荣誉表彰" />
    <!-- <div ref="pieRightBox" class="pie-chart">
      <div id="pieEchart" :style="{ height: chartHeight }"></div>
    </div> -->
    <ModelTitle model-title="主题党日" />

    <ModelTitle model-title="三会一课" />
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { noDataOption } from "../daPing/components/noDataOption";
import ModelTitle from "../daPing/components/modelTitle.vue";
</script>

<style scoped lang="scss">
.dj-right {
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(/src/assets/images/card-bg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 15px 16px 15px 9px;
  box-sizing: border-box;
  padding-bottom: 10px;
  width: 420px;
  overflow: hidden;
  .pie-chart {
    width: 400px;
    position: relative;
    height: 262px;
    #pieEchart {
      position: absolute;
      left: -10px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
