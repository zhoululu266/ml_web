<template>
  <div class="zhgl-bar-box">
    <div class="zhgl-bar-box-dis">
      <div>
        <div
          id="zhglBarEchart"
          class="jdDf-chart"
          :style="{ height: chartHeight }"
        ></div>
        <div class="bar-title">法官级别人数统计</div>
      </div>
      <div>
        <div
          id="zhglBarEchart1"
          class="jdDf-chart"
          :style="{ height: chartHeight }"
        ></div>
        <div class="bar-title">法官助力及书记员人数统计</div>
      </div>
    </div>
    <div class="zhgl-bar-box-dis">
      <div>
        <div
          id="zhglBarEchart2"
          class="jdDf-chart"
          :style="{ height: chartHeight }"
        ></div>
        <div class="bar-title">综合行政人数统计</div>
      </div>
      <div>
        <div
          id="zhglBarEchart3"
          class="jdDf-chart"
          :style="{ height: chartHeight }"
        ></div>
        <div class="bar-title">法警人数统计</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance } from "vue";
import * as echarts from "echarts";

import moment from "moment";
import { axiosPost } from "@/utils";
import { noDataOption } from "../../components/noDataOption";

interface listType {
  [key: string]: number[];
}
interface timeType {
  startTime: string;
  endTime: string;
}

interface chartListType {
  name: string;
  zfs: number | string;
}

const jdDfBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>("136px");
let myChart: echarts.ECharts;
let myChart1: echarts.ECharts;
let myChart2: echarts.ECharts;
let myChart3: echarts.ECharts;
const orgCode = ref<string>();
let times: timeType = {
  startTime: moment().format("YYYY-MM-DD"),
  endTime: moment().format("YYYY-MM-DD"),
};
const totalCount = ref<number[] | any>([]);
const chartObj = ref<listType>({});
const pollingTime = ref<string>("");

onMounted(() => {
  // chartHeight.value = `${jdDfBox.value!.offsetHeight - 40}px`;
  setTimeout(() => {
    const chartDom = document.getElementById("zhglBarEchart")!;
    const chartDom1 = document.getElementById("zhglBarEchart1")!;
    const chartDom2 = document.getElementById("zhglBarEchart2")!;
    const chartDom3 = document.getElementById("zhglBarEchart3")!;
    myChart = echarts.init(chartDom);
    myChart1 = echarts.init(chartDom1);
    myChart2 = echarts.init(chartDom2);
    myChart3 = echarts.init(chartDom3);
    // 图例点击方法 点击哪个显示哪个 其他隐藏
    myChart.on("legendselectchanged", (params: any) => {
      const option: any = myChart.getOption();
      const select_key = Object.keys(params.selected);
      if (!params.selected[params.name]) {
        select_key.forEach((res) => {
          option.legend[0].selected[res] = !params.selected[res];
        });

        option.series[0].data = chartObj.value[params.name];
      } else {
        // eslint-disable-next-line array-callback-return
        select_key.forEach((res) => {
          option.legend[0].selected[res] = false;
        });
        option.legend[0].selected[params.name] = true;

        option.series[0].data = chartObj.value[params.name];
      }
      myChart.setOption(option);
    });
    myChart1.on("legendselectchanged", (params: any) => {
      const option: any = myChart1.getOption();
      const select_key = Object.keys(params.selected);
      if (!params.selected[params.name]) {
        select_key.forEach((res) => {
          option.legend[0].selected[res] = !params.selected[res];
        });

        option.series[0].data = chartObj.value[params.name];
      } else {
        // eslint-disable-next-line array-callback-return
        select_key.forEach((res) => {
          option.legend[0].selected[res] = false;
        });
        option.legend[0].selected[params.name] = true;

        option.series[0].data = chartObj.value[params.name];
      }
      myChart1.setOption(option);
    });
    myChart2.on("legendselectchanged", (params: any) => {
      const option: any = myChart2.getOption();
      const select_key = Object.keys(params.selected);
      if (!params.selected[params.name]) {
        select_key.forEach((res) => {
          option.legend[0].selected[res] = !params.selected[res];
        });

        option.series[0].data = chartObj.value[params.name];
      } else {
        // eslint-disable-next-line array-callback-return
        select_key.forEach((res) => {
          option.legend[0].selected[res] = false;
        });
        option.legend[0].selected[params.name] = true;

        option.series[0].data = chartObj.value[params.name];
      }
      myChart2.setOption(option);
    });
    myChart3.on("legendselectchanged", (params: any) => {
      const option: any = myChart3.getOption();
      const select_key = Object.keys(params.selected);
      if (!params.selected[params.name]) {
        select_key.forEach((res) => {
          option.legend[0].selected[res] = !params.selected[res];
        });

        option.series[0].data = chartObj.value[params.name];
      } else {
        // eslint-disable-next-line array-callback-return
        select_key.forEach((res) => {
          option.legend[0].selected[res] = false;
        });
        option.legend[0].selected[params.name] = true;

        option.series[0].data = chartObj.value[params.name];
      }
      myChart3.setOption(option);
    });
    getList();
  }, 1000);
});

