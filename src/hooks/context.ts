import mitt from 'mitt';

//外部参数定义
interface ExternalConfig {
  localIP: any;
  apiFile: string;
  api: string;
  ywzx: string;
  loginSid: string;
  title: string;
  closeUrl: string;
  fjCode: string;
  pcsCode: string;
}

declare const $config: ExternalConfig;
const emitter = mitt();
// console.log('emitter',$config)
export function useContext() {
  const url = $config;
  return { url, emitter };
}
