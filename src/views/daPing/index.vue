<template>
  <div class="jwts">
    <div class="header">
      <!-- 穆棱市人民法院诉源治理数据平台 -->
      <TimeBox />
    </div>
    <div class="container" v-if="sy">
      <div class="mainItem"><Sleft /></div>
      <div class="mainItemor"><Scenter @changeShow="changeShow" /></div>
      <div class="mainItem"><Sright /></div>
    </div>
    <div v-else class="container">
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
import Sleft from "./Sleft.vue";
import Sright from "./Sright.vue";
import Scenter from "./Scenter.vue";
import TimeBox from "@/components/timeBox.vue";
import { axiosFormData } from "@/utils";
import { useRouter } from "vue-router";
import { useMain } from "@/store";

const mainStore = useMain();
const router = useRouter();
const pageInterval = ref<string | number | NodeJS.Timeout | undefined>();
const mapInterval = ref<string | number | NodeJS.Timeout | undefined>();
const mapJjInterval = ref<string | number | NodeJS.Timeout | undefined>();

const sy = ref(true);
const mainStoreData = mainStore.getPageList();

const changeShow = () => {
  console.log("changeShow", router);
  router.replace({
    path: "/syzl",
  });
};
const url = `${$config.api}`;

//【首页】调解案件列表
const getSqtjyData = async () => {
  try {
    const api = `${url}/homePage/case/list`;
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ ...mainStoreData, sqajxx: res });
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
      const timestamp = new Date().getTime();
      // const res = {
      //   code: 200,
      //   data: [
      //     {
      //       id: 37,
      //       case_number: "202310100002",
      //       client_id: 22,
      //       accused_client_id: 28,
      //       case_type_id: 3,
      //       area_id: 31,
      //       mediators_id: 2,
      //       judge_id: 1,
      //       client_remark: "当事人描述",
      //       mediators_remark: "",
      //       judge_remark: "",
      //       state: "0",
      //       created_at: "2023-10-10 00:53:31",
      //       updated_at: "2023-10-15 22:17:27",
      //       deleted_at: null,
      //       judge_remark_1: null,
      //       mediators_remark_1: null,
      //       notice_state: "true",
      //       client: {
      //         id: 22,
      //         name: "林旭东",
      //         password:
      //           "$2y$10$1rG.ssmWrSjyFAudnpyC/uN9RwD28rAXElccKccMh.GC8ZD10fRfO",
      //         mobile: "18646330633",
      //         idcard: "230281199403180417",
      //         identity: "个人",
      //         created_at: "2023-10-03 21:09:41",
      //         updated_at: "2023-10-14 17:39:53",
      //         deleted_at: null,
      //         api_token: "1a1c258d-0dd3-4592-b803-b574eb7537eb",
      //         company_card: "",
      //         area_id: 31,
      //       },
      //       accused_client: {
      //         id: 28,
      //         name: "徐",
      //         password:
      //           "$2y$10$Nd4CupBZcamObrFrJmd0DO9lPw3WFokQgaf1oe1jrop.jpCfuJzau",
      //         mobile: "13384515545",
      //         idcard: "230107198712041513",
      //         identity: "个人",
      //         created_at: "2023-10-09 18:51:35",
      //         updated_at: "2023-10-10 07:09:06",
      //         deleted_at: null,
      //         api_token: "0c07b6e6-846d-4121-ba16-ae44d8c922db",
      //         company_card: "",
      //         area_id: 127,
      //       },
      //       case_type: {
      //         id: 3,
      //         name: "合同纠纷",
      //         created_at: "2023-10-09 01:50:37",
      //         updated_at: "2023-10-12 03:27:38",
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
      //         id: 2,
      //         area_id: 31,
      //         comprehensiveness: true,
      //         name: "王翠花",
      //         password:
      //           "$2y$10$4PTc/bo538fGGQ0FJBfTc.ra.S.8QlJ4/AGU4UrcarliG1m6VIvM6",
      //         mobile: "13300000001",
      //         idcard: "123123",
      //         created_at: "2023-10-04 07:50:01",
      //         updated_at: "2023-10-14 12:09:57",
      //         deleted_at: null,
      //         api_token: "9bb46db4-400a-48b6-ac2c-c873a99665d8",
      //       },
      //       judge: {
      //         id: 1,
      //         area_id: '["31","38","39","41","40"]',
      //         department_id: 1,
      //         department_job_id: 34,
      //         party_id: 1,
      //         party_job_id: 1,
      //         name: "胡蕾",
      //         password:
      //           "$2y$10$4PTc/bo538fGGQ0FJBfTc.ra.S.8QlJ4/AGU4UrcarliG1m6VIvM6",
      //         mobile: "18800000001",
      //         age: 18,
      //         created_at: "2023-10-04 06:44:17",
      //         updated_at: "2023-10-14 08:31:52",
      //         deleted_at: null,
      //         api_token: "c87caa78-700b-4e6b-97ab-d424db6fe0b9",
      //         phone: "8888888",
      //       },
      //       files: [
      //         {
      //           id: 165,
      //           file_name: "穆法通_官方微博.jpg",
      //           file_type: "jpg",
      //           file_size: "36173",
      //           url: "images/2023-10-10/vDQlDfyl5VGiWyW55a11faUZqTYd3VL2SONs5h17.jpg",
      //           created_at: "2023-10-10 00:53:31",
      //           case_id: 37,
      //           updated_at: "2023-10-10 00:53:31",
      //           upload_author: "当事人",
      //           web_url:
      //             "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-10/vDQlDfyl5VGiWyW55a11faUZqTYd3VL2SONs5h17.jpg",
      //         },
      //       ],
      //       chat_room: {
      //         id: 16,
      //         case_id: 37,
      //         room_number: "ML202310100002",
      //         created_at: "2023-10-10 00:53:49",
      //         updated_at: "2023-10-10 00:53:49",
      //         deleted_at: null,
      //       },
      //     },
      //     {
      //       id: 49,
      //       case_number: "202310140001",
      //       client_id: 22,
      //       accused_client_id: 28,
      //       case_type_id: 1,
      //       area_id: 31,
      //       mediators_id: 2,
      //       judge_id: 1,
      //       client_remark: "12321312312321",
      //       mediators_remark: "2312312312",
      //       judge_remark: "",
      //       state: "0",
      //       created_at: "2023-10-14 07:00:08",
      //       updated_at: "2023-10-15 22:17:27",
      //       deleted_at: null,
      //       judge_remark_1: null,
      //       mediators_remark_1: null,
      //       notice_state: "true",
      //       client: {
      //         id: 22,
      //         name: "林旭东",
      //         password:
      //           "$2y$10$1rG.ssmWrSjyFAudnpyC/uN9RwD28rAXElccKccMh.GC8ZD10fRfO",
      //         mobile: "18646330633",
      //         idcard: "230281199403180417",
      //         identity: "个人",
      //         created_at: "2023-10-03 21:09:41",
      //         updated_at: "2023-10-14 17:39:53",
      //         deleted_at: null,
      //         api_token: "1a1c258d-0dd3-4592-b803-b574eb7537eb",
      //         company_card: "",
      //         area_id: 31,
      //       },
      //       accused_client: {
      //         id: 28,
      //         name: "徐",
      //         password:
      //           "$2y$10$Nd4CupBZcamObrFrJmd0DO9lPw3WFokQgaf1oe1jrop.jpCfuJzau",
      //         mobile: "13384515545",
      //         idcard: "230107198712041513",
      //         identity: "个人",
      //         created_at: "2023-10-09 18:51:35",
      //         updated_at: "2023-10-10 07:09:06",
      //         deleted_at: null,
      //         api_token: "0c07b6e6-846d-4121-ba16-ae44d8c922db",
      //         company_card: "",
      //         area_id: 127,
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
      //         id: 2,
      //         area_id: 31,
      //         comprehensiveness: true,
      //         name: "王翠花",
      //         password:
      //           "$2y$10$4PTc/bo538fGGQ0FJBfTc.ra.S.8QlJ4/AGU4UrcarliG1m6VIvM6",
      //         mobile: "13300000001",
      //         idcard: "123123",
      //         created_at: "2023-10-04 07:50:01",
      //         updated_at: "2023-10-14 12:09:57",
      //         deleted_at: null,
      //         api_token: "9bb46db4-400a-48b6-ac2c-c873a99665d8",
      //       },
      //       judge: {
      //         id: 1,
      //         area_id: '["31","38","39","41","40"]',
      //         department_id: 1,
      //         department_job_id: 34,
      //         party_id: 1,
      //         party_job_id: 1,
      //         name: "胡蕾",
      //         password:
      //           "$2y$10$4PTc/bo538fGGQ0FJBfTc.ra.S.8QlJ4/AGU4UrcarliG1m6VIvM6",
      //         mobile: "18800000001",
      //         age: 18,
      //         created_at: "2023-10-04 06:44:17",
      //         updated_at: "2023-10-14 08:31:52",
      //         deleted_at: null,
      //         api_token: "c87caa78-700b-4e6b-97ab-d424db6fe0b9",
      //         phone: "8888888",
      //       },
      //       files: [
      //         {
      //           id: 196,
      //           file_name: "穆法通_官方抖音.jpg",
      //           file_type: "jpg",
      //           file_size: "28588",
      //           url: "images/2023-10-14/L02Gdtn2iyX6gpJPSb93LmOHJUTK6fnLE47SgVTv.jpg",
      //           created_at: "2023-10-14 07:00:07",
      //           case_id: 49,
      //           updated_at: "2023-10-14 07:00:08",
      //           upload_author: "当事人",
      //           web_url:
      //             "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-14/L02Gdtn2iyX6gpJPSb93LmOHJUTK6fnLE47SgVTv.jpg",
      //         },
      //         {
      //           id: 197,
      //           file_name: "穆法通_官方微博.jpg",
      //           file_type: "jpg",
      //           file_size: "36173",
      //           url: "images/2023-10-14/62qwRerIsqkkVzX9Q3szZ9f9DRhfuAA3BAuGGZ0L.jpg",
      //           created_at: "2023-10-14 07:01:25",
      //           case_id: 49,
      //           updated_at: "2023-10-14 07:01:25",
      //           upload_author: "调解员",
      //           web_url:
      //             "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-14/62qwRerIsqkkVzX9Q3szZ9f9DRhfuAA3BAuGGZ0L.jpg",
      //         },
      //       ],
      //       chat_room: {
      //         id: 28,
      //         case_id: 49,
      //         room_number: "ML202310140001",
      //         created_at: "2023-10-14 07:00:19",
      //         updated_at: "2023-10-14 07:00:19",
      //         deleted_at: null,
      //       },
      //     },
      //     {
      //       id: 50,
      //       case_number: "202310140002",
      //       client_id: 22,
      //       accused_client_id: 28,
      //       case_type_id: 1,
      //       area_id: 31,
      //       mediators_id: 2,
      //       judge_id: 0,
      //       client_remark: "123123123",
      //       mediators_remark: "",
      //       judge_remark: "",
      //       state: "4",
      //       created_at: "2023-10-14 14:42:26",
      //       updated_at: "2023-10-15 22:17:27",
      //       deleted_at: null,
      //       judge_remark_1: null,
      //       mediators_remark_1: null,
      //       notice_state: "true",
      //       client: {
      //         id: 22,
      //         name: "林旭东",
      //         password:
      //           "$2y$10$1rG.ssmWrSjyFAudnpyC/uN9RwD28rAXElccKccMh.GC8ZD10fRfO",
      //         mobile: "18646330633",
      //         idcard: "230281199403180417",
      //         identity: "个人",
      //         created_at: "2023-10-03 21:09:41",
      //         updated_at: "2023-10-14 17:39:53",
      //         deleted_at: null,
      //         api_token: "1a1c258d-0dd3-4592-b803-b574eb7537eb",
      //         company_card: "",
      //         area_id: 31,
      //       },
      //       accused_client: {
      //         id: 28,
      //         name: "徐",
      //         password:
      //           "$2y$10$Nd4CupBZcamObrFrJmd0DO9lPw3WFokQgaf1oe1jrop.jpCfuJzau",
      //         mobile: "13384515545",
      //         idcard: "230107198712041513",
      //         identity: "个人",
      //         created_at: "2023-10-09 18:51:35",
      //         updated_at: "2023-10-10 07:09:06",
      //         deleted_at: null,
      //         api_token: "0c07b6e6-846d-4121-ba16-ae44d8c922db",
      //         company_card: "",
      //         area_id: 127,
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
      //         id: 2,
      //         area_id: 31,
      //         comprehensiveness: true,
      //         name: "王翠花",
      //         password:
      //           "$2y$10$4PTc/bo538fGGQ0FJBfTc.ra.S.8QlJ4/AGU4UrcarliG1m6VIvM6",
      //         mobile: "13300000001",
      //         idcard: "123123",
      //         created_at: "2023-10-04 07:50:01",
      //         updated_at: "2023-10-14 12:09:57",
      //         deleted_at: null,
      //         api_token: "9bb46db4-400a-48b6-ac2c-c873a99665d8",
      //       },
      //       judge: null,
      //       files: [
      //         {
      //           id: 198,
      //           file_name: "穆法通_官方微博.jpg",
      //           file_type: "jpg",
      //           file_size: "36173",
      //           url: "images/2023-10-14/TPcIzhi0MuMGLyAp24RXwt05ZUtOnnIRTMOXON2w.jpg",
      //           created_at: "2023-10-14 14:42:26",
      //           case_id: 50,
      //           updated_at: "2023-10-14 14:42:26",
      //           upload_author: "当事人",
      //           web_url:
      //             "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-14/TPcIzhi0MuMGLyAp24RXwt05ZUtOnnIRTMOXON2w.jpg",
      //         },
      //       ],
      //       chat_room: null,
      //     },
      //   ],
      // };
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

      mainStore.setPageList({
        ...mainStoreData,
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
//【首页】地图简介
const getJjData = async () => {
  try {
    const api = `${url}/homePage/case/area/info`;
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({
        jj: res.data,
      });
    });
  } catch (error) {
    console.error(error);
  }
};
const desFun = () => {
  getSqtjyData();
};
onMounted(() => {
  // setTimeout(() => {
  desFun();
  getMapData();
  getJjData();
  // }, 6000);

  pageInterval.value = setInterval(desFun, 30000);
  mapInterval.value = setInterval(getMapData, 10000);
  mapJjInterval.value = setInterval(getJjData, 10000000000);
});
onUnmounted(() => {
  clearInterval(mapInterval.value);
  clearInterval(pageInterval.value);
  clearInterval(mapJjInterval.value);
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
  background-image: url("@/assets/images/home-bg.jpg");
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
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
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
