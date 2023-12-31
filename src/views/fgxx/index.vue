<template>
  <div class="fgjj-box">
    <div class="top">
      <div class="fgxx">
        <div class="xx-top">
          <img :src="FgImg" />
          <div>
            <div class="name">{{ ryxx.xm }}</div>
            <div class="age">{{ ryxx.xb }} <i></i>{{ ryxx.nl }}岁</div>
            <div class="sr"><span>出生日期：</span>{{ ryxx.csrq }}</div>
          </div>
        </div>
        <div class="xx-bottom">
          <div><span>单位：</span>{{ ryxx.dw }}</div>
          <div><span>部门：</span>{{ ryxx.bm }}</div>
          <div><span>职务：</span>{{ ryxx.zw }}</div>
          <div><span>籍贯：</span>{{ ryxx.jg }}</div>
          <div><span>职级：</span>{{ ryxx.zj }}</div>
          <div><span>学历：</span>{{ ryxx.xl }}</div>
          <div><span>政治面貌：</span>{{ ryxx.zzmm }}</div>
        </div>
      </div>
      <Gzcc />
      <Gryj />
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <Gzjl />
        <Sxly />
      </div>
      <div class="bottom-right">
        <Zb />
      </div>
    </div>
    <div class="back-btn" @click="() => changeShowFun()"></div>
  </div>
</template>

<script setup lang="ts">
import FgImg from "../../assets/images/fg.png";
import Gryj from "./gryj.vue";
import Gzcc from "./gzcc.vue";
import Gzjl from "./gzjl.vue";
import Sxly from "./sxly.vue";
import Zb from "./zb.vue";
import { useRouter } from "vue-router";

const router = useRouter();
// 跳转到党建
const changeShowFun = () => {
  router.replace({
    path: "/fg",
  });
};
const ryxx = ref({
  xm: "张立强",
  xb: "男",
  nl: "54",
  csrq: "1989年11月20日",
  dw: "穆棱市人民法院",
  bm: "民事审判三庭",
  zw: "四级高级法官",
  jg: "穆棱市",
  zj: "XXXX",
  xl: "本科",
  zzmm: "中共党员",
});
</script>

<style scoped lang="scss">
.fgjj-box {
  background-image: url(/src/assets/images/djyl-bg.jpg);
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
    display: flex;
    flex-direction: row;
    .fgxx {
      width: 561px;
      height: 413px;
      background-image: url(/src/assets/images/info-bg.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding-left: 42px;
      padding-top: 70px;
      margin-right: 34px;
      box-sizing: border-box;
      .xx-top {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 154px;
          height: 162px;
          margin-right: 35px;
        }
        > div {
          .name {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;
            line-height: 39px;
            margin-bottom: 20px;
          }
          .age {
            width: 81px;
            height: 33px;
            line-height: 33px;
            background: #36a3ff;
            border-radius: 10px;
            text-align: center;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;

            i {
              margin-left: 4px;
            }
          }
          .sr {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 39px;
          }
        }
      }
      .xx-bottom {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 34px;

        > div {
          width: 50%;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 34px;
          span {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #adceea;
            line-height: 34px;
          }
        }
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    .bottom-left {
      display: flex;
      flex-direction: column;
      margin-right: 34px;
      width: 556px;
    }
    .bottom-right {
      flex: 1;
      height: 433px;
    }
  }
}
.back-btn {
  position: fixed;
  bottom: 60px;
  z-index: 999;
  right: 62px;
  color: #ffffff;
  height: 30px;
  line-height: 36px;
  cursor: pointer;
  text-align: center;
  width: 30px;
  font-weight: 500;
  background-image: url("@/assets/images/fanhui1.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
