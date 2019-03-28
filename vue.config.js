/*
 * @moduleName:
 * @Author: dawdler
 * @LastModifiedBy: dawdler
 * @Date: 2019-01-30 16:02:54
 * @LastEditTime: 2019-03-27 11:45:33
 */
module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  lintOnSave: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false
  },
  devServer: {
    open: true,
    // host: 'localhost',
    port: 6060,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },
  pluginOptions: {
    storybook: {
      allowedPlugins: ['define']
    }
  }
};
