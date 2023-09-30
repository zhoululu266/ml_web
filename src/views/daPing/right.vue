<template>
  <div class="right-box">
    <Tjajtj />
    <div class="other-box">
      <ModelTitle model-title="其他信息" type="circle" />
      <div class="other-box-content">
        <div
          v-for="(item, i) in listData"
          :key="i"
          :class="'content' + (i + 1)"
        >
          <p class="name">{{ item.name }}</p>
          <span class="val"> {{ item.val }}{{ item.dw }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tjajtj from "./tjajtj/index.vue";
import ModelTitle from "./components/modelTitle.vue";

const listData = ref([
  {
    name: "诉源治理案件数",
    key: "",
    val: "97259",
  },
  {
    name: "源头化解纠纷数",
    key: "",
    val: "858999",
  },
  {
    name: "源头化解分流率",
    key: "",
    val: "84",
    dw: "%",
  },
  {
    name: "执前和解数",
    key: "",
    val: "84598",
  },
  {
    name: "法官面对面总数",
    key: "",
    val: "84598",
  },
]);
</script>

<style scoped lan="scss">
.right-box {
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 20px 15px 15px 15px;
  box-sizing: border-box;
  background-image: url("@/assets/images/card-bg.png");
  /* margin-top: 6%; */
}
.other-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  .title-circle {
    height: 34px;
  }
  .other-box-content {
    margin-top: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .name {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #a5cbe3;
      padding-left: 29%;
      width: 60%;
    }
    .val {
      font-size: 18px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #37efff;
      width: 40%;
    }
    > div {
      background-image: url("@/assets/images/other1.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 320px;
      height: 80px;
      margin-left: 20px;
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: start;
      margin-bottom: 2px;
    }
    > div.content1 {
      background-image: url("@/assets/images/other1.png");
      /* background-size: 100% 100%; */
      .val {
        font-size: 23px;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #37efff;
      }
    }
    > div.content2 {
      background-image: url("@/assets/images/other2.png");
      /* background-size: 100% 100%; */
    }

    > div.content3 {
      background-image: url("@/assets/images/other3.png");
    }
    > div.content4 {
      background-image: url("@/assets/images/other4.png");
      /* background-size: 100% 100%; */
    }

    .content5 {
      background-image: url("@/assets/images/other5.png");
      .val {
        color: RGBA(75, 150, 235, 1);
      }
    }
  }
}
</style>
