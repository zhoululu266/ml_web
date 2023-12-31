<template>
  <div class="ajb-box" ref="ajbBox">
    <div class="legend-box">
      <div v-for="(item, i) in option.legend?.data" :key="i">
        <span class="legend" :class="'legend' + i"></span>
        {{ item }}
      </div>
    </div>
    <div
      id="ajbEchart"
      :style="{ height: chartHeight1 }"
      class="qwyc-chart"
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
const ajb = mainStore.getPageList()?.ajb;
const xAxisData = ref([]);
// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    const ajb = state.pageList?.ajb;
    tableData.value = ajb;

    xAxisData.value = [
      {
        name: "结收比",
        value: ajb?.zxwbl || 0,
      },
      {
        name: "案件比",
        value: ajb?.szajzbl || 0,
      },
    ];
    getYjListData([ajb?.sas, ajb?.jas, ajb?.jsl]);
  },
  { detached: false }
);

const chartHeight1 = ref<string>("180px");
const ajbBox = ref<ComponentPublicInstance<HTMLDivElement>>();
let myChart1: echarts.ECharts;
let myChart2: echarts.ECharts;
let myChart: echarts.ECharts;
const bfbArr = ref([]);

const tableData = ref({
  sas: ajb?.sas || [],
  jas: ajb?.jas || [],
  jsl: ajb?.jsl || [],
});

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
    top: "15%",
    left: "5%",
    right: "5%",
    bottom: "8%",
    containLabel: true,
  },
  legend: {
    data: ["结收比", "案件比"],
    show: false,
  },
  xAxis: {
    type: "category",
    data: ["结收比", "案件比"],
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
        color: "#ffffff",
      },
    },
  },

  yAxis: {
    name: "单位(%)",
    nameTextStyle: {
      color: "#ffffff",
      fontFamily: "Alibaba PuHuiTi",
      fontSize: 12,
      fontWeight: 500,
      padding: [10, 0, 0, -30],
    },
    nameGap: 10, // 表现为上下位置
    type: "value",
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
      barWidth: "15",
      barCategoryGap: "10%", // 类目间的柱形距离
      barGap: 0.5, // 同一类目下柱子的间距
      color: "#258CFF",
      data: [130, 80, 150] || tableData.value.sal,
    },

    {
      name: "结案数",
      type: "bar",
      barWidth: "15",
      barCategoryGap: "10%", // 类目间的柱形距离
      barGap: 0.5, // 同一类目下柱子的间距
      color: "#FFEA59",
      data: [40, 30, 50] || tableData.value.jas,
    },

    // {
    //   name: "结案率",
    //   type: "bar",
    //   barWidth: "15",
    //   barCategoryGap: "10%", // 类目间的柱形距离
    //   barGap: 0.5, // 同一类目下柱子的间距
    //   color: "#59E2CB",
    //   data: [2200, 2800, 3800, 2900] || tableData.value.jal,
    // },
  ],
};
const getYjListData = () => {
  // console.log("getYjListData", data);

  const data = [
    [61, 61],
    [83, 83],
    [56, 34],
  ];
  let arr = [];
  if (data && data?.length > 0) {
    const newSeries = option.series;
    option.series = newSeries;

    if (myChart1) myChart1.setOption(option, true);
  }
};

const drawChart = () => {
  if (document.getElementById("ajbEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("ajbEchart")!;
      myChart1 = echarts.init(chartDom);
      // option.xAxis[0].data = sevenDay.value;
      myChart1.setOption(option, true);
      myChart1.on("legendselectchanged", (params) => {
        // 监听图例选择变化事件
        //console.log("legendselectchanged", params); // params 中包含选中的图例信息
      });
      window.onresize = function () {
        //console.log("ajbBox.value1", ajbBox.value);

        if (ajbBox.value)
          chartHeight1.value = `${ajbBox.value!.offsetHeight}px`;
        myChart1.resize();
      };
      window.addEventListener("resize", () => {
        //console.log("ajbBox.value", ajbBox.value);
        if (ajbBox.value)
          chartHeight1.value = `${ajbBox.value!.offsetHeight}px`;
        if (myChart1) {
          myChart1.resize();
        }
      });
    }, 1000);
  }
};
onMounted(() => {
  drawChart();
  getYjListData(ajb ? [ajb?.sas, ajb?.jas, ajb?.jsl] : []);
});
</script>

<style scoped lan="scss">
.ajb-box {
  height: 100%;
  display: block;
  max-height: 200px;
  width: 50%;
  position: relative;
  padding-top: 20px;
  .legend-box {
    position: absolute;
    right: 0;
    top: -10px;
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-top: 10px;
    margin-bottom: 16px;
    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 12px;
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
}
</style>
