<template>
  <el-upload
    ref="upload"
    class="hlk-demo-upload"
    :action="props.api"
    :data="props.params"
    :limit="1"
    :on-exceed="handleExceed"
    :before-upload="handleUploading"
    :on-success="success"
    :on-error="error"
    :auto-upload="true"
    :headers="headers"
  >
    <template #trigger>
      <el-button type="primary" :loading="loading">
        <!-- <svg class="icon-svg" aria-hidden="true">
          <use :xlink:href="`#icon-piliangshangchuan`"></use>
        </svg> -->
        <span>{{ props.text }}</span>
      </el-button>
    </template>
    <!-- <template #tip>
      <div class="el-upload__tip text-red"></div>
    </template> -->
  </el-upload>
</template>

<script setup lang="ts">
import { ElMessage, genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { ref } from "vue";

const token = sessionStorage.getItem("token");

const headers = ref({
  Authorization: token,
});
const props = defineProps({
  api: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "批量上传",
  },
  params: {
    type: Object,
    default: () => {
      return {};
    },
  },
  uploadParams: {
    type: Object,
    default: () => {
      return {
        types: ["xls", "xlsx"],
        typesErrorTxt: "只支持excel格式",
        size: 20,
        sizeErrorTxt: "附件不能大于20MB",
      };
    },
  },
});
const emit = defineEmits(["ok"]);
const loading = ref(false);
const upload = ref<UploadInstance>();
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
const handleUploading: UploadProps["beforeUpload"] = (rawFile) => {
  const { types, typesErrorTxt, size, sizeErrorTxt } = props.uploadParams;
  const txtType = rawFile.name.substring(rawFile.name.lastIndexOf(".") + 1);
  if (!types.includes(txtType)) {
    ElMessage.error(typesErrorTxt);
    return false;
  } else if (rawFile.size / 1024 / 1024 > size) {
    ElMessage.error(sizeErrorTxt);
    return false;
  }
  loading.value = true;
  return true;
};
const success = (res: any) => {
  if (res?.data?.fail > 0) {
    ElMessage({
      message: "上传失败，正在下载错误文件",
      type: "warning",
    });
    const url = res.data.url?.startsWith("http")
      ? res.data.url
      : `http://${res.data.url}`;
    window.location.href = url;
  } else {
    ElMessage({
      message: "上传成功",
      type: "success",
    });
    emit("ok", res);
  }
  upload.value!.clearFiles();
  loading.value = false;
};
const error = (err: any) => {
  upload.value!.clearFiles();
  loading.value = false;
  ElMessage({
    message: err as string,
    type: "error",
  });
};
</script>
<style lang="scss" scoped>
.icon-svg {
  margin-right: 8px;
}
// .icon {
//   margin-right: 8px;
// }
// .hlk-demo-upload {
//   display: inline-flex;
//   margin-right: 8px;
//   position: relative;
//   top: 1px;
//   .el-upload-list {
//     width: 0;
//     height: 0;
//     overflow: hidden;
//   }
//   .el-upload__tip {
//     margin-top: 0;
//   }
// }
</style>
