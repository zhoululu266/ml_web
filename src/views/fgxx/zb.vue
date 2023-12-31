<template>
  <div class="gryj">
    <div v-for="item in arr" :class="item.class">
      <SjTitle :title="item.title" />
      <div class="content">
        <div v-for="ct in item.content">
          <div class="img-box">
            <div class="title">{{ ct.title }}</div>
            <div class="val">{{ ct.val }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SjTitle from "@/views/daPing/components/sj-title.vue";

const arr = ref([
  {
    title: "质量指标",
    class: "zlzb",
    content: [
      {
        title: "一审裁判案件触发判发回重审率",
        val: "30%",
      },
      {
        title: "生效案件判发回重审率",
        val: "30%",
      },

      {
        title: "一审服判息诉率",
        val: "30%",
      },
      {
        title: "裁判文书差错率",
        val: "30%",
      },
    ],
  },
  {
    title: "效率指标",
    class: "xlzb",
    content: [
      {
        title: "审限内结案率",
        val: "30%",
      },
      {
        title: "审限变更率",
        val: "30%",
      },

      {
        title: "执行完毕率",
        val: "30%",
      },
      {
        title: "首执案件终本率",
        val: "30%",
      },
      {
        title: "平均结案天数",
        val: "30%",
      },
      {
        title: "结收比",
        val: "30%",
      },
    ],
  },
  {
    title: "效果指标",
    class: "xgzb",
    content: [
      {
        title: "案件比",
        val: "30%",
      },
      {
        title: "调撤率",
        val: "30%",
      },

      {
        title: "再审审查率",
        val: "30%",
      },
      {
        title: "民事裁判申请执行率",
        val: "30%",
      },
      {
        title: "实际执行率",
        val: "30%",
      },
      {
        title: "执行标的到位率",
        val: "30%",
      },
    ],
  },
]);
</script>

<style scoped lang="scss">
.gryj {
  width: 100%;
  height: 100%;
  background-image: url(/src/assets/images/info-bg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 4px;

  box-sizing: border-box;
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: -10px;
    > div {
      position: relative;
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    .img-box {
      height: 37px;
      line-height: 37px;
      background: rgba(1, 228, 255, 0.081);
      border: 1px dashed #01e4ff;
      width: 100%;
      padding: 0 12px 0 17px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .title {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
      .val {
        font-size: 20px;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #4dd5ff;
      }
    }
  }
  .zlzb {
    .content > div {
      width: 434px;
      margin-right: 10px;
    }
  }
  .xgzb,
  .xlzb {
    .content {
      padding: 0 0 0 30px;

      > div {
        width: 250px;
        margin-right: 45px;
      }
    }
  }
}
</style>
