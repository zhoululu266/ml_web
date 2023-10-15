import { defineStore } from "pinia";

interface AppState {
  pageList: any[];
}

export const useMain = defineStore("useMain", {
  state: (): AppState => ({
    pageList: [],
  }),
  actions: {
    setPageList(data: any) {
      this.pageList = { ...this.pageList, ...data };
    },
    getPageList() {
      return this.pageList;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "main",
        storage: window.sessionStorage,
      },
    ],
  },
});
