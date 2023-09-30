// 部署环境服务地址，用于项目部署
const ips = {
  ip: `192.168.3.71:31443`,
  mqttIp: "test.mosquitto.org", // MQTT地址
};

window.configUrl = {
  sysName: "穆棱",
  // token: "5ef72b98-c8ab-4bd3-9a54-1d1dd92043e0",
  token: "",
  serverUrl: `http://${ips.ip}`, // 接口请求地址
  manageSysUrl: `http://${ips.ip}`, // 综合管理接口请求地址
  mqttUrl: `http://${ips.mqttIp}:8080/mqtt`, // MQTT地址
  localhostMqttUrl: "ws://localhost:9001/mqtt", // 本机mqtt地址
  
};

window.showConfig = {
  showDemoVideo: true,
  updateTime: 30000,
};

