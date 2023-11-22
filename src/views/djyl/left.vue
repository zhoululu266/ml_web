<template>
  <div class="dj-left">
    <div class="left-title"><div>党员统计</div></div>
    <div class="left-dy-num">
      <div v-for="(item, i) in dyNum" :key="i">
        <span> {{ item.name }}</span>
        <p class="dy" >{{ item.val }}
        <div>{{ item.dw }}</div>
        </p>
         <p class="ybdy" ><template v-if="i!==2">含预备党员{{ item.ybdy||0 }}名</template></p>
      </div>
    </div>
    <div ref="dyLeftBox" class="yjqk-chart">
      <div id="dyLeftEchart" :style="{ height: chartHeight }">
      </div>
    </div>
    <div class="dyfl">
      <div v-for="(item, i) in dyrs" :key="i">
        
        <span><div class="color-box" :style="[{ backgroundColor: item.color}]"></div> {{ item.name }}</span>
        <p class="dy" :style="[{ color: item.color}]">{{ item.val||0 }}%
        </p>
        
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { noDataOption } from "../daPing/components/noDataOption";
import { option } from "./pieChart";
const dyLeftBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>();
let myChart: echarts.ECharts;

const dyNum = ref([
  { name: "全员共有党员", val: "72", dw: "人" ,ybdy:"3"},
  { name: "在职党员", val: "51", dw: "人",ybdy:"3" },
  { name: "退休党员", val: "21", dw: "人" },
]);
const dyrs = ref([
  { name: "机关党支部在职党员", val: "20", color: "rgba(56, 190, 187, 1)" },
  { name: "法庭党支部在职党员", val: "22", color: "rgba(6, 170, 218, 1)"},
  { name: "法警党支部在职党员", val: "9",  color: "rgba(218, 161, 6, 1)"},
]);


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
      { value: 6, name: "AAAAAA" },
      { value: 6, name: "BBBBBB" },
      { value: 10, name: "CCCCCC" },
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
   

    option.series[4].data = result2.data;

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
  chartHeight.value = `${dyLeftBox.value!.offsetHeight - 10}px`;
 
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

    .dy {
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
      .ybdy{
          margin: 0 0 0 10px;
        width: 110px;
        font-size: 16px;
      }
    }
  }
.dyfl{

  >div{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
    span {
     display: flex;
      flex-direction: row;
      align-items: center;
      };
      .color-box{
        width: 20px;
        height: 20px;
        margin-right: 20px;
        display: inline-block;
      }
  }

  .dy{

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

}</style>
