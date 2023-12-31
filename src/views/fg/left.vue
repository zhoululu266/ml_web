<template>
  <div class="dj-left">
    <div class="left-title"><div>案件质量</div></div>

    <div ref="dyLeftBox" class="yjqk-chart">
      <div id="dyLeftEchart" :style="{ height: chartHeight }"></div>
    </div>
    <div class="dyfl">
      <div v-for="(item, i) in dyrs" :key="i">
        <span
          ><div
            class="color-box"
            :style="[{ backgroundColor: item.color }]"
          ></div>
          {{ item.name }}</span
        >
        <p class="dy" :style="[{ color: item.color }]">{{ item.val || 0 }}%</p>
      </div>
    </div>
    <Aypm />
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { noDataOption } from "../daPing/components/noDataOption";
import { option } from "./pieChart";
import { useMain } from "@/store";
import _ from "lodash";
import Aypm from "./aypm.vue";

const dyLeftBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>();
let myChart: echarts.ECharts;
const mainStore = useMain();
const flagData = ref();
// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    const djDyrs = state.pageList?.djDyrs;
    console.log("djDyrsslsubscribe", djDyrs);
    if (JSON.stringify(djDyrs) != JSON.stringify(flagData.value?.djDyrs)) {
      getSyzlList(djDyrs);
    }
  },
  { detached: false }
);
//溯源治理
const getSyzlList = (data?: any) => {
  const djDyrs = _.clone(data);
  flagData.value = {
    ...flagData.value,
    ...djDyrs,
  };
  console.log(" flagData.value", flagData.value);

  const result2 = {
    data: [
      {
        value: data?.shaoshu_cases || 15,
        name: "" + (data?.shaoshu_cases || 15) + "%",
      },
      {
        value: data?.zhiqian_success || 16,
        name: "" + (data?.zhiqian_success || 16) + "%",
      },
      {
        value: data?.benke__cases || 17,
        name: "" + (data?.benke__cases || 17) + "%",
      },
      {
        value: data?.female_cases || 20,
        name: "" + (data?.female_cases || 20) + "%",
      },
    ],
  };

  const names: any = []; // X轴坐标名称
  const zajq: any = [];

  // eslint-disable-next-line array-callback-return
  result2.data?.map((item: any) => {
    names.push(item.name);
    zajq.push(item.value);
  });

  // option.angleAxis.data = names;

  option.series[4].data = result2.data;

  if (myChart) myChart.setOption(option, true);
};

const dyrs = computed(() => {
  return [
    {
      name: "诉前调解成功分流率",
      val: flagData.value?.organ,
      color: "#258CFF",
    },
    {
      name: "一审裁判案件被改判发回重南率",
      val: flagData.value?.court,
      color: "#FFEA59",
    },
    {
      name: "生效案件被改判发回重审率",
      val: flagData.value?.bailiff,
      color: "#01E4FF",
    },
    {
      name: "司法赔偿率",
      val: flagData.value?.bailiff,
      color: "#95F059",
    },
  ];
});

const drawChart = () => {
  if (document.getElementById("dyLeftEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("dyLeftEchart")!;
      myChart = echarts.init(chartDom);
      myChart.setOption(option);
      getSyzlList();
      window.onresize = function () {
        if (dyLeftBox.value) {
          chartHeight.value = `${dyLeftBox.value!.offsetHeight}px`;
        }
        myChart.resize();
      };
      window.addEventListener("resize", () => {
        if (dyLeftBox.value)
          chartHeight.value = `${dyLeftBox.value!.offsetHeight}px`;
        if (myChart) {
          myChart.resize();
        }
      });
    }, 1000);
  }
};
onMounted(() => {
  drawChart();
  chartHeight.value = `${dyLeftBox.value!.offsetHeight - 10}px`;
});
</script>

<style scoped lang="scss">
.dj-left {
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(/src/assets/images/card-bg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 15px 16px 27px 9px;
  box-sizing: border-box;

  width: 420px;
  overflow: hidden;
  .left-title {
    background-image: url(/src/assets/images/dj-title.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 32px;
    width: 100%;
    div {
      font-size: 21px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #f6f9fe;
      text-shadow: 1px 2px 0px rgba(22, 22, 19, 0.27);
      letter-spacing: 3px;
      background: linear-gradient(0deg, #e6f0c1 0%, #fdfff6 50%, #f6f9fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-left: 40px;
    }
  }

  .dyfl {
    padding: 0 30px 0 26px;
    box-sizing: border-box;
    margin-top: -36px;
    margin-bottom: 36px;
    > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      span {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .color-box {
        width: 12px;
        height: 12px;
        margin-right: 20px;
        display: inline-block;
      }
    }

    .dy {
    }
  }
  .yjqk-chart {
    width: 400px;
    position: relative;
    height: 320px;
    margin-top: -20px;
    #dyLeftEchart {
      position: absolute;
      left: -8px;
      width: 100%;
      height: 100%;
    }
  }
  .yjqk-bar-chart {
    width: 440px;
    // margin-top: -50px;
    position: relative;

    height: 272px;

    #dyLeftBarEchart {
      position: absolute;
      left: -8px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
