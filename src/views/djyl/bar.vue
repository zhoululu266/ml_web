<!-- 预警情况 -->
<template>
  <div
    id="djSpansEchart"
    class="djSpans-chart"
    :style="{ height: chartHeight }"
  ></div>
</template>
<script lang="ts" setup>
import { ComponentPublicInstance } from "vue";
import ModelTitle from "../components/modelTitle.vue";
import * as echarts from "echarts";

import moment from "moment";
import { axiosPost } from "@/utils";
import { noDataOption } from "../daPing/components/noDataOption";
import { useMain } from "@/store";

const mainStore = useMain();

// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    console.log("走访数量-------", state.pageList?.djSpajs);

    const djSpajs = state.pageList?.djSpajs;
    getList(djSpajs);
  },
  { detached: false }
);

interface listType {
  [key: string]: number[];
}
interface timeType {
  startTime: string;
  endTime: string;
}

interface chartListType {
  name: string;
  case_number: number | string;
}

const djSpansBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>("270px");
let myChart: echarts.ECharts;

const orgCode = ref<string>();
let times: timeType = {
  startTime: moment().format("YYYY-MM-DD"),
  endTime: moment().format("YYYY-MM-DD"),
};
const totalCount = ref<number[] | any>([]);
const chartObj = ref<listType>({});
const pollingTime = ref<string>("");

onMounted(() => {
  // chartHeight.value = `${djSpansBox.value!.offsetHeight - 40}px`;
  setTimeout(() => {
    const chartDom = document.getElementById("djSpansEchart")!;
    myChart = echarts.init(chartDom);
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

    getList(mainStore.getPageList()?.djSpajs);
  }, 1000);
});

/**
 * 获取警情趋势
 * @param code 组织机构code
 */
const getList = (djSpajs) => {
  const result2 = {
    code: 200,

    data: [
      {
        name: "1",
        djSpajs: "0",
        djSpajs1: "50",
      },
      {
        name: "2",
        djSpajs: "60",
        djSpajs1: "80",
      },
      {
        name: "3",
        djSpajs: "60",
        djSpajs1: "50",
      },
      {
        name: "4",
        djSpajs: "70",
        djSpajs1: "30",
      },
      {
        name: "5",
        djSpajs: "50",
        djSpajs1: "70",
      },
      {
        name: "6",
        djSpajs: "60",
        djSpajs1: "80",
      },
      {
        name: "7",
        djSpajs: "60",
        djSpajs1: "40",
      },
    ],
  };
  if (result2.code === 200) {
    const names: any = []; // X轴坐标名称
    const zajq: any = [];
    const zajq1: any = [];

    totalCount.value = [];
    // eslint-disable-next-line array-callback-return
    result2.data?.length > 0 &&
      result2.data.map((item: chartListType) => {
        names.push(item.name);
        zajq.push(item.djSpajs);
        zajq1.push(item.djSpajs1);
      });

    chartObj.value = {
      法律顾问走访数: zajq,
    };

    yjqkOption.xAxis.data = names;

    yjqkOption.series[0].data = zajq;
    yjqkOption.series[1].data = zajq1;
    if (myChart) myChart.setOption(yjqkOption, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
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
      return `<br/>${text}`;
    },
    backgroundColor: "rgba(187,230,245,0.19)",
    borderColor: "#7BC9FF",
    textStyle: {
      color: "#ffffff",
    },
  },
  color: ["#5BD2FF"],
  legend: {
    icon: "square",
    textStyle: {
      color: "#ffffff",
      fontSize: 10,
      fontFamily: "Source Han Sans CN",
    },
    left: "right",
    itemGap: 10,
    itemWidth: 6,
    itemHeight: 6,
    data: [
      {
        name: "全院",
        itemStyle: {
          color: " #FDC81E",
          borderWidth: 6,
        },
      },
      {
        name: "党员",
        itemStyle: {
          color: "#22C6FC",
          borderWidth: 6,
        },
      },
    ],
  },
  grid: {
    left: "30",
    right: "4",
    top: "25",
    bottom: "20",
  },
  xAxis: {
    type: "category",
    axisLabel: {
      fontSize: 10,
      fontFamily: "Microsoft YaHei",
      color: "#FFFFFF",
      // interval: 0,
    },
    axisLine: {
      lineStyle: {
        color: "rgba(117, 168, 202, 0.4)",
      },
    },
    axisTick: { show: false },
    data: [],
  },
  yAxis: {
    // show: false,
    type: "value",
    axisLabel: {
      color: "#BEE1FF",
    },
    axisLine: {
      color: "#0D97EB",
    },
    name: "案件数",
    nameTextStyle: {
      padding: [0, 0, -3, -10],
      color: "#ECF0FF",
      fontSize: 12,
    },
    max: (value: { max: number }) => {
      return value.max + Math.ceil(value.max / 6);
    },
    splitLine: {
      show: true,
      lineStyle: {
        // type: "dashed",
        color: "rgba(13, 151, 235,0.33)",
      },
    },
  },
  series: [
    {
      name: "全院",
      type: "bar",
      barWidth: "8",
      // stack: "total",
      barGap: "1px", // 四个数字分别为上右下左与原位置距离
      showBackground: false,
      yAxisIndex: 0,
      //   backgroundStyle: {
      //     color: "rgba(6, 112, 160, 0.1)",
      //     shadowColor: "rgba(6, 112, 160, 1)",
      //     shadowBlur: 10,
      //   },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#D6F79E" },
          { offset: 1, color: "#58D7A5" },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [],
    },
    {
      name: "党员",
      type: "bar",
      barWidth: "8",
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
<style lang="scss" scoped>
.title-circle {
  background-size: 40% 100%;
  background-position: left;
}
.djSpans-chart {
  width: 370px;
  margin-top: 30px;
}
.dj-Spans-Box {
  height: 270px;
  width: 370px;
  font-family: Source Han Sans CN;
  padding: 0 10px;
  margin-left: 4%;
}
</style>
