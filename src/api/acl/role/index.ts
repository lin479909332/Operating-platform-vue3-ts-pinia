import request from '@/utils/request'
import { RoleResponseData, RoleData } from './type'
// 枚举api
enum API {
  // 获取全部职位的接口
  ALLROLE_URL = '/admin/acl/role/',
  // 添加职位的接口地址
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新职位的接口地址
  UPDATEROLE_URL = '/admin/acl/role/update',
}

// 获取全部职位
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)

// 添加或更新职位
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
