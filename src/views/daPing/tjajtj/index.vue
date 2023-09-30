<!-- 今日勤务异常排名 -->
<template>
  <div ref="qwycBox" class="qwycContainer">
    <ModelTitle :model-title="title" type="square" />
    <div v-if="Object.keys(configData).length > 0" class="content-car">
      <CardBox :config-data="configData" />
    </div>
    <Empty v-else :empty-type="emptyType" />
  </div>
</template>
<script lang="ts" setup>
import ModelTitle from "../components/modelTitle.vue";
import CardBox from "./cardBox.vue";
import moment from "moment";
import { axiosPost } from "@/utils";
import Empty from "../components/empty.vue";

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

onMounted(() => {
  getList();
});

/**
 * 调解案件统计
 * @param code 组织机构code
 */
const getList = () => {
  //   const data = recursionCode(user.orgList, code);
  //   orgLevel.value = data?.name;
  // const url = `${$config.patrolApi}/xk/sit/jqxx_statistics/listPoliceAndEquip`;
  // const params = {
  //   // userId: use.user.id,
  //   orgCode: code,
  //   beginTime: times.startTime,
  //   endTime: times.endTime,
  // };
  // axiosPost(url, params)
  //   .then((result) => {

  const result = {
    code: 200,
    data: {
      flgw_cgs: 2038,
      tjy_cgs: 2049,
      flgw_cgl: 75,
      tjy_cgl: 74,
    },

    message: "成功",
  };
  if (result.code === 200) {
    console.log("result.data", result.data);

    configData.value = result.data;
  } else {
    emptyType.value = "1";
  }
  // })
  // .catch(() => {
  //   emptyType.value = "1";

  // });
};

const title = ref<string>("调解案件统计");
</script>
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
