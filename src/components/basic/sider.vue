<template>
  <el-aside class="el-aside-style" :class="[{ iscollapse: isCollapse }]">
    <div class="menu-container">
      <div
        class="scroll-wrap"
        :noresize="false"
        view-style="{ height: '100%' }"
      >
        <el-menu
          :default-active="activeMenu"
          :unique-opened="true"
          class="vertical-menu"
          router
          :collapse="isCollapse"
          active-text-color="#fff"
        >
          <template v-for="item in displayMenuTree" :key="item.id">
            <el-menu-item
              :class="[
                {
                  'collapse-width': !isCollapse,
                  'is-active':
                    item.url === activeMenu ||
                    activeMenu.indexOf(item.url) > -1,
                },
              ]"
              :index="item.url"
              @click="(e: any) => handleSelect(e, item)"
            >
              <template #title
                ><span style="margin-left: 10px">{{
                  item.name
                }}</span></template
              >
              <div
                v-if="
                  item.url === activeMenu || activeMenu.indexOf(item.url) > -1
                "
                class="actived"
              ></div>
            </el-menu-item>
          </template>
        </el-menu>
        <div
          class="collapse"
          :class="[{ iscollapse: isCollapse }]"
          @click="isCollapse = !isCollapse"
        >
          <!-- <el-icon v-if="isCollapse"><Icon icon="zhankai" /></el-icon>
          <el-icon v-else><Icon icon="shouqi" /></el-icon> -->
        </div>
      </div>
    </div>
  </el-aside>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
// import { Icon } from "@app/components";

const route = useRoute();

const isCollapse = ref(false);
const activeMenu = computed(() => route.path);

defineProps<{
  displayMenuTree: any[];
}>();

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "onMeneChange", value: any): void;
}>();

const handleSelect = (_value: any, item: any) => {
  emit("onMeneChange", item);
};
</script>

<style lang="scss">
.vertical-menu:not(.el-menu--collapse) {
  width: 195px;
  .el-sub-menu__title {
    display: flex !important;
    width: auto !important;
  }
}

.vertical-menu {
  width: 72px;
  padding: 29px 0 10px;
  flex: 1;
  .el-tooltip__trigger {
    display: flex;
    justify-content: center;
  }
  .el-sub-menu__title {
    width: 100%;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 var(--el-menu-base-level-padding);
  }
}

.popper-class-125 {
  width: 195px;
  .el-menu--popup {
    padding: 0 !important;
    min-width: 195px !important;
  }
}
</style>
<style lang="scss" scoped>
.scroll-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 35s;
  background: var(--main-bg-inverse);

  :deep(.el-menu--popup) {
    padding: 0;
  }

  :deep(.el-scrollbar__view) {
    position: relative;
  }
}

.menu-container {
  --el-menu-bg-color: var(--main-sider-bg);
  position: relative;
  height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  background: var(--main-sider-bg);

  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }
}

.el-menu {
  border-right: none;
}

.el-menu-item {
  user-select: none;
  font-size: 18px;
  line-height: 21px;

  &.collapse-width {
    width: 195px;
    transition: width 3s;
  }
}

.el-menu-item:hover {
  color: var(--main) !important;
  background-color: var(--menu-item-hover-active) !important;
}

.menu-container {
  :deep(.el-submenu__title i) {
    color: #fff;
  }

  :deep(.el-submenu__title:hover) {
    color: var(--main) !important;
    background-color: var(--menu-item-hover-active) !important;
  }

  :deep(.el-sub-menu__title:hover) {
    color: var(--main) !important;
    background-color: var(--menu-item-hover-active) !important;
  }

  :deep(.el-sub-menu__title) {
    font-size: 18px;
    color: var(--hlk-form-title-text) !important;
  }

  :deep(.el-menu-item) {
    color: var(--hlk-form-title-text) !important;
  }

  :deep(.el-sub-menu .el-menu-item) {
    min-width: auto;
  }
}

.icon-size {
  font-size: 24px;
  width: 24px;
  height: 24px;
}

.el-sub-menu.is-active {
  color: var(--main) !important;
  background: var(--menu-item-active) !important;
  &.is-opened {
    background: var(--main-box) !important;
  }
}

.el-menu-item.is-active {
  color: var(--main) !important;
  background: var(--menu-item-active) !important;
}

.el-menu-item.is-active:hover {
  color: var(--main) !important;
  background: var(--menu-item-hover-active) !important;
}

.actived {
  position: absolute;
  right: -3px;
  width: 3px;
  height: 100%;
  background: #4886fa;
  box-shadow: 2px 0px 8px 1px #84aefd;
  border-radius: 0px 2px 2px 0px;
  z-index: 9999;
  transition: all 3s;
}

.el-aside-style {
  width: 198px;
  height: calc(100vh - 72px);
  &.iscollapse {
    width: 75px;
  }
}

.el-aside-style::-webkit-scrollbar {
  display: none;
}

.collapse {
  width: 195px;
  font-size: 24px;
  padding: 24px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: end;
  background: #fff;
  &.iscollapse {
    width: 72px;
  }
  &:hover {
    background: var(--menu-item-hover-active) !important;
  }
}
</style>
