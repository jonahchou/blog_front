const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// 跨域配置
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 生产环境是否生成 sourceMap 文件(能减小很多dist内存)
  productionSourceMap: false,
  // outputDir: 'dist',
  // assetsDir: 'static',
  // publicPath: './',
  devServer: {                //记住，别写错了devServer//设置本地默认端口  选填
    port: 8808,
    proxy: {                 //设置代理，必须填
      '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        target: 'http://localhost:8088',     //代理的目标地址
        changeOrigin: true,              //是否设置同源，输入是的
        pathRewrite: {                   //路径重写
          '^/api': ''                     //选择忽略拦截器里面的内容
        },
      }
    }
  }
}