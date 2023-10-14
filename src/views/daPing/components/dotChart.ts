const color3 = ["#F87598", "#FFE654", "#16BDF8"];
function getRich() {
  let result = {};
  color3.forEach((_, i) => {
    result[`a${i}`] = {
      color: "#fff",
      fontSize: 10,
      itemHeight: 4,
    };
    result[`b${i}`] = {
      color: color3[i],
      fontSize: 10,
      fontWeight: 500,
      padding: [0, 0, 0, 0],
    };
  });
  return result;
}
let dataList = [
  {
    name: "番茄",
    value: "1420",
  },
  {
    name: "大豆",
    value: "3200",
  },
  {
    name: "韭菜",
    value: "2420",
  },
];
const color1 = ["#323042", "#323042"];
const color = [
  ["#FFB8B0", "#9E4264"],
  ["#FFEA56", "#FFB73E"],
  ["#16BAF7", "#0F82AC"],
];

let data = [];
let legendDate = [];
export const changeDotDate = () => {};
let total = dataList.reduce((a, b) => {
  return a + b.value * 1;
}, 0);
// 循环添加数据
for (let i = 0; i < dataList.length; i++) {
  let tag = i % 5;
  data.push({
    name: dataList[i].name,
    value: dataList[i].value,
    itemStyle: {
      //borderRadius: "50%",
      //颜色渐变
      color: {
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: color[tag][0], // 0% 处的颜色
          },
          {
            offset: 1,
            color: color[tag][1], // 100% 处的颜色
          },
        ],
      },
    },
  });
  legendDate.push(dataList[i].name);
}

export const dotOption = {
  color: color3,
  tooltip: {
    trigger: "item",
  },
  title: [
    {
      text: "{val|" + total + "个}",
      top: "center",
      left: "center",
      textStyle: {
        rich: {
          val: {
            fontSize: 10,
            fontWeight: "bolder",
            color: "#fff",
          },
        },
      },
    },
  ],
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["30%", "48%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 0,
      },
      labelLine: {
        normal: {
          length: 18,
          length2: 18,
          lineStyle: {
            // color: '#e6e6e6'
          },
        },
      },
      label: {
        show: true,
        fontSize: 10,
        lineHeight: 20,
        align: "center",
        formatter: function (params) {
          const name = params.name;
          const percent = params.value + "个";
          const index = params.dataIndex || 0;
          return [`{a${index}|${name}}\n{b${index}|${percent}}`];
        },
        rich: getRich(),
      },
      data: data,
    },
  ],
};
