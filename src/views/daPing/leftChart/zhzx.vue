<template>
  <div class="zhzx-box" ref="jqysBox">
    <ModelTitle model-title="智慧执行"></ModelTitle>
    <div class="legend-box">
      <div v-for="(item, i) in option.legend?.data" :key="i">
        <span class="legend" :class="'legend' + i"></span>
        {{ item }}
      </div>
    </div>
    <div
      id="zhzxEchart"
      :style="{ height: chartHeight1 }"
      class="qwyc-chart"
    ></div>
    <div class="xAxis-box">
      <div v-for="(item, i) in xAxisData" :key="i">
        {{ item.name }} :<span class="num">{{ item.value }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from "vue";
import ModelTitle from "../components/modelTitle.vue";
import * as echarts from "echarts";
import { noDataOption } from "../components/noDataOption";
const chartHeight1 = ref<string>("250px");
const jqysBox = ref<ComponentPublicInstance<HTMLDivElement>>();
let myChart1: echarts.ECharts;
let myChart2: echarts.ECharts;
let myChart: echarts.ECharts;
const bfbArr = ref([]);
const xAxisData = ref([
  {
    name: "执行完毕率",
    value: 0,
  },
  {
    name: "首执案件终本率",
    value: 0,
  },
  {
    name: "执行的到位率",
    value: 0,
  },
]);
let option = {
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(1, 13, 19, 0.5)",
    borderWidth: 0,
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
    textStyle: {
      color: "rgba(212, 232, 254, 1)",
      // fontSize: fontChart(0.24),
    },
    confine: true,
  },
  grid: {
    top: "25%",
    left: "5%",
    right: "5%",
    bottom: "8%",
    containLabel: true,
  },
  legend: {
    data: ["收案数", "结案数", "结案率"],
    show: false,
  },
  xAxis: {
    type: "category",
    data: [],
    axisLine: {
      show: true,
      lineStyle: {
        color: "#ffffff",
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontFamily: "Microsoft YaHei",
        color: "transparent",
      },
    },
  },

  yAxis: {
    name: "单位(%)",
    nameTextStyle: {
      color: "#ffffff",
      fontFamily: "Alibaba PuHuiTi",
      fontSize: 14,
      fontWeight: 600,
      padding: [10, 0, 0, -30],
    },
    nameGap: 25, // 表现为上下位置
    type: "value",
    //max:'5000',
    axisLine: {
      show: true,
      lineStyle: {
        color: "#ffffff",
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgb(255, 255, 255,0.16)",
      },
    },
    axisLabel: {
      textStyle: {
        fontFamily: "Microsoft YaHei",
        color: "#ffffff",
        fontSize: 12,
      },
    },
  },
  series: [
    {
      name: "收案数",
      type: "bar",
      barWidth: "9",
      color: "#258CFF",
      data: [3000, 2000, 1500, 2500],
    },

    {
      name: "结案数",
      type: "bar",
      barWidth: "9",
      color: "#FFEA59",
      data: [4000, 3800, 4200, 3800],
    },

    {
      name: "结案率",
      type: "bar",
      barWidth: "9",
      color: "#59E2CB",
      data: [2200, 2800, 3800, 2900],
    },
  ],
};
const getYjListData = () => {
  const data = [
    [61, 61, 61, 61],
    [83, 83, 83, 83],
    [58, 58, 58, 58],
  ];
  let arr = [];
  const newSeries = option.series;

  const total = data.reduce(
    (acc, curr) => acc + curr.reduce((a, b) => a + b, 0),
    0
  );

  // xAxisData
  const xAxisDataNew = xAxisData.value;
  data.forEach((item, i) => {
    newSeries[i].data = item;
    arr = new Array(item.length).fill("智慧执行");
    const sum = item.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    xAxisDataNew[i].value = ((sum / total) * 100).toFixed(2);
  });
  console.log("item", xAxisDataNew);
  xAxisData.value = xAxisDataNew;
  option.series = newSeries;
  option.xAxis.data = arr;
  if (myChart1) myChart1.setOption(option, true);
};

const drawChart = () => {
  if (document.getElementById("zhzxEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("zhzxEchart")!;
      myChart1 = echarts.init(chartDom);
      // option.xAxis[0].data = sevenDay.value;
      myChart1.setOption(option, true);
      myChart1.on("legendselectchanged", (params) => {
        // 监听图例选择变化事件
        console.log("legendselectchanged", params); // params 中包含选中的图例信息
      });
      window.onresize = function () {
        console.log("jqysBox.value1", jqysBox.value);

        if (jqysBox.value)
          chartHeight1.value = `${jqysBox.value!.offsetHeight / 3 - 90}px`;
        myChart1.resize();
      };
      window.addEventListener("resize", () => {
        console.log("jqysBox.value", jqysBox.value);
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
  getYjListData();
});
</script>

<style scoped lan="scss">
.zhzx-box {
  .legend-box {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-top: 26px;
    margin-bottom: -47px;
    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ecf0ff;
      .legend {
        width: 10px;
        height: 10px;
        display: inline-block;
        margin-right: 4px;
        margin-left: 12px;
      }
      .legend0 {
        border: 1px solid #3681ff;
        background: linear-gradient(0deg, #00a4f9 0%, rgba(15, 53, 85, 0) 100%);
      }
      .legend1 {
        border: 1px solid #ffd736;
        background: linear-gradient(0deg, #e0b70c 0%, rgba(16, 52, 81, 0) 100%);
      }
      .legend2 {
        border: 1px solid #36eaff;
        background: linear-gradient(0deg, #15daca 0%, rgba(15, 53, 84, 0) 100%);
      }
    }
  }
  .xAxis-box {
    width: 108%;
    font-size: 10px;
    margin-left: -1%;
    margin-top: -30px;
    transform: scale(0.8);
    font-family: PingFang SC;
    font-weight: bold;
    color: #ecf0ff;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    .num {
      display: inline-block;
      margin-left: 10px;
    }
  }
}
</style>
