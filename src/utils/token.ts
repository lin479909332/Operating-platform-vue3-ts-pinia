// 封装本地存储存储数据与读取数据方法
// 保存token
export const SET_TOKEN = (token: string) => {
  return localStorage.setItem('TOKEN', token)
}
// 读取token
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
