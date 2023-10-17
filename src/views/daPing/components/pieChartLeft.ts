// let pieColors = ["#FFEA59", "#258CFF", "#01E4FF", "#FFEA59", "#FFEA59"];
let pieColors = [
  "#FFEA59",
  "#258CFF",
  "#01E4FF",
  "#96F159",
  "#fac858",
  "#73c0de",
  "#fc8452",
  "#ea7ccc",
  "#F8BBD0",
  "#C8E6C9",
  "#FFE0B2",
  "#FFFFFF",
];
let richColor = {};
let legendRich = {};
pieColors.forEach((item, idx) => {
  richColor[`color${idx}`] = { fontSize: 20, fontWeight: "bold", color: item };
  legendRich[`color${idx}`] = { fontSize: 20, color: item, align: "center" };
});
export function getRich(pieColors, size) {
  let result = {};
  pieColors.forEach((_, i) => {
    result[`a${i}`] = {
      color: pieColors[i],
      fontSize: size,
      fontFamily: "Source Han Sans CN",
      fontWeight: 400,
    };
    result[`b${i}`] = {
      color: pieColors[i],
      fontSize: size,
      fontFamily: "Source Han Sans CN",
      fontWeight: 400,
      padding: [4, 0, 0, 0],
    };
  });
  return result;
}
export const option = {
  color: pieColors,
  tooltip: {
    backgroundColor: "rgba(25, 69, 116, 0.8)",
    borderColor: "#0196ff",
    textStyle: {
      color: "#DFEEFF",
    },
    formatter: function (params) {
      console.log("params", params);
      let htmlStr = "";
      const transparent = { 1: "一", 2: "二", 3: "三" };
      for (let i = 0; i < params.data.area.length; i++) {
        const param = params.data.area[i];
        const name = param.name;
        const value = param.case_number;
        const minName = param.parent_area.name;

        htmlStr += "<val>" + (i + 1) + "." + "</val>  ";
        htmlStr += "<val>" + name + "-" + minName + "</val>  ";
        htmlStr += "<val>" + "( " + value + " )" + "</val></br>";
      }
      return htmlStr;
    },
    rich: {
      val: {
        fontSize: 12,
        fontWeight: "bolder",
        color: "#fff",
      },
    },
  },
  grid: {
    left: 0,
    top: 0,
    bottom: 10,
    right: 0,
    containLabel: true,
  },
  polar: {},
  angleAxis: {
    interval: 0,
    type: "category",
    data: ["普招", "提前批", "体育生", "专升本"],
    z: 10,
    axisLine: {
      show: false,
      lineStyle: {
        color: "blue",
        width: 0,
        type: "solid",
      },
    },
    axisTick: false,
    axisLabel: {
      show: false,
      interval: 0,
      color: "gray",
      margin: 8,
      fontSize: 14,
    },
  },
  radiusAxis: {
    min: 60,
    max: 120,
    interval: 20,
    axisLine: { show: false },
    axisTick: false,
    axisLabel: {
      formatter: "{value} %",
      interval: 0,
      show: false,
      padding: [0, 0, 10, 0],
      color: "#0B3E5E",
      font: 16,
    },
    splitLine: {
      lineStyle: {
        color: "#F1F8FF",
        width: 0,
        type: "solid",
      },
    },
  },
  calculable: true,
  series: [
    {
      name: "",
      type: "pie",
      radius: ["10%", "11%"],
      // center: ["50%", "30%"],
      roseType: "radius",
      label: {
        show: false,
      },
      emphasis: { scale: false, label: { show: false } },
      itemStyle: {
        borderRadius: "30%",
        color: {
          type: "linear",
          x: 0,
          x2: 0,
          y: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: "#2BFEFE" },
            { offset: 1, color: "#4BC2D3" },
          ],
        },
        shadowBlur: 15,
        shadowColor: "#0EB7F7",
      },
      data: [20],
    },
    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: function (params, api) {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
          },
          style: {
            stroke: "rgba(0, 174, 255,0.5)",
            fill: "transparent",
            lineWidth: 1,
          },
          silent: true,
        };
      },
      data: [0],
    },
    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: function (params, api) {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.68,
          },
          style: {
            stroke: "rgba(0, 174, 255,0.8)",
            fill: "transparent",
            lineWidth: 2,
          },
          silent: true,
        };
      },
      data: [0],
    },
    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: function (params, api) {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.5,
          },
          style: {
            stroke: "rgba(0, 174, 255,0.28)",
            fill: "transparent",
            lineWidth: 2,
          },
          silent: true,
        };
      },
      data: [0],
    },
    {
      name: "案件类型",
      type: "pie",
      radius: ["20%", "40%"],
      center: ["50%", "50%"],
      roseType: "radius",
      zlevel: 10,
      label: {
        show: true,
        // fontSize: 12,
        align: "center",
        interval: 0,
        formatter: function (params: any) {
          const name = params.name;
          const percent = params.value;
          const index = params.dataIndex || 0;
          return [`{a${index}|${name}}\n{b${index}|${percent}}`];
        },
        rich: getRich(pieColors, 12),
      },
      data: [],

      labelLine: {
        length: 40,
        length2: 30,
        lineStyle: {
          angle: 0, // 设置线的角度为 45 度
        },
        emphasis: {
          show: true,
        },
      },
      startAngle: 90,
      minAngle: 0,
      avoidLabelOverlap: true, // 是否启用防止标签重叠策略
      z: 2,
    },
  ],
};
