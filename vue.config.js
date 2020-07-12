
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';


module.exports = {
  publicPath: "./",
  assetsDir: "static",
  pages: {
    index: {
      // 应用入口配置，相当于单页面应用的main.js，必需项
      entry: 'src/modules/index/main.js',
      // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
      template: 'public/index.html',
      // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
      filename: 'index.html',
      // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
      // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'index page',
      // 包含的模块，可选项
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    manage: {
      entry: 'src/modules/manage/main.js',
      template: 'public/manage.html',
      filename: 'manage.html',
      title: 'manage page',
    },
  },
  lintOnSave: false,
  productionSourceMap: false,

  devServer: {
    sockHost: 'localhost',
    disableHostCheck: true,
    port: 9000, // 端口号
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器

    proxy: {
      "/api": {
        //target: "http://127.0.0.1:8080/api/v2", // 需要请求的地址
        //http://easymock.truefalse.xyz/mock/5e4ced5aeb7b21001650fe21/apis
        //http://wx.project-driven.xyz/api
        //http://127.0.0.1:5000/api
        target: "http://127.0.0.1:5000", // 需要请求的地址
        // target: process.env.VUE_APP_URL,   // 需要请求的地址
        changeOrigin: true, // 是否跨域
        // pathRewrite: {
        //   "^/api": "" // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        // }
      },
      "/apiv2": {
        //target: "http://127.0.0.1:8080/api/v2", // 需要请求的地址
        //http://easymock.truefalse.xyz/mock/5e4ced5aeb7b21001650fe21/apis
        //http://vue.project-driven.xyz/api
        //http://127.0.0.1:5000/api
        target: "http://127.0.0.1:5000/api", // 需要请求的地址
        // target: process.env.VUE_APP_URL,   // 需要请求的地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/apis": "" // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        }
      }
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        // 超过10kb的压缩gzip
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
        })
      )
       // 用cdn方式引入
      //  config.externals = {
      //   'vue': 'Vue',
      //   'vuex': 'Vuex',
      //   'vue-router': 'VueRouter',
      //   'axios': 'axios'
      // }
    }
  }
};
