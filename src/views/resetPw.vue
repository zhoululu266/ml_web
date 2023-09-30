<template>
  <el-dialog
    v-model="props.dialogVisible"
    title="账号密码设置"
    width="30%"
    :before-close="handleClose"
    :show-close="false"
    class="rest-dialog"
  >
    <div class="box">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="原密码" prop="oldPwd">
          <el-input
            v-model="ruleForm.oldPwd"
            type="password"
            placeholder="请输入原密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input
            v-model="ruleForm.newPwd"
            type="password"
            placeholder="请输入新密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            placeholder="请输入新密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="btnbox">
        <el-button @click="handleClose">取消</el-button>
        <el-button class="btn" type="primary" @click="onSubmit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import * as md5 from "js-md5";
import { useContext } from "../hooks/context";
import { axiosPost } from "../utils/request";
import { ElMessage } from "element-plus";
const emit = defineEmits(["changePassWord"]);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  oldPwd: "", // 原密码
  newPwd: "", // 新密码
  checkPass: "", // 确认新密码
});
const props = defineProps<{
  dialogVisible: boolean;
}>();
const handleClose = () => {
  ruleFormRef.value?.resetFields();
  emit("changePassWord", false);
};
// 新密码验证
const validatePass = (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空！"));
  } else if (ruleForm.checkPass !== "") {
    if (!ruleFormRef.value) return;
    ruleFormRef.value.validateField("checkPass", () => null);
  }
  const str = RegExp("^[0-9]*$");
  if (!str.test(value) || value.length !== 6) {
    callback(new Error("密码长度为6位,由数字组成"));
  } else {
    callback();
  }
};
// 确认密码验证
const validatePass2 = (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空！"));
  } else if (value !== ruleForm.newPwd) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
const { url } = useContext();
const rules = reactive({
  newPwd: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
});
// 修改密码
const setPassword = (data: Record<string, unknown> | undefined) => {
  const urlData = `${url.api}/system/management/user/update/password`;
  return axiosPost(urlData, data);
};
const onSubmit = async () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate(async (valid: unknown) => {
    if (valid) {
      try {
        const res = await setPassword({
          oldPassword: md5(ruleForm.oldPwd.trim()),
          newPassword: md5(ruleForm.newPwd.trim()),
        });
        if (res.code !== 200) {
          ElMessage.error(res.message);
        } else {
          ElMessage.success("密码修改成功,请重新登录");
          ruleFormRef.value?.resetFields();
          emit("changePassWord", true);
        }
      } catch (err) {
        ElMessage.error("修改密码失败");
      }
    }
  });
};
</script>
<style>
.rest-dialog {
  .el-dialog__body {
    padding: 16px 24px 16px 24px;
  }
}
</style>
<style lang="scss" scoped>
.box {
  opacity: 1;
}
.btnbox {
  text-align: right;
}
</style>
