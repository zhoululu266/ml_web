<template>
  <div class="text-tooltip">
    <el-tooltip
      class="item"
      effect="dark"
      :disabled="isShowTooltip"
      :content="content"
      placement="top"
    >
      <p class="over-flow" :class="className" @mouseover="onMouseOver(refName)">
        <span :ref="refName">{{ content || "" }}</span>
      </p>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextTooltip",
  props: {
    // 显示的文字内容
    content: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 位置
    placement: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String,
      default: () => {
        return "bottom";
      },
    },
    // 外层框的样式，在传入的这个类名中设置文字显示的宽度
    className: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 为页面文字标识（如在同一页面中调用多次组件，此参数不可重复）
    refName: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      isShowTooltip: true,
    };
  },
  methods: {
    onMouseOver(str: string) {
      const parentWidth = (this.$refs[str] as any).parentNode.offsetWidth;
      const contentWidth = (this.$refs[str] as any).offsetWidth;
      // 若子集比中间层更宽 开启tooltip功能
      if (contentWidth > parentWidth) {
        this.isShowTooltip = false;
      } else {
        // 否则 关掉tooltip功能
        this.isShowTooltip = true;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.over-flow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.wid190 {
  width: 100%;
}
p {
  margin: 0;
}
</style>
