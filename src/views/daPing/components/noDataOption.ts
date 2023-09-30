const emptyImg = "./images/icon/tsp-Empty.png";
const errorImg = "./images/icon/tsp-error.png";
const loadingEmptyImg = "./images/icon/tsp-loading.png";
export const noDataOption = {
  title: {
    text: "{a|}\n{b|暂无数据}",
    x: "center",
    y: "center",
    padding: [0, 0, 0, 0],
    textStyle: {
      rich: {
        a: {
          backgroundColor: {
            image: emptyImg,
          },
          width: 380,
          height: 240,
        },
        b: {
          color: "#1AE8FF",
          fontSize: 18,
          padding: [-120, 0, 0, 0],
        },
      },
    },
  },
};

export const errorOption = {
  title: {
    text: "{a|}\n{b|数据加载失败}\n{b|(当前网络环境不佳)}",
    x: "center",
    y: "center",
    padding: [0, 0, 0, 0],
    textStyle: {
      rich: {
        a: {
          backgroundColor: {
            image: errorImg,
          },
          width: 380,
          height: 240,
        },
        b: {
          color: "#1AE8FF",
          fontSize: 18,
          padding: [-120, 0, 0, 0],
        },
      },
    },
  },
};

export const loadingOption = {
  title: {
    text: "{a|}\n{b|数据加载中...}",
    x: "center",
    y: "center",
    padding: [0, 0, 0, 0],
    textStyle: {
      rich: {
        a: {
          backgroundColor: {
            image: loadingEmptyImg,
          },
          width: 380,
          height: 240,
        },
        b: {
          color: "#1AE8FF",
          fontSize: 18,
          padding: [-120, 0, 0, 0],
        },
      },
    },
  },
};
