module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Trade Stock Market'
      return args
    })
  },
  devServer: {
    proxy: {
      '^/v5/market/kline': {
        target: 'http://localhost:3000/',
        ws: true,
        changeOrigin: true
      },
    }
  },
  publicPath: '/'
}
