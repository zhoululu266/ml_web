<template>
  <div v-if="!xqShow" class="unit_box1">
    <div class="search-box">
      <el-form
        :model="form"
        ref="ruleFormRef"
        label-width="70px"
        :inline="true"
        class="search-form"
      >
        <el-row>
          <el-form-item label="申请日期" prop="time">
            <el-date-picker
              v-model="form.time"
              type="datetimerange"
              :style="{ width: '332px' }"
              range-separator="-"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="输入查询" prop="searchText">
            <el-input
              v-model="form.searchText"
              placeholder="请输入姓名/证件号码"
              :style="{ width: '332px' }"
            />
          </el-form-item>
        </el-row>

        <div class="form-btn">
          <el-button type="primary" @click="onSubmit" :loading="btnLoading"
            >查询</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </div>
      </el-form>
    </div>
    <div class="btn-box">
      <BtnUpload
        :api="upLoadApi"
        @ok="successUpLoad"
        text="核验结果导入"
      ></BtnUpload>
    </div>
    <div class="table-box" v-loading="loading">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        :row-style="{
          background: 'transparent',
          color: '#000',
          height: '48px',
        }"
        :header-row-style="{ background: 'transparent' }"
        :header-cell-style="{ background: '#F4F4F4', color: '#000' }"
      >
        <el-table-column label="序号" type="index" width="60px" fixed="left">
          <template #default="scope">
            {{ scope.$index + (page.pageIndex - 1) * page.size + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="申请人姓名"
          width="180"
          show-overflow-tooltip
        />
        <el-table-column prop="idCard" label="证件号码" show-overflow-tooltip />
        <!-- <el-table-column
          prop="drivingNumber"
          label="机动车驾驶证号"
          show-overflow-tooltip
        >
          <template #default="scope">{{
            scope.row.drivingNumber || "--"
          }}</template>
        </el-table-column> -->
        <el-table-column
          prop="driversLicenseCode"
          label="机动车驾驶证档案编号"
          width="180"
          show-overflow-tooltip
        >
          <template #default="scope">{{
            scope.row.driversLicenseCode || "--"
          }}</template>
        </el-table-column>
        <el-table-column prop="createdAt" label="申请时间" />
        <el-table-column prop="cz" label="操作" width="100">
          <template #default="scope">
            <div class="btn-box">
              <el-link
                class="desc-box btn-item"
                :style="{ color: '#207BE6' }"
                type="primary"
                size="small"
                :underline="false"
                @click="
                  jump({
                    id: scope.row.userId,
                    createdAt: scope.row.createdAt,
                  })
                "
              >
                查看详情</el-link
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :total="page.total"
        class="pagin"
        :currentPage="page.pageIndex"
        :page-size="page.size"
        layout=" total,prev, pager, next,jumper "
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <XiangQing v-if="xqShow" @back="xqShow = false" :row="row" />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import XiangQing from "../xiangQing/index.vue";
import { getList, upLoadApi } from "../server/api.ts";
import BtnUpload from "../../components/BtnUpload.vue";
const exportParams = ref({});
const loading = ref<boolean>(false);
const btnLoading = ref<boolean>(false);
const xqShow = ref<boolean>(false);
const row = ref();

interface Page {
  pageIndex: number;
  size: number;
  total: number | undefined;
  [i: string]: unknown;
}

// 分页
const page = reactive<Page>({
  pageIndex: 1,
  size: 10,
  total: 0, //总条数
});
const ruleFormRef = ref<FormInstance>();
const form = reactive({
  time: [],
  searchText: "",
});
const tableData = ref([]);
const getTableList = async (search?: boolean) => {
  loading.value = false;
  if (search) btnLoading.value = false;
  let params = {
    beginTime: form.time?.length > 0 ? form.time[0] + " 00:00:00" : "",
    endTime: form.time?.length > 0 ? form.time[1] + " 23:59:59" : "",
    searchText: form.searchText,
    pageIndex: page.pageIndex,
    pageSize: page.size,
    status: 3,
  };
  const { data, code } = await getList(params);

  if (code === 200) {
    tableData.value = data;
    exportParams.value = params;
  }
  console.log("getTableList------------data", data, code);

  loading.value = false;
  btnLoading.value = false;
};
const handleSizeChange = async (val: number) => {
  page.size = val;
  getTableList();
};
const handleCurrentChange = async (val: number) => {
  page.pageIndex = val;

  getTableList();
};
//导入成功
const successUpLoad = (res: any) => {
  console.log("successUpLoad", res);
  getTableList();
};

const jump = (item: { id: string; createdAt: string }) => {
  xqShow.value = true;
  row.value = item;
};

// 重置

const resetForm = (formEl: FormInstance | undefined) => {
  page.searchText = "";
  page.pageIndex = 1;
  if (!formEl) return;
  formEl.resetFields();
  getTableList();
};
const onSubmit = () => {
  console.log("submit!", form);
  btnLoading.value = true;
  getTableList(true);
};

onMounted(() => {
  getTableList();
});
</script>

<style>
.el-table .cell {
  height: 40px;
  line-height: 40px;
}
.el-loading-spinner {
  top: 45%;
}
</style>
<style scoped lang="scss">
.table-box {
  margin-top: 16px;
  height: calc(100vh - 230px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  .h-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.pagin {
  margin-bottom: 14px;
  margin-right: 36px;
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
.search-box {
  .search-form {
    display: flex;
    justify-content: space-between;
  }
  .form-btn {
  }
}
</style>
