<template>
  <div class="tab-box">
    <div
      v-for="(item, index) in tabList"
      :key="index"
      class="tab-item"
      :class="{ selected: acitced === index }"
      @click="onTabSelected(index)"
    >
      <div v-if="acitced === index" class="selected" />
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tabList: any[];
  acitced: number;
}>();

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "click", value: number): void;
}>();

const onTabSelected = (acitced: number) => {
  emit("click", acitced);
};
</script>

<style lang="scss">
.tab-box {
  display: flex;
  width: 100%;
  height: 55px;
  border-bottom: 1px solid var(--hlk-form-border-inverse);

  .tab-item {
    font-size: 16px;
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    color: var(--main-subtitle-text);
    margin: 0 24px;
    cursor: pointer;
    user-select: none;
    font-weight: 500;
    &.selected {
      color: var(--main-text);
    }
    .selected {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 4px;
      background: var(--main-bg);
      box-shadow: 0px 2px 10px 1px rgba(72, 135, 252, 0.7);
      border-radius: 2px 2px 0px 0px;
    }
  }
}
</style>
