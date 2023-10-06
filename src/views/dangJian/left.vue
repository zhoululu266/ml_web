<template>
  <div class="dj-left">
    <div class="left-title"><div>党员基本情况</div></div>
    <div class="left-dy-num">
      <div v-for="(item, i) in dyNum" :key="i">
        <span> {{ item.name }}</span>
        <p>{{ item.val }}
        <div>{{ item.dw }}</div>
        </p>
      </div>
    </div>
    <div ref="dyLeftBox" class="yjqk-chart">
      <div id="dyLeftEchart" :style="{ height: chartHeight }">


      </div>
    </div>
    <div class="sex">
      <div class="nv"><span>{{ dyrs.nandy }}</span>
        <p>男性党员</p>
      </div>
      <div class="nan"><span>{{ dyrs.nvdy }}</span>
        <p>女性党员</p>
      </div>
    </div>
        <div ref="dyLeftBarBox" class="yjqk-bar-chart">
      <div id="dyLeftBarEchart" :style="{ height: chartBarHeight }">


      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { noDataOption } from "../daPing/components/noDataOption";
import { option } from "./pieChart";
import { barOption } from "./barChart";
const dyLeftBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>();
let myChart: echarts.ECharts;
const dyLeftBarBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartBarHeight = ref<string>();
let myBarChart: echarts.ECharts;
const dyNum = ref([
  { name: "在籍人员", val: "58992", dw: "人" },
  { name: "编制党员", val: "58992", dw: "人" },
  { name: "预备党员", val: "58992", dw: "人" },
  { name: "入党积极分子", val: "58992", dw: "人" },
]);
const dyrs = ref({
  nandy: 217,
  nvdy: 168,
  ssmzdy: 30,
  zzdy: 50,
  tx: 23,
})

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
    console.log("option.series", option.series);

    option.series[4].data = result2.data;

    if (myChart) myChart.setOption(option, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
  // })
  // .catch(() => {
  //   if (myChart) myChart.setOption(noDataOption, true);
  // });
};
const getBarList = (code?: string) => {
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
      { value: 60, name: "少数民族党员" },
      { value: 52, name: "在职" },
      { value: 46, name: "退休" },

    ],
  };
  if (result2.code === 200) {
    const names: any = []; // X轴坐标名称
    const zajq: any = [];

    // eslint-disable-next-line array-callback-return
    let total = 0;
    result2.data.map((item: any) => {
      names.push(item.name);
      zajq.push(item.value);
      total += item.value;
    });
    // result2.data.map((item: any) => {
    //   maxdd.push(total*0.998);
    //   max.push(total);
    //   total += item.value;
    // });
    const max = new Array(3).fill(total); 
     const maxdd = new Array(3).fill(total*0.998); 
    
    console.log('max',max,total);

    barOption.yAxis[0].data = names;
    console.log("option.series", barOption.series);

    barOption.series[0].data = zajq;
    barOption.series[1].data = maxdd;
    barOption.series[2].data = max;
    console.log('barOption',barOption);

    if (myBarChart) myBarChart.setOption(barOption, true);
  } else if (myBarChart) myBarChart.setOption(noDataOption, true);
  // })
  // .catch(() => {
  //   if (myChart) myChart.setOption(noDataOption, true);
  // });
};
const drawChart = () => {
  if (document.getElementById("dyLeftEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("dyLeftEchart")!;
      myChart = echarts.init(chartDom);
      myChart.setOption(option);
      getList();
      window.onresize = function () {
        console.log("dyLeftBox.value1", dyLeftBox.value);

        if (dyLeftBox.value) {
          chartHeight.value = `${dyLeftBox.value!.offsetHeight}px`;
        }
        myChart.resize();
      };
      window.addEventListener("resize", () => {
        console.log("dyLeftBox.value", dyLeftBox.value);
        if (dyLeftBox.value)
          chartHeight.value = `${dyLeftBox.value!.offsetHeight}px`;
        if (myChart) {
          myChart.resize();
        }
      });
    }, 1000);
  }
    if (document.getElementById("dyLeftBarEchart")) {
    setTimeout(() => {
      const chartBarDom = document.getElementById("dyLeftBarEchart")!;
      myBarChart = echarts.init(chartBarDom);
      myBarChart.setOption(barOption);
      getBarList();
      window.onresize = function () {
        console.log("dyLeftBox.value1", dyLeftBarBox.value);

        if (dyLeftBarBox.value) {
          chartBarHeight.value = `${dyLeftBarBox.value!.offsetHeight}px`;
        }
        myBarChart.resize();
      };
      window.addEventListener("resize", () => {
        console.log("dyLeftBox.value", dyLeftBarBox.value);
        if (dyLeftBox.value)
          chartBarHeight.value = `${dyLeftBarBox.value!.offsetHeight}px`;
        if (myBarChart) {
          myBarChart.resize();
        }
      });
    }, 1000);
  }
};
onMounted(() => {
  drawChart();
  // getYjListData();
  chartHeight.value = `${dyLeftBox.value!.offsetHeight - 10}px`;
  console.log(" chartHeight.value ", chartHeight.value);
});
</script>

<style scoped lang="scss">
.dj-left {
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(/src/assets/images/card-bg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 15px 16px 15px 9px;
  box-sizing: border-box;
  padding-bottom: 10px;
  width: 420px;
    overflow: hidden;
  .left-title {
    background-image: url(/src/assets/images/dj-title.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 32px;
    width: 100%;
    div{
    font-size: 19px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #f6f9fe;
    letter-spacing: 3px;
    background: linear-gradient(0deg, #e6f0c1 0%, #fdfff6 50%, #f6f9fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 40px;
    }


  }

  .left-dy-num {
    margin-top: 29px;
    padding: 0 10px 0px 12px;
    box-sizing: border-box;

    >div {
      background-image: url(/src/assets/images/dy-bg.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 43px;
      line-height: 43px;
      margin-bottom: 10px;
      width: 100%;
      padding: 0 16px 0 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-sizing: border-box;

      >span {
        display: inline-block;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;


      }

      >p {
        display: inline-block;
        margin: 0;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;

        div {
          display: inline-block;
          margin-left: 0px;
        }
      }
    }
  }

  .yjqk-chart {
    width: 380px;
    position: relative;
    height: 272px;
    margin-top: -20px;
    #dyLeftEchart {
      position: absolute;
      left: -8px;
      width: 100%;
      height: 100%;
    }
  }
  .yjqk-bar-chart {
    width: 440px;
    // margin-top: -50px;
    position: relative;

    height: 272px;

    #dyLeftBarEchart {
      position: absolute;
      left: -8px;
      width: 100%;
      height: 100%;
    }
  }
  .sex {

    background-image: url(/src/assets/images/dj-dy-bg.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 112px;
    color: #65EAFF;
    display: flex;
    padding: 10px 4% 10px 4%;
    box-sizing: border-box;
    align-items: center;

    >div {
      display: inline-block;
      width: 50%;
      text-align: center;
    }

    .nv {
      span {

        color: #FF2740;
      }
    }

    .nan {
      span {
        color: #65EAFF;
      }
    }

    span {

      font-size: 24px;
      font-family: Myriad Pro;
      font-weight: bold;

    }

    p {

      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #FEFEFE;

      margin: 0;
    }
  }
}</style>
