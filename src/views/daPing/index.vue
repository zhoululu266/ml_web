<template>
  <div class="jwts">
    <div class="header">
      <!-- 穆棱市人民法院诉源治理数据平台 -->
      <div class="time-box" @click="changeShow">
        <div class="time">{{ nowTime }}</div>
        <div class="day">{{ nowDate }}</div>
      </div>
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

const nowDate = ref<string>(moment().format("YYYY:MM:DD")); // 年月日
const nowTime = ref<string>(moment().format("HH:mm:ss")); // 时分秒
const sy = ref(true);
const changeShow = () => {
  console.log("changeShow", changeShow);

  sy.value = !sy.value;
};
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
