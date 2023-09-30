import { defineStore } from "pinia";
import moment from "moment";

interface tsState {
  tabType?: string;
  fjSelectVal?: any;
  sjczTime: any;
  zdjqId: any;
  pollingTime: string;
}

// 态势屏公共参数 pinia
export const tspHead = defineStore("tspHead", {
  state: (): tsState => ({
    tabType: "", // tab 切换参数
    fjSelectVal: {}, // 分局下拉框参数
    sjczTime: {
      startTime: moment().format("YYYY-MM-DD"),
      endTime: moment().format("YYYY-MM-DD"),
    },
    zdjqId: -1,
    pollingTime: "",
  }),
  actions: {
    changeTab(val: string) {
      this.tabType = val;
    },
    changeSelect(val: any) {
      this.fjSelectVal = val;
    },
    changeTime(val: any) {
      this.sjczTime = val;
    },
    setpollingTime(val: string) {
      this.pollingTime = val;
    },
  },
  persist: {
    enabled: true,
    strategies: [{ key: "tabSwitch", storage: window.sessionStorage }],
  },
});
