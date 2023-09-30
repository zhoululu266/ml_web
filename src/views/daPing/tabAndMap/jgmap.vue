<!-- 地图 -->
<template>
  <div class="jgmap">
    <div class="echars">
      <div class="time-box">
        <div class="time">{{}}</div>
        <div class="day">{{}}</div>
      </div>
      <div ref="container" class="map-container">
        <div id="mapEchartImg" class="map-chart"></div>
        <div id="mapEchart" class="map-chart"></div>
      </div>
      <div class="min-map"></div>
      <div class="min-map-title">八面通镇</div>
      <div class="card">
        <div>
          <div class="flag-icon"></div>
          <div>党员天平工作站</div>
        </div>
        <div>
          <div class="start"></div>
          <div>共享法庭</div>
        </div>
      </div>
      <div
        v-for="(item, i) in flagArr"
        :key="i"
        class="flag"
        :class="[{ 'light-flag': item.light }]"
        :style="{ top: item.top + 'px', left: item.left + 'px' }"
      >
        <template v-if="item.light">
          <!-- <span class="num">{{ item.value }}</span> -->
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, ComponentPublicInstance, onUnmounted } from "vue";
import * as echarts from "echarts";
import { axiosPost } from "@/utils";

import mapJson from "./mapJson.json";
import jtImg from "@/assets/images/gjtb.png";
import ptjtImg from "@/assets/images/tstb.png";
import higHlight from "@/assets/images/higHlight.png";
import Yxjq from "@/assets/images/yxjq.png";
import Lamp from "@/assets/images/policelamp.png";
import RedIcon from "@/assets/images/red-bg.png";
import GreenIcon from "@/assets/images/green-bg.png";
import BlueIcon from "@/assets/images/blue-bg.png";
import StartIcon from "@/assets/images/start.png";
import BigFlag from "@/assets/images/big-flag.png";
const emit = defineEmits(["changeShowFun"]);
const changeShowFun = () => {
  emit("changeShowFun");
};
const mapInterval = ref<string | number | undefined>();
const container = ref<ComponentPublicInstance<HTMLDivElement>>(); // 容器Ref

