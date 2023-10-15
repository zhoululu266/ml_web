<template>
  <div></div>
</template>

<script setup lang="ts">
let formatNumber = function (num) {
  let reg = /(?=(\B)(\d{3})+$)/g;
  return num.toString().replace(reg, ",");
};
const color3 = [
  "#00FFFF",
  "#00FF80",
  "#FFEA00",
  "#FF7300",
  "#9500B3",
  "#3377FF",
];
function getRich() {
  let result = {};
  color3.forEach((_, i) => {
    result[`a${i}`] = {
      color: "#fff",
      fontSize: 18,
    };
    result[`b${i}`] = {
      color: color3[i],
      fontSize: 18,
      fontWeight: 500,
      padding: [15, 0, 0, 0],
    };
  });
  return result;
}
let dataList = [
  {
    name: "土豆",
    value: "3720",
  },
  {
    name: "山药",
    value: "9",
  },
  {
    name: "玉米",
    value: "2200",
  },
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
  ["#00FFFF", "#0088CC"],
  ["#00FF80", "#009933"],
  ["#FFEA00", "#996100"],
  ["#FF7300", "#CC3A00"],
  ["#9500B3", "#550080"],
  ["#3377FF", "#243CB3"],
];

let data = [];
let legendDate = [];
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

const option = {
  backgroundColor: "#030312",
  color: color3,
  tooltip: {
    trigger: "item",
  },
  title: [
    {
      text: "{val|" + total + "元}",
      top: "center",
      left: "center",
      textStyle: {
        rich: {
          val: {
            fontSize: 32,
            fontWeight: "bolder",
            color: "#fff",
          },
        },
      },
    },
  ],
  series: [
    {
      name: "占比1",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 0,
      },
      labelLine: {
        normal: {
          length: 20,
          length2: 120,
          lineStyle: {
            // color: '#e6e6e6'
          },
        },
      },
      label: {
        show: true,
        fontSize: 15,
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
</script>

<style scoped></style>
