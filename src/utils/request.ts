import axios from 'axios'
import { ElMessage } from 'element-plus'

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径会携带/api
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // config配置对象，header属性请求头
  // 返回配置对象
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    ElMessage({
      type: 'error',
      message
    })
    return Promise.reject(error)
  },
)

export default request
