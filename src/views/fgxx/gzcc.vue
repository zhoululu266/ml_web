<template>
  <div class="gzcg">
    <SjTitle title="工作成果" />
    <div ref="dyLeftBox" class="yjqk-chart">
      <div id="dyLeftEchart" :style="{ height: chartHeight }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { noDataOption } from "../daPing/components/noDataOption";

import SjTitle from "@/views/daPing/components/sj-title.vue";
const dyLeftBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>();
let myChart: echarts.ECharts;
const hexToRgb = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  // eslint-disable-next-line no-param-reassign
  console.log("hex", hex);

  hex = hex!.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");

  /* eslint-disable indent */
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
  /* eslint-enable */
};

let xData = ["一季度", "二季度", "三季度", "四季度"];

const yData = [
  {
    name: "每日总量",
    data: [100, 120, 240, 210],
  },
  {
    name: "累计总量",
    data: [60, 80, 100, 110, 80],
  },
  {
    name: "累计总量1",
    data: [6, 180, 10, 100, 30],
  },
];

const xAxisFn = (xData) => {
  return [
    {
      type: "category",
      boundaryGap: false,
      data: xData,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        textStyle: {
          fontSize: "14",
          fontFamily: "PingFang SC",
          color: "#F0F0F0",
        },
      },
    },
  ];
};

const colorList = ["#497A4A", "#4792BD", "#0FDDF7"];

let option = {
  series: yData.map((item, index) => {
    const rgb = hexToRgb(colorList[index]);
    const end = `rgba(${rgb.r},${rgb.g},${rgb.b},0)`;
    return {
      name: item.name,
      data: item.data,
      type: "line",
      smooth: true,
      showSymbol: false,
      // symbol: 'none',
      symbolSize: 10,
      emphasis: { focus: "series" },
      animationDuration: 2500,
      animationEasing: "cubicInOut",
      lineStyle: {
        width: 2,
        color: colorList[index],
      },
      areaStyle: {
        width: 4,
        opacity: 0.25,
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0.389, color: colorList[index] },
            { offset: 1, color: end },
          ],
          global: false,
        },
      },
    };
  }),
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line",
    },

    // formatter: '{a}: {c}',
    textStyle: {
      color: "#fafafa",
    },
    borderColor: "transparent",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    extraCssText: "backdrop-filter: blur(6px);",
  },
  grid: {
    top: "10%",
    left: "2%",
    right: "2.5%",
    bottom: "0%",
    containLabel: true,
  },

  xAxis: xAxisFn(xData),
  yAxis: [
    {
      name: "单位(%)",
      nameTextStyle: {
        color: "#ffffff",
        fontFamily: "Alibaba PuHuiTi",
        fontSize: 14,

        padding: [10, 0, 0, -30],
      },
      type: "value",
      axisLabel: {
        textStyle: {
          fontSize: "14",
          fontFamily: "PingFang SC",
          fontWeight: "bold",
          color: "#F0F0F0",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "RGBA(19, 77, 118, 1)",
        },
      },
    },
  ],
};
const getList = (code?: string) => {
  //   const url = `${$config.patrolApi}/statisticsManage/jqOverview`;
  //   const params = {
  //     orgCode: code,
  //     // startTime: "2022-01-01 00:00:00",
  //     // endTime: "2022-12-30 23:59:59",
  //     startTime: `${times.startTime} 00:00:00`,
  //     endTime: `${times.endTime} 23:59:59`,
  //   };
  //   axiosPost(url, params)
  //     .then((result2) => {
  const result2 = {
    code: 200,
    data: [
      { value: 6, name: "XXXXXX" },
      { value: 6, name: "法庭党支部" },
      { value: 6, name: "法警党支部" },
      { value: 10, name: "机关党支部" },
    ],
  };
  if (result2.code === 200) {
    const names: any = []; // X轴坐标名称
    const zajq: any = [];

    // eslint-disable-next-line array-callback-return
    result2.data.map((item: any) => {
      names.push(item.name);
      zajq.push(item.value);
    });

    // option.angleAxis.data = names;

    // option.series[4].data = result2.data;

    if (myChart) myChart.setOption(option, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
};
const drawChart = () => {
  if (document.getElementById("dyLeftEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("dyLeftEchart")!;
      myChart = echarts.init(chartDom);
      myChart.setOption(option);
      getList();
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
});
</script>

<style scoped lang="scss">
.gzcg {
  width: 600px;
  height: 413px;
  margin-right: 20px;
  background-image: url(/src/assets/images/fgxx.card1.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  box-sizing: border-box;
  .yjqk-chart {
    width: calc(100% - 40px);
    position: relative;
    height: calc(100% - 100px);
    padding: 20px;
    box-sizing: border-box;
    #dyLeftEchart {
      position: absolute;

      width: 100%;
      height: 100%;
    }
  }
}
</style>
