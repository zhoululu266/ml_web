<!-- 预警情况 -->
<template>
  <div class="center-bt-box">
    <div ref="yjqkBox" class="yjqkContainer">
      <ModelTitle :model-title="title" />
      <div
        id="yjqkEchart"
        class="yjqk-chart"
        :style="{ height: chartHeight }"
      ></div>
    </div>
    <div class="pt-box">
      <div @click="jumpRmtj">
        <div class="tj"></div>
        <p>人民调解平台链接</p>
      </div>
      <div>
        <div class="yzs"></div>
        <p>一站式平台链接</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ComponentPublicInstance } from "vue";
import ModelTitle from "../components/modelTitle.vue";
import * as echarts from "echarts";

import moment from "moment";
import { noDataOption } from "../components/noDataOption";
import { useMain } from "@/store";

const mainStore = useMain();

// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    // console.log("走访数量-------", state.pageList?.zfs);

    const zfs = state.pageList?.zfs;
    getList(zfs);
  },
  { detached: false }
);
const jumpRmtj = () => {
  window.open("http://tiaojie.court.gov.cn/", "_blank");
};
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

const title = ref<string>("辖区案件数");
const yjqkBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>();
let myChart: echarts.ECharts;

const totalCount = ref<number[] | any>([]);
const chartObj = ref<listType>({});

onMounted(() => {
  chartHeight.value = `${yjqkBox.value!.offsetHeight - 40}px`;
  setTimeout(() => {
    const chartDom = document.getElementById("yjqkEchart")!;
    myChart = echarts.init(chartDom);
    // 图例点击方法 点击哪个显示哪个 其他隐藏
    myChart.on("legendselectchanged", (params: any) => {
      const option: any = myChart.getOption();
      const select_key = Object.keys(params.selected);
      if (!params.selected[params.name]) {
        select_key.forEach((res) => {
          option.legend[0].selected[res] = !params.selected[res];
        });
        // 全部显示和单个显示的折线变化
        const isAllSelected = Object.values(params.selected).every(
          (item) => item === false
        );
        if (isAllSelected) {
          option.series[0].data = totalCount.value;
        } else {
          option.series[0].data = chartObj.value[params.name];
        }
      } else {
        // eslint-disable-next-line array-callback-return
        select_key.forEach((res) => {
          option.legend[0].selected[res] = false;
        });
        option.legend[0].selected[params.name] = true;
        // 全部显示和单个显示的折线变化
        const isAllSelected = Object.values(params.selected).every(
          (item) => item === false
        );
        if (isAllSelected) {
          option.series[0].data = totalCount.value;
        } else {
          option.series[0].data = chartObj.value[params.name];
        }
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
    data: zfs,
  };
  if (result2.code === 200) {
    const names: any = []; // X轴坐标名称
    const zajq: any = [];

    totalCount.value = [];
    // eslint-disable-next-line array-callback-return
    result2.data &&
      result2.data?.length > 0 &&
      result2.data.map((item: chartListType) => {
        names.push(item.name);
        zajq.push(item.case_number);
      });

    chartObj.value = {
      辖区案件数: zajq,
    };

    yjqkOption.xAxis.data = names;

    yjqkOption.series[0].data = zajq;

    if (myChart) myChart.setOption(yjqkOption, true);
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
  legend: {
    show: false,
    // icon: "circle",
    // top: 16,
    // right: 0,
    // itemGap: 12,
    // itemHeight: 6,
    // itemWidth: 6,
    // textStyle: {
    //   color: "rgba(255, 255, 255, 0.7)",
    // },
  },
  grid: {
    left: "52",
    right: "10",
    top: "25",
    bottom: "20",
  },
  xAxis: {
    type: "category",
    axisLabel: {
      color: "#BEE1FF",
      interval: 0,
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
    max: (value: { max: number }) => {
      return value.max + Math.ceil(value.max / 6);
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: "rgba(119,202,255,0.1)",
      },
    },
  },
  series: [
    {
      name: "辖区案件数",
      type: "bar",
      barWidth: "14",
      stack: "total",
      showBackground: true,
      //   backgroundStyle: {
      //     color: "rgba(6, 112, 160, 0.1)",
      //     shadowColor: "rgba(6, 112, 160, 1)",
      //     shadowBlur: 10,
      //   },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#B8E7F0" },
          { offset: 0.1, color: "#199BB7" },
          { offset: 0.5, color: "#199BB7" },
          { offset: 1, color: "#199BB7" },
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
  background-size: 50% 100%;
  background-position: left;
  margin-left: 20px;
}
.center-bt-box {
  width: 100%;
  height: 88%;
  display: flex;
  flex-direction: row;
}
.yjqkContainer {
  height: 100%;
  width: 110%;
  font-family: Source Han Sans CN;
  padding: 0 6px 0 0;
}
.pt-box {
  display: flex;
  flex-direction: column;
  width: 14%;
  margin-top: 5%;
  align-items: center;

  > div {
    cursor: pointer;
    background-image: url("@/assets/images/pt-bg.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 108px 120px;
    width: 108px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 6%;
  }
  .tj {
    background-image: url("@/assets/images/tj.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 47px;
    height: 47px;
    margin-top: 6%;
  }
  .yzs {
    background-image: url("@/assets/images/yzs.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 47px;
    height: 47px;
    margin-top: 6%;
  }
  p {
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    margin-top: -11px;
  }
}
</style>
