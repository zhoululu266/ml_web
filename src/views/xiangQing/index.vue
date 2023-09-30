<template>
  <div class="unit_box1">
    <div class="top">
      详情
      <el-button @click="backFun">
        <el-icon class="icon"><Back /></el-icon>
        返回
      </el-button>
    </div>
    <el-scrollbar height="calc(100vh - 200px)">
      <el-form
        :model="form"
        label-width="420px"
        :inline="true"
        label-suffix=":"
      >
        <el-form-item label="申请时间">
          {{ form.sqsj }}
        </el-form-item>
        <el-form-item label="申请人姓名">
          {{ form.name }}
        </el-form-item>
        <el-form-item label="手机号码">
          {{ form.phone }}
        </el-form-item>
        <el-form-item label="证件类型">
          {{ form.idType }}
        </el-form-item>
        <el-form-item label="证件号码">
          {{ form.idCard }}
        </el-form-item>
        <el-form-item label="户籍所在地">
          {{ form.registeredResidence }}
        </el-form-item>
        <el-form-item label="出生年月日">
          {{ form.birthday }}
        </el-form-item>
        <el-form-item label="性别">
          {{ form.gender }}
        </el-form-item>
        <el-form-item label="是否拥有本地摩托车驾照(准驾车型包含D，E，F)">
          {{ form.driversLicense }}
        </el-form-item>
        <!-- <el-form-item label="是否拥有哈尔滨市摩托车">
          {{ form.motorcycle || "--" }}
        </el-form-item> -->
        <!-- <el-form-item label="机动车驾驶证号">
          {{ form.drivingNumber || "--" }}
        </el-form-item> -->
        <el-form-item label="机动车驾驶证档案编号">
          {{ form.driversLicenseCode }}
        </el-form-item>
        <el-form-item label="身份证正面">
          <el-image
            style="width: 100px; height: 100px"
            :src="form.idCardFront ? apiFileApi + form.idCardFront : ''"
            :zoom-rate="1.2"
            :preview-src-list="[
              form.idCardFront ? apiFileApi + form.idCardFront : '',
            ]"
            :initial-index="4"
            fit="cover"
          />
        </el-form-item>
        <el-form-item label="身份证背面">
          <el-image
            style="width: 100px; height: 100px"
            :src="form.idCardBehind ? apiFileApi + form.idCardBehind : ''"
            :zoom-rate="1.2"
            :preview-src-list="[
              form.idCardBehind ? apiFileApi + form.idCardBehind : '',
            ]"
            :initial-index="4"
            fit="cover"
          />
        </el-form-item>
        <el-form-item label="手持身份证">
          <el-image
            style="width: 100px; height: 100px"
            :src="form.idCardHand ? apiFileApi + form.idCardHand : ''"
            :zoom-rate="1.2"
            :preview-src-list="[
              form.idCardHand ? apiFileApi + form.idCardHand : '',
            ]"
            :initial-index="4"
            fit="cover"
          />
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { detailList, apiFileApi } from "../server/api.ts";

const emit = defineEmits(["back"]);
interface rowType {
  id: string;
  createdAt: string;
}

const props = withDefaults(
  defineProps<{
    row: rowType;
  }>(),
  {
    row: () => {
      return {
        id: "",
        createdAt: "",
      };
    },
  }
);

let form = ref({
  name: "",
  phone: "",
  idType: "",
  idCard: "",
  registeredResidence: "",
  birthday: "",
  gender: "",
  driversLicense: "",
  motorcycle: "",
  drivingNumber: "",
  driversLicenseCode: "",
  idCardFront: "",
  idCardBehind: "",
  idCardHand: "",
  sqsj: props.row.createdAt,
});

const backFun = () => {
  emit("back");
};

const getList = async () => {
  const { data, code } = await detailList({
    id: props.row.id,
    // phone: store.state.loginInfo?.phone || "",
  });
  if (code === 200) {
    form.value = { ...form.value, ...data };
  }
};

onMounted(() => {
  getList();
});
</script>
<style scoped lang="scss">
.unit_box1 {
  padding: 18px 0;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    margin-top: -17px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 20px;
    padding: 0 24px;
    .icon {
      margin-right: 6px;
    }
  }
  :deep(.el-image) {
    padding-top: 10px;
  }
  :deep(.el-form) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
  }
  :deep(.el-form-item__content) {
    width: 300px;
    font-size: 14px;
    font-family:
      Source Han Sans CN-Normal,
      Source Han Sans CN;
    font-weight: 400;
    color: #5f6c81;
  }
  :deep(.el-form-item__label) {
    font-size: 14px;
    font-family:
      Source Han Sans CN-Regular,
      Source Han Sans CN;
    font-weight: 400;
    color: #5f6c81;
  }
}
</style>
