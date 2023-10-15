/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { AxiosInstance } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

const { isCancel } = axios;
const instance: AxiosInstance = axios.create({
  timeout: 60000,
});

instance.interceptors.request.use(
  (request) => {
    const token = "GNVDKar7VfmDPejiXmpOnQerxUmlpQJMS5rZk=";
    request.headers.Authorization = token;
    request.headers.token = token;
    request.headers["Content-Type"] = "multipart/form-data";
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    const isExpire = localStorage.getItem("expire");
    if (data.code === 408 && !isExpire) {
      localStorage.setItem("expire", "true");
      ElMessageBox.confirm("登录已失效， 请重新登录！", "提示", {
        confirmButtonText: "确定",
        showCancelButton: false,
        type: "warning",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: false,
      })
        .then(() => {
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = "./";
        })
        .catch(() => {
          localStorage.clear();
          return false;
        });
      return;
    }
    if (status !== 200) {
      const errorText = codeMessage[status] || response.statusText;
      return Promise.reject(new Error(errorText));
    }
    if (response.data.error) {
      return Promise.reject(new Error(response.data.error));
    }
    return response.data;
  },
  (error) => {
    ElMessage.closeAll();
    // ElMessage.error("网络连接失败，请刷新重试 !");

    if (error.message?.includes("timeout")) {
      return Promise.reject(new Error("接口请求超时"));
    }

    if (error.message?.includes("Network Error")) {
      return Promise.reject(new Error("网络连接错误"));
    }

    if (isCancel(error)) {
      // 获取 取消请求 的相关信息
      return Promise.reject(new Error("取消请求"));
    } else {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { status } = error?.response;

      const errorText = error.response?.data?.error?.text
        ? error.response?.data?.error?.text
        : `${codeMessage[status]}[${status}]`;

      return Promise.reject(errorText);
    }
  }
);

interface IFCadeMessage {
  [key: number]: string;
}

interface Page {
  pageIndex: number;
  pageSize: number;
  totalRecord: number;
  totalPage: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IFAxiosResponse<T = any> {
  data: T;
  status?: number;
  statusText?: string;
  errorMessage?: string;
  message?: string;
  code?: number | string;
  page?: Page;
}

const codeMessage: IFCadeMessage = {
  200: "操作成功",
  401: "认证未通过",
  403: "资源未授权",
  404: "资源不存在",
  428: "参数缺失",
  500: "程序异常",
  503: "服务不可用，服务器暂时过载或维护",
};

/**
 * asios 实例
 */
export const request = (url: string, options = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .request({
        url,
        ...options,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        // throw new Error(err)
      });
  });
};

/**
 * get 请求
 * @param {string} url - 请求的接口
 * @param {Object} params - 请求的参数
 */
export const axiosGet = <T = any>(
  url: string,
  params = {}
): Promise<IFAxiosResponse<T>> => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        // throw new Error(err)
      });
  });
};

/**
 * post 请求
 * @param {string} url - 请求的接口
 * @param {Object} params - 请求的参数
 */
export const axiosPost = <T = any>(
  url: string,
  params?: any,
  options = {}
): Promise<IFAxiosResponse<T>> => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params, options)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        // throw new Error(err)
      });
  });
};

/**
 * FormData上传
 * @param {string} url - 请求的接口
 * @param {Object} params - 参数为FormData
 */
export const axiosFormData = (url: string, params?: FormData) => {
  return new Promise((resolve, reject) => {
    instance
      .post(
        url,
        { ...params, token: "GNVDKar7VfmDPejiXmpOnQerxUmlpQJMS5rZk=" },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        // throw new Error(err)
      });
  });
};
