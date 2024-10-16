import http from '@/services/http'

const test = ()=>{
  return http.get('/')
}
const getAllShop = ()=>{
  return http.get('/shop')
}
export {
  test,
  getAllShop
}