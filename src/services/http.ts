import axios from "axios"

const http=axios.create({
  baseURL: 'http://127.0.0.1',//API的基准URL
  timeout:100000,//请求超时时间
  headers:{
    'Content-Type':'application/json'
  }
})

//请求拦截器
http.interceptors.request.use(
  config => {
    //在请求前做些什么,比如发送token
    //config.headers.Authorization = 'Bearer ${token}
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截器
http.interceptors.response.use(
  response => {
    //对响应数据做些什么
    return response
  },
  error => {
    //对响应错误做些什么
    return Promise.reject(error)
  }
)
export default http