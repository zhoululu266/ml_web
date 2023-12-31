var myColor = ["#48BDF4", "#01E4FF", "#F97A9A"];
var max = 2500;
export const barOption = {
  grid: {
    top: "0",
    containLabel: true,
  },
  xAxis: [
    {
      show: false,
    },
  ],
  yAxis: [
    {
      axisTick: "none",
      axisLine: "none",
      position: "left", // 将 y 轴显示在右侧
      offset: 10,
      axisLabel: {
        textStyle: {
          fontSize: "14",
          fontFamily: "PingFang SC",
          fontWeight: "bold",
          color: "#F0F0F0",
        },
      },
      inverse: true,
      data: ["工序A", "工序B", "工序C", "工序D"],
    },
    {
      name: "outer",
      show: false,
      inverse: true,
      data: [],
    },
    {
      name: "bg",
      show: false,
      inverse: true,
      data: [],
    },
  ],
  series: [
    {
      name: "条",
      type: "bar",
      yAxisIndex: 0,
      data: [2040, 1175, 520, 225],
      label: {
        normal: {
          show: false,
        },
      },
      barWidth: 12,
      barBorderRadius: 30,
      itemStyle: {
        normal: {
          barBorderRadius: 30,
          color: function (params) {
            var num = myColor.length;
            return myColor[params.dataIndex % num];
          },
        },
      },
      z: 2,
    },
    {
      name: "框",
      type: "bar",
      yAxisIndex: 1,
      data: [max * 0.998, max * 0.998, max * 0.998, max * 0.998],
      barWidth: 12,
      itemStyle: {
        normal: {
          color: "#013E89",
          barBorderRadius: 30,
        },
      },
      z: 1,
    },
    {
      name: "外框",
      type: "bar",
      yAxisIndex: 2,
      barGap: "-100%",
      data: [max, max, max, max],
      barWidth: 14,
      itemStyle: {
        normal: {
          color: function (params) {
            var num = myColor.length;
            return myColor[params.dataIndex % num];
          },
          barBorderRadius: 30,
        },
      },
      z: 0,
    },
  ],
};
