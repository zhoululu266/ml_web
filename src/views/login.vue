<template>
  <div class="common-layout">
    <div class="hearder">
      <div class="images">
        <img :src="JingHui" alt="" />
      </div>
      <div class="title">{{ title }}</div>
    </div>

    <div class="content">
      <!-- 登录 -->
      <div class="login">
        <div class="title-box">
          <div class="circle"></div>
          <div class="title-icon">
            <img src="../assets/enter-icon.png" alt="" />
          </div>
          <div>登录注册</div>
        </div>
        <div class="login-content">
          <el-form
            :inline="true"
            :model="loginFrom"
            ref="ruleFormRef"
            :rules="rules"
            label-position="right"
            label-width="82px"
          >
            <el-form-item label="用户登录" prop="phone">
              <el-input
                v-model="loginFrom.phone"
                placeholder="请输入手机号码"
                style="width: 240px"
                :validate-event="false"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="loginFrom.password"
                placeholder="请输入密码"
                type="password"
                style="width: 240px"
                maxlength="11"
                :validate-event="false"
              />
            </el-form-item>
            <el-form-item label="短信验证" prop="code">
              <el-input
                v-model="loginFrom.code"
                placeholder="请输入验证码"
                class="input"
                style="width: 240px"
                :validate-event="false"
              >
                <template #append>
                  <el-button
                    class="hq-btn"
                    @click="onGetVerificationCode"
                    v-if="loginFrom.show"
                    >获取验证码</el-button
                  >
                  <el-button class="hq-btn" v-if="!loginFrom.show">{{
                    `${loginFrom.count}(s)重新获取`
                  }}</el-button>
                </template>
              </el-input>
            </el-form-item>
            <div class="bottom-box">
              <el-form-item>
                <div class="btn-box">
                  <div class="btn1" @click="onSignIn">注册</div>
                  <div class="btn2" @click="onLogin">登录</div>
                </div>
              </el-form-item>

              <div class="forgot-password" @click="onWjPassword">忘记密码</div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="organizer-box">主办单位：哈尔滨市公安交通管理局</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import router from "../router";
import { useContext } from "../hooks/context";
import JingHui from "../assets/jinghui.png";

import { useStore } from "../store";
const store = useStore();
const { url } = useContext();

import axios from "axios";
const ruleFormRef = ref();
const loginFrom = ref<any>({
  phone: "",
  password: "",
  code: "",
  confirmPassword: "",
  show: true,
  count: "",
  timer: null,
});
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    {
      type: "number",
      message: "手机号格式不正确",
      transform(value) {
        const phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
        if (!phonereg.test(value)) {
          return false;
        } else {
          return Number(value);
        }
      },
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});

// 登录
const onLogin = async () => {
  const valid = await ruleFormRef.value?.validate();
  if (!valid) return;
  await axios
    .post(`${url.api}/motorcycleService/motorcycle/admin/login`, {
      phone: loginFrom.value.phone,
      password: loginFrom.value.password,
      code: loginFrom.value.code,
      confirmPassword: loginFrom.value.confirmPassword,
    })
    .then((res) => {
      //console.log("res", res);
      if (res.data.code !== 200) {
        ElMessage({
          type: "error",
          message: res.data.message,
        });
      } else {
        const loginInfo = {
          token: res.data.data.token,
          phone: res.data.data.phone,
          id: res.data.data.id,
        };
        store.commit("updateLoginInfo", loginInfo);

        window.sessionStorage.setItem("token", res.data.data.token);
        router.push("/home");
        ElMessage({
          type: "success",
          message: "登录成功",
        });
        // getX();
      }
    });
};

// 获取验证码
const onGetVerificationCode = async () => {
  const TIME_COUNT = 60;
  loginFrom.value.count = TIME_COUNT;
  loginFrom.value.show = false;
  loginFrom.value.timer = setInterval(() => {
    if (loginFrom.value.count > 0 && loginFrom.value.count <= TIME_COUNT) {
      loginFrom.value.count--;
    } else {
      loginFrom.value.show = true;
      clearInterval(loginFrom.value.timer);
      loginFrom.value.timer = null;
    }
  }, 1000);
  await axios
    .post(`${url.api}/motorcycleService/motorcycle/phone`, {
      phone: loginFrom.value.phone,
    })
    .then((res) => {
      //console.log(res);
      if (res.data.code !== 200) {
        ElMessage({
          type: "error",
          message: res.data.message,
        });
      } else if (res.data.data == 2) {
        ElMessage({
          type: "error",
          message: "1分钟之内不可以重复发送",
        });
      } else if (res.data.data == 3) {
        ElMessage({
          type: "error",
          message: "今日该手机号验证码数量超过限制，请明日再试",
        });
      }
    });
};
const onSignIn = () => {
  //console.log("router", router.push);

  router.push({
    path: "/zhuce",
    name: "zhuce",
  });
};
// 忘记密码
const onWjPassword = () => {
  router.push({
    path: "/wjmm",
    name: "wjmm",
  });
};

const title = `${url.title}`;
</script>

