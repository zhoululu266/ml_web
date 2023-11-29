<template>
  <el-dialog
    v-model="dialogShow"
    title="Tips"
    width="30%"
    class="info-modal load"
    :modal="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <template #header="{ titleClass }">
      <div class="my-header">
        <p id="titleId" :class="titleClass">
          <span class="sj"></span>{{ infoData?.partyBuildingName
          }}<span class="dd"></span>
        </p>

        <el-icon class="el-icon--left" @click="emits('closeModal')"
          ><CloseBold />
        </el-icon>
      </div>
    </template>
    <div class="title">{{ infoData?.title }}</div>
    <template v-if="infoData?.content">
      <el-scrollbar max-height="400px">
        <div class="content" v-html="infoData?.content"></div>
      </el-scrollbar>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const emits = defineEmits(["closeModal"]);

const dialogShow: WritableComputedRef<boolean> = computed({
  get() {
    return props.show;
  },
  set() {
    return props.show;
  },
});

interface Props {
  show: boolean;
  infoData: any;
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
  infoData: () => {
    return {};
  },
});
</script>
<style lan="scss">
.info-modal {
  width: 600px;
  height: 540px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  padding: 24px 0;
  color: #ffffff;
  background: #194574eb;
  /* border: 1px solid #0196ff; */
  /* border-radius: 8px; */
  position: relative;
  background-image: url(/src/assets/images/info-bg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .el-dialog__body {
    padding-top: 0;
  }
  .load {
    height: 423px;
    width: 100%;
    font-size: 20px;
    color: #ffffff;
    margin: 0 auto;
    line-height: 380px;
    text-align: center;
  }
  .el-icon svg {
    color: #01e4ff;
    margin-top: 8px;
  }
  .el-carousel__indicators {
    display: none;
    visibility: hidden;
  }
  .el-dialog__footer {
    padding-right: 28px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .el-button {
    color: #1f4770;
    background-color: #ffffff;
    border-color: #1f4770;
  }
  .el-button--primary {
    background-color: #1f4770;
    color: #ffffff;
  }
}
</style>
<style lang="scss" scoped>
.empty {
  color: #ffffff;
  margin: 0 auto;
  font-size: 20px;
  margin-top: 20%;
}
.el-carousel {
  width: 100%;
  height: 120px;
}

.el-carousel__indicators {
  display: none;
  visibility: hidden;
}
.el-carousel__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  > div {
    background-color: transparent;
  }
}

.el-icon--left {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
}
.my-header {
  margin-top: -20px;
  p.el-dialog__title {
    color: #ffffff;
    font-weight: 500;
    font-size: 20px;
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    .sj {
      background-image: url(/src/assets/images/sj-icon.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 20px;
      height: 19px;
      display: inline-block;
      margin-right: 6px;
    }
    .dd {
      background-image: url(/src/assets/images/dd-icon.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 242px;
      height: 8px;
      display: inline-block;
      margin-left: 6px;
    }
  }
}
.content {
  color: #bccddf;
  font-size: 16px;
  text-indent: 2em;
  padding: 0 4px;
  line-height: 32px;
  box-sizing: border-box;
}
.title {
  width: 100%;
  justify-content: end;
  margin-right: 24px;

  padding: 20px;
  box-sizing: border-box;
  color: #ffffff;
  font-size: 18px;
  text-align: center;
}

.form-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // margin-top: -14px;

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
