<!-- 今日勤务异常排名 -->
<template>
  <div ref="qwycBox" class="qwycContainer">
    <ModelTitle :model-title="title" type="square" />
    <div class="content-car">
      <CardBox :config-data="configData" />
    </div>
    <!-- <Empty v-else :empty-type="emptyType" /> -->
  </div>
</template>
<script lang="ts" setup>
import ModelTitle from "../components/modelTitle.vue";
import CardBox from "./cardBox.vue";
import moment from "moment";
import { axiosPost } from "@/utils";
import Empty from "../components/empty.vue";
import _ from "lodash";

interface configDataType {
  resource: string;
  online: number | string;
  total: number | string;
  icon?: string;
  resourceCode?: string;
}

interface timeType {
  startTime: string;
  endTime: string;
}

const configData = ref<configDataType[]>([]);

let times: timeType = {
  startTime: moment().format("YYYY-MM-DD"),
  endTime: moment().format("YYYY-MM-DD"),
};

const emptyType = ref<string>("1"); // 缺省类型 1无数据 2网络异常
import { useMain } from "@/store";

const mainStore = useMain();
const flagData = ref();

// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    const fgtj = state.pageList?.fgtj;
    // console.log(
    //   "调解案件统计---",
    //   state.pageList,
    //   fgtj,
    //   JSON.stringify(fgtj) == JSON.stringify(flagData.value)
    // );
    if (JSON.stringify(fgtj) != JSON.stringify(flagData.value)) {
      getList(fgtj);
    }
  },
  { detached: false }
);
onMounted(() => {
  // console.log("mainStore.setPageList?.fgtj", mainStore.getPageList()?.fgtj);

  getList(mainStore.getPageList()?.fgtj);
});

/**
 * 调解案件统计
 * @param code 组织机构code
 */
const getList = (fgtj1) => {
  const fgtj = _.clone(fgtj1);
  flagData.value = fgtj;
  const result = {
    code: 200,
    data: {
      flgw_cgs: fgtj?.judgeSuccessNumber || 0,
      tjy_cgs: fgtj?.mediatorsSuccessNumber || 0,
      flgw_cgl: fgtj?.judgeSuccessPV || 0,
      tjy_cgl: fgtj?.mediatorsSuccessPV || 0,
    },

    message: "成功",
  };
  if (result.code === 200) {
    configData.value = result.data;
  } else {
    emptyType.value = "1";
  }
};

const title = ref<string>("调解案件统计");
</script>
<style>
.el-table__empty-text {
  color: #ffffff;
  margin-top: -20%;
  font-size: 16px;
}
</style>
<style lang="scss" scoped>
.content-car {
  padding-top: 2px;
}
.qwycContainer {
  width: 393px;
  height: 290px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("@/assets/images/jiao-bg.png");
  margin-bottom: 4%;
  padding-bottom: 2%;
  .title {
    margin-left: 4px;
    padding-left: 16px;
    margin-top: 4px;
  }
}
</style>
