const { createProxyMiddleware } = require('http-proxy-middleware')


module.exports = (req:Request, res:Response) => {
  let target = ''

  // 代理目标地址
  // xxxxx 替换为你跨域请求的服务器 如： http://baidu.com
  if (req.url.startsWith('/api')) {
  // 这里填目标地址
    target = 'https://netease-cloud-music-api-theta-nine-20.vercel.app'
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/api`
      // 例如 /api/user/login 将被转发到 http://target/user/login
      '^/api/': '/'
    }
  })(req, res)
}