/**
 * 获取警情趋势
 * @param code 组织机构code
 */
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
      {
        name: "法官级别人数统计",
        zfs: "40",
        zfs1: "50",
      },
      {
        name: "法官助力及书记员人数统计",
        zfs: "58",
        zfs1: "80",
      },
      {
        name: "综合行政人数统计",
        zfs: "70",
        zfs1: "50",
      },
      {
        name: "法警人数统计",
        zfs: "110",
        zfs1: "30",
      },
    ],
  };
  if (result2.code === 200) {
    const names: any = []; // X轴坐标名称
    const zajq: any = [];
    const zajq1: any = [];

    totalCount.value = [];
    // eslint-disable-next-line array-callback-return
    result2.data.map((item: chartListType) => {
      names.push(item.name);
      zajq.push(item.zfs);
      zajq1.push(item.zfs1);
    });

    chartObj.value = {
      法律顾问走访数: zajq,
    };

    yjqkOption.xAxis.data = names;

    yjqkOption.series[0].data = zajq;

    if (myChart) myChart.setOption(yjqkOption, true);
    if (myChart1) myChart1.setOption(yjqkOption, true);
    if (myChart2) myChart2.setOption(yjqkOption, true);
    if (myChart3) myChart3.setOption(yjqkOption, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
  // })
  // .catch(() => {
  //   if (myChart) myChart.setOption(noDataOption, true);
  // });
};

const yjqkOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: (
      val: { marker: string; seriesName: string; value: number; name: string }[]
    ) => {
      let text = "";
      // eslint-disable-next-line @typescript-eslint/no-shadow
      let title = "";
      val.forEach((item) => {
        // "" 为背景柱子 提示款里不显示
        if (item.seriesName !== "") {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          title = item.name;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          text += `${item.marker}${item.seriesName}：${item.value}<br/>`;
        }
      });
      return `${title}<br/>${text}`;
    },
    backgroundColor: "rgba(187,230,245,0.19)",
    borderColor: "#7BC9FF",
    textStyle: {
      color: "#DFEEFF",
    },
  },
  color: ["#5BD2FF"],

  grid: {
    left: "30",
    right: "4",
    top: "25",
    bottom: "20",
  },
  xAxis: {
    type: "category",
    axisLabel: {
      show: false,
      fontSize: 6,
      fontFamily: "Microsoft YaHei",
      color: "#FFFFFF",
      interval: 0,
    },
    axisLine: {
      show: false, // 这里设置线的显示
    },
    axisTick: { show: false },
    data: [],
  },
  yAxis: {
    // show: false,
    type: "value",
    axisLabel: {
      color: "#50B8FA",
    },
    axisLine: {
      lineStyle: {
        color: "rgba(13, 151, 235,0.33)", // 设置 x 轴线的颜色为红色
      },
    },

    max: (value: { max: number }) => {
      return value.max + Math.ceil(value.max / 6);
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "rgba(13, 151, 235,0.33)",
      },
    },
  },
  series: [
    {
      name: "统计",
      type: "bar",
      barWidth: "11",
      stack: "total",
      showBackground: false,
      //   backgroundStyle: {
      //     color: "rgba(6, 112, 160, 0.1)",
      //     shadowColor: "rgba(6, 112, 160, 1)",
      //     shadowBlur: 10,
      //   },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#6BE5E8 " },
          { offset: 1, color: "#49ACFF " },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [],
    },
  ],
};
</script>

<style scoped lang="scss">
.zhgl-bar-box {
  display: flex;
  flex-direction: column;

  .zhgl-bar-box-dis {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    > div {
      display: flex;
      flex-direction: column;
      width: 45%;
      .bar-title {
        width: 100%;
        text-align: left;
        font-size: 10px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        margin-left: 15px;
        margin-top: -8px;
      }
    }
    .jdDf-chart {
      width: 100%;
    }
  }
}
</style>