const flagArr = ref([
  {
    top: 122,
    left: 378,
    light: true,
    value: 1,
    name: "河西",
  },
  {
    top: 153,
    left: 490,
    light: false,
    value: 5,
    name: "八面通",
  },
  {
    top: 176,
    left: 600,
    light: false,
    value: 5,
    name: "福禄乡",
  },
  {
    top: 238,
    left: 531,
    light: false,
    value: 5,
    name: "马桥河",
  },
  {
    top: 225,
    left: 444,
    light: false,
    value: 5,
    name: "下城子",
  },
  {
    top: 278,
    left: 404,
    light: false,
    value: 5,
    name: "兴源",
  },
  {
    top: 390,
    left: 356,
    light: false,
    value: 5,
    name: "穆棱",
  },
  {
    top: 484,
    left: 391,
    light: false,
    value: 5,
    name: "共和",
  },
]);
let myChart;
import { nextTick } from "vue";
const data = [
  {
    name: "下城子镇",
    value: 1,
    click: false,
    warning: 0,
    alertAmount: 0,
    total: 0,
    itemStyle: {
      // normal: {
      //   areaColor: "#FD9A9A",
      // },
    },
    dq: true,
  },
  {
    name: "马桥河镇",
    value: 2,
    click: false,
    warning: 0,
    alertAmount: 0,
    total: 0,
    itemStyle: {
      // normal: { areaColor: "#FFDC63" }
    },
  },
  {
    name: "兴源镇",
    value: 3,
    click: false,
    warning: 0,
    alertAmount: 0,
    total: 0,
    // itemStyle: { normal: { areaColor: "#54E6AB" } },
  },
  {
    name: "河西镇",
    value: 4,
    click: false,
    warning: 0,
    alertAmount: 0,
    total: 0,
    // itemStyle: { normal: { areaColor: "#489EFF" } },
  },
  {
    name: "八面通镇",
    value: 5,
    click: false,
    warning: 0,
    alertAmount: 0,
    total: 0,
    // itemStyle: { normal: { areaColor: "#54E6AB" } },
  },
  {
    name: "穆棱镇",
    value: 6,
    click: false,
    warning: 0,
    alertAmount: 0,
    total: 0,
    // itemStyle: { normal: { areaColor: "#FD9A9A" } },
  },
  {
    name: "共和乡",
    value: 7,
    click: false,
    warning: 0,
    alertAmount: 0,
    total: 0,
    // itemStyle: { normal: { areaColor: "#FFDC63" } },
  },
  {
    name: "福录乡",
    value: 7,
    click: false,
    warning: 0,
    alertAmount: 0,
    total: 0,
    // itemStyle: { normal: { areaColor: "#9DD960" } },
    dq: true,
  },
];
const option = {
  tooltip: {
    show: true,
  },
  geo: [
    {
      map: "穆棱",
      zoom: 1.0,
      zlevel: -1,
      silent: true,
      layoutCenter: ["50%", "50%"],
      layoutSize: "90%",
      roam: false,
      itemStyle: {
        borderColor: "#ffffff",
        borderWidth: 0,
        areaColor: "rgba(67, 173, 127, 0)",
      },

      label: {
        // 静态的时候展示样式
        show: false, // 是否显示地图省份得名称
        // color: "#fff",
        fontSize: 12,
        fontFamily: "Arial",
      },
      emphasis: {
        // 动态展示的样式
        show: false,
        // color: "#fff",
      },
    },
  ],
  series: [
    {
      name: "穆棱",
      type: "map",
      map: "穆棱",
      layoutCenter: ["50%", "50%"],
      layoutSize: "90%",
      tooltip: {
        show: false,
        trigger: "item",
      },
      itemStyle: {
        areaColor: "rgba(67, 173, 127, 0)", //地图背景色
        // areaColor: {
        //   type: "linear-gradient",
        //   x: 0,
        //   y: 1000,
        //   x2: 0,
        //   y2: 0,
        //   colorStops: [
        //     {
        //       offset: 0.5,
        //       color: "#0D59C1", // 0% 处的颜色
        //     },
        //     {
        //       offset: 1,
        //       color: "#53C9C7", // 100% 处的颜色
        //     },
        //   ],
        //   global: true, // 缺省为 false
        // },
        borderColor: "#ffffff",
        borderWidth: 0,
        // opacity: 0.7,
      },
      // label: {
      //   show: true,
      //   backgroundColor: "rgba(214,51,44,0)", // 标签背景颜色
      //   borderColor: "#777", // 外层边框颜色
      //   borderRadius: 4, // 外层边框圆角
      //   color: "#fff",
      //   offset: [0, -20],
      //   formatter: (params: {
      //     data: { name: string; value: number; dq: boolean };
      //     name: string;
      //   }) => {
      //     if (params.name === "八面通镇") {
      //       return `{ybnx|${params.name}}\n{xn|}\n{dq|}`;
      //     } else if (params.name === "兴源镇") {
      //       return `{xynx|${params.name}}\n{xn|}\n{dq|}`;
      //     } else if (params.name === "下城子镇") {
      //       return `{bnx|${params.name}}\n{xx|}\n{dq|}`;
      //     } else if (params.name === "马桥河镇") {
      //       return `{bnx|${params.name}}\n{xn|}\n{dq|}`;
      //     } else if (params.name === "福录乡") {
      //       return `{xx|}{bnx|${params.name}}`;
      //     } else if (params.data.dq) {
      //       return `{bnx|${params.name}}\n{xn|}\n{dq|}`;
      //     } else {
      //       return `{mnx|${params.name}}\n{xn|}`;
      //     }
      //   },
      //   rich: {
      //     bnx: {
      //       color: "#ffffff",
      //       fontSize: 8,
      //       backgroundColor: {
      //         image: GreenIcon,
      //       },
      //       height: 16,
      //       width: 30,
      //       padding: [2, 5, 0, 5],
      //       borderRadius: [4, 4, 4, 4],
      //     },
      //     mnx: {
      //       color: "#ffffff",
      //       fontSize: 8,
      //       backgroundColor: {
      //         image: GreenIcon,
      //       },
      //       height: 16,
      //       width: 26,
      //       padding: [2, 5, 0, 5],
      //       borderRadius: [4, 4, 4, 4],
      //     },
      //     ybnx: {
      //       color: "#ffffff",
      //       fontSize: 8,
      //       backgroundColor: {
      //         image: RedIcon,
      //       },
      //       width: 34,
      //       height: 16,
      //       padding: [2, 5, 0, 5],
      //       borderRadius: [4, 4, 4, 4],
      //     },
      //     xx: {
      //       color: "#ffffff",
      //       backgroundColor: {
      //         image: StartIcon,
      //       },
      //       width: 10,
      //       height: 10,
      //       left: 10,
      //       padding: [2, 5, 0, 0],
      //     },
      //     xynx: {
      //       color: "#ffffff",
      //       fontSize: 8,
      //       backgroundColor: {
      //         image: BlueIcon,
      //       },
      //       width: 36,
      //       height: 20,
      //       padding: [2, 5, 0, 5],
      //       borderRadius: [4, 4, 4, 4],
      //     },
      //     xn: {
      //       // backgroundColor: {
      //       //   image: ptjtImg,
      //       // },
      //       // opacity: 1,
      //       // height: 10,
      //     },

      //     yxn: {
      //       // backgroundColor: {
      //       //   image: higHlight,
      //       // },
      //       // opacity: 1,
      //       // width: 20,
      //       // height: 15,
      //     },
      //     dq: {
      //       // backgroundColor: {
      //       //   image: Lamp,
      //       // },
      //       // opacity: 1,
      //       // width: 20,
      //       // height: 15,
      //     },
      //   },
      // },
      select: {
        disabled: true,
        color: "rgba(214,51,44,0)",
        // 设置地图点击后的颜色
        itemStyle: {
          areaColor: "rgba(214,51,44,0)",
          color: "rgba(214,51,44,0)",
        },
      },
      // emphasis: {
      //   label: {
      //     show: false,
      //     color: "#fff", // 鼠标悬浮字体颜色
      //   },
      //   itemStyle: {
      //     areaColor: "transparent", // 鼠标悬浮区块颜色
      //     borderWidth: 2,
      //   },
      // },
      data,
    },
    {
      name: "穆棱",
      type: "map",
      map: "穆棱",
      layoutCenter: ["50%", "50%"],
      layoutSize: "90%",
      tooltip: {
        show: false,
        trigger: "item",
      },
      itemStyle: {
        areaColor: "rgba(67, 173, 127, 0)",
        // areaColor: {
        //   type: "linear-gradient",
        //   x: 0,
        //   y: 1000,
        //   x2: 0,
        //   y2: 0,
        //   colorStops: [
        //     {
        //       offset: 0.5,
        //       color: "#0D59C1", // 0% 处的颜色
        //     },
        //     {
        //       offset: 1,
        //       color: "#53C9C7", // 100% 处的颜色
        //     },
        //   ],
        //   global: true, // 缺省为 false
        // },
        borderColor: "#ffffff",
        borderWidth: 0,
        // opacity: 0.7,
      },
      label: {
        show: false,
        backgroundColor: "rgba(214,51,44,0)", // 标签背景颜色
        borderColor: "#777", // 外层边框颜色
        borderRadius: 4, // 外层边框圆角
        color: "#fff",
        offset: [0, -20],
        // formatter: (params: {
        //   data: { name: string; value: number; dq: boolean };
        //   name: string;
        // }) => {
        //   if (params.name === "八面通镇") {
        //     return `{ybnx|${params.name}}\n{xn|}\n{dq|}`;
        //   } else if (params.data.dq) {
        //     return `{bnx|${params.name}}\n{xn|}\n{dq|}`;
        //   } else {
        //     return `{bnx|${params.name}}\n{xn|}`;
        //   }
        // },
        // rich: {
        //   bnx: {
        //     backgroundColor: "rgba(0,27,57,0.8)", // 文字底色
        //     color: "#cee6ff",
        //     height: 20,
        //     padding: [2, 5, 0, 5],
        //     borderRadius: [4, 4, 4, 4],
        //   },
        //   ybnx: {
        //     backgroundColor: "rgba(255, 195, 36, 1)", // 文字底色
        //     color: "rgba(191, 67, 20, 1)",
        //     height: 20,
        //     padding: [2, 5, 0, 5],
        //     borderRadius: [4, 4, 4, 4],
        //   },
        //   xn: {
        //     backgroundColor: {
        //       image: ptjtImg,
        //     },
        //     opacity: 1,
        //     height: 10,
        //   },
        //   yxn: {
        //     backgroundColor: {
        //       image: higHlight,
        //     },
        //     opacity: 1,
        //     width: 20,
        //     height: 15,
        //   },
        //   dq: {
        //     backgroundColor: {
        //       image: Lamp,
        //     },
        //     opacity: 1,
        //     width: 20,
        //     height: 15,
        //   },
        // },
      },
      // select: {
      //   // 设置地图点击后的颜色
      //   itemStyle: {
      //     areaColor: "rgba(214,51,44,0)",
      //   },
      // },
      // emphasis: {
      //   label: {
      //     show: false,
      //     color: "#fff", // 鼠标悬浮字体颜色
      //   },
      //   itemStyle: {
      //     areaColor: "transparent", // 鼠标悬浮区块颜色
      //     borderWidth: 2,
      //   },
      // },
      data,
    },
    {
      name: "Top 5",
      type: "effectScatter",
      coordinateSystem: "geo",
      data: [
        {
          name: "清河村",
          value: [130.569946, 44.990002, 279],
        },
        { name: "雷锋村", value: [130.481071, 44.970002, 60] },
        { name: "河西村", value: [130.431071, 44.880002, 60] },
      ],
      encode: {
        value: 2,
      },
      showEffectOn: "render", //"emphasis",
      rippleEffect: {
        brushType: "stroke",
      },

      label: {
        normal: {
          show: true,
          position: "right", //显示位置
          offset: [-26, -20], //偏移设置
          formatter: function (params) {
            //圆环显示文字
            return params.data.name;
          },
          color: "#FFFFFF",
          fontSize: 10,
        },
        emphasis: {
          show: true,
        },
      },
      itemStyle: {
        color: "red",
        shadowBlur: 10,
        shadowColor: "#333",
      },
      tooltip: {
        show: true,
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params) {
          return params.name;
        },
        backgroundColor: "rgba(187,230,245,0.19)",
        borderColor: "#7BC9FF",
        textStyle: {
          color: "#ffffff",
        },
      },
      emphasis: {
        scale: false,
      },
    },
  ],
};
// 地图数据
const url = `${$config.api}`;
const mapData = (data: Record<string, unknown> | undefined) => {
  const api = `${url}/patrol/xk/sit/jqxx_statistics/bigMap`;
  return axiosPost(api, data);
};
const getData = async (level?: string) => {
  console.log("getData");

  try {
    // const res = await mapData({ orgCode });
    // if (res.code === 200) {
    const res = { code: 200, data: [] };
    const arr: any = [];
    let flagData: any = [];
    const obj = {};
    // myChart.dispatchAction({
    //   type: "mapSelect", // 根据 tooltip 的配置项显示提示框。
    //   // serie/sIndex: 2,
    //   // seriesName: "下城子镇",
    //   dataIndex: 5,
    // });
    // myChart.dispatchAction({
    //   type: "showTip", // 根据 tooltip 的配置项显示提示框。
    //   seriesIndex: 0,
    //   dataIndex: 1,
    // });
    option.series[0].graphic = [
      {
        type: "image",
        left: "130.656814",
        top: "44.786149",
        style: {
          image: Yxjq, // 替换为你的图片路径
        },
      },
    ];
    option.series[1].label = {
      normal: {
        show: true,
        formatter: function () {
          return 100; // 返回对应数量
        },
      },
    };
    myChart.setOption(option);
    // myChart.dispatchAction({
    //   type: "highlight",
    //   seriesIndex: 0,
    //   dataIndex: 0, // 北京对应的索引位置，可以根据实际情况进行调整
    // });
    // res.data.forEach((item: any) => {
    //   data.forEach((dItem) => {
    //     if (level == "SJ") {
    //       const pushArr: any = [];
    //       flagData.forEach((item: any) => {
    //         pushArr.push(obj[item]);
    //       });
    //       // 赋值
    //       const newData = option;
    //       newData.series[0].data = [...arr, ...pushArr];
    //       setTimeout(() => {
    //         myChart.setOption({
    //           series: {
    //             data: [...arr, ...pushArr],
    //           },
    //         });
    //       }, 1000);
    //     }
    //   });
    // });
    // } else {
    //   // 接口报错
    // }
  } catch (error) {
    console.error(error);
  }
};
/**
 * 请求组织机构
 */
