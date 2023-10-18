<!-- eslint-disable vue/valid-v-for -->
<template>
  <div ref="flexBottom" class="flex-bottom">
    <el-table
      ref="table"
      stripe
      :data="[]"
      class="alarm-table"
      :height="height"
      header-cell-class-name="hlk_table_header"
      :cell-class-name="tableCellClass"
    >
      <el-table-column
        type="index"
        :width="indexSet?.width || '70px'"
        :label="indexSet?.label"
        align="left"
      >
        <template #default="scope">
          {{ transNum(scope.$index + 1) }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in columns"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :class="item.class"
        :show-overflow-tooltip="true"
      >
        <template v-if="item.label == '负责地区'" #default="scope">
          {{ getArea(scope.row.area) }}
        </template>
      </el-table-column>
    </el-table>
    <vue3-seamless-scroll
      class="v-s-s"
      :list="tableDataRef"
      :hover="true"
      :step="0.6"
    >
      <el-row
        class="list-row"
        v-for="(item, index) in tableDataRef"
        :key="index"
      >
        <el-col :span="indexSet?.span || 2">
          <p class="circle-nos">{{ transNum(index + 1) }}</p>
        </el-col>
        <el-col
          v-for="o_item in Object.keys(columnsObj)"
          :class="columnsObj[o_item].class || ''"
          :span="columnsObj[o_item].span"
        >
          <TextTooltip
            :content="o_item == 'area' ? getArea(item.area) : item[o_item]"
            ref-name="1"
            style="width: 100%"
          ></TextTooltip>
        </el-col>
      </el-row>
    </vue3-seamless-scroll>
  </div>
</template>

<script lang="ts" setup>
import { array } from "js-md5";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import TextTooltip from "./TextTooltip.vue";
import { ref, onMounted, watch } from "vue";

const defaultOption = {
  step: 0.2, // 数值越大速度滚动越快
  limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
  hoverStop: false, // 是否开启鼠标悬停stop
  direction: 1, // 0向下 1向上 2向左 3向右
  openWatch: true, // 开启数据实时监控刷新dom
  singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
  singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
  waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
};

const getArea = (data) => {
  let dd;
  if (typeof data === "string") {
    dd = data;
  } else {
    const array = [];
    data &&
      data?.length > 0 &&
      data.forEach((item) => {
        array.push(item.parent_area.name);
      });
    dd = array.toString();
  }
  return dd;
};
interface Row {
  [key: string]: unknown;
}

const tableCellClass = ({ row }: { row: Row }) => {
  if (row.disabled) {
    return "hlk_table_row_disbaled hlk_table_cell";
  }
  return "hlk_table_row";
};

const height = ref();
const flexBottom = ref();
const table = ref();
const tableDataRef = ref<any>([]);

interface Props {
  tableData: any;
  columns: any;
  indexSet: any;
  trHeight?: number;
}
const transNum = (num: number) => {
  if (num > flagArr.value?.length) {
    return (num - flagArr.value?.length).toString().padStart(2, "0");
  } else {
    return num.toString().padStart(2, "0");
  }
};
const columnsObj = ref({});
const getObj = () => {
  const obj = {};
  props.columns.forEach((item) => {
    obj[item.prop] = item;
  });
  columnsObj.value = obj;
};

const props = withDefaults(defineProps<Props>(), {
  tableData: () => {
    return [];
  },
  columns: () => {
    return [];
  },
  indexSet: () => {
    return {};
  },
  trHeight: 32,
});
const flagArr = ref([]);
watch(
  () => flagArr.value,
  (newVal: any) => {
    tableDataRef.value = [];
    tableDataRef.value = newVal;
  },
  {
    immediate: true,
  }
);
watch(
  () => props.tableData,
  (v: any) => {
    flagArr.value = v;
  }
);
onMounted(() => {
  getObj();
  height.value = flexBottom.value.getBoundingClientRect().height;
  flagArr.value = props.tableData;
});
</script>
<style lang="scss">
.el-table {
  background: transparent;
  tr {
    background-color: transparent;
  }
  .el-table th.el-table__cell {
    background: transparent;
  }
}
.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background: transparent;
}
.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background: transparent;
}
.el-table th.el-table__cell {
  background: transparent;
}
.el-table th {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #7baeeb;
  background: transparent;
  .cell {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #7baeeb;
    background: transparent;
  }
}

.el-table tr {
  background: rgba(87, 168, 255, 0.57);
  font-size: 12px;
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
  height: 32px;
}

.empty {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-col.ttjs {
  font-size: 14px;
  font-family: PangMenZhengDao;
  font-weight: 600;
  color: #ffffff;
  padding-left: 4px;
}
.no-text {
  line-height: 22px;
  font-size: 16px;
}
.circle-nos {
  padding-left: 20px;
  height: 36px;
  line-height: 36px;
  margin: 0;
}
:deep(.el-table__body-wrapper) {
  display: none;
}
.el-table__body-wrapper {
  display: none;
}
.list-row {
  cursor: pointer;
  &:nth-child(2n + 1) {
    height: 36px;
    line-height: 36px;
    background: rgba(87, 168, 255, 0.09);
  }
  &:nth-child(2n) {
    height: 36px;
    line-height: 36px;
    background: rgba(87, 168, 255, 0.57);
  }
}
.el-col {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.v-s-s {
  height: 200px;
  width: 100%;
  margin: 100px auto;
  overflow: hidden;
  font-size: 13px;
  margin-top: -120px;
  z-index: 99;

  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;

  .v-s-s_item {
    display: flex;
    width: 100%;
    height: 34px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 3px 0;
    color: black;
    > div {
      width: 180px;
      height: 34px;
      display: inline-block;
      color: black;
    }
  }
}
</style>
