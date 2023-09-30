<!--
 * @Description: 按钮组件
   exportTypeAll 导出全部
-->
<template>
  <el-button
    class="btn"
    :loading="loadings"
    v-bind="$attrs"
    @click="loadExcel"
    type="primary"
  >
    {{ props.btnName || "导出全部" }}
  </el-button>
</template>
<script setup lang="ts">
import { request } from "../utils/request";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const emit = defineEmits(["backFun"]);
interface Props {
  api: string;
  name: string;
  btnName?: string;
  params?: Record<string, any>;
}
const loadings = ref<boolean>(false);
const props = defineProps<Props>();

const loadExcel = () => {
  postExcelFile(props.params, props.api);
};

const postExcelFile = (params: any, url: string) => {
  loadings.value = true;
  // console.log("----开始导出----");
  request(url, {
    data: params,
    method: "post",
    responseType: "blob",
  })
    .then((res: any) => {
      // console.log("----导出结束----");
      loadings.value = false;
      down(res);
      ElMessage({
        message: "导出成功,正在下载...",
        type: "success",
      });
      emit("backFun");
    })
    .catch((err: any) => {
      loadings.value = false;
      ElMessage.error("导出失败，请稍后再试！");
      console.log("导出失败", err);
    });
};
const down = (file: any) => {
  console.log("props.name", props.name);

  const blob = new Blob([file]);
  // (window.URL || webkitURL).createObjectURL(blob)
  let downloadElement: HTMLAnchorElement | null = document.createElement("a");
  const href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = `${props.name}.xlsx`; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  downloadElement = null;
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};
</script>
<style scoped>
.btn {
  font-family: Source Han Sans CN;
  font-weight: 400;
  cursor: pointer;
}
</style>
