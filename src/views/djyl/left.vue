<template>
  <div class="dj-left">
    <div class="left-title"><div>党员统计</div></div>
    <div class="left-dy-num">
      <div v-for="(item, i) in dyNum" :key="i">
        <span> {{ item.name }}</span>
        <p class="dy" >{{ item.val||0 }}
        <div>{{ item.dw||'人' }}</div>
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
        <p class="dy" :style="[{ color: item.color}]">{{ item.val||0 }}人
        </p>
        
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { noDataOption } from "../daPing/components/noDataOption";
import { option } from "./pieChart";
import { useMain } from "@/store";
import _ from "lodash";

const dyLeftBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>();
let myChart: echarts.ECharts;
const mainStore = useMain();
const flagData = ref();
// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    const djDyrs = state.pageList?.djDyrs;
    console.log("djDyrsslsubscribe", djDyrs);
    if (JSON.stringify(djDyrs) != JSON.stringify(flagData.value?.djDyrs)) {
      getSyzlList(djDyrs);
    }
  },
  { detached: false }
);
//溯源治理
const getSyzlList = (data?: any) => {
  const djDyrs = _.clone(data) ;
  flagData.value = {
    ...flagData.value,
    ...djDyrs,
  };
console.log(' flagData.value', flagData.value);

  const result2 = {

    data: [
      { value: data?.shaoshu_cases||0, name: "少数民族党员"+(data?.shaoshu_cases||0)+"人" },
      { value: data?.zhiqian_success||0, name: "≤45周岁党员"+(data?.zhiqian_success||0)+"人" },
      { value: data?.benke__cases||0, name: "本科学历党员"+(data?.benke__cases||0)+"人" },
      { value: data?.female_cases||0, name: "女性党员"+(data?.female_cases||0)+"人" },
    ],
  };
  
    const names: any = []; // X轴坐标名称
    const zajq: any = [];

    // eslint-disable-next-line array-callback-return
    result2.data?.map((item: any) => {
      names.push(item.name);
      zajq.push(item.value);
    });

    // option.angleAxis.data = names;
   

    option.series[4].data = result2.data;

    if (myChart) myChart.setOption(option, true);
 

};

const dyNum = computed(() => { 
return [
  { name: "全员共有党员", val: flagData.value?.gentle, dw: "人" ,ybdy:flagData.value?.prepare},
  { name: "在职党员\u3000\u3000", val: flagData.value?.job, dw: "人",ybdy:flagData.value?.prepare },
  { name: "退休党员\u3000\u3000", val: flagData.value?.tuixiu_cases, dw: "人" },
]
});
const dyrs = computed(() => {return [
  { name: "机关党支部在职党员", val: flagData.value?.organ, color: "#258CFF" },
  { name: "法庭党支部在职党员", val: flagData.value?.court, color: "#FFEA59"},
  { name: "法警党支部在职党员", val: flagData.value?.bailiff,  color: "#01E4FF"},
]
});



const drawChart = () => {
  if (document.getElementById("dyLeftEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("dyLeftEchart")!;
      myChart = echarts.init(chartDom);
      myChart.setOption(option);
      getSyzlList();
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
  padding: 15px 16px 27px 9px;
  box-sizing: border-box;

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
    font-size: 21px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #F6F9FE;
    text-shadow: 1px 2px 0px rgba(22,22,19,0.27);
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
  padding: 0  30px 0 26px;
  box-sizing: border-box;
  margin-top: -36px;

  >div{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  height: 40px;
    span {
     display: flex;
      flex-direction: row;
      align-items: center;
      };
      .color-box{
        width: 12px;
height: 12px;
        margin-right: 20px;
        display: inline-block;
      }
  }

  .dy{

  }
}
  .yjqk-chart {
    width: 400px;
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
