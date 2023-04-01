import axios from 'axios'

const baseURL = 'http://localhost:8080'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 例如，设置请求头、添加请求参数、处理跨域问题等
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  // 例如，检查响应状态码、解析响应数据等
  return response
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
