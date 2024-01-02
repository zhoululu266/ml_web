<template>
  <div class="zbhz-box">
    <div class="top">
      <div class="left-top">
        <div class="rl"></div>
        <div class="rl-text">今日</div>
      </div>
      <div class="top-right">
        <div v-for="(item, index) in topArr">
          <div class="top-box-content">
            <div class="top-title">{{ item.title }}</div>
            <div class="top-box">
              <div>
                新收<span>{{ item.num }}</span
                >件
              </div>
              <div>
                新收<span>{{ item.value }}</span
                >件
              </div>
            </div>
          </div>
          <div v-if="index + 1 !== topArr.length" class="line"></div>
        </div>
      </div>
    </div>
    <div class="content">
      <div
        class="content-card"
        v-for="(item, index) in contentArr"
        :class="[index < 4 ? 'c-top' : '', item.class]"
      >
        <div class="content-title">{{ item.title }}</div>
        <div class="content-min-card">
          <div v-for="(ct, i) in item.content" :class="ct.class">
            {{ ct.title }}<span>{{ ct.num }}<i></i>{{ ct.dw }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="back-btn" @click="() => changeShowFun()"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
// 跳转到党建
const changeShowFun = () => {
  router.replace({
    path: "/home",
  });
};
const topArr = ref([
  { title: "执行案件", num: 11, value: 20 },
  { title: "首执案件", num: 11, value: 20 },
  { title: "执恢案件", num: 11, value: 20 },
  { title: "核心指标", num: 11, value: 20 },
]);

const contentArr = ref([
  {
    title: "执行案件",
    class: "splice zxaj",
    content: [
      { title: "旧存", num: "3569", dw: "件" },
      { title: "执异", num: "3569", dw: "件" },
      { title: "首执", num: "3569", dw: "件" },
      { title: "执保", num: "3569", dw: "件" },
      { title: "执恢", num: "3569", dw: "件" },
      { title: "执监", num: "3569", dw: "件" },
      { title: "综合结案率", num: "30", dw: "%", class: "zhjal block" },
      { title: "保全率", num: "30", dw: "%", class: "block" },
    ],
  },
  {
    title: "首执案件",
    class: "splice aj",
    content: [
      { title: "标的到位率", num: "20", dw: "%" },
      { title: "综合结案率", num: "20", dw: "%" },
      { title: "实际执结率", num: "20", dw: "%" },
      { title: "终本率", num: "20", dw: "%" },
      { title: "执行完毕率", num: "20", dw: "%" },
      { title: "审限内结案率", num: "20", dw: "%" },
      { title: "结案平均用时", num: "30", dw: "天/件", class: "cl-block" },
    ],
  },
  {
    title: "恢复案件",
    class: "splice aj",
    content: [
      { title: "标的到位率", num: "20", dw: "%" },
      { title: "综合结案率", num: "20", dw: "%" },
      { title: "实际执结率", num: "20", dw: "%" },
      { title: "终本率", num: "20", dw: "%" },
      { title: "执行完毕率", num: "20", dw: "%" },
      { title: "审限内结案率", num: "20", dw: "%" },
      { title: "结案平均用时", num: "30", dw: "天/件", class: "cl-block" },
    ],
  },
  {
    title: "核心指标",
    class: "hxzb",
    content: [
      { title: "有财产可供执行案件法定期限内执结率", num: "30", dw: "%" },
      {
        title: "无财产可供执行案件终本合格率      ",
        num: "30",
        dw: "%",
        class: "cl-wrap",
      },
      { title: "执行信访办结率   ", num: "30", dw: "%" },
      { title: "执行案件执结率  ", num: "30", dw: "%" },
    ],
  },
  {
    title: "执行公开",
    class: "space",
    content: [
      { title: "失信被执行人", num: "3569", dw: "例" },
      { title: "限制高消费", num: "3569", dw: "例" },
      { title: "拘留", num: "3569", dw: "例" },
      { title: "罚款", num: "3569", dw: "例" },
      { title: "追究拒执犯罪", num: "3569", dw: "例" },
      { title: "限制出入境", num: "3569", dw: "例" },
    ],
  },
  {
    title: "网络拍卖",
    class: "space",
    content: [
      { title: "拍卖量", num: "3569", dw: "件" },
      { title: "成交量", num: "3569", dw: "件" },
      { title: "成交额", num: "3569", dw: "万元" },
      { title: "成交率", num: "30", dw: "%" },
    ],
  },
  {
    title: "执行信访",
    class: "space",
    content: [
      { title: "进京访", num: "3569", dw: "件" },
      { title: "进省访", num: "3569", dw: "件" },
      { title: "进市访", num: "3569", dw: "件" },
      { title: "其他访", num: "3569", dw: "件" },
    ],
  },
  {
    title: "执行案款",
    class: "space",
    content: [
      { title: "到账", num: "3569", dw: "万元" },
      { title: "发放", num: "3569", dw: "万元" },
      { title: "提存", num: "3569", dw: "万元" },
      { title: "超期发放", num: "3569", dw: "万元" },
      { title: "延期发放", num: "3569", dw: "万元" },
    ],
  },
]);
</script>

<style scoped lang="scss">
.zbhz-box {
  background-image: url(/src/assets/images/zb-bg.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 126px 60px;
  box-sizing: border-box;
  .top {
    background-image: url(/src/assets/images/zbhz-top.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 120px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .left-top {
      width: 130px;
      height: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .rl {
        height: 34px;
        width: 34px;
        background-image: url(/src/assets/images/zbhz-rl.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .rl-text {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        margin-top: 10px;
      }
    }
    .top-right {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: calc(100% - 130px);
      > div {
        width: 25%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 80px;

        .top-box-content {
          display: flex;
          flex-direction: column;
          width: calc(100% - 1px);
        }
      }
      .top-title {
        height: 25px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
      .top-box {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        justify-content: flex-start;
        > div {
          width: 50%;
        }
        span {
          margin-left: 10px;
          margin-right: 2px;
        }
      }
      .line {
        width: 1px;
        height: 54px;
        background: #ffffff;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 30px;
    .c-top {
      margin-bottom: 45px;
    }

    .content-card {
      background-image: url(/src/assets/images/zbhz-card.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 402px;
      height: 331px;

      .content-title {
        font-size: 26px;
        font-family: YouSheBiaoTiHei;
        font-weight: 600;
        color: #ffffff;
        height: 40px;
        line-height: 40px;
        margin-top: 14px;
        margin-left: 17px;
        transform: skew(-10deg);
        letter-spacing: 2px;
      }
      .content-min-card {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #95ebec;
        line-height: 40px;
        padding: 20px 30px;
        box-sizing: border-box;
        span {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          line-height: 40px;
        }
        i {
          width: 4px;
          height: 10px;
          display: inline-block;
        }
      }
    }
  }
  .space {
    .content-min-card {
      > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
  .splice {
    .content-min-card {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      > div {
        width: 50%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      :nth-child(2n) {
        padding-right: 10px;
        box-sizing: border-box;
      }
      .block {
        width: 100%;
        span {
          width: calc(100% - 130px);
          text-align: left;
        }
      }
    }
  }
  .zxaj {
    .content-min-card {
      justify-content: space-between;
      > div {
        width: 40%;
      }
    }
    .zhjal {
      margin-top: 40px;
    }
  }
  .aj {
    div.content-min-card {
      justify-content: space-between;
      padding: 20px 16px !important;
      > div {
        width: 45%;
      }
      :nth-child(2n) {
        width: 55%;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
  }
  .cl-block {
    flex-wrap: wrap;
    margin-top: 40px;
  }
  .cl-wrap {
    span {
      display: block;
      width: 100%;
    }
  }
  .hxzb {
  }
}
.back-btn {
  position: fixed;
  bottom: 60px;
  z-index: 999;
  right: 62px;
  color: #ffffff;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  text-align: center;
  width: 36px;
  font-weight: 500;
  background-image: url("@/assets/images/home.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
