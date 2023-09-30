import { axiosPost } from "../../utils/request";
import { useContext } from "../../hooks/context";
const { url } = useContext();

const url1 = `${url.api}`;
const apiFile = `${url.apiFile}`;

// 获取后台列表
export const getList = (data: Record<string, unknown> | undefined) => {
  const api = `${url1}/motorcycleService/userInfo/list/page`;
  return axiosPost(api, data);
};
//导出
export const exportList = `${url1}/motorcycleService/userInfo/export`;

//导入
export const upLoadApi = `${url1}/motorcycleService/userInfo/import`;

//详情
export const detailList = (data: Record<string, unknown> | undefined) => {
  const api = `${url1}/motorcycleService/motorcycle/detail`;
  return axiosPost(api, data);
};
//图片前缀
export const apiFileApi = `${apiFile}/`;
