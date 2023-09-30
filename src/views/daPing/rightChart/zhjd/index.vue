<template>
  <div class="center-bt-box">
    <div ref="yjqkBox" class="yjqkContainer">
      <ModelTitle model-title="智慧监督" />
      <div class="pie-box">
        <Pie />
        <Pie1 />
      </div>
      <bar />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModelTitle from "../../components/modelTitle.vue";
import Pie from "../../rightChart/pie.vue";
import Pie1 from "../../rightChart/pie1.vue";
import bar from "../../rightChart/bar.vue";
</script>

<style scoped lan="scss">
.pie-box {
  display: flex;
  flex-direction: row;
  height: 162px;
  position: relative;
  .pie-chart,
  .pie-chart1 {
    width: 100%;

    position: absolute;
  }
  .pie-chart {
    left: 50px;
  }
  .pie-chart1 {
    right: 106px;
  }
}
</style>
