<template>
  <div
    class="title"
    :class="type === 'square' ? 'title-square' : 'title-circle'"
  >
    <div class="left">
      <!-- <div class="dd"></div> -->
      <div class="name">{{ modelTitle }}</div>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  modelTitle: string;
  type: string;
}

withDefaults(defineProps<Props>(), {
  modelTitle: "",
  type: "circle",
});
</script>
<style lang="scss" scoped>
.title {
  height: 34px;
  // background: linear-gradient(90deg, #003abe 1%, #002c8b 8%, #000a21 100%);
  // background: linear-gradient(
  //   90deg,
  //   rgb(0, 58, 190, 0.8) 1%,
  //   rgb(0, 44, 139, 0.8) 8%,
  //   rgb(0, 10, 33, 0.8) 100%
  // );
  // // opacity: 0.8;
  // // border-bottom: 2px solid;
  // border-top: 2px solid;
  // border-image-source: linear-gradient(
  //   90deg,
  //   #34aeff 1%,
  //   #3a75fe 8%,
  //   #031d5a 100%
  // );
  // border-image-slice: 1;
  display: flex;
  align-items: center;
  padding: 0 0 0 12px;
  flex-wrap: wrap;
  border-bottom: 0px;
  justify-content: space-between;
  overflow: hidden;
  .left {
    display: flex;
    align-items: center;
    .dd {
      width: 3px;
      height: 14px;
      box-shadow: 0px 0px 2px 0px #00b4ff;
      background: #dafffd;
      margin-right: 14px;
    }
    .name {
      font-size: 19px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #f6f9fe;
      // text-shadow: 1px 2px 0px rgba(22, 22, 19, 0.27);
      letter-spacing: 3px;
      background: linear-gradient(0deg, #e6f0c1 0%, #fdfff6 50%, #f6f9fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
.title-square {
  background-image: url("@/assets/images/title-bg.png");
  // padding: 15px;
  // box-sizing: border-box;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .left {
    margin-top: -4px;
  }
}
.title-circle {
  background-image: url("@/assets/images/title-bg1.png");
  padding-left: 40px;

  box-sizing: border-box;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .left {
    margin-top: -4px;
  }
}
</style>
