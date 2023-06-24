// 用户管理模块的接口
import request from '@/utils/request'
import type { UserResponseDate, User } from './type'
// 枚举地址
enum API {
  // 获取全部已有用户账号信息
  ALLUSER_URL = '/admin/acl/user/',
  // 添加用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 更新已有的用户账号
  UPDATEUSER_URL = '/admin/acl/user/update',
}

// 获取全部已有用户账号信息
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseDate>(API.ALLUSER_URL + `${page}/${limit}`)

// 添加用户与更新用户的接口
export const reqAddOrUpdateUser = (data: User) => {
  // 有id更新，无id添加
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
