<template>
  <div class="dj-center">
    <div class="center-top">
      <div class="center-title center-top-title">党员统计</div>
      <div class="dj-fbt-bg"></div>
      <div class="zb-box center-zzb">
        <div class="zb-title">{{ zzbsj.title }}</div>
        <div class="zb-content zb-content-first">
          <div>
            <span>{{ zzbsj.sj.title + " :" }} </span>
            <p>{{ zzbsj.sj.value }}</p>
          </div>
          <div>
            <span>{{ zzbsj.fsj.title + " :" }}</span>
            <p>{{ zzbsj.fsj.value }}</p>
          </div>
        </div>
        <div class="zb-content">
          <div>
            <span>{{ zzbsj.zzwy.title + " :" }}</span>
            <p>{{ zzbsj.zzwy.value }}</p>
          </div>
          <div>
            <span>{{ zzbsj.xcwy.title + " :" }}</span>
            <p>{{ zzbsj.xcwy.value }}</p>
          </div>
          <div>
            <span>{{ zzbsj.jjwy.title + " :" }}</span>
            <p>{{ zzbsj.jjwy.value }}</p>
          </div>
        </div>
      </div>
      <div class="zb-box center-zb">
        <div class="zb" v-for="(item, i) in zbsj" :key="i">
          <div class="zb-title">{{ item.title }}</div>
          <div class="zb-content">
            <template v-for="(zbData, zbI) in item.data">
              <template v-if="zbData">
                <div :key="zbI">
                  <span>{{ zbData.label + " :" }}</span>
                  <p>{{ zbData.val }}</p>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="center-bottom">
      <div class="center-title center-bottom-title">法院简介</div>
      <div class="center-bottom-content">
        <div class="logo"></div>
        <div class="jj">
          {{ "\u3000" }}
          {{ "\u3000" }}
          穆棱市人民法院于1948年10月建院，行政编制72人，年均受案3000件。近年来，穆棱市法院深入贯彻落实最高院、省委和省高院各项工作部署要求，扎实开展审判执行工作，为党委政府解决了很多制约发展的难题。服务大局成效显著，审判质效连年领先，司法改革进展有序，得到穆棱市委、市人大、市政府、市政协的高度评价和社会各界的一致赞誉。荣获“全国优秀法院”称号，多次被黑龙江省法院授予“全省优秀法院”称号，荣获“全省人民满意好法院标兵”“全省人民满意的优秀政法单位标兵”“全省优化经济发展环境标兵单位”“全省法院党建工作先进单位”“省级文明单位标兵”等称号，荣立省高院“集体二等功”两次。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const zzbsj = ref({
  title: "中共穆棱市人民法院党总支部",
  sj: { title: "书记", value: "123" },
  fsj: { title: "副书记", value: "123" },
  zzwy: { title: "组织委员", value: "123" },
  xcwy: { title: "宣传委员", value: "123" },
  jjwy: { title: "纪检委员", value: "123" },
});
const zbsj = ref({
  zb1: {
    title: "机关党支部",
    data: [
      { label: "书记", val: "123" },
      { label: "组织委员", val: "123" },
      { label: "宣传委员", val: "123" },
    ],
  },
  zb2: {
    title: "机关党支部2",
    data: [
      { label: "书记2", val: "123" },
      { label: "组织委员", val: "123" },
      { label: "宣传委员", val: "123" },
    ],
  },
  zb3: {
    title: "机关党支部3",
    data: [
      { label: "书记3", val: "123" },
      { label: "组织委员", val: "123" },
      { label: "宣传委员", val: "123" },
    ],
  },
});
</script>

<style scoped lang="scss">
.dj-center {
  flex: 1;
  padding: 0 14px;
  display: flex;
  flex-direction: column;

  .center-top {
    background: url("@/assets/images/center-top-bg.png") no-repeat;
    background-size: 100% 100%;
    height: 527px;

    .center-top-title {
      margin-top: 10px;
    }

    .dj-fbt-bg {
      background: url("@/assets/images/dj-fbt-bg.png") no-repeat;
      background-size: 100% 100%;
      width: 777px;
      height: 60px;
      margin: 0 auto;
      margin-top: -18px;
    }
  }

  .center-bottom {
    display: flex;
    flex-direction: column;
    flex: 1;

    .center-bottom-content {
      background: url("@/assets/images/center-bottom-bg.png") no-repeat;
      background-size: 100% 100%;
      height: 273px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      .logo {
        background: url("@/assets/images/gj-qi-big.png") no-repeat;
        background-size: 100% 100%;
        width: 159px;
        height: 159px;
      }
      .jj {
        width: 704px;
        height: 197px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ecf0ff;
        line-height: 30px;
      }
    }
  }

  .center-title {
    background: url("@/assets/images/gj-title-bg.png") no-repeat;
    background-size: 100% 100%;
    height: 48px;
    width: 418px;
    margin: 0 auto;
    margin-bottom: 10px;
    font-size: 26px;
    font-family: PangMenZhengDao;
    font-weight: 600;
    font-style: italic;
    color: #ffffff;
    line-height: 42px;
    text-align: center;
  }
  .center-zzb {
    background: url("@/assets/images/gj-qi-min.png") no-repeat;
    background-size: 100% 100%;
    width: 576px;
    height: 145px;
    margin: 0 auto;
    padding: 12px 60px;
    box-sizing: border-box;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 38px;
    .zb-content {
      justify-content: space-around;
      > div {
        height: 50px;
        line-height: 50px;
        span {
          height: 50px;
          line-height: 50px;
        }
      }
    }
    .zb-content-first {
      width: 80%;
      margin: 0 auto;
    }
  }
  .center-zb {
    display: flex;
    flex-direction: row;
    margin: 0 110px;
    .zb {
      background: url("@/assets/images/gj-qi-big.png") no-repeat;
      background-size: 100% 100%;
      width: 244px;
      height: 172px;
      margin: 0 auto;
      padding: 20px 20px 12px 20px;
      box-sizing: border-box;
      text-align: center;
      margin-right: 15px;
      .zb-content {
        flex-direction: column;
        height: 36px;
        line-height: 36px;
        margin-top: 10px;
        > div {
          height: 36px;
          line-height: 36px;
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;
          span {
            height: 36px;
            line-height: 36px;
            width: 100px;
            display: inline-block;
            text-align: left;
          }
        }
      }
    }
  }
  .zb-box {
    .zb-title {
      font-size: 23px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }

    .zb-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      > div {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;

        span {
          font-weight: 500;
          margin-right: 6px;
        }
        p {
          margin: 0;
          display: inline-block;
        }
      }
    }
  }
}
</style>
