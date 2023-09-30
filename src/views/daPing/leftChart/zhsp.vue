<template>
  <div class="zhsp-box">
    <ModelTitle model-title="智慧审判" />
    <div ref="jqysBox" class="line-box">
      <template v-if="bfbArr?.length > 0">
        <div
          v-for="(item, i) in bfbArr"
          :key="i"
          :style="`height:${(bfbArr?.length - i) * 18 + 'px'}; width:${
            27.5 + (i + 1) * 1 + 'px'
          }; margin-left: -${15 + (i + 1) * 2 + 'px'}`"
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
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from "vue";
import ModelTitle from "../components/modelTitle.vue";
import * as echarts from "echarts";
import { noDataOption } from "../components/noDataOption";

//智慧审批
const chartHeight1 = ref<string>("297px");
const jqysBox = ref<ComponentPublicInstance<HTMLDivElement>>();
let myChart1: echarts.ECharts;
let myChart2: echarts.ECharts;
const bfbArr = ref([]);
const qwycOption = {
  tooltip: {
    show: true,
    axisPointer: {
      type: "shadow",
    },
    formatter: (
      val: { marker: string; name: string; value: number; name: string }[]
    ) => {
      let text = "";
      // eslint-disable-next-line @typescript-eslint/no-shadow
      let title = "";
      console.log("val", val);
      let flag = val.name == "总收案数" || val.name == "收案数同比";
      if (flag) {
        let data = [val];
        let arr = [];
        if (val.name == "总收案数") {
          arr = [
            { name: "民事案件", value: 10 },
            { name: "邢事案件", value: 5 },
          ];
        } else {
          arr = [
            { name: "民事案件", value: 5 },
            { name: "邢事案件", value: 5 },
            { name: "执行案件", value: 10 },
          ];
        }

        arr.forEach((item) => {
          // "" 为背景柱子 提示款里不显示

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          title = val.name;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          text += `${val.marker}${item.name}：${item.value}<br/>`;
        });

        return `${title}<br/>${text}`;
      } else {
        return;
      }
    },
    backgroundColor: "rgba(187,230,245,0.19)",
    borderColor: "#7BC9FF",
    textStyle: {
      color: "#DFEEFF",
    },
  },
  // 2.图例组件
  legend: {
    orient: "vertical",
    left: "-10px",
    top: "81",
    itemWidth: 13,
    itemHeight: 10,
    // padding: [0, 0, 0, 2],
    itemGap: 21,
    borderRadius: 1,
    itemStyle: {
      borderWidth: 2,
    },
    textStyle: {
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
  left: 280,
  top: "20",
  radius: ["50%", "67%"],
  center: ["50%", "80%"],
  layoutSize: "50%",
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
const getYjListData = () => {
  const data = [
    { name: "收案数同比", value: 30 },
    { name: "结案数同比", value: 70 },
    { name: "总收案数", value: 80 },
    { name: "总结案数", value: 100 },
    { name: "综合结案率", value: 190 },
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
    console.log("baifenbi", item.value, (item.value / total) * 100);

    data[index].bfb = `${new Number((item.value / total) * 100).toFixed(0)}%`;
    newArr.push({
      ...seriesPieSet,
      ...{
        // name: item.name,
        radius: [`${30 + index * 20}%`, `${37 + index * 20}%`],
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
  console.log("bfbArr", bfbArr.value);

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
      myChart1.on("legendselectchanged", (params) => {
        // 监听图例选择变化事件
        console.log("legendselectchanged", params); // params 中包含选中的图例信息
      });
      window.onresize = function () {
        console.log("jqysBox.value1", jqysBox.value);

        if (jqysBox.value) {
          chartHeight1.value = `${jqysBox.value!.offsetHeight / 3 - 90}px`;
        }
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
.zhsp-box {
  position: relative;
  height: 360px;
  width: 100%;
  display: block;
  #qwycEchart {
    width: 420px;
    height: 400px;
  }
  .line-box {
    position: absolute;
    width: 150px;
    height: 200px;
    z-index: 999;
    display: flex;
    flex-direction: row;
    align-items: end;
    margin-top: 20px;
    border-bottom: 1px solid rgb(53, 115, 252, 0.64);
    padding-left: 30px;
    left: 55%;
    top: -28px;
    margin-left: -18px;
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
