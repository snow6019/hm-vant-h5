const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    open: false
  }
  // 开启lint  ES语法 lint校验
  // lintOnSave: false
})
