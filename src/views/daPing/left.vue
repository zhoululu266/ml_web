<template>
  <div class="cl">
    <div class="table-box">
      <ModelTitle model-title="法律顾问" type="square" />
      <ScrollTable
        :columns="columns"
        :tableData="tableData"
        :trHeight="36"
        :indexSet="{ label: '序号', width: '58px', span: 4 }"
      />
    </div>
    <div class="table-box">
      <ModelTitle model-title="调解员" type="square" />
      <ScrollTable
        :columns="columns1"
        :tableData="tableDataTjy"
        :trHeight="36"
        :indexSet="{ label: '序号', width: '58px', span: 4 }"
      />
    </div>
    <div class="aj-box" ref="yjqkBox">
      <ModelTitle model-title="案件类型统计" type="square"
        ><div class="right">
          案件类型总数<span>{{ total }}</span>
        </div></ModelTitle
      >

      <div
        id="ajlxEchart"
        class="yjqk-chart"
        :style="{ height: chartHeight }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from "vue";
import ModelTitle from "./components/modelTitle.vue";
import * as echarts from "echarts";
import { noDataOption } from "./components/noDataOption";

import ScrollTable from "./components/scrollTable1.vue";
import { option } from "./components/pieChartLeft";
import { useMain } from "@/store";
import _ from "lodash";

const optionSet = _.clone(option);
const mainStore = useMain();
const mainStoreData = mainStore.getPageList();
const total = ref();
const columns = ref([
  { prop: "name", label: "姓名", width: 70, span: 5 },
  { prop: "department", label: "部门", width: 80, span: 5 },
  { prop: "dq", label: "负责地区", width: 100, span: 7 },
  { prop: "case_number", label: "调解数", width: 100, class: "ttjs", span: 3 },
]);
const columns1 = ref([
  { prop: "name", label: "姓名", width: 86, span: 6 },
  { prop: "area", label: "负责地区", width: 140, span: 9 },
  { prop: "case_number", label: "调解数", width: 100, class: "ttjs", span: 3 },
]);
const tableData = ref([]);
const tableDataTjy = ref([]);

const tableDataAjlx = ref([]);

const getArea = (data) => {
  let dd;
  if (typeof data === "string") {
    dd = data;
  } else {
    const array = [];
    data &&
      data?.length > 0 &&
      data.forEach((item) => {
        array.push(item.parent_area.name + "-" + item.name);
      });
    dd = array.toString();
  }
  return dd;
};
const tranData = (data) => {
  data &&
    data?.length > 0 &&
    data.forEach((item) => {
      item.dq = getArea(item.area);
    });
};

// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    if (tableData.value != state.pageList?.flgw) {
      tableData.value = state.pageList?.flgw;
      tranData(tableData.value);
    }
    if (tableDataTjy.value != state.pageList?.tjy) {
      tableDataTjy.value = state.pageList?.tjy;
    }
    if (tableDataAjlx.value != state.pageList?.ajlxyjsl) {
      tableDataAjlx.value = state.pageList?.ajlxyjsl;
      getList(tableDataAjlx.value);
    }
  },
  { detached: false }
);

const yjqkBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>("360px");
let myChart: echarts.ECharts;

/**
 * 获取警情趋势
 * @param code 组织机构code
 */
