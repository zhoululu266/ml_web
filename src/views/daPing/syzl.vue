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
import { axiosPost, axiosFormData } from "@/utils";

import { useMain } from "@/store";
import { getMap } from "echarts";
const mainStore = useMain();
const pageInterval = ref<string | number | NodeJS.Timeout | undefined>();
const mapInterval = ref<string | number | NodeJS.Timeout | undefined>();
const nowDate = ref<string>(moment().format("YYYY:MM:DD")); // 年月日
const nowTime = ref<string>(moment().format("HH:mm:ss")); // 时分秒
const sy = ref(true);
const mainStoreData = mainStore.getPageList();

const changeShow = () => {
  //console.log("changeShow", changeShow);

  sy.value = !sy.value;
};
const url = `${$config.api}`;
const mapData = (data: Record<string, unknown> | undefined) => {
  const api = `${url}/homePage/case/list`;
  return axiosPost(api, data);
};
const pageData = ref();

const baseFun = (url, key) => {
  try {
    axiosFormData(url).then((res: any) => {
      mainStore.setPageList({ ...mainStoreData, [key]: res.data });
    });
  } catch (error) {
    console.error(error);
  }
};

// 【首页】执前案件和解数
const getZxqhjsData = async () => {
  const api = `${url}/homePage/case/执前案件和解数`;
  // baseFun(api, "syzl");
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ ...mainStoreData, zxqhjs: res.number });
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
      mainStore.setPageList({ ...mainStoreData, ssdjfl: res.number });
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
      mainStore.setPageList({ ...mainStoreData, ssdjs: res.number });
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
      mainStore.setPageList({ ...mainStoreData, syzl: res.number });
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
      mainStore.setPageList({ ...mainStoreData, fgtj: res.data });
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
      mainStore.setPageList({ ...mainStoreData, zfs: res.data });
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
      mainStore.setPageList({ ...mainStoreData, ajlxyjsl: res });
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
      // console.log("【-----首页----------】调解员res", {
      //   ...mainStoreData,
      //   tjy: res,
      // });

      mainStore.setPageList({ ...mainStoreData, tjy: res });
    });
  } catch (error) {
    console.error(error);
  }
};
//【首页】调解案件列表
const getSqtjyData = async () => {
  try {
    const api = `${url}/homePage/case/list`;
    axiosFormData(api).then((res: any) => {
      console.log("推送案件--", res);

      mainStore.setPageList({ ...mainStoreData, sqajxx: res });
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
      mainStore.setPageList({ ...mainStoreData, flgw: res.data });
    });
  } catch (error) {
    console.error(error);
  }
};
const ddd = ref([]);

// setTimeout(() => {
//   ddd.value = [];
// }, 1100);
//【首页】地图书记
const getMapData = async () => {
  try {
    const api = `${url}/newCaseNotice`;
    axiosFormData(api).then((res: any) => {
      const timestamp = new Date().getTime();

      const timestamp1 = moment().valueOf();
      // console.log("setPageList", ddd.value, timestamp, timestamp1);
      const arr = [];
      res.data &&
        res.data?.length > 0 &&
        res.data.forEach((item) => {
          arr.push(item.area.parent_area.name);
        });
      mainStore.setPageList({
        ...mainStoreData,
        dtsj: {
          data: arr,
          time: moment().valueOf(),
        },
      });
    });
  } catch (error) {
    console.error(error);
  }
};

const desFun = () => {
  getSqtjyData();
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
