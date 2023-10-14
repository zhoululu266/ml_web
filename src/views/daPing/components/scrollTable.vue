<!-- eslint-disable vue/valid-v-for -->
<template>
  <div ref="flexBottom" class="flex-bottom">
    <el-table
      ref="table"
      stripe
      :data="tableDataRef"
      class="alarm-table"
      :height="height"
      header-cell-class-name="hlk_table_header"
      :cell-class-name="tableCellClass"
    >
      <!-- <template #empty>
        <div v-if="yichang == 'err'" class="empty">
          <img :src="'./images/icon/errorEmpty.png'" />
          <span class="no-text">数据加载错误</span>
        </div>
        <div v-else-if="yichang == 'loading'" class="empty">
          <img :src="'./images/icon/loadingEmpty.png'" />
          <span class="no-text">数据加载中...</span>
        </div>
        <div v-else class="empty">
          <img :src="'./images/icon/Empty.png'" />
          <span class="no-text">暂无数据</span>
        </div>
      </template> -->
      <el-table-column
        type="index"
        :width="indexSet?.width || '80px'"
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
          <!-- {{ LevelList[scope.row.dutyType] }} -->
          {{ getArea(scope.row.area) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { array } from "js-md5";
import { ref, onMounted, watch } from "vue";
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
const t = ref();
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
    clearInterval(t.value);
    tableDataRef.value = [];

    if (newVal.length * props.trHeight > height.value - props.trHeight) {
      tableDataRef.value = [...newVal, ...newVal];
      infinitScroll();
    } else {
      tableDataRef.value = newVal;
    }
  },
  {
    immediate: true,
  }
);
watch(
  () => props.tableData,
  (v: any) => {
    clearInterval(t.value);
    flagArr.value = v;
  }
);
onMounted(() => {

  height.value = flexBottom.value.getBoundingClientRect().height;
  flagArr.value = props.tableData;
});

function infinitScroll() {
  let a = 0;
  // 拿到表格中承载数据的div元素
  const divData = table.value.$refs.bodyWrapper;
  const ss = divData.getElementsByClassName("el-scrollbar__wrap")[0];
  divData.onmouseover = function () {
    clearInterval(t.value);
  }; // 鼠标移入，停止滚动
  divData.onmouseout = function () {
    start();
  }; // 鼠标移出，继续滚动
  start();
  function start() {
    // 数据少于表格高度停止滚动
    t.value = setInterval(() => {
      // 元素自增距离顶部1像素
      a += 1;
      if (table.value) table.value!.setScrollTop(a);
      // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
      if (ss.clientHeight + ss.scrollTop == ss.scrollHeight) {
        // 重置table距离顶部距离
        a = ss.scrollTop - ss.scrollHeight / 2;
      }
    }, 30);
  }
}

onUnmounted(() => {
  clearInterval(t.value);
});
</script>
<style lang="scss">
// .alarm-table {
//   .el-table__inner-wrapper::before {
//     height: 0px;
//   }
//   .el-table {
//     color: var(--hlk-table-text);
//   }
//   // .el-table__row.hover-row {
//   //   background: var(--hlk-table-hover-bg) !important;
//   // }

//   .hlk_table_header {
//     background: var(--hlk-table-head-bg) !important;
//     color: var(--main-title-text);
//     height: 32px;
//     border: none !important;
//     &:nth-child(1) {
//       .cell {
//         padding-left: 24px !important;
//       }
//     }
//   }

//   .hlk_table_row {
//     height: 32px;
//     color: var(--main-subtitle-text);
//     border-bottom-color: transparent !important;
//     &:nth-child(1) {
//       .cell {
//         padding-left: 24px !important;
//       }
//     }
//   }

//   .hlk_table_row_disbaled {
//     height: 32px;
//     background: var(--hlk-table-disable-bg) !important;
//     cursor: no-drop;
//     .hlk_table_cell {
//       background: var(--hlk-table-disable-bg) !important;
//       :nth-child(1) {
//         padding-left: 24px;
//       }
//     }
//   }
// }
// .el-table--enable-row-hover .el-table__body tr:hover {
//   background: var(--hlk-table-hover-bg) !important;
// }

// .yichang {
//   color: var(--el-color-danger);
// }
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
  height: 32px;
}
// .el-table tbody tr {
//   :last-child .cell {
//     font-size: 14px;
//     font-family: PangMenZhengDao;
//     font-weight: 600;
//     color: #ffffff;
//   }
// }
.empty {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.no-text {
  line-height: 22px;
  font-size: 16px;
}
</style>
