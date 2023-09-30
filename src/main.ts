import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import { store } from "./store/index";
import  router  from "./router";
import "element-plus/dist/index.css";
// import './assets/font/font.css' //引入字体文件
import "./assets/style/elementUi.scss";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// import "./style.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from "echarts";//建议按需导入，不会占用项目太多资源

//创建实例
const app = createApp(App);
// 登录token发送到服务端
axios.interceptors.request.use((config:any) => {//声明请求拦截器
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')//获取token值
  return config

})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.warnHandler = () => null;
app.use(ElementPlus, {
  locale: zhCn
});
//定义注入对象
app.provide("http", axios);
//定义插件
app.use(router);
app.use(store);
//挂载目标DOM
app.mount("#app");