const getList = (data1) => {
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
  let tt = 0;

  const data = _.clone(data1);
  const newData = [];
  data &&
    data?.length > 0 &&
    data.map((item) => {
      newData.push({
        value: item.case_number,
        name: item.name,
        case_number: item.case_number,
        area: item.area,
      });
      // item.value = item.case_number;
      tt += item.case_number || 0;
    });
  total.value = tt;
  const result2 = {
    code: 200,

    data: newData,
  };
  if (result2.code === 200) {
    const names: any = []; // X轴坐标名称
    const zajq: any = [];

    // eslint-disable-next-line array-callback-return
    result2.data?.length > 0 &&
      result2.data.map((item: chartListType) => {
        names.push(item.name);
        zajq.push(item.case_number);
      });
    // console.log("option---------", names, option);

    optionSet.angleAxis.data = names;
    //  //console.log("optionSet.series", optionSet.series);

    optionSet.series[4].data = result2.data;

    if (myChart) myChart.setOption(option, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
  // })
  // .catch(() => {
  //   if (myChart) myChart.setOption(noDataOption, true);
  // });
};
onMounted(() => {
  chartHeight.value = `${yjqkBox.value!.offsetHeight + 30}px`;
  //console.log(" chartHeight.value ", chartHeight.value);
  if (mainStoreData?.flgw) {
    tableData.value = mainStoreData?.flgw;
  }
  if (mainStoreData?.tjy) {
    tableDataTjy.value = mainStoreData?.tjy;
  }
  getList(mainStoreData?.ajlxyjsl);
  setTimeout(() => {
    const chartDom = document.getElementById("ajlxEchart")!;
    myChart = echarts.init(chartDom);
    // // 图例点击方法 点击哪个显示哪个 其他隐藏
    // myChart.on("legendselectchanged", (params: any) => {
    //   const option: any = myChart.getOption();
    //   const select_key = Object.keys(params.selected);

    //   select_key.forEach((res) => {
    //     optionSet.legend[0].selected[res] = !params.selected[res];
    //   });

    //   optionSet.series[0].data = chartObj.value[params.name];

    //   myChart.setOption(option);
    // });
    myChart.setOption(option);
  }, 1000);
});
</script>
<style lan="scss">
.cl {
  .el-table {
    background: transparent;
    tr {
      background-color: transparent;
    }
    .el-table th.el-table__cell {
      background: transparent;
    }
  }
  .el-table--striped
    .el-table__body
    tr.el-table__row--striped
    td.el-table__cell {
    background: transparent;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
    background: transparent;
  }
  .el-table th.el-table__cell {
    background: transparent;
  }
  .el-table th {
    font-size: 9px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #7baeeb;
    background: transparent;
  }

  .el-table tr {
    background: rgba(87, 168, 255, 0.57);
    font-size: 9px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
  .el-table thead tr {
    background: transparent !important;
  }
  .el-table tr.el-table__row--striped {
    height: 36px;

    background: rgba(87, 168, 255, 0.09);
  }
  .el-table__inner-wrapper::before {
    content: "";
    position: absolute;
    background-color: transparent;
    z-index: 3;
  }
  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: #ffffff;
  }
  .el-table--enable-row-transition .el-table__body td.el-table__cell {
    height: 36px;
  }
  .el-table tbody tr {
    :last-child .cell {
      font-size: 14px;
      font-family: PangMenZhengDao;
      font-weight: 600;
      color: #ffffff;
    }
  }
  .flex-bottom {
    height: 242px;
  }
}
</style>
<style scoped lang="scss">
.cl {
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url("@/assets/images/card-bg.png");
  // overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 16px;
  box-sizing: border-box;
  .table-box {
    background-image: url("@/assets/images/jiao-bg.png");
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 6px 10px 10px 10px;
    margin-bottom: 20px;
    height: 38%;
  }
}

.aj-box {
  width: 100%;
  height: 28%;
  display: block;
  #ajlxEchart {
    margin-top: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    div {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #44c1ef;
      line-height: 16px;
      text-shadow: 1px 1px 0px rgba(17, 20, 22, 0.22);

      //   background: linear-gradient(
      //     0deg,
      //     rgba(250, 254, 255, 0.29) 0%,
      //     rgba(250, 254, 255, 0) 100%
      //   );
      //   -webkit-background-clip: text;
      //   -webkit-text-fill-color: transparent;
      span {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #44c1ef;
        line-height: 16px;
        text-shadow: 1px 1px 0px rgba(17, 20, 22, 0.22);

        // background: linear-gradient(
        //   0deg,
        //   rgba(250, 254, 255, 0.29) 0%,
        //   rgba(250, 254, 255, 0) 100%
        // );
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        margin-left: 20px;
      }
    }
  }
}
:deep(.v-s-s) {
  margin-top: -190px;
}
</style>
