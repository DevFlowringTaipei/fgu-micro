module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: true,
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/fgu-micro/" : "/",
  transpileDependencies: ["quasar"],
  devServer: {
    port: 8080, //端口號
    host: "localhost", //主機名
    https: false, //協議
    open: true, //啟動時是否自動打開瀏覽器
    // 開發環境代理配置
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        ws: true, //proxy websockets

        changeOrigin: true, //啟動代理
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
  lintOnSave: false, // 關閉格式檢查
  productionSourceMap: false, //打包時不會生成.map文件，加速打包
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '佛大育成開發'
      return args
    })
  },
};
