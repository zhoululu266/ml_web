<template>
  <div class="gl-box">
    <div v-for="(itemC, iC) in config" :key="iC" class="gl-block">
      <div class="gl-title">{{ itemC.name }}</div>
      <div class="gl-img-p">
        <div v-for="(item, i) in itemC.data" :key="i" class="gl-box-con">
          <div :class="`gl-img gl-img-${i + 1}`"></div>
          <div class="gl-content">
            <p class="gl-title">{{ item.name }}</p>
            <p class="gl-text">
              {{ item.num ? formatNumber(item.val) : item.val || 0
              }}{{ item?.dw }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface Props {
  configData: any;
}
let formatNumber = function (num: number) {
  let reg = /(?=(\B)(\d{3})+$)/g;
  return num.toString().replace(reg, ",");
};
const config = computed(() => [
  {
    name: "法律顾问",
    data: [
      {
        name: "调解案件成功数",
        img: "",
        val: props.configData["flgw_cgs"],
        num: true,
      },
      {
        name: "成功率",
        img: "",
        val: props.configData["flgw_cgl"],
        dw: "%",
      },
    ],
  },
  {
    name: "调解员",
    data: [
      {
        name: "调解案件成功数",
        img: "",
        val: props.configData["tjy_cgs"],
        num: true,
      },
      {
        name: "成功率",
        img: "",
        val: props.configData["tjy_cgl"],
        dw: "%",
      },
    ],
  },
]);
const props = withDefaults(defineProps<Props>(), {
  configData: () => {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
