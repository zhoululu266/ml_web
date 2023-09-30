/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from "pinia";

export const useUser = defineStore("useUser", {
  state: (): any => ({
    user: {
      id: "",
      name: "",
      departmentCode: "",
      departmentName: "",
      departmentId: "",
      photo: "",
      idCard: "",
      userManagementDepartmentCodes: [],
    },
    token: "",
    role: {},
    resourceCodes: [],
    qzLoginInfo: {},
  }),
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUserInfo(data: any) {
      this.user = data.user;
      this.token = data.token;
      this.role = data.role;
      this.resourceCodes = data.resourceCodes;
      this.qzLoginInfo = data.qzLoginInfo;
    },
    getUser() {
      return this.user;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "loginInfo",
        storage: window.sessionStorage,
      },
    ],
  },
});
