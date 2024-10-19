import http from '@/services/http'
interface loginInfo {
  account:number
  password:string
}
const loginByPassword = (params:loginInfo)=>{
  return http.post('/users/login',{params:params})
}

export {
 loginByPassword
}