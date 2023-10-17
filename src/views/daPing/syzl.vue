<template>
  <div class="jwts">
    <div class="header">
      <!-- 穆棱市人民法院诉源治理数据平台 -->
      <TimeBox />
    </div>

    <div class="container">
      <div class="mainItem"><Left /></div>
      <div class="mainItemor"><Center @changeShow="changeShow" /></div>
      <div class="mainItem"><Right /></div>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script lang="ts" setup>
import moment from "moment";
import Left from "./left.vue";
import Right from "./right.vue";
import Center from "./center.vue";

import TimeBox from "@/components/timeBox.vue";
import { axiosFormData } from "@/utils";
import { useRouter } from "vue-router";
import { useMain } from "@/store";

const mainStore = useMain();
const router = useRouter();
const pageInterval = ref<string | number | NodeJS.Timeout | undefined>();
const mapInterval = ref<string | number | NodeJS.Timeout | undefined>();

const mainStoreData = mainStore.getPageList();

const changeShow = () => {
  console.log("changeShow", router);
  router.replace({
    path: "/home",
  });
};
const url = `${$config.api}`;

// 【首页】执前案件和解数
const getZxqhjsData = async () => {
  const api = `${url}/homePage/case/执前案件和解数`;
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ zxqhjs: res.number });
    });
  } catch (error) {
    console.error(error);
  }
};
//【首页】诉调对接分流率
const getSsdjflData = async () => {
  const api = `${url}/homePage/case/诉调对接分流率`;
  // baseFun(api, "syzl");
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ ssdjfl: res.number });
    });
  } catch (error) {
    console.error(error);
  }
};
//【首页】诉调对接数
const getSsdjslData = async () => {
  const api = `${url}/homePage/case/judge/field/number`;
  // baseFun(api, "syzl");
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ ssdjs: res.number });
    });
  } catch (error) {
    console.error(error);
  }
};
//【首页】溯源治理案件数量
const getSyzlData = async () => {
  const api = `${url}/homePage/case/number`;
  // baseFun(api, "syzl");
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ syzl: res.number });
    });
  } catch (error) {
    console.error(error);
  }
};
//【首页】法官/调解员成功案件数以及PV
const getFgtjData = async () => {
  const api = `${url}/homePage/case/successNumber`;
  // baseFun(api, "fgtj");
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ fgtj: res.data });
    });
  } catch (error) {
    console.error(error);
  }
};
//【首页】法官地区走访数量
const getFgzfsData = async () => {
  try {
    const api = `${url}/homePage/judge/area/number`;
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ zfs: res.data });
    });
  } catch (error) {
    console.error(error);
  }
};

//【首页】案件类型以及数量
const getAjlxyjslData = async () => {
  try {
    const api = `${url}/homePage/caseType/number`;
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({
        ajlxyjsl: res,
      });
    });
  } catch (error) {
    console.error(error);
  }
};

//【首页】调解员
const getTjyData = async () => {
  try {
    const api = `${url}/homePage/mediators/list`;
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ tjy: res });
    });
  } catch (error) {
    console.error(error);
  }
};

//【首页】法律顾问列表
const getFlgwData = async () => {
  try {
    const api = `${url}/homePage/judge/list`;
    axiosFormData(api, {
      token: "GNVDKar7VfmDPejiXmpOnQerxUmlpQJMS5rZk=",
    }).then((res: any) => {
      mainStore.setPageList({ flgw: res.data });
    });
  } catch (error) {
    console.error(error);
  }
};
// const ddd = ref([]);

