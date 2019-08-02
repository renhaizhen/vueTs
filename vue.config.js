module.exports = {
    // 开启服务
    devServer: {
      open: true,
      host: 'localhost',
      port: 8080,
      https: false,
      hotOnly: false,
      proxy: {
        // 反向代理
        '/api': {
          target: 'https://vuets-api.herokuapp.com/api/',
          ws: true,
          changOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      },
      before: app => {}
    }
  };
  