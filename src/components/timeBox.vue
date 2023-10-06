<template>
  <div class="time-box">
    <div class="time">{{ nowTime }}</div>
    <div class="day">{{ nowDate }}</div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

const nowDate = ref<string>(); // 年月日
const nowTime = ref<string>(); // 时分秒

const updateTime = () => {
  nowDate.value = moment().format("YYYY:MM:DD"); // 年月日
  nowTime.value = moment().format("HH:mm:ss"); // 时分秒
};

const timer = setInterval(updateTime, 1000);

onMounted(() => {
  updateTime();
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="scss">
.time-box {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  position: relative;
  top: 100px;

  .time {
    font-size: 24px;
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
    margin-left: 8px;
    font-size: 13px;
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
</style>
