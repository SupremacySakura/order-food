import http from '@/services/http'
interface loginInfo {
  account:number
  password:string
}
const loginByPassword = (params:loginInfo)=>{
  return http.post('/users/login',{params:params})
}
const buy = (params:any)=>{
  return http.post('/users/buy', { params: params })
}
export {
 loginByPassword,
 buy
}