onMounted(async () => {
  await nextTick();

  const chartDom = document.getElementById("mapEchart")!;

  myChart = echarts.init(chartDom);
  echarts.registerMap("穆棱", mapJson as any);

  myChart.setOption(option, true);
  myChart.off("click"); // 防止点击触发两次
  myChart.on("click", (param: { name: string }) => {
    console.log("click-----", param);
    changeShowFun();
  });
  myChart.on("mouseover", () => {
    myChart.dispatchAction({
      type: "downplay",
    });
  });
  // 窗口改变 chart缩放
  window.addEventListener("resize", () => {
    if (myChart) {
      myChart.resize();
    }
  });
  getData();
  mapInterval.value = setInterval(scroll, 60000);
  setTimeout(() => {
    const arr = flagArr.value;
    arr.forEach((item: any) => (item.light = false));
    console.log("arr", arr);
    flagArr.value = arr;
  }, 20000);
});
const scroll = () => {
  getData();
};
onUnmounted(() => clearInterval(mapInterval.value));
</script>
<style lang="scss">
.jgmap {
  width: 100%;
  height: calc(100% - 10px);
  position: relative;
  margin-top: -26px;
  #mapEchartImg {
    background-image: url("@/assets/images/big-map.png");

    background-position: center;
    background-repeat: no-repeat;
    background-size: 51% 90%;
  }
  .time-box {
    margin: 0 auto;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    height: 10px;
    .time {
      font-size: 23px;
      font-family: PangMenZhengDao;
      font-weight: 600;
      color: #aecaf5;
      background-image: -webkit-linear-gradient(
        bottom,
        #b8d1f6,
        #b3cff6,
        #90aace
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .day {
      font-size: 12px;
      font-family: PangMenZhengDao;
      font-weight: 600;
      color: #aecaf5;
      background-image: -webkit-linear-gradient(
        bottom,
        #b8d1f6,
        #b3cff6,
        #90aace
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .min-map {
    background-image: url("@/assets/images/min-map.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 21%;
    height: 42%;
    position: absolute;
    right: 12%;
    bottom: -3%;
  }
  .min-map-title {
    width: 21%;
    height: 20px;
    font-size: 14px;
    font-family: PingFang SC;
    // font-weight: bold;
    color: #ffffff;
    position: absolute;
    right: 12%;
    bottom: -7%;
    text-align: center;
  }
  .card {
    position: absolute;
    top: 13%;
    left: 7%;

    > div {
      background-image: url("@/assets/images/map-card-bg.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      width: 154px;
      height: 36px;
      line-height: 36px;
      padding-left: 18px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 8px;
      .flag-icon {
        background-image: url("@/assets/images/qi.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 16px;
        height: 20px;
        margin-right: 6px;
      }
      .start {
        background-image: url("@/assets/images/start.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }
    }
  }
  .echars {
    // display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;

    .map-container {
      width: 100%;
      height: calc(108% - 0px);
      position: relative;
      .map-chart {
        position: absolute;
        top: 0px;
        // left: 44px;
        z-index: 5;
        height: 100%;
        width: 100%;
      }
    }
  }
  .flag {
    background-image: url("@/assets/images/qi.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 24px;
    height: 30px;
    position: absolute;
    z-index: 99;
  }

  /*css部分*/
  @keyframes scaleDraw {
    /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
    0% {
      transform: scale(1); /*开始为原始大小*/
    }
    25% {
      transform: scale(1.2); /*放大1.1倍*/
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.2);
    }
  }
  .light-flag {
    width: 30px;
    height: 40px;
    position: absolute;
    background-image: url("@/assets/images/big-qi.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -webkit-animation-name: scaleDraw; /*关键帧名称*/
    -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
    -webkit-animation-iteration-count: infinite; /*动画播放的次数*/
    -webkit-animation-duration: 5s; /*动画所花费的时间*/
    .num {
      color: #ffffff;
      font-size: 7px;
      font-weight: 500;
      margin-top: 7px;
      margin-left: 6px;
      border-radius: 8px;
      text-align: center;
      display: block;
      width: 18px;
      height: 18px;
      line-height: 16px;
    }
  }

  // }
}
</style>
