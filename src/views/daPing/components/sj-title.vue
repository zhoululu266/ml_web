<template>
  <div class="my-header">
    <p class="title">
      <span class="sj"></span>{{ title }}<span class="dd"></span>
    </p>

    <solt></solt>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  title: string;
  type: string;
}

withDefaults(defineProps<Props>(), {
  title: "",
  type: "circle",
});
</script>
<style lang="scss" scoped>
.my-header {
  margin: 12px 10px;

  p.title {
    color: #ffffff;
    font-weight: 500;
    font-size: 20px;
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    .sj {
      background-image: url("@/assets/images/sj-icon.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 20px;
      height: 19px;
      display: inline-block;
      margin-right: 6px;
    }
    .dd {
      background-image: url("@/assets/images/dd-icon.png");
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
</style>
