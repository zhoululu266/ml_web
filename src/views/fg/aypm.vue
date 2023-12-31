<template>
  <div>
    <ModelTitle model-title="案由排名"></ModelTitle>
    <div
      id="ajpmEchart"
      :style="{ height: chartHeight1 }"
      class="ajpm-chart"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from "vue";
import ModelTitle from "@/views/daPing/components/modelTitle.vue";
import * as echarts from "echarts";
import { noDataOption } from "@/views/daPing/components/noDataOption";
import { useMain } from "@/store";

const mainStore = useMain();
const zhzx = mainStore.getPageList()?.zhzx;

// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    const zhzx = state.pageList?.zhzx;

    getYjListData([zhzx?.sas, zhzx?.jas, zhzx?.jsl]);
  },
  { detached: false }
);

const chartHeight1 = ref<string>("350px");
const jqysBox = ref<ComponentPublicInstance<HTMLDivElement>>();
let myChart1: echarts.ECharts;
let myChart2: echarts.ECharts;
let myChart: echarts.ECharts;
let className = [
  "婚姻",
  "民间借贷",
  "交通事故",
  "贪污受贿",
  "徇私舞弊",
  "故意伤害",
  "寻隙滋事",
];
let defaultData = Array.from({ length: 7 }, () => 100);
let option = {
  grid: {
    left: "5%",
    right: "5%",
    bottom: "5%",
    top: "10%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "none",
    },
    formatter: function (params) {
      return (
        params[0].name +
        "<br/>" +
        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
        params[0].seriesName +
        " : " +
        params[0].value +
        "%"
      );
    },
  },

  xAxis: {
    type: "value",
    axisLabel: {
      color: "#fff",
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(0, 138, 255, 0.46)",
      },
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: [
    {
      type: "category",
      inverse: true,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff",
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(0, 138, 255, 0.46)",
        },
      },
      data: className,
    },
  ],
  series: [
    {
      name: "同比增长比例",
      type: "bar",
      zlevel: 1,
      label: {
        show: true,
        position: "right",
        distance: 3,
        formatter: function (data) {
          // 柱子顶部分隔线样式
          return [`{a0|}`];
        },
        rich: {
          a0: {
            height: 9,
            width: 4,
            backgroundColor: "#6FE3FF",
          },
        },
      },
      itemStyle: {
        normal: {
          barBorderRadius: 0,
          color: {
            type: "linear",
            colorStops: [
              {
                offset: 0,
                color: "#70E4FF",
              },
              {
                offset: 1,
                color: "#069AFF",
              },
            ],
          },
        },
      },
      barWidth: 9,
      emphasis: {
        disabled: true,
        focus: "none",
      },
      data: [],
    },
    {
      name: "背景",
      type: "bar",
      barWidth: 9,
      barGap: "-100%",
      data: defaultData,
      emphasis: {
        disabled: true,
        focus: "none",
      },
      itemStyle: {
        normal: {
          color: "rgba(12, 72, 167,0.33)",
          barBorderRadius: 0,
        },
      },
    },
  ],
};

const getYjListData = () => {
  const data = [30, 40, 30, 10, 50, 78, 34];
  if (data && data?.length > 0) {
    option.series[1].data = defaultData;
    option.series[0].data = data;
    if (myChart1) myChart1.setOption(option, true);
  }
};

const drawChart = () => {
  if (document.getElementById("ajpmEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("ajpmEchart")!;
      myChart1 = echarts.init(chartDom);
      // option.xAxis[0].data = sevenDay.value;
      myChart1.setOption(option, true);
      myChart1.on("legendselectchanged", (params) => {
        // 监听图例选择变化事件
        //console.log("legendselectchanged", params); // params 中包含选中的图例信息
      });
      window.onresize = function () {
        //console.log("jqysBox.value1", jqysBox.value);

        if (jqysBox.value)
          chartHeight1.value = `${jqysBox.value!.offsetHeight / 3 - 90}px`;
        myChart1.resize();
      };
      window.addEventListener("resize", () => {
        //console.log("jqysBox.value", jqysBox.value);
        if (jqysBox.value)
          chartHeight1.value = `${jqysBox.value!.offsetHeight / 3 - 90}px`;
        if (myChart1) {
          myChart1.resize();
        }
      });
    }, 1000);
  }
};
onMounted(() => {
  drawChart();
  getYjListData(zhzx ? [zhzx?.sas, zhzx?.jas, zhzx?.jsl] : []);
});
</script>

<style scoped></style>
