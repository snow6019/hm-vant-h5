import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/h5/',
  timeout: 5000 // 超时5000ms
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 在发送请求之前做些什么
  config.headers.Authorization = localStorage.getItem('h5-token')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  if (error.response.status === 401 && error.response.data.message === 'token错误，请联系管理员') {
    localStorage.removeItem('h5-token')
    router.push('/login')
  } else {
    Toast(error.response.data.message)
  }
  return Promise.reject(error)
})

export default request
