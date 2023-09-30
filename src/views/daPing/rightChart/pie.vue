<template>
  <div id="pieEchart" class="pie-chart" :style="{ height: chartHeight }"></div>
</template>

<script setup lang="ts">
import { noDataOption } from "../components/noDataOption";
import * as echarts from "echarts";
import { option } from "../components/pieChart";
const chartHeight = ref<string>("154px");
let myChart: echarts.ECharts;

/**
 * 获取警情趋势
 * @param code 组织机构code
 */
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
      { value: 10, name: "外部人员过问信息" },
      { value: 20, name: "内部人员过问信息" },
      { value: 16, name: "接触交往" },
    ],
  };
  if (result2.code === 200) {
    const names: any = []; // X轴坐标名称
    const zajq: any = [];

    // eslint-disable-next-line array-callback-return
    result2.data.map((item: chartListType) => {
      names.push(item.name);
      zajq.push(item.value);
    });

    // option.angleAxis.data = names;
    console.log("option.series", option.series);

    option.series[4].data = result2.data;

    if (myChart) myChart.setOption(option, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
  // })
  // .catch(() => {
  //   if (myChart) myChart.setOption(noDataOption, true);
  // });
};

onMounted(() => {
  // drawChart();
  // getYjListData();
  //   chartHeight.value = `${yjqkBox.value!.offsetHeight - 40}px`;
  console.log(" chartHeight.value ", chartHeight.value);

  setTimeout(() => {
    const chartDom = document.getElementById("pieEchart")!;
    myChart = echarts.init(chartDom);
    // // 图例点击方法 点击哪个显示哪个 其他隐藏
    // myChart.on("legendselectchanged", (params: any) => {
    //   const option: any = myChart.getOption();
    //   const select_key = Object.keys(params.selected);

    //   select_key.forEach((res) => {
    //     option.legend[0].selected[res] = !params.selected[res];
    //   });

    //   option.series[0].data = chartObj.value[params.name];

    //   myChart.setOption(option);
    // });
    myChart.setOption(option);
    getList();
  }, 1000);
});
</script>

<style scoped></style>
