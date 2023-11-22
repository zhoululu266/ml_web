let legendData = ["全院", "党员"];
let xAxisData = Array.from({ length: 7 }, (_, i) => i + 1 + "");
let seriesData = [1, 2, 3, 5, 5, 1];
let seriesData1 = [1, 2, 4, 3, 6, 5];
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
    top: "30%",
    left: "2%",
    right: "10%",
    bottom: "5%",
    containLabel: true,
  },
  legend: {
    icon: "circle",
    right: "8%",
    top: "20%",
    itemWidth: 7, // 设置宽度
    itemHeight: 7, // 设置高度
    itemGap: 15, // 设置间距
    textStyle: {
      //图例文字的样式
      color: "#89BFE5",
      fontSize: 12,
    },
  },
  xAxis: {
    boundaryGap: true,
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
          color: "#0A5C95",
        },
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          color: "#89BFE5",
          fontSize: 12,
        },
      },
      nameTextStyle: {
        color: "#89BFE5",
        padding: [0, 0, 0, 15],
        fontSize: 12,
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
          color: `#00CBFE`,
          lineStyle: {
            //线的颜色
            color: `#00CBFE`,
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
                  color: "rgba(1, 180, 255, 0.2)",
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
          color: `#FFDF04`,
          lineStyle: {
            //线的颜色
            color: `#FFDF04`,
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
                  color: "rgba(255, 223, 4, 0.2)",
                },
                {
                  offset: 1,
                  color: "rgba(255, 223, 4, 0)",
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
