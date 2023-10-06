// let data = [60, 90, 50, 70, 60];
let data = [];
export const lineOption = {
  xAxis: {
    type: "category",
    axisLine: {
      show: true, //隐藏X轴轴线
      lineStyle: {
        color: "#CFD7DE",
        width: 2,
      },
    },
    axisTick: {
      show: false, //隐藏X轴刻度
      alignWithLabel: true,
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: 12,
        fontFamily: "Source Han Sans CN",
        fontWeight: 400,
        color: "#ECF0FF",
      },
      interval: 0,
    },
    data: ["2019", "2020", "2021", "2022", "2023"],
  },
  yAxis: {
    type: "value",
    name: "单位(%)",
    nameTextStyle: {
      fontSize: 12,
      fontFamily: "Source Han Sans CN",
      fontweight: 400,
      padding: [2, 0, 6, -16],
      color: "#ECF0FF",
    },

    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 0.2)",
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true, //隐藏X轴轴线
      lineStyle: {
        color: "#CFD7DE",
        width: 1,
      },
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: 12,
        fontFamily: "Source Han Sans CN",
        fontWeight: 400,
        color: "#ECF0FF",
      },
    },
  },
  series: [
    {
      name: "人数",
      type: "bar",
      barWidth: 15,
      itemStyle: {
        normal: {
          color: function (params) {
            // 动态返回每个柱状图的背景颜色
            if (params.dataIndex % 2 === 0) {
              return "#258CFF"; // 红色
            } else {
              return "#01E4FF"; // 蓝色
            }
          },
        },
      },

      data: data,
    },
    {
      data: data,
      type: "line",
      color: "#FFEA59",
    },
  ],
};
