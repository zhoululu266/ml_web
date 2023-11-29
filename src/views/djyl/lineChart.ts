let legendData = ["全院", "党员"];
let xAxisData = Array.from({ length: 7 }, (_, i) => i + 1 + "");
let seriesData = [45, 78, 90, 100, 70, 90, 70];
let seriesData1 = [49, 60, 64, 120, 60, 40, 80];
import * as echarts from "echarts";
export const option = {
  // backgroundColor: "#064965",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "30",
    right: "4",
    top: "25",
  },
  legend: {
    icon: "circle",
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
  xAxis: {
    boundaryGap: false,
    data: xAxisData,
    axisLine: {
      lineStyle: {
        color: "rgba(117, 168, 202, 0.4)",
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: "#fff",
    },
  },
  yAxis: [
    {
      name: "单位(%)",
      nameTextStyle: {
        padding: [0, 0, -3, -8],
        color: "#ECF0FF",
        fontSize: 12,
      },
      type: "value",
      inverse: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(117, 168, 202, 0.3)",
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#0D97EB",
        },
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          color: "#ECF0FF",
          fontSize: 12,
        },
      },

      axisTick: {
        show: false,
      },
    },
  ],

  series: [
    {
      name: legendData[0],
      type: "line",
      symbol: "circle", //设定为实心点
      showAllSymbol: true,
      symbolSize: 0,
      smooth: false,
      itemStyle: {
        normal: {
          color: `#74FFFD`,
          lineStyle: {
            //线的颜色
            color: `#74FFFD`,
            width: 2,
          },
          areaStyle: {
            type: "default",
            //渐变色实现
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //变化度
              //三种由深及浅的颜色
              [
                {
                  offset: 0,
                  color: "RGBA(11, 74, 125, 0.8)",
                },
                {
                  offset: 0.5,
                  color: "RGBA(11, 74, 125, 0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(1, 180, 255, 0)",
                },
              ]
            ),
          },
        },
      },
      data: seriesData,
    },
    {
      name: legendData[1],
      type: "line",
      symbol: "circle", //设定为实心点
      showAllSymbol: true,
      symbolSize: 0,
      smooth: false,
      itemStyle: {
        normal: {
          color: `#FFFF00`,
          lineStyle: {
            //线的颜色
            color: `#FFFF00`,
            width: 2,
          },
          areaStyle: {
            type: "default",
            //渐变色实现
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //变化度
              //三种由深及浅的颜色
              [
                {
                  offset: 0,
                  color: "RGBA(46, 48, 122, 0.8)",
                },
                {
                  offset: 0.5,
                  color: "RGBA(46, 48, 122, 0.3)",
                },
                {
                  offset: 1,
                  color: "RGBA(46, 48, 122, 0)",
                },
              ]
            ),
          },
        },
      },
      data: seriesData1,
    },
  ],
};
