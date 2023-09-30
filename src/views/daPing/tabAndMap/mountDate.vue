<template>
  <div class="box_time">
    <div class="selectTitle time-mount" @click="showDate">
      <span>{{ nowYear }}年{{ month }}月</span>
      <div class="iconBg">
        <el-icon v-show="isShowDate"><ArrowUpBold /></el-icon>
        <el-icon v-show="!isShowDate"><ArrowDownBold /></el-icon>
      </div>
    </div>
    <div v-if="isShowDate" class="jxkp-date">
      <div class="year">
        <div>{{ nowYear }}年</div>
      </div>
      <!-- <div class="quick">
        <div>
          <span
            v-for="item in shortcuts.slice(0, 3)"
            :key="item"
            class="quickItem"
            :class="{ yearActiveBg: yearActive === item }"
            @click="quickClick(item)"
            >{{ item }}</span
          >
        </div>

        <div>
          <span
            v-for="item in shortcuts.slice(3, 7)"
            :key="item"
            class="quickItem"
            :class="{ yearActiveBg: yearActive === item }"
            @click="quickClick(item)"
            >{{ item }}</span
          >
        </div>
      </div>
      <div class="line"></div> -->
      <div class="mount">
        <div
          v-for="item in 12"
          :key="item"
          class="mountItem"
          :class="{ monthBg: month == item }"
          @click="handleMonth(item.toString())"
        >
          {{ item }}月
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment";
import { tspHead } from "@/store";

const useTab = tspHead();

// const shortcuts = ["年度", "上半年", "下半年", "第一季度", "第二季度", "第三季度", "第四季度"];
// const dateTitle = ref<string>("2023年");
const isShowDate = ref<boolean>(false); // 显示隐藏时间框
// 默认时间当月
// const dateObj = reactive({
//   startTime: moment().startOf("month").valueOf(),
//   endTime: moment().endOf("month").valueOf(),
// });
// const yearActive = ref(""); // 快捷选择active
const nowYear = ref<number>(parseInt(moment().format("YYYY"), 10)); // 当前年份
// const checkYear = ref<number>(parseInt(moment().format("YYYY"), 10)); // 切换后的年份
const nowmonth = ref<number>(parseInt(moment().format("MM"), 10)); // 当前月
const month = ref<number | string>(parseInt(moment().format("MM"), 10)); // 月份
// const emits = defineEmits(["closeDialog"]);

onMounted(() => {
  useTab.jxkpDate = month.value.toString();
});

// 点击绩效考评时间显示隐藏日期选择框
const showDate = () => {
  isShowDate.value = !isShowDate.value;
  // checkYear.value = parseInt(moment().format("YYYY"), 10);
};

// 切换年
// const handleYear = (type: string) => {
//   if (type === "next") {
//     if (checkYear.value === nowYear.value) {
//       return;
//     } else {
//       checkYear.value += 1;
//       quickClick(yearActive.value, 1);
//     }
//   } else {
//     checkYear.value -= 1;
//     quickClick(yearActive.value, 1);
//   }
//   console.log(checkYear.value);
// };

// 测试用
// const cTime = computed(() => {
//   return checkYear.value;
// });

// 点击月份
const handleMonth = (data: string) => {
  if (parseInt(data, 10) > nowmonth.value) {
    return;
  }
  month.value = parseInt(data, 10);
  // yearActive.value = "";
  // Object.assign(dateObj, {
  //   startTime: moment(moment().year(nowYear.value))
  //     .month(month.value - 1)
  //     .startOf("month")
  //     .valueOf(),
  //   endTime: moment(moment().year(nowYear.value))
  //     .month(month.value - 1)
  //     .endOf("month")
  //     .valueOf(),
  // });
  close();
  useTab.jxkpDate = data;
};

