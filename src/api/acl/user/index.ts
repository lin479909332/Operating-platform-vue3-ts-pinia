// 用户管理模块的接口
import request from '@/utils/request'
import type { UserResponseDate, User, AllRoleResponseData, SetRoleData } from './type'
// 枚举地址
enum API {
  // 获取全部已有用户账号信息
  ALLUSER_URL = '/admin/acl/user/',
  // 添加用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 更新已有的用户账号
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 获取全部职位,当前账号拥有的职位接口
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  // 给已有的用户分配职位接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',
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

// 获取全部职位以及包含当前用户的已有的职位
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)

// 给已有的用户分配职位
export const reqSetUserRole = (data: SetRoleData) => request.post<any, any>(API.SETROLE_URL, data)
