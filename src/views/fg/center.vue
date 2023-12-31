<template>
  <div class="dj-center">
    <div class="center-top">
      <div class="center-title center-top-title"></div>

      <div class="zb-box center-zb">
        <div class="center-zb-left">
          <Ajb />
          <Sxbgl />
        </div>
        <div class="center-zb-right">
          <div class="center-zb-right-box">
            <div class="center-zb-title"><span></span>一审服判息诉率</div>
            <div class="bg">60%</div>
          </div>
          <div class="center-zb-right-box">
            <div class="center-zb-title">
              <span></span>审限内结案率{{ "\u3000" }}
            </div>
            <div class="bg">50%</div>
          </div>
          <div class="center-zb-right-box">
            <div class="center-zb-title">
              <span></span>审限变更率{{ "\u3000" }}{{ "\u3000" }}
            </div>
            <div class="bg">80%</div>
          </div>
        </div>
      </div>
    </div>
    <Fghx />
  </div>
</template>

<script setup lang="ts">
import Sxbgl from "./sxbgl.vue";
import Ajb from "./ajb.vue";
import Fghx from "./fghx.vue";
</script>

<style scoped lang="scss">
.dj-center {
  flex: 1;
  padding: 0 14px 14px 14px;
  display: flex;
  flex-direction: column;

  .center-top {
    background: url("@/assets/images/center-top-bg.png") no-repeat;
    background-size: 100% 100%;
    height: 537px;

    .center-top-title {
      margin-top: 2px;
    }
  }

  .center-title {
    background: url("@/assets/images/fg-ajxl.png") no-repeat;
    background-size: 100% 100%;
    height: 67px;
    width: 447px;
    margin: 0 auto;
  }
  .zb-box {
    // padding: 0 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;

    height: calc(100% - 107px);
    .center-zb-left {
      width: 100%;
      height: 55%;
      display: flex;
      flex-direction: row;
      padding-left: 40px;
    }
    .center-zb-right {
      padding-left: 6%;
      margin-top: -4px;
      width: 100%;
      height: 45%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;

      justify-content: space-between;
      .center-zb-right-box {
        width: 33.3%;
        height: 50%;
        .center-zb-title {
          height: 32px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          margin: 0 auto;

          span {
            width: 6px;
            height: 19px;
            display: inline-block;
            margin-right: 13px;
            background: #48bdf4;
          }
        }
        .bg {
          margin: 0 auto;
          width: 158px;
          height: 140px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100%;
          background-image: url("@/assets/images/fg-jal.png");
          line-height: 98px;
          text-align: center;
          margin-top: 20px;
          font-size: 34px;
          font-family: FZDaHei-B02S;
          font-weight: 400;
          color: #edfbff;
        }
        .sx {
          background-size: 100%;
          background-image: url("@/assets/images/fg-sx.png");
        }
      }
    }
  }
}
</style>