// 快捷选择格式化日期
// const quickClick = (item: string, type?: number) => {
//   yearActive.value = item;
//   console.log(item);
//   month.value = 0;
//   switch (item) {
//     case "年度":
//       Object.assign(dateObj, {
//         startTime: moment().year(checkYear.value).startOf("year").valueOf(),
//         endTime: moment().year(checkYear.value).endOf("year").valueOf(),
//       });
//       break;
//     case "上半年":
//       Object.assign(dateObj, {
//         startTime: moment(moment().year(checkYear.value)).month(0).startOf("month").valueOf(),
//         endTime: moment(moment().year(checkYear.value)).month(5).endOf("month").valueOf(),
//       });
//       break;
//     case "下半年":
//       Object.assign(dateObj, {
//         startTime: moment(moment().year(checkYear.value)).month(6).startOf("month").valueOf(),
//         endTime: moment(moment().year(checkYear.value)).month(11).endOf("month").valueOf(),
//       });
//       break;
//     case "第一季度":
//       Object.assign(dateObj, {
//         startTime: moment(moment().year(checkYear.value)).month(0).startOf("month").valueOf(),
//         endTime: moment(moment().year(checkYear.value)).month(2).endOf("month").valueOf(),
//       });
//       break;
//     case "第二季度":
//       Object.assign(dateObj, {
//         startTime: moment(moment().year(checkYear.value)).month(3).startOf("month").valueOf(),
//         endTime: moment(moment().year(checkYear.value)).month(5).endOf("month").valueOf(),
//       });
//       break;
//     case "第三季度":
//       Object.assign(dateObj, {
//         startTime: moment(moment().year(checkYear.value)).month(6).startOf("month").valueOf(),
//         endTime: moment(moment().year(checkYear.value)).month(8).endOf("month").valueOf(),
//       });
//       break;
//     case "第四季度":
//       Object.assign(dateObj, {
//         startTime: moment(moment().year(checkYear.value)).month(9).startOf("month").valueOf(),
//         endTime: moment(moment().year(checkYear.value)).month(11).endOf("month").valueOf(),
//       });
//       break;
//     default:
//       return "";
//   }
//   console.log(dateObj);
//   if (type !== 1) {
//     close();
//   }
// };

// 关闭窗口
const close = () => {
  isShowDate.value = false;
};

defineExpose({
  close,
});
</script>
<style lang="scss" scoped>
.box_time {
  .time-mount {
    position: fixed;
    top: 0;
    left: 0;
    height: 54px;
    padding-left: 16px;
    cursor: pointer;
    font-size: 32px;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #f3f9ff;
    display: flex;
    align-items: center;
    user-select: none;
    .iconBg {
      width: 22px;
      height: 22px;
      border-radius: 11px;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 16px;
      .el-icon {
        font-size: 14px;
      }
    }
  }
  .jxkp-date {
    position: fixed;
    top: 52px;
    left: 57px;
    z-index: 9999;
    width: 351px;
    height: 281px;
    padding-left: 16px;
    background: url("@/assets/tsp/dateBg.png") no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
    padding: 0;
    .year {
      height: 38px;
      display: flex;
      align-items: center;
      font-family: title;
      font-size: 18px;
      padding-top: 4px;
      cursor: pointer;
      justify-content: center;
    }
    .quick {
      height: 86px;
      padding: 0 8px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: space-around;
      .quickItem {
        display: inline-block;
        width: 73px;
        height: 24px;
        border: 1px solid #4c64a1;
        border-radius: 12px;
        margin: 0 4px;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
      }
      .yearActiveBg {
        background: #3e5cf1;
        color: #ffffff;
        border: 1px solid #3e5cf1;
      }
    }
    .line {
      border-top: 1px solid rgba(116, 163, 248, 0.27);
      width: 94%;
      margin-left: 3%;
    }
    .mount {
      height: calc(100% - 42px);
      padding: 0 5px;
      display: flex;
      flex-wrap: wrap;
      user-select: none;
      .mountItem {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #909399;
        cursor: pointer;
      }
      .monthBg {
        color: #dfeeff;
      }
    }
  }
}
</style>
