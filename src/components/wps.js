export const loadWpsSdk = () =>
  new Promise(async (resolve, reject) => {
    try {
      // 动态导入 WebWpsSDK
      const { default: WebWpsSDK } = await import("./web-office.js"); // TODO: 确保路径正确
      console.log("window.WebWpsSDK", WebWpsSDK);

      if (WebWpsSDK) {
        // 将 WebWpsSDK 挂载到 window 对象上，供其他函数使用
        if (!window.WebWpsSDK) {
          window.WebWpsSDK = WebWpsSDK;
        }
        resolve({ loaded: true });
      } else {
        reject(new Error("WebWpsSDK 加载失败"));
      }
    } catch (error) {
      console.error("加载 WebWpsSDK 失败:", error);
      reject(error);
    }
  });

// WPS 渲染配置
export const wpsRender = (options) => {
  console.log("===wpsRender options", options);
  const instance = render(options);
  function render() {
    let { fileId, user, containerId, fileName } = options || {};
    // const url = genUrl({ fileId, user, fileName });
    // WPS配置对象
    const config = {
      url: '', // TODO
      mount: document.getElementById(containerId),
      apiKey: '', // WPS API Key TODO
      mode: "simple", // 极简模式
      wordOptions: {
        isShowDocMap: false, // 是否开启目录功能，默认开启
        isBestScale: false, // 打开文档时，默认以最佳比例显示
        isShowBottomStatusBar: false, // 是否展示底部状态栏
      },
    };

    console.log("===config", config, window.WebWpsSDK);

    return window.WebWpsSDK.config(config);
  }

  return {
    instance,
    uninstall: ({ wrapperId, containerId } = {}) => {
      const container = document.getElementById(wrapperId);
      if (container) {
        container.innerHTML = `<div id="${containerId}"></div>`;
      }
      if (instance) {
        instance.destroy && instance.destroy();
      }
    },
  };
};