// // setTimeout(() => {
// ddd.value = [{ area: { parent_area: { name: "八面通镇" } } }];
// // }, 1100);
// setTimeout(() => {
//   ddd.value = [];
// }, 1200);
//【首页】地图书记
const getMapData = async () => {
  try {
    const api = `${url}/newCaseNotice`;
    axiosFormData(api).then((res: any) => {
      // const res = {
      //   code: 200,
      //   data: [
      //     {
      //       id: 86,
      //       case_number: "202310180003",
      //       client_id: 46,
      //       accused_client_id: 52,
      //       case_type_id: 1,
      //       area_id: 31,
      //       mediators_id: 8,
      //       judge_id: 0,
      //       client_remark: "123456",
      //       mediators_remark: "",
      //       judge_remark: "",
      //       state: "4",
      //       created_at: "2023-10-18 00:24:57",
      //       updated_at: "2023-10-18 00:54:31",
      //       deleted_at: null,
      //       judge_remark_1: null,
      //       mediators_remark_1: null,
      //       notice_state: "true",
      //       accused_client_name: "林",
      //       accused_client_mobile: "17610240567",
      //       client: {
      //         id: 46,
      //         name: "6哥",
      //         password:
      //           "$2y$10$o84qQWf3mehIKelcwXX4Quj3r8M7Crn9Bg/9JFMv5IP0dzekSmEuG",
      //         mobile: "18545806662",
      //         idcard: "111111111111111111",
      //         identity: "个人",
      //         created_at: "2023-10-17 04:39:07",
      //         updated_at: "2023-10-18 00:15:36",
      //         deleted_at: null,
      //         api_token: "e53c752b-95e4-4e1c-acd5-c6408a652d3e",
      //         company_card: "",
      //         area_id: 31,
      //       },
      //       accused_client: {
      //         id: 52,
      //         name: "林",
      //         password:
      //           "$2y$10$pA8ey5Alna1uN7u/OrF7veam//bn30eyNx1qeq2u.WDSIAANYrGT.",
      //         mobile: "17610240567",
      //         idcard: "111111221212121212",
      //         identity: "个人",
      //         created_at: "2023-10-17 22:05:29",
      //         updated_at: "2023-10-17 23:20:32",
      //         deleted_at: null,
      //         api_token: "9bfb560f-0355-49c4-95ec-219f1238b42e",
      //         company_card: "",
      //         area_id: 31,
      //       },
      //       case_type: {
      //         id: 1,
      //         name: "家事纠纷",
      //         created_at: "2023-10-04 06:38:46",
      //         updated_at: "2023-10-12 03:27:18",
      //         deleted_at: null,
      //       },
      //       area: {
      //         id: 31,
      //         parent_id: 25,
      //         name: "太和村",
      //         created_at: "2023-10-09 07:22:42",
      //         updated_at: "2023-10-09 07:22:42",
      //         deleted_at: null,
      //         parent_area: {
      //           id: 25,
      //           parent_id: 0,
      //           name: "八面通镇",
      //           created_at: "2023-10-09 07:21:00",
      //           updated_at: "2023-10-09 07:21:00",
      //           deleted_at: null,
      //           parent_area: null,
      //         },
      //       },
      //       mediators: {
      //         id: 8,
      //         area_id: 31,
      //         comprehensiveness: true,
      //         name: "调解员（测试）",
      //         password:
      //           "$2y$10$DZVWBnrFRk/JEtB0y5Ee4emY2U3iV0WaO2R5BqcWSI7NbBDbdpDtq",
      //         mobile: "13384515545",
      //         idcard: "20106199304090832",
      //         created_at: "2023-10-17 13:50:14",
      //         updated_at: "2023-10-17 14:31:01",
      //         deleted_at: null,
      //         api_token: null,
      //       },
      //       judge: null,
      //       files: [
      //         {
      //           id: 268,
      //           file_name: "1697559889826453.jpeg",
      //           file_type: "jpg",
      //           file_size: "28257",
      //           url: "images/2023-10-18/xHccpuSHxNOyX1T4sArkBpcZc6MbmZft8gBVe55W.jpg",
      //           created_at: "2023-10-18 00:24:56",
      //           case_id: 86,
      //           updated_at: "2023-10-18 00:24:57",
      //           upload_author: "当事人",
      //           web_url:
      //             "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-18/xHccpuSHxNOyX1T4sArkBpcZc6MbmZft8gBVe55W.jpg",
      //         },
      //       ],
      //       chat_room: null,
      //     },
      //   ],
      // };
      const timestamp = new Date().getTime();
      const timestamp1 = moment().valueOf();
      // console.log("setPageList", ddd.value, timestamp, timestamp1);
      const arr = [];

      res.data?.length > 0 &&
        res.data.forEach((item) => {
          arr.push(item?.area?.parent_area?.name);
        });
      // console.log(
      //   "getMapData-setPageList",
      //   arr,
      //   res?.data?.area?.parent_area?.id
      // );
      console.log("res.data", res.data);

      mainStore.setPageList({
        dtsj: {
          data: arr,
          info: res.data,
          time: moment().valueOf(),
        },
      });
    });
  } catch (error) {
    console.error(error);
  }
};
const desFun = () => {
  getFlgwData();
  getTjyData();
  getAjlxyjslData();
  getFgzfsData();
  getFgtjData();
  getZxqhjsData();
  getSsdjflData();
  getSsdjslData();
  getSyzlData();
};
onMounted(() => {
  // setTimeout(() => {
  desFun();
  getMapData();
  // }, 6000);

  pageInterval.value = setInterval(desFun, 30000);
  mapInterval.value = setInterval(getMapData, 10000);
});
onUnmounted(() => {
  clearInterval(mapInterval.value);
  clearInterval(pageInterval.value);
});
</script>
<style lang="scss" scoped>
.time-box {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  position: relative;
  top: 74px;
  left: -10px;

  .time {
    font-size: 23px;
    font-family: PangMenZhengDao;
    font-weight: 600;
    color: #aecaf5;
    background-image: -webkit-linear-gradient(
      bottom,
      #b8d1f6,
      #b3cff6,
      #90aace
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .day {
    font-size: 12px;
    font-family: PangMenZhengDao;
    font-weight: 600;
    color: #aecaf5;
    background-image: -webkit-linear-gradient(
      bottom,
      #b8d1f6,
      #b3cff6,
      #90aace
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.jwts {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/tsbg.png");
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-family: Source Han Sans CN;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 0 60px 0px 60px;
  .header {
    width: 100%;
    height: 166px;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    // background-color: rgba(100, 199, 116, 0.329);
    // background-image: url("@/assets/images/header-bg.png");
    background-position: center;
    background-repeat: no-repeat;
    margin-top: -40px;
    background-size: 87% 100%;
  }
  .bottom {
    height: 70px;
  }
  .container {
    width: 100%;
    // flex: 1;
    height: calc(100% - 236px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    // overflow: hidden;
    // margin-bottom:70px;
  }
  .mainItem {
    padding-bottom: 10px;
    // background: rgba(0, 8, 44, 0.2);
    width: 420px;
  }
  .mainItemor {
    margin-top: -15px;
    width: calc(100% - 840px);
    display: grid;
  }
}
</style>
