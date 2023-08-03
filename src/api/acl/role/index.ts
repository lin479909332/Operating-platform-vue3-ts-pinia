import request from '@/utils/request'
import { RoleResponseData } from './type'
// 枚举api
enum API {
  // 获取全部职位的接口
  ALLROLE_URL = '/admin/acl/role/',
}

// 获取全部职位
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)
