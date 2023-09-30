import {
  useLocalStorage,
  useSessionStorage,
} from "@vueuse/core";
import { createStore, useStore as baseUseStore } from "vuex";

export interface State {
  loginInfo: LoginInfo | null; //登录信息
  organTreeCode: string[]; //组织机构树代码
  token: string; // 登录token
  loginStatus: string; //登录身份
  menuList: SystemInfo[];
  resourceCode?: string;
  routerId?: string;
  currentSystem?: SystemInfo;
  siderList?: SiderMenu[];
  tabList?: SiderMenu[];
  systemList: SystemInfo[];
}
interface RoleInfo {
  rid: string;
}
//系统菜单菜单权限
export interface MenuInfo {
  id: string;
  name: string;
  type: string;
  pid: string;
  resourceCode: string;
  description: string;
  isApp: number;
}
//用户信息
export interface UserInfo {
  id: string;
  name: string;
  photo: string;
  idCard: string;
  pcard: string;
  contact: string;
  department: string;
  appName: string;
  roleList: RoleInfo[];
  group: any;
  job: any[];
}
//存储登录信息
export interface LoginInfo {
  token: string;
  menu: MenuInfo[];
  user: UserInfo;
}

interface SystemItem {
  developmentEntry: string;
  enabled: boolean;
  name: string;
  normal: string;
  path: string;
  productionEntry: string;
  selected: string;
  resourceCode: string;
  title: string;
  url: string;
  children: SystemItem[];
}

interface SiderMenu {
  children: SiderMenu[];
  depth: number;
  name: string;
  resourceCode: string;
  description: string;
  sort: number;
  url: string;
}

interface SystemInfo {
  name?: string;
  resCode: string;
  url: string;
  children: SystemItem[];
  path: string;
  title: string;
}

const loginInfoProxy = useSessionStorage<string>("loginInfo", null);
const loginInfo = JSON.parse(loginInfoProxy.value) as LoginInfo;
const systemListProxy = useSessionStorage<string>("systemList", null);
const systemlist = JSON.parse(systemListProxy.value) as SystemInfo[];
const menuListProxy = useSessionStorage<string>("menuList", null);
const menuList = JSON.parse(menuListProxy.value) as SystemInfo[];
const gxqyProxy = useLocalStorage<string[]>("xuanzhonglist", []);

export const store = createStore<State>({
  state: {
    loginInfo: loginInfo,
    organTreeCode: gxqyProxy.value,
    token: "",
    loginStatus: "",
    systemList: systemlist || [],
    resourceCode: "",
    menuList: menuList || [], // 所有菜单
    siderList: [], // 左侧菜单
    tabList: [], // 地图屏tab菜单
    routerId: "",
    currentSystem: {
      resCode: "",
      path: "",
      title: "",
      url: "",
      children: [],
    },
  },
  mutations: {
    updateLoginInfo(state, value) {
      state.loginInfo = value;
      loginInfoProxy.value = JSON.stringify(value);
    },
    savetoken(state, value) {
      state.token = value;
    },
    updateLoginStatus(state, value) {
      state.loginStatus = value;
    },
    changeMenu(state, value) {
      state.menuList = value;
      menuListProxy.value = JSON.stringify(value);
    },
    setSystemList(state, value) {

      state.systemList = value;
      systemListProxy.value = JSON.stringify(value);
    },
  },
});

export function useStore() {
  return baseUseStore();
}
