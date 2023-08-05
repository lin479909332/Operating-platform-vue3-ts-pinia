import request from '@/utils/request'
import type { PermissionResponseData } from './type'
// 枚举api
enum API {
  // 获取全部菜单与按钮的标识数据
  ALLPERMISSION_URL = '/admin/acl/permission',
}

// 获取菜单数据
export const reqGetAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)
