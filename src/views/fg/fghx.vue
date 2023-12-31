<template>
  <div class="fghx-box">
    <div class="title"></div>
    <div class="content">
      <div v-for="item in list" class="card">
        <img :src="FgImg" />
        <div class="name">{{ item.name }}</div>
        <div class="zw">{{ item.bm }}<span>|</span>{{ item.jb }}</div>
        <div class="xq-btn" @click="() => jump()">查看详情</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FgImg from "../../assets/images/fg.png";
import { useRouter } from "vue-router";

const router = useRouter();
const list = ref([
  { id: 1, img: "", name: "张三", bm: "政治部", jb: "一级法官" },
  { id: 2, img: "", name: "张三", bm: "政治部", jb: "一级法官" },
  { id: 3, img: "", name: "张三", bm: "政治部", jb: "一级法官" },
  { id: 4, img: "", name: "张三", bm: "政治部", jb: "一级法官" },
  { id: 5, img: "", name: "张三", bm: "政治部", jb: "一级法官" },
  { id: 6, img: "", name: "张三", bm: "政治部", jb: "一级法官" },
]);
// 跳转到党建
const jump = () => {
  router.replace({
    path: "/fgxx",
  });
};
</script>

<style scoped lang="scss">
.fghx-box {
  height: calc(100% - 537px);
  width: 100%;
  display: flex;
  flex-direction: column;
  .title {
    background: url("@/assets/images/fg-hx.png") no-repeat;
    background-size: 100% 100%;
    height: 77px;
    width: 447px;
    margin: 0 auto;
    margin-top: -16px;
  }
  .content {
    width: 100%;
    height: 306px;
    background: linear-gradient(
      to top,
      rgba(11, 33, 59, 0.1),
      rgba(11, 33, 59, 0.5)
    );
    border-radius: 4px;
    padding-top: 14px;
    box-sizing: border-box;
    flex-direction: row;
    display: flex;
    img {
      width: 116px;
      height: 150px;
    }
    .card {
      background: url("@/assets/images/fg-xq-bg.png") no-repeat;
      background-size: 100% 100%;
      width: 146px;
      height: 260px;
      margin: 0 8px;
      padding: 12px 14px;
      box-sizing: border-box;

      .name {
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }

      .zw {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        display: flex;
        margin: 3px 0;
        flex-direction: row;
        justify-content: space-between;
      }
      .xq-btn {
        width: 77px;
        height: 27px;
        line-height: 27px;
        text-align: center;
        background: #00bffe;
        margin-top: 5px;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
