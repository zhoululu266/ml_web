<template>
  <div class="zhsp-box">
    <div class="ajxg">
      <ModelTitle model-title="案件效果" />
      <div ref="jqysBox" class="line-box">
        <template v-if="bfbArr?.length > 0">
          <div
            v-for="(item, i) in bfbArr"
            :key="i"
            :style="`height:${(bfbArr?.length - i) * 18 + 'px'}; width:${
              27.5 + (i + 1) * 1 + 'px'
            }; margin-left: -${6 + (i + 1) * 1 + 'px'}`"
          >
            <span class="bfb">{{ item.bfb }}</span>
          </div>
        </template>
      </div>
      <div
        id="qwycEchart"
        :style="{ height: chartHeight1 }"
        class="qwyc-chart"
      ></div>
    </div>
    <div class="ftbaqk">
      <Ftbaqk />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from "vue";
import ModelTitle from "@/views/daPing/components/modelTitle.vue";
import * as echarts from "echarts";
import { noDataOption } from "@/views/daPing/components/noDataOption";
import upImg from "@/assets/images/up-icon.png";
import downImg from "@/assets/images/down-icon.png";
import { useMain } from "@/store";
import Ftbaqk from "./ftbaqk.vue";

const mainStore = useMain();
//智慧审批
const chartHeight1 = ref<string>("340px");
const jqysBox = ref<ComponentPublicInstance<HTMLDivElement>>();
let myChart1: echarts.ECharts;
const bfbArr = ref([]);

const optionData = ref([]); //图表数据
const qwycOption = {
  legend: {
    left: "center",
    bottom: "-30",
    itemWidth: 13,
    itemHeight: 10,
    itemGap: 20,
    padding: [60, 60],
    borderRadius: 1,
    itemStyle: {
      borderWidth: 2,
    },
    textStyle: {
      rich: {
        white: {
          fontSize: 10,
          padding: [-8, 0, 0, 0],
        },
        blue: {
          padding: [3, 8, 0, -10],
        },
        down: {
          backgroundColor: {
            image: downImg,
          },
          verticalAlign: "top",
          height: 17,
          width: 10,
          padding: [3, 0, -6, 0],
          lineHeight: 0,
        },
        up: {
          backgroundColor: {
            image: upImg,
          },
          verticalAlign: "top",
          height: 14,
          width: 10,
          lineHeight: 6,
        },
      },
      color: "#fff", // 设置图例的文字颜色为绿色
      fontSize: 14, // 设置图例的文字字体大小为 14 像素
      fontWeight: "bold", // 设置图例的文字字体粗细为粗体
      padding: [0, 0, 0, 10],
    },
    selectedMode: false, // 禁止图例被点击
  },
  series: [],
};
const seriesPieSet = {
  type: "pie",
  hoverAnimation: false, //鼠标移入变大,
  startAngle: 180,
  left: 140,
  top: -124,
  progress: {
    show: true,
    width: 20,
    roundCap: true,
  },
  axisLine: {
    roundCap: true,
    lineStyle: {
      width: 10,
    },
  },
  //   radius: ["50%", "67%"],
  //   center: ["50%", "60%"],
  // layoutSize: "50%",
  label: {
    normal: {
      show: false,
      position: "center",
    },
    emphasis: {
      show: false,
      textStyle: {
        fontSize: "10",
        fontWeight: "bold",
      },
    },
  },
  labelLine: {
    normal: {
      show: true,
    },
  },
  data: [],
};
const getYjListData = (zhsp: any) => {
  const data = [
    { name: "案访比       ", value: 300 },
    { name: "调解率    ", value: 70 || 0 },
    { name: "总收案同比", value: 80 || 0 },
    {
      name: "民事裁判申请执行率",
      value: 100 || 0,
    },
  ];
  let total = 0;
  data.forEach((item) => {
    total += item.value;
  });
  const colorArr = [
    ["#CA51FF", "#6028FF"],
    ["#006AF3", "#25ABFC"],
    ["#D6F79E", "#58D7A5"],
    ["#FFBC86", "#FF6E3C"],
    ["#FF9E91", "#F83C3E"],
    ["#FFD34B", "#FFEE84"],
  ];
  const newArr = [];
  data.forEach((item, index) => {
    data[index].bfb = `${new Number((item.value / total) * 100).toFixed(0)}%`;
    newArr.push({
      ...seriesPieSet,
      ...{
        // name: item.name,
        radius: [`${30 + index * 20}%`, `${34 + index * 20}%`],
        center: ["10%", "50%"],
        data: [
          {
            value: total / 2,
            label: { show: false },
            itemStyle: {
              color: "none",
            },
          },
          {
            value: total - item.value,
            label: { show: false },
            itemStyle: {
              color: "none",
            },
          },
          {
            value: item.value,
            name: item.name,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0.5, 0.9, 1, [
                {
                  offset: 0,
                  color: colorArr[data?.length - 1 - index][0],
                },
                {
                  offset: 1,
                  color: colorArr[data?.length - 1 - index][1],
                },
              ]),
            },
          },
        ],
      },
    });
  });
  bfbArr.value = data.reverse();
  console.log("data", data);
  console.log("newArr", newArr);

  optionData.value = data;
  qwycOption.series = newArr;
  if (myChart1) myChart1.setOption(qwycOption, true);
};

const drawChart = () => {
  if (document.getElementById("qwycEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("qwycEchart")!;
      myChart1 = echarts.init(chartDom);
      // qwycOption.xAxis[0].data = sevenDay.value;
      myChart1.setOption(qwycOption, true);
      myChart1.on("legendselectchanged", (params) => {});
      window.onresize = function () {
        if (jqysBox.value) {
          chartHeight1.value = `${jqysBox.value!.offsetHeight / 3 - 90}px`;
        }
        myChart1.resize();
      };
      window.addEventListener("resize", () => {
        if (jqysBox.value)
          chartHeight1.value = `${jqysBox.value!.offsetHeight / 3 - 90}px`;
        if (myChart1) {
          myChart1.resize();
        }
      });
    }, 1000);
  }
};
// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    getYjListData(state.pageList?.zhsp);
  },
  { detached: false }
);
onMounted(() => {
  drawChart();
  getYjListData(mainStore.getPageList()?.zhsp);
});
</script>

<style scoped lan="scss">
.zhsp-box {
  position: relative;
  height: 360px;
  /* width: 100%; */
  width: 389px;
  display: block;
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
  .ajxg {
    height: 45%;
  }
  .ftbaqk {
    height: 55%;
  }
  #qwycEchart {
    width: 420px;
    height: 400px;
  }
  .line-box {
    position: absolute;
    width: 150px;
    height: 150px;
    z-index: 999;
    display: flex;
    flex-direction: row;
    align-items: end;
    margin-top: 20px;
    border-bottom: 1px solid rgb(53, 115, 252, 0.64);
    padding-left: 30px;
    left: 12%;
    top: -14px;
    margin-left: -24px;
    > div {
      border-left: 1px solid rgb(53, 115, 252, 0.64);
      border-top: 1px solid rgb(53, 115, 252, 0.64);
      color: #ffffff;
      margin-right: 6px;
      width: 30px;
      position: relative;
      margin-left: -10px;

      .bfb {
        left: 34px;
        top: -12px;
        position: absolute;
      }
    }
  }
}
</style>