<style lang="scss" scoped>
.login_container {
  width: 400px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 20px;
}
.common-layout {
  background: #f6f7f9;
  width: 100%;
  height: 100vh;
  .hearder {
    width: 100%;
    height: 270px;
    background: url("../assets/bj.png") no-repeat;
    border-radius: 0px 0px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .images {
      width: 100px;
      height: 100px;
      margin-top: 45px;
      img {
        width: 100%;
      }
    }
    .title {
      width: 100%;
      height: 70px;
      font-size: 60px;
      font-family: PangMenZhengDao-Regular, PangMenZhengDao;
      font-weight: 700;
      color: #ffffff;
      text-align: center;
    }
  }

  .content {
    display: flex;
    margin-top: 91px;
    justify-content: center;
    .title-box {
      display: flex;
      align-items: center;
      height: 54px;
      background: #e6ecfc;
      border-radius: 8px 8px 0px 0px;
      opacity: 1;
      font-size: 22px;
      font-family:
        Source Han Sans CN-Bold,
        Source Han Sans CN;
      font-weight: bold;
      color: #53555f;
      .circle {
        width: 47px;
        height: 47px;
        background: linear-gradient(180deg, #92a4ff 0%, #e6ecfc 100%);
        opacity: 1;
        clip-path: circle(49%);
        position: relative;
        top: -8px;
        left: 21px;
      }
      .title-icon {
        width: 49px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #304bf2;
        opacity: 1;
        margin-right: 16px;
        clip-path: circle(50%);
        margin-left: -14px;
      }
    }
    .flow-chart {
      width: 950px;
      height: 395px;
      background: #ffffff;
      box-shadow: 0px 5px 16px 1px rgba(0, 0, 0, 0.03);
      border-radius: 8px 8px 8px 8px;
      opacity: 1;
      margin-left: 24px;
      text-align: left;
      .title-box {
        display: flex;
        align-items: center;
        height: 54px;
        background: #e6ecfc;
        border-radius: 8px 8px 0px 0px;
        opacity: 1;
        font-size: 22px;
        font-family:
          Source Han Sans CN-Bold,
          Source Han Sans CN;
        font-weight: bold;
        color: #53555f;
        .circle {
          width: 47px;
          height: 47px;
          background: linear-gradient(180deg, #92a4ff 0%, #e6ecfc 100%);
          opacity: 1;
          clip-path: circle(49%);
          position: relative;
          top: -8px;
          left: 21px;
        }
        .title-icon {
          width: 49px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #304bf2;
          opacity: 1;
          margin-right: 16px;
          clip-path: circle(50%);
          margin-left: -14px;
        }
      }
      .flow-chart-content {
        height: 341px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .flow-chart-content-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 156px;
          height: 106px;
          background: rgba(212, 221, 246, 0.54);
          box-shadow: 0px 3px 6px 1px rgba(16, 94, 154, 0.67);
          border-radius: 8px 8px 8px 8px;
          border: 1px solid #d4ddf6;
          color: #3d86fe;
        }
        .flow-chart-item1 {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 158px;
          height: 106px;
          color: #fff;
          border-radius: 8px;
          background: linear-gradient(180deg, #3681fe 0%, #79abfd 100%);
          box-shadow: 0px 3px 6px 1px rgba(16, 94, 154, 0.67);
        }
      }
    }
    .login {
      width: 1160px;
      height: 415px;
      background: #ffffff;
      box-shadow: 0px 5px 16px 1px rgba(0, 0, 0, 0.03);
      border-radius: 8px 8px 8px 8px;
      opacity: 1;
      margin-left: 24px;
      .login-content {
        width: 100%;
        margin: 44px auto;
        :deep(.el-form) {
          margin-left: -90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          input:-webkit-autofill,
          textarea:-webkit-autofill,
          select:-webkit-autofill {
            -webkit-text-fill-color: #5e5e5e !important;
            -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
            background-color: transparent;
            background-image: none;
            transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
          }
          input {
            background-color: transparent;
          }
        }
        .bottom-box {
          margin-left: 80px;
        }
        .btn-box {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin-top: 18px;
          font-size: 18px;
          .btn1 {
            width: 110px;
            height: 44px;
            line-height: 44px;
            text-align: center;
            background: linear-gradient(135deg, #678bff 0%, #546fcb 100%);
            border-radius: 8px 8px 8px 8px;
            opacity: 1;
            margin-right: 24px;
            cursor: pointer;
            font-family:
              Source Han Sans CN-Medium,
              Source Han Sans CN;
            font-weight: 500;
            color: #fbfbfb;
          }
          .btn2 {
            width: 100px;
            height: 44px;
            line-height: 44px;
            text-align: center;
            background: linear-gradient(135deg, #678bff 0%, #546fcb 100%);
            border-radius: 8px 8px 8px 8px;
            opacity: 1;
            cursor: pointer;
            font-family:
              Source Han Sans CN-Medium,
              Source Han Sans CN;
            font-weight: 500;
            color: #fbfbfb;
          }
        }
        .forgot-password {
          text-decoration: underline;
          text-underline-offset: 0.2em;
          cursor: pointer;
        }
        .hq-btn {
          width: 90px;
          height: 32px;
          text-align: center;
          background: linear-gradient(180deg, #3681fe 0%, #79abfd 100%);
          border-radius: 0px 4px 4px 0px;
          opacity: 1;
          color: #fff;
        }
      }
    }
  }
}
.el-form--inline .el-form-item {
  margin-right: 0;
}
.el-button {
  padding: 0;
}
.flow-chart-content-box {
  display: flex;
  .flow-chart-item {
    display: flex;
  }
  .flow-chart-item1 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 158px;
    height: 106px;
    color: #fff;
    border-radius: 8px;
    background: linear-gradient(180deg, #3681fe 0%, #79abfd 100%);
    box-shadow: 0px 3px 6px 1px rgba(16, 94, 154, 0.67);
  }
  .flow-chart-content-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 156px;
    height: 106px;
    background: rgba(212, 221, 246, 0.54);
    box-shadow: 0px 3px 6px 1px rgba(16, 94, 154, 0.67);
    border-radius: 8px 8px 8px 8px;
    border: 1px solid #d4ddf6;
    color: #3d86fe;
  }
  .path-box {
    width: 76px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 43px;
      height: 20px;
    }
  }
}

.organizer-box {
  position: fixed;
  text-align: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  line-height: 65px;
  background: #041a60;
  color: #fff;
}
</style>
