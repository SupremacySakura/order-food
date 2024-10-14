import http from '@/services/http'

const test = ()=>{
  return http.get('/')
}

export {
  test
}