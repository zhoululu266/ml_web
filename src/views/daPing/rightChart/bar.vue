<!-- 预警情况 -->
<template>
  <div
    id="jdDfEchart"
    class="jdDf-chart"
    :style="{ height: chartHeight }"
  ></div>
</template>
<script lang="ts" setup>
import { ComponentPublicInstance } from "vue";
import ModelTitle from "../components/modelTitle.vue";
import * as echarts from "echarts";

import moment from "moment";
import { axiosPost } from "@/utils";
import { noDataOption } from "../components/noDataOption";
import { useMain } from "@/store";

const mainStore = useMain();

// 监听数据变化
// mainStore.$subscribe(
//   (_, state) => {
//     console.log("走访数量-------", state.pageList?.zfs);

//     const zfs = state.pageList?.zfs;
//     getList(zfs);
//   },
//   { detached: false }
// );

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

const jdDfBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>("160px");
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
  // chartHeight.value = `${jdDfBox.value!.offsetHeight - 40}px`;
  setTimeout(() => {
    const chartDom = document.getElementById("jdDfEchart")!;
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

    getList(mainStore.getPageList()?.zfs);
  }, 1000);
});

/**
 * 获取警情趋势
 * @param code 组织机构code
 */
const getList = (zfs) => {
  const result2 = {
    code: 200,

    data: [
      {
        name: "院领导",
        zfs: "0",
        zfs1: "50",
      },
      {
        name: "政治部",
        zfs: "60",
        zfs1: "80",
      },
      {
        name: "综合办公室",
        zfs: "60",
        zfs1: "50",
      },
      {
        name: "审判管理办公室",
        zfs: "70",
        zfs1: "30",
      },
      {
        name: "执行局",
        zfs: "50",
        zfs1: "70",
      },
      {
        name: "司法警察",
        zfs: "60",
        zfs1: "80",
      },
      {
        name: "诉讼服务中心",
        zfs: "60",
        zfs1: "40",
      },
      {
        name: "形式审判",
        zfs: "70",
        zfs1: "50",
      },
      {
        name: "民事审判",
        zfs: "50",
        zfs1: "60",
      },
      {
        name: "综合审判",
        zfs: "60",
        zfs1: "50",
      },
      {
        name: "下城子",
        zfs: "50",
        zfs1: "70",
      },
      {
        name: "穆棱环境资源审判",
        zfs: "60",
        zfs1: "50",
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
        zajq.push(item.zfs);
        zajq1.push(item.zfs1);
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
      return `${title}<br/>${text}`;
    },
    backgroundColor: "rgba(187,230,245,0.19)",
    borderColor: "#7BC9FF",
    textStyle: {
      color: "#DFEEFF",
    },
  },
  color: ["#5BD2FF"],
  legend: {
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
        name: "有报告",
        itemStyle: {
          color: " #FDC81E",
          borderWidth: 6,
        },
      },
      {
        name: "人均填报",
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
      lineStyle: {
        color: "rgba(13, 151, 235,0.33)", // 设置 x 轴线的颜色为红色
      },
    },
    name: "单位: %",
    nameTextStyle: {
      padding: [0, 0, 0, -20],
      color: "#ECF0FF",
      fontSize: 10,
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
      name: "有报告",
      type: "bar",
      barWidth: "3",
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
      name: "人均填报",
      type: "bar",
      barWidth: "3",
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

.jd-Df-Box {
  height: 100%;
  width: 74%;
  font-family: Source Han Sans CN;
  padding: 0 10px;
  margin-left: 4%;
}
</style>
