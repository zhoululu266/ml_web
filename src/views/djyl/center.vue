<template>
  <div class="dj-center">
    <div class="center-top">
      <div class="center-title center-top-title"></div>

      <div class="zb-box center-zb">
        <div class="zb" v-for="(item, i) in zbsj" :key="i">
          <div class="zb-title">{{ item.title }}</div>
          <div class="zb-content">
            <template v-for="(zbData, zbI) in item.data">
              <template v-if="zbData">
                <div :key="zbI">
                  <span>{{ zbData.label }}</span>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const zbsj = ref({
  zb1: {
    title: "用好“四个体系”",
    data: [
      { label: "强化领导责任" },
      { label: "强力工作推进" },
      { label: "严格考察评分" },
      { label: "严肃督导问责" },
    ],
  },
  zb2: {
    title: "做好“四个表率”",
    data: [
      { label: "“学习型法院”表率" },
      { label: "“创新型法院”表率" },
      { label: "“服务型法院”表率" },
      { label: "“智慧型法院”表率" },
    ],
  },
  zb3: {
    title: "推进“四个建设”",
    data: [
      { label: "政治建设" },
      { label: "基础建设" },
      { label: "文化建设" },
      { label: "能力作风建设" },
    ],
  },
  zb4: {
    title: "实现“四个一流”",
    data: [
      { label: "队伍建设一流" },
      { label: "服务水平一流" },
      { label: "审判业绩一流" },
      { label: "人民满意度一流" },
    ],
  },
});
</script>

<style scoped lang="scss">
.dj-center {
  flex: 1;
  padding: 0 14px 27px 14px;
  display: flex;
  flex-direction: column;

  .center-top {
    background: url("@/assets/images/center-top-bg.png") no-repeat;
    background-size: 100% 100%;
    height: 567px;

    .center-top-title {
      margin-top: 10px;
    }
  }

  .center-title {
    background: url("@/assets/images/4cf.png") no-repeat;
    background-size: 100% 100%;
    height: 67px;
    width: 283px;
    margin: 0 auto;
  }
  .zb-box {
    // padding: 0 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    background: url("@/assets/images/dj-center.png") no-repeat center 86%;
    background-size: 60%;
    height: calc(100% - 107px);
    // height: 100%;
    > :nth-child(2n) {
      padding-left: 10%;
      box-sizing: border-box;
    }
    > :nth-child(2n + 1) {
      padding-right: 10%;
      box-sizing: border-box;
    }
    .zb {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      .zb-title {
        width: 216px;
        height: 37px;
        background: #258cff;
        border-radius: 19px;
        // padding: 4px 10px;

        font-size: 22px;
        font-family: FZCSJW;
        font-weight: normal;
        color: #ffffff;
        line-height: 37px;
        text-align: center;
      }
      .zb-content {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-top: 10px;
        line-height: 34px;
      }
    }
  }
}
</style>
