import http from '@/services/http'

const test = ()=>{
  return http.get('/')
}
const getAllShop = ()=>{
  return http.get('/shop')
}
const getMenuById = (id:number)=>{
  return http.get('/menu',{
    params:{
      id:id
    }
  })
}
export {
  test,
  getAllShop,
  getMenuById
